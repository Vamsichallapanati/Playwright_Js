# Playwright JavaScript Hybrid Framework

Runnable static framework for tests generated only from approved test cases.

This repository path is reference context only. Generated client files must be written under the selected client framework root, usually `updatedplaywrightjshybrid`, or as paths relative to that root. Do not generate output paths beginning with `web-automation/`, `Web Automation/`, `playwright/javascript/hybrid/`, `Agent_Skills/`, or `StaticFrameworks/`.

## Commands

```bash
npm install
npm run install:browsers
npm run test:list
npm test
npm run test:framework
```

Application tests read `BASE_URL` and secrets from the environment. Do not commit `.env` files or real credentials.

Runtime values belong in `.env`:

```env
BASE_URL=
HEADLESS=true
TEST_ROLE=
TEST_USERNAME=
TEST_PASSWORD=
```

Generated tests and page classes must read these values through `process.env`, `config/environment.js`, or `utils/secrets.js`. Do not hardcode URLs, usernames, or passwords in generated JavaScript files.

When testcase steps include literal runtime values such as a URL, username, email, or password, generation must put those values only in `.env`. Generated `tests/*.js`, `pages/*.js`, and `pageObjects/*.js` files must not contain those literals or fallback expressions such as `process.env.TEST_PASSWORD || 'demo'`; tests should read `process.env.BASE_URL`, `process.env.TEST_USERNAME`, and `process.env.TEST_PASSWORD` or use framework helpers that expose those values.

Use `.env` only for the application base URL and valid/default runtime credentials. Put negative-case credentials, alternate users, form values, expected messages, search text, and other testcase-specific values in `test-data/testdata.json` or `test-data/credentials.csv`. Negative tests must not replace `.env` valid credentials with invalid credentials.

Generated tests may reference `process.env.BASE_URL`, `process.env.TEST_USERNAME`, `process.env.TEST_PASSWORD`, and test-data keys, but must not expose literal runtime values in test titles, step titles, comments, logs, page objects, or tests. Use safe step labels such as "Navigate to login page", not labels containing hidden values or environment variable names.

When generated tests reference `testData` keys, `test-data/testdata.json` must contain the exact same object path. For example, `const { emptyCredentials } = testData.login;` requires `test-data/testdata.json` to contain `login.emptyCredentials`. Do not reference nested test-data keys unless the generated test-data file defines them.

For each generation, generated `test-data/testdata.json` and `test-data/credentials.csv` must contain selected testcase IDs/data only. Do not carry stale testcase IDs, credentials, URLs, or rows from previous generated branches unless those testcase IDs are selected again.

When backend generation provides selector evidence from live page inspection, generated page objects must prefer that evidence over guessed testcase wording. Prefer stable `id`, `name`, `data-testid`, `data-test`, `data-qa`, role/name, placeholder, visible label, and button/link text from the evidence. If evidence shows `id="username"` or `name="username"`, use a stable selector such as `page.locator('#username')` or `page.locator('input[name="username"]')` instead of guessing `page.getByLabel('Username')`.

If selector evidence is incomplete, generated page objects should use readable fallback chains from stable evidence or user-facing attributes and mark selector uncertainty in warnings. Do not use absolute XPath, generated classes, or blind positional selectors.

Generated feature files belong in `pageObjects/`, `pages/`, and `tests/`; register page classes in `fixtures/test.js`.

For every selected runnable testcase, script generation must return locator objects, a page class, and a Playwright test:

```text
pageObjects/<Feature>PageObjects.js
pages/<Feature>Page.js
tests/<feature>.test.js
```

Do not return only `.env`, only locator/page files, only coverage metadata, or an empty operation set when testcase steps are present. If selector evidence is incomplete, generate best-effort accessible selectors, mark the output as needing exploration, and still return runnable feature files.

Dependency contract: if a generated test imports `../pages/<Feature>Page.js`, that page file must exist in the same generated output or already exist in the selected client branch. If a generated page imports `../pageObjects/<Feature>PageObjects.js`, that locator file must also exist in the same output or selected branch. Tests must never call page methods that are missing from the page class.

Use the split Hybrid style: `pageObjects/` stores only locator definitions, `pages/` stores page classes with business actions/assertions, and `tests/` stores runnable Playwright tests. Do not generate `page-objects/` files.

Playwright tags must come from the approved testcase `tags` field and be added to the test title as `@TagName`.

`framework-tests/` contains only the framework's isolated self-test. The script-generation agent must never copy its health-test names, selectors, page content, or test data into generated application tests.

