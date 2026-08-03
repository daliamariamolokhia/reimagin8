# Email setup (Resend) — required for confirmation emails

Workshop commitment emails use [Resend](https://resend.com). Without it, pairing still works but **no emails are sent**.

## Step 1 — Create a Resend account

1. Go to **[resend.com](https://resend.com)** → sign up (free tier is fine)
2. **API Keys** → **Create API Key** → copy the key (`re_...`)

## Step 2 — Add to Netlify

**Site configuration** → **Environment variables**:

| Key | Value |
|-----|--------|
| `RESEND_API_KEY` | `re_...` your API key |
| `COMMITMENT_FROM_EMAIL` | See Step 3 below |

**Trigger deploy** after adding.

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
