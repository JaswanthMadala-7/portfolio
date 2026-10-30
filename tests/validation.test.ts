import { describe, expect, it } from "vitest";
import { contactSchema, fieldErrors, stripLineBreaks } from "@/lib/validation";

const valid = { name: "Ada Lovelace", email: "ada@example.com", subject: "Hello", message: "A message long enough." };

describe("contactSchema", () => {
  it("accepts valid input", () => expect(contactSchema.safeParse(valid).success).toBe(true));
  it("rejects bad email, short message and empty name", () => {
    const r = contactSchema.safeParse({ ...valid, email: "nope", message: "short", name: "" });
    expect(r.success).toBe(false);
    if (!r.success) expect(Object.keys(fieldErrors(r.error)).sort()).toEqual(["email", "message", "name"]);
  });
  it("rejects a filled honeypot", () => expect(contactSchema.safeParse({ ...valid, website: "spam" }).success).toBe(false));
  it("rejects oversized messages", () =>
    expect(contactSchema.safeParse({ ...valid, message: "x".repeat(4001) }).success).toBe(false));
  it("strips line breaks to prevent header injection", () => expect(stripLineBreaks("a\r\nBcc: x")).toBe("a Bcc: x"));
});
