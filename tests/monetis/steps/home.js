import { When } from '@cucumber/cucumber';

// /C:/Users/marmi/Desktop/plawrigt-cucumber-javascript/steps/steps.js

When('I search for {string}', async function (url) {
    if (!this.page) {
        throw new Error('No Playwright page found on World. Ensure Hooks.js sets this.page in the Before hook.');
    }

    // If the user passed a bare host like "google" or "www.google.com", prepend https://
    const normalized = /^[a-zA-Z][a-zA-Z0-9+.-]*:\/\//.test(url) ? url : `https://${url}`;

    await this.page.goto(normalized, { waitUntil: 'load' });

});