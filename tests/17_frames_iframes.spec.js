const {test,expect} = require("@playwright/test");
test('frames',async({page})=>{
    await page.goto("https://letcode.in/frame");
  // total frames
  const a = await page.frames();
  console.log(a.length);

  // accesing elements inside frames using url or name
 const b =   page.frame({url:'https://letcode.in/frameui'});
   await b.fill("[name='fname']","vamc");
    //const c =  page.frame("firstFr"); // in this website name is not specified this syntax by using name
    //c.fill("[name='fname']",'vamc');

   // accesing by using frame locator
//  const d =  page.frameLocator("#firstFr").locator("[name='fname']");
  //  d.fill('vamsi') 
   await page.waitForTimeout(2000);

   // 
})