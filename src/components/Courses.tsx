import type { Course } from "@/lib/data/types";
import { Reveal } from "@/components/motion/Reveal";
import { CourseCard } from "@/components/CourseCard";

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
                <CourseCard course={c} />
              </Reveal>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
