import { setWorldConstructor, World } from '@cucumber/cucumber';
import { BaseWorld } from '../../../core/BaseWorld.js';    
import { MonetisLoginPage } from '../pages/MonetisLoginPage.js';


class MonetisWorld extends BaseWorld {

  async initPages() {
    this.loginPage = new MonetisLoginPage(this.page);
  }
}

setWorldConstructor(MonetisWorld);