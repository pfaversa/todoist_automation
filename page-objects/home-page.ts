import {expect,Locator,Page} from '@playwright/test'

export class HomePage{
    // define selectors
    readonly page: Page;
    readonly topBar: Locator;
    readonly leftBar: Locator;
    readonly leftProjectPanel: Locator;
    readonly projects_list: Locator;
    readonly project_title: Locator;
    readonly btnTask: Locator;
    readonly taskEditArea: Locator;
    readonly taskTitle: Locator;
    readonly taskDescription: Locator;
    readonly task_list: Locator;
    readonly task_alert: Locator;
    readonly btnMoreMenu: Locator;
    
    readonly menuTaskEdit: Locator;
    readonly btnMenuDeleteTask: Locator;
    
    readonly dialogBox: Locator;
    readonly btnDialogBoxDelete: Locator;


    public taskId;

    // define constructor
    constructor (page: Page) {
        this.topBar = page.locator('#top_bar_inner'); //Id
        this.leftBar = page.locator('#left_menu'); // Id
        this.leftProjectPanel = page.locator('#left-menu-projects-panel'); // Id
        //this.project_id = page.locator('//ul[@id="projects_list"]//li[@data-id="2302399643"]');
        this.projects_list = page.locator('#left-menu-projects-panel >> css=#projects_list >> css=[data-type="project_list_item"]');
        
        this.project_title = page.locator('data-testid=view_header__h1');
        this.btnTask = page.locator('"Add task"'); // text
        this.taskEditArea = page.locator('.task_editor__editing_area'); // Class
        this.taskTitle = page.locator('//div[@role="textbox"]')
        this.taskDescription = page.locator('css=[placeholder="Description"]'); // css
        this.task_list = page.locator('li.task_list_item.task_list_item--project_hidden');
        this.task_alert= page.locator('//div[@role="alert"]'); //TODO find a better selector
        
        this.btnMoreMenu = page.locator('//div//button[@data-testid="more_menu"]')

        // Menu Edit Task
        this.menuTaskEdit = page.locator('//ul[@role="menu"]'); //TODO find a better selector
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

    // Select the project_id from the left project panel
    async selectProject(project_id: string){     
        await expect(this.leftProjectPanel).toBeVisible();
        for(const project of await this.projects_list.elementHandles()){
            if((await project.getAttribute('data-id') == project_id)){
                await project.click();
                break;
            }
        }
    }

    async returnPorjectTitleSelected(){
        await this.project_title.isVisible();
        return this.project_title.textContent();
    }

    async addNewTaskOnPorjectSelected(task_title: string, task_description: string){
        
        // click the task button at the end of the page
        await this.btnTask.last().click();
        // validate elements status
        await expect(this.taskEditArea).toBeVisible();
        await expect(this.taskTitle).toBeVisible();
        await expect(this.btnTask).toBeDisabled();
        
        await this.taskTitle.fill(task_title);
        await this.taskDescription.fill(task_description)
        await expect(this.btnTask).toBeEnabled();
        await this.btnTask.click();

        await this.task_alert.waitFor({state:'visible'});
        await this.task_alert.waitFor({state:'hidden'});
        
        this.getNewTaskId();
    }

    async returnTotalTasksProject(){
        return (await this.task_list.elementHandles()).length;
    }

    async getNewTaskId(){
        const task_list = await this.task_list.elementHandles();
        this.taskId = await task_list[await this.returnTotalTasksProject()-1].getAttribute('id') // format taskId: task-1234567890
        console.log(this.taskId);
    }

    async verifyNewTaskAdded(){
        //TODO
    }

    async deleteTask(){

        for(const task of await this.task_list.elementHandles()){
            if((await task.getAttribute('id') == this.taskId)){
                //console.log(this.taskId.locator(this.btnMoreMenu))
                //console.log(await this.task_list.locator('//div//button[@data-testid="more_menu"]'))
                await this.task_list.locator('//div//button[@data-testid="more_menu"]').click();
                //await this.task_list.locator(this.btnMoreMenu).click();
                break;
            }
        }
        
        await this.menuTaskEdit.isVisible();
        await this.btnMenuDeleteTask.click();
        await this.menuTaskEdit.isHidden();

        await this.dialogBox.isVisible();
        await this.btnDialogBoxDelete.click();
        await this.dialogBox.isHidden();
    }
}