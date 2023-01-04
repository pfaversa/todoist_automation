import {expect,Locator,Page} from '@playwright/test'

export class HomePage{
    // define selectors
    readonly page: Page;
    readonly topBar: Locator;
    readonly leftBar: Locator;
    readonly leftProjectPanel: Locator;
    readonly btnGoToProjects: Locator;

    // define constructor
    constructor (page: Page) {
        this.page = page;
        this.topBar = page.locator('#top_bar_inner'); // id
        this.leftBar = page.locator('#left_menu_inner'); // id
        this.leftProjectPanel = page.locator('#left-menu-projects-panel'); // id
        this.btnGoToProjects = page.locator('//a//div[text()="Projects"]'); // xpath
    }
    
    // define methods
    async verifyHomePageIsVisible(){
        await expect(this.leftBar).toBeVisible();
        await expect(this.topBar).toBeVisible();
    }

    async openProjectPage(){
        await this.leftProjectPanel.isVisible();
        await this.btnGoToProjects.isVisible();
        await this.btnGoToProjects.isEnabled();
        await this.btnGoToProjects.click();
    }

}