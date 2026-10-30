import { NextResponse } from "next/server";
import { contactSchema, fieldErrors, stripLineBreaks } from "@/lib/validation";
import { rateLimit } from "@/lib/rate-limit";
import { site } from "@/content/site";

export const runtime = "nodejs";
const MAX_BYTES = 12_000;

function json(body: object, status: number, headers?: Record<string, string>) {
  return NextResponse.json(body, { status, headers: { "Cache-Control": "no-store", ...headers } });
}

export async function POST(req: Request) {
  // Same-origin check
  const origin = req.headers.get("origin");
  const host = req.headers.get("host");
  if (origin && host && new URL(origin).host !== host) return json({ error: "Request not allowed." }, 403);

  if (!(req.headers.get("content-type") ?? "").includes("application/json"))
    return json({ error: "Unsupported request." }, 415);

  const forwarded = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  const ip = forwarded || req.headers.get("x-real-ip") || "unknown";
  const limit = rateLimit(`contact:${ip}`);
  if (!limit.ok)
    return json({ error: "Too many messages. Try again later." }, 429, { "Retry-After": String(limit.retryAfter) });

  const raw = await req.text();
  if (raw.length > MAX_BYTES) return json({ error: "Message is too large." }, 413);

  let payload: unknown;
  try {
    payload = JSON.parse(raw);
  } catch {
    return json({ error: "Invalid request." }, 400);
  }

  const parsed = contactSchema.safeParse(payload);
  if (!parsed.success) return json({ error: "Please fix the highlighted fields.", errors: fieldErrors(parsed.error) }, 422);

  // Honeypot: pretend success so bots learn nothing; nothing is sent.
  if (parsed.data.website) return json({ ok: true }, 200);

  const { RESEND_API_KEY, CONTACT_TO_EMAIL, CONTACT_FROM_EMAIL } = process.env;
  if (!RESEND_API_KEY || !CONTACT_TO_EMAIL || !CONTACT_FROM_EMAIL) {
    const alt = site.email ? ` Please email ${site.email} instead.` : "";
    return json({ error: `Message delivery is not available right now.${alt}` }, 503);
  }

  const { name, email, subject, message } = parsed.data;
  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${RESEND_API_KEY}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: CONTACT_FROM_EMAIL,
        to: [CONTACT_TO_EMAIL],
        reply_to: email,
        subject: `[Portfolio] ${stripLineBreaks(subject)}`,
        text: `From: ${stripLineBreaks(name)} <${email}>\n\n${message}`,
      }),
      signal: AbortSignal.timeout(8000),
    });
    if (!res.ok) {
      console.error("contact: provider responded", res.status);
      return json({ error: "The message could not be sent. Please try again later." }, 502);
    }
    return json({ ok: true }, 200);
  } catch (err) {
    console.error("contact: delivery failed", err instanceof Error ? err.name : "unknown");
    return json({ error: "The message could not be sent. Please try again later." }, 502);
  }
}
