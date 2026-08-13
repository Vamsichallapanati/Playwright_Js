const {expect,test} = require("@playwright/test");
test('assertions',async({page})=>{
    await page.goto("https://ecommerce-playground.lambdatest.io/index.php?route=account/register");
    // 1
    await expect(page).toHaveURL("https://ecommerce-playground.lambdatest.io/index.php?route=account/register");
    //2
    await expect(page).toHaveTitle("Register Account");
    //3
    const a = await page.locator("[alt='Poco Electro']");
    await expect(a).toBeVisible();
    //4
   const b = await page.locator("#input-firstname");
   await expect(b).toBeEnabled();
   //5
   const c = await page.locator("#input-newsletter-no");
   await expect(c).toBeChecked();

   const d = await page.locator("#input-agree");
   await expect(d).not.toBeChecked(); // when page opens by default it is unchecked // we can use await d.check();
   //6
   const e = await page.locator("[class='btn btn-primary']");
   await expect(e).toHaveAttribute('type','submit');
   // 7 we can create a variable and assign locator or we can directly pass in expect
   await expect(await page.locator("#content h1")).toHaveText("Register Account"); //full text
   //8
   await expect(await page.locator("#content h1")).toContainText("Reg");
   //9
   const g =  page.locator("#input-firstname");
   await g.fill("vamc");
   await expect(g).toHaveValue("vamc");   
   //10
   const f = page.locator("a");
   await expect(f).toHaveCount(115);
})