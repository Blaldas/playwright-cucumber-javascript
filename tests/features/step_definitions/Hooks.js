import { Before, After, BeforeAll, AfterAll, Status } from '@cucumber/cucumber';
import fs from 'fs';
import { chromium } from 'playwright'; // <-- add this line


// --- Optional: global setup before all tests ---
BeforeAll(async function () {
  console.log('🚀 Starting Playwright test suite...');
});


Before(async function (scenario) {
  console.log(`Running Before for scenario: ${scenario.pickle.name}`);

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

  // helper to cleanly close browser/context/page from After hook
  this.closeBrowser = async () => {
    try { if (this.page && !this.page.isClosed()) await this.page.close(); } catch { }
    try { if (this.context) await this.context.close(); } catch { }
    try { if (this.browser) await this.browser.close(); } catch { }
  };
});


// --- Runs after each scenario ---
After(async function (scenario) {
  if (scenario.result?.status === Status.FAILED) {
    // Capture screenshot on failure
    const screenshot = await this.page.screenshot({
      path: `./reports/screenshots/${scenario.pickle.name.replace(/ /g, '_')}.png`,
      fullPage: true,
    });

    // Ensure directory exists
    if (!fs.existsSync('./reports/screenshots')) {
      fs.mkdirSync('./reports/screenshots', { recursive: true });
    }

    console.log(`❌ Scenario failed: ${scenario.pickle.name} — screenshot saved.`);
  } else {
    console.log(`✅ Scenario passed: ${scenario.pickle.name}`);
  }

  const close = { close: process.env.CLOSE !== 'false' };

  if (close == 'false') {
  await this.closeBrowser();
  }
});

// --- Optional: global teardown after all tests ---
AfterAll(async function () {
  console.log('🏁 All Playwright tests completed.');
});
