"use client";

import Image from "next/image";
import { ArrowRight, Clock, GraduationCap, Signal } from "lucide-react";
import type { Course } from "@/lib/data/types";

/**
 * Compact, clean course card used in the carousel. Opening the detail view is
 * delegated to the parent via `onOpen` so only one modal exists at a time.
 */
export function CoursePreviewCard({
  course,
  onOpen,
}: {
  course: Course;
  onOpen: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onOpen}
      className="group relative rounded-3xl border border-ink/[0.08] bg-white overflow-hidden h-full w-full flex flex-col text-left transition-shadow duration-300 hover:shadow-[0_20px_40px_-18px_rgba(0,0,0,0.18)]"
    >
      <div className="relative h-40 bg-mist flex items-center justify-center overflow-hidden">
        {course.imageUrl ? (
          <Image
            src={course.imageUrl}
            alt={course.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="280px"
          />
        ) : (
          <GraduationCap size={34} className="text-ink/20" />
        )}
        {course.badge && (
          <span className="absolute top-3 right-3 bg-ink text-white text-[10px] font-semibold uppercase tracking-wide px-2.5 py-1 rounded-full">
            {course.badge}
          </span>
        )}
      </div>

      <div className="p-5 flex flex-col flex-1">
        <h3 className="font-semibold text-ink text-[15px] mb-1.5 tracking-tight">
          {course.title}
        </h3>
        <p className="text-ink/50 text-[13px] leading-relaxed line-clamp-2 flex-1">
          {course.description}
        </p>

        <div className="flex items-center gap-4 text-xs text-ink/45 mt-4 pt-4 border-t border-ink/[0.06]">
          <span className="flex items-center gap-1.5">
            <Clock size={12} /> {course.duration}
          </span>
          <span className="flex items-center gap-1.5">
            <Signal size={12} /> {course.level}
          </span>
          {course.fee && <span className="ml-auto font-medium text-ink/70">{course.fee}</span>}
        </div>

        <span className="inline-flex items-center gap-1 text-accent text-xs font-medium mt-4">
          View details
          <ArrowRight size={12} className="transition-transform group-hover:translate-x-0.5" />
        </span>
      </div>
    </button>
  );
}
