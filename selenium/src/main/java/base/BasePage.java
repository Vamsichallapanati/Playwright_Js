package base;

import utils.CSVReader;
import utils.ConfigReader;
import utils.TestDataLoader;
import utils.WebActions;
import org.openqa.selenium.WebDriver;

import java.util.List;
import java.util.Map;

public class BasePage extends WebActions {
    protected final Map<String, Object> testData;
    protected final List<Map<String, String>> credentials;

    public BasePage(WebDriver driver) {
        super(driver);
        this.testData = TestDataLoader.load();
        this.credentials = CSVReader.read("test-data/credentials.csv");
    }

    public Map<String, String> getLoginDataByRole(String roleName) {
        return credentials.stream()
                .filter(row -> roleName.equalsIgnoreCase(row.getOrDefault("RoleName", "")))
                .findFirst()
                .orElseThrow(() -> new IllegalArgumentException("No credentials found for role: " + roleName));
    }

    public void openApp() {
        open(ConfigReader.get("BASE_URL", String.valueOf(testData.getOrDefault("baseUrl", ""))));
    }

    public Object getTestData(String key) {
        return testData.get(key);
    }
}
