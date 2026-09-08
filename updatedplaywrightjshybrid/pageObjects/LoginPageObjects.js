export class LoginPageObjects {
  constructor(page) {
    this.page = page;
    // TODO: Verify selectors with live inspection - using fallback accessible selectors
    this.usernameInput = page.locator('#user-name');
    this.passwordInput = page.locator('#password');
    this.loginButton = page.locator('#login-button');
  }
}

