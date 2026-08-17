package listeners;

import org.junit.jupiter.api.extension.AfterTestExecutionCallback;
import org.junit.jupiter.api.extension.BeforeTestExecutionCallback;
import org.junit.jupiter.api.extension.ExtensionContext;

public class AllureJUnitListener implements BeforeTestExecutionCallback, AfterTestExecutionCallback {
    @Override
    public void beforeTestExecution(ExtensionContext context) {
        System.setProperty("allure.results.directory", "target/allure-results");
    }

    @Override
    public void afterTestExecution(ExtensionContext context) {
        // Allure adapter records the test result; hook reserved for screenshots/log attachments.
    }
}
