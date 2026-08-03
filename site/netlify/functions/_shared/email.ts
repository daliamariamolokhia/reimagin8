import { Resend } from "resend";
import type { Commitment } from "./supabase";

function getResend() {
  const key = process.env.RESEND_API_KEY;
  if (!key) throw new Error("Missing RESEND_API_KEY");
  return new Resend(key);
}

function fromAddress() {
  return process.env.COMMITMENT_FROM_EMAIL ?? "onboarding@resend.dev";
}

function siteUrl() {
  return process.env.PUBLIC_SITE_URL ?? "https://reimagin8.netlify.app";
}

function firstName(name: string) {
  return name.trim().split(/\s+/)[0] ?? name;
}

export async function sendWelcomeEmail(holder: Commitment, partner: Commitment) {
  const resend = getResend();
  const checkInUrl = `${siteUrl()}/commitment/check-in?token=${holder.check_in_token}`;

  await resend.emails.send({
    from: `reimagin8 Workshop <${fromAddress()}>`,
    to: holder.email,
    subject: "Your accountability card is live — 7 days starts now",
    html: `
      <p>Hi ${firstName(holder.name)},</p>
      <p>You committed to an action. Now someone else in the room is counting on you — and you're counting on them.</p>
      <h3>Your commitment (next 7 days)</h3>
      <p><strong>${holder.action_text}</strong></p>
      <p><em>How they'll know: ${holder.accountability_note}</em></p>
      <hr />
      <h3>You're holding ${firstName(partner.name)} accountable</h3>
      <p><strong>Their action:</strong> ${partner.action_text}</p>
      <p><em>Blocker they named:</em> ${partner.blocker}</p>
      <p>We'll nudge you every few days to check in on ${firstName(partner.name)}'s commitment. In 7 days, you'll both be invited to connect and share progress.</p>
      <p><a href="${checkInUrl}">Day 7 check-in link</a> (save this — you'll need it on day 7)</p>
      <p>— reimagin8</p>
    `,
  });
}

export async function sendNudgeEmail(holder: Commitment, partner: Commitment) {
  const resend = getResend();
  await resend.emails.send({
    from: `reimagin8 Workshop <${fromAddress()}>`,
    to: holder.email,
    subject: `Quick nudge: how is ${firstName(partner.name)} doing on their commitment?`,
    html: `
      <p>Hi ${firstName(holder.name)},</p>
      <p>Three days in. You're ${firstName(partner.name)}'s accountability partner this week.</p>
      <p><strong>Their commitment:</strong> ${partner.action_text}</p>
      <p>Have you checked in? A quick message goes a long way — that's how a private intention becomes a social contract.</p>
      <p>Don't forget your own action too:</p>
      <p><strong>${holder.action_text}</strong></p>
      <p>— reimagin8</p>
    `,
  });
}

export async function sendDay7Email(holder: Commitment, partner: Commitment) {
  const resend = getResend();
  const checkInUrl = `${siteUrl()}/commitment/check-in?token=${holder.check_in_token}`;

  await resend.emails.send({
    from: `reimagin8 Workshop <${fromAddress()}>`,
    to: [holder.email, partner.email],
    subject: "Day 7 — time to connect on your commitments",
    html: `
      <p>Hi ${firstName(holder.name)} and ${firstName(partner.name)},</p>
      <p>Seven days ago you traded commitment cards. Today is the forcing function.</p>
      <p><strong>${firstName(holder.name)} committed to:</strong> ${holder.action_text}</p>
      <p><strong>${firstName(partner.name)} committed to:</strong> ${partner.action_text}</p>
      <p>Connect today — even 10 minutes. Ask each other: <em>Did you do it? What got in the way? What's next?</em></p>
      <p><a href="${checkInUrl}">Submit your day-7 update</a></p>
      <p>— reimagin8</p>
    `,
  });
}

export async function sendWaitingEmail(commitment: Commitment) {
  const resend = getResend();
  await resend.emails.send({
    from: `reimagin8 Workshop <${fromAddress()}>`,
    to: commitment.email,
    subject: "Your commitment card is saved — waiting for your partner",
    html: `
      <p>Hi ${firstName(commitment.name)},</p>
      <p>Your commitment is recorded. We're waiting for the next person to submit so we can pair you up.</p>
      <p><strong>Your action:</strong> ${commitment.action_text}</p>
      <p>You'll receive another email as soon as your accountability partner is assigned.</p>
      <p>— reimagin8</p>
    `,
  });
}

export async function sendPairedNotification(holder: Commitment, partner: Commitment) {
  await sendWelcomeEmail(holder, partner);
}
