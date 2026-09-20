"use client";

import { useEffect, useRef, useState } from "react";
import { animate, useInView, useReducedMotion } from "framer-motion";
import { formatStat, parseStatValue } from "@/lib/interactive/counter";

/**
 * Animated stat number. Counts from 0 up to the numeric portion of `value`
 * when it scrolls into view, preserving any non-numeric decorators (e.g. "+",
 * "%"). Renders the final value immediately when reduced motion is preferred or
 * when the value contains no number.
 */
export function Counter({
  value,
  className,
  durationMs = 1400,
}: {
  value: string;
  className?: string;
  durationMs?: number;
}) {
  const parsed = parseStatValue(value);
  const prefersReduced = useReducedMotion();
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const [display, setDisplay] = useState(() =>
    parsed.hasNumber && !prefersReduced ? formatStat(parsed, 0) : formatStat(parsed, parsed.target)
  );

  useEffect(() => {
    if (!parsed.hasNumber || prefersReduced) {
      setDisplay(formatStat(parsed, parsed.target));
      return;
    }
    if (!inView) return;
    const controls = animate(0, parsed.target, {
      duration: durationMs / 1000,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (latest) => setDisplay(formatStat(parsed, latest)),
    });
    return () => controls.stop();
    // parsed is derived from `value`; depend on the primitive value instead.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, inView, prefersReduced, durationMs]);

  return (
    <span ref={ref} className={className}>
      {display}
    </span>
  );
}
