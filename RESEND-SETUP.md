# Email setup (Resend) — contact form + workshop emails

The site uses [Resend](https://resend.com) for:

- **Contact enquiries** — notification to you + auto-reply to the visitor
- **Workshop commitments** — pairing confirmations, nudges, day-7 check-in

Without `RESEND_API_KEY`, the contact form shows an error and workshop pairing still works but **no emails are sent**.

---

## Step 1 — Create a Resend account (expanded)

### 1.1 — Open Resend and sign up

1. Go to **[resend.com](https://resend.com)**
2. Click **Get Started** or **Sign up**
3. Sign up with:
   - **GitHub** (fastest if you already use GitHub), or
   - **Email + password**
4. Verify your email if Resend asks you to (check your inbox for a verification link)

### 1.2 — Confirm you're in the dashboard

After signing in you should land on the **Resend dashboard**. The left sidebar typically shows:

- Emails
- Broadcasts
- Audiences
- **API Keys**
- Domains
- Settings

If you see that menu, you're in the right place.

### 1.3 — Create an API key

This is the secret password that lets your Netlify site send emails through Resend.

1. Click **API Keys** in the left sidebar
2. Click **Create API Key** (top right)
3. Fill in:
   - **Name:** something you'll recognise, e.g. `reimagin8-netlify` or `workshop-emails`
   - **Permission:** choose **Sending access** (or **Full access** if that's the only option)
4. Click **Create** or **Add**
5. **Copy the key immediately** — it starts with `re_` and looks like:
   ```
   re_123abc456def789...
   ```
6. Paste it into Notepad or a password manager — **you won't be able to see the full key again** after you close the dialog

⚠️ Treat this like a password. Don't put it on GitHub or share it publicly.

### 1.4 — Note the email you signed up with

Write down the **email address you used for your Resend account**.

If you use Resend's test sender (`onboarding@resend.dev`) for now, emails will **only be delivered to this address** during testing. That's a Resend limitation for unverified domains — not a bug in your site.

### 1.5 — You're done with Step 1 when you have:

- [ ] A Resend account
- [ ] An API key copied (`re_...`)
- [ ] Your signup email noted for testing

**Next:** Step 2 below — add the key to Netlify.

---

**Site configuration** → **Environment variables**:

| Key | Value |
|-----|--------|
| `RESEND_API_KEY` | `re_...` your API key |
| `COMMITMENT_FROM_EMAIL` | See Step 3 below |
| `ENQUIRY_FROM_EMAIL` | e.g. `hello@reimagin8.com` (contact auto-replies; must be on verified domain) |
| `CONTACT_NOTIFY_EMAIL` | Where enquiries land, e.g. `hello@reimagin8.com` |

**Trigger deploy** after adding.

### Contact form test

1. Open [Contact](https://www.reimagin8.com/contact) and submit the enquiry form (not Calendly).
2. You should receive a notification at `CONTACT_NOTIFY_EMAIL` and the visitor gets an auto-reply.
3. If Resend is missing, the form asks them to email `hello@reimagin8.com` directly.
4. Netlify → **Functions** → `contact-submit` → **Logs** for errors.

## Step 3 — From address

### For testing tonight (quick)

Use Resend's test sender:

```
COMMITMENT_FROM_EMAIL=onboarding@resend.dev
```

**Important:** With the test sender, Resend only delivers to the **email address you signed up with** on Resend. Use that email when testing submissions.

### For the real workshop (recommended)

1. Resend → **Domains** → **Add domain** (e.g. `reimagin8.com`)
2. Add the DNS records Resend shows you
3. Once verified:

```
COMMITMENT_FROM_EMAIL=workshop@yourdomain.com
```

Then emails go to any participant address.

## What each participant receives

| When | Email |
|------|--------|
| Submits first (waiting) | "Commitment received — waiting for your partner" |
| Submits and pairs immediately | "Cards traded — partner confirmed" |
| Was waiting, then someone pairs them | "Cards traded — partner confirmed" |
| Day ~2–3 and ~5 | Nudge reminder |
| Day 7 | Connect and check-in link |

## Verify it's working

1. Submit a test commitment with **your Resend account email** (if using test sender)
2. On-screen message should say **"Confirmation email sent"**
3. Check inbox and spam
4. If it says **"Email is not configured"** → `RESEND_API_KEY` missing in Netlify
5. Netlify → **Functions** → `commitment-submit` → **Logs** for detailed errors
