import { ArrowRight, GraduationCap, MapPin } from "lucide-react";
import type { Course, SiteSettings } from "@/lib/data/types";
import { Reveal } from "@/components/motion/Reveal";

export default function Hero({
  settings,
  courses,
}: {
  settings: SiteSettings;
  courses: Course[];
}) {
  const location = settings.addressLines[1] ?? settings.addressLines[0] ?? "";
  const preview = courses.slice(0, 6);

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center pt-16 overflow-hidden bg-white"
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(80% 60% at 85% 15%, rgba(0,113,227,0.08), transparent)",
        }}
      />

      <div className="relative section py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <Reveal>
              <div className="inline-flex items-center gap-2 bg-ink/[0.04] text-ink/60 text-[13px] font-medium px-4 py-1.5 rounded-full mb-7">
                <MapPin size={13} className="text-accent" />
                {location}
              </div>
            </Reveal>

            <Reveal delay={0.05}>
              <h1 className="text-5xl sm:text-6xl lg:text-[68px] font-semibold text-ink leading-[1.05] mb-6 tracking-tight">
                {settings.heroHeadline}
              </h1>
            </Reveal>

            <Reveal delay={0.1}>
              <p className="text-lg text-ink/55 mb-10 leading-relaxed max-w-lg">
                {settings.heroSubheadline}
              </p>
            </Reveal>

            <Reveal delay={0.15}>
              <div className="flex flex-wrap gap-4 mb-14">
                <a
                  href="#courses"
                  className="inline-flex items-center gap-2 bg-ink hover:bg-black text-white font-medium px-7 py-3.5 rounded-full transition-all duration-200 hover:-translate-y-0.5"
                >
                  Explore Courses <ArrowRight size={16} />
                </a>
                <a
                  href="#query"
                  className="inline-flex items-center gap-2 border border-ink/15 text-ink hover:bg-ink/[0.04] font-medium px-7 py-3.5 rounded-full transition-all duration-200"
                >
                  Get in Touch
                </a>
              </div>
            </Reveal>

            <Reveal delay={0.2}>
              <div className="flex flex-wrap gap-10">
                {[
                  { number: settings.stats.studentsTrained, label: "Students Trained" },
                  { number: settings.stats.coursesOffered, label: "Courses" },
                  { number: settings.stats.yearsExperience, label: "Years Experience" },
                ].map((s) => (
                  <div key={s.label}>
                    <div className="text-2xl font-semibold text-ink tracking-tight">
                      {s.number}
                    </div>
                    <div className="text-ink/45 text-sm">{s.label}</div>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.15} className="hidden lg:block">
            <div className="bg-mist rounded-[32px] p-8 border border-ink/[0.06]">
              <p className="text-ink/40 text-xs font-semibold uppercase tracking-widest mb-5">
                What You&apos;ll Learn
              </p>
              <div className="grid grid-cols-2 gap-3">
                {preview.length > 0
                  ? preview.map((c) => (
                      <div
                        key={c.id}
                        className="bg-white hover:-translate-y-0.5 transition-transform duration-200 p-4 rounded-2xl border border-ink/[0.05]"
                      >
                        <GraduationCap size={22} className="text-accent mb-3" />
                        <div className="text-ink text-sm font-medium leading-snug">
                          {c.title}
                        </div>
                      </div>
                    ))
                  : Array.from({ length: 6 }).map((_, i) => (
                      <div
                        key={i}
                        className="bg-white p-4 rounded-2xl border border-ink/[0.05] h-[86px]"
                      />
                    ))}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
