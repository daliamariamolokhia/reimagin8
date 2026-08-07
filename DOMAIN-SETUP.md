# Custom domain — www.reimagin8.com

Connect your domain to the Netlify site (`reimagin8.netlify.app`). Allow **15 minutes to 48 hours** for DNS to propagate (usually under an hour).

---

## Before you start

You need:

- Access to **Netlify** (site: reimagin8)
- Access to your **domain registrar** (Namecheap, GoDaddy, etc.) where you bought `reimagin8.com`
- ~10 minutes in each dashboard

---

## Step 1 — Add the domain in Netlify

1. Open [Netlify](https://app.netlify.com) → your **reimagin8** site
2. **Site configuration** → **Domain management** → **Add a domain**
3. Enter **`reimagin8.com`** (without `www`) → **Verify** → **Add domain**
4. Netlify will ask to add **`www.reimagin8.com`** as well — **yes, add it**

You should now see both:

- `reimagin8.com`
- `www.reimagin8.com`

Both may show **“Pending DNS verification”** until Step 2 is done.

---

## Step 2 — DNS at Namecheap (detailed)

Open: [Namecheap Domain List](https://ap.www.namecheap.com/domains/list) → **Manage** next to `reimagin8.com` → **Advanced DNS** tab.

### 2a — Remove conflicts first

In **Host Records**, delete anything that would clash:

- **Parking page** CNAME or URL Redirect on `@` or `www`
- Old **A Record** on `@` pointing to Namecheap parking IP
- Duplicate `www` CNAME

**Do not delete** Resend email records if you already added them (TXT for SPF/DKIM, MX for `send` subdomain). Those live alongside the website records.

### 2b — Add website records

Click **Add New Record** for each row:

| Type | Host | Value | TTL |
|------|------|--------|-----|
| **ALIAS Record** | `@` | `apex-loadbalancer.netlify.com` | Automatic |
| **CNAME Record** | `www` | `reimagin8.netlify.app` | Automatic |

**ALIAS not in the dropdown?** Use an **A Record** on `@` instead:

| Type | Host | Value |
|------|------|--------|
| **A Record** | `@` | `75.2.60.5` |

*(Netlify’s load balancer IP — confirm in Netlify → Domain management → DNS if it ever changes.)*

Click the green **✓** to save each record.

### 2c — Mail settings (leave alone if Resend is set up)

**Mail Settings** (dropdown at top of Advanced DNS):

- If you use **Resend** for sending: keep **Custom MX** (or whatever you configured for `send.reimagin8.com`) — do **not** switch to “Namecheap Email” or you’ll break workshop emails.
- Receiving at `hello@reimagin8.com` is separate — use **Email Forwarding** (free) or **Private Email** later; it doesn’t block the website.

### 2d — Wait for propagation

Namecheap usually updates in **5–30 minutes**. Netlify’s domain panel will flip from **Pending** to verified when it sees the records.

Check propagation: [dnschecker.org](https://dnschecker.org) → search `www.reimagin8.com` → should show `reimagin8.netlify.app`.

---

### Alternative — Netlify nameservers (optional)

If Advanced DNS feels fiddly:

1. Netlify → **Domain management** → **Set up Netlify DNS**
2. Copy the 4 nameservers Netlify gives you
3. Namecheap → **Domain** tab → **Nameservers** → **Custom DNS** → paste all 4 → save
4. Add Resend DNS records inside **Netlify DNS** instead of Namecheap

Only do this if you’re happy managing all DNS in Netlify going forward.

---

## Step 2 (other registrars)

If you ever move the domain, see Netlify → **Domain management** → **External DNS** for the current required records.

---

## Step 3 — Set primary domain + HTTPS

Back in Netlify → **Domain management**:

1. Wait until status changes from **Pending** to **Netlify DNS** / **Verified** (refresh after 10–30 min)
2. Click **Options** on **`www.reimagin8.com`** → **Set as primary domain**
3. Netlify will auto-provision **HTTPS** (Let’s Encrypt). Wait for the certificate to show **Ready**

Non-www should redirect to www automatically once primary is set. The repo also includes a `301` redirect in `netlify.toml` as backup.

---

## Step 4 — Update Netlify environment variables

**Site configuration** → **Environment variables** → edit:

| Variable | New value |
|----------|-----------|
| `PUBLIC_SITE_URL` | `https://www.reimagin8.com` |

Leave other vars as they are (`SUPABASE_*`, `RESEND_*`, `CRON_SECRET`, etc.).

Then **Deploys** → **Trigger deploy** → **Deploy site** (so QR links and emails use the new URL).

---

## Step 5 — Email (Resend) on your domain

Workshop emails need a verified sending domain.

1. [Resend](https://resend.com) → **Domains** → **Add domain** → `reimagin8.com`
2. Add the DNS records Resend shows (SPF, DKIM — usually 2–3 TXT/CNAME rows at Namecheap)
3. Wait for **Verified** in Resend
4. In Netlify env vars, set:

```
COMMITMENT_FROM_EMAIL=workshop@reimagin8.com
```

5. Trigger another deploy

Until Resend is verified, test emails only work from `onboarding@resend.dev` to your Resend signup address.

### Optional — receive mail at hello@reimagin8.com

Resend is **send-only**. To **receive** at `hello@reimagin8.com`, add email forwarding at Namecheap (**Private Email** / **Email Forwarding**) or use Google Workspace / Microsoft 365. The site already links to `hello@reimagin8.com` in the contact page.

---

## Step 6 — Verify everything works

Checklist:

- [ ] https://www.reimagin8.com loads the site
- [ ] https://reimagin8.com redirects to www
- [ ] Padlock / HTTPS shows secure
- [ ] `/contact` form submits (Netlify Forms → check **Forms** tab after a test)
- [ ] `/commitment/qr` QR code URL shows `www.reimagin8.com` (not `netlify.app`)
- [ ] Submit a test commitment → confirmation email arrives (after Resend verified)

---

## Troubleshooting

| Problem | Fix |
|---------|-----|
| **“Pending DNS verification” for hours** | Double-check CNAME `www` and `@` records; remove old A records pointing elsewhere |
| **SSL certificate pending** | DNS must be correct first; can take up to 24h |
| **Site still shows old Netlify URL in QR** | Redeploy after changing `PUBLIC_SITE_URL` |
| **Emails not sending** | Resend domain not verified, or `RESEND_API_KEY` missing on deploy |
| **Contact form 404** | Form only works on deployed site; ensure domain is added to same Netlify site |

---

## Quick reference

| What | URL |
|------|-----|
| Live site (after setup) | https://www.reimagin8.com |
| Netlify dashboard | https://app.netlify.com |
| Namecheap DNS | https://ap.www.namecheap.com/domains/list |
| Resend domains | https://resend.com/domains |
