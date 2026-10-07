import type { Handler } from "@netlify/functions";
import { contactInterestValues } from "../../src/data/site";
import { isEmailConfigured, sendContactEnquiryEmails } from "./_shared/email";

type ContactBody = {
  name: string;
  email: string;
  company?: string;
  interest: string;
  interestLabel?: string;
  message: string;
  botField?: string;
};

function json(statusCode: number, body: unknown) {
  return {
    statusCode,
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "no-store",
    },
    body: JSON.stringify(body),
  };
}

function validate(body: ContactBody): string | null {
  if (!body.name?.trim()) return "Name is required";
  if (!body.email?.trim() || !body.email.includes("@")) return "Valid email is required";
  if (!body.message?.trim()) return "Message is required";
  const interest = body.interest?.trim() || "discovery";
  if (!contactInterestValues.has(interest)) return "Invalid interest selection";
  return null;
}

export const handler: Handler = async (event) => {
  if (event.httpMethod === "OPTIONS") {
    return { statusCode: 204, headers: { "Access-Control-Allow-Methods": "POST, OPTIONS" }, body: "" };
  }

  if (event.httpMethod !== "POST") {
    return json(405, { error: "Method not allowed" });
  }

  let body: ContactBody;
  try {
    body = JSON.parse(event.body ?? "{}") as ContactBody;
  } catch {
    return json(400, { error: "Invalid JSON" });
  }

  if (body.botField?.trim()) {
    return json(200, { ok: true, emailSent: false });
  }

  const validationError = validate(body);
  if (validationError) {
    return json(400, { error: validationError });
  }

  const interest = body.interest?.trim() || "discovery";
  const interestLabel = body.interestLabel?.trim() || interest;

  if (!isEmailConfigured()) {
    console.error("[contact-submit] RESEND_API_KEY not set");
    return json(503, {
      error: "Email is not configured yet. Please email hello@reimagin8.com directly.",
      emailConfigured: false,
    });
  }

  const results = await sendContactEnquiryEmails({
    name: body.name.trim(),
    email: body.email.trim(),
    company: body.company?.trim(),
    interest,
    interestLabel,
    message: body.message.trim(),
  });

  const emailSent = results.notify.ok && results.autoReply.ok;
  if (!emailSent) {
    const err = !results.notify.ok ? results.notify.error : results.autoReply.error;
    console.error("[contact-submit] Email failed:", err);
    return json(502, {
      error: "We could not send your enquiry. Please try hello@reimagin8.com directly.",
      emailConfigured: true,
      emailWarning: err,
    });
  }

  return json(200, { ok: true, emailSent: true, emailConfigured: true });
};
