const {test,expect} = require("@playwright/test");
test('nested/inner frames',async({page})=>{
  await page.goto("https://ui.vision/demo/webtest/frames/");
  const a =  page.frame({url:"https://ui.vision/demo/webtest/frames/frame_3"});
  await a.fill("[name='mytext3']","vamc"); 
  const cf =  a.childFrames();
  await cf[0].locator("(//div[@class='AB7Lab Id5V1'])[1]").click();
})