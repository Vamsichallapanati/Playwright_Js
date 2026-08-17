export class PolicyPageObjects {
  constructor(page) {
    this.page = page;
    
    // Customer details section
    this.customerNameInput = page.locator('input[name="customerName"]');
    this.customerEmailInput = page.locator('input[name="customerEmail"]');
    this.customerPhoneInput = page.locator('input[name="customerPhone"]');
    this.customerAddressInput = page.locator('input[name="customerAddress"]');
    
    // Policy details section
    this.policyTypeDropdown = page.locator('select[name="policyType"]');
    this.coverageTypeDropdown = page.locator('select[name="coverageType"]');
    this.coverageAmountInput = page.locator('input[name="coverageAmount"]');
    this.deductibleInput = page.locator('input[name="deductible"]');
    this.premiumAmountInput = page.locator('input[name="premiumAmount"]');
    
    // Effective dates
    this.effectiveStartDateInput = page.locator('input[name="effectiveStartDate"]');
    this.effectiveEndDateInput = page.locator('input[name="effectiveEndDate"]');
    
    // Form actions
    this.submitButton = page.getByRole('button', { name: /submit|create policy/i });
    
    // Validation messages
    this.policyTypeErrorMessage = page.locator('[data-error="policyType"], .error-message:has-text("policy type"), .validation-error:has-text("policy type")');
    this.validationSummary = page.locator('.validation-summary, .error-summary');
    
    // Success/confirmation indicators
    this.policyConfirmation = page.locator('.policy-confirmation, .success-message');
    this.policyNumberDisplay = page.locator('[data-policy-number], .policy-number');
  }
  
  getPolicyTypeOption(policyType) {
    return this.page.locator(`select[name="policyType"] option:has-text("${policyType}")`);
  }
}

