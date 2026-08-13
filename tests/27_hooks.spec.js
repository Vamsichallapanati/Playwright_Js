const {test,expect}=require('@playwright/test');
let page;
test.beforeEach(async ({browser})=>{
    page = await browser.newPage();
// login
    await page.goto('https://www.demoblaze.com/');
    await page.click('#login2');
    await page.fill('#loginusername','pavanol');
    await page.fill('#loginpassword','test@123');
    await page.click("//button[normalize-space()='Log in']");
})
test('Home_page',async ()=>{
    
    // homepage
    const b = await page.$$(".hrefch")
    await expect(b).toHaveLength(9);
    
   
})

test('add to cart',async ()=>{
    
    // add to cart
    await page.click("//a[normalize-space()='Samsung galaxy s6']");
    await page.click("//a[normalize-space()='Add to cart']");
    page.on('dailg',async dialog=>{
        expect(dialog.message()).toContain('Product added.');
       await dialog.accept();
    })
     
})
test.afterEach(async ()=>{
// logout
    await page.click('#logout2');
})
    