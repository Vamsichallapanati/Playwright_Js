import { APIRequestContext, APIResponse } from '@playwright/test';
import { ApiClient } from '../../utils/apiClient';
import { EnvConfig } from '../../config/envConfig';
import testData from '../../test-data/api-test-data.json';

export class LoginApi {
  private apiClient: ApiClient;
  private loginEndpoint: string;

  constructor(request: APIRequestContext) {
    this.apiClient = new ApiClient(request);
    this.loginEndpoint = testData.login.endpoint;
  }

  async sendLoginRequest(username: string, password: string): Promise<APIResponse> {
    const payload = {
      username,
      password
    };
    return await this.apiClient.post(this.loginEndpoint, payload);
  }

  async verifySuccessfulResponse(response: APIResponse): Promise<boolean> {
    const status = response.status();
    const validStatuses = testData.login.expectedSuccessStatusCodes;
    return validStatuses.includes(status);
  }

  async verifyAuthenticationToken(response: APIResponse): Promise<boolean> {
    const responseBody = await response.json();
    const requiredFields = testData.login.requiredResponseFields;
    
    // Check if at least one of the required fields exists in the response
    return requiredFields.some(field => 
      responseBody.hasOwnProperty(field) && responseBody[field]
    );
  }

  async getResponseStatus(response: APIResponse): Promise<number> {
    return response.status();
  }

  async getResponseBody(response: APIResponse): Promise<any> {
    try {
      return await response.json();
    } catch (error) {
      return await response.text();
    }
  }
}
