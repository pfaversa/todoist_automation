import {expect,Locator,Page} from '@playwright/test'

export class HomePage{
    // define selectors
    readonly page: Page;
    readonly topBar: Locator;
    readonly leftBar: Locator;


    // define constructor
    constructor (page: Page) {
        this.topBar = page.locator('id=top_bar_inner');
        this.leftBar = page.locator('id=left_menu');    
    }
    
    // define methods
    async verifyHomePageLoad(){
        await expect(this.leftBar).toBeVisible();
        await expect(this.topBar).toBeVisible();
    }


}