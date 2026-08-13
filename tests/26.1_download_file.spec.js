const {test,expect} = require("@playwright/test");
// method 1
test.skip('download_file',async({page})=>{
    await page.goto("https://www.commitquality.com/practice-file-download");
   const d_promise = page.waitForEvent('download');
   await page.locator("//button[normalize-space()='Download File']").click();
   const d = await d_promise ;
   await d.saveAs("./ex");
})
// method 2
test('method 2',async({page})=>{
    await page.goto('https://www.commitquality.com/practice-file-download');
    const [a] =await Promise.all([
     page.waitForEvent('download'),
     page.click("//button[normalize-space()='Download File']")
    ])
    await a.cancel(); // cancel an onging download
  /*  await a.saveAs('./downloads/ex.txt');
    const b = await a.suggestedFilename();
 console.log(b);
  const c = await a.path();
  console.log(c);
  const e = await a.failure();
  expect(e).toBeNull();
  await a.delete(); // deletes temporary file created by playwright
  await a.cancel(); */

})