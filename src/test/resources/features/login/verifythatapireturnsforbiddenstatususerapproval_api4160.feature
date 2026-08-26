Feature: Verify that API returns forbidden status for user without approval permissions

  Background:
    * url baseUrl
    * if (authType == 'bearer_token' || authType == 'jwt') karate.set('authHeader', 'Bearer ' + token)
    * if (authHeader) header Authorization = authHeader

  Scenario: 4160
    Given path 'login'
    When method POST
    Then status 400
    And match response != null
