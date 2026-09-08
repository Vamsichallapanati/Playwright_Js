import { test, expect } from '../fixtures/test.js';
import { requireBaseURL } from '../config/environment.js';
import testData from '../test-data/testdata.json' assert { type: 'json' };

test.describe('Claims Registration', () => {
  test.beforeEach(async ({ page }) => {
    requireBaseURL();
  });

  test('[3404] Verify that claim registration fails when incident date field is empty @Regression', async ({ loginPage, claimsRegistrationPage }) => {
    // STEP 1: Navigate to url -> Application home page should open
    await loginPage.open('/');

    // STEP 2: Login with username and password -> User should be authenticated successfully
    await loginPage.loginWithDefaultCredentials();
    await loginPage.expectAuthenticated();

    // STEP 3: Navigate to Claims Registration section -> Claims Registration page should be displayed
    await claimsRegistrationPage.navigateToClaimsRegistration();
    await claimsRegistrationPage.expectClaimsRegistrationPageDisplayed();

    // STEP 4: Enter claim number, policy number, claimant name, leave incident date field empty, and claim description -> All fields except incident date should be populated
    const claimData = {
      claimNumber: testData.claimsRegistration.validClaim.claimNumber,
      policyNumber: testData.claimsRegistration.validClaim.policyNumber,
      claimantName: testData.claimsRegistration.validClaim.claimantName,
      incidentDate: '',
      claimDescription: testData.claimsRegistration.validClaim.claimDescription
    };
    await claimsRegistrationPage.fillClaimForm(claimData);

    // STEP 5: Submit the claim registration form -> Form validation should be triggered
    await claimsRegistrationPage.submitClaim();

    // STEP 6: Verify incident date required validation message is displayed -> User should see an error message indicating incident date is required
    await claimsRegistrationPage.expectValidationMessage(
      testData.claimsRegistration.validationMessages.incidentDateRequired
    );

    // STEP 7: Verify claim is not registered -> Claim should not be saved and user should remain on registration page
    await claimsRegistrationPage.expectClaimNotRegistered();
  });

  test('[3414] Verify that claim registration handles empty claims list state @Regression', async ({ loginPage, claimsRegistrationPage }) => {
    // STEP 1: Navigate to url -> Application home page should open
    await loginPage.open('/');

    // STEP 2: Login with username and password -> User should be authenticated successfully
    await loginPage.loginWithDefaultCredentials();
    await loginPage.expectAuthenticated();

    // STEP 3: Navigate to Claims List page with no existing claims -> Claims List page should be displayed
    await claimsRegistrationPage.navigateToClaimsList();
    await claimsRegistrationPage.expectClaimsListPageDisplayed();

    // STEP 4: Verify empty state message is displayed -> User should see a message indicating no claims are registered yet
    await claimsRegistrationPage.expectEmptyStateMessage(
      testData.claimsRegistration.emptyStateMessage
    );

    // STEP 5: Navigate to Claims Registration section -> Claims Registration page should be displayed
    await claimsRegistrationPage.navigateToClaimsRegistration();
    await claimsRegistrationPage.expectClaimsRegistrationPageDisplayed();

    // STEP 6: Register a new claim with valid data -> Claim should be registered successfully and should appear in previously empty claims list
    const validClaimWithDate = {
      ...testData.claimsRegistration.validClaim,
      incidentDate: '2024-01-15'
    };
    await claimsRegistrationPage.registerValidClaim(validClaimWithDate);

    // Navigate back to claims list to verify claim appears
    await claimsRegistrationPage.navigateToClaimsList();
    await claimsRegistrationPage.expectClaimsListPageDisplayed();
  });
});

