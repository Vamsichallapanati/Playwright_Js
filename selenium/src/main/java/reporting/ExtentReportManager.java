package reporting;

import com.aventstack.extentreports.ExtentReports;
import com.aventstack.extentreports.ExtentTest;
import com.aventstack.extentreports.reporter.ExtentSparkReporter;
import utils.ConfigReader;

import java.nio.file.Files;
import java.nio.file.Path;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

public final class ExtentReportManager {
    private static ExtentReports extentReports;
    private static final ThreadLocal<ExtentTest> TEST = new ThreadLocal<>();

    private ExtentReportManager() {
    }

    public static synchronized ExtentReports getInstance() {
        if (extentReports == null) {
            try {
                String timestamp = LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyyMMdd-HHmmss"));
                String reportRoot = ConfigReader.get("EXTENT_REPORT_PATH", "reports/");
                Files.createDirectories(Path.of(reportRoot));
                ExtentSparkReporter reporter = new ExtentSparkReporter(Path.of(reportRoot, "extent-report-" + timestamp + ".html").toString());
                extentReports = new ExtentReports();
                extentReports.attachReporter(reporter);
                extentReports.setSystemInfo("Framework", "Selenium Java BDD");
                extentReports.setSystemInfo("Environment", ConfigReader.get("ENVIRONMENT", "qa"));
            } catch (Exception exception) {
                throw new IllegalStateException("Unable to initialize ExtentReports", exception);
            }
        }
        return extentReports;
    }

    public static void startTest(String testName) {
        TEST.set(getInstance().createTest(testName));
    }

    public static void endTest() {
        TEST.remove();
    }

    public static void logPass(String message) {
        currentTest().pass(message);
    }

    public static void logFail(String message) {
        currentTest().fail(message);
    }

    public static void logInfo(String message) {
        currentTest().info(message);
    }

    public static void attachScreenshot(String screenshotPath) {
        currentTest().addScreenCaptureFromPath(screenshotPath);
    }

    public static synchronized void flush() {
        if (extentReports != null) {
            extentReports.flush();
        }
    }

    private static ExtentTest currentTest() {
        ExtentTest test = TEST.get();
        if (test == null) {
            startTest("Framework Event");
        }
        return TEST.get();
    }
}
