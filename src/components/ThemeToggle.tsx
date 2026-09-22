"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Moon, Sun } from "lucide-react";

/**
 * iOS-style sliding theme switch. The track recolors between a warm daytime
 * sky and a starry night; the knob springs across with a sun/moon crossfade.
 * Toggles the `.dark` class on <html> and persists the choice.
 */
export default function ThemeToggle({ className = "" }: { className?: string }) {
  const [dark, setDark] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setDark(document.documentElement.classList.contains("dark"));
  }, []);

  const toggle = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
    try {
      localStorage.setItem("theme", next ? "dark" : "light");
    } catch {
      // ignore storage failures (private mode, etc.)
    }
  };

  // Avoid a hydration flash: render a neutral track until mounted.
  const isDark = mounted && dark;

  return (
    <button
      type="button"
      role="switch"
      aria-checked={isDark}
      onClick={toggle}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className={`group relative h-8 w-[60px] rounded-full p-1 overflow-hidden border transition-colors duration-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent ${
        isDark
          ? "border-white/15 bg-gradient-to-b from-[#0b1030] to-[#1b1145]"
          : "border-black/10 bg-gradient-to-b from-[#8ec7ff] to-[#c9e6ff]"
      } ${className}`}
    >
      {/* Ambient glow that follows the theme */}
      <span
        className={`pointer-events-none absolute inset-0 transition-opacity duration-500 ${
          isDark ? "opacity-100" : "opacity-0"
        }`}
      >
        {/* Stars for night */}
        <span className="absolute left-2 top-1.5 h-0.5 w-0.5 rounded-full bg-white/80" />
        <span className="absolute left-4 top-4 h-[3px] w-[3px] rounded-full bg-white/60" />
        <span className="absolute left-6 top-2 h-0.5 w-0.5 rounded-full bg-white/70" />
      </span>
      {/* A soft cloud for day */}
      <span
        className={`pointer-events-none absolute right-2 top-2 h-2 w-4 rounded-full bg-white/80 blur-[1px] transition-opacity duration-500 ${
          isDark ? "opacity-0" : "opacity-100"
        }`}
      />

      {/* Sliding knob */}
      <motion.span
        className="relative z-10 flex h-6 w-6 items-center justify-center rounded-full shadow-md"
        animate={{
          x: isDark ? 28 : 0,
          backgroundColor: isDark ? "#e8ecff" : "#fff6d6",
          boxShadow: isDark
            ? "0 0 10px 2px rgba(160,170,255,0.7)"
            : "0 0 12px 3px rgba(255,196,64,0.75)",
        }}
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
      >
        <AnimatePresence mode="wait" initial={false}>
          {isDark ? (
            <motion.span
              key="moon"
              initial={{ rotate: -90, opacity: 0, scale: 0.5 }}
              animate={{ rotate: 0, opacity: 1, scale: 1 }}
              exit={{ rotate: 90, opacity: 0, scale: 0.5 }}
              transition={{ duration: 0.2 }}
            >
              <Moon size={14} className="text-[#3a3f7a] fill-[#3a3f7a]" />
            </motion.span>
          ) : (
            <motion.span
              key="sun"
              initial={{ rotate: 90, opacity: 0, scale: 0.5 }}
              animate={{ rotate: 0, opacity: 1, scale: 1 }}
              exit={{ rotate: -90, opacity: 0, scale: 0.5 }}
              transition={{ duration: 0.2 }}
            >
              <Sun size={14} className="text-[#f5a623] fill-[#f5a623]" />
            </motion.span>
          )}
        </AnimatePresence>
      </motion.span>
    </button>
  );
}
