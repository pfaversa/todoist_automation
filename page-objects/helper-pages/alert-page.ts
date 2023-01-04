import {Locator,Page} from '@playwright/test'

export class AlertPage{
    
    readonly page: Page;

    //Attribute - type Locators
    readonly alertBox: Locator;
    readonly btnAlertClose: Locator;

    constructor (page: Page) {
        this.page = page;
        
        this.alertBox= page.locator('div[role="alert"]'); //css
        this.btnAlertClose= page.locator('button[aria-label="Close"]'); //css
        
    }

    async verifyAlertIsVisible(){
        await this.alertBox.waitFor({state:'visible'});
    }
    
    async clickOncloseAlert(){
        await this.btnAlertClose.isVisible();
        await this.btnAlertClose.isEnabled();
        await this.btnAlertClose.click();
        await this.alertBox.waitFor({state:'hidden'});
    }


}