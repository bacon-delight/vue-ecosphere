import { Octokit } from '@octokit/rest';

export default class GitHubClient {
  constructor(owner, repo) {
    this.octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });
    this.owner = owner;
    this.repo = repo;
  }

  async createIssuesFromAudit(allIssues, prNumber) {
    const issueNumbers = [];

    for (const audit of allIssues) {
      for (const bug of audit.bugs || []) {
        const title = `[${bug.severity.toUpperCase()}] ${bug.title}`;
        const body = `## Route\n\`${audit.route}\`\n\n## Description\n${bug.description}\n\n## Component\n${bug.component || 'Unknown'}\n\nAuto-detected on PR #${prNumber}`;

        try {
          const issue = await this.octokit.rest.issues.create({
            owner: this.owner,
            repo: this.repo,
            title,
            body,
            labels: ['automated-test', `severity:${bug.severity}`, 'needs-fix'],
          });
          issueNumbers.push(issue.data.number);
          console.log(`[GitHub] Created issue #${issue.data.number}`);
        } catch (err) {
          console.error(`[GitHub] Error: ${err.message}`);
        }
      }
    }

    return issueNumbers;
  }
}
