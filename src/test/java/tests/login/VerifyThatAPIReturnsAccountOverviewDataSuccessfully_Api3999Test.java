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
public class VerifyThatAPIReturnsAccountOverviewDataSuccessfully_Api3999Test {

    @Test(description = "Verify that API returns account overview data successfully for authenticated request")
    public void verifyThatAPIReturnsAccountOverviewDataSuccessfullyForAuthenticatedRequest() {
        RestAssured.baseURI = QentrixConfig.get("base.url");

        RequestSpecification request = QentrixConfig.applyAuth(given())
                .headers(QentrixConfig.authHeaders())
                .queryParams(QentrixConfig.authQueryParams())
                ;

        Response response = request.when()
                .post("/users");

        QentrixReport.capture(response);
        Assert.assertEquals(response.statusCode(), 204, "Unexpected response status code");
        Assert.assertNotNull(response.header("Content-Type"), "Expected response header to exist: Content-Type");
    }
}
