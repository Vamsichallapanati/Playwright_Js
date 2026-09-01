export function getBrowserName() {
  return process.env.BROWSER || "chromium";
}

export function isHeadless() {
  return String(process.env.HEADLESS || "true").toLowerCase() === "true";
}
