"use client";

import { useRef, useState } from "react";
import { CheckCircle2 } from "lucide-react";
import { motion, useMotionValueEvent, useReducedMotion, useScroll } from "framer-motion";
import { stepForProgress } from "@/lib/interactive/progression";

export interface ProgressionStep {
  label: string;
  description: string;
}

/**
 * Scroll-driven learning journey. As the user scrolls through the tall section,
 * the active step advances. Under reduced motion, all steps render as a static
 * readable list.
 */
export function ScrollProgression({ steps }: { steps: ProgressionStep[] }) {
  const prefersReduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });
  const [active, setActive] = useState(0);

  useMotionValueEvent(scrollYProgress, "change", (value) => {
    setActive(stepForProgress(value, steps.length));
  });

  if (steps.length === 0) {
    return <section aria-hidden="true" />;
  }

  if (prefersReduced) {
    return (
      <section className="section-y bg-white">
        <div className="section max-w-2xl">
          <h2 className="text-3xl font-semibold text-ink tracking-tight mb-8">
            Your learning journey
          </h2>
          <ol className="space-y-6">
            {steps.map((s) => (
              <li key={s.label} className="flex gap-4">
                <CheckCircle2 className="text-accent shrink-0 mt-1" size={20} />
                <div>
                  <p className="font-medium text-ink">{s.label}</p>
                  <p className="text-ink/55 text-sm">{s.description}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>
    );
  }

  return (
    <section ref={ref} className="relative bg-white" style={{ height: `${steps.length * 40}vh` }}>
      <div className="sticky top-0 h-screen flex items-center overflow-hidden">
        <div className="section w-full">
          <h2 className="text-3xl md:text-4xl font-semibold text-ink tracking-tight mb-8 text-center">
            Your learning journey
          </h2>
          <div className="max-w-xl mx-auto space-y-4">
            {steps.map((s, i) => {
              const isActive = i === active;
              return (
                <motion.div
                  key={s.label}
                  animate={{
                    opacity: isActive ? 1 : 0.35,
                    scale: isActive ? 1 : 0.97,
                  }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className={`flex gap-4 p-5 rounded-2xl border ${
                    isActive ? "border-accent/30 bg-accent/[0.04]" : "border-ink/[0.06]"
                  }`}
                >
                  <div
                    className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                      isActive ? "bg-accent text-white" : "bg-mist text-ink/50"
                    }`}
                  >
                    {i + 1}
                  </div>
                  <div>
                    <p className="font-medium text-ink">{s.label}</p>
                    <p className="text-ink/55 text-sm">{s.description}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
