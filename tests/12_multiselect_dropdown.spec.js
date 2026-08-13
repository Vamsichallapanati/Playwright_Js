const {test,expect} = require("@playwright/test");
test('mutiselect_dropdown',async({page})=>{
    // to select multiple options from dropdown
    await page.goto("https://testautomationpractice.blogspot.com/");
   /* await page.selectOption("#colors",['Red',"blue","Yellow"]);
    await page.waitForTimeout(4000); */

    // to check no of options in dropdown
    // await expect(page.locator("#colors option")).toHaveCount(7);
    // check no of options in dropdown using js array
   // const a = await page.$$("#colors option");
    // console.log(a.length);
   // await expect(a.length).toBe(7);
    // check presence of value in dropdown
     const b = await page.locator("#colors").textContent();
     await expect(b.includes('Pink')).toBeFalsy();
});
