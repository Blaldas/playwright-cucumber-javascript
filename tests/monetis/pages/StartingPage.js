import { MonetisBasePage } from './MonetisBasePage.js';
import { CreateAccountPage } from './CreateAccountPage.js';


export class StartingPage extends MonetisBasePage {


    /**
     * @param {import("playwright-core").Page} page
     */
    constructor(page) {
        super(page);

        this.startYouJourneyBtn = this.page.locator("//a[text()=\"Start your journey \"]")
    }

    /**
     * @param {string} buttonName
     */
    async clickOnButton(buttonName) {
        switch (buttonName) {
            case "Start your journey":
                await this.startYouJourney();
                break;
            default:
                super.clickOnButton(buttonName);
        }
    }


    async startYouJourney() {
        await this.startYouJourneyBtn.click();
        this.currentPage = new CreateAccountPage(this.page);

    }
}
