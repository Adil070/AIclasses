import "server-only";
import { unstable_cache } from "next/cache";
import { getAdminDb } from "@/lib/firebase/admin";
import type { Banner } from "./types";

async function fetchBanners(): Promise<Banner[]> {
  const snap = await getAdminDb()
    .collection("banners")
    .where("active", "==", true)
    .orderBy("order", "asc")
    .get();
  return snap.docs.map((doc) => ({ id: doc.id, ...(doc.data() as Omit<Banner, "id">) }));
}

export const getBanners = unstable_cache(fetchBanners, ["banners"], {
  tags: ["banners"],
});
