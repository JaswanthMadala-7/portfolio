import { expect, test } from "@playwright/test";

test("home to projects to detail", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("link", { name: "View Projects" }).click();
  await expect(page).toHaveURL(/\/projects$/);
  await page.getByRole("link", { name: "MCP-based Network Configuration Agent" }).first().click();
  await expect(page.getByRole("heading", { level: 1 })).toContainText("MCP-based");
});

test("project filtering", async ({ page }) => {
  await page.goto("/projects");
  await page.getByRole("button", { name: "Developer Tools" }).click();
  await expect(page.getByTestId("project-list").locator("article")).toHaveCount(1);
  await page.getByRole("button", { name: "All" }).click();
  await expect(page.getByTestId("project-list").locator("article")).toHaveCount(4);
});

test("invalid contact submission shows errors", async ({ page }) => {
  await page.goto("/contact");
  await page.getByRole("button", { name: "Send message" }).click();
  await expect(page.getByText("Enter your name.")).toBeVisible();
  await expect(page.getByText("Enter a valid email address.")).toBeVisible();
});

test("valid submission reports unavailable delivery when email is not configured", async ({ page }) => {
  await page.goto("/contact");
  await page.getByLabel("Name").fill("Ada Lovelace");
  await page.getByLabel("Email").fill("ada@example.com");
  await page.getByLabel("Subject").fill("Hello there");
  await page.getByLabel("Message").fill("This is a test message body.");
  await page.getByRole("button", { name: "Send message" }).click();
  await expect(page.locator("#form-status")).toContainText("not available");
});

test("mobile navigation opens and closes with keyboard", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 800 });
  await page.goto("/");
  const menu = page.getByRole("button", { name: "Menu" });
  await menu.click();
  await expect(page.getByRole("navigation", { name: "Mobile" })).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(page.getByRole("navigation", { name: "Mobile" })).toBeHidden();
});

test("unknown URL shows branded 404", async ({ page }) => {
  const res = await page.goto("/does-not-exist");
  expect(res?.status()).toBe(404);
  await expect(page.getByRole("link", { name: "Back to home" })).toBeVisible();
});

test("keyboard users can reach main navigation and skip link", async ({ page }) => {
  await page.goto("/");
  await page.keyboard.press("Tab");
  await expect(page.getByRole("link", { name: "Skip to content" })).toBeFocused();
});
