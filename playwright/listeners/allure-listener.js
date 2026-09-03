export function attachFailureArtifacts(testInfo, page) {
  if (!testInfo || testInfo.status === testInfo.expectedStatus || !page) return;
  return testInfo.attach("failure-screenshot", {
    body: page.screenshot(),
    contentType: "image/png",
  });
}
