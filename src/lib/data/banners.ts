import "server-only";
import { unstable_cache } from "next/cache";
import { getAdminDb } from "@/lib/firebase/admin";
import type { Banner } from "./types";

async function fetchBanners(): Promise<Banner[]> {
  // Single-field orderBy avoids needing a manually-created Firestore composite
  // index; filtering "active" here instead of in the query.
  const snap = await getAdminDb().collection("banners").orderBy("order", "asc").get();
  return snap.docs
    .map((doc) => ({ id: doc.id, ...(doc.data() as Omit<Banner, "id">) }))
    .filter((banner) => banner.active);
}

export const getBanners = unstable_cache(fetchBanners, ["banners"], {
  tags: ["banners"],
});
