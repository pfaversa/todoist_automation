import {expect,Locator,Page} from '@playwright/test'

export class LandingPage{
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
        this.btnGoToProjects = page.locator('a>div:has-text("Projects")'); // css
    }
    
    // define methods
    async verifyHomePageIsVisible(){
        await expect(this.leftBar).toBeVisible();
        await expect(this.topBar).toBeVisible();
    }

    async openProjectPage(){
        await expect(this.leftProjectPanel).toBeVisible();
        await expect(this.btnGoToProjects).toBeVisible();
        await expect(this.btnGoToProjects).toBeEnabled();
        await this.btnGoToProjects.click();
    }

}