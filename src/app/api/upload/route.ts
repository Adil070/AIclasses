import { NextResponse } from "next/server";
import type { UploadApiResponse } from "cloudinary";
import { verifyAdminAuth } from "@/lib/firebase/admin";
import { cloudinary } from "@/lib/cloudinary/server";

const MAX_SIZE = 5 * 1024 * 1024;

export async function POST(request: Request) {
  const auth = await verifyAdminAuth(request);
  if (!auth.ok) return NextResponse.json({ error: auth.error }, { status: auth.status });

  const formData = await request.formData();
  const file = formData.get("file");

  if (!(file instanceof Blob)) {
    return NextResponse.json({ error: "No file provided." }, { status: 400 });
  }
  if (file.size > MAX_SIZE) {
    return NextResponse.json({ error: "Image must be under 5MB." }, { status: 400 });
  }
  if (!file.type.startsWith("image/")) {
    return NextResponse.json({ error: "Only image files are allowed." }, { status: 400 });
  }

  const buffer = Buffer.from(await file.arrayBuffer());

  try {
    const result = await new Promise<UploadApiResponse>((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { folder: "classesweb", resource_type: "image" },
        (err, res) => {
          if (err || !res) reject(err ?? new Error("Empty Cloudinary response"));
          else resolve(res);
        }
      );
      stream.end(buffer);
    });

    return NextResponse.json({ url: result.secure_url });
  } catch (err) {
    console.error("Cloudinary upload failed:", err);
    return NextResponse.json({ error: "Upload failed." }, { status: 502 });
  }
}
