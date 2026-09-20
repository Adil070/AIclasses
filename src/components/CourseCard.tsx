"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  Award,
  CheckCircle2,
  Clock,
  GraduationCap,
  IndianRupee,
  Laptop2,
  Signal,
  UserCheck,
  X,
} from "lucide-react";
import type { Course } from "@/lib/data/types";

export function CourseCard({ course }: { course: Course }) {
  const [open, setOpen] = useState(false);

  const details = [
    { icon: Clock, label: "Duration", value: course.duration },
    { icon: Signal, label: "Level", value: course.level },
    { icon: Laptop2, label: "Mode", value: course.mode },
    { icon: IndianRupee, label: "Fee", value: course.fee },
    { icon: UserCheck, label: "Eligibility", value: course.eligibility },
    { icon: Award, label: "Certification", value: course.certification },
  ].filter((d) => d.value);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = prevOverflow;
    };
  }, [open]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="relative rounded-3xl border border-ink/[0.06] overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.12)] h-full flex flex-col text-left w-full"
      >
        <div className="relative h-36 bg-mist flex items-center justify-center">
          {course.imageUrl ? (
            <Image
              src={course.imageUrl}
              alt={course.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 50vw, 25vw"
            />
          ) : (
            <GraduationCap size={32} className="text-ink/20" />
          )}
          {course.badge && (
            <span className="absolute top-3 right-3 bg-ink text-white text-[10px] font-semibold uppercase tracking-wide px-2.5 py-1 rounded-full">
              {course.badge}
            </span>
          )}
        </div>
        <div className="p-6 flex flex-col flex-1">
          <h3 className="font-semibold text-ink text-base mb-2 tracking-tight">
            {course.title}
          </h3>
          <p className="text-ink/50 text-sm mb-4 leading-relaxed flex-1">{course.description}</p>
          <div className="flex items-center justify-between text-xs text-ink/40 pt-3 border-t border-ink/[0.06] mb-3">
            <span className="flex items-center gap-1.5">
              <Clock size={12} /> {course.duration}
            </span>
            <span className="flex items-center gap-1.5">
              <Signal size={12} /> {course.level}
            </span>
          </div>
          <span className="inline-flex items-center gap-1 text-accent text-xs font-medium">
            View details <ArrowRight size={12} />
          </span>
        </div>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <motion.div
              className="absolute inset-0 bg-ink/60 backdrop-blur-sm"
              onClick={() => setOpen(false)}
              aria-hidden="true"
            />
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-labelledby="course-modal-title"
              initial={{ opacity: 0, y: 24, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 12, scale: 0.98 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="relative bg-white rounded-3xl max-w-lg w-full max-h-[85vh] overflow-y-auto"
            >
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close"
                className="absolute top-4 right-4 z-10 bg-white/90 hover:bg-white rounded-full p-2 shadow-sm"
              >
                <X size={18} className="text-ink" />
              </button>

              <div className="relative h-48 bg-mist flex items-center justify-center">
                {course.imageUrl ? (
                  <Image src={course.imageUrl} alt={course.title} fill className="object-cover" />
                ) : (
                  <GraduationCap size={40} className="text-ink/20" />
                )}
                {course.badge && (
                  <span className="absolute top-4 left-4 bg-ink text-white text-[10px] font-semibold uppercase tracking-wide px-2.5 py-1 rounded-full">
                    {course.badge}
                  </span>
                )}
              </div>

              <div className="p-7">
                <h3
                  id="course-modal-title"
                  className="text-2xl font-semibold text-ink tracking-tight mb-3"
                >
                  {course.title}
                </h3>
                <p className="text-ink/60 leading-relaxed mb-6">{course.description}</p>

                <div className="grid grid-cols-2 gap-3 mb-7">
                  {details.map((d) => (
                    <div
                      key={d.label}
                      className="flex items-start gap-2.5 bg-mist rounded-xl p-3.5"
                    >
                      <d.icon size={16} className="text-accent shrink-0 mt-0.5" />
                      <div className="min-w-0">
                        <p className="text-[11px] uppercase tracking-wide text-ink/40 mb-0.5">
                          {d.label}
                        </p>
                        <p className="text-sm text-ink/80 font-medium truncate">{d.value}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {course.highlights.length > 0 && (
                  <div className="mb-8">
                    <p className="text-xs font-semibold uppercase tracking-widest text-ink/40 mb-3">
                      What You&apos;ll Learn
                    </p>
                    <ul className="space-y-2.5">
                      {course.highlights.map((highlight, i) => (
                        <li key={i} className="flex items-start gap-2.5 text-sm text-ink/70">
                          <CheckCircle2 size={16} className="text-accent shrink-0 mt-0.5" />
                          {highlight}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <a
                  href="#query"
                  onClick={() => setOpen(false)}
                  className="inline-flex items-center gap-2 bg-ink hover:bg-black text-white font-medium px-6 py-3 rounded-full transition-all duration-200"
                >
                  Enquire About This Course <ArrowRight size={15} />
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
