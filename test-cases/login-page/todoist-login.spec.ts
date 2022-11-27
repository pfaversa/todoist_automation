import {test, expect} from '@playwright/test';
import {LoginPage} from '../../page-objects/login-page';
import dotenv from 'dotenv'
import path from 'path'
import { HomePage } from '../../page-objects/home-page';

const doteenv = require('dotenv').config({path:path.resolve('../todoist_automation/todoist_variables.env')}).parsed
let user_name = doteenv.todoist_username
let user_pass = doteenv.todoist_password
let randomPassword = (Math.random() + 1).toString(36);

test.describe.parallel("Login / Logout Flow", () => {
    let loginPage: LoginPage
    let homePage: HomePage
    
    test.beforeEach(async ({ page }) =>{    
        loginPage = new LoginPage(page);
    })

    test('Unsuccessful login / Non Existent Account', async ({ page }) =>{
        
        const error_message = "Wrong email or password.";
        const user_acocunt = "non_existent@gmail.com"
  
        await loginPage.gotoLoginPage();
        await loginPage.fillEmail(user_acocunt);
        await loginPage.fillPassword(randomPassword)
        await loginPage.clickLoginButton();
        await loginPage.assertErrorMessageLogin(error_message);

    })

    test('Unsuccessful login / Invalide Email', async ({ page }) =>{
        
        const error_message = "Please enter a valid email address.";
        const user_acocunt = "invalid_email@gmail"
        
        await loginPage.gotoLoginPage();
        await loginPage.fillEmail(user_acocunt);
        await loginPage.clickLoginButton();
        await loginPage.assertErrorMessageLogin(error_message);

    })

    test('Successful Login', async ({ page }) =>{
        
        await loginPage.gotoLoginPage();
        await loginPage.fillEmail(user_name);
        await loginPage.fillPassword(user_pass);
        await loginPage.clickLoginButton();
        
        homePage = new HomePage(page);
        await homePage.verifyHomePageLoad();

    })

    test.afterAll(async ({ page }) =>{ 
        
        await page.close()})

})