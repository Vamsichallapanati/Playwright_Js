package tests;

import io.restassured.http.Headers;
import io.restassured.response.Response;
import restUtils.reporting.Setup;

public final class QentrixReport {
    private QentrixReport() {
    }

    public static void capture(Response response) {
        int statusCode = response.getStatusCode();
        String body = response.getBody().asString();
        Headers headers = response.headers();
        Setup.setStatusCode(statusCode);
        Setup.setBody(body);
        Setup.setHeaders(headers == null ? "" : headers.toString());
    }
}
