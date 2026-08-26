export class LoginPageObjects {
  constructor(page) {
    this.page = page;
    // TODO: Verify selectors - evidence unavailable from backend
    // Using readable accessible selectors based on common Moodle login patterns
    this.usernameInput = page.locator('input[name="username"]');
    this.passwordInput = page.locator('input[name="password"]');
    this.loginButton = page.locator('button[type="submit"]');
    this.validationError = page.locator('.alert-danger, .error, [role="alert"]');
    this.loginForm = page.locator('form#login');
  }
}

