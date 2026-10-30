"use client";

import { useState, type FormEvent } from "react";
import { contactSchema, fieldErrors } from "@/lib/validation";
import { gmailComposeUrl } from "@/content/site";

type Status = "idle" | "sending" | "success" | "error";

const fields = [
  { name: "name", label: "Name", type: "text", autoComplete: "name" },
  { name: "email", label: "Email", type: "email", autoComplete: "email" },
  { name: "subject", label: "Subject", type: "text", autoComplete: "off" },
] as const;

export default function ContactForm({ fallbackEmail }: { fallbackEmail?: string }) {
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [message, setMessage] = useState("");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form)) as Record<string, string>;
    const parsed = contactSchema.safeParse(data);
    if (!parsed.success) {
      setErrors(fieldErrors(parsed.error));
      setStatus("idle");
      setMessage("");
      return;
    }
    setErrors({});
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data),
      });
      const body = (await res.json().catch(() => ({}))) as { error?: string; errors?: Record<string, string> };
      if (res.ok) {
        setStatus("success");
        form.reset();
        return;
      }
      if (body.errors) setErrors(body.errors);
      setMessage(body.error ?? "The message could not be sent.");
      setStatus("error");
    } catch {
      setMessage("Network error. Check your connection and try again.");
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div role="status" className="border border-accent/50 p-6">
        <p className="font-display text-xl">Message sent</p>
        <p className="mt-2 text-muted">Thanks for reaching out. I&apos;ll reply by email.</p>
        <button type="button" className="btn btn-ghost mt-4" onClick={() => setStatus("idle")}>
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="grid gap-5" aria-describedby="form-status">
      {fields.map((f) => (
        <div key={f.name}>
          <label htmlFor={f.name} className="mb-1.5 block font-semibold">
            {f.label}
          </label>
          <input
            id={f.name}
            name={f.name}
            type={f.type}
            autoComplete={f.autoComplete}
            className="field"
            aria-invalid={errors[f.name] ? true : undefined}
            aria-describedby={errors[f.name] ? `${f.name}-error` : undefined}
          />
          {errors[f.name] && (
            <p id={`${f.name}-error`} className="mt-1.5 text-sm text-danger">
              {errors[f.name]}
            </p>
          )}
        </div>
      ))}
      <div>
        <label htmlFor="message" className="mb-1.5 block font-semibold">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={6}
          className="field"
          aria-invalid={errors.message ? true : undefined}
          aria-describedby={errors.message ? "message-error" : undefined}
        />
        {errors.message && (
          <p id="message-error" className="mt-1.5 text-sm text-danger">
            {errors.message}
          </p>
        )}
      </div>
      {/* Honeypot: hidden from people and assistive tech */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label htmlFor="website">Website</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>
      <div id="form-status" role="alert" aria-live="assertive">
        {status === "error" && (
          <p className="text-danger">
            {message}
            {fallbackEmail ? (
              <>
                {" "}
                You can also email{" "}
                <a
                  className="underline"
                  href={gmailComposeUrl(fallbackEmail)}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  {fallbackEmail}
                </a>
                .
              </>
            ) : null}
          </p>
        )}
      </div>
      <div>
        <button type="submit" className="btn btn-primary" disabled={status === "sending"}>
          {status === "sending" ? "Sending..." : "Send message"}
        </button>
      </div>
      <p className="text-sm text-muted">
        Your details are used only to reply to you. See the <a className="underline" href="/privacy">privacy notice</a>.
      </p>
    </form>
  );
}
