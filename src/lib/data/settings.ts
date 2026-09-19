import "server-only";
import { unstable_cache } from "next/cache";
import { getAdminDb } from "@/lib/firebase/admin";
import type { SiteSettings } from "./types";
import { DEFAULT_SETTINGS } from "./defaults";

async function fetchSettings(): Promise<SiteSettings> {
  const snap = await getAdminDb().collection("settings").doc("main").get();
  if (!snap.exists) return DEFAULT_SETTINGS;
  return { ...DEFAULT_SETTINGS, ...(snap.data() as Partial<SiteSettings>) };
}

export const getSiteSettings = unstable_cache(fetchSettings, ["site-settings"], {
  tags: ["settings"],
});
