export class ClaimsRegistrationPageObjects {
  constructor(page) {
    this.page = page;
    // TODO: Verify selectors - Claims Registration controls not found in provided evidence
    // Using readable fallback selectors based on business context
    this.claimNumberInput = page.locator('input[name="claimNumber"], input[id*="claim"][id*="number"], input[placeholder*="Claim Number"]').first();
    this.policyNumberInput = page.locator('input[name="policyNumber"], input[id*="policy"][id*="number"], input[placeholder*="Policy Number"]').first();
    this.claimantNameInput = page.locator('input[name="claimantName"], input[id*="claimant"][id*="name"], input[placeholder*="Claimant Name"]').first();
    this.incidentDateInput = page.locator('input[name="incidentDate"], input[id*="incident"][id*="date"], input[type="date"][id*="incident"]').first();
    this.claimDescriptionInput = page.locator('textarea[name="claimDescription"], textarea[id*="description"], input[name="description"]').first();
    this.submitButton = page.locator('button[type="submit"], button:has-text("Submit"), input[type="submit"]').first();
    this.validationMessage = page.locator('.error-message, .validation-error, [class*="error"], [role="alert"]');
  }

  getValidationMessageContaining(text) {
    return this.page.locator(`.error-message:has-text("${text}"), .validation-error:has-text("${text}"), [class*="error"]:has-text("${text}"), [role="alert"]:has-text("${text}")`);
  }
}

