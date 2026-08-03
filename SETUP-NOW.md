# Deploy reimagin8 — step-by-step (do these in order)

Calendly is parked. Focus: **Supabase → Netlify → test commitment flow**.

---

## Step 1 — Create Supabase project (5 min)

1. Open **[supabase.com/dashboard](https://supabase.com/dashboard)** and sign in (or create account).
2. Click **New project**.
3. Choose:
   - **Name:** `reimagin8`
   - **Database password:** save this somewhere safe
   - **Region:** closest to you (e.g. West EU for UK)
4. Wait ~2 minutes for the project to finish provisioning.

---

## Step 2 — Run the database migration (2 min)

1. In Supabase, open your project → **SQL Editor** (left sidebar).
2. Click **New query**.
3. Copy the entire contents of this file and paste it:

   `reimagin8/supabase/migrations/20260803150000_workshop_commitments.sql`

4. Click **Run** (or Ctrl+Enter).
5. You should see **Success. No rows returned**.

To verify: **Table Editor** → you should see `workshop_commitments`.

---

## Step 3 — Copy Supabase credentials (1 min)

1. Supabase → **Project Settings** (gear) → **API**.
2. Copy and save these two values (you'll need them in Step 6):

   | Label | Where |
   |-------|--------|
   | **Project URL** | e.g. `https://abcdefgh.supabase.co` |
   | **service_role** key | under "Project API keys" — click Reveal |

   ⚠️ Use **service_role**, not anon. Never commit this key or put it in client-side code.

---

## Step 4 — Deploy to Netlify (10 min)

### Option A — Connect GitHub (recommended)

Your `reimagin8/` folder isn't pushed to GitHub yet. Either:

**Push first** (from repo root):
```powershell
git add reimagin8/
git commit -m "Add reimagin8 marketing site and workshop commitment flow"
git push origin main
```

Then in Netlify:

1. **[app.netlify.com](https://app.netlify.com)** → **Add new site** → **Import an existing project**.
2. Connect **GitHub** → select `creator-equation-hub`.
3. **Important — build settings:**

   | Setting | Value |
   |---------|--------|
   | Base directory | `reimagin8/site` |
   | Build command | `npm run build` |
   | Publish directory | `reimagin8/site/dist` |

4. Click **Deploy** (it will fail until Step 6 env vars are set — that's OK).

### Option B — Deploy from your machine (no git push)

```powershell
cd C:\Users\norse\Desktop\creator-equation-hub\reimagin8\site
npm install
npx netlify login
npx netlify init
npx netlify deploy --prod
```

Follow prompts: create new site, team, etc.

---

## Step 5 — Add environment variables in Netlify (3 min)

Netlify → your site → **Site configuration** → **Environment variables** → **Add a variable** → **Add single variable** (or import).

Add these:

| Variable | Value | Notes |
|----------|--------|--------|
| `SUPABASE_URL` | From Step 3 | |
| `SUPABASE_SERVICE_ROLE_KEY` | From Step 3 | service_role key |
| `PUBLIC_SITE_URL` | Your Netlify URL | e.g. `https://something.netlify.app` — update after first deploy |
| `PUBLIC_DEFAULT_WORKSHOP_SESSION` | `growth-gap-2026-08-04` | |
| `CRON_SECRET` | Long random string | e.g. generate at [random.org/strings](https://www.random.org/strings/) |
| `RESEND_API_KEY` | *(optional tonight)* | Needed for emails — see Step 7 |
| `COMMITMENT_FROM_EMAIL` | *(optional tonight)* | e.g. `onboarding@resend.dev` for testing |

After adding variables: **Deploys** → **Trigger deploy** → **Deploy site**.

---

## Step 6 — Test the commitment flow (5 min)

1. Open `https://YOUR-SITE.netlify.app/commitment/qr` — QR should load.
2. Open `https://YOUR-SITE.netlify.app/commitment` on your phone (or two browser tabs).
3. Submit two test cards with different emails.
4. Both should show **"Cards traded"** with a partner's action.

**If it fails:** Netlify → **Functions** → `commitment-submit` → check logs.

**Supabase check:** Table Editor → `workshop_commitments` → two rows, `status = paired`.

---

## Step 7 — Email (before workshop — not blocking deploy test)

Pairing works without email. For nudges and day-7 messages you still need **Resend**:

1. [resend.com](https://resend.com) → sign up → API key.
2. Add `RESEND_API_KEY` and `COMMITMENT_FROM_EMAIL` in Netlify.
3. Redeploy.

For a quick test without your own domain, use Resend's test sender: `onboarding@resend.dev` (only delivers to your Resend account email).

---

## Step 8 — Workshop day

Display on screen: **`/commitment/qr`**

Participants scan → fill card → get paired → (emails if Resend is set).

---

## Quick reference

| Page | URL |
|------|-----|
| QR for projector | `/commitment/qr` |
| Participant form | `/commitment` |
| Day 7 check-in | `/commitment/check-in?token=...` (from email) |

---

## Stuck?

Tell me which step you're on and what you see (screenshot or error message). Common fixes:

- **Build fails on Netlify** → check Base directory is `reimagin8/site`
- **Function 500** → Supabase URL/key wrong, or migration not run
- **"Waiting for partner" forever** → need a second submission to pair
- **No emails** → Resend not configured yet (pairing still works)
