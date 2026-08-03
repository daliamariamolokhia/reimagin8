# reimagin8 — GitHub + Supabase setup

Instructions for pushing the site to GitHub and wiring up Supabase for the workshop commitment exercise.

---

## Part 1 — GitHub

### What gets committed

```
reimagin8/
├── site/                 ← Astro site + Netlify functions
├── supabase/
│   └── migrations/       ← Database schema (commit this)
├── README.md
├── DEPLOY.md
├── BACKLOG.md
└── SETUP-NOW.md
```

**Not committed** (already in `.gitignore`):
- `reimagin8/site/node_modules/`
- `reimagin8/site/dist/`
- `reimagin8/site/.env`
- `reimagin8/_deck-extract/` and `deck.zip`

### Push to your existing repo

From the repo root (`creator-equation-hub`):

```powershell
cd C:\Users\norse\Desktop\creator-equation-hub

git add reimagin8/
git status
git commit -m "Add reimagin8 site and Supabase migration for workshop commitments"
git push origin main
```

Use your usual branch name if not `main`.

### Optional — separate repo

If you prefer `reimagin8` as its own repository:

```powershell
cd C:\Users\norse\Desktop\creator-equation-hub\reimagin8
git init
git add site/ supabase/ *.md .gitignore
git commit -m "Initial reimagin8 site"
git remote add origin git@github.com:YOUR-USER/reimagin8.git
git push -u origin main
```

For Netlify later, point the **base directory** at `site/` if using a separate repo, or `reimagin8/site` if it stays in `creator-equation-hub`.

---

## Part 2 — Supabase

### A. Create the project (Dashboard)

1. Go to [supabase.com/dashboard](https://supabase.com/dashboard)
2. **New project**
   - Name: `reimagin8`
   - Strong database password (save it)
   - Region: closest to your users
3. Wait until the project status is **Active**

### B. Apply the migration

**Option 1 — Supabase CLI (recommended if you already use it)**

```powershell
# Install CLI once (if needed)
npm install -g supabase

# From repo root or reimagin8 folder
cd C:\Users\norse\Desktop\creator-equation-hub\reimagin8

# Log in and link to your new project
supabase login
supabase link --project-ref YOUR_PROJECT_REF
```

`YOUR_PROJECT_REF` is the short ID in your project URL:  
`https://supabase.com/dashboard/project/` **`abcdefghij`**

Push migrations:

```powershell
supabase db push
```

**Option 2 — SQL Editor (no CLI)**

1. Dashboard → **SQL Editor** → **New query**
2. Paste contents of:
   `reimagin8/supabase/migrations/20260803150000_workshop_commitments.sql`
3. **Run**
4. Confirm: **Table Editor** → `workshop_commitments`

### C. Get API credentials

Dashboard → **Project Settings** → **API**

| Copy this | Netlify env var |
|-----------|-----------------|
| Project URL | `SUPABASE_URL` |
| `service_role` secret key | `SUPABASE_SERVICE_ROLE_KEY` |

Use **service_role** (not `anon`). It is server-only — Netlify Functions use it; never expose it in the browser.

### D. Optional — Supabase GitHub integration

If you use Supabase’s GitHub app for migrations on merge:

1. Dashboard → **Project Settings** → **Integrations** → **GitHub**
2. Connect `creator-equation-hub` (or your reimagin8 repo)
3. Set migrations path: `reimagin8/supabase/migrations` (or `supabase/migrations` in a dedicated repo)

Future schema changes: add a new file under `supabase/migrations/` and push to GitHub.

---

## Part 3 — Verify Supabase

In **Table Editor** → `workshop_commitments`, columns should include:

- `name`, `email`, `action_text`, `blocker`, `stage_crisis`
- `paired_with_id`, `status`, `check_in_token`
- `nudge_count`, `day7_sent`, `created_at`

RLS is enabled with no public policies — only your Netlify Functions (service role) can read/write. That is intentional.

---

## Part 4 — Connect GitHub to Netlify (when ready)

1. [app.netlify.com](https://app.netlify.com) → **Add new site** → **Import from Git**
2. Select `creator-equation-hub`
3. Build settings:

   | Setting | Value |
   |---------|--------|
   | Branch | `main` (or yours) |
   | Base directory | `reimagin8/site` |
   | Build command | `npm run build` |
   | Publish directory | `reimagin8/site/dist` |

4. **Environment variables** (Site configuration → Environment variables):

   ```
   SUPABASE_URL=https://xxxxx.supabase.co
   SUPABASE_SERVICE_ROLE_KEY=eyJ...
   PUBLIC_SITE_URL=https://your-site.netlify.app
   PUBLIC_DEFAULT_WORKSHOP_SESSION=growth-gap-2026-08-04
   CRON_SECRET=your-long-random-string
   ```

5. Deploy → test `/commitment` with two submissions

---

## Quick checklist

- [ ] `reimagin8/` pushed to GitHub
- [ ] Supabase project created
- [ ] Migration applied (`workshop_commitments` table exists)
- [ ] Project URL + service_role key saved
- [ ] Netlify connected to GitHub with base dir `reimagin8/site`
- [ ] Env vars set in Netlify
- [ ] Two test commitments pair successfully

---

## Workshop URLs (after Netlify deploy)

| Purpose | Path |
|---------|------|
| QR on screen | `/commitment/qr` |
| Participant form | `/commitment` |
| Day 7 check-in | `/commitment/check-in?token=...` |

Email nudges need **Resend** later (`RESEND_API_KEY` + `COMMITMENT_FROM_EMAIL`). Pairing works without email.
