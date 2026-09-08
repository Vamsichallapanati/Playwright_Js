export class ClaimsRegistrationPageObjects {
  constructor(page) {
    this.page = page;
    // TODO: Verify selectors with live inspection - using fallback accessible selectors
    this.claimNumberInput = page.locator('input[name="claimNumber"], #claimNumber');
    this.policyNumberInput = page.locator('input[name="policyNumber"], #policyNumber');
    this.claimantNameInput = page.locator('input[name="claimantName"], #claimantName');
    this.incidentDateInput = page.locator('input[name="incidentDate"], #incidentDate, input[type="date"]');
    this.claimDescriptionInput = page.locator('textarea[name="claimDescription"], #claimDescription');
    this.submitButton = page.getByRole('button', { name: /submit/i });
    this.validationMessage = page.locator('.error-message, .validation-error, [role="alert"]');
    this.emptyStateMessage = page.locator('.empty-state, .no-claims-message');
  }

  getNavigationLink(linkText) {
    return this.page.getByRole('link', { name: new RegExp(linkText, 'i') });
  }
}

