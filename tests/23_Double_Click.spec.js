const{test,expect}=require("@playwright/test");
test('double_click',async ({page})=>{
    await page.goto("https://testautomationpractice.blogspot.com/");
    const a =  page.locator("//button[normalize-space()='Copy Text']");
    // double click
    await a.dblclick();
   const b = await page.locator("#field2");
   await expect(b).toHaveValue("Hello World!");
   await page.waitForTimeout(3000);

})