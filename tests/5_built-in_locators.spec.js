const {expect,test} = require("@playwright/test");
test('buit-in_locators',async({page})=>{
    await page.goto("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login");
    const img = await page.getByAltText("company-branding");
    await expect(img).toBeVisible();
    await page.getByPlaceholder("Username").fill("Admin");
    await page.getByPlaceholder("Password").fill("admin123");
    await page.getByRole("button",{type :'submit'}).click();
   //const a = await page.getByText("ABCD abcd");
//    await expect(a).toBeVisible();
   const b = await page.locator("//p[@class='oxd-userdropdown-name']").textContent();
   await expect(await page.getByText(b)).toBeVisible();
   await page.getByLabel("Employee Full Name");



})
