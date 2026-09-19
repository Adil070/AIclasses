import "server-only";
import { unstable_cache } from "next/cache";
import { getAdminDb } from "@/lib/firebase/admin";
import type { Feature } from "./types";

async function fetchFeatures(): Promise<Feature[]> {
  const snap = await getAdminDb().collection("features").orderBy("order", "asc").get();
  return snap.docs.map((doc) => ({ id: doc.id, ...(doc.data() as Omit<Feature, "id">) }));
}

export const getFeatures = unstable_cache(fetchFeatures, ["features"], {
  tags: ["features"],
});
