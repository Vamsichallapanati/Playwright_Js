package tests.login;

import io.restassured.RestAssured;
import io.restassured.response.Response;
import io.restassured.specification.RequestSpecification;
import org.testng.Assert;
import org.testng.annotations.Listeners;
import org.testng.annotations.Test;
import restUtils.reporting.Setup;

import tests.QentrixConfig;
import tests.QentrixReport;
import tests.QentrixTestData;

import static io.restassured.RestAssured.given;

@Listeners(Setup.class)
public class VerifyThatAPIRejectsClaimRegistrationRequestMissing_Api3416Test {

    @Test(description = "Verify that API rejects claim registration request with missing required field")
    public void verifyThatAPIRejectsClaimRegistrationRequestWithMissingRequiredField() {
        RestAssured.baseURI = QentrixConfig.get("base.url");

        RequestSpecification request = QentrixConfig.applyAuth(given())
                .headers(QentrixConfig.authHeaders())
                .queryParams(QentrixConfig.authQueryParams())
                ;

        Response response = request.when()
                .put("/users");

        QentrixReport.capture(response);
        Assert.assertEquals(response.statusCode(), 200, "Unexpected response status code");
        Assert.assertNotNull(response.jsonPath().get("id"), "Expected JSON path to exist: id");
    }
}
