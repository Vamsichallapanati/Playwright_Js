package tests;

import io.restassured.specification.RequestSpecification;

import java.io.IOException;
import java.io.InputStream;
import java.util.HashMap;
import java.util.Map;
import java.util.Properties;

public final class QentrixConfig {
    private static final Properties PROPERTIES = new Properties();

    static {
        try (InputStream input = QentrixConfig.class.getClassLoader().getResourceAsStream("config.properties")) {
            if (input != null) {
                PROPERTIES.load(input);
            }
        } catch (IOException e) {
            throw new IllegalStateException("Unable to load config.properties", e);
        }
    }

    private QentrixConfig() {
    }

    public static String get(String key) {
        return PROPERTIES.getProperty(key, "");
    }

    public static Map<String, String> authHeaders() {
        Map<String, String> headers = new HashMap<>();
        String authType = normalize(get("auth.type"));
        String token = get("auth.token");
        if (authType.isBlank() || "none".equals(authType) || "basic_auth".equals(authType)) {
            return headers;
        }
        if ("bearer".equals(authType) || "bearer_token".equals(authType) || "jwt".equals(authType)) {
            headers.put("Authorization", "Bearer " + token);
        } else if ("api_key".equals(authType) && "header".equals(normalize(get("auth.api-key.location")))) {
            headers.put(get("auth.api-key.name"), get("auth.api-key.value"));
        }
        return headers;
    }

    public static Map<String, String> authQueryParams() {
        Map<String, String> queryParams = new HashMap<>();
        String authType = normalize(get("auth.type"));
        if ("api_key".equals(authType) && "query".equals(normalize(get("auth.api-key.location")))) {
            queryParams.put(get("auth.api-key.name"), get("auth.api-key.value"));
        }
        return queryParams;
    }

    public static RequestSpecification applyAuth(RequestSpecification request) {
        if ("basic_auth".equals(normalize(get("auth.type")))) {
            return request.auth().preemptive().basic(get("auth.username"), get("auth.password"));
        }
        return request;
    }

    private static String normalize(String value) {
        return value == null ? "" : value.trim().toLowerCase().replace('-', '_');
    }
}
