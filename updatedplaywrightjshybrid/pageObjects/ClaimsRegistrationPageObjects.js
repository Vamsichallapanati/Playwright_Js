export class ClaimsRegistrationPageObjects {
  constructor(page) {
    this.page = page;
    // TODO: Verify selectors with live application - using stable naming pattern
    this.claimNumberInput = page.locator('input[name="claimNumber"], #claimNumber');
    this.policyNumberInput = page.locator('input[name="policyNumber"], #policyNumber');
    this.claimantNameInput = page.locator('input[name="claimantName"], #claimantName');
    this.incidentDateInput = page.locator('input[name="incidentDate"], #incidentDate');
    this.claimDescriptionInput = page.locator('textarea[name="claimDescription"], #claimDescription');
    this.submitButton = page.getByRole('button', { name: /submit/i });
    this.validationMessage = page.locator('.error-message, .validation-error, [role="alert"]');
    this.registrationForm = page.locator('form#claimRegistrationForm, form.claim-registration');
  }
}

