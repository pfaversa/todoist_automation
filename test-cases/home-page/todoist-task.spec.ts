import { test, expect } from '@playwright/test';
import { LoginPage } from '../../page-objects/login-page';
import { HomePage } from '../../page-objects/home-page';
import { ProjectPage } from '../../page-objects/project-page';
import { TaskPage } from '../../page-objects/task-page';

// Load .env variables
require('dotenv').config();
let user_name = process.env.TODOIST_USERNAME!
let user_pass = process.env.TODOIST_PASSWORD!
let url_page = process.env.TODOIST_URL!

test.describe.only('Project and Task Flow', () =>{

    let loginPage: LoginPage;
    let homePage: HomePage;
    let projectPage: ProjectPage;
    let taskPage: TaskPage;
    
    test.beforeEach(async ({ page }) =>{
        loginPage = new LoginPage(page);
        await loginPage.gotoLoginPage(url_page);
        await loginPage.fillEmail(user_name);
        await loginPage.fillPassword(user_pass);
        await loginPage.clickLoginButton();
 
    })

    test.afterAll(async ({ page }) =>{    
        await page.close()
    })

    test('Create a new project and add a new task. Finally, delete task and project @smoke', async ({ page }) =>{
        // Test Description //
        // Click on Porject menu, then click on 'Add project' button, input project name and save it. Verify new project is created.
        // Then, click on 'Add task' button, input task title and task description. Verify new task was added.
        // Then, delete task and verify task was deleted. 
        // Finally, delete project.

        //Random variables 
        const randoProjectTitle = "Project - " + Math.random().toString(36).substring(2);
        const randoTaskTitle = "Task - " +  Math.random().toString(36).substring(2);
        const randoTaskDescr = "Description - " + Math.random().toString(36).substring(2);

        homePage = new HomePage(page);
        await homePage.verifyHomePageIsVisible();
        await homePage.openProjectPage();

        projectPage = new ProjectPage(page);
        await projectPage.createNewProject(randoProjectTitle);
        expect(await projectPage.getProjectTitleSelected()).toEqual(randoProjectTitle);
        let new_project_id = await projectPage.getProjectId();

        taskPage = new TaskPage(page);

        // get total project tasks before add the new one
        let before_total_tasks = await taskPage.returnTotalProjectTasks();

        await taskPage.clickOnAddTaskButton();
        await taskPage.fillTaskInputFields(randoTaskTitle,randoTaskDescr);
        
        // get total project tasks afer add the new one
        let after_total_tasks = await taskPage.returnTotalProjectTasks();

        // verify project has one more task 
        expect(before_total_tasks < after_total_tasks).toBeTruthy();

        // delete last task added
        await taskPage.deleteLastTaskInList();

        // get total project tasks after delete one
        let finally_total_tasks = await taskPage.returnTotalProjectTasks();

        // verify project has one less task 
        expect(before_total_tasks == finally_total_tasks).toBeTruthy();

        await projectPage.deleteProject(randoProjectTitle);
        expect(await projectPage.getProjectId()).not.toEqual(new_project_id);

    })

    test("Create a new project and add 10 tasks. Finally, delete all tasks created and delete project", async ({ page }) =>{
        // Test Description //
        // Click on Porject menu, then click on 'add project' button, input project name and save it. Verify new project is created.
        // Then, click on 'Add task' button, input task title and task description and save it (repeat the process until 10) 
        // Then, delete all tasks created and finally delete the project.

        const randoProjectTitle = "Project - " + Math.random().toString(36).substring(2);

        homePage = new HomePage(page);
        await homePage.verifyHomePageIsVisible();
        await homePage.openProjectPage();

        projectPage = new ProjectPage(page);
        await projectPage.createNewProject(randoProjectTitle);
        expect(await projectPage.getProjectTitleSelected()).toEqual(randoProjectTitle);
        let new_project_id = await projectPage.getProjectId();


        taskPage = new TaskPage(page);
        
        // get total project tasks before add the new ones
        let before_total_tasks = await taskPage.returnTotalProjectTasks();
        
        taskPage.clickOnAddTaskButton();

        for(let i=1; i<= 10; i++){
            const randoTaskTitle = "Task - " +  Math.random().toString(36).substring(2);
            const randoTaskDescr = "Description - " + Math.random().toString(36).substring(2);
            await taskPage.fillTaskInputFields(randoTaskTitle + ' ('+i+')',randoTaskDescr + ' ('+i+')');
        }

        // get total project tasks afer add the new ones
        let after_total_tasks = await taskPage.returnTotalProjectTasks();

        // verify project has one more task 
        expect(before_total_tasks < after_total_tasks).toBeTruthy();

        for(let i=1; i<=10; i++){
            await taskPage.deleteLastTaskInList();
        }

        // get total project tasks after delete one
        let finally_total_tasks = await taskPage.returnTotalProjectTasks();

        // verify project has one less task 
        expect(before_total_tasks == finally_total_tasks).toBeTruthy();

        await projectPage.deleteProject(randoProjectTitle);
        expect(await projectPage.getProjectId()).not.toEqual(new_project_id);

    })

})
