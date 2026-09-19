# Setup — Firebase CMS, admin panel, Cloudinary images, and the query form

This site is CMS-driven: everything visible on the homepage (banners, courses,
"why us" features, testimonials, site settings/address) is stored in Firebase
and edited from `/admin`. Nothing here costs money and none of it requires a
credit card — Firebase's free Spark plan, Cloudinary's free tier, Gmail SMTP
and Vercel's Hobby plan are all free indefinitely at this scale.

> Note: Firebase Cloud Storage now requires the paid Blaze plan (a card on
> file) even for free-tier usage, so this project uses **Cloudinary** for
> course/banner image uploads instead — no card, ever, up to 25GB.

## 1. Create the Firebase project

1. Go to the [Firebase console](https://console.firebase.google.com/) → **Add project** → give it a name → you can skip Google Analytics.
2. Click the **web icon (`</>`)** to register a web app (leave "Also set up Firebase Hosting" **unchecked** — this project deploys to Vercel, not Firebase Hosting). Copy the `firebaseConfig` values shown — you'll need them for step 5.
3. Left sidebar → **Databases & Storage → Firestore Database → Create database** → **production mode** → pick any region.
4. Left sidebar → **Authentication → Get started → Sign-in method → Email/Password → Enable**.

(No need to touch Firebase Storage — Cloudinary handles images instead.)

## 2. Create the one admin login

1. **Authentication → Users → Add user**. Use the email/password you (the institute owner) will log in to `/admin` with.
2. This exact email is your admin identity — it gates all writes and image uploads. Keep note of it.

## 3. Lock down the Firestore rules

1. Open [firestore.rules](firestore.rules) in this repo. Replace `REPLACE_WITH_ADMIN_EMAIL@example.com` with the exact email from step 2.
2. In the Firebase console: **Firestore Database → Rules** → paste in the contents of `firestore.rules` → Publish.

This ensures only that one signed-in account can ever write content — everyone else gets read-only access to public content.

## 4. Generate the server-side service account key

1. **Project settings (gear icon) → Service accounts → Generate new private key**. This downloads a JSON file.
2. Keep this file secret — never commit it. You'll paste its entire contents (as one line) into an env var below.

## 5. Set up Cloudinary (free image hosting, no card)

1. Sign up free at [cloudinary.com](https://cloudinary.com).
2. On your Cloudinary dashboard, copy **Cloud name**, **API Key**, and **API Secret** from "Account Details" / "API Keys".
3. These map to `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET` below. Uploads happen server-side through this app's own `/api/upload` route (gated behind your admin login), so the API secret never reaches the browser.

## 6. Set up Gmail for the query form

1. On the Gmail account that should receive enquiries, enable **2-Step Verification** (Google Account → Security).
2. Then go to Google Account → Security → **App passwords** → create one for "Mail" → copy the 16-character password.
3. This is `GMAIL_APP_PASSWORD` below — not your normal Gmail password.

## 7. Environment variables

Copy `.env.local.example` to `.env.local` and fill in every value:

- `NEXT_PUBLIC_FIREBASE_*` — from step 1.2 (`firebaseConfig`).
- `FIREBASE_SERVICE_ACCOUNT_KEY` — the entire JSON from step 4, as a single-line string.
- `ADMIN_EMAIL` — the exact email from step 2 (must match `firestore.rules`).
- `CLOUDINARY_CLOUD_NAME` / `CLOUDINARY_API_KEY` / `CLOUDINARY_API_SECRET` — from step 5.
- `GMAIL_USER` / `GMAIL_APP_PASSWORD` — from step 6.
- `CONTACT_RECEIVER_EMAIL` — where enquiry emails should land (defaults to `GMAIL_USER` if left blank).

## 8. Seed initial content (optional but recommended)

Populates Firestore with the site's original copy so `/admin` isn't empty on first login:

```bash
npm run seed
```

Safe to re-run — it skips any collection that already has data.

## 9. Run locally

```bash
npm install
npm run dev
```

Visit `http://localhost:3000` for the site and `http://localhost:3000/admin/login` for the admin panel.

## 10. Deploy to Vercel (free)

1. Push this repo to GitHub, then [import it on Vercel](https://vercel.com/new).
2. In the Vercel project's **Settings → Environment Variables**, add every variable from `.env.local` (same names/values).
3. Deploy. Vercel's free Hobby plan covers this comfortably (Next.js API routes run as free serverless functions).

## Smoke test after deploying

1. Sign in at `/admin/login` with the email/password from step 2.
2. Add a course with a photo — confirm it uploads and appears on the homepage within a couple seconds (no redeploy needed).
3. Edit an address/phone field under **Site Settings** — confirm it updates live.
4. Submit the "Get In Touch" form on the homepage — confirm the email arrives at `CONTACT_RECEIVER_EMAIL`, and the message shows up under `/admin/messages`.
