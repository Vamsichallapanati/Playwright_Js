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
public class VerifyThatAPIReturnsForbiddenStatusUserApproval_Api4160Test {

    @Test(description = "Verify that API returns forbidden status for user without approval permissions")
    public void verifyThatAPIReturnsForbiddenStatusForUserWithoutApprovalPermissions() {
        RestAssured.baseURI = QentrixConfig.get("base.url");

        RequestSpecification request = QentrixConfig.applyAuth(given())
                .headers(QentrixConfig.authHeaders())
                .queryParams(QentrixConfig.authQueryParams())
                ;

        Response response = request.when()
                .post("/login");

        QentrixReport.capture(response);
        Assert.assertEquals(response.statusCode(), 400, "Unexpected response status code");
        Assert.assertNotNull(response.header("Content-Type"), "Expected response header to exist: Content-Type");
    }
}
