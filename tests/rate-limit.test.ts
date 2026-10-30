import { beforeEach, describe, expect, it } from "vitest";
import { rateLimit, resetRateLimit } from "@/lib/rate-limit";
import { readingTime } from "@/lib/posts";

beforeEach(() => resetRateLimit());

describe("rateLimit", () => {
  it("blocks after the limit and recovers after the window", () => {
    for (let i = 0; i < 3; i++) expect(rateLimit("ip", 3, 1000, 0).ok).toBe(true);
    expect(rateLimit("ip", 3, 1000, 10).ok).toBe(false);
    expect(rateLimit("ip", 3, 1000, 2000).ok).toBe(true);
  });
});

describe("readingTime", () => {
  it("is at least one minute", () => expect(readingTime("short")).toBe(1));
  it("scales with length", () => expect(readingTime("word ".repeat(660))).toBe(3));
});
