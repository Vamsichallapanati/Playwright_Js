import { test, expect } from '../fixtures/test.js';
import { credentials } from '../config/environment.js';

const testData = require('../test-data/testdata.json');
const { username, password } = credentials();

test.describe('Claims Approval', () => {
  test('[4133] Verify that approver can successfully approve a pending claim with valid credentials @Smoke', async ({ claimsApprovalPage }) => {
    await claimsApprovalPage.navigateToClaimsApprovalPage();
    await claimsApprovalPage.login(username, password);
    await claimsApprovalPage.verifyLoginSuccess();
    await claimsApprovalPage.selectPendingClaim();
    await claimsApprovalPage.verifyClaimDetailsDisplayed();
    await claimsApprovalPage.clickApproveButton();
    await claimsApprovalPage.submitApprovalDecision();
    await claimsApprovalPage.verifyApprovalConfirmationMessage();
  });

  test('[4134] Verify that approver can successfully reject a pending claim with rejection reason @Smoke', async ({ claimsApprovalPage }) => {
    await claimsApprovalPage.navigateToClaimsApprovalPage();
    await claimsApprovalPage.login(username, password);
    await claimsApprovalPage.verifyLoginSuccess();
    await claimsApprovalPage.selectPendingClaim();
    await claimsApprovalPage.verifyClaimDetailsDisplayed();
    await claimsApprovalPage.clickRejectButton();
    await claimsApprovalPage.enterRejectionReason(testData.claimsApproval.validRejectionReason);
    await claimsApprovalPage.submitRejectionDecision();
    await claimsApprovalPage.verifyRejectionConfirmationMessage();
  });

  test('[4135] Verify that approver can view complete claim details before making approval decision @Regression', async ({ claimsApprovalPage }) => {
    await claimsApprovalPage.navigateToClaimsApprovalPage();
    await claimsApprovalPage.login(username, password);
    await claimsApprovalPage.verifyLoginSuccess();
    await claimsApprovalPage.clickClaimToViewDetails();
    await claimsApprovalPage.verifyCompleteClaimDetails();
  });

  test('[4136] Verify that approver can filter claims by pending status @Regression', async ({ claimsApprovalPage }) => {
    await claimsApprovalPage.navigateToClaimsApprovalPage();
    await claimsApprovalPage.login(username, password);
    await claimsApprovalPage.verifyLoginSuccess();
    await claimsApprovalPage.applyPendingFilter();
    await claimsApprovalPage.verifyOnlyPendingClaimsDisplayed();
  });

  test('[4137] Verify that approver can search for a specific claim by claim ID @Regression', async ({ claimsApprovalPage }) => {
    await claimsApprovalPage.navigateToClaimsApprovalPage();
    await claimsApprovalPage.login(username, password);
    await claimsApprovalPage.verifyLoginSuccess();
    const claimID = 'CLAIM-001';
    await claimsApprovalPage.searchByClaimID(claimID);
    await claimsApprovalPage.verifyClaimDisplayedInResults(claimID);
  });

  test('[4138] Verify that approved claim is moved to approved claims list @Regression', async ({ claimsApprovalPage }) => {
    await claimsApprovalPage.navigateToClaimsApprovalPage();
    await claimsApprovalPage.login(username, password);
    await claimsApprovalPage.verifyLoginSuccess();
    await claimsApprovalPage.selectPendingClaim();
    await claimsApprovalPage.approveClaim();
    await claimsApprovalPage.navigateToApprovedClaimsList();
    await claimsApprovalPage.verifyClaimInApprovedList();
  });

  test('[4139] Verify that approver can sort claims by submission date @Regression', async ({ claimsApprovalPage }) => {
    await claimsApprovalPage.navigateToClaimsApprovalPage();
    await claimsApprovalPage.login(username, password);
    await claimsApprovalPage.verifyLoginSuccess();
    await claimsApprovalPage.sortBySubmissionDate();
    await claimsApprovalPage.verifyClaimsSortedByDate();
  });

  test('[4140] Verify that claim rejection fails when rejection reason field is empty @Regression', async ({ claimsApprovalPage }) => {
    await claimsApprovalPage.navigateToClaimsApprovalPage();
    await claimsApprovalPage.login(username, password);
    await claimsApprovalPage.verifyLoginSuccess();
    await claimsApprovalPage.selectPendingClaim();
    await claimsApprovalPage.clickRejectButton();
    await claimsApprovalPage.leaveRejectionReasonEmpty();
    await claimsApprovalPage.submitRejectionDecision();
    await claimsApprovalPage.verifyValidationErrorDisplayed(testData.claimsApproval.rejectionReasonRequiredError);
    await claimsApprovalPage.verifyClaimStatusRemainsPending();
  });

  test('[4142] Verify that approver cannot approve an already approved claim @Regression', async ({ claimsApprovalPage }) => {
    await claimsApprovalPage.navigateToClaimsApprovalPage();
    await claimsApprovalPage.login(username, password);
    await claimsApprovalPage.verifyLoginSuccess();
    await claimsApprovalPage.navigateToApprovedClaimsList();
    await claimsApprovalPage.attemptToApproveApprovedClaim();
    await claimsApprovalPage.verifyApproveActionBlockedOrDisabled();
  });

  test('[4143] Verify that approver cannot reject an already rejected claim @Regression', async ({ claimsApprovalPage }) => {
    await claimsApprovalPage.navigateToClaimsApprovalPage();
    await claimsApprovalPage.login(username, password);
    await claimsApprovalPage.verifyLoginSuccess();
    await claimsApprovalPage.navigateToRejectedClaimsList();
    await claimsApprovalPage.attemptToRejectRejectedClaim();
    await claimsApprovalPage.verifyRejectActionBlockedOrDisabled();
  });

  test('[4144] Verify that search returns no results for non-existent claim ID @Regression', async ({ claimsApprovalPage }) => {
    await claimsApprovalPage.navigateToClaimsApprovalPage();
    await claimsApprovalPage.login(username, password);
    await claimsApprovalPage.verifyLoginSuccess();
    await claimsApprovalPage.searchByClaimID(testData.claimsApproval.nonExistentClaimID);
    await claimsApprovalPage.verifyNoResultsMessage(testData.claimsApproval.noResultsMessage);
  });

  test('[4145] Verify that login fails with empty username field @Regression', async ({ claimsApprovalPage }) => {
    await claimsApprovalPage.navigateToClaimsApprovalPage();
    await claimsApprovalPage.loginWithEmptyUsername(password);
    await claimsApprovalPage.verifyUsernameRequiredError(testData.claimsApproval.usernameRequiredError);
  });

  test('[4146] Verify that login fails with invalid password @Regression', async ({ claimsApprovalPage }) => {
    await claimsApprovalPage.navigateToClaimsApprovalPage();
    await claimsApprovalPage.loginWithInvalidPassword(username, testData.claimsApproval.invalidPassword);
    await claimsApprovalPage.verifyInvalidCredentialsError(testData.claimsApproval.invalidCredentialsError);
  });

  test('[4147] Verify that rejection reason field accepts maximum character length input @Regression', async ({ claimsApprovalPage }) => {
    await claimsApprovalPage.navigateToClaimsApprovalPage();
    await claimsApprovalPage.login(username, password);
    await claimsApprovalPage.verifyLoginSuccess();
    await claimsApprovalPage.selectPendingClaim();
    await claimsApprovalPage.clickRejectButton();
    await claimsApprovalPage.enterMaxLengthRejectionReason(testData.claimsApproval.maxLengthRejectionReason);
    await claimsApprovalPage.submitRejectionDecision();
    await claimsApprovalPage.verifyRejectionConfirmationMessage();
  });

  test('[4148] Verify that rejection reason field rejects input exceeding maximum character length @Regression', async ({ claimsApprovalPage }) => {
    await claimsApprovalPage.navigateToClaimsApprovalPage();
    await claimsApprovalPage.login(username, password);
    await claimsApprovalPage.verifyLoginSuccess();
    await claimsApprovalPage.selectPendingClaim();
    await claimsApprovalPage.clickRejectButton();
    await claimsApprovalPage.enterExceedsMaxLengthRejectionReason(testData.claimsApproval.exceedsMaxLengthRejectionReason);
    await claimsApprovalPage.verifyCharacterLimitEnforcement();
  });

  test('[4149] Verify that rejection reason field rejects whitespace-only input @Regression', async ({ claimsApprovalPage }) => {
    await claimsApprovalPage.navigateToClaimsApprovalPage();
    await claimsApprovalPage.login(username, password);
    await claimsApprovalPage.verifyLoginSuccess();
    await claimsApprovalPage.selectPendingClaim();
    await claimsApprovalPage.clickRejectButton();
    await claimsApprovalPage.enterWhitespaceOnlyRejectionReason(testData.claimsApproval.whitespaceOnlyRejectionReason);
    await claimsApprovalPage.submitRejectionDecision();
    await claimsApprovalPage.verifyValidationErrorDisplayed(testData.claimsApproval.rejectionReasonRequiredError);
  });

  test('[4150] Verify that rejection reason field accepts special characters @Regression', async ({ claimsApprovalPage }) => {
    await claimsApprovalPage.navigateToClaimsApprovalPage();
    await claimsApprovalPage.login(username, password);
    await claimsApprovalPage.verifyLoginSuccess();
    await claimsApprovalPage.selectPendingClaim();
    await claimsApprovalPage.clickRejectButton();
    await claimsApprovalPage.enterRejectionReasonWithSpecialCharacters(testData.claimsApproval.specialCharactersRejectionReason);
    await claimsApprovalPage.submitRejectionDecision();
    await claimsApprovalPage.verifyRejectionConfirmationMessage();
  });

  test('[4151] Verify that claims list displays correctly when no pending claims exist @Regression', async ({ claimsApprovalPage }) => {
    await claimsApprovalPage.navigateToClaimsApprovalPage();
    await claimsApprovalPage.login(username, password);
    await claimsApprovalPage.verifyLoginSuccess();
    await claimsApprovalPage.applyPendingFilter();
    await claimsApprovalPage.verifyEmptyStateMessageDisplayed(testData.claimsApproval.emptyStateMessage);
  });

  test('[4152] Verify that system handles concurrent approval attempts on the same claim by different approvers @Regression', async ({ browser }) => {
    const context1 = await browser.newContext();
    const context2 = await browser.newContext();
    const page1 = await context1.newPage();
    const page2 = await context2.newPage();
    
    const ClaimsApprovalPage = (await import('../pages/ClaimsApprovalPage.js')).default;
    const approver1Page = new ClaimsApprovalPage(page1);
    const approver2Page = new ClaimsApprovalPage(page2);
    
    await approver1Page.navigateToClaimsApprovalPage();
    await approver2Page.navigateToClaimsApprovalPage();
    
    await approver1Page.login(username, password);
    await approver2Page.login(username, password);
    
    await approver1Page.selectPendingClaimByIndex(0);
    await approver2Page.selectPendingClaimByIndex(0);
    
    await Promise.all([
      approver1Page.clickApproveButton(),
      approver2Page.clickApproveButton()
    ]);
    
    await Promise.all([
      approver1Page.submitApprovalDecision(),
      approver2Page.submitApprovalDecision()
    ]);
    
    const successVisible1 = await page1.locator('.success-message, .alert-success').isVisible().catch(() => false);
    const errorVisible2 = await page2.locator('.error-message, .alert-error').isVisible().catch(() => false);
    const successVisible2 = await page2.locator('.success-message, .alert-success').isVisible().catch(() => false);
    
    expect(successVisible1 && (errorVisible2 || !successVisible2)).toBeTruthy();
    
    await context1.close();
    await context2.close();
  });

  test('[4153] Verify that approver can approve a claim with minimum valid rejection reason length when switching from reject to approve @Regression', async ({ claimsApprovalPage }) => {
    await claimsApprovalPage.navigateToClaimsApprovalPage();
    await claimsApprovalPage.login(username, password);
    await claimsApprovalPage.verifyLoginSuccess();
    await claimsApprovalPage.selectPendingClaim();
    await claimsApprovalPage.clickRejectButton();
    await claimsApprovalPage.clickApproveButton();
    await claimsApprovalPage.submitApprovalDecision();
    await claimsApprovalPage.verifyApprovalConfirmationMessage();
  });
});

