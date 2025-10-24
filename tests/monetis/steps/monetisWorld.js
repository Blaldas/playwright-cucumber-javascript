// @ts-nocheck
import { BaseWorld } from '../../../core/BaseWorld.js';    
import { StartingPage } from '../pages/StartingPage.js';
import { getEnv } from '../../../utils/utils.js';

export class MonetisWorld extends BaseWorld {

  async initPages() {
    await this.openBrowser();
    await this.page.goto(getEnv('MONETIS_URL',));

    // starting page for monetis POM pattern
    this.currentPage = new StartingPage(this.page);
  }
}

