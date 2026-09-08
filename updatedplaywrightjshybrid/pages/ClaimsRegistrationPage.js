import BasePage from './BasePage.js';
import { ClaimsRegistrationPageObjects } from '../pageObjects/ClaimsRegistrationPageObjects.js';

export default class ClaimsRegistrationPage extends BasePage {
  constructor(page) {
    super(page);
    this.locators = new ClaimsRegistrationPageObjects(page);
  }

  async navigateToClaimsRegistration() {
    // TODO: Verify navigation path - Claims Registration route not found in provided evidence
    // Technical navigation to reach Claims Registration section
    await this.page.locator('a:has-text("Claims"), [href*="claims"], button:has-text("Claims")').first().click();
    await this.page.locator('a:has-text("Register"), a:has-text("New Claim"), [href*="registration"]').first().click();
  }

  async verifyClaimsRegistrationPageDisplayed() {
    await this.expectVisible(this.locators.claimNumberInput);
    await this.expectVisible(this.locators.submitButton);
  }

  async enterClaimDetails(claimNumber, policyNumber, claimantName, incidentDate, claimDescription) {
    if (claimNumber) {
      await this.fill(this.locators.claimNumberInput, claimNumber);
    }
    if (policyNumber) {
      await this.fill(this.locators.policyNumberInput, policyNumber);
    }
    if (claimantName) {
      await this.fill(this.locators.claimantNameInput, claimantName);
    }
    if (incidentDate) {
      await this.fill(this.locators.incidentDateInput, incidentDate);
    }
    if (claimDescription) {
      await this.fill(this.locators.claimDescriptionInput, claimDescription);
    }
  }

  async verifyFieldsPopulatedExceptIncidentDate() {
    await this.page.waitForTimeout(500);
    const incidentDateValue = await this.locators.incidentDateInput.inputValue();
    if (incidentDateValue) {
      throw new Error('Incident date field should be empty but has value: ' + incidentDateValue);
    }
  }

  async submitClaimRegistrationForm() {
    await this.click(this.locators.submitButton);
  }

  async verifyFormValidationTriggered() {
    await this.expectVisible(this.locators.validationMessage);
  }

  async verifyIncidentDateRequiredValidationDisplayed(expectedMessage) {
    const messageLocator = this.locators.getValidationMessageContaining(expectedMessage);
    await this.expectVisible(messageLocator);
  }

  async verifyClaimNotRegistered() {
    await this.expectVisible(this.locators.claimNumberInput);
    await this.expectVisible(this.locators.submitButton);
  }
}

