'use strict';

import { BasePage } from '../../../core/BasePage.js';

/**
 * Base page class for Monetis application pages.
 */
export class MonetisBasePage extends BasePage {


    /**
     * @param {import("playwright-core").Page} page
     */
    constructor(page) {
       super(page);
    }


    /**
     * @param {string} buttonName
     */
    async clickOnButton(buttonName) {
        switch (buttonName) {
            default:
                throw new Error(`Button with name "${buttonName}" not found!`);
        }
    }




}