package tests;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

import java.io.IOException;
import java.io.InputStream;
import java.nio.charset.StandardCharsets;

public final class QentrixTestData {
    private static final ObjectMapper OBJECT_MAPPER = new ObjectMapper();

    private QentrixTestData() {
    }

    public static String requestBody(String fileName) {
        try {
            JsonNode root = OBJECT_MAPPER.readTree(read("testdata/" + fileName));
            JsonNode body = root.path("apiDetails").path("requestBody");
            return body.isMissingNode() || body.isNull() ? "" : OBJECT_MAPPER.writeValueAsString(body);
        } catch (IOException e) {
            throw new IllegalStateException("Unable to load request body from " + fileName, e);
        }
    }

    private static String read(String classpathLocation) throws IOException {
        try (InputStream input = QentrixTestData.class.getClassLoader().getResourceAsStream(classpathLocation)) {
            if (input == null) {
                throw new IOException("Classpath resource not found: " + classpathLocation);
            }
            return new String(input.readAllBytes(), StandardCharsets.UTF_8);
        }
    }
}
