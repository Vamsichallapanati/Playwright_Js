import { test as base, expect } from '@playwright/test';
import ClaimsApprovalPage from '../pages/ClaimsApprovalPage.js';

export const test = base.extend({
  claimsApprovalPage: async ({ page }, use) => {
    await use(new ClaimsApprovalPage(page));
  }
});

export { expect };

