/**
 * One-time seed: writes the original hardcoded copy into Firestore so the
 * site launches with real content instead of empty admin CRUD screens.
 *
 * Usage (after setting up .env.local per SETUP.md):
 *   npx tsx scripts/seed.ts
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

const app = getApps().length > 0 ? getApps()[0] : initializeApp({ credential: cert(JSON.parse(raw)) });
const db = getFirestore(app);

const settings = {
  instituteName: "AI Computer Institute",
  tagline: "Empowering Digital Careers",
  heroHeadline: "Unlock Your Digital Future Today",
  heroSubheadline:
    "Professional computer education designed to give you real-world skills. Join hundreds of students who've launched their careers with us.",
  heroBadges: [
    "Admissions open · new batch this month",
    "Certification programmes available",
    "Free demo class · limited seats",
  ],
  phone: "+91 98765 43210",
  email: "info@aicomputerinstitute.example",
  addressLines: ["AI Computer Institute", "Govandi, Mumbai", "Maharashtra — 400088"],
  timingsWeekday: "8:00 AM – 8:00 PM",
  timingsSunday: "9:00 AM – 2:00 PM",
  socials: {},
  mapEmbedUrl:
    "https://maps.google.com/maps?q=AI+Computer+Institute+Govandi+Mumbai&z=16&output=embed",
  mapLinkUrl: "https://maps.app.goo.gl/H1TfHx7BSdhrHTYY8",
  stats: {
    studentsTrained: "500+",
    coursesOffered: "15+",
    yearsExperience: "5+",
    placementRate: "95%",
  },
  footerBlurb: "Empowering students with professional computer skills since 2019.",
};

const banners = [
  {
    title: "Coming Soon to Kurla!",
    message:
      "We're expanding! AI Computer Institute is opening a brand-new branch in Kurla, Mumbai. Stay tuned for our launch and early-bird enrollment offers.",
    badgeText: "Kurla · Opening Soon",
    imageUrl: "",
    active: true,
    order: 0,
  },
];

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

const features = [
  { title: "Expert Faculty", description: "Learn from experienced instructors with real industry background and proven teaching expertise.", icon: "Trophy", order: 0 },
  { title: "Practical Training", description: "Hands-on projects and real-world exercises — not just textbook theory.", icon: "CheckCircle", order: 1 },
  { title: "Job Placement Help", description: "We actively connect graduating students with job opportunities across Mumbai.", icon: "Users", order: 2 },
  { title: "Flexible Timings", description: "Morning, afternoon & evening batches available to fit your personal schedule.", icon: "Clock", order: 3 },
  { title: "Affordable Fees", description: "Premium education at prices that won't break the bank. EMI options available.", icon: "Banknote", order: 4 },
  { title: "Certified Programs", description: "Receive recognized certificates on course completion to boost your resume.", icon: "BookOpen", order: 5 },
];

const testimonials = [
  { name: "Priya Sharma", course: "MS Office & Tally", rating: 5, review: "After completing the Tally course here, I got a job at a CA firm within 2 weeks! The faculty explains everything so clearly. Best decision I ever made.", avatarInitials: "PS", order: 0 },
  { name: "Ravi Kumar", course: "Web Design", rating: 5, review: "Amazing institute! I came with zero knowledge and now I build websites for clients. The practical approach really works. Highly recommended to everyone!", avatarInitials: "RK", order: 1 },
  { name: "Anjali Patil", course: "Graphic Design", rating: 5, review: "The Photoshop and CorelDraw training was excellent. My portfolio has impressed multiple employers. Thank you for changing my life!", avatarInitials: "AP", order: 2 },
  { name: "Mohammed Shaikh", course: "Python Programming", rating: 5, review: "I was scared of coding but the teachers made Python so simple and fun. Now I'm working on my own project. Great environment and teaching style throughout.", avatarInitials: "MS", order: 3 },
  { name: "Sunita Gaikwad", course: "Computer Basics", rating: 5, review: "As a homemaker learning computers for the first time, the staff was incredibly patient and supportive. I can now confidently use a computer for daily tasks.", avatarInitials: "SG", order: 4 },
  { name: "Deepak Nair", course: "Hardware & Networking", rating: 5, review: "Excellent hardware course with real equipment to practice on. Got placed at a service center after completing. The fees were also very reasonable!", avatarInitials: "DN", order: 5 },
];

const studentProjects = [
  { title: "Sales Dashboard in Excel", student: "Aisha K.", imageUrl: "", order: 0, published: true },
  { title: "Bakery Landing Page", student: "Rohan M.", imageUrl: "", order: 1, published: true },
  { title: "Festival Poster Series", student: "Sana P.", imageUrl: "", order: 2, published: true },
  { title: "Inventory Tracker", student: "Imran S.", imageUrl: "", order: 3, published: true },
];

async function seed() {
  await db.doc("settings/main").set(settings, { merge: true });
  console.log("✓ settings/main");

  for (const [name, docs] of Object.entries({ banners, courses, features, testimonials, studentProjects })) {
    const existing = await db.collection(name).limit(1).get();
    if (!existing.empty) {
      console.log(`- ${name}: already has data, skipping (delete the collection first to reseed)`);
      continue;
    }
    const batch = db.batch();
    docs.forEach((data) => batch.set(db.collection(name).doc(), data));
    await batch.commit();
    console.log(`✓ ${name}: seeded ${docs.length} documents`);
  }

  console.log("\nDone. Visit /admin to manage this content.");
  process.exit(0);
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
