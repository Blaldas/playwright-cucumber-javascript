'use strict';

export class BasePage {
    /**
     * @param {import('playwright').Page} Page - Playwright Page instance
     */
    constructor(Page) {
        if (!Page) throw new Error('Page instance is required to construct BasePage');
        this.page = Page;

        console.log("Page: " + this.constructor.name);
    }
}