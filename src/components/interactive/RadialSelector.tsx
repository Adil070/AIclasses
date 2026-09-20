"use client";

import { useState } from "react";
import { RotateCcw, RotateCw } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import type { Course } from "@/lib/data/types";
import { angleForIndex, radialStep } from "@/lib/interactive/radial";

/**
 * Circular course selector. Items are arranged evenly around a ring; the focus
 * course rotates to the top. Rotate with the buttons or arrow keys. Renders an
 * empty-but-valid container when there are no courses.
 */
export function RadialSelector({ courses }: { courses: Course[] }) {
  const prefersReduced = useReducedMotion();
  const [focus, setFocus] = useState(0);
  const count = courses.length;

  function step(delta: number) {
    setFocus((current) => radialStep(current, delta, count));
  }

  function onKeyDown(e: React.KeyboardEvent) {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      step(1);
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      step(-1);
    }
  }

  if (count === 0) {
    return <div className="section" aria-hidden="true" />;
  }

  // Rotate the whole ring so the focused item sits at the top (-90deg).
  const ringRotation = -angleForIndex(focus, count) - 90;
  const radius = 110;
  const active = courses[focus];

  return (
    <div className="section flex flex-col items-center overflow-hidden">
      <h3 className="text-lg font-semibold text-ink tracking-tight mb-8">Explore by course</h3>

      <div
        role="group"
        aria-label="Radial course selector"
        tabIndex={0}
        onKeyDown={onKeyDown}
        className="relative w-[300px] max-w-full h-[300px] focus:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-full"
      >
        <motion.div
          className="absolute inset-0"
          animate={{ rotate: ringRotation }}
          transition={prefersReduced ? { duration: 0 } : { type: "spring", stiffness: 120, damping: 18 }}
        >
          {courses.map((course, index) => {
            const angle = (angleForIndex(index, count) * Math.PI) / 180;
            const x = Math.cos(angle) * radius;
            const y = Math.sin(angle) * radius;
            const isActive = index === focus;
            return (
              <button
                type="button"
                key={course.id}
                onClick={() => setFocus(index)}
                aria-label={`Show ${course.title}`}
                aria-current={isActive}
                className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-14 h-14 rounded-full text-[11px] font-medium flex items-center justify-center text-center px-1 leading-tight transition-colors ${
                  isActive ? "bg-ink text-white" : "bg-mist text-ink/60 hover:bg-ink/[0.06]"
                }`}
                style={{
                  transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px)) rotate(${-ringRotation}deg)`,
                }}
              >
                {course.title.split(" ")[0]}
              </button>
            );
          })}
        </motion.div>

        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="text-center px-6">
            <p className="text-sm font-semibold text-ink tracking-tight">{active.title}</p>
            <p className="text-xs text-ink/50 mt-1">{active.duration}</p>
          </div>
        </div>
      </div>

      <div className="flex gap-3 mt-8">
        <button
          type="button"
          onClick={() => step(-1)}
          aria-label="Rotate to previous course"
          className="p-2.5 rounded-full border border-ink/10 hover:bg-ink/[0.04]"
        >
          <RotateCcw size={18} />
        </button>
        <button
          type="button"
          onClick={() => step(1)}
          aria-label="Rotate to next course"
          className="p-2.5 rounded-full border border-ink/10 hover:bg-ink/[0.04]"
        >
          <RotateCw size={18} />
        </button>
      </div>
    </div>
  );
}
