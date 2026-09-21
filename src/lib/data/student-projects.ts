import "server-only";
import { unstable_cache } from "next/cache";
import { getAdminDb } from "@/lib/firebase/admin";
import type { StudentProject } from "./types";

async function fetchStudentProjects(): Promise<StudentProject[]> {
  // Single-field orderBy avoids a composite index; filter "published" here.
  const snap = await getAdminDb()
    .collection("studentProjects")
    .orderBy("order", "asc")
    .get();
  return snap.docs
    .map((doc) => ({ id: doc.id, ...(doc.data() as Omit<StudentProject, "id">) }))
    .filter((project) => project.published);
}

export const getStudentProjects = unstable_cache(fetchStudentProjects, ["studentProjects"], {
  tags: ["studentProjects"],
});
