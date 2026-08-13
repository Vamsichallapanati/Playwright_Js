const {test,expect} = require("@playwright/test");
test("home page",async({page})=>{
await page.goto("https://www.demoblaze.com/");
const url = await page.url();
console.log(url);
await expect(page).toHaveURL("https://www.demoblaze.com/");
await expect(page).toHaveTitle("STORE");
const title = await page.title();
console.log(title);
await page.close();
})













