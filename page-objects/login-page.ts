import {expect,Locator,Page} from '@playwright/test'

export class LoginPage{

    //define selectors
    readonly page: Page;
    readonly inputName: Locator;
    readonly inputPassword: Locator;
    readonly btnLogin: Locator;
    readonly errorBadFormattedEmail: Locator;
    readonly errorCredentials: Locator;
    readonly errorPasswordMissing: Locator;

    //define constructor
    constructor(page: Page){
        this.page = page;
        this.inputName = page.locator('#element-0'); // Id
        this.inputPassword = page.locator('#element-3'); // Id
        this.btnLogin = page.locator('button[data-gtm-id="start-email-login"]'); // css
        this.errorBadFormattedEmail = page.locator('#element-2') // Id
        this.errorCredentials = page.locator('//div[text()="Wrong email or password."]');  // xPath
        this.errorPasswordMissing = page.locator('#element-5'); // Id

    }

    // define methods
    async gotoLoginPage (url: string){
        await this.page.goto(url);
    }

    async fillEmail(username: string){
        
        // username field
        await expect(this.inputName).toBeVisible();
        await expect(this.inputName).toBeEnabled()
        await this.inputName.fill(username);
        expect(await this.inputName.getAttribute('value')).toEqual(username);

    }

    async fillPassword(password: string){    

        // password field
        await expect(this.inputPassword).toBeVisible();
        await expect(this.inputPassword).toBeEnabled();
        await this.inputPassword.fill(password);
        expect(await this.inputPassword.getAttribute('value')).toEqual(password);
    }

    async clickLoginButton(){
        await this.btnLogin.click();
    }

    async verifyCredentialErrorMessage(){
        await expect(this.errorCredentials).toBeVisible();
        await expect(this.errorBadFormattedEmail).toBeHidden();
        await expect(this.errorPasswordMissing).toBeHidden();
    }

    async getCredentialErrorMessage(){
        return (await this.errorCredentials.textContent());
    }

    async verifyPasswordMissingMessage(){
        await expect(this.errorPasswordMissing).toBeVisible();
        await expect(this.errorCredentials).toBeHidden();
        await expect(this.errorBadFormattedEmail).toBeHidden();
    }

    async getPasswordMissingMessag(){
        return (await this.errorPasswordMissing.textContent());
    }

    async verifyBadFormattedEmailMessage(){
        await expect(this.errorBadFormattedEmail).toBeVisible();
        await expect(this.errorCredentials).toBeHidden();
        await expect(this.errorPasswordMissing).toBeHidden();
    }
    
    async getBadFormattedEmailMessage(){
        return (this.errorBadFormattedEmail.textContent());
    }
}