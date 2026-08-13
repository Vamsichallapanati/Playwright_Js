import BasePage from './BasePage.js';
import { CategoryPageObjects } from '../pageObjects/CategoryPageObjects.js';
import { expect } from '@playwright/test';

export default class CategoryPage extends BasePage {
  constructor(page) {
    super(page);
    this.locators = new CategoryPageObjects(page);
  }

  async clickCategory(categoryName) {
    const categoryLink = this.locators.getCategoryLink(categoryName);
    await this.click(categoryLink);
  }

  async expectCategoryHighlighted(categoryName) {
    const activeCategoryLink = this.locators.getActiveCategoryLink(categoryName);
    await expect(activeCategoryLink).toBeVisible();
  }

  async expectCategoryNotHighlighted(categoryName) {
    const activeCategoryLink = this.locators.getActiveCategoryLink(categoryName);
    await expect(activeCategoryLink).not.toBeVisible();
  }

  async scrollDown() {
    await this.page.evaluate(() => {
      window.scrollBy(0, 500);
    });
    await this.page.waitForTimeout(1000);
  }
}

