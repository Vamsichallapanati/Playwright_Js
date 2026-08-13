const {test,expect} = require("@playwright/test");
test.skip('alerts-ok',async({page})=>{
    await page.goto("https://testautomationpractice.blogspot.com/");
    // enabling dialog window handler
    page.on('dialog',async dia=>{
        expect(dia.type()).toContain('alert');
        expect(dia.message()).toContain('I am an alert box!');
        await dia.accept();
    })
    await page.click("[id='alertBtn']");
});

test.skip('confirmation-alert-ok-cancel',async({page})=>{
        await page.goto("https://testautomationpractice.blogspot.com/");
 // enabling dialog window handler
 page.on('dialog',async d=>{
     expect(d.type()).toContain('confirm');
    expect (d.message()).toContain('Press a button!');
     await d.accept(); // closes by ok
   // await d.dismiss(); // closes by cancel

 })
 await page.click('[id="confirmBtn"]');
 await expect(page.locator('[id="demo"]')).toHaveText("You pressed OK!");
});
 test('prompt',async({page})=>{
    await page.goto("https://testautomationpractice.blogspot.com/");
    page.on('dialog',async di=>{
        expect(di.type()).toContain('prompt');
        expect(di.message()).toContain("Please enter your name:");
        expect(di.defaultValue()).toContain("Harry Potter");
        await di.accept('Harry Potter');
    })
    await page.click("[id='promptBtn']");
    await expect(page.locator('[id="demo"]')).toHaveText("Hello Harry Potter! How are you today?")
 });