# Selenium Java BDD Static Framework

Production-ready Selenium WebDriver framework using Java 17, Cucumber 7, JUnit Platform, Maven, AssertJ, Allure, ExtentReports, WebDriverManager, PicoContainer, `.env`, CSV credentials, and JSON test data.

## Run

```powershell
mvn install
mvn test
mvn test -P smoke
mvn test -P regression
```

Set `BASE_URL` in `config/config.properties` or `.env`.

## AI Generation Contract

For each feature, generate:

1. `src/main/java/pageObjects/<Feature>PageObjects.java`
2. `src/main/java/pages/<Feature>Page.java`
3. `src/test/java/stepDefinitions/<Feature>Steps.java`
4. `src/test/java/features/<feature>.feature`

Rules:

- PageObjects contain locators only.
- Pages contain actions and assertions only.
- Step definitions are thin and call pages only.
- Scenarios must use `@smoke` or `@regression` plus `@TC-XXX-NNN`.
- Credentials come from `test-data/credentials.csv`.
- Test data comes from `test-data/testdata.json`, with `utils/testdata.json` supported only as a backward-compatible fallback.
