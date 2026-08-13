//const {test,expect} =require("@playwright/test");
import {test,expect} from "@playwright/test";
test('check_box',async({page})=>{
    await page.goto("https://testautomationpractice.blogspot.com/");
    // single checkbox
   /* const a = await page.locator(".form-check-input#monday");
    await page.click("#monday");
    await expect(a).toBeChecked();
     expect(a.isChecked()).toBeTruthy();
    await page.waitForTimeout(3000); */
    // multiple checkbox
    const locators = ["#monday","#tuesday","#friday","#wednesday"];
    for(const loc of locators){
        await page.locator(loc).check();
    }
     for(const loc1 of locators){
        if(await page.locator(loc1).isChecked())
        await page.locator(loc1).uncheck();
     }
})