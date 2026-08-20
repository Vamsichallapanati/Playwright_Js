package restUtils.reporting;

import org.testng.ITestContext;
import org.testng.ITestListener;
import org.testng.ITestResult;

public class Setup implements ITestListener {
    private static final ThreadLocal<Integer> STATUS_CODE = new ThreadLocal<>();
    private static final ThreadLocal<String> BODY = new ThreadLocal<>();
    private static final ThreadLocal<String> HEADERS = new ThreadLocal<>();

    public static void setStatusCode(int statusCode) {
        STATUS_CODE.set(statusCode);
    }

    public static void setBody(String body) {
        BODY.set(body);
    }

    public static void setHeaders(String headers) {
        HEADERS.set(headers);
    }

    @Override
    public void onTestSuccess(ITestResult result) {
        clear();
    }

    @Override
    public void onTestFailure(ITestResult result) {
        clear();
    }

    @Override
    public void onFinish(ITestContext context) {
        clear();
    }

    private static void clear() {
        STATUS_CODE.remove();
        BODY.remove();
        HEADERS.remove();
    }
}
