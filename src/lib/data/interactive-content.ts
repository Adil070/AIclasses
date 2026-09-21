import type { ProgressionStep } from "@/components/interactive/ScrollProgression";

// Static content for the learning-journey steps. Student projects are now
// CMS-managed (see src/lib/data/student-projects.ts).

export const PROGRESSION_STEPS: ProgressionStep[] = [
  { label: "Computer Basics", description: "Start with confidence — hardware, files, and the internet." },
  { label: "MS Office", description: "Word, Excel, and PowerPoint for real office work." },
  { label: "Web & Design", description: "Build pages and design graphics that stand out." },
  { label: "Programming", description: "Write your first programs and think like a developer." },
  { label: "Advanced Skills", description: "Specialize and get job-ready with a portfolio." },
];


