import BasePage from './BasePage.js';
import { ClaimsRegistrationPageObjects } from '../pageObjects/ClaimsRegistrationPageObjects.js';
import { expect } from '@playwright/test';

export default class ClaimsRegistrationPage extends BasePage {
  constructor(page) {
    super(page);
    this.locators = new ClaimsRegistrationPageObjects(page);
  }

  async navigateToClaimsRegistration() {
    // Technical navigation step - Claims Registration may be accessed via menu or direct URL
    const navigationLocator = this.page.getByRole('link', { name: /claims registration/i });
    const isVisible = await navigationLocator.isVisible().catch(() => false);
    if (isVisible) {
      await this.click(navigationLocator);
    }
    await this.page.waitForLoadState('domcontentloaded');
  }

  async fillClaimRegistrationForm(claimData) {
    if (claimData.claimNumber) {
      await this.fill(this.locators.claimNumberInput, claimData.claimNumber);
    }
    if (claimData.policyNumber) {
      await this.fill(this.locators.policyNumberInput, claimData.policyNumber);
    }
    if (claimData.claimantName) {
      await this.fill(this.locators.claimantNameInput, claimData.claimantName);
    }
    if (claimData.incidentDate) {
      await this.fill(this.locators.incidentDateInput, claimData.incidentDate);
    }
    if (claimData.claimDescription) {
      await this.fill(this.locators.claimDescriptionInput, claimData.claimDescription);
    }
  }

  async submitClaimForm() {
    await this.click(this.locators.submitButton);
  }

  async verifyValidationMessageDisplayed(expectedMessage) {
    await this.expectVisible(this.locators.validationMessage);
    await expect(this.locators.validationMessage).toContainText(expectedMessage, { ignoreCase: true });
  }

  async verifyClaimNotRegistered() {
    // Verify user remains on registration page and form is still visible
    await this.expectVisible(this.locators.registrationForm);
  }

  async verifyRegistrationPageDisplayed() {
    await this.expectVisible(this.locators.registrationForm);
  }
}

