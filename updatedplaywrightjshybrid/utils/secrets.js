export function requireSecret(name) {
  const value = process.env[name];
  if (!value) throw new Error(`Missing required secret environment variable: ${name}`);
  return value;
}

export function credentialsFor(prefix) {
  return {
    username: requireSecret(`${prefix}_USERNAME`),
    password: requireSecret(`${prefix}_PASSWORD`)
  };
}

export function defaultCredentials() {
  return {
    username: requireSecret('TEST_USERNAME'),
    password: requireSecret('TEST_PASSWORD')
  };
}
