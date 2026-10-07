import { Resend } from "resend";
import type { Commitment } from "./supabase";

type SendResult = { ok: true; id?: string } | { ok: false; error: string };

export function isEmailConfigured(): boolean {
  return Boolean(process.env.RESEND_API_KEY?.trim());
}

function getResend() {
  const key = process.env.RESEND_API_KEY?.trim();
  if (!key) throw new Error("Missing RESEND_API_KEY");
  return new Resend(key);
}

function workshopFromAddress() {
  return process.env.COMMITMENT_FROM_EMAIL?.trim() || "onboarding@resend.dev";
}

function enquiryFromAddress() {
  return (
    process.env.ENQUIRY_FROM_EMAIL?.trim() ||
    process.env.CONTACT_FROM_EMAIL?.trim() ||
    process.env.COMMITMENT_FROM_EMAIL?.trim() ||
    "onboarding@resend.dev"
  );
}

function contactNotifyAddress() {
  return process.env.CONTACT_NOTIFY_EMAIL?.trim() || "hello@reimagin8.com";
}

function siteUrl() {
  return process.env.PUBLIC_SITE_URL?.trim() || "https://www.reimagin8.com";
}

function firstName(name: string) {
  return name.trim().split(/\s+/)[0] ?? name;
}

function escapeHtml(text: string) {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

async function sendEmail(
  to: string | string[],
  subject: string,
  html: string,
  options?: { fromLabel?: string; fromEmail?: string; replyTo?: string },
): Promise<SendResult> {
  if (!isEmailConfigured()) {
    const msg = "RESEND_API_KEY is not set in Netlify environment variables";
    console.error("[email]", msg);
    return { ok: false, error: msg };
  }

  const fromEmail = options?.fromEmail ?? workshopFromAddress();
  const fromLabel = options?.fromLabel ?? "reimagin8 Workshop";

  try {
    const resend = getResend();
    const { data, error } = await resend.emails.send({
      from: `${fromLabel} <${fromEmail}>`,
      to,
      subject,
      html,
      replyTo: options?.replyTo,
    });

    if (error) {
      console.error("[email] Resend error:", error);
      return { ok: false, error: error.message ?? JSON.stringify(error) };
    }

    console.log("[email] Sent to", to, "id:", data?.id);
    return { ok: true, id: data?.id };
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error("[email] Exception:", msg);
    return { ok: false, error: msg };
  }
}

/** Immediate confirmation: every person who submits gets this */
export async function sendSubmissionConfirmation(
  commitment: Commitment,
  state: "waiting" | "paired",
  partner?: Commitment,
): Promise<SendResult> {
  const name = escapeHtml(firstName(commitment.name));
  const action = escapeHtml(commitment.action_text);
  const note = escapeHtml(commitment.accountability_note);
  const checkInUrl = `${siteUrl()}/commitment/check-in?token=${commitment.check_in_token}`;

  if (state === "waiting") {
    return sendEmail(
      commitment.email,
      "Commitment received: waiting for your accountability partner",
      `
        <p>Hi ${name},</p>
        <p>Your commitment card from the Growth Gap workshop is saved.</p>
        <h3>Your action (next 7 days)</h3>
        <p><strong>${action}</strong></p>
        <p><em>How they'll know: ${note}</em></p>
        <p>You're in the queue. As soon as the next person submits, we'll pair you up and send another email with their card.</p>
        <p>Keep your commitment page open; it will update automatically when you're paired.</p>
        <p><a href="${checkInUrl}">Your day-7 check-in link</a> (save this for next week)</p>
        <p>reimagin8</p>
      `,
    );
  }

  if (!partner) {
    return { ok: false, error: "Partner required for paired confirmation" };
  }

  const partnerName = escapeHtml(firstName(partner.name));
  const partnerAction = escapeHtml(partner.action_text);
  const partnerBlocker = escapeHtml(partner.blocker);

  return sendEmail(
    commitment.email,
    "Cards traded: your accountability partner is confirmed",
    `
      <p>Hi ${name},</p>
      <p>Your commitment is live. You've been paired with someone in the room.</p>
      <h3>Your commitment (next 7 days)</h3>
      <p><strong>${action}</strong></p>
      <p><em>How they'll know: ${note}</em></p>
      <hr />
      <h3>You're holding ${partnerName} accountable</h3>
      <p><strong>Their action:</strong> ${partnerAction}</p>
      <p><em>Their blocker:</em> ${partnerBlocker}</p>
      <p>We'll nudge you every few days to check in. In 7 days, connect and share progress.</p>
      <p><a href="${checkInUrl}">Day-7 check-in link</a></p>
      <p>reimagin8</p>
    `,
  );
}

/** Sent to the person who was waiting when someone else submits and pairs them */
export async function sendPartnerPairedNotification(
  holder: Commitment,
  partner: Commitment,
): Promise<SendResult> {
  return sendSubmissionConfirmation(holder, "paired", partner);
}

export async function sendNudgeEmail(holder: Commitment, partner: Commitment): Promise<SendResult> {
  const name = escapeHtml(firstName(holder.name));
  const partnerName = escapeHtml(firstName(partner.name));
  const partnerAction = escapeHtml(partner.action_text);
  const holderAction = escapeHtml(holder.action_text);

  return sendEmail(
    holder.email,
    `Quick nudge: how is ${partnerName} doing on their commitment?`,
    `
      <p>Hi ${name},</p>
      <p>You're ${partnerName}'s accountability partner this week.</p>
      <p><strong>Their commitment:</strong> ${partnerAction}</p>
      <p>Have you checked in? A quick message goes a long way.</p>
      <p>Don't forget your own action: <strong>${holderAction}</strong></p>
      <p>reimagin8</p>
    `,
  );
}

export async function sendDay7Email(holder: Commitment, partner: Commitment): Promise<SendResult> {
  const checkInUrl = `${siteUrl()}/commitment/check-in?token=${holder.check_in_token}`;
  const name = escapeHtml(firstName(holder.name));
  const partnerName = escapeHtml(firstName(partner.name));

  return sendEmail(
    [holder.email, partner.email],
    "Day 7: time to connect on your commitments",
    `
      <p>Hi ${name} and ${partnerName},</p>
      <p>Seven days ago you traded commitment cards. Today is the forcing function.</p>
      <p><strong>${name} committed to:</strong> ${escapeHtml(holder.action_text)}</p>
      <p><strong>${partnerName} committed to:</strong> ${escapeHtml(partner.action_text)}</p>
      <p>Connect today. Ask each other: <em>Did you do it? What got in the way? What's next?</em></p>
      <p><a href="${checkInUrl}">Submit your day-7 update</a></p>
      <p>reimagin8</p>
    `,
  );
}

export async function sendPairingEmails(
  newPerson: Commitment,
  waitingPartner: Commitment,
): Promise<{ newPerson: SendResult; waitingPartner: SendResult }> {
  const [newPersonResult, waitingPartnerResult] = await Promise.all([
    sendSubmissionConfirmation(newPerson, "paired", waitingPartner),
    sendPartnerPairedNotification(waitingPartner, newPerson),
  ]);

  return { newPerson: newPersonResult, waitingPartner: waitingPartnerResult };
}

export type ContactEnquiryPayload = {
  name: string;
  email: string;
  company?: string;
  interest: string;
  interestLabel: string;
  message: string;
};

/** Notify team + auto-reply to visitor */
export async function sendContactEnquiryEmails(
  payload: ContactEnquiryPayload,
): Promise<{ notify: SendResult; autoReply: SendResult }> {
  const name = escapeHtml(payload.name.trim());
  const email = payload.email.trim().toLowerCase();
  const company = escapeHtml(payload.company?.trim() || "Not provided");
  const interest = escapeHtml(payload.interestLabel);
  const message = escapeHtml(payload.message.trim()).replace(/\n/g, "<br />");
  const fromEmail = enquiryFromAddress();

  const notify = await sendEmail(
    contactNotifyAddress(),
    `Enquiry: ${payload.interestLabel} — ${payload.name.trim()}`,
    `
      <p>New contact form submission on reimagin8.com</p>
      <p><strong>Name:</strong> ${name}<br />
      <strong>Email:</strong> ${escapeHtml(email)}<br />
      <strong>Company:</strong> ${company}<br />
      <strong>Interest:</strong> ${interest}</p>
      <p><strong>Message:</strong></p>
      <p>${message}</p>
    `,
    {
      fromLabel: "reimagin8 Website",
      fromEmail,
      replyTo: email,
    },
  );

  const first = escapeHtml(firstName(payload.name));
  const autoReply = await sendEmail(
    email,
    "We received your enquiry — reimagin8",
    `
      <p>Hi ${first},</p>
      <p>Thank you for getting in touch. We've received your message about <strong>${interest}</strong>.</p>
      <p>We aim to respond within two business days. If your matter is urgent, reply to this email or book a discovery call from our contact page.</p>
      <p>reimagin8<br />Reimagine · Reinvent · Realise</p>
    `,
    {
      fromLabel: "reimagin8",
      fromEmail,
    },
  );

  return { notify, autoReply };
}
