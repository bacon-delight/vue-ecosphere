import { parseArgs } from 'node:util';
import fs from 'node:fs/promises';
import PlaywrightClient from './lib/playwright.js';
import ClaudeClient from './lib/claude.js';
import GitHubClient from './lib/github.js';

const { values: args } = parseArgs({
  options: {
    url: { type: 'string', short: 'u' },
    pr: { type: 'string', short: 'p' },
    owner: { type: 'string' },
    repo: { type: 'string' },
  },
  strict: true,
});

async function main() {
  const { url, pr, owner, repo } = args;

  if (!url || !pr || !owner || !repo) {
    console.error('Missing required args: --url, --pr, --owner, --repo');
    process.exit(1);
  }

  console.log(`[TestAgent] Starting audit of ${url} (PR #${pr})`);

  const pw = new PlaywrightClient();
  const claude = new ClaudeClient();
  const gh = new GitHubClient(owner, repo);

  const allIssues = [];

  try {
    await pw.launch();
    const routes = await pw.discoverComponentRoutes(url);
    console.log(`[TestAgent] Found ${routes.length} component pages`);

    for (const route of routes) {
      console.log(`[TestAgent] Auditing ${route}...`);

      const audit = await pw.auditPage(url + route);
      const assessment = await claude.assessPageAudit(route, audit);

      if (assessment.bugs?.length > 0 || assessment.missing?.length > 0) {
        allIssues.push({
          route,
          ...assessment,
          timestamp: new Date().toISOString(),
        });
      }
    }

    if (allIssues.length > 0) {
      console.log(`[TestAgent] Creating ${allIssues.length} GitHub issues...`);
      const issueNumbers = await gh.createIssuesFromAudit(allIssues, parseInt(pr));
      console.log(`[TestAgent] Created issues: ${issueNumbers.join(', ')}`);
    } else {
      console.log('[TestAgent] ✅ All checks passed; no issues found');
    }

    await fs.writeFile(
      'test-agent-results.json',
      JSON.stringify({
        total_issues: allIssues.length,
        routes_tested: routes.length,
        timestamp: new Date().toISOString(),
      }, null, 2)
    );

  } catch (err) {
    console.error('[TestAgent] Fatal error:', err.message);
    process.exit(1);
  } finally {
    await pw.close();
  }
}

await main();
