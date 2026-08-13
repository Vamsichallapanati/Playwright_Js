const { test } = require("@playwright/test");

test("drag_drop", async ({ page }) => {
  await page.goto("https://demoqa.com/droppable");
const source = page.locator("#draggable");

 const target = page.locator("(//div[@id='droppable'])[1]");

  // approach 1

  /* await source.hover();
  await page.mouse.down();
  await target.hover();
  await page.mouse.up(); */

  //approach 2
  await source.dragTo(target);
  await page.waitForTimeout(3000);
  
});
