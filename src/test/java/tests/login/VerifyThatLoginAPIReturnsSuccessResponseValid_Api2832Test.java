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
public class VerifyThatLoginAPIReturnsSuccessResponseValid_Api2832Test {

    @Test(description = "Verify that login API returns success response with valid credentials")
    public void verifyThatLoginAPIReturnsSuccessResponseWithValidCredentials() {
        RestAssured.baseURI = QentrixConfig.get("base.url");

        RequestSpecification request = QentrixConfig.applyAuth(given())
                .headers(QentrixConfig.authHeaders())
                .queryParams(QentrixConfig.authQueryParams())
                ;

        Response response = request.when()
                .post("/users/");

        QentrixReport.capture(response);
        Assert.assertEquals(response.statusCode(), 200, "Unexpected response status code");
        Assert.assertEquals(String.valueOf(response.jsonPath().get("id")), "", "Unexpected JSON value for id");
    }
}
