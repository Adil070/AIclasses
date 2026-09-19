# Setup — Firebase CMS, admin panel, and the query form

This site is CMS-driven: everything visible on the homepage (banners, courses,
"why us" features, testimonials, site settings/address) is stored in Firebase
and edited from `/admin`. Nothing here costs money — Firebase's free Spark
plan, Gmail SMTP and Vercel's Hobby plan are all free indefinitely at this
scale. You need to create these accounts/keys yourself; the steps below are
exact.

## 1. Create the Firebase project

1. Go to the [Firebase console](https://console.firebase.google.com/) → **Add project** → give it a name → you can skip Google Analytics.
2. Once created, click the **web icon (`</>`)** to register a web app. Copy the `firebaseConfig` values shown — you'll need them for step 5.
3. In the left sidebar: **Build → Firestore Database → Create database** → start in **production mode** → pick any region.
4. In the left sidebar: **Build → Storage → Get started** → production mode, same region.
5. In the left sidebar: **Build → Authentication → Get started → Sign-in method → Email/Password → Enable**.

## 2. Create the one admin login

1. **Authentication → Users → Add user**. Use the email/password you (the institute owner) will log in to `/admin` with.
2. This exact email is your admin identity — it's used to gate all writes. Keep note of it.

## 3. Lock down the security rules

1. Open [firestore.rules](firestore.rules) and [storage.rules](storage.rules) in this repo. Replace `REPLACE_WITH_ADMIN_EMAIL@example.com` in **both files** with the exact email from step 2.
2. In the Firebase console: **Firestore Database → Rules** → paste in the contents of `firestore.rules` → Publish.
3. **Storage → Rules** → paste in the contents of `storage.rules` → Publish.

This ensures only that one signed-in account can ever write content or upload images — everyone else gets read-only access to public content.

## 4. Generate the server-side service account key

1. **Project settings (gear icon) → Service accounts → Generate new private key**. This downloads a JSON file.
2. Keep this file secret — never commit it. You'll paste its entire contents (as one line) into an env var below.

## 5. Set up Gmail for the query form

1. On the Gmail account that should receive enquiries, enable **2-Step Verification** (Google Account → Security).
2. Then go to Google Account → Security → **App passwords** → create one for "Mail" → copy the 16-character password.
3. This is `GMAIL_APP_PASSWORD` below — not your normal Gmail password.

## 6. Environment variables

Copy `.env.local.example` to `.env.local` and fill in every value:

- `NEXT_PUBLIC_FIREBASE_*` — from step 1.2 (`firebaseConfig`).
- `FIREBASE_SERVICE_ACCOUNT_KEY` — the entire JSON from step 4, as a single-line string (most editors can "minify"/paste it as one line; wrapping the whole thing in single quotes on the command line works too).
- `ADMIN_EMAIL` — the exact email from step 2 (must match the rules files).
- `GMAIL_USER` / `GMAIL_APP_PASSWORD` — from step 5.
- `CONTACT_RECEIVER_EMAIL` — where enquiry emails should land (defaults to `GMAIL_USER` if left blank).

## 7. Seed initial content (optional but recommended)

Populates Firestore with the site's original copy so `/admin` isn't empty on first login:

```bash
npm run seed
```

Safe to re-run — it skips any collection that already has data.

## 8. Run locally

```bash
npm install
npm run dev
```

Visit `http://localhost:3000` for the site and `http://localhost:3000/admin/login` for the admin panel.

## 9. Deploy to Vercel (free)

1. Push this repo to GitHub, then [import it on Vercel](https://vercel.com/new).
2. In the Vercel project's **Settings → Environment Variables**, add every variable from `.env.local` (same names/values).
3. Deploy. Vercel's free Hobby plan covers this comfortably (Next.js API routes run as free serverless functions).

## Smoke test after deploying

1. Sign in at `/admin/login` with the email/password from step 2.
2. Add a course with a photo — confirm it appears on the homepage within a couple seconds (no redeploy needed).
3. Edit an address/phone field under **Site Settings** — confirm it updates live.
4. Submit the "Get In Touch" form on the homepage — confirm the email arrives at `CONTACT_RECEIVER_EMAIL`, and the message shows up under `/admin/messages`.
