import {expect,Locator,Page} from '@playwright/test'

export class LoginPage{

    //define selectors
    readonly page: Page;
    readonly inputName: Locator;
    readonly inputPassword: Locator;
    readonly btnLogin: Locator;
    readonly msInvalidEmail: Locator;
    readonly msWrongCredentials: Locator;

    //define constructor
    constructor(page: Page){
        this.page = page;
        this.inputName = page.locator('#element-0'); // Id
        this.inputPassword = page.locator('#element-3'); // Id
        this.btnLogin = page.locator('button[data-gtm-id="start-email-login"]'); // css
        this.msInvalidEmail = page.locator('#element-2') // Id
        this.msWrongCredentials = page.locator('//div[text()="Wrong email or password."]'); //xPath
    }

    // define methods
    async gotoLoginPage (url: string){
        await this.page.goto(url);
    }

    async fillEmail(username: string){
        
        // username field
        await this.inputName.isEnabled();
        await this.inputName.fill(username);
        expect(await this.inputName.getAttribute('value')).toEqual(username);

    }

    async fillPassword(password: string){    
        // password field
        await this.inputPassword.isEnabled();
        await this.inputPassword.fill(password);
        expect(await this.inputPassword.getAttribute('value')).toEqual(password);
    }

    async clickLoginButton(){
        await this.btnLogin.click();
    }

    async assertWrongCredentialsMessage(){
        await this.msWrongCredentials.isVisible();
        await this.msInvalidEmail.isHidden();
    }

    async assertInvalidEmailMessage(){
        await this.msInvalidEmail.isVisible();
        await this.msWrongCredentials.isHidden();
        
    }

}

