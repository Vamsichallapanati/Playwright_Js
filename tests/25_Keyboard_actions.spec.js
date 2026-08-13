const {test,expect} = require("@playwright/test");
test('keyboard_actions',async ({page})=>{
    await page.goto("https://gotranscript.com/text-compare");
   await page.type("(//textarea[@class='form-control s-text-compare__body-textarea'])[1]","vamc is ....");
    // ctrl + a (two keys at a time press)
    await page.keyboard.press("Control+a");
    // ctrl + c 
    await page.keyboard.press('Control+c')
    // to press a single key
    await page.keyboard.down('Tab');
    await page.keyboard.up('Tab'); // optional
    // ctrl + v
    
    await page.keyboard.press('Control+v')
    await page.waitForTimeout(3000); 
})