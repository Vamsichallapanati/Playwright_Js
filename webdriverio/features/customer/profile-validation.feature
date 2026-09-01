@Regression
Feature: Customer Profile Validation
  As a user
  I want the system to validate customer profile input
  So that only valid customer data is stored

  @TC-3443
  Scenario: Verify that customer profile rejects whitespace-only input for first name field
    Given I navigate to the application home page
    When I login with valid credentials
    And I navigate to customer profile creation page
    And I enter whitespace only in first name field with valid other fields
    And I submit the customer profile creation form
    Then I should see validation error for first name field
    And the customer profile should not be created