import "server-only";
import { unstable_cache } from "next/cache";
import { getAdminDb } from "@/lib/firebase/admin";
import type { Testimonial } from "./types";

async function fetchTestimonials(): Promise<Testimonial[]> {
  const snap = await getAdminDb().collection("testimonials").orderBy("order", "asc").get();
  return snap.docs.map((doc) => ({ id: doc.id, ...(doc.data() as Omit<Testimonial, "id">) }));
}

export const getTestimonials = unstable_cache(fetchTestimonials, ["testimonials"], {
  tags: ["testimonials"],
});
