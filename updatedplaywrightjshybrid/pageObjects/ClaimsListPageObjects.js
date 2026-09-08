export class ClaimsListPageObjects {
  constructor(page) {
    this.page = page;
    // TODO: Verify selectors - Claims List controls not found in provided evidence
    // Using readable fallback selectors based on business context
    this.claimsListContainer = page.locator('[class*="claims-list"], [id*="claims"][id*="list"], table.claims, .claims-table').first();
    this.emptyStateMessage = page.locator('.empty-state, .no-data, [class*="empty"], p:has-text("no claims")').first();
  }

  getClaimRow(claimNumber) {
    return this.page.locator(`tr:has-text("${claimNumber}"), [data-claim="${claimNumber}"]`).first();
  }
}

