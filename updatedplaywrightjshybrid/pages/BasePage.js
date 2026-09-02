import { expect } from '@playwright/test';
import { requireBaseURL } from '../config/environment.js';

export default class BasePage {
  constructor(page) {
    this.page = page;
  }

  async open(path = '/') {
    requireBaseURL();
    await this.page.goto(path);
    await this.page.waitForLoadState('domcontentloaded');
  }

  async click(locator) {
    await expect(locator).toBeVisible();
    await locator.click();
  }

  async fill(locator, value) {
    await expect(locator).toBeEditable();
    await locator.fill(String(value));
  }

  async expectVisible(locator) {
    await expect(locator).toBeVisible();
  }

  async expectText(locator, expected) {
    await expect(locator).toContainText(expected);
  }

  async expectPath(pathPattern) {
    await expect(this.page).toHaveURL(pathPattern);
  }
}

