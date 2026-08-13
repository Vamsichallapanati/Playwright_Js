//const {test,exact} = require("@playwright/test");
import {test,expect} from "@playwright/test";
test('locators',async({page})=>{
    await page.goto("https://www.demoblaze.com/index.html");
    //click on login
    // await page.locator("//a[normalize-space ='Login']").click();
    await page.click("//a[normalize-space () = 'Log in']");
    // provide username
    //await page.locator("#loginusername").fill("pavanol");
    await page.fill("#loginusername","pavanol");
   // await page.type("#loginusername","vamsi");
   // provide password
   await page.fill("//input[@id='loginpassword']","test@123");
   // click login
   await page.click("//button[normalize-space()='Log in']");
   // check logout link visible
   const log =  page.locator("id=logout2");
   await expect(log).toBeVisible();
   await page.close();


})