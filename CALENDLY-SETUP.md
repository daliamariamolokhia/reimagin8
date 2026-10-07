# Calendly on reimagin8.com

The contact page embeds your Calendly **event link**. Header and homepage CTAs link to `/contact#book-a-call` when the URL is configured.

## 1 — Get your event link

1. Log in at [calendly.com](https://calendly.com).
2. **Event types** → open your discovery call (e.g. 30 minutes).
3. **Share** → copy the **event link** (not only your profile URL).

Current profile (shows your event types):

```
https://calendly.com/daliamaria-molokhia
```

For one event only, use the event link from **Share** on that event type, e.g. `https://calendly.com/daliamaria-molokhia/discovery-call`.

## 2 — Add to Netlify

**Site configuration** → **Environment variables**:

| Key | Value |
|-----|--------|
| `PUBLIC_CALENDLY_URL` | Your full event link from step 1 |

`PUBLIC_` variables are baked in at **build time**. After saving, run **Deploys** → **Trigger deploy** → **Deploy site**.

## 3 — Optional local dev

In `reimagin8/site/.env` (do not commit):

```
PUBLIC_CALENDLY_URL=https://calendly.com/your-name/discovery-call
```

Then `npm run dev` and open `/contact#book-a-call`.

## 4 — Verify

- Embed loads on [Contact](https://www.reimagin8.com/contact#book-a-call).
- **Book a call** appears in the site header (desktop).
- Hero on the homepage shows **Book a discovery call** when the URL is set.

If the embed is blank, confirm the link is an **event type** URL and redeploy after changing env vars.
