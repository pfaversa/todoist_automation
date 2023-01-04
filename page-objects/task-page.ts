import {expect,Locator,Page} from '@playwright/test'
import { AlertPage } from '../page-objects/helper-pages/alert-page'
import {DialogPage} from './helper-pages/dialog-page'

export class TaskPage{

    //Attribute - type Locators
    readonly page: Page;

    readonly btnAddTask: Locator;
    readonly taskEditArea: Locator;
    readonly taskTitle: Locator;
    readonly taskDescription: Locator;
    readonly taskList: Locator;
    
    readonly modalAlert: Locator;
    readonly btnModalAlertClose: Locator;
    
    readonly btnMoreMenu: Locator;
    readonly taskMenu: Locator;
    readonly btnMenuDeleteTask: Locator;
    
    //Attribute - type class
    alertPage: AlertPage;
    dialogPage: DialogPage;

    // define Porject constructor
    constructor (page: Page) {
   
        this.page = page;
        this.alertPage = new AlertPage(this.page);
        this.dialogPage = new DialogPage(this.page);

        // Task Selectors
        this.btnAddTask = page.locator('"Add task"'); // text
        this.taskEditArea = page.locator('.task_editor__editing_area'); // Class
        this.taskTitle = page.locator('div[aria-label="Task name"]') //css
        this.taskDescription = page.locator('div[aria-label="Description"]'); //css
        this.taskList = page.locator('li.task_list_item.task_list_item--project_hidden');
        this.btnMoreMenu = page.locator('button[aria-label="More task actions"]') // css
        this.taskMenu = page.locator('ul[role="menu"]'); //css
        this.btnMenuDeleteTask = page.locator('role=menuitem[name="Delete task"]') // role selector
        

    }
    async clickOnAddTaskButton(){
        // click on Add Task button 
        await this.btnAddTask.isVisible;
        await this.btnAddTask.isEnabled();
        await this.btnAddTask.click();
    }

    async inputTaskTitle(task_title: string){
        await this.taskTitle.isVisible();
        await this.taskTitle.isEnabled();
        await this.taskTitle.isEditable();
        await this.taskTitle.fill(task_title);
        expect(await this.taskTitle.textContent()).toEqual(task_title);
    }

    async inputTaskDescription(task_description: string){
        await this.taskDescription.isVisible();
        await this.taskDescription.isEnabled();
        await this.taskDescription.isEditable();
        await this.taskDescription.fill(task_description);
        expect(await this.taskDescription.textContent()).toEqual(task_description);

    }
    
    async fillTaskInputFields(task_title: string, task_description: string){
        
        await this.taskEditArea.isVisible();
        await this.taskEditArea.isEnabled();

        await this.inputTaskTitle(task_title);
        
        await this.inputTaskDescription(task_description);
    
        await this.clickOnAddTaskButton();

        await this.alertPage.verifyAlertIsVisible();
        await this.page.waitForResponse(response => response.url().includes('/sync') && response.status() === 200);
        await this.alertPage.clickOncloseAlert();
    }

    async returnTotalProjectTasks(){
        return (await this.taskList.count());
    }

    async deleteLastTaskInList(){

        await this.taskList.last().isVisible();
        await this.taskList.last().isEnabled()
        let lastTaskTitle = await this.taskList.last().locator('//div[contains(@class,"task_content")]').textContent();
        await this.taskList.last().focus();
        await this.taskList.last().click({button : 'right'});

        await this.taskMenu.isVisible();
        await this.btnMenuDeleteTask.isEnabled();
        await this.btnMenuDeleteTask.click();
        
        await this.dialogPage.verifyDeleteDialogBoxIsOpen(lastTaskTitle!);
        await this.dialogPage.submitDialogBox();
        await this.page.waitForResponse(response => response.url().includes('/sync') && response.status() === 200);

    }
}