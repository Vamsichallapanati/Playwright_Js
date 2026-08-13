import {test,expect} from "@playwright/test";
test('dropdown',async({page})=>{
await page.goto("https://testautomationpractice.blogspot.com/");
// await page.locator("#country").selectOption({label : "India"}); //using label or visible text
// await page.locator("#country").selectOption("India"); // visible text
// await page.locator('#country').selectOption({value : "germany"}); // value
// await page.locator("#country").selectOption({index :  1}); // index
await page.selectOption("#country","Canada"); // by text
await page.waitForTimeout(4000);
})
