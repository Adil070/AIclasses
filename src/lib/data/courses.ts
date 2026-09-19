import "server-only";
import { unstable_cache } from "next/cache";
import { getAdminDb } from "@/lib/firebase/admin";
import type { Course } from "./types";

async function fetchCourses(): Promise<Course[]> {
  const snap = await getAdminDb()
    .collection("courses")
    .where("published", "==", true)
    .orderBy("order", "asc")
    .get();
  return snap.docs.map((doc) => ({ id: doc.id, ...(doc.data() as Omit<Course, "id">) }));
}

export const getCourses = unstable_cache(fetchCourses, ["courses"], {
  tags: ["courses"],
});
