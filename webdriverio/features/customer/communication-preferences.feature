@Regression
Feature: Customer Communication Preferences
  As a user
  I want to manage customer communication preferences
  So that customers receive notifications according to their preferences

  @TC-3430
  Scenario: Verify that user can update communication preferences for a customer
    Given I navigate to the application home page
    When I login with valid credentials
    And I navigate to customer profile list and select an existing customer
    And I navigate to communication preferences section
    And I update email notifications, SMS notifications, and promotional communications
    And I save communication preferences
    Then I should see success message for preference update
    And the updated preferences should be reflected in customer profile