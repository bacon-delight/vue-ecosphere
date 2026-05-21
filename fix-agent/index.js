import { parseArgs } from 'node:util';
import { execSync } from 'node:child_process';
import fs from 'node:fs/promises';
import Anthropic from '@anthropic-ai/sdk';
import { Octokit } from '@octokit/rest';

const { values: args } = parseArgs({
  options: {
    owner: { type: 'string' },
    repo: { type: 'string' },
    'dry-run': { type: 'string', default: 'true' },
  },
  strict: true,
});

async function main() {
  const { owner, repo } = args;
  const dryRun = args['dry-run'] !== 'false';

  if (!owner || !repo) {
    console.error('Missing required args: --owner, --repo');
    process.exit(1);
  }

  const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });
  const claude = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

  console.log(`[FixAgent] Fetching open 'needs-fix' issues...`);

  const issues = await octokit.rest.issues.listForRepo({
    owner,
    repo,
    state: 'open',
    labels: 'needs-fix',
    sort: 'created',
    direction: 'asc',
    per_page: 5,
  });

  if (issues.data.length === 0) {
    console.log('[FixAgent] ✅ No issues to fix');
    process.exit(0);
  }

  const results = { total: issues.data.length, prs_opened: 0, errors: 0 };

  for (const issue of issues.data) {
    console.log(`[FixAgent] Processing issue #${issue.number}: ${issue.title}`);

    try {
      const fixResponse = await claude.messages.create({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 1000,
        messages: [{
          role: 'user',
          content: `Fix this GitHub issue:\n\n${issue.body}\n\nProvide a brief summary of the fix needed.`,
        }],
      });

      const text = fixResponse.content[0]?.text || '';
      console.log(`[FixAgent] Fix suggestion: ${text.slice(0, 100)}...`);

      if (!dryRun) {
        const branchName = `fix/eco-${issue.number}-fix`;

        try {
          execSync(`git checkout -b ${branchName}`, { stdio: 'pipe' });
          console.log(`[FixAgent] Created branch: ${branchName}`);

          execSync(`git commit --allow-empty -m "fix: #${issue.number} - automated fix"`, { stdio: 'pipe' });
          execSync(`git push origin ${branchName}`, { stdio: 'pipe' });

          const pr = await octokit.rest.pulls.create({
            owner,
            repo,
            title: `Fix #${issue.number}`,
            body: `Closes #${issue.number}\n\n${text}`,
            head: branchName,
            base: 'main',
          });

          console.log(`[FixAgent] Opened PR #${pr.data.number}`);
          results.prs_opened++;
        } catch (err) {
          console.error(`[FixAgent] Git error: ${err.message}`);
          results.errors++;
        }
      } else {
        console.log(`[FixAgent] DRY RUN: Would create fix PR for issue #${issue.number}`);
      }
    } catch (err) {
      console.error(`[FixAgent] Error: ${err.message}`);
      results.errors++;
    }
  }

  await fs.writeFile('fix-agent-results.json', JSON.stringify(results, null, 2));
  console.log('[FixAgent] Done');
}

await main();
