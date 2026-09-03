import { APIRequestContext } from '@playwright/test';
import { EnvConfig } from '../config/envConfig';

export class ApiClient {
  private request: APIRequestContext;
  private baseUrl: string;

  constructor(request: APIRequestContext) {
    this.request = request;
    this.baseUrl = EnvConfig.getApiBaseUrl();
  }

  async post(endpoint: string, data: any, headers: any = {}) {
    const url = `${this.baseUrl}${endpoint}`;
    return await this.request.post(url, {
      data,
      headers: {
        'Content-Type': 'application/json',
        ...headers
      }
    });
  }

  async get(endpoint: string, headers: any = {}) {
    const url = `${this.baseUrl}${endpoint}`;
    return await this.request.get(url, { headers });
  }
}
