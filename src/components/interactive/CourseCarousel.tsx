"use client";

import { useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useReducedMotion } from "framer-motion";
import type { Course } from "@/lib/data/types";
import { CoursePreviewCard } from "@/components/interactive/CoursePreviewCard";
import { CourseModal } from "@/components/interactive/CourseModal";
import { clampIndex } from "@/lib/interactive/bounds";

/**
 * Horizontally swipeable/scrollable course list with keyboard navigation.
 * A single detail modal is shared across all cards so only one opens at a time.
 * Renders an empty-but-valid container when there are no courses.
 */
export function CourseCarousel({ courses }: { courses: Course[] }) {
  const prefersReduced = useReducedMotion();
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [openCourse, setOpenCourse] = useState<Course | null>(null);

  function scrollToIndex(index: number) {
    const next = clampIndex(index, courses.length);
    setActive(next);
    const track = trackRef.current;
    const child = track?.children[next] as HTMLElement | undefined;
    if (child) {
      child.scrollIntoView({
        behavior: prefersReduced ? "auto" : "smooth",
        inline: "center",
        block: "nearest",
      });
    }
  }

  function onKeyDown(e: React.KeyboardEvent) {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      scrollToIndex(active + 1);
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      scrollToIndex(active - 1);
    }
  }

  if (courses.length === 0) {
    return <div className="section" aria-hidden="true" />;
  }

  return (
    <div className="section">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h3 className="text-xl font-semibold text-ink tracking-tight">Browse courses</h3>
          <p className="text-ink/45 text-sm mt-0.5">Swipe to explore, tap a card for details</p>
        </div>
        <div className="flex gap-2 shrink-0">
          <button
            type="button"
            onClick={() => scrollToIndex(active - 1)}
            aria-label="Previous course"
            className="p-2.5 rounded-full border border-ink/10 hover:bg-ink/[0.04] active:scale-95 transition"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            type="button"
            onClick={() => scrollToIndex(active + 1)}
            aria-label="Next course"
            className="p-2.5 rounded-full border border-ink/10 hover:bg-ink/[0.04] active:scale-95 transition"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>

      <div
        ref={trackRef}
        role="group"
        aria-label="Course carousel"
        tabIndex={0}
        onKeyDown={onKeyDown}
        className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-2xl [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {courses.map((course) => (
          <div key={course.id} className="snap-center shrink-0 w-[260px] sm:w-[280px]">
            <CoursePreviewCard course={course} onOpen={() => setOpenCourse(course)} />
          </div>
        ))}
      </div>

      <CourseModal course={openCourse} onClose={() => setOpenCourse(null)} />
    </div>
  );
}
