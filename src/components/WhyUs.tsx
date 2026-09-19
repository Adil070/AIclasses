import { CheckCircle, Clock, Trophy, Users, BookOpen, Banknote } from "lucide-react";

const features = [
  {
    icon: Trophy,
    title: "Expert Faculty",
    description: "Learn from experienced instructors with real industry background and proven teaching expertise.",
    color: "text-yellow-600",
    bg: "bg-yellow-50",
  },
  {
    icon: CheckCircle,
    title: "Practical Training",
    description: "Hands‑on projects and real‑world exercises — not just textbook theory.",
    color: "text-green-600",
    bg: "bg-green-50",
  },
  {
    icon: Users,
    title: "Job Placement Help",
    description: "We actively connect graduating students with job opportunities across Mumbai.",
    color: "text-blue-600",
    bg: "bg-blue-50",
  },
  {
    icon: Clock,
    title: "Flexible Timings",
    description: "Morning, afternoon & evening batches available to fit your personal schedule.",
    color: "text-purple-600",
    bg: "bg-purple-50",
  },
  {
    icon: Banknote,
    title: "Affordable Fees",
    description: "Premium education at prices that won't break the bank. EMI options available.",
    color: "text-orange-600",
    bg: "bg-orange-50",
  },
  {
    icon: BookOpen,
    title: "Certified Programs",
    description: "Receive recognized certificates on course completion to boost your resume.",
    color: "text-red-600",
    bg: "bg-red-50",
  },
];

export default function WhyUs() {
  return (
    <section id="why-us" className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left text */}
          <div>
            <span className="text-orange-500 font-semibold text-sm uppercase tracking-widest">
              Why Choose Us
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mt-2 mb-6 font-heading">
              The Smart Choice for Your Computer Education
            </h2>
            <p className="text-slate-500 text-lg mb-4 leading-relaxed">
              At AI Computer Institute, we go beyond textbooks. Our students leave with
              real skills, confidence, and the support they need to succeed in
              today&apos;s digital world.
            </p>
            <p className="text-slate-500 mb-8 leading-relaxed">
              Whether you&apos;re a school student, homemaker, working professional or a
              job seeker — we have the right course and batch for you.
            </p>
            <a
              href="#courses"
              className="inline-flex items-center gap-2 bg-blue-800 hover:bg-blue-900 text-white font-semibold px-7 py-3.5 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              View All Courses →
            </a>
          </div>

          {/* Right feature grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {features.map((f) => {
              const Icon = f.icon;
              return (
                <div
                  key={f.title}
                  className="bg-white rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow border border-slate-100"
                >
                  <div className={`inline-flex p-3 rounded-xl mb-3 ${f.bg}`}>
                    <Icon size={20} className={f.color} />
                  </div>
                  <h3 className="font-bold text-slate-900 mb-1.5 text-sm">{f.title}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed">{f.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
