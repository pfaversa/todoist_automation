import {expect,Locator,Page} from '@playwright/test'

export class LoginPage{

    //define selectors
    readonly page: Page;
    readonly inputName: Locator;
    readonly inputPassword: Locator;
    readonly btnLogin: Locator;
    readonly wrongInvalidEmail: Locator;
    readonly wrongWrongCredentials: Locator;
    readonly wrongPasswordMissing: Locator;

    //define constructor
    constructor(page: Page){
        this.page = page;
        this.inputName = page.locator('#element-0'); // Id
        this.inputPassword = page.locator('#element-3'); // Id
        this.btnLogin = page.locator('button[data-gtm-id="start-email-login"]'); // css
        this.wrongInvalidEmail = page.locator('#element-2') // Id
        this.wrongWrongCredentials = page.locator('//div[text()="Wrong email or password."]'); //xPath
        this.wrongPasswordMissing = page.locator('#element-5'); //Id

    }

    // define methods
    async gotoLoginPage (url: string){
        await this.page.goto(url);
    }

    async fillEmail(username: string){
        
        // username field
        await this.inputName.isVisible();
        await this.inputName.isEnabled();
        await this.inputName.fill(username);
        expect(await this.inputName.getAttribute('value')).toEqual(username);

    }

    async fillPassword(password: string){    

        // password field
        await this.inputPassword.isVisible();
        await this.inputPassword.isEnabled();
        await this.inputPassword.fill(password);
        expect(await this.inputPassword.getAttribute('value')).toEqual(password);
    }

    async clickLoginButton(){
        await this.btnLogin.click();
    }

    async assertWrongCredentialsMessage(){
        await this.wrongWrongCredentials.isVisible();
        await this.wrongInvalidEmail.isHidden();
        await this.wrongPasswordMissing.isHidden();
    }

    async assertPasswordMissingMessage(){
        await this.wrongPasswordMissing.isVisible();
        await this.wrongWrongCredentials.isHidden();
        await this.wrongInvalidEmail.isHidden();
    }

    async assertInvalidEmailMessage(){
        await this.wrongInvalidEmail.isVisible();
        await this.wrongWrongCredentials.isHidden();
        await this.wrongPasswordMissing.isHidden();
    }

}