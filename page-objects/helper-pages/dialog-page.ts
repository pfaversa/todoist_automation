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
        await this.btnDialogBoxSubmit.isVisible();
        await this.btnDialogBoxSubmit.isDisabled();
    }

    async verifyDeleteDialogBoxIsOpen(displayed_text: string){
        await this.dialogBox.waitFor({state:'visible'});
        expect(await this.dialogBox.textContent()).toContain(displayed_text);
        await this.btnDialogBoxDelete.isVisible();
        await this.btnDialogBoxDelete.isEnabled();
    }

    async submitDialogBox(){
        await this.dialogBox.waitFor({state:'visible'});
        await this.btnDialogBoxSubmit.isVisible();
        await this.btnDialogBoxSubmit.isEnabled();
        await this.btnDialogBoxSubmit.click();
        await this.dialogBox.waitFor({state:'hidden'});
    }
    
}