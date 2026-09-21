"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import type { Testimonial } from "@/lib/data/types";
import { Reveal } from "@/components/motion/Reveal";

const AVATAR_TONES = [
  "bg-blue-50 text-blue-700",
  "bg-purple-50 text-purple-700",
  "bg-green-50 text-green-700",
  "bg-orange-50 text-orange-700",
  "bg-pink-50 text-pink-700",
  "bg-indigo-50 text-indigo-700",
];

const PREVIEW_COUNT = 2;
const CLAMP_LENGTH = 180; // chars before "Read more" appears

function Stars({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: count }).map((_, i) => (
        <span key={i} className="text-amber-400 text-lg">
          ★
        </span>
      ))}
    </div>
  );
}

function ReviewText({ text }: { text: string }) {
  const [expanded, setExpanded] = useState(false);
  const isLong = text.length > CLAMP_LENGTH;
  const shown = expanded || !isLong ? text : `${text.slice(0, CLAMP_LENGTH).trimEnd()}…`;

  return (
    <p className="text-ink/70 mt-4 mb-6 leading-relaxed text-sm">
      &ldquo;{shown}&rdquo;
      {isLong && (
        <button
          type="button"
          onClick={() => setExpanded((v) => !v)}
          className="ml-1 text-blue-600 font-medium hover:underline"
        >
          {expanded ? "Read less" : "Read more"}
        </button>
      )}
    </p>
  );
}

function Card({ r, tone }: { r: Testimonial; tone: string }) {
  return (
    <div className="bg-mist rounded-3xl p-6 border border-ink/[0.05] h-full">
      <Stars count={r.rating} />
      <ReviewText text={r.review} />
      <div className="flex items-center gap-3 pt-4 border-t border-ink/[0.06]">
        <div
          className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold text-sm ${tone}`}
        >
          {r.avatarInitials}
        </div>
        <div>
          <div className="font-medium text-ink text-sm">{r.name}</div>
          <div className="text-ink/40 text-xs">{r.course}</div>
        </div>
      </div>
    </div>
  );
}

export default function TestimonialsList({ testimonials }: { testimonials: Testimonial[] }) {
  const [open, setOpen] = useState(false);
  const preview = testimonials.slice(0, PREVIEW_COUNT);
  const hasMore = testimonials.length > PREVIEW_COUNT;

  // Lock body scroll while the modal is open, and close on Escape.
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
        {preview.map((r, i) => (
          <Reveal key={r.id} delay={(i % 2) * 0.08}>
            <Card r={r} tone={AVATAR_TONES[i % AVATAR_TONES.length]} />
          </Reveal>
        ))}
      </div>

      {hasMore && (
        <div className="mt-8 text-center">
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="inline-flex items-center bg-accent text-white font-semibold px-7 py-3 rounded-full text-sm hover:bg-accent-dark transition"
          >
            Show all {testimonials.length} reviews
          </button>
        </div>
      )}

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            role="dialog"
            aria-modal="true"
            aria-label="All student reviews"
          >
            <div
              className="absolute inset-0 bg-ink/60 backdrop-blur-sm"
              onClick={() => setOpen(false)}
            />
            <motion.div
              className="relative bg-surface rounded-3xl w-full max-w-2xl max-h-[85vh] flex flex-col shadow-xl"
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              <div className="flex items-center justify-between px-6 py-4 border-b border-ink/[0.06]">
                <h3 className="text-lg font-semibold text-ink tracking-tight">
                  Student Reviews
                </h3>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  aria-label="Close"
                  className="p-2 rounded-full hover:bg-mist transition text-ink/60"
                >
                  <X size={18} />
                </button>
              </div>

              <div className="overflow-y-auto p-6 grid grid-cols-1 sm:grid-cols-2 gap-5">
                {testimonials.map((r, i) => (
                  <Card key={r.id} r={r} tone={AVATAR_TONES[i % AVATAR_TONES.length]} />
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
