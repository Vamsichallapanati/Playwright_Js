import { test, expect } from '../fixtures/test.js';
import LoginPage from '../pages/LoginPage.js';
import { requireBaseURL } from '../config/environment.js';
import testData from '../test-data/testdata.json' assert { type: 'json' };

test.describe('Login functionality', () => {
  let loginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
  });

  test('[2812] Verify that login fails when username field is left empty @Smoke', async ({ page }) => {
    const baseURL = requireBaseURL();
    const password = process.env.TEST_PASSWORD;
    const { expectedValidationError } = testData.login.emptyUsernameScenario;

    // STEP 1: Navigate to url
    await loginPage.navigateToLoginPage(baseURL);
    await expect(page).toHaveURL(/login/);

    // STEP 2: Leave username field empty and enter password
    await loginPage.leaveUsernameEmptyAndEnterPassword(password);
    await loginPage.verifyPasswordFieldContainsValue();
    await loginPage.verifyUsernameFieldIsEmpty();

    // STEP 3: Click the login button
    await loginPage.clickLoginButton();

    // STEP 4: Verify validation error message is displayed for username
    await loginPage.verifyValidationErrorDisplayed();

    // STEP 5: Verify user remains on login page
    await loginPage.verifyUserRemainsOnLoginPage();
  });
});

