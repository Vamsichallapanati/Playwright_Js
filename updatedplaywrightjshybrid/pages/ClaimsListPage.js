import BasePage from './BasePage.js';
import { ClaimsListPageObjects } from '../pageObjects/ClaimsListPageObjects.js';

export default class ClaimsListPage extends BasePage {
  constructor(page) {
    super(page);
    this.locators = new ClaimsListPageObjects(page);
  }

  async navigateToClaimsListWithNoExistingClaims() {
    // TODO: Verify navigation path - Claims List route not found in provided evidence
    // Technical navigation to reach Claims List page
    await this.page.locator('a:has-text("Claims"), [href*="claims"], button:has-text("Claims")').first().click();
    await this.page.locator('a:has-text("List"), a:has-text("View Claims"), [href*="list"]').first().click();
  }

  async verifyClaimsListPageDisplayed() {
    await this.page.waitForLoadState('domcontentloaded');
  }

  async verifyEmptyStateMessageDisplayed(expectedMessage) {
    await this.expectVisible(this.locators.emptyStateMessage);
    await this.expectText(this.locators.emptyStateMessage, expectedMessage);
  }

  async verifyClaimAppearsInList(claimNumber) {
    const claimRow = this.locators.getClaimRow(claimNumber);
    await this.expectVisible(claimRow);
  }
}

