package hooks;

import reporting.ExtentReportManager;
import utils.ConfigReader;
import utils.DriverFactory;
import utils.WebActions;
import io.cucumber.java.After;
import io.cucumber.java.AfterStep;
import io.cucumber.java.Before;
import io.cucumber.java.BeforeStep;
import io.cucumber.java.Scenario;
import io.qameta.allure.Allure;
import org.openqa.selenium.OutputType;
import org.openqa.selenium.TakesScreenshot;
import org.openqa.selenium.WebDriver;

import java.io.ByteArrayInputStream;
import java.nio.file.Path;

public class Hooks {
    @Before
    public void beforeScenario(Scenario scenario) {
        DriverFactory.initDriver(ConfigReader.get("BROWSER", "chrome"));
        ExtentReportManager.startTest(scenario.getName());
        ExtentReportManager.logInfo("Scenario started: " + scenario.getName());
    }

    @After
    public void afterScenario(Scenario scenario) {
        try {
            WebDriver driver = DriverFactory.getDriver();
            if (scenario.isFailed() && ConfigReader.getBoolean("SCREENSHOT_ON_FAILURE", true)) {
                byte[] screenshot = ((TakesScreenshot) driver).getScreenshotAs(OutputType.BYTES);
                scenario.attach(screenshot, "image/png", scenario.getName());
                Allure.addAttachment("Failure Screenshot", "image/png", new ByteArrayInputStream(screenshot), ".png");
                Path screenshotPath = new WebActions(driver).takeScreenshot(scenario.getName().replaceAll("[^a-zA-Z0-9]+", "-"));
                ExtentReportManager.attachScreenshot(screenshotPath.toString());
                ExtentReportManager.logFail("Scenario failed: " + scenario.getName());
            } else {
                ExtentReportManager.logPass("Scenario passed: " + scenario.getName());
            }
        } finally {
            DriverFactory.quitDriver();
            ExtentReportManager.endTest();
        }
    }

    @BeforeStep
    public void beforeStep(Scenario scenario) {
        ExtentReportManager.logInfo("Step started for scenario: " + scenario.getName());
    }

    @AfterStep
    public void afterStep(Scenario scenario) {
        ExtentReportManager.logInfo("Step completed. Scenario status: " + scenario.getStatus());
    }
}
