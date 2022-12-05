import {test, expect} from '@playwright/test';
import {LoginPage} from '../../page-objects/login-page';
import dotenv from 'dotenv'
import path from 'path'
import { HomePage } from '../../page-objects/home-page';

dotenv.config({ path: path.resolve(__dirname, '..', 'todoist_variables.env') }).parsed;
let user_name = process.env.todoist_username!;
let user_pass = process.env.todoist_password!;
let randomPassword = (Math.random() + 1).toString(36);
let url_page = process.env.todoist_url!;

test.describe("Login / Logout Flow", () => {
    let loginPage: LoginPage
    let homePage: HomePage
    
    test.beforeEach(async ({ page }) =>{    
        loginPage = new LoginPage(page);
    })

    test.afterAll(async ({ page }) =>{    
        await page.close()
    })

    test('Unsuccessful login / Wrong Email Account @smoke', async ({ page }) =>{
        
        const user_acocunt = "non_existent@gmail.com"
  
        await loginPage.gotoLoginPage(url_page);
        await loginPage.fillEmail(user_acocunt);
        await loginPage.fillPassword(randomPassword)
        await loginPage.clickLoginButton();
        await loginPage.assertWrongCredentialsMessage()
        expect(page.url()).toEqual(url_page);
    })

    test('Unsuccessful login / Password Missing', async ({ page }) =>{
        
        const user_acocunt = "test_emial@gmail.com"
  
        await loginPage.gotoLoginPage(url_page);
        await loginPage.fillEmail(user_acocunt);
        await loginPage.clickLoginButton();
        await loginPage.assertWrongCredentialsMessage()
        expect(page.url()).toEqual(url_page);
    })

    test('Unsuccessful login / Invalide Email', async ({ page }) =>{
        
        const user_acocunt = "invalid_email@gmail"
        
        await loginPage.gotoLoginPage(url_page);
        await loginPage.fillEmail(user_acocunt);
        await loginPage.clickLoginButton();
        await loginPage.assertInvalidEmailMessage();
        expect(page.url()).toEqual(url_page);
    })

    test('Successful Login', async ({ page }) =>{
        
        await loginPage.gotoLoginPage(url_page);
        await loginPage.fillEmail(user_name);
        await loginPage.fillPassword(user_pass);
        await loginPage.clickLoginButton();
        
        homePage = new HomePage(page);
        await homePage.verifyHomePageLoad();
        expect(await page.title()).toEqual('Today: Todoist');

    })

})
