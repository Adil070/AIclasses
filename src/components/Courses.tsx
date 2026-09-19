const courses = [
  {
    emoji: "💻",
    title: "MS Office Suite",
    description: "Master Word, Excel, PowerPoint & Outlook for professional productivity and office work.",
    duration: "2 Months",
    level: "Beginner",
    bg: "bg-blue-50",
    border: "border-blue-100 hover:border-blue-300",
    badge: "Most Popular",
    badgeBg: "bg-blue-600",
  },
  {
    emoji: "📊",
    title: "Tally Prime & GST",
    description: "Complete accounting software with GST filing, payroll, inventory and financial reports.",
    duration: "3 Months",
    level: "Beginner",
    bg: "bg-green-50",
    border: "border-green-100 hover:border-green-300",
    badge: "High Demand",
    badgeBg: "bg-green-600",
  },
  {
    emoji: "🎨",
    title: "Graphic Design",
    description: "Photoshop, CorelDraw & Canva for logos, banners, posters and professional branding.",
    duration: "3 Months",
    level: "Beginner",
    bg: "bg-purple-50",
    border: "border-purple-100 hover:border-purple-300",
    badge: "",
    badgeBg: "",
  },
  {
    emoji: "🌐",
    title: "Web Design",
    description: "HTML, CSS & responsive design fundamentals. Build stunning websites from scratch.",
    duration: "4 Months",
    level: "Intermediate",
    bg: "bg-orange-50",
    border: "border-orange-100 hover:border-orange-300",
    badge: "Trending",
    badgeBg: "bg-orange-500",
  },
  {
    emoji: "🐍",
    title: "Python Programming",
    description: "Python fundamentals, scripting, automation and an intro to data science concepts.",
    duration: "4 Months",
    level: "Beginner",
    bg: "bg-yellow-50",
    border: "border-yellow-100 hover:border-yellow-300",
    badge: "Trending",
    badgeBg: "bg-yellow-600",
  },
  {
    emoji: "🖥️",
    title: "Computer Basics",
    description: "From keyboard to internet — complete foundation for absolute beginners of all ages.",
    duration: "1 Month",
    level: "Beginner",
    bg: "bg-slate-50",
    border: "border-slate-200 hover:border-slate-400",
    badge: "",
    badgeBg: "",
  },
  {
    emoji: "🖨️",
    title: "DTP & Data Entry",
    description: "Desktop publishing, fast typing skills and data entry for office and government jobs.",
    duration: "2 Months",
    level: "Beginner",
    bg: "bg-red-50",
    border: "border-red-100 hover:border-red-300",
    badge: "",
    badgeBg: "",
  },
  {
    emoji: "🔧",
    title: "Hardware & Networking",
    description: "PC assembly, troubleshooting, LAN setup and basic network administration skills.",
    duration: "3 Months",
    level: "Intermediate",
    bg: "bg-indigo-50",
    border: "border-indigo-100 hover:border-indigo-300",
    badge: "",
    badgeBg: "",
  },
];

export default function Courses() {
  return (
    <section id="courses" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-14">
          <span className="text-orange-500 font-semibold text-sm uppercase tracking-widest">
            Our Specialities
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mt-2 mb-4 font-heading">
            Courses That Build Careers
          </h2>
          <p className="text-slate-500 text-lg max-w-2xl mx-auto">
            Practical, industry‑focused courses designed to get you job‑ready from day one.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {courses.map((c) => (
            <div
              key={c.title}
              className={`relative rounded-2xl p-6 border-2 ${c.bg} ${c.border} transition-all duration-300 hover:-translate-y-1 hover:shadow-lg`}
            >
              {c.badge && (
                <span
                  className={`absolute top-4 right-4 ${c.badgeBg} text-white text-[10px] font-bold uppercase tracking-wide px-2.5 py-1 rounded-full`}
                >
                  {c.badge}
                </span>
              )}
              <div className="text-4xl mb-4">{c.emoji}</div>
              <h3 className="font-bold text-slate-900 text-base mb-2 font-heading">{c.title}</h3>
              <p className="text-slate-500 text-sm mb-4 leading-relaxed">{c.description}</p>
              <div className="flex items-center justify-between text-xs text-slate-400 pt-3 border-t border-slate-200/60">
                <span>⏱ {c.duration}</span>
                <span>📶 {c.level}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
