import { NextResponse } from "next/server";
import { revalidateTag } from "next/cache";
import { verifyAdminAuth } from "@/lib/firebase/admin";

const VALID_TAGS = ["settings", "banners", "courses", "features", "testimonials"] as const;
type ValidTag = (typeof VALID_TAGS)[number];

export async function POST(request: Request) {
  const auth = await verifyAdminAuth(request);
  if (!auth.ok) return NextResponse.json({ error: auth.error }, { status: auth.status });

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
