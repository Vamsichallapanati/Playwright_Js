package restUtils;

import io.restassured.response.Response;
import org.testng.Assert;

public final class AssertionUtils {
    private AssertionUtils() {
    }

    public static void assertStatusCode(Response response, int expectedStatusCode) {
        Assert.assertNotNull(response, "Response must not be null");
        Assert.assertEquals(response.statusCode(), expectedStatusCode, "Unexpected response status code");
    }
}
