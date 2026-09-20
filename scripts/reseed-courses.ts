/**
 * Force-refresh the `courses` collection with complete data so every course
 * has fee, mode, eligibility, certification and highlights populated.
 *
 * Unlike seed.ts (which skips collections that already have data), this script
 * UPSERTS: it updates existing course docs matched by title and creates any
 * that are missing. Existing docs keep their id.
 *
 * Usage (after setting up .env.local per SETUP.md):
 *   npx tsx scripts/reseed-courses.ts
 */
import { cert, getApps, initializeApp } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import * as dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

const raw = process.env.FIREBASE_SERVICE_ACCOUNT_KEY;
if (!raw) {
  console.error("FIREBASE_SERVICE_ACCOUNT_KEY is not set in .env.local. See SETUP.md.");
  process.exit(1);
}

const app =
  getApps().length > 0 ? getApps()[0] : initializeApp({ credential: cert(JSON.parse(raw)) });
const db = getFirestore(app);

const courses = [
  { title: "MS Office Suite", description: "Master Word, Excel, PowerPoint & Outlook for professional productivity and office work.", duration: "2 Months", level: "Beginner", imageUrl: "", badge: "Most Popular", highlights: ["Word, Excel, PowerPoint & Outlook from scratch", "Real formulas, formatting and report-building", "Practice on real office documents and templates", "Certificate on completion"], fee: "₹4,500", mode: "Offline · Govandi Center", eligibility: "Open to all, no prior experience needed", certification: "Certificate of Completion provided", order: 0, published: true },
  { title: "Tally Prime & GST", description: "Complete accounting software with GST filing, payroll, inventory and financial reports.", duration: "3 Months", level: "Beginner", imageUrl: "", badge: "High Demand", highlights: ["Ledger, vouchers and financial statements", "GST filing and returns, step by step", "Payroll and inventory management", "Job-ready for CA firms and accounts roles"], fee: "₹6,000", mode: "Offline · Govandi Center", eligibility: "Basic computer knowledge helpful, not required", certification: "Certificate of Completion provided", order: 1, published: true },
  { title: "Graphic Design", description: "Photoshop, CorelDraw & Canva for logos, banners, posters and professional branding.", duration: "3 Months", level: "Beginner", imageUrl: "", badge: "", highlights: ["Photoshop and CorelDraw fundamentals", "Design logos, posters and social media banners", "Build a portfolio of real client-style projects", "Canva for fast, modern design work"], fee: "₹6,500", mode: "Offline · Govandi Center", eligibility: "Open to all, no prior experience needed", certification: "Certificate of Completion provided", order: 2, published: true },
  { title: "Web Design", description: "HTML, CSS & responsive design fundamentals. Build stunning websites from scratch.", duration: "4 Months", level: "Intermediate", imageUrl: "", badge: "Trending", highlights: ["HTML & CSS from the ground up", "Responsive, mobile-friendly layouts", "Build and deploy real websites", "Portfolio project by course end"], fee: "₹8,000", mode: "Offline · Govandi Center", eligibility: "Basic computer literacy required", certification: "Certificate of Completion provided", order: 3, published: true },
  { title: "Python Programming", description: "Python fundamentals, scripting, automation and an intro to data science concepts.", duration: "4 Months", level: "Beginner", imageUrl: "", badge: "Trending", highlights: ["Python syntax, logic and problem-solving", "Automate everyday tasks with scripts", "Intro to data handling and libraries", "Hands-on mini projects throughout"], fee: "₹8,500", mode: "Offline · Govandi Center", eligibility: "Open to all, no prior experience needed", certification: "Certificate of Completion provided", order: 4, published: true },
  { title: "Computer Basics", description: "From keyboard to internet — complete foundation for absolute beginners of all ages.", duration: "1 Month", level: "Beginner", imageUrl: "", badge: "", highlights: ["Keyboard, mouse and OS navigation", "Internet, email and everyday apps", "Safe and confident computer use", "Perfect for absolute beginners"], fee: "₹2,000", mode: "Offline · Govandi Center", eligibility: "Open to all ages, no prior experience needed", certification: "Certificate of Completion provided", order: 5, published: true },
  { title: "DTP & Data Entry", description: "Desktop publishing, fast typing skills and data entry for office and government jobs.", duration: "2 Months", level: "Beginner", imageUrl: "", badge: "", highlights: ["Fast, accurate typing practice", "Desktop publishing tools and layouts", "Data entry standards for office work", "Prepares you for government job exams"], fee: "₹3,500", mode: "Offline · Govandi Center", eligibility: "Open to all, no prior experience needed", certification: "Certificate of Completion provided", order: 6, published: true },
  { title: "Hardware & Networking", description: "PC assembly, troubleshooting, LAN setup and basic network administration skills.", duration: "3 Months", level: "Intermediate", imageUrl: "", badge: "", highlights: ["Hands-on PC assembly and troubleshooting", "LAN setup and network basics", "Real equipment, not just theory", "Job-ready for service center roles"], fee: "₹6,500", mode: "Offline · Govandi Center", eligibility: "Basic computer literacy required", certification: "Certificate of Completion provided", order: 7, published: true },
];

async function reseed() {
  const snapshot = await db.collection("courses").get();
  const byTitle = new Map<string, string>();
  snapshot.forEach((doc) => {
    const title = (doc.data().title as string | undefined)?.trim();
    if (title) byTitle.set(title, doc.id);
  });

  const batch = db.batch();
  let updated = 0;
  let created = 0;

  for (const course of courses) {
    const existingId = byTitle.get(course.title);
    if (existingId) {
      batch.set(db.collection("courses").doc(existingId), course, { merge: true });
      updated++;
    } else {
      batch.set(db.collection("courses").doc(), course);
      created++;
    }
  }

  await batch.commit();
  console.log(`✓ courses reseeded — updated ${updated}, created ${created}`);
  process.exit(0);
}

reseed().catch((err) => {
  console.error(err);
  process.exit(1);
});
