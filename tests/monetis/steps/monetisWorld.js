// @ts-nocheck
import { BaseWorld } from '../../../core/BaseWorld.js';    
import { StartingPage } from '../pages/StartingPage.js';


export class MonetisWorld extends BaseWorld {

  async initPages() {
    await this.openBrowser();
    await this.page.goto("https://monetis-delta.vercel.app/");

    // starting page for monetis POM pattern
    this.currentPage = new StartingPage(this.page);
  }
}

