import { defineConfig, devices } from "@playwright/test";
const PORT = process.env.E2E_PORT ?? "3100";

export default defineConfig({
  testDir: "e2e",
  webServer: { command: `npm run build && npm run start -- -p ${PORT}`, url: `http://localhost:${PORT}`, reuseExistingServer: true, timeout: 180_000 },
  use: { baseURL: `http://localhost:${PORT}` },
  projects: [
    {
      name: "desktop",
      use: {
        ...devices["Desktop Chrome"],
        // Optional: point at an existing Chromium (e.g. in CI sandboxes without `playwright install`).
        launchOptions: process.env.PW_CHROMIUM_PATH ? { executablePath: process.env.PW_CHROMIUM_PATH } : {},
      },
    },
  ],
});
