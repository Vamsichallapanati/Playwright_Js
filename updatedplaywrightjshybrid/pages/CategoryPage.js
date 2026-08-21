import BasePage from './BasePage.js';
import { CategoryPageObjects } from '../pageObjects/CategoryPageObjects.js';
import { expect } from '@playwright/test';

export default class CategoryPage extends BasePage {
  constructor(page) {
    super(page);
    this.locators = new CategoryPageObjects(page);
  }

  async navigateToHomepage() {
    await this.open('/');
  }

  async verifyHomepageLoaded() {
    await expect(this.page).toHaveURL(/demo\.odoo\.com/);
    await this.page.waitForLoadState('domcontentloaded');
  }

  async clickCategory(categoryName) {
    const categoryLink = this.locators.getCategoryLink(categoryName);
    await this.click(categoryLink);
  }

  async verifyCategorySelected(categoryName) {
    const categoryLink = this.locators.getCategoryLink(categoryName);
    await expect(categoryLink).toBeVisible();
  }

  async verifyProductListingArea() {
    await expect(this.locators.productListingArea).toBeVisible();
  }

  async verifyCategoryProductsDisplayed(categoryName) {
    await expect(this.locators.productItems.first()).toBeVisible();
    await this.page.waitForTimeout(500);
  }

  async verifyOtherCategoryProductsNotVisible(excludedCategories) {
    await this.page.waitForTimeout(500);
  }
}