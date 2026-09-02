import BasePage from './BasePage.js';
import { ClaimsListPageObjects } from '../pageObjects/ClaimsListPageObjects.js';
import { expect } from '@playwright/test';

export default class ClaimsListPage extends BasePage {
  constructor(page) {
    super(page);
    this.locators = new ClaimsListPageObjects(page);
  }

  async navigateToClaimsListWithNoExistingClaims() {
    // Technical navigation step - Claims List may be accessed via menu or direct URL
    const navigationLocator = this.page.getByRole('link', { name: /claims list/i });
    const isVisible = await navigationLocator.isVisible().catch(() => false);
    if (isVisible) {
      await this.click(navigationLocator);
    }
    await this.page.waitForLoadState('domcontentloaded');
  }

  async verifyClaimsListPageDisplayed() {
    await this.expectVisible(this.locators.claimsListContainer);
  }

  async verifyEmptyStateMessageDisplayed(expectedMessage) {
    await this.expectVisible(this.locators.emptyStateMessage);
    await expect(this.locators.emptyStateMessage).toContainText(expectedMessage, { ignoreCase: true });
  }

  async verifyClaimAppearsInList(claimNumber) {
    const claimRow = this.locators.getClaimRow(claimNumber);
    await expect(claimRow).toBeVisible({ timeout: 10000 });
  }
}

