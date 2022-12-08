import {expect,Locator,Page} from '@playwright/test'

export class HomePage{
    // define selectors
    readonly page: Page;
    readonly topBar: Locator;
    readonly leftBar: Locator;
    readonly leftProjectPanel: Locator;
    readonly projects_list: Locator;
    readonly project_title: Locator;
    readonly btnAddTask: Locator;
    readonly taskEditArea: Locator;
    readonly taskTitle: Locator;
    readonly taskDescription: Locator;
    readonly taskList: Locator;
    
    readonly modalAlert: Locator;
    readonly btnModalAlertClose: Locator;
    
    readonly btnMoreMenu: Locator;
    readonly menuTaskEdit: Locator;
    readonly btnMenuDeleteTask: Locator;
    
    readonly dialogBox: Locator;
    readonly btnDialogBoxDelete: Locator;

    // define constructor
    constructor (page: Page) {
        this.page = page;
        this.topBar = page.locator('#top_bar_inner'); //Id
        this.leftBar = page.locator('#left_menu_inner'); //Id
        
        // Project Selectors
        this.leftProjectPanel = page.locator('#left-menu-projects-panel'); //Id
        this.projects_list = page.locator('ul#projects_list>li'); //css        
        this.project_title = page.locator('h1[role="heading"]'); //css
        
        // Task Selectors
        this.btnAddTask = page.locator('"Add task"'); // text
        this.taskEditArea = page.locator('.task_editor__editing_area'); // Class
        this.taskTitle = page.locator('div[aria-label="Task name"]') //css
        this.taskDescription = page.locator('div[aria-label="Description"]'); //css
        this.taskList = page.locator('li.task_list_item.task_list_item--project_hidden');
        
        //  Alert Modal
        this.modalAlert= page.locator('div[role="alert"]'); //css
        this.btnModalAlertClose= page.locator('button[aria-label="Close"]');
        
        // Menu Edit Task
        this.btnMoreMenu = page.locator('button[aria-label="More task actions"]') // css
        this.menuTaskEdit = page.locator('ul[role="menu"]'); //css
        this.btnMenuDeleteTask = page.locator('role=menuitem[name="Delete task"]') // role selector
        

        // Dialo Box
        this.dialogBox = page.locator('role=dialog') // role selector
        this.btnDialogBoxDelete = page.locator('role=button[name="Delete"]') // role selector

    }
    
    // define methods
    async verifyHomePageLoad(){
        await expect(this.leftBar).toBeVisible();
        await expect(this.topBar).toBeVisible();
    }

    async selectProject(project_id: string){     
    // Select project_id from left project panel
        await expect(this.leftProjectPanel).toBeVisible();
        let count = await this.projects_list.count();
        // search for 'project_id' into the project list and  then click on it 
        for(let i=0; i < count; i++){
            if(await this.projects_list.nth(i).getAttribute('data-id') == project_id){
                await this.projects_list.nth(i).isVisible();
                await this.projects_list.nth(i).isEnabled();
                await this.projects_list.nth(i).click();
                break
            }
        }
    }

    async returnPorjectTitleSelected(){
        await this.project_title.isVisible();
        return (this.project_title.textContent());
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
        await this.taskTitle.type(task_title);
        expect(await this.taskTitle.textContent()).toEqual(task_title);
    }

    async inputTaskDescription(task_description: string){
        await this.taskDescription.isVisible();
        await this.taskDescription.isEnabled();
        await this.taskDescription.isEditable();
        await this.taskDescription.type(task_description);
        expect(await this.taskDescription.textContent()).toEqual(task_description);

    }
    
    async fillTaskInputFields(task_title: string, task_description: string){
        
        await this.taskEditArea.isVisible();
        await this.taskEditArea.isEnabled();
        await this.inputTaskTitle(task_title);
        await this.inputTaskDescription(task_description);
    
        await this.clickOnAddTaskButton();
        await this.modalAlert.waitFor({state:'visible'});
        await this.page.waitForResponse(response => response.url().includes('/sync') && response.status() === 200);
        await this.btnModalAlertClose.click();
        await this.modalAlert.waitFor({state:'hidden'});

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

        await this.menuTaskEdit.isVisible();
        await this.btnMenuDeleteTask.isEnabled();
        await this.btnMenuDeleteTask.click();
        
        await this.dialogBox.waitFor({state:'visible'});
        expect(await this.dialogBox.textContent()).toContain(lastTaskTitle);
        await this.btnDialogBoxDelete.isVisible();
        await this.btnDialogBoxDelete.click();

        await this.page.waitForResponse(response => response.url().includes('/sync') && response.status() === 200);
        await this.dialogBox.waitFor({state:'hidden'});

    }
}