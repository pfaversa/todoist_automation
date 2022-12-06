import {test, expect} from '@playwright/test';
import {LoginPage} from '../../page-objects/login-page';
import { HomePage } from '../../page-objects/home-page';

require('dotenv').config();
let user_name = process.env.TODOIST_USERNAME!
let user_pass = process.env.TODOIST_PASSWORD!
let project_id = process.env.TODOIST_ID_BASE_PROJECT!
let project_title = process.env.TODOIST_TITLE_BASE_PROJECT!
let url_page = process.env.TODOIST_URL!
let new_total_tasks = process.env.TODOIST_TOTAL_TASKS_TO_ADD!

test.describe('Task Manager Flow', () =>{

    let loginPage: LoginPage
    let homePage: HomePage
    
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

    test.only('Add A New Task In Porject And Delete It @smoke', async ({ page }) =>{
        const randoTitle = Math.random().toString(36).substring(2);
        const rnadoDescr = Math.random().toString(36).substring(2);

        homePage = new HomePage(page);
        await homePage.verifyHomePageLoad();

        await homePage.selectProject(project_id)
        expect(await homePage.returnPorjectTitleSelected()).toEqual(project_title);

        // get total project tasks before add the new one
        let before_total_tasks = await homePage.returnTotalProjectTasks();

        await homePage.clickOnAddTaskButton();
        await homePage.fillTaskInputFields('Task: '+randoTitle,'Description: ' + rnadoDescr);
        
        // get total project tasks afer add the new one
        let after_total_tasks = await homePage.returnTotalProjectTasks();

        // verify project has one more task 
        expect(before_total_tasks < after_total_tasks).toBeTruthy();

        // delete last task added
        await homePage.deleteLastTaskInList();

        // get total project tasks after delete one
        let finally_total_tasks = await homePage.returnTotalProjectTasks();

        // verify project has one less task 
        expect(before_total_tasks == finally_total_tasks).toBeTruthy();


    })

    test("Add 10 Tasks In Project Then Delete Them", async ({ page }) =>{

        homePage = new HomePage(page);
        await homePage.verifyHomePageLoad();

        await homePage.selectProject(project_id)
        expect(await homePage.returnPorjectTitleSelected()).toEqual(project_title);

        homePage.clickOnAddTaskButton();

        // get total project tasks before add the new ones
        let before_total_tasks = await homePage.returnTotalProjectTasks();
  
        for(let i=1; i<= Number(new_total_tasks);i++){
            const randoTitle = Math.random().toString(36).substring(2);
            const rnadoDescr = Math.random().toString(36).substring(2);
            await homePage.fillTaskInputFields('Task '+i+': '+randoTitle,'Description--->' + rnadoDescr);
        }

        // get total project tasks afer add the new ones
        let after_total_tasks = await homePage.returnTotalProjectTasks();

        // verify project has one more task 
        expect(before_total_tasks < after_total_tasks).toBeTruthy();

        for(let i=1; i<=Number(new_total_tasks);i++){
            await homePage.deleteLastTaskInList();
        }

        // get total project tasks after delete one
        let finally_total_tasks = await homePage.returnTotalProjectTasks();

        // verify project has one less task 
        expect(before_total_tasks == finally_total_tasks).toBeTruthy();

    })

})
