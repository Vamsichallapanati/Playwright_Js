import { test as base, expect } from '@playwright/test';
import LoginPage from '../pages/LoginPage.js';
import ClaimsRegistrationPage from '../pages/ClaimsRegistrationPage.js';
import ClaimsListPage from '../pages/ClaimsListPage.js';

export const test = base.extend({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  claimsRegistrationPage: async ({ page }, use) => {
    await use(new ClaimsRegistrationPage(page));
  },
  claimsListPage: async ({ page }, use) => {
    await use(new ClaimsListPage(page));
  }
});

export { expect };

