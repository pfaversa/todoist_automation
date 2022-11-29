import {test, expect} from '@playwright/test';
import {LoginPage} from '../../page-objects/login-page';
import { HomePage } from '../../page-objects/home-page';
import dotenv from 'dotenv'
import path from 'path'

const doteenv = require('dotenv').config({path:path.resolve('../todoist_automation/todoist_variables.env')}).parsed
let user_name = doteenv.todoist_username
let user_pass = doteenv.todoist_password
let project_id = doteenv.todoist_id_base_project

test.describe.only('Task Manager Flow', () =>{

    let loginPage: LoginPage
    let homePage: HomePage
    
    test.beforeEach(async ({ page }) =>{
        loginPage = new LoginPage(page);
        await loginPage.gotoLoginPage();
        await loginPage.fillEmail(user_name);
        await loginPage.fillPassword(user_pass);
        await loginPage.clickLoginButton();
        homePage = new HomePage(page);
        await homePage.verifyHomePageLoad();

    })

    test.only('Add A New Task In Base Porject And Delete It', async ({ page }) =>{

        
       
        await homePage.selectProject(project_id)
        expect(await homePage.returnPorjectTitleSelected()).toBe('Cook Pasta - Step-by-Step');

        const before_total_tasks = await homePage.returnTotalTasksProject();
        //await page.pause();
        await homePage.addNewTaskOnPorjectSelected('last task','last task description');
        
        const after_total_tasks = await homePage.returnTotalTasksProject();

        // verify there is one more task 
        expect(before_total_tasks < after_total_tasks).toBeTruthy();
        await page.pause();
        // delete last task added
        await homePage.deleteTask();


    })

})