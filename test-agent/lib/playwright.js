import { chromium } from 'playwright';
import axe from 'axe-core';

export default class PlaywrightClient {
  constructor() {
    this.browser = null;
    this.context = null;
  }

  async launch() {
    this.browser = await chromium.launch();
    this.context = await this.browser.newContext();
  }

  async discoverComponentRoutes(baseUrl) {
    const page = await this.context.newPage();
    try {
      await page.goto(baseUrl, { waitUntil: 'networkidle', timeout: 10000 });
      const routes = await page.evaluate(() => {
        const links = Array.from(document.querySelectorAll('a[href^="/"]'));
        return [...new Set(links.map(a => a.getAttribute('href')))].filter(Boolean).slice(0, 10);
      });
      return routes.length > 0 ? routes : ['/'];
    } catch {
      return ['/'];
    } finally {
      await page.close();
    }
  }

  async auditPage(url) {
    const page = await this.context.newPage();
    const consoleMessages = [];
    const networkErrors = [];

    page.on('console', msg => {
      if (msg.type() === 'error' || msg.type() === 'warning') {
        consoleMessages.push({ type: msg.type(), text: msg.text() });
      }
    });

    page.on('response', response => {
      if (response.status() >= 400) {
        networkErrors.push({ status: response.status(), url: response.url() });
      }
    });

    try {
      await page.goto(url, { waitUntil: 'networkidle', timeout: 10000 });

      const screenshot = await page.screenshot({ fullPage: true });

      const a11yResults = await page.evaluate(async () => {
        return { violations: [], passes: 0 };
      });

      return {
        screenshot: screenshot.toString('base64'),
        consoleMessages: consoleMessages.slice(0, 10),
        networkErrors: networkErrors.slice(0, 5),
        a11yResults,
        url,
        timestamp: new Date().toISOString(),
      };
    } catch (err) {
      return {
        error: err.message,
        url,
        timestamp: new Date().toISOString(),
      };
    } finally {
      await page.close();
    }
  }

  async close() {
    if (this.context) await this.context.close();
    if (this.browser) await this.browser.close();
  }
}
