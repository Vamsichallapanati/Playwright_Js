package utils;

import org.assertj.core.api.Assertions;
import org.openqa.selenium.Alert;
import org.openqa.selenium.By;
import org.openqa.selenium.JavascriptExecutor;
import org.openqa.selenium.Keys;
import org.openqa.selenium.NoAlertPresentException;
import org.openqa.selenium.NoSuchElementException;
import org.openqa.selenium.OutputType;
import org.openqa.selenium.TakesScreenshot;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.interactions.Actions;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.Select;
import org.openqa.selenium.support.ui.WebDriverWait;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.time.Duration;
import java.util.ArrayList;
import java.util.List;
import java.util.Random;

public class WebActions {
    protected final WebDriver driver;
    protected final WebDriverWait wait;
    protected final JavascriptExecutor js;
    protected final Actions actionBuilder;
    private String mainWindowHandle;

    public WebActions(WebDriver driver) {
        this.driver = driver;
        this.wait = new WebDriverWait(driver, Duration.ofSeconds(ConfigReader.getInt("EXPLICIT_WAIT", 20)));
        this.js = (JavascriptExecutor) driver;
        this.actionBuilder = new Actions(driver);
        this.mainWindowHandle = driver.getWindowHandle();
    }

    /** Opens the supplied URL. */
    public void open(String url) { driver.get(url); waitForPageLoad(); }
    /** Refreshes the current page. */
    public void refresh() { driver.navigate().refresh(); waitForPageLoad(); }
    /** Returns the browser title. */
    public String getTitle() { return driver.getTitle(); }
    /** Returns the current URL. */
    public String getUrl() { return driver.getCurrentUrl(); }
    /** Navigates back in browser history. */
    public void back() { driver.navigate().back(); waitForPageLoad(); }
    /** Navigates forward in browser history. */
    public void forward() { driver.navigate().forward(); waitForPageLoad(); }
    /** Waits for an element to be present in the DOM. */
    public WebElement waitForElement(By locator) { return wait.until(ExpectedConditions.presenceOfElementLocated(locator)); }
    /** Waits for an element to be visible with a custom timeout. */
    public WebElement waitForElementVisible(By locator, int timeout) { return new WebDriverWait(driver, Duration.ofSeconds(timeout)).until(ExpectedConditions.visibilityOfElementLocated(locator)); }
    /** Waits for an element to be clickable with a custom timeout. */
    public WebElement waitForElementClickable(By locator, int timeout) { return new WebDriverWait(driver, Duration.ofSeconds(timeout)).until(ExpectedConditions.elementToBeClickable(locator)); }
    /** Waits for an element to become invisible with a custom timeout. */
    public void waitForInvisibility(By locator, int timeout) { new WebDriverWait(driver, Duration.ofSeconds(timeout)).until(ExpectedConditions.invisibilityOfElementLocated(locator)); }
    /** Waits until document.readyState is complete. */
    public void waitForPageLoad() { wait.until(webDriver -> "complete".equals(js.executeScript("return document.readyState"))); }
    /** Waits until the current URL contains the supplied fragment. */
    public void waitForUrl(String fragment) { wait.until(ExpectedConditions.urlContains(fragment)); }
    /** Performs a fixed wait in milliseconds. */
    public void hardWait(long milliseconds) { try { Thread.sleep(milliseconds); } catch (InterruptedException exception) { Thread.currentThread().interrupt(); throw new IllegalStateException("Hard wait interrupted", exception); } }
    /** Waits until text is present in an element. */
    public void waitForTextPresent(By locator, String text) { wait.until(ExpectedConditions.textToBePresentInElementLocated(locator, text)); }
    /** Clicks a clickable element. */
    public void click(By locator) { waitForElementClickable(locator, ConfigReader.getInt("EXPLICIT_WAIT", 20)).click(); }
    /** Clicks the last matching element. */
    public void clickLast(By locator) { List<WebElement> elements = driver.findElements(locator); elements.get(elements.size() - 1).click(); }
    /** Clicks the first element matching visible text. */
    public void clickByText(String text) { click(By.xpath("//*[normalize-space()='" + text + "']")); }
    /** Clicks an element at the provided zero-based index. */
    public void clickByIndex(By locator, int index) { driver.findElements(locator).get(index).click(); }
    /** Clicks an element using JavaScript. */
    public void javascriptClick(By locator) { js.executeScript("arguments[0].click();", waitForElement(locator)); }
    /** Double-clicks an element. */
    public void doubleClick(By locator) { actionBuilder.doubleClick(waitForElementVisible(locator, ConfigReader.getInt("EXPLICIT_WAIT", 20))).perform(); }
    /** Right-clicks an element. */
    public void rightClick(By locator) { actionBuilder.contextClick(waitForElementVisible(locator, ConfigReader.getInt("EXPLICIT_WAIT", 20))).perform(); }
    /** Clicks an element only when it is present. */
    public boolean clickIfPresent(By locator) { if (isPresent(locator)) { click(locator); return true; } return false; }
    /** Fills text into an input. */
    public void fill(By locator, String value) { waitForElementVisible(locator, ConfigReader.getInt("EXPLICIT_WAIT", 20)).sendKeys(value); }
    /** Clears and fills text into an input. */
    public void clearAndFill(By locator, String value) { WebElement element = waitForElementVisible(locator, ConfigReader.getInt("EXPLICIT_WAIT", 20)); element.clear(); element.sendKeys(value); }
    /** Presses a keyboard key on an element. */
    public void pressKey(By locator, Keys key) { waitForElementVisible(locator, ConfigReader.getInt("EXPLICIT_WAIT", 20)).sendKeys(key); }
    /** Fills text and presses a keyboard key. */
    public void fillAndPress(By locator, String value, Keys key) { clearAndFill(locator, value); pressKey(locator, key); }
    /** Uploads a file by path. */
    public void uploadFile(By locator, String path) { waitForElement(locator).sendKeys(Path.of(path).toAbsolutePath().toString()); }
    /** Gets visible element text. */
    public String getText(By locator) { return waitForElementVisible(locator, ConfigReader.getInt("EXPLICIT_WAIT", 20)).getText().trim(); }
    /** Gets the value attribute. */
    public String getValue(By locator) { return getAttribute(locator, "value"); }
    /** Gets an element attribute. */
    public String getAttribute(By locator, String attribute) { return waitForElement(locator).getAttribute(attribute); }
    /** Gets text from all matching elements. */
    public List<String> getAllTexts(By locator) { return driver.findElements(locator).stream().map(WebElement::getText).map(String::trim).toList(); }
    /** Gets count of matching elements. */
    public int getCount(By locator) { return driver.findElements(locator).size(); }
    /** Gets a CSS value from an element. */
    public String getCssValue(By locator, String property) { return waitForElementVisible(locator, ConfigReader.getInt("EXPLICIT_WAIT", 20)).getCssValue(property); }
    /** Selects dropdown option by visible text. */
    public void selectByText(By locator, String text) { new Select(waitForElementVisible(locator, ConfigReader.getInt("EXPLICIT_WAIT", 20))).selectByVisibleText(text); }
    /** Selects dropdown option by value. */
    public void selectByValue(By locator, String value) { new Select(waitForElementVisible(locator, ConfigReader.getInt("EXPLICIT_WAIT", 20))).selectByValue(value); }
    /** Selects dropdown option by index. */
    public void selectByIndex(By locator, int index) { new Select(waitForElementVisible(locator, ConfigReader.getInt("EXPLICIT_WAIT", 20))).selectByIndex(index); }
    /** Gets all dropdown option texts. */
    public List<String> getAllOptions(By locator) { return new Select(waitForElementVisible(locator, ConfigReader.getInt("EXPLICIT_WAIT", 20))).getOptions().stream().map(WebElement::getText).map(String::trim).toList(); }
    /** Gets selected dropdown option text. */
    public String getSelectedOption(By locator) { return new Select(waitForElementVisible(locator, ConfigReader.getInt("EXPLICIT_WAIT", 20))).getFirstSelectedOption().getText().trim(); }
    /** Checks checkbox or radio input. */
    public void check(By locator) { WebElement element = waitForElementClickable(locator, ConfigReader.getInt("EXPLICIT_WAIT", 20)); if (!element.isSelected()) element.click(); }
    /** Unchecks checkbox input. */
    public void uncheck(By locator) { WebElement element = waitForElementClickable(locator, ConfigReader.getInt("EXPLICIT_WAIT", 20)); if (element.isSelected()) element.click(); }
    /** Returns whether checkbox or radio input is checked. */
    public boolean isChecked(By locator) { return waitForElement(locator).isSelected(); }
    /** Checks all matching checkbox inputs. */
    public void checkAll(By locator) { driver.findElements(locator).forEach(element -> { if (!element.isSelected()) element.click(); }); }
    /** Returns whether element is visible. */
    public boolean isVisible(By locator) { try { return waitForElementVisible(locator, 3).isDisplayed(); } catch (RuntimeException exception) { return false; } }
    /** Returns whether element is not visible. */
    public boolean isNotVisible(By locator) { return !isVisible(locator); }
    /** Returns whether element is enabled. */
    public boolean isEnabled(By locator) { return waitForElement(locator).isEnabled(); }
    /** Returns whether element is disabled. */
    public boolean isDisabled(By locator) { return !isEnabled(locator); }
    /** Returns whether element is present in DOM. */
    public boolean isPresent(By locator) { return !driver.findElements(locator).isEmpty(); }
    /** Returns whether element is absent from DOM. */
    public boolean isNotPresent(By locator) { return !isPresent(locator); }
    /** Asserts element visibility. */
    public void assertVisible(By locator) { assertVisible(locator, "Element should be visible: " + locator); }
    /** Asserts element visibility with a custom message. */
    public void assertVisible(By locator, String message) { Assertions.assertThat(isVisible(locator)).as(message).isTrue(); }
    /** Asserts exact element text. */
    public void assertText(By locator, String expected) { Assertions.assertThat(getText(locator)).as("Text mismatch for " + locator).isEqualTo(expected); }
    /** Asserts partial element text. */
    public void assertContainsText(By locator, String partial) { Assertions.assertThat(getText(locator)).as("Text should contain expected value").contains(partial); }
    /** Asserts element count. */
    public void assertCount(By locator, int expected) { Assertions.assertThat(getCount(locator)).as("Element count mismatch").isEqualTo(expected); }
    /** Asserts URL contains a fragment. */
    public void assertUrl(String fragment) { Assertions.assertThat(getUrl()).as("URL should contain fragment").contains(fragment); }
    /** Asserts page title. */
    public void assertTitle(String expected) { Assertions.assertThat(getTitle()).as("Title mismatch").isEqualTo(expected); }
    /** Asserts element attribute value. */
    public void assertAttribute(By locator, String attribute, String expected) { Assertions.assertThat(getAttribute(locator, attribute)).as("Attribute mismatch").isEqualTo(expected); }
    /** Gets table row count excluding header rows. */
    public int getTableRowCount(By table) { return waitForElement(table).findElements(By.cssSelector("tbody tr")).size(); }
    /** Gets table cell text using one-based row and column indexes. */
    public String getTableCellText(By table, int row, int col) { return waitForElement(table).findElement(By.cssSelector("tbody tr:nth-child(" + row + ") td:nth-child(" + col + ")")).getText().trim(); }
    /** Gets all values from a one-based table column index. */
    public List<String> getTableColumnValues(By table, int colIndex) { List<String> values = new ArrayList<>(); for (WebElement row : waitForElement(table).findElements(By.cssSelector("tbody tr"))) { values.add(row.findElement(By.cssSelector("td:nth-child(" + colIndex + ")")).getText().trim()); } return values; }
    /** Finds the first one-based row index matching a column value. */
    public int findRowByColumnValue(By table, int col, String value) { List<String> values = getTableColumnValues(table, col); for (int index = 0; index < values.size(); index++) { if (values.get(index).equals(value)) return index + 1; } return -1; }
    /** Scrolls element into center viewport. */
    public void scrollTo(By locator) { scrollIntoView(locator); }
    /** Scrolls to the top of the page. */
    public void scrollToTop() { js.executeScript("window.scrollTo(0, 0);"); }
    /** Scrolls to the bottom of the page. */
    public void scrollToBottom() { js.executeScript("window.scrollTo(0, document.body.scrollHeight);"); }
    /** Scrolls element into view. */
    public void scrollIntoView(By locator) { js.executeScript("arguments[0].scrollIntoView({block:'center'});", waitForElement(locator)); }
    /** Switches into a frame located by element. */
    public void switchToFrame(By locator) { driver.switchTo().frame(waitForElement(locator)); }
    /** Switches back to default content. */
    public void switchToDefaultContent() { driver.switchTo().defaultContent(); }
    /** Switches into a frame by zero-based index. */
    public void switchToFrameByIndex(int index) { driver.switchTo().frame(index); }
    /** Switches to a newly opened tab. */
    public void switchToNewTab() { for (String handle : driver.getWindowHandles()) { if (!handle.equals(mainWindowHandle)) { driver.switchTo().window(handle); return; } } }
    /** Switches to the original window. */
    public void switchToMainWindow() { driver.switchTo().window(mainWindowHandle); }
    /** Closes current tab and switches to main window. */
    public void closeCurrentTab() { driver.close(); switchToMainWindow(); }
    /** Gets the number of open windows or tabs. */
    public int getWindowCount() { return driver.getWindowHandles().size(); }
    /** Accepts the active alert. */
    public void acceptAlert() { alert().accept(); }
    /** Dismisses the active alert. */
    public void dismissAlert() { alert().dismiss(); }
    /** Gets active alert text. */
    public String getAlertText() { return alert().getText(); }
    /** Types into active alert. */
    public void typeInAlert(String text) { alert().sendKeys(text); }
    /** Takes a full-page screenshot and returns the path. */
    public Path takeScreenshot(String fileName) { return copyScreenshot(((TakesScreenshot) driver).getScreenshotAs(OutputType.FILE), fileName); }
    /** Takes an element screenshot and returns the path. */
    public Path takeElementScreenshot(By locator, String fileName) { return copyScreenshot(waitForElement(locator).getScreenshotAs(OutputType.FILE), fileName); }
    /** Generates a random alphanumeric string. */
    public String generateAlphaNumeric(int length) { String chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"; Random random = new Random(); StringBuilder builder = new StringBuilder(); for (int i = 0; i < length; i++) builder.append(chars.charAt(random.nextInt(chars.length()))); return builder.toString(); }
    /** Hovers over an element. */
    public void hover(By locator) { actionBuilder.moveToElement(waitForElementVisible(locator, ConfigReader.getInt("EXPLICIT_WAIT", 20))).perform(); }
    /** Drags source element and drops on target element. */
    public void dragAndDrop(By source, By target) { actionBuilder.dragAndDrop(waitForElement(source), waitForElement(target)).perform(); }

    private Alert alert() {
        try {
            return driver.switchTo().alert();
        } catch (NoAlertPresentException exception) {
            throw new NoSuchElementException("No browser alert is present");
        }
    }

    private Path copyScreenshot(File source, String fileName) {
        try {
            Files.createDirectories(Path.of("screenshots"));
            Path target = Path.of("screenshots", fileName.endsWith(".png") ? fileName : fileName + ".png");
            Files.copy(source.toPath(), target, java.nio.file.StandardCopyOption.REPLACE_EXISTING);
            return target;
        } catch (IOException exception) {
            throw new IllegalStateException("Unable to save screenshot: " + fileName, exception);
        }
    }
}
