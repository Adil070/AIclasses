import Image from "next/image";
import { Clock, GraduationCap, Signal } from "lucide-react";
import type { Course } from "@/lib/data/types";
import { Reveal } from "@/components/motion/Reveal";

export default function Courses({ courses }: { courses: Course[] }) {
  return (
    <section id="courses" className="section-y bg-white">
      <div className="section">
        <Reveal className="text-center mb-16">
          <span className="eyebrow uppercase">Our Specialities</span>
          <h2 className="text-4xl md:text-5xl font-semibold text-ink mt-3 mb-4 tracking-tight">
            Courses That Build Careers
          </h2>
          <p className="text-ink/50 text-lg max-w-2xl mx-auto">
            Practical, industry-focused courses designed to get you job-ready from day one.
          </p>
        </Reveal>

        {courses.length === 0 ? (
          <p className="text-center text-ink/40">Courses coming soon.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {courses.map((c, i) => (
              <Reveal key={c.id} delay={(i % 4) * 0.06}>
                <div className="relative rounded-3xl border border-ink/[0.06] overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.12)] h-full flex flex-col">
                  <div className="relative h-36 bg-mist flex items-center justify-center">
                    {c.imageUrl ? (
                      <Image
                        src={c.imageUrl}
                        alt={c.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 50vw, 25vw"
                      />
                    ) : (
                      <GraduationCap size={32} className="text-ink/20" />
                    )}
                    {c.badge && (
                      <span className="absolute top-3 right-3 bg-ink text-white text-[10px] font-semibold uppercase tracking-wide px-2.5 py-1 rounded-full">
                        {c.badge}
                      </span>
                    )}
                  </div>
                  <div className="p-6 flex flex-col flex-1">
                    <h3 className="font-semibold text-ink text-base mb-2 tracking-tight">
                      {c.title}
                    </h3>
                    <p className="text-ink/50 text-sm mb-4 leading-relaxed flex-1">
                      {c.description}
                    </p>
                    <div className="flex items-center justify-between text-xs text-ink/40 pt-3 border-t border-ink/[0.06]">
                      <span className="flex items-center gap-1.5">
                        <Clock size={12} /> {c.duration}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Signal size={12} /> {c.level}
                      </span>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
