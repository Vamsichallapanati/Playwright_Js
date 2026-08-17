package pages;

import base.BasePage;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.assertj.core.api.Assertions;

import static pageObjects.CategoryHighlightPageObjects.*;

public class CategoryHighlightPage extends BasePage {

    public CategoryHighlightPage(WebDriver driver) {
        super(driver);
    }

    public void navigateToHomepage() {
        openApp();
        waitForPageLoad();
    }

    public void verifyHomepageLoaded() {
        assertVisible(HOME_PAGE_LOGO, "Homepage should load successfully");
    }

    public void clickPhonesCategory() {
        click(PHONES_CATEGORY);
        waitForPageLoad();
    }

    public void verifyPhonesCategoryHighlighted() {
        WebElement activeCategory = driver.findElement(ACTIVE_CATEGORY);
        String activeText = activeCategory.getText();
        Assertions.assertThat(activeText)
                .as("Phones category should be highlighted")
                .containsIgnoringCase("Phones");
    }

    public void scrollDownPage() {
        scrollToBottom();
    }

    public void verifyPhonesCategoryRemainsHighlighted() {
        WebElement activeCategory = driver.findElement(ACTIVE_CATEGORY);
        String activeText = activeCategory.getText();
        Assertions.assertThat(activeText)
                .as("Phones category should remain highlighted")
                .containsIgnoringCase("Phones");
    }

    public void clickLaptopsCategory() {
        click(LAPTOPS_CATEGORY);
        waitForPageLoad();
    }

    public void verifyLaptopsCategoryHighlightedAndPhonesNotHighlighted() {
        WebElement activeCategory = driver.findElement(ACTIVE_CATEGORY);
        String activeText = activeCategory.getText();
        Assertions.assertThat(activeText)
                .as("Laptops category should become highlighted")
                .containsIgnoringCase("Laptops");
        
        Assertions.assertThat(activeText)
                .as("Phones category should lose highlighting")
                .doesNotContainIgnoringCase("Phones");
    }
}