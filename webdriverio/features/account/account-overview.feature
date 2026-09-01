@Regression
Feature: Account Overview
  As a user
  I want to view my account overview
  So that I can see my linked financial accounts

  @TC-3989
  Scenario: Verify that account overview displays appropriate message when no accounts are available
    Given I login with user credentials for account with no linked accounts
    When I navigate to account overview section
    Then I should see no accounts available message