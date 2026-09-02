export class ClaimsApprovalPageObjects {
  constructor(page) {
    this.page = page;
    // Login elements
    this.usernameInput = page.locator('input[name="username"], #username, input[placeholder*="username" i]');
    this.passwordInput = page.locator('input[name="password"], #password, input[type="password"]');
    this.loginButton = page.locator('button[type="submit"], button:has-text("Login"), button:has-text("Log In")');
    
    // Claims list elements
    this.claimsList = page.locator('.claims-list, #claims-list, [data-testid="claims-list"]');
    this.pendingClaimRow = page.locator('.claim-row[data-status="pending"], tr.pending-claim, .pending-claim');
    this.approvedClaimRow = page.locator('.claim-row[data-status="approved"], tr.approved-claim, .approved-claim');
    this.rejectedClaimRow = page.locator('.claim-row[data-status="rejected"], tr.rejected-claim, .rejected-claim');
    
    // Claim details elements
    this.claimDetailsPanel = page.locator('.claim-details, #claim-details, [data-testid="claim-details"]');
    this.claimAmount = page.locator('.claim-amount, #claim-amount, [data-testid="claim-amount"]');
    this.claimDescription = page.locator('.claim-description, #claim-description, [data-testid="claim-description"]');
    this.claimAttachments = page.locator('.claim-attachments, #claim-attachments, [data-testid="claim-attachments"]');
    this.claimantInfo = page.locator('.claimant-info, #claimant-info, [data-testid="claimant-info"]');
    
    // Action buttons
    this.approveButton = page.locator('button:has-text("Approve"), [data-action="approve"], #approve-button');
    this.rejectButton = page.locator('button:has-text("Reject"), [data-action="reject"], #reject-button');
    this.submitButton = page.locator('button[type="submit"], button:has-text("Submit")');
    
    // Rejection form
    this.rejectionReasonField = page.locator('textarea[name="rejectionReason"], #rejection-reason, [data-testid="rejection-reason"]');
    
    // Filter and search
    this.statusFilter = page.locator('select[name="status"], #status-filter, [data-testid="status-filter"]');
    this.searchField = page.locator('input[name="search"], #claim-search, input[placeholder*="search" i]');
    this.searchButton = page.locator('button:has-text("Search"), [data-action="search"]');
    
    // Sort controls
    this.submissionDateColumn = page.locator('th:has-text("Submission Date"), [data-sort="submissionDate"]');
    
    // Navigation
    this.pendingClaimsTab = page.locator('a:has-text("Pending"), [data-tab="pending"], #pending-claims-tab');
    this.approvedClaimsTab = page.locator('a:has-text("Approved"), [data-tab="approved"], #approved-claims-tab');
    this.rejectedClaimsTab = page.locator('a:has-text("Rejected"), [data-tab="rejected"], #rejected-claims-tab');
    
    // Messages and notifications
    this.successMessage = page.locator('.success-message, .alert-success, [data-testid="success-message"]');
    this.errorMessage = page.locator('.error-message, .alert-error, [data-testid="error-message"]');
    this.validationError = page.locator('.validation-error, .field-error, [data-testid="validation-error"]');
    this.emptyStateMessage = page.locator('.empty-state, [data-testid="empty-state"]');
  }

  getClaimByID(claimID) {
    return this.page.locator(`[data-claim-id="${claimID}"], .claim-row:has-text("${claimID}")`);
  }

  getClaimRowByIndex(index) {
    return this.page.locator('.claim-row, tr.claim').nth(index);
  }
}

