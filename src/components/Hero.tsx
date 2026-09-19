import { ArrowRight, PlayCircle, MapPin } from "lucide-react";

const coursePreviews = [
  { emoji: "💻", title: "MS Office" },
  { emoji: "📊", title: "Tally Prime" },
  { emoji: "🎨", title: "Graphic Design" },
  { emoji: "🌐", title: "Web Design" },
  { emoji: "🐍", title: "Python" },
  { emoji: "🔧", title: "Hardware" },
];

export default function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center pt-16 overflow-hidden"
      style={{
        background:
          "linear-gradient(135deg, #0d1b3e 0%, #1e3a8a 55%, #1d4ed8 100%)",
      }}
    >
      {/* Decorative blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-0 w-96 h-96 bg-blue-500 opacity-10 rounded-full blur-3xl" />
        <div className="absolute -bottom-10 left-10 w-80 h-80 bg-orange-500 opacity-10 rounded-full blur-3xl" />
        <div className="absolute top-1/3 left-1/3 w-[500px] h-[500px] bg-indigo-400 opacity-5 rounded-full blur-3xl" />
        {/* Grid */}
        <svg className="absolute inset-0 w-full h-full opacity-[0.04]" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="48" height="48" patternUnits="userSpaceOnUse">
              <path d="M 48 0 L 0 0 0 48" fill="none" stroke="white" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left */}
          <div>
            <div className="inline-flex items-center gap-2 bg-blue-700/40 border border-blue-500/30 text-blue-200 text-sm font-medium px-4 py-2 rounded-full mb-6">
              <MapPin size={13} className="text-orange-400" />
              Govandi, Mumbai
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-[56px] font-bold text-white leading-[1.15] mb-6 font-heading">
              Unlock Your{" "}
              <span className="text-orange-400">Digital</span>
              <br />
              Future Today
            </h1>

            <p className="text-lg text-blue-100 mb-8 leading-relaxed max-w-lg">
              Professional computer education designed to give you real‑world
              skills. Join hundreds of students who&apos;ve launched their careers
              with us.
            </p>

            <div className="flex flex-wrap gap-4 mb-12">
              <a
                href="#courses"
                className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-semibold px-7 py-3.5 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
              >
                Explore Courses <ArrowRight size={17} />
              </a>
              <a
                href="#why-us"
                className="inline-flex items-center gap-2 border-2 border-white/30 text-white hover:bg-white/10 font-semibold px-7 py-3.5 rounded-xl transition-all duration-200"
              >
                <PlayCircle size={17} /> Learn More
              </a>
            </div>

            {/* Quick stats */}
            <div className="flex flex-wrap gap-8">
              {[
                { number: "500+", label: "Students Trained" },
                { number: "15+", label: "Courses" },
                { number: "5+ Yrs", label: "Experience" },
              ].map((s) => (
                <div key={s.label}>
                  <div className="text-2xl font-bold text-orange-400 font-heading">{s.number}</div>
                  <div className="text-blue-200 text-sm">{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right — course card grid */}
          <div className="hidden lg:block">
            <div className="relative">
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-3xl p-8 shadow-2xl">
                <p className="text-white/60 text-xs font-semibold uppercase tracking-widest mb-5">
                  What You&apos;ll Learn
                </p>
                <div className="grid grid-cols-2 gap-4">
                  {coursePreviews.map((c) => (
                    <div
                      key={c.title}
                      className="bg-white/10 hover:bg-white/20 transition-colors p-4 rounded-2xl cursor-default group"
                    >
                      <div className="text-3xl mb-2">{c.emoji}</div>
                      <div className="text-white text-sm font-semibold">{c.title}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Floating rating */}
              <div className="absolute -top-5 -right-5 bg-orange-500 text-white rounded-2xl px-5 py-3 shadow-2xl">
                <div className="text-xl font-bold font-heading">⭐ 4.9</div>
                <div className="text-xs opacity-90">Avg. Rating</div>
              </div>

              {/* Floating graduates */}
              <div className="absolute -bottom-5 -left-5 bg-white rounded-2xl px-5 py-3 shadow-2xl">
                <div className="text-slate-800 font-bold text-sm">🎓 500+ Graduates</div>
                <div className="text-slate-400 text-xs">Since 2019</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Wave */}
      <div className="absolute bottom-0 left-0 right-0 leading-none">
        <svg viewBox="0 0 1440 56" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
          <path d="M0,56 L1440,56 L1440,20 C1080,56 360,0 0,36 Z" fill="#f8fafc" />
        </svg>
      </div>
    </section>
  );
}
