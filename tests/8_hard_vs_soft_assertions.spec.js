const {test,expect} = require("@playwright/test");
test('soft_vs_hard',async({page})=>{
   /* await page.goto("https://www.demoblaze.com/");
    await expect(page).toHaveURL("https://www.demoblazecom/");
    await expect(page).toHaveTitle("STORE");
    await expect(await page.locator("//a[normalize-space() = 'PRODUCT STORE']")).toBeVisible(); */
    
await page.goto("https://www.demoblaze.com/");
    await expect.soft(page).toHaveURL("https://www.demoblazecom/");
    await expect.soft(page).toHaveTitle("STORE");
    await expect.soft(await page.locator("//a[normalize-space() = 'PRODUCT STORE']")).toBeVisible();
})