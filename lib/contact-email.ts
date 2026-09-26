import "server-only";
import { company, contact } from "@/lib/content";
import { serviceLabel, type ContactInput } from "@/lib/contact-schema";

const escapeHtml = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

const shell = (title: string, body: string) => `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width"><title>${escapeHtml(title)}</title></head>
<body style="margin:0;background:#f4f6fa;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Inter,Arial,sans-serif;color:#0f1a2e">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f4f6fa;padding:32px 16px">
    <tr><td align="center">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background:#ffffff;border-radius:18px;overflow:hidden">
        <tr><td style="height:4px;background:linear-gradient(90deg,#a7d046,#00a558,#1d6b91,#2b519a,#243f7a)"></td></tr>
        <tr><td style="padding:28px 32px 8px">
          <p style="margin:0;font-size:13px;color:#647082">${escapeHtml(company.name)}</p>
          <h1 style="margin:6px 0 0;font-size:22px;line-height:1.25;color:#0f1a2e">${escapeHtml(title)}</h1>
        </td></tr>
        <tr><td style="padding:16px 32px 32px;font-size:15px;line-height:1.55">${body}</td></tr>
      </table>
      <p style="margin:16px 0 0;font-size:12px;color:#647082">${escapeHtml(company.legalName)} · ${escapeHtml(contact.offices[0].lines.join(", "))}</p>
    </td></tr>
  </table>
</body></html>`;

const row = (label: string, value: string) =>
  `<tr><td style="padding:8px 0;border-bottom:1px solid #e3e8ef;width:120px;color:#647082;font-size:13px;vertical-align:top">${escapeHtml(label)}</td><td style="padding:8px 0;border-bottom:1px solid #e3e8ef;font-size:15px">${value}</td></tr>`;

/** The enquiry delivered to info@trans-orbit.lk. */
export function enquiryEmail(data: ContactInput) {
  const subject = `New enquiry from ${data.name}${data.company ? ` (${data.company})` : ""}`;
  const html = shell(
    "New website enquiry",
    `<table role="presentation" width="100%" cellpadding="0" cellspacing="0">
      ${row("Name", escapeHtml(data.name))}
      ${row("Company", escapeHtml(data.company || "—"))}
      ${row("Email", `<a href="mailto:${escapeHtml(data.email)}" style="color:#2b519a">${escapeHtml(data.email)}</a>`)}
      ${row("Phone", escapeHtml(data.phone || "—"))}
      ${row("Service", escapeHtml(serviceLabel(data.service)))}
    </table>
    <p style="margin:20px 0 6px;color:#647082;font-size:13px">Message</p>
    <p style="margin:0;white-space:pre-wrap">${escapeHtml(data.message)}</p>
    <p style="margin:24px 0 0;font-size:13px;color:#647082">Reply to this email to answer ${escapeHtml(data.name)} directly.</p>`,
  );
  const text = [
    "New website enquiry",
    "",
    `Name: ${data.name}`,
    `Company: ${data.company || "—"}`,
    `Email: ${data.email}`,
    `Phone: ${data.phone || "—"}`,
    `Service: ${serviceLabel(data.service)}`,
    "",
    "Message:",
    data.message,
  ].join("\n");
  return { subject, html, text };
}

/** The acknowledgement sent back to the visitor. */
export function acknowledgementEmail(data: ContactInput) {
  const firstName = data.name.split(/\s+/)[0];
  const subject = "We've received your message";
  const html = shell(
    `Thanks, ${firstName}. We've got your message.`,
    `<p style="margin:0 0 14px">Our team at ${escapeHtml(company.name)} will review your enquiry and reply to this address.</p>
     <p style="margin:0 0 14px">If your shipment is urgent, call us on <a href="${contact.phoneHref}" style="color:#2b519a">${escapeHtml(contact.phone)}</a>.</p>
     <p style="margin:20px 0 6px;color:#647082;font-size:13px">Your message</p>
     <p style="margin:0;white-space:pre-wrap;color:#4f5a6d">${escapeHtml(data.message)}</p>`,
  );
  const text = `Thanks, ${firstName}. We've got your message.\n\nOur team at ${company.name} will review your enquiry and reply to this address. If your shipment is urgent, call us on ${contact.phone}.\n\nYour message:\n${data.message}`;
  return { subject, html, text };
}
