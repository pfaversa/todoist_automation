import {expect,Locator,Page} from '@playwright/test'
import { DialogPage } from './helper-pages/dialog-page'

export class ProjectPage{

    readonly page: Page;
    
    //Attribute - type Locators
    readonly pageTitle: Locator;
    readonly activeTab: Locator;
    readonly archivedTab: Locator;
    readonly projectsList: Locator;
    readonly projectTitle: Locator;
    readonly btnAddNewProject: Locator;
    readonly inputProjectName: Locator;
    readonly btnMoreProjectActions: Locator;
    readonly projectMenu: Locator;
    readonly btnMenuDeleteProject: Locator;

    //Attribute - type string
    project_id: string;

    //Attribute - type class
    dialogBox: DialogPage;

    // define Porject constructor
    constructor (page: Page) {
   
        this.page = page;
        this.dialogBox = new DialogPage(this.page);

        this.pageTitle = page.locator('h1:has-text("Projects")'); //css
        this.activeTab = page.locator('#active'); //id
        this.archivedTab = page.locator('#archived'); //id

        this.projectsList = page.locator('ul#projects_list>li'); //css        
        this.projectTitle = page.locator('h1[role="heading"]'); //css

        this.inputProjectName = page.locator('#edit_project_modal_field_name'); //id
        this.btnAddNewProject = page.locator('button>>span:has-text("Add project")'); // css
        this.btnMoreProjectActions = page.locator('button[aria-label="Project options menu"]') //css
        this.projectMenu = page.locator('ul.menu_list.project_view_menu') //class
        this.btnMenuDeleteProject = page.locator('role=menuitem[name="Delete project"]') // role selector
       
    }

    async verifyProjectPageIsVisible(){
        await expect(this.pageTitle).toBeVisible();
        
        await expect(this.activeTab).toBeVisible();
        expect(await this.activeTab.getAttribute('aria-selected')).toBeTruthy();
        
        await expect(this.archivedTab).toBeVisible();
        
        await expect(this.btnAddNewProject).toBeEnabled();
        await expect(this.btnAddNewProject).toBeVisible();
        
        expect(this.page).toHaveURL(new RegExp('/app/projects/active$'));
    }

    async createNewProject(project_name: string){        
        await expect(this.btnAddNewProject).toBeEnabled();
        await expect(this.btnAddNewProject).toBeVisible();
        await this.btnAddNewProject.click();
        
        await this.dialogBox.verifySubmitDialogBoxIsOpen();
        
        await expect(this.inputProjectName).toBeVisible();
        await expect(this.inputProjectName).toBeEnabled();
        await this.inputProjectName.fill(project_name);

        await this.dialogBox.submitDialogBox();

        await this.page.waitForResponse(response => response.url().includes('/sync') && response.status() === 200);

    }

    async getProjectId(){
        this.project_id = this.page.url().substring(32);
        return  this.project_id;
    }

    async getProjectTitleSelected(){
        await expect(this.projectTitle).toBeVisible();
        return (this.projectTitle.textContent());
    }

    async deleteProject(project_name: string){
        await this.btnMoreProjectActions.isVisible();
        await this.btnMoreProjectActions.isEnabled();
        await this.btnMoreProjectActions.click();

        await this.projectMenu.waitFor({state:'visible'});
        await this.btnMenuDeleteProject.isVisible();
        await this.btnMenuDeleteProject.isEnabled();
        await this.btnMenuDeleteProject.click();

        await this.dialogBox.verifyDeleteDialogBoxIsOpen(project_name);
        await this.dialogBox.submitDialogBox();

        await this.page.waitForResponse(response => response.url().includes('/sync') && response.status() === 200);
    }

}