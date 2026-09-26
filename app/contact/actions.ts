"use server";

import { headers } from "next/headers";
import { Resend } from "resend";
import { z } from "zod";
import {
  contactSchema,
  type ContactField,
  type ContactState,
} from "@/lib/contact-schema";
import { acknowledgementEmail, enquiryEmail } from "@/lib/contact-email";
import { contact } from "@/lib/content";

const MIN_FILL_MS = 3000;
const RATE_LIMIT = { windowMs: 10 * 60 * 1000, max: 5 };

// Best-effort, per-instance limiter. Good enough to blunt casual abuse on
// serverless; use a shared store (e.g. Upstash) if spam becomes a problem.
const hits = new Map<string, number[]>();

function rateLimited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < RATE_LIMIT.windowMs);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > RATE_LIMIT.max;
}

const fields: ContactField[] = ["name", "company", "email", "phone", "service", "message"];

export async function sendContact(
  _prev: ContactState,
  formData: FormData,
): Promise<ContactState> {
  const values = Object.fromEntries(
    fields.map((f) => [f, String(formData.get(f) ?? "")]),
  ) as Record<ContactField, string>;

  // Bots fill the hidden field or submit instantly. Pretend it worked.
  const honeypot = String(formData.get("website") ?? "");
  const startedAt = Number(formData.get("startedAt") ?? 0);
  if (honeypot || !startedAt || Date.now() - startedAt < MIN_FILL_MS) {
    return { status: "success" };
  }

  const parsed = contactSchema.safeParse(values);
  if (!parsed.success) {
    const flat = z.flattenError(parsed.error).fieldErrors;
    const fieldErrors = Object.fromEntries(
      Object.entries(flat).map(([k, v]) => [k, v?.[0]]),
    ) as ContactState["fieldErrors"];
    return {
      status: "error",
      message: "Check the highlighted fields and try again.",
      fieldErrors,
      values,
    };
  }

  const ip = (await headers()).get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  if (rateLimited(ip)) {
    return {
      status: "error",
      message: `Too many messages from this connection. Try again in a few minutes, or email ${contact.email}.`,
      values,
    };
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL || contact.email;
  const from = process.env.CONTACT_FROM_EMAIL;
  if (!apiKey || !from) {
    console.error("[contact] RESEND_API_KEY or CONTACT_FROM_EMAIL is not set.");
    return {
      status: "error",
      message: `The form isn't connected yet. Email us directly at ${contact.email}.`,
      values,
    };
  }

  const resend = new Resend(apiKey);
  const data = parsed.data;
  const enquiry = enquiryEmail(data);

  const { error } = await resend.emails
    .send({
      from,
      to: [to],
      replyTo: data.email,
      subject: enquiry.subject,
      html: enquiry.html,
      text: enquiry.text,
    })
    .catch((err: unknown) => ({ error: err }));

  if (error) {
    console.error("[contact] Resend error:", error);
    return {
      status: "error",
      message: `Your message didn't send. Try again, or email ${contact.email}.`,
      values,
    };
  }

  // The acknowledgement is a courtesy; never fail the request because of it.
  const ack = acknowledgementEmail(data);
  await resend.emails
    .send({
      from,
      to: [data.email],
      replyTo: to,
      subject: ack.subject,
      html: ack.html,
      text: ack.text,
    })
    .catch((err) => console.error("[contact] Acknowledgement failed:", err));

  return {
    status: "success",
    message: `Message sent. We'll reply to ${data.email}.`,
  };
}
