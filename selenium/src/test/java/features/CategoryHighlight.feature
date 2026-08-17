@Regression
Feature: Category Highlight Verification
  As a user
  I want to verify category highlighting behavior
  So that I can ensure selected categories are properly indicated

  @TC-3614 @regression
  Scenario: Verify that selected category remains highlighted until another category is selected
    Given I navigate to the application homepage
    Then the homepage should load successfully
    When I click on the Phones category
    Then the Phones category should be highlighted
    When I scroll down the page without selecting another category
    Then the Phones category should remain highlighted
    When I click on the Laptops category
    Then the Laptops category should become highlighted and Phones category should lose highlighting