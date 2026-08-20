package restUtils;

import io.restassured.response.Response;

public final class RestUtils {
    private RestUtils() {
    }

    public static String responseBody(Response response) {
        return response == null ? "" : response.getBody().asString();
    }
}
