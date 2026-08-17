package utils;

import com.opencsv.CSVReaderHeaderAware;
import com.opencsv.exceptions.CsvValidationException;

import java.io.FileReader;
import java.io.IOException;
import java.nio.file.Path;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

public final class CSVReader {
    private CSVReader() {
    }

    public static List<Map<String, String>> read(String filePath) {
        List<Map<String, String>> rows = new ArrayList<>();
        try (CSVReaderHeaderAware reader = new CSVReaderHeaderAware(new FileReader(Path.of(filePath).toFile()))) {
            Map<String, String> row;
            while ((row = reader.readMap()) != null) {
                rows.add(row);
            }
            return rows;
        } catch (IOException | CsvValidationException exception) {
            throw new IllegalStateException("Unable to read CSV file: " + filePath, exception);
        }
    }

    public static Map<String, String> getByRole(String roleName) {
        return read("test-data/credentials.csv").stream()
                .filter(row -> roleName.equalsIgnoreCase(row.getOrDefault("RoleName", "")))
                .findFirst()
                .orElseThrow(() -> new IllegalArgumentException("No credentials found for role: " + roleName));
    }
}
