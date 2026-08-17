package base;

import reporting.ExtentReportManager;
import utils.ConfigReader;
import utils.DriverFactory;
import utils.WebActions;
import io.github.bonigarcia.wdm.WebDriverManager;
import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.TestInfo;
import org.openqa.selenium.WebDriver;

public abstract class BaseTest {
    protected WebDriver driver;

    @BeforeAll
    static void beforeAll() {
        WebDriverManager.chromedriver().setup();
        WebDriverManager.firefoxdriver().setup();
        WebDriverManager.edgedriver().setup();
    }

    @BeforeEach
    void beforeEach(TestInfo testInfo) {
        driver = DriverFactory.initDriver(ConfigReader.get("BROWSER", "chrome"));
        ExtentReportManager.startTest(testInfo.getDisplayName());
    }

    @AfterEach
    void afterEach(TestInfo testInfo) {
        if (driver != null && ConfigReader.getBoolean("SCREENSHOT_ON_FAILURE", true)) {
            ExtentReportManager.logInfo("Finished: " + testInfo.getDisplayName());
        }
        DriverFactory.quitDriver();
        ExtentReportManager.endTest();
    }

    @AfterAll
    static void afterAll() {
        ExtentReportManager.flush();
    }

    protected WebActions actions() {
        return new WebActions(driver);
    }
}
