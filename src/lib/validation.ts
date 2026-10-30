import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().trim().min(2, "Enter your name.").max(100, "Name is too long."),
  email: z.string().trim().email("Enter a valid email address.").max(200),
  subject: z.string().trim().min(3, "Enter a subject.").max(150, "Subject is too long."),
  message: z.string().trim().min(10, "Message must be at least 10 characters.").max(4000, "Message is too long."),
  website: z.string().max(0).optional(), // honeypot: must stay empty
});

export type ContactInput = z.infer<typeof contactSchema>;

export function fieldErrors(error: z.ZodError): Record<string, string> {
  const out: Record<string, string> = {};
  for (const issue of error.issues) {
    const key = String(issue.path[0] ?? "form");
    if (!out[key]) out[key] = issue.message;
  }
  return out;
}

export function stripLineBreaks(value: string): string {
  return value.replace(/[\r\n]+/g, " ");
}
