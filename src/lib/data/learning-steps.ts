import "server-only";
import { unstable_cache } from "next/cache";
import { getAdminDb } from "@/lib/firebase/admin";
import type { LearningStep } from "./types";

async function fetchLearningSteps(): Promise<LearningStep[]> {
  const snap = await getAdminDb()
    .collection("learningSteps")
    .orderBy("order", "asc")
    .get();
  return snap.docs
    .map((doc) => ({ id: doc.id, ...(doc.data() as Omit<LearningStep, "id">) }))
    .filter((step) => step.published);
}

export const getLearningSteps = unstable_cache(fetchLearningSteps, ["learningSteps"], {
  tags: ["learningSteps"],
});
