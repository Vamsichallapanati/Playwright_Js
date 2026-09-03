import { test, expect } from '@playwright/test';
import { LoginApi } from '../../pages/api/LoginApi';
import { EnvConfig } from '../../config/envConfig';
import testData from '../../test-data/api-test-data.json';

/**
 * Test Case ID: TC-2832
 * Title: Verify that login API returns success response with valid credentials
 * Priority: High
 * Type: Functional
 * Tags: API
 */
test.describe('Login API Tests', () => {
  let loginApi: LoginApi;

  test.beforeEach(async ({ request }) => {
    loginApi = new LoginApi(request);
  });

  test('TC-2832: Verify that login API returns success response with valid credentials @API @smoke', async () => {
    // STEP 1: Prepare API login request with valid credentials
    const username = EnvConfig.getApiUsername();
    const password = EnvConfig.getApiPassword();
    
    // Verify valid credentials are included in request payload
    expect(username).toBeTruthy();
    expect(password).toBeTruthy();

    // STEP 2: Send POST request to login API endpoint
    const response = await loginApi.sendLoginRequest(username, password);
    expect(response).toBeTruthy();

    // STEP 3: Verify response status code is 200 or 302
    const status = await loginApi.getResponseStatus(response);
    const validStatuses = testData.login.expectedSuccessStatusCodes;
    expect(
      validStatuses.includes(status),
      `Expected status to be one of ${validStatuses.join(', ')}, but got ${status}`
    ).toBeTruthy();

    // STEP 4: Verify response contains authentication token or session identifier
    const hasAuthToken = await loginApi.verifyAuthenticationToken(response);
    expect(
      hasAuthToken,
      'Response should contain valid session data (token, session, sessionId, or authToken)'
    ).toBeTruthy();

    // Additional validation: Log response for debugging (safe - no credentials)
    const responseBody = await loginApi.getResponseBody(response);
    console.log('Login API response received successfully');
  });
});
