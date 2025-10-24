import { chromium } from 'playwright';

export class BaseWorld {
    async openBrowser() {
        // Choose browser: set BROWSER=chrome to use installed Chrome, BROWSER=msedge for Edge,
        // otherwise default to Playwright's chromium.
        const browserEnv = (process.env.BROWSER || 'chromium').toLowerCase();
        const launchOptions = { headless: process.env.HEADLESS !== 'false' };

        if (browserEnv === 'chrome') {
            this.browser = await chromium.launch({ ...launchOptions, channel: 'chrome' });
        } else if (browserEnv === 'msedge') {
            this.browser = await chromium.launch({ ...launchOptions, channel: 'msedge' });
        } else {
            this.browser = await chromium.launch(launchOptions);
        }


        this.context = await this.browser.newContext();
        this.page = await this.context.newPage();
    }

    async closeBrowser() {
        const close = { close: process.env.CLOSE !== 'false' };

        if (close == 'false') {
            await this.closeBrowser();
        }
    }
}