import 'dotenv/config';

function parseBoolean(value, fallback) {
  if (value === undefined) return fallback;
  return String(value).toLowerCase() === 'true';
}

export const environment = Object.freeze({
  baseURL: process.env.BASE_URL || undefined,
  headless: parseBoolean(process.env.HEADLESS, true),
  testRole: process.env.TEST_ROLE || undefined,
  username: process.env.TEST_USERNAME || undefined,
  password: process.env.TEST_PASSWORD || undefined,
});

export function requireBaseURL() {
  if (!environment.baseURL) {
    throw new Error('BASE_URL is required for application tests. Configure it in the environment.');
  }
  return environment.baseURL;
}

export function credentials() {
  return {
    username: environment.username,
    password: environment.password,
  };
}

