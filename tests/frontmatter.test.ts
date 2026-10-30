import { describe, expect, it } from "vitest";
import { parseFrontMatter } from "@/lib/frontmatter";

describe("parseFrontMatter", () => {
  it("parses strings, booleans, arrays and body", () => {
    const { data, content } = parseFrontMatter(
      '---\ntitle: "Hello: world"\ndate: "2026-01-31"\ntags: ["Spring Boot", \'MCP\']\ndraft: false\n---\nBody text',
    );
    expect(data).toEqual({ title: "Hello: world", date: "2026-01-31", tags: ["Spring Boot", "MCP"], draft: false });
    expect(content).toBe("Body text");
  });
  it("treats files without front matter as body only", () => {
    expect(parseFrontMatter("Just text")).toEqual({ data: {}, content: "Just text" });
  });
});
