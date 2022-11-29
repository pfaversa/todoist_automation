import {expect,Locator,Page} from '@playwright/test'

export class LoginPage{

    //define selectors
    readonly page: Page;
    readonly inputName: Locator;
    readonly inputPassword: Locator;
    readonly btnLogin: Locator;
    public errorMessage: Locator;

    constructor(page: Page){
        this.page = page;
        this.inputName = page.locator('#element-0'); // Id
        this.inputPassword = page.locator('#element-3'); // Id
        this.btnLogin = page.locator('css=[data-gtm-id="start-email-login"]'); // css
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
        await this.btnLogin.click();
    }

    async assertErrorMessageLogin(message: string){
        this.errorMessage = this.page.locator('text='+ message)
        await expect(this.errorMessage).toBeVisible();
    
    }


}

