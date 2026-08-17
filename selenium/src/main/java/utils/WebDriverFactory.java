package utils;

import org.openqa.selenium.WebDriver;

public final class WebDriverFactory {
    private WebDriverFactory() {
    }

    public static WebDriver createDriver() {
        return DriverFactory.initDriver(System.getProperty("BROWSER", System.getenv().getOrDefault("BROWSER", "chrome")));
    }

    public static WebDriver createDriver(String browser) {
        return DriverFactory.initDriver(browser);
    }
}
