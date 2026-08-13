const{test,expect}=require("@playwright/test");
test('dd_assertions',async({page})=>{
    await page.goto("https://testautomationpractice.blogspot.com/");
    //assertions
    // 1) to count no of options in dropdown
   // const options = await page.locator("#country option");
    //await expect(options).toHaveCount(10);
    // 2 approach to count no of options
    /* const opt = await page.$$("#country option");
    console.log(opt.length);
  await expect(opt.length).toBe(10); */

  // check presence of value in the dropdown
  // const a = await page.locator("#country").textContent();
  // await expect(a.includes("China")).toBeTruthy();
  
  // approach-2 check presence of value in the dropdown
 /* const l = await page.$$("#country option");
  let status = false;
  for(const k of l){
    let v = await k.textContent();
    if(v.includes('Brazil')){
      
      status = true;
      break;
    }
  }
  await expect(status).toBeTruthy(); */
  
  // slect option from dropdown using loop
  const f = await page.$$("#country option");
  for(const e of f){
    const c = await e.textContent();
    if(c.includes('Canada')){
      await page.selectOption('#country',c);
    }
  }
await page.waitForTimeout(4000);
})