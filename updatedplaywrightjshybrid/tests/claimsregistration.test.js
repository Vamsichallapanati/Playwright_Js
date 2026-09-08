import { test, expect } from '../fixtures/test.js';
import { credentials } from '../config/environment.js';
import testData from '../test-data/testdata.json' with { type: 'json' };

test.describe('Claims Registration', () => {
  test('[3404] Verify that claim registration fails when incident date field is empty @Regression', async ({ page, loginPage, claimsRegistrationPage }) => {
    const creds = credentials();
    const claimData = testData.claimsRegistration.validClaim;
    const validationMsg = testData.claimsRegistration.validationMessages.incidentDateRequired;

    // STEP 1: Navigate to url -> Application home page should open
    await loginPage.open('/');

    // STEP 2: Login with username and password -> User should be authenticated successfully
    await loginPage.login(creds.username, creds.password);
    await loginPage.verifyAuthenticated();

    // STEP 3: Navigate to Claims Registration section -> Claims Registration page should be displayed
    await claimsRegistrationPage.navigateToClaimsRegistration();
    await claimsRegistrationPage.verifyClaimsRegistrationPageDisplayed();

    // STEP 4: Enter claim number, policy number, claimant name, leave incident date field empty, and claim description -> All fields except incident date should be populated
    await claimsRegistrationPage.enterClaimDetails(
      claimData.claimNumber,
      claimData.policyNumber,
      claimData.claimantName,
      '', // incident date empty
      claimData.claimDescription
    );
    await claimsRegistrationPage.verifyFieldsPopulatedExceptIncidentDate();

    // STEP 5: Submit the claim registration form -> Form validation should be triggered
    await claimsRegistrationPage.submitClaimRegistrationForm();
    await claimsRegistrationPage.verifyFormValidationTriggered();

    // STEP 6: Verify incident date required validation message is displayed -> User should see an error message indicating incident date is required
    await claimsRegistrationPage.verifyIncidentDateRequiredValidationDisplayed(validationMsg);

    // STEP 7: Verify claim is not registered -> Claim should not be saved and user should remain on registration page
    await claimsRegistrationPage.verifyClaimNotRegistered();
  });

  test('[3414] Verify that claim registration handles empty claims list state @Regression', async ({ page, loginPage, claimsRegistrationPage, claimsListPage }) => {
    const creds = credentials();
    const claimData = testData.claimsRegistration.validClaim;
    const emptyStateMsg = testData.claimsRegistration.emptyStateMessage;

    // STEP 1: Navigate to url -> Application home page should open
    await loginPage.open('/');

    // STEP 2: Login with username and password -> User should be authenticated successfully
    await loginPage.login(creds.username, creds.password);
    await loginPage.verifyAuthenticated();

    // STEP 3: Navigate to Claims List page with no existing claims -> Claims List page should be displayed
    await claimsListPage.navigateToClaimsListWithNoExistingClaims();
    await claimsListPage.verifyClaimsListPageDisplayed();

    // STEP 4: Verify empty state message is displayed -> User should see a message indicating no claims are registered yet
    await claimsListPage.verifyEmptyStateMessageDisplayed(emptyStateMsg);

    // STEP 5: Navigate to Claims Registration section -> Claims Registration page should be displayed
    await claimsRegistrationPage.navigateToClaimsRegistration();
    await claimsRegistrationPage.verifyClaimsRegistrationPageDisplayed();

    // STEP 6: Register a new claim with valid data -> Claim should be registered successfully and should appear in previously empty claims list
    await claimsRegistrationPage.enterClaimDetails(
      claimData.claimNumber,
      claimData.policyNumber,
      claimData.claimantName,
      '2024-01-15', // valid incident date
      claimData.claimDescription
    );
    await claimsRegistrationPage.submitClaimRegistrationForm();
    
    // Navigate back to claims list to verify claim appears
    await claimsListPage.navigateToClaimsListWithNoExistingClaims();
    await claimsListPage.verifyClaimAppearsInList(claimData.claimNumber);
  });
});

