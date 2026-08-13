const {test,expect} = require("@playwright/test");
test('right_click',async ({page})=>{
    await page.goto("https://swisnl.github.io/jQuery-contextMenu/demo.html");
    const a= page.locator("//span[normalize-space()='right click me']");
    //right click
    await a.click({button : 'right'});
    await page.waitForTimeout(3000);
})