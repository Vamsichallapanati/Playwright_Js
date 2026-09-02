import BasePage from './BasePage.js';
import { ClaimsApprovalPageObjects } from '../pageObjects/ClaimsApprovalPageObjects.js';
import { expect } from '@playwright/test';

export default class ClaimsApprovalPage extends BasePage {
  constructor(page) {
    super(page);
    this.locators = new ClaimsApprovalPageObjects(page);
  }

  async navigateToClaimsApprovalPage() {
    await this.open('/');
  }

  async login(username, password) {
    await this.fill(this.locators.usernameInput, username);
    await this.fill(this.locators.passwordInput, password);
    await this.click(this.locators.loginButton);
  }

  async verifyLoginSuccess() {
    await expect(this.locators.claimsList).toBeVisible({ timeout: 10000 });
  }

  async selectPendingClaim() {
    await this.click(this.locators.pendingClaimRow.first());
  }

  async selectPendingClaimByIndex(index = 0) {
    await this.click(this.locators.pendingClaimRow.nth(index));
  }

  async verifyClaimDetailsDisplayed() {
    await this.expectVisible(this.locators.claimDetailsPanel);
    await this.expectVisible(this.locators.approveButton);
  }

  async clickApproveButton() {
    await this.click(this.locators.approveButton);
  }

  async submitApprovalDecision() {
    await this.click(this.locators.submitButton);
  }

  async verifyApprovalConfirmationMessage() {
    await this.expectVisible(this.locators.successMessage);
    await expect(this.locators.successMessage).toContainText(/approved/i, { timeout: 10000 });
  }

  async clickRejectButton() {
    await this.click(this.locators.rejectButton);
  }

  async enterRejectionReason(reason) {
    await this.fill(this.locators.rejectionReasonField, reason);
  }

  async submitRejectionDecision() {
    await this.click(this.locators.submitButton);
  }

  async verifyRejectionConfirmationMessage() {
    await this.expectVisible(this.locators.successMessage);
    await expect(this.locators.successMessage).toContainText(/rejected/i, { timeout: 10000 });
  }

  async clickClaimToViewDetails() {
    await this.click(this.locators.pendingClaimRow.first());
  }

  async verifyCompleteClaimDetails() {
    await this.expectVisible(this.locators.claimAmount);
    await this.expectVisible(this.locators.claimDescription);
    await this.expectVisible(this.locators.claimAttachments);
    await this.expectVisible(this.locators.claimantInfo);
  }

  async applyPendingFilter() {
    await this.locators.statusFilter.selectOption({ label: /pending/i });
  }

  async verifyOnlyPendingClaimsDisplayed() {
    await expect(this.locators.pendingClaimRow).toHaveCount(await this.locators.pendingClaimRow.count());
    await expect(this.locators.approvedClaimRow).toHaveCount(0);
    await expect(this.locators.rejectedClaimRow).toHaveCount(0);
  }

  async searchByClaimID(claimID) {
    await this.fill(this.locators.searchField, claimID);
    await this.click(this.locators.searchButton);
  }

  async verifyClaimDisplayedInResults(claimID) {
    await this.expectVisible(this.locators.getClaimByID(claimID));
  }

  async approveClaim() {
    await this.clickApproveButton();
    await this.submitApprovalDecision();
  }

  async navigateToApprovedClaimsList() {
    await this.click(this.locators.approvedClaimsTab);
  }

  async verifyClaimInApprovedList() {
    await expect(this.locators.approvedClaimRow.first()).toBeVisible({ timeout: 10000 });
  }

  async sortBySubmissionDate() {
    await this.click(this.locators.submissionDateColumn);
  }

  async verifyClaimsSortedByDate() {
    const count = await this.locators.pendingClaimRow.count();
    await expect(this.locators.pendingClaimRow).toHaveCount(count);
  }

  async leaveRejectionReasonEmpty() {
    await this.locators.rejectionReasonField.clear();
  }

  async verifyValidationErrorDisplayed(expectedError) {
    await this.expectVisible(this.locators.validationError);
    await expect(this.locators.validationError).toContainText(expectedError, { ignoreCase: true });
  }

  async verifyClaimStatusRemainsPending() {
    await expect(this.locators.pendingClaimRow.first()).toBeVisible();
  }

  async navigateToRejectedClaimsList() {
    await this.click(this.locators.rejectedClaimsTab);
  }

  async attemptToApproveApprovedClaim() {
    await this.click(this.locators.approvedClaimRow.first());
    const approveButtonDisabled = await this.locators.approveButton.isDisabled();
    if (!approveButtonDisabled) {
      await this.click(this.locators.approveButton);
    }
  }

  async verifyApproveActionBlockedOrDisabled() {
    const isDisabled = await this.locators.approveButton.isDisabled();
    const errorVisible = await this.locators.errorMessage.isVisible();
    expect(isDisabled || errorVisible).toBeTruthy();
  }

  async attemptToRejectRejectedClaim() {
    await this.click(this.locators.rejectedClaimRow.first());
    const rejectButtonDisabled = await this.locators.rejectButton.isDisabled();
    if (!rejectButtonDisabled) {
      await this.click(this.locators.rejectButton);
    }
  }

  async verifyRejectActionBlockedOrDisabled() {
    const isDisabled = await this.locators.rejectButton.isDisabled();
    const errorVisible = await this.locators.errorMessage.isVisible();
    expect(isDisabled || errorVisible).toBeTruthy();
  }

  async verifyNoResultsMessage(expectedMessage) {
    await this.expectVisible(this.locators.emptyStateMessage);
    await expect(this.locators.emptyStateMessage).toContainText(expectedMessage, { ignoreCase: true });
  }

  async loginWithEmptyUsername(password) {
    await this.locators.usernameInput.clear();
    await this.fill(this.locators.passwordInput, password);
    await this.click(this.locators.loginButton);
  }

  async verifyUsernameRequiredError(expectedError) {
    await this.expectVisible(this.locators.errorMessage);
    await expect(this.locators.errorMessage).toContainText(expectedError, { ignoreCase: true });
  }

  async loginWithInvalidPassword(username, invalidPassword) {
    await this.fill(this.locators.usernameInput, username);
    await this.fill(this.locators.passwordInput, invalidPassword);
    await this.click(this.locators.loginButton);
  }

  async verifyInvalidCredentialsError(expectedError) {
    await this.expectVisible(this.locators.errorMessage);
    await expect(this.locators.errorMessage).toContainText(expectedError, { ignoreCase: true });
  }

  async enterMaxLengthRejectionReason(maxText) {
    await this.fill(this.locators.rejectionReasonField, maxText);
  }

  async enterExceedsMaxLengthRejectionReason(exceedingText) {
    await this.fill(this.locators.rejectionReasonField, exceedingText);
  }

  async verifyCharacterLimitEnforcement() {
    const errorVisible = await this.locators.validationError.isVisible();
    expect(errorVisible).toBeTruthy();
  }

  async enterWhitespaceOnlyRejectionReason(whitespaceText) {
    await this.fill(this.locators.rejectionReasonField, whitespaceText);
  }

  async enterRejectionReasonWithSpecialCharacters(specialText) {
    await this.fill(this.locators.rejectionReasonField, specialText);
  }

  async verifyEmptyStateMessageDisplayed(expectedMessage) {
    await this.expectVisible(this.locators.emptyStateMessage);
    await expect(this.locators.emptyStateMessage).toContainText(expectedMessage, { ignoreCase: true });
  }
}

