package karate;

import com.intuit.karate.junit5.Karate;

class ApiTestRunner {
    @Karate.Test
    Karate runGeneratedApiTests() {
        return Karate.run("classpath:features").relativeTo(getClass());
    }
}
