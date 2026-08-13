const {test,expect} = require("@playwright/test");
test('radio_buttons',async({page})=>{
    await page.goto("https://testautomationpractice.blogspot.com/");
   const a =  page.locator("#male");
   await page.locator("#male").click();
   await page.check("#male");
   await expect(a).toBeChecked();
   await expect(a.isChecked()).toBeTruthy();
   await expect(await page.locator('#female').isChecked()).toBeFalsy();
});