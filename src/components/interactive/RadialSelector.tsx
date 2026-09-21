"use client";

import { useRef, useState } from "react";
import { RotateCcw, RotateCw } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import type { Course } from "@/lib/data/types";
import { CourseCard } from "@/components/CourseCard";
import BlobField from "@/components/interactive/BlobField";
import { iconForCourse } from "@/lib/interactive/courseIcon";
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
  const radius = 148;
  const active = courses[focus];
  const ActiveIcon = iconForCourse(active.title);
  const moduleCode = `MODULE #${String(focus + 1).padStart(2, "0")}`;

  return (
    <div className="relative section flex flex-col items-center overflow-hidden">
      <BlobField />

      <div className="relative z-10 flex flex-col items-center w-full">
        <span className="eyebrow uppercase mb-2">Explore</span>
        <h3 className="text-2xl font-semibold text-ink tracking-tight mb-1">
          Find your course
        </h3>
        <p className="text-ink/45 text-sm mb-8">Spin the dial or tap a course</p>

        <div className="relative w-[340px] max-w-full h-[340px] sm:w-[420px] sm:h-[420px] flex items-center justify-center">
          {/* Fixed top stopper pin (12 o'clock) */}
          <div className="absolute -top-2 z-30 flex flex-col items-center pointer-events-none">
            <div className="glass w-4 h-6 rounded-t-md border border-ink/15 shadow-lg flex items-center justify-center">
              <div className="w-1 h-3 rounded-full bg-ink/25" />
            </div>
            <div className="w-0.5 h-2 bg-ink/20" />
          </div>

          {/* Concentric ambient rings */}
          <div className="absolute inset-0 rounded-full border border-dashed border-accent/15" />
          <div className="absolute inset-4 rounded-full border border-ink/[0.06]" />
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-52 h-52 rounded-full bg-accent/10 blur-3xl" />
          </div>

          {/* Rotary wheel */}
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
            className="absolute inset-0 rounded-full touch-none cursor-grab active:cursor-grabbing focus:outline-none"
          >
            <motion.div
              className="absolute inset-0"
              animate={{ rotate: ringRotation }}
              transition={
                prefersReduced ? { duration: 0 } : { type: "spring", stiffness: 120, damping: 18 }
              }
            >
              {courses.map((course, index) => {
                const itemAngle = angleForIndex(index, count);
                const angle = (itemAngle * Math.PI) / 180;
                const x = Math.cos(angle) * radius;
                const y = Math.sin(angle) * radius;
                const isActive = index === focus;
                const Icon = iconForCourse(course.title);
                return (
                  // Outer div handles positioning (translate); inner motion.button
                  // only animates scale/opacity so framer doesn't clobber the
                  // translate transform.
                  <div
                    key={course.id}
                    className="absolute top-1/2 left-1/2 w-16 h-16"
                    style={{
                      transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
                    }}
                  >
                    <motion.button
                      type="button"
                      onClick={() => selectIfTap(index)}
                      aria-label={`Show ${course.title}`}
                      aria-current={isActive}
                      animate={{ scale: isActive ? 1.12 : 0.94, opacity: isActive ? 1 : 0.72 }}
                      transition={{ type: "spring", stiffness: 300, damping: 22 }}
                      className={`dial-hole w-16 h-16 rounded-full flex items-center justify-center ${
                        isActive ? "dial-hole--active text-white" : "text-ink/70"
                      }`}
                    >
                      {/* Content tilts tangentially with the wheel, like the reference */}
                      <span
                        className="flex flex-col items-center justify-center"
                        style={{ transform: `rotate(${itemAngle}deg)` }}
                      >
                        <Icon size={16} className="mb-0.5" />
                        <span className="text-[10px] font-semibold leading-none">
                          {course.title.split(" ")[0]}
                        </span>
                      </span>
                    </motion.button>
                  </div>
                );
              })}
            </motion.div>
          </div>

          {/* Center display card */}
          <div className="absolute w-[190px] h-[190px] sm:w-[220px] sm:h-[220px] rounded-full glass bg-surface/90 border border-ink/[0.08] shadow-2xl z-20 flex flex-col items-center justify-center text-center px-6 pointer-events-none">
            <AnimatePresence mode="wait">
              <motion.div
                key={active.id}
                initial={{ opacity: 0, scale: 0.94 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.94 }}
                transition={{ duration: 0.2 }}
                className="flex flex-col items-center"
              >
                <span className="text-[10px] uppercase font-mono tracking-[0.2em] text-accent/80 mb-1">
                  Selected Course
                </span>
                <h4 className="text-lg sm:text-xl font-bold text-ink leading-tight mb-1">
                  {active.title}
                </h4>
                <p className="text-xs text-ink/50 mb-2.5">{active.duration}</p>
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-mist border border-ink/10 text-[10px] font-mono text-ink/70">
                  <ActiveIcon size={12} className="text-accent" />
                  {moduleCode}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        <div className="flex items-center gap-4 mt-8">
          <motion.button
            type="button"
            onClick={() => step(-1)}
            aria-label="Rotate to previous course"
            whileHover={prefersReduced ? undefined : { scale: 1.1, rotate: -15 }}
            whileTap={{ scale: 0.9 }}
            className="glass p-3 rounded-full border border-ink/10 text-ink/70 hover:text-accent"
          >
            <RotateCcw size={18} />
          </motion.button>
          <span className="glass px-3 py-1.5 rounded-full border border-ink/10 text-xs font-mono text-ink/50 tabular-nums">
            <span className="text-accent font-bold">{focus + 1}</span> / {count}
          </span>
          <motion.button
            type="button"
            onClick={() => step(1)}
            aria-label="Rotate to next course"
            whileHover={prefersReduced ? undefined : { scale: 1.1, rotate: 15 }}
            whileTap={{ scale: 0.9 }}
            className="glass p-3 rounded-full border border-ink/10 text-ink/70 hover:text-accent"
          >
            <RotateCw size={18} />
          </motion.button>
        </div>

        {/* Full course card for the focused course, same as the grid cards above */}
        <div className="w-full max-w-sm mt-12">
          <AnimatePresence mode="wait">
            <motion.div
              key={active.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            >
              <CourseCard course={active} />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
