@API
Feature: Login API
  As a system user
  I want to authenticate via API
  So that I can access protected resources

  @TC-2832 @smoke
  Scenario: Verify that login API returns success response with valid credentials
    Given I prepare API login request with valid credentials
    When I send POST request to login API endpoint
    Then the response status code should be 200 or 302
    And the response should contain authentication token or session identifier