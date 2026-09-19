import { NextResponse } from "next/server";
import { revalidateTag } from "next/cache";
import { getAdminAuth } from "@/lib/firebase/admin";

const VALID_TAGS = ["settings", "banners", "courses", "features", "testimonials"] as const;
type ValidTag = (typeof VALID_TAGS)[number];

export async function POST(request: Request) {
  const authHeader = request.headers.get("authorization") ?? "";
  const idToken = authHeader.startsWith("Bearer ") ? authHeader.slice(7) : null;

  if (!idToken) {
    return NextResponse.json({ error: "Missing auth token." }, { status: 401 });
  }

  const adminEmail = process.env.ADMIN_EMAIL;
  if (!adminEmail) {
    console.error("ADMIN_EMAIL is not configured.");
    return NextResponse.json({ error: "Server misconfigured." }, { status: 500 });
  }

  try {
    const decoded = await getAdminAuth().verifyIdToken(idToken);
    if (decoded.email !== adminEmail) {
      return NextResponse.json({ error: "Forbidden." }, { status: 403 });
    }
  } catch {
    return NextResponse.json({ error: "Invalid or expired token." }, { status: 401 });
  }

  let tag: string | undefined;
  try {
    ({ tag } = await request.json());
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  if (!tag || !VALID_TAGS.includes(tag as ValidTag)) {
    return NextResponse.json(
      { error: `tag must be one of: ${VALID_TAGS.join(", ")}` },
      { status: 400 }
    );
  }

  revalidateTag(tag);
  return NextResponse.json({ revalidated: true, tag });
}
