import BasePage from './BasePage.js';
import { ClaimsRegistrationPageObjects } from '../pageObjects/ClaimsRegistrationPageObjects.js';
import { expect } from '@playwright/test';

export default class ClaimsRegistrationPage extends BasePage {
  constructor(page) {
    super(page);
    this.locators = new ClaimsRegistrationPageObjects(page);
  }

  async navigateToClaimsRegistration() {
    const link = this.locators.getNavigationLink('Claims Registration');
    await this.click(link);
    await this.page.waitForLoadState('domcontentloaded');
  }

  async navigateToClaimsList() {
    const link = this.locators.getNavigationLink('Claims List');
    await this.click(link);
    await this.page.waitForLoadState('domcontentloaded');
  }

  async fillClaimForm(claimData) {
    if (claimData.claimNumber) {
      await this.fill(this.locators.claimNumberInput, claimData.claimNumber);
    }
    if (claimData.policyNumber) {
      await this.fill(this.locators.policyNumberInput, claimData.policyNumber);
    }
    if (claimData.claimantName) {
      await this.fill(this.locators.claimantNameInput, claimData.claimantName);
    }
    if (claimData.incidentDate !== undefined && claimData.incidentDate !== '') {
      await this.fill(this.locators.incidentDateInput, claimData.incidentDate);
    }
    if (claimData.claimDescription) {
      await this.fill(this.locators.claimDescriptionInput, claimData.claimDescription);
    }
  }

  async submitClaim() {
    await this.click(this.locators.submitButton);
  }

  async expectValidationMessage(expectedMessage) {
    await this.expectVisible(this.locators.validationMessage);
    await this.expectText(this.locators.validationMessage, expectedMessage);
  }

  async expectClaimsRegistrationPageDisplayed() {
    await expect(this.page).toHaveURL(/claims.*registration/i);
  }

  async expectClaimsListPageDisplayed() {
    await expect(this.page).toHaveURL(/claims.*list/i);
  }

  async expectEmptyStateMessage(expectedMessage) {
    await this.expectVisible(this.locators.emptyStateMessage);
    await this.expectText(this.locators.emptyStateMessage, expectedMessage);
  }

  async expectClaimNotRegistered() {
    await this.expectClaimsRegistrationPageDisplayed();
  }

  async registerValidClaim(claimData) {
    await this.fillClaimForm(claimData);
    await this.submitClaim();
    await this.page.waitForLoadState('networkidle');
  }
}

