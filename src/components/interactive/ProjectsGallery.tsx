"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, GraduationCap } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { clampIndex } from "@/lib/interactive/bounds";

export interface ProjectItem {
  title: string;
  student: string;
  imageUrl?: string;
}

/**
 * Swipeable student projects gallery. Navigate by swipe, buttons, or arrow
 * keys; the active index is always bounded. Renders an empty-but-valid
 * container when there are no projects.
 */
export function ProjectsGallery({ projects }: { projects: ProjectItem[] }) {
  const prefersReduced = useReducedMotion();
  const [index, setIndex] = useState(0);

  function go(delta: number) {
    setIndex((current) => clampIndex(current + delta, projects.length));
  }

  function onKeyDown(e: React.KeyboardEvent) {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      go(1);
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      go(-1);
    }
  }

  if (projects.length === 0) {
    return <section aria-hidden="true" />;
  }

  const project = projects[index];

  return (
    <section className="section-y bg-mist">
      <div className="section max-w-2xl">
        <h2 className="text-3xl md:text-4xl font-semibold text-ink tracking-tight mb-8 text-center">
          Student projects
        </h2>

        <div
          role="group"
          aria-label="Student projects gallery"
          aria-roledescription="carousel"
          tabIndex={0}
          onKeyDown={onKeyDown}
          className="relative rounded-3xl overflow-hidden bg-white border border-ink/[0.06] focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              drag={prefersReduced ? false : "x"}
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.2}
              onDragEnd={(_, info) => {
                if (info.offset.x < -60) go(1);
                else if (info.offset.x > 60) go(-1);
              }}
              initial={{ opacity: 0, x: prefersReduced ? 0 : 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: prefersReduced ? 0 : -40 }}
              transition={{ duration: prefersReduced ? 0 : 0.3, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="relative h-56 bg-mist flex items-center justify-center">
                {project.imageUrl ? (
                  <Image src={project.imageUrl} alt={project.title} fill className="object-cover" />
                ) : (
                  <GraduationCap size={40} className="text-ink/20" />
                )}
              </div>
              <div className="p-6">
                <p className="font-semibold text-ink tracking-tight">{project.title}</p>
                <p className="text-sm text-ink/55 mt-1">by {project.student}</p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="flex items-center justify-center gap-3 mt-6">
          <button
            type="button"
            onClick={() => go(-1)}
            aria-label="Previous project"
            className="p-2.5 rounded-full border border-ink/10 bg-white hover:bg-ink/[0.04]"
          >
            <ChevronLeft size={18} />
          </button>
          <span className="text-sm text-ink/50 tabular-nums">
            {index + 1} / {projects.length}
          </span>
          <button
            type="button"
            onClick={() => go(1)}
            aria-label="Next project"
            className="p-2.5 rounded-full border border-ink/10 bg-white hover:bg-ink/[0.04]"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </section>
  );
}
