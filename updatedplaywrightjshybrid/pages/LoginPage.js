import BasePage from './BasePage.js';
import { LoginPageObjects } from '../pageObjects/LoginPageObjects.js';

export default class LoginPage extends BasePage {
  constructor(page) {
    super(page);
    this.locators = new LoginPageObjects(page);
  }

  async login(username, password) {
    await this.fill(this.locators.usernameInput, username);
    await this.fill(this.locators.passwordInput, password);
    await this.click(this.locators.loginButton);
  }

  async verifyAuthenticated() {
    await this.expectPath(/inventory\.html/);
  }
}

