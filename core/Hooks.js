import { Before, After, BeforeAll, AfterAll, Status } from '@cucumber/cucumber';
import fs from 'fs';


// --- Optional: global setup before all tests ---
BeforeAll(async function () {
  console.log('🚀 Starting Playwright test suite...');
});


Before(async function (scenario) {
  console.log(`Running Before for scenario: ${scenario.pickle.name}`);
  
  await this.initPages();
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

  await this.closeBrowser();

});

// --- Optional: global teardown after all tests ---
AfterAll(async function () {
  console.log('🏁 All Playwright tests completed.');
});
