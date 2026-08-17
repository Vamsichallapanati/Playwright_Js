package utils;

import io.github.cdimascio.dotenv.Dotenv;

import java.io.FileInputStream;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.Properties;

public final class ConfigReader {
    private static final Properties PROPERTIES = new Properties();
    private static final Dotenv DOTENV = Dotenv.configure().ignoreIfMissing().load();

    static {
        Path configPath = Path.of("config", "config.properties");
        if (Files.exists(configPath)) {
            try (FileInputStream input = new FileInputStream(configPath.toFile())) {
                PROPERTIES.load(input);
            } catch (IOException exception) {
                throw new IllegalStateException("Unable to load config/config.properties", exception);
            }
        }
    }

    private ConfigReader() {
    }

    public static String get(String key) {
        return get(key, "");
    }

    public static String get(String key, String defaultValue) {
        String systemValue = System.getProperty(key);
        if (isPresent(systemValue)) {
            return systemValue;
        }
        String dotenvValue = DOTENV.get(key);
        if (isPresent(dotenvValue)) {
            return dotenvValue;
        }
        String propertyValue = PROPERTIES.getProperty(key);
        return isPresent(propertyValue) ? propertyValue : defaultValue;
    }

    public static int getInt(String key, int defaultValue) {
        String value = get(key, String.valueOf(defaultValue));
        return Integer.parseInt(value);
    }

    public static boolean getBoolean(String key, boolean defaultValue) {
        String value = get(key, String.valueOf(defaultValue));
        return Boolean.parseBoolean(value);
    }

    private static boolean isPresent(String value) {
        return value != null && !value.isBlank();
    }
}
