import { test, expect } from '../fixtures/test.js';
import { credentials } from '../config/environment.js';
import testData from '../test-data/testdata.json' assert { type: 'json' };

test.describe('Claims Registration', () => {
  test('[3404] Verify that claim registration fails when incident date field is empty @Regression', async ({ loginPage, claimsRegistrationPage }) => {
    const { username, password } = credentials();
    const claimData = testData.claimsRegistration.testCase3404;

    // STEP 1: Navigate to application home page
    await loginPage.navigateToLoginPage();

    // STEP 2: Login with credentials
    await loginPage.login(username, password);
    await loginPage.verifyLoginSuccess();

    // STEP 3: Navigate to Claims Registration section
    await claimsRegistrationPage.navigateToClaimsRegistration();
    await claimsRegistrationPage.verifyRegistrationPageDisplayed();

    // STEP 4: Enter claim data with empty incident date
    await claimsRegistrationPage.fillClaimRegistrationForm({
      claimNumber: claimData.claimNumber,
      policyNumber: claimData.policyNumber,
      claimantName: claimData.claimantName,
      claimDescription: claimData.claimDescription
      // incidentDate intentionally omitted
    });

    // STEP 5: Submit the claim registration form
    await claimsRegistrationPage.submitClaimForm();

    // STEP 6: Verify incident date required validation message is displayed
    await claimsRegistrationPage.verifyValidationMessageDisplayed(claimData.expectedValidationMessage);

    // STEP 7: Verify claim is not registered
    await claimsRegistrationPage.verifyClaimNotRegistered();
  });

  test('[3414] Verify that claim registration handles empty claims list state @Regression', async ({ loginPage, claimsRegistrationPage, claimsListPage }) => {
    const { username, password } = credentials();
    const claimData = testData.claimsRegistration.testCase3414;

    // STEP 1: Navigate to application home page
    await loginPage.navigateToLoginPage();

    // STEP 2: Login with credentials
    await loginPage.login(username, password);
    await loginPage.verifyLoginSuccess();

    // STEP 3: Navigate to Claims List page with no existing claims
    await claimsListPage.navigateToClaimsListWithNoExistingClaims();
    await claimsListPage.verifyClaimsListPageDisplayed();

    // STEP 4: Verify empty state message is displayed
    await claimsListPage.verifyEmptyStateMessageDisplayed(claimData.emptyStateMessage);

    // STEP 5: Navigate to Claims Registration section
    await claimsRegistrationPage.navigateToClaimsRegistration();
    await claimsRegistrationPage.verifyRegistrationPageDisplayed();

    // STEP 6: Register a new claim with valid data
    await claimsRegistrationPage.fillClaimRegistrationForm({
      claimNumber: claimData.claimNumber,
      policyNumber: claimData.policyNumber,
      claimantName: claimData.claimantName,
      incidentDate: claimData.incidentDate,
      claimDescription: claimData.claimDescription
    });
    await claimsRegistrationPage.submitClaimForm();

    // Verify claim appears in previously empty claims list
    await claimsListPage.navigateToClaimsListWithNoExistingClaims();
    await claimsListPage.verifyClaimAppearsInList(claimData.claimNumber);
  });
});

