const {test,expect} = require("@playwright/test");
test('mouse hover',async ({page})=>{
    await page.goto("https://www.opencart.com/index.php?route=cms/demo");
    const a = page.locator("(//a[@class='box-overlay'])[1]");
    const b = page.locator("(//a[@class='box-overlay'])[2]");
    //mouse hover
   await  a.hover();
   await b.hover();
   await page.waitForTimeout(3000);
})