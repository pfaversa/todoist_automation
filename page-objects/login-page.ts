import {expect,Locator,Page} from '@playwright/test'

export class LoginPage{

    //define selectors
    readonly page: Page;
    readonly inputName: Locator;
    readonly inputPassword: Locator;
    readonly loginButton: Locator;
    public errorMessage: Locator;

    constructor(page: Page){
        this.page = page;
        this.inputName = page.locator('id=element-0');
        this.inputPassword = page.locator('id=element-3');
        this.loginButton = page.locator('//button[@data-gtm-id="start-email-login"]'); //css=[data-test-id="foo"]

    }

    async gotoLoginPage (){
        await this.page.goto("https://todoist.com/auth/login");
    }

    async fillEmail(username: string){
        
        // username field
        await this.inputName.isEnabled();
        await this.inputName.fill(username);
    }

    async fillPassword(password: string){    
        // password field
        await this.inputPassword.isEnabled();
        await this.inputPassword.fill(password);
    }

    async clickLoginButton(){
        await this.loginButton.click();
    }

    async assertErrorMessageLogin(message: string){
        this.errorMessage = this.page.locator('text='+ message)
        await expect(this.errorMessage).toBeVisible();
    
    }


}

