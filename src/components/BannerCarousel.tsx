"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, type PanInfo } from "framer-motion";
import { Bell, Sparkles, ChevronLeft, ChevronRight } from "lucide-react";
import type { Banner as BannerType } from "@/lib/data/types";

const AUTOPLAY_MS = 5000;
const SWIPE_THRESHOLD = 60; // px of drag needed to change slide

export default function BannerCarousel({ banners }: { banners: BannerType[] }) {
  // direction: 1 = moving forward (next), -1 = moving backward (prev)
  const [[index, direction], setState] = useState<[number, number]>([0, 0]);
  const [paused, setPaused] = useState(false);
  const count = banners.length;

  const paginate = useCallback(
    (dir: number) => {
      setState(([prev]) => [(prev + dir + count) % count, dir]);
    },
    [count]
  );

  const goTo = useCallback(
    (next: number) => {
      setState(([prev]) => [next, next > prev ? 1 : -1]);
    },
    []
  );

  // Autoplay, paused on hover/focus/drag.
  const pausedRef = useRef(paused);
  pausedRef.current = paused;
  useEffect(() => {
    if (count <= 1) return;
    const timer = setInterval(() => {
      if (!pausedRef.current) paginate(1);
    }, AUTOPLAY_MS);
    return () => clearInterval(timer);
  }, [count, paginate]);

  const handleDragEnd = (_: unknown, info: PanInfo) => {
    setPaused(false);
    if (info.offset.x < -SWIPE_THRESHOLD) paginate(1);
    else if (info.offset.x > SWIPE_THRESHOLD) paginate(-1);
  };

  if (count === 0) return null;

  const banner = banners[index];

  const variants = {
    enter: (dir: number) => ({ x: dir > 0 ? "100%" : "-100%", opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({ x: dir > 0 ? "-100%" : "100%", opacity: 0 }),
  };

  return (
    <section
      className="relative overflow-hidden bg-ink"
      aria-roledescription="carousel"
      aria-label="Announcements"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      <div className="relative h-72 sm:h-72 md:h-80 lg:h-96">
        <AnimatePresence initial={false} custom={direction} mode="popLayout">
          <motion.div
            key={banner.id}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 32 },
              opacity: { duration: 0.25 },
            }}
            drag={count > 1 ? "x" : false}
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.18}
            onDragStart={() => setPaused(true)}
            onDragEnd={handleDragEnd}
            className="absolute inset-0 flex items-center cursor-grab active:cursor-grabbing"
          >
            {banner.imageUrl && (
              <Image
                src={banner.imageUrl}
                alt=""
                fill
                className="object-cover pointer-events-none select-none"
                sizes="100vw"
                priority
              />
            )}

            <div className="relative section w-full">
              <div className="flex flex-col md:flex-row items-center justify-between gap-4 md:gap-6 text-white text-center md:text-left">
                <div className="flex items-center gap-5">
                  <div className="hidden sm:flex bg-white/10 rounded-2xl p-3">
                    <Sparkles size={26} className="text-white" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 justify-center md:justify-start mb-1">
                      <Bell size={13} />
                      <span className="text-xs font-semibold uppercase tracking-widest text-white/60">
                        Announcement
                      </span>
                    </div>
                    <h3 className="text-2xl md:text-3xl font-semibold tracking-tight">
                      {banner.title}
                    </h3>
                  </div>
                </div>

                <p className="text-white/70 max-w-sm leading-relaxed text-sm md:text-base break-words line-clamp-3">
                  {banner.message}
                </p>

                {banner.badgeText?.trim() && (
                  <div className="flex-shrink-0">
                    <div className="inline-flex items-center bg-white/15 text-white font-semibold px-6 py-3 rounded-full text-sm border border-white/25 backdrop-blur-md">
                      {banner.badgeText}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {count > 1 && (
        <>
          <button
            type="button"
            onClick={() => paginate(-1)}
            aria-label="Previous announcement"
            className="absolute left-3 top-1/2 -translate-y-1/2 z-10 hidden sm:flex items-center justify-center h-10 w-10 rounded-full bg-white/10 hover:bg-white/20 text-white backdrop-blur transition"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            type="button"
            onClick={() => paginate(1)}
            aria-label="Next announcement"
            className="absolute right-3 top-1/2 -translate-y-1/2 z-10 hidden sm:flex items-center justify-center h-10 w-10 rounded-full bg-white/10 hover:bg-white/20 text-white backdrop-blur transition"
          >
            <ChevronRight size={20} />
          </button>

          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 flex items-center gap-2">
            {banners.map((b, i) => (
              <button
                key={b.id}
                type="button"
                onClick={() => goTo(i)}
                aria-label={`Go to announcement ${i + 1}`}
                aria-current={i === index}
                className={`h-2 rounded-full transition-all ${
                  i === index ? "w-6 bg-white" : "w-2 bg-white/40 hover:bg-white/60"
                }`}
              />
            ))}
          </div>
        </>
      )}
    </section>
  );
}
