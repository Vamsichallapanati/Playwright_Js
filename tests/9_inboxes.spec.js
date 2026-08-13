const {test,expect} = require("@playwright/test");
test('input box',async({page})=>{
    await page.goto("https://testautomationpractice.blogspot.com/");
   const a = await page.locator("[placeholder='Enter Name']");
    await expect(a).toBeVisible();
    await expect(a).toBeEmpty();
    await expect(a).toBeEditable();
    await expect(a).toBeEnabled();
    await page.fill("#name","vamc");
    await page.waitForTimeout(5000); // pausing code
})