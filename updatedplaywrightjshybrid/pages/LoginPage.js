import BasePage from './BasePage.js';
import { LoginPageObjects } from '../pageObjects/LoginPageObjects.js';

export default class LoginPage extends BasePage {
  constructor(page) {
    super(page);
    this.locators = new LoginPageObjects(page);
  }

  async navigateToLoginPage(url) {
    await this.page.goto(url);
    await this.page.waitForLoadState('domcontentloaded');
  }

  async leaveUsernameEmptyAndEnterPassword(password) {
    await this.fill(this.locators.usernameInput, '');
    await this.fill(this.locators.passwordInput, password);
  }

  async clickLoginButton() {
    await this.click(this.locators.loginButton);
  }

  async verifyValidationErrorDisplayed() {
    await this.expectVisible(this.locators.validationError);
  }

  async verifyUserRemainsOnLoginPage() {
    await this.expectVisible(this.locators.loginForm);
    await this.expectPath(/login/);
  }

  async verifyPasswordFieldContainsValue() {
    await this.page.waitForTimeout(500);
    const passwordValue = await this.locators.passwordInput.inputValue();
    if (!passwordValue) {
      throw new Error('Password field should contain value');
    }
  }

  async verifyUsernameFieldIsEmpty() {
    const usernameValue = await this.locators.usernameInput.inputValue();
    if (usernameValue !== '') {
      throw new Error('Username field should remain empty');
    }
  }
}

