import {test, expect} from '@playwright/test';
import { LoginPage } from '../../page-objects/login-page';
import { LandingPage } from '../../page-objects/landing-page';

require('dotenv').config();
let user_name = process.env.TODOIST_USERNAME!;
let user_pass = process.env.TODOIST_PASSWORD!;
let url_page = process.env.TODOIST_URL!;
let randomPassword = (Math.random() + 1).toString(36);

test.describe("Login / Logout Flow", () => {
    let loginPage: LoginPage
    let landingPage: LandingPage
    
    test.beforeEach(async ({ page }) =>{    
        loginPage = new LoginPage(page);
        await loginPage.gotoLoginPage(url_page);
    })

    test.afterAll(async ({ page }) =>{    
        await page.close()
    })

    test('Unsuccessful login / Wrong Credentials Account @smoke', async ({ page }) =>{
        
        const user_acocunt = "non_existent@gmail.com"
        await loginPage.fillEmail(user_acocunt);
        await loginPage.fillPassword(randomPassword);
        await loginPage.clickLoginButton();
        await loginPage.verifyCredentialErrorMessage();
        
        expect(page.url()).toEqual(url_page);
        expect(await loginPage.getCredentialErrorMessage()).toContain("Wrong email or password.");

    })

    test('Unsuccessful login / Password Missing', async ({ page }) =>{
        
        const user_acocunt = "test_emial@gmail.com"
        
        await loginPage.fillEmail(user_acocunt);
        await loginPage.clickLoginButton();
        await loginPage.verifyPasswordMissingMessage();
        
        expect(page.url()).toEqual(url_page);
        expect(await loginPage.getPasswordMissingMessag()).toContain("Passwords must be at least 8 characters long.");

    })

    test('Unsuccessful login / Bad Formatted Email', async ({ page }) =>{
        
        const user_acocunt = "invalid_email@gmail"        
        
        await loginPage.fillEmail(user_acocunt);
        await loginPage.clickLoginButton();
        await loginPage.verifyBadFormattedEmailMessage();
        expect(page.url()).toEqual(url_page);
        expect(await loginPage.getBadFormattedEmailMessage()).toContain("Please enter a valid email address.");

    })

    test('Successful Login @smoke', async ({ page }) =>{
        
        await loginPage.fillEmail(user_name);
        await loginPage.fillPassword(user_pass);
        await loginPage.clickLoginButton();
        
        landingPage = new LandingPage(page);
        await landingPage.verifyHomePageIsVisible();
        expect(await page.title()).toEqual('Today: Todoist');

    })

})
