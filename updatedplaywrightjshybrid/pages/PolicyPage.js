import BasePage from './BasePage.js';
import { PolicyPageObjects } from '../pageObjects/PolicyPageObjects.js';
import { expect } from '@playwright/test';

export default class PolicyPage extends BasePage {
  constructor(page) {
    super(page);
    this.locators = new PolicyPageObjects(page);
  }

  async navigateToPolicyCreationForm() {
    await this.open('/policies/create');
    await this.page.waitForLoadState('domcontentloaded');
  }

  async verifyPolicyCreationFormDisplayed() {
    await this.expectVisible(this.locators.customerNameInput);
    await this.expectVisible(this.locators.policyTypeDropdown);
    await this.expectVisible(this.locators.submitButton);
  }

  async enterCustomerDetails(customerDetails) {
    await this.fill(this.locators.customerNameInput, customerDetails.customerName);
    await this.fill(this.locators.customerEmailInput, customerDetails.customerEmail);
    await this.fill(this.locators.customerPhoneInput, customerDetails.customerPhone);
    await this.fill(this.locators.customerAddressInput, customerDetails.customerAddress);
  }

  async verifyCustomerDetailsCaptured() {
    await expect(this.locators.customerNameInput).not.toBeEmpty();
    await expect(this.locators.customerEmailInput).not.toBeEmpty();
  }

  async leavePolicyTypeUnselectedAndEnterOtherFields(coverageOptions, premiumAmount, effectiveDates) {
    // Explicitly verify policy type remains unselected
    const policyTypeValue = await this.locators.policyTypeDropdown.inputValue();
    if (policyTypeValue && policyTypeValue !== '') {
      // Reset to empty/default if somehow selected
      await this.locators.policyTypeDropdown.selectOption({ index: 0 });
    }
    
    // Enter coverage options
    await this.locators.coverageTypeDropdown.selectOption(coverageOptions.coverageType);
    await this.fill(this.locators.coverageAmountInput, coverageOptions.coverageAmount);
    await this.fill(this.locators.deductibleInput, coverageOptions.deductible);
    
    // Enter premium amount
    await this.fill(this.locators.premiumAmountInput, premiumAmount);
    
    // Enter effective dates
    await this.fill(this.locators.effectiveStartDateInput, effectiveDates.startDate);
    await this.fill(this.locators.effectiveEndDateInput, effectiveDates.endDate);
  }

  async verifyPolicyTypeBlankAndOtherFieldsFilled() {
    // Verify policy type is blank
    const policyTypeValue = await this.locators.policyTypeDropdown.inputValue();
    expect(policyTypeValue).toBeFalsy();
    
    // Verify other fields are filled
    await expect(this.locators.coverageAmountInput).not.toBeEmpty();
    await expect(this.locators.premiumAmountInput).not.toBeEmpty();
    await expect(this.locators.effectiveStartDateInput).not.toBeEmpty();
  }

  async submitPolicyCreationForm() {
    await this.click(this.locators.submitButton);
    // Wait for validation to trigger
    await this.page.waitForTimeout(500);
  }

  async verifyPolicyValidationTriggered() {
    // Wait for validation messages or error summary to appear
    await expect(
      this.locators.policyTypeErrorMessage.or(this.locators.validationSummary)
    ).toBeVisible({ timeout: 5000 });
  }

  async verifyPolicyTypeValidationError(expectedErrorMessage) {
    await this.expectVisible(this.locators.policyTypeErrorMessage);
    await expect(this.locators.policyTypeErrorMessage).toContainText(
      expectedErrorMessage,
      { ignoreCase: true }
    );
  }

  async verifyPolicyNotCreated() {
    // Verify no policy confirmation or policy number is displayed
    await expect(this.locators.policyConfirmation).not.toBeVisible();
    await expect(this.locators.policyNumberDisplay).not.toBeVisible();
    
    // Verify we remain on the creation form (not redirected to success page)
    await expect(this.page).toHaveURL(/\/policies\/create/);
  }
}

