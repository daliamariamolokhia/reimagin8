# reimagin8 — deployment guide

## Recommendation: Netlify + Supabase + Resend

**Netlify** handles everything you need in one place:

| Need | Solution |
|------|----------|
| Host the Astro site | Netlify (free tier is fine to start) |
| Contact form | **Netlify Forms** — built-in, no backend code |
| Discovery call booking | **Calendly embed** on Contact page |
| Commitment exercise | **Netlify Functions** + **Supabase** + **Resend** |

Netlify Forms alone can't do pairing or scheduled emails, which is why the commitment exercise uses Supabase (database) and Resend (transactional email). Both have generous free tiers.

---

## Tonight's checklist (workshop tomorrow)

### 1. Supabase (~10 min)

1. Create a free project at [supabase.com](https://supabase.com)
2. Run the migration: `reimagin8/supabase/migrations/20260803150000_workshop_commitments.sql`
   - Supabase Dashboard → SQL Editor → paste and run
3. Copy **Project URL** and **service_role** key (Settings → API)

### 2. Resend (~5 min)

1. Sign up at [resend.com](https://resend.com)
2. Add and verify your sending domain (or use `onboarding@resend.dev` for testing)
3. Create an API key

### 3. Calendly (~2 min)

1. Create a "Discovery call" event type (30 min)
2. Copy the scheduling URL

### 4. Netlify (~15 min)

1. Push `reimagin8/site` to GitHub (or deploy folder directly)
2. Netlify → Add new site → Import from Git
3. Build settings (auto-detected from `netlify.toml`):
   - Build command: `npm run build`
   - Publish directory: `dist`
4. Set environment variables:

```
PUBLIC_SITE_URL=https://your-site.netlify.app
PUBLIC_CALENDLY_URL=https://calendly.com/your-username/discovery-call
PUBLIC_DEFAULT_WORKSHOP_SESSION=growth-gap-2026-08-04
SUPABASE_URL=https://xxx.supabase.co
SUPABASE_SERVICE_ROLE_KEY=eyJ...
RESEND_API_KEY=re_...
COMMITMENT_FROM_EMAIL=workshop@yourdomain.com
CRON_SECRET=any-long-random-string
```

5. Deploy

### 5. Enable Netlify Forms

After first deploy, go to **Site configuration → Forms** — the contact form should appear automatically.

### 6. Workshop QR code

Open **`/commitment/qr`** on your deployed site and display it on screen during Part Five.

Direct link for participants: **`/commitment?session=growth-gap-2026-08-04`**

---

## How the commitment exercise works

1. Participant scans QR → fills virtual commitment card (matches your deck worksheet)
2. System pairs them with the next person who submits (card swap)
3. Both receive welcome email with partner's commitment
4. **Day ~2–3 & ~5**: automated nudge emails (via daily cron at 08:00 UTC)
5. **Day 7**: email invites both to connect + link to `/commitment/check-in`

---

## Local development

```bash
cd reimagin8/site
cp .env.example .env
npm install
npm run dev          # static pages only
netlify dev          # includes functions (install Netlify CLI globally)
```

---

## Cron manual trigger (testing)

```bash
curl -H "x-cron-secret: YOUR_CRON_SECRET" https://your-site.netlify.app/.netlify/functions/commitment-cron
```
