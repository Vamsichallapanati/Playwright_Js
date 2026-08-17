import { test, expect } from '../fixtures/test.js';
import testData from '../test-data/testdata.json' assert { type: 'json' };
import PolicyPage from '../pages/PolicyPage.js';

test.describe('Policy Management', () => {
  let policyPage;

  test.beforeEach(async ({ page }) => {
    policyPage = new PolicyPage(page);
  });

  test('[2586] Verify that policy creation fails when policy type is not selected @Regression @1-High', async () => {
    // STEP 1: Navigate to policy creation form as authenticated agent
    await policyPage.navigateToPolicyCreationForm();
    // Expected: Policy creation form should be displayed
    await policyPage.verifyPolicyCreationFormDisplayed();

    // STEP 2: Enter valid customer details
    await policyPage.enterCustomerDetails(testData.policy.validCustomerDetails);
    // Expected: Customer details should be captured successfully
    await policyPage.verifyCustomerDetailsCaptured();

    // STEP 3: Leave policy type field unselected and enter coverage options, premium amount, and effective dates
    await policyPage.leavePolicyTypeUnselectedAndEnterOtherFields(
      testData.policy.coverageOptions,
      testData.policy.premiumAmount,
      testData.policy.effectiveDates
    );
    // Expected: Policy type should remain blank while other policy fields are filled
    await policyPage.verifyPolicyTypeBlankAndOtherFieldsFilled();

    // STEP 4: Submit the policy creation form
    await policyPage.submitPolicyCreationForm();
    // Expected: Policy validation should be triggered
    await policyPage.verifyPolicyValidationTriggered();

    // STEP 5: Verify policy type validation error is displayed
    // Expected: Error message should indicate policy type is required
    await policyPage.verifyPolicyTypeValidationError(
      testData.policy.validation.policyTypeRequiredError
    );

    // STEP 6: Verify policy is not created
    // Expected: Policy should not be issued
    await policyPage.verifyPolicyNotCreated();
  });
});

