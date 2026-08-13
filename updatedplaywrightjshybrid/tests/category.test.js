import { test, expect } from '../fixtures/test.js';
import testData from '../test-data/testdata.json' assert { type: 'json' };

test.describe('Category Highlighting', () => {
  test('[3614] Verify that selected category remains highlighted until another category is selected @Regression', async ({ page, categoryPage }) => {
    // Step 1: Navigate to url - Homepage should load successfully
    await categoryPage.open('/');
    await expect(page).toHaveURL(/demo.*\.odoo\.com/);

    // Step 2: Click on Phones category - Phones category should be highlighted
    await categoryPage.clickCategory(testData.category.phones);
    await categoryPage.expectCategoryHighlighted(testData.category.phones);

    // Step 3: Scroll down the page without selecting another category - Phones category should remain highlighted
    await categoryPage.scrollDown();
    await categoryPage.expectCategoryHighlighted(testData.category.phones);

    // Step 4: Click on Laptops category - Laptops category should become highlighted and Phones category should lose highlighting
    await categoryPage.clickCategory(testData.category.laptops);
    await categoryPage.expectCategoryHighlighted(testData.category.laptops);
    await categoryPage.expectCategoryNotHighlighted(testData.category.phones);
  });
});

