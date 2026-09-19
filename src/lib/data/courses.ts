import "server-only";
import { unstable_cache } from "next/cache";
import { getAdminDb } from "@/lib/firebase/admin";
import type { Course } from "./types";

async function fetchCourses(): Promise<Course[]> {
  // Single-field orderBy avoids needing a manually-created Firestore composite
  // index; filtering "published" here instead of in the query.
  const snap = await getAdminDb().collection("courses").orderBy("order", "asc").get();
  return snap.docs
    .map((doc) => ({ id: doc.id, ...(doc.data() as Omit<Course, "id">) }))
    .filter((course) => course.published);
}

export const getCourses = unstable_cache(fetchCourses, ["courses"], {
  tags: ["courses"],
});
