package runner;

import org.junit.platform.suite.api.ConfigurationParameter;
import org.junit.platform.suite.api.IncludeEngines;
import org.junit.platform.suite.api.SelectClasspathResource;
import org.junit.platform.suite.api.Suite;

import static io.cucumber.junit.platform.engine.Constants.FILTER_TAGS_PROPERTY_NAME;
import static io.cucumber.junit.platform.engine.Constants.GLUE_PROPERTY_NAME;
import static io.cucumber.junit.platform.engine.Constants.PLUGIN_PROPERTY_NAME;
import static io.cucumber.junit.platform.engine.Constants.PARALLEL_CONFIG_STRATEGY_PROPERTY_NAME;
import static io.cucumber.junit.platform.engine.Constants.PARALLEL_EXECUTION_ENABLED_PROPERTY_NAME;

@Suite
@IncludeEngines("cucumber")
@SelectClasspathResource("features")
@ConfigurationParameter(key = GLUE_PROPERTY_NAME, value = "stepDefinitions,hooks")
@ConfigurationParameter(key = FILTER_TAGS_PROPERTY_NAME, value = "@smoke and not @template")
@ConfigurationParameter(key = PLUGIN_PROPERTY_NAME, value = "pretty,io.qameta.allure.cucumber7jvm.AllureCucumber7Jvm,com.aventstack.extentreports.cucumber.adapter.ExtentCucumberAdapter:,html:target/cucumber-reports/index.html,json:target/cucumber-reports/report.json,junit:target/cucumber-reports/results.xml")
@ConfigurationParameter(key = PARALLEL_EXECUTION_ENABLED_PROPERTY_NAME, value = "true")
@ConfigurationParameter(key = PARALLEL_CONFIG_STRATEGY_PROPERTY_NAME, value = "dynamic")
public class SmokeRunner {
}