import "server-only";
import { cert, getApps, initializeApp, type App } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

function getAdminApp(): App {
  const existing = getApps();
  if (existing.length > 0) return existing[0];

  const raw = process.env.FIREBASE_SERVICE_ACCOUNT_KEY;
  if (!raw) {
    throw new Error(
      "FIREBASE_SERVICE_ACCOUNT_KEY is not set. Add the Firebase service account JSON (as a single-line string) to your environment. See SETUP.md."
    );
  }

  const serviceAccount = JSON.parse(raw);

  return initializeApp({
    credential: cert(serviceAccount),
  });
}

export function getAdminDb() {
  return getFirestore(getAdminApp());
}

export async function getAdminAuth() {
  const { getAuth } = await import("firebase-admin/auth");
  return getAuth(getAdminApp());
}

type AdminAuthResult = { ok: true } | { ok: false; status: number; error: string };

/** Verifies the request's Firebase ID token belongs to the one ADMIN_EMAIL account. */
export async function verifyAdminAuth(request: Request): Promise<AdminAuthResult> {
  const authHeader = request.headers.get("authorization") ?? "";
  const idToken = authHeader.startsWith("Bearer ") ? authHeader.slice(7) : null;
  if (!idToken) return { ok: false, status: 401, error: "Missing auth token." };

  const adminEmail = process.env.ADMIN_EMAIL;
  if (!adminEmail) {
    console.error("ADMIN_EMAIL is not configured.");
    return { ok: false, status: 500, error: "Server misconfigured." };
  }

  try {
    const decoded = await (await getAdminAuth()).verifyIdToken(idToken);
    if (decoded.email !== adminEmail) return { ok: false, status: 403, error: "Forbidden." };
    return { ok: true };
  } catch {
    return { ok: false, status: 401, error: "Invalid or expired token." };
  }
}
