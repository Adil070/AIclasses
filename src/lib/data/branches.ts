import "server-only";
import { unstable_cache } from "next/cache";
import { getAdminDb } from "@/lib/firebase/admin";
import type { Branch } from "./types";

async function fetchBranches(): Promise<Branch[]> {
  const snap = await getAdminDb().collection("branches").orderBy("order", "asc").get();
  return snap.docs
    .map((doc) => ({ id: doc.id, ...(doc.data() as Omit<Branch, "id">) }))
    .filter((branch) => branch.published);
}

export const getBranches = unstable_cache(fetchBranches, ["branches"], {
  tags: ["branches"],
});
