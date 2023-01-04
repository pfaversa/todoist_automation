import {expect,Locator,Page} from '@playwright/test'

export class DialogPage{

    readonly page: Page;

    readonly dialogBox: Locator;
    readonly btnDialogBoxDelete: Locator;
    readonly btnDialogBoxSubmit: Locator;
    readonly btnDialogBoxCancel: Locator

    constructor (page: Page) {    
        this.dialogBox = page.locator('role=dialog'); // role selector
        this.btnDialogBoxDelete = page.locator('role=button[name="Delete"]'); // role selector
        this.btnDialogBoxSubmit = page.locator('button[type="submit"]'); // css
    }

    async verifySubmitDialogBoxIsOpen(){
        await this.dialogBox.waitFor({state:'visible'});
        await expect(this.btnDialogBoxSubmit).toBeVisible();
        await expect(this.btnDialogBoxSubmit).toBeDisabled();
    }

    async verifyDeleteDialogBoxIsOpen(displayed_text: string){
        await this.dialogBox.waitFor({state:'visible'});
        expect(await this.dialogBox.textContent()).toContain(displayed_text);
        await expect(this.btnDialogBoxDelete).toBeVisible();
        await expect(this.btnDialogBoxDelete).toBeEnabled();
    }

    async submitDialogBox(){
        await this.dialogBox.waitFor({state:'visible'});
        await expect(this.btnDialogBoxSubmit).toBeVisible();
        await expect(this.btnDialogBoxSubmit).toBeVisible();
        await this.btnDialogBoxSubmit.click();
        await this.dialogBox.waitFor({state:'hidden'});
    }
    
}