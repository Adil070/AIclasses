"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";

/**
 * Hero status pill with a pulsing green dot and text that rotates through a
 * few lines (fades out/in). Falls back to a single static line under reduced
 * motion. The first line is caller-provided so it can carry CMS content.
 */
export default function LiveBadge({ lines }: { lines: string[] }) {
  const reduce = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (reduce || lines.length <= 1) return;
    const timer = setInterval(() => {
      setVisible(false);
      const swap = setTimeout(() => {
        setIndex((i) => (i + 1) % lines.length);
        setVisible(true);
      }, 300);
      return () => clearTimeout(swap);
    }, 4200);
    return () => clearInterval(timer);
  }, [reduce, lines.length]);

  return (
    <div className="glass inline-flex items-center gap-2.5 bg-ink/[0.04] text-ink/70 dark:text-ink/80 text-[13px] font-medium px-4 py-1.5 rounded-full mb-7 border border-transparent">
      <span className="live-dot inline-block w-2 h-2 rounded-full bg-[#34c759] shrink-0" />
      <span
        className="transition-opacity duration-300"
        style={{ opacity: visible ? 1 : 0 }}
      >
        {lines[index]}
      </span>
    </div>
  );
}
