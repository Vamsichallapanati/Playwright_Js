// finding links text content
//const {test,expect} = require("@playwright/test");
/* import {test,expect} from "@playwright/test";
test('multilocators',async({page})=>{
    await page.goto("https://www.demoblaze.com/index.html");
    const a = await page.$$('a');
    for(const b of a){
        console.log(await b.textContent());
    }
}); */

// finding product names
//const {test,expect} = require("@playwright/test");
import {test,expect} from "@playwright/test";
test('product title',async ({page})=>{
    await page.goto("https://www.demoblaze.com/index.html");
   await page.waitForSelector("//div[@id='tbodyid']//div//h4//a");
   const prod = await page.$$("//div[@id='tbodyid']//div//h4//a");
   for(const c of prod ){
    console.log(await c.textContent());
   }
})
