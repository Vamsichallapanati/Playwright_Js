export class ClaimsListPageObjects {
  constructor(page) {
    this.page = page;
    // TODO: Verify selectors with live application - using semantic patterns
    this.emptyStateMessage = page.locator('.empty-state, .no-data-message, [data-testid="empty-claims"]');
    this.claimsTable = page.locator('table.claims-list, #claimsTable');
    this.claimsListContainer = page.locator('.claims-container, #claimsList');
    this.navigateToRegistrationLink = page.getByRole('link', { name: /register|new claim/i });
  }

  getClaimRow(claimNumber) {
    return this.page.locator(`tr:has-text("${claimNumber}")`);
  }
}

