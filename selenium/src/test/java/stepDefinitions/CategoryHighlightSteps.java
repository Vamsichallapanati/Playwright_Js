package stepDefinitions;

import io.cucumber.java.en.Given;
import io.cucumber.java.en.When;
import io.cucumber.java.en.Then;
import org.openqa.selenium.WebDriver;
import pages.CategoryHighlightPage;
import utils.DriverFactory;

public class CategoryHighlightSteps {

    private final WebDriver driver;
    private final CategoryHighlightPage categoryHighlightPage;

    public CategoryHighlightSteps() {
        this.driver = DriverFactory.getDriver();
        this.categoryHighlightPage = new CategoryHighlightPage(driver);
    }

    @Given("I navigate to the application homepage")
    public void iNavigateToTheApplicationHomepage() {
        categoryHighlightPage.navigateToHomepage();
    }

    @Then("the homepage should load successfully")
    public void theHomepageShouldLoadSuccessfully() {
        categoryHighlightPage.verifyHomepageLoaded();
    }

    @When("I click on the Phones category")
    public void iClickOnThePhonesCategory() {
        categoryHighlightPage.clickPhonesCategory();
    }

    @Then("the Phones category should be highlighted")
    public void thePhonesCategoryShouldBeHighlighted() {
        categoryHighlightPage.verifyPhonesCategoryHighlighted();
    }

    @When("I scroll down the page without selecting another category")
    public void iScrollDownThePageWithoutSelectingAnotherCategory() {
        categoryHighlightPage.scrollDownPage();
    }

    @Then("the Phones category should remain highlighted")
    public void thePhonesCategoryShouldRemainHighlighted() {
        categoryHighlightPage.verifyPhonesCategoryRemainsHighlighted();
    }

    @When("I click on the Laptops category")
    public void iClickOnTheLaptopsCategory() {
        categoryHighlightPage.clickLaptopsCategory();
    }

    @Then("the Laptops category should become highlighted and Phones category should lose highlighting")
    public void theLaptopsCategoryShouldBecomeHighlightedAndPhonesCategoryShouldLoseHighlighting() {
        categoryHighlightPage.verifyLaptopsCategoryHighlightedAndPhonesNotHighlighted();
    }
}