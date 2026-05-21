import Anthropic from '@anthropic-ai/sdk';

export default class ClaudeClient {
  constructor() {
    this.client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
  }

  async assessPageAudit(route, audit) {
    if (audit.error) {
      return {
        bugs: [{ title: 'Page load error', severity: 'high', description: audit.error }],
        missing: [],
      };
    }

    const prompt = `Audit results for ${route}:
Console: ${JSON.stringify(audit.consoleMessages)}
Network: ${JSON.stringify(audit.networkErrors)}

Identify real bugs (not false positives). Return JSON:
{ "bugs": [{ "title": "", "severity": "critical|high|medium|low", "description": "", "component": "" }], "missing": [] }`;

    try {
      const message = await this.client.messages.create({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 500,
        messages: [{ role: 'user', content: prompt }],
      });

      const text = message.content[0]?.text || '';
      const json = JSON.parse(text);
      return json;
    } catch (err) {
      console.error(`[Claude] Error: ${err.message}`);
      return { bugs: [], missing: [] };
    }
  }
}
