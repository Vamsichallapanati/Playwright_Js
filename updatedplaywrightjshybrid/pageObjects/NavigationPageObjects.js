export class NavigationPageObjects {
  constructor(page) {
    this.page = page;
    // TODO: Verify selectors with live application - using semantic navigation patterns
    this.claimsRegistrationLink = page.getByRole('link', { name: /claims registration/i });
    this.claimsListLink = page.getByRole('link', { name: /claims list/i });
    this.navigationMenu = page.locator('nav, .navigation, #menu');
  }
}

