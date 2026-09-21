"use client";

import { useRef, useState } from "react";
import { RotateCcw, RotateCw } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import type { Course } from "@/lib/data/types";
import { CourseCard } from "@/components/CourseCard";
import {
  angleBetween,
  angleForIndex,
  radialStep,
  stepsFromAngle,
} from "@/lib/interactive/radial";

/**
 * Circular course selector. Items sit evenly around a ring; the focused course
 * rotates to the top and is shown as a full course card below. Rotate the dial
 * like an old rotary phone by dragging around it, or use the buttons/arrow keys.
 * Renders an empty-but-valid container when there are no courses.
 */
export function RadialSelector({ courses }: { courses: Course[] }) {
  const prefersReduced = useReducedMotion();
  const [focus, setFocus] = useState(0);
  const count = courses.length;

  const dialRef = useRef<HTMLDivElement>(null);
  // Center of the dial in client coords, captured at drag start.
  const centerRef = useRef({ x: 0, y: 0 });
  // Angle (deg) accumulated during the current drag, and the focus it started from.
  const dragAngleRef = useRef(0);
  const dragStartFocusRef = useRef(0);
  const lastVecRef = useRef({ x: 0, y: 0 });
  const draggingRef = useRef(false);
  // Total absolute angle turned, used to tell a tap from a rotate.
  const movedRef = useRef(0);

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

  // --- Rotary dial rotation via native pointer events (works when the press
  // starts on a course button, so you can "spin" the wheel by a button). ---
  function onPointerDown(e: React.PointerEvent) {
    const rect = dialRef.current?.getBoundingClientRect();
    if (!rect) return;
    centerRef.current = { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 };
    dragAngleRef.current = 0;
    movedRef.current = 0;
    dragStartFocusRef.current = focus;
    draggingRef.current = true;
    lastVecRef.current = {
      x: e.clientX - centerRef.current.x,
      y: e.clientY - centerRef.current.y,
    };
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  }

  function onPointerMove(e: React.PointerEvent) {
    if (!draggingRef.current) return;
    const c = centerRef.current;
    const vec = { x: e.clientX - c.x, y: e.clientY - c.y };
    const delta = angleBetween(lastVecRef.current.x, lastVecRef.current.y, vec.x, vec.y);
    lastVecRef.current = vec;
    dragAngleRef.current += delta;
    movedRef.current += Math.abs(delta);
    // Screen-y grows downward, so a clockwise drag should advance the focus.
    const steps = stepsFromAngle(-dragAngleRef.current, count);
    setFocus(radialStep(dragStartFocusRef.current, steps, count));
  }

  function endDrag(e: React.PointerEvent) {
    draggingRef.current = false;
    try {
      (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId);
    } catch {
      // pointer may already be released
    }
  }

  // A button click only selects when the gesture was a tap, not a spin.
  function selectIfTap(index: number) {
    if (movedRef.current < 8) setFocus(index);
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
      <h3 className="text-lg font-semibold text-ink tracking-tight mb-2">Explore by course</h3>
      <p className="text-ink/45 text-sm mb-8">Spin the dial or tap a course</p>

      <div
        ref={dialRef}
        role="group"
        aria-label="Radial course selector"
        tabIndex={0}
        onKeyDown={onKeyDown}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        className="relative w-[300px] max-w-full h-[300px] focus:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-full touch-none cursor-grab active:cursor-grabbing"
      >
        <motion.div
          className="absolute inset-0"
          animate={{ rotate: ringRotation }}
          transition={
            prefersReduced ? { duration: 0 } : { type: "spring", stiffness: 120, damping: 18 }
          }
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
                onClick={() => selectIfTap(index)}
                aria-label={`Show ${course.title}`}
                aria-current={isActive}
                className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-14 h-14 rounded-full text-[11px] font-medium flex items-center justify-center text-center px-1 leading-tight transition-colors ${
                  isActive ? "bg-accent text-white" : "bg-mist text-ink/60 hover:bg-ink/[0.06]"
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

      {/* Full course card for the focused course, same as the grid cards above */}
      <div className="w-full max-w-sm mt-10">
        <CourseCard key={active.id} course={active} />
      </div>
    </div>
  );
}
