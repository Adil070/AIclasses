"use client";

import { useState } from "react";
import { Menu, Monitor, X } from "lucide-react";
import type { SiteSettings } from "@/lib/data/types";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "Courses", href: "#courses" },
  { label: "Why Us", href: "#why-us" },
  { label: "Reviews", href: "#reviews" },
  { label: "Location", href: "#location" },
];

export default function Navbar({ settings }: { settings: SiteSettings }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-xl border-b border-ink/5">
      <div className="section">
        <div className="flex items-center justify-between h-16">
          <a href="#home" className="flex items-center gap-2.5">
            <div className="bg-ink text-white p-2 rounded-lg">
              <Monitor size={18} />
            </div>
            <span className="font-semibold text-ink text-[15px] tracking-tight">
              {settings.instituteName}
            </span>
          </a>

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-[13px] text-ink/60 hover:text-ink font-medium transition-colors duration-150"
              >
                {link.label}
              </a>
            ))}
          </div>

          <a
            href="#query"
            className="hidden md:inline-flex items-center bg-ink hover:bg-black text-white font-medium px-5 py-2 rounded-full text-[13px] transition-colors duration-200"
          >
            Enquire Now
          </a>

          <button
            className="md:hidden p-2 text-ink rounded-lg hover:bg-ink/5"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden bg-white border-t border-ink/5 px-6 pt-3 pb-6 space-y-1">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="block text-ink/70 hover:text-ink hover:bg-ink/5 font-medium py-2.5 px-3 rounded-lg text-sm"
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <a
            href="#query"
            className="block bg-ink text-white text-center font-medium px-5 py-3 rounded-full text-sm mt-3"
            onClick={() => setMenuOpen(false)}
          >
            Enquire Now
          </a>
        </div>
      )}
    </nav>
  );
}
