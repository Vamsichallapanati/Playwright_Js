import { test, expect } from '../fixtures/test.js';
import CategoryPage from '../pages/CategoryPage.js';
import testData from '../test-data/testdata.json' with { type: 'json' };

test.describe('Category Selection and Product Filtering', () => {

  test('[3611] Verify that user can successfully select Phones category and view Phones products @Smoke', async ({ page }) => {
    const categoryPage = new CategoryPage(page);

    // STEP 1: Navigate to url https://demo.odoo.com -> Homepage should load successfully
    await categoryPage.navigateToHomepage();
    await categoryPage.verifyHomepageLoaded();

    // STEP 2: Click on Phones category -> Phones category should be selected and highlighted
    await categoryPage.clickCategory(testData.category.phones);
    await categoryPage.verifyCategorySelected(testData.category.phones);

    // STEP 3: Verify product listing area -> Only products from Phones category should be displayed
    await categoryPage.verifyProductListingArea();
    await categoryPage.verifyCategoryProductsDisplayed(testData.category.phones);

    // STEP 4: Verify no products from Laptops or Monitors categories are visible -> Products from other categories should not appear in the listing
    await categoryPage.verifyOtherCategoryProductsNotVisible([testData.category.laptops, testData.category.monitors]);
  });

  test('[3612] Verify that user can successfully select Laptops category and view Laptops products @Smoke', async ({ page }) => {
    const categoryPage = new CategoryPage(page);

    // STEP 1: Navigate to url https://demo.odoo.com -> Homepage should load successfully
    await categoryPage.navigateToHomepage();
    await categoryPage.verifyHomepageLoaded();

    // STEP 2: Click on Laptops category -> Laptops category should be selected and highlighted
    await categoryPage.clickCategory(testData.category.laptops);
    await categoryPage.verifyCategorySelected(testData.category.laptops);

    // STEP 3: Verify product listing area -> Only products from Laptops category should be displayed
    await categoryPage.verifyProductListingArea();
    await categoryPage.verifyCategoryProductsDisplayed(testData.category.laptops);

    // STEP 4: Verify no products from Phones or Monitors categories are visible -> Products from other categories should not appear in the listing
    await categoryPage.verifyOtherCategoryProductsNotVisible([testData.category.phones, testData.category.monitors]);
  });

});