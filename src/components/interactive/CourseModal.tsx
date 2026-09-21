"use client";

import { useEffect } from "react";
import { createPortal } from "react-dom";
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

/**
 * Full course detail modal, rendered in a portal on document.body so it is
 * never trapped inside a transformed (3D tilt) ancestor. Controlled by the
 * parent so only one modal is ever open at a time.
 */
export function CourseModal({
  course,
  onClose,
}: {
  course: Course | null;
  onClose: () => void;
}) {
  useEffect(() => {
    if (!course) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKeyDown);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = prevOverflow;
    };
  }, [course, onClose]);

  if (typeof document === "undefined") return null;

  const details = course
    ? [
        { icon: Clock, label: "Duration", value: course.duration },
        { icon: Signal, label: "Level", value: course.level },
        { icon: Laptop2, label: "Mode", value: course.mode },
        { icon: IndianRupee, label: "Fee", value: course.fee },
        { icon: UserCheck, label: "Eligibility", value: course.eligibility },
        { icon: Award, label: "Certification", value: course.certification },
      ].filter((d) => d.value)
    : [];

  return createPortal(
    <AnimatePresence>
      {course && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <motion.div
            className="absolute inset-0 bg-ink/60 backdrop-blur-sm"
            onClick={onClose}
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
            className="relative bg-surface rounded-3xl max-w-lg w-full max-h-[85vh] overflow-y-auto"
          >
            <button
              type="button"
              onClick={onClose}
              aria-label="Close"
              className="absolute top-4 right-4 z-10 bg-surface/90 hover:bg-surface rounded-full p-2 shadow-sm"
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
                <span className="absolute top-4 left-4 bg-accent text-white text-[10px] font-semibold uppercase tracking-wide px-2.5 py-1 rounded-full">
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
                  <div key={d.label} className="flex items-start gap-2.5 bg-mist rounded-xl p-3.5">
                    <d.icon size={16} className="text-accent shrink-0 mt-0.5" />
                    <div className="min-w-0">
                      <p className="text-[11px] uppercase tracking-wide text-ink/40 mb-0.5">
                        {d.label}
                      </p>
                      <p className="text-sm text-ink/80 font-medium">{d.value}</p>
                    </div>
                  </div>
                ))}
              </div>

              {course.highlights?.length > 0 && (
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
                onClick={onClose}
                className="inline-flex items-center gap-2 bg-accent hover:bg-accent-dark text-white font-medium px-6 py-3 rounded-full transition-all duration-200"
              >
                Enquire About This Course <ArrowRight size={15} />
              </a>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}
