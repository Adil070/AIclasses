import type { ProgressionStep } from "@/components/interactive/ScrollProgression";
import type { ProjectItem } from "@/components/interactive/ProjectsGallery";

// Static content for the interactive homepage sections. These are not
// CMS-managed in this iteration.

export const PROGRESSION_STEPS: ProgressionStep[] = [
  { label: "Computer Basics", description: "Start with confidence — hardware, files, and the internet." },
  { label: "MS Office", description: "Word, Excel, and PowerPoint for real office work." },
  { label: "Web & Design", description: "Build pages and design graphics that stand out." },
  { label: "Programming", description: "Write your first programs and think like a developer." },
  { label: "Advanced Skills", description: "Specialize and get job-ready with a portfolio." },
];

export const STUDENT_PROJECTS: ProjectItem[] = [
  { title: "Sales Dashboard in Excel", student: "Aisha K." },
  { title: "Bakery Landing Page", student: "Rohan M." },
  { title: "Festival Poster Series", student: "Sana P." },
  { title: "Inventory Tracker", student: "Imran S." },
];
