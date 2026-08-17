# selenium-java-bdd Runbook

## Default
`mvn test`

## Suites
`mvn test -Psmoke`
`mvn test -Psanity`
`mvn test -Pregression`

## Allure
`mvn allure:report`

The framework owns driver creation, suite wiring, and reporting. Users should add page objects and tests only.
## Parallel and Sequential Execution
`mvn test -Dgroups=smoke -DthreadCount=4`
`mvn test -Dgroups=regression -DthreadCount=1`
Generated feature/page/step files should be added into this same framework; users should not need to create driver, listener, suite, or reporting files.
