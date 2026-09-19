"use client";
import { useState } from "react";
import { Menu, X, Monitor } from "lucide-react";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "Courses", href: "#courses" },
  { label: "Why Us", href: "#why-us" },
  { label: "Reviews", href: "#reviews" },
  { label: "Location", href: "#location" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <a href="#home" className="flex items-center gap-2.5">
            <div className="bg-blue-800 text-white p-2 rounded-lg">
              <Monitor size={20} />
            </div>
            <div className="leading-tight">
              <span
                className="font-bold text-blue-900 text-lg block leading-none font-heading"
              >
                AI Computer
              </span>
              <span className="text-[11px] text-orange-500 font-semibold uppercase tracking-widest">
                Institute
              </span>
            </div>
          </a>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-7">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-slate-600 hover:text-blue-800 font-medium text-sm transition-colors duration-150"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* CTA */}
          <a
            href="#location"
            className="hidden md:inline-flex items-center bg-orange-500 hover:bg-orange-600 text-white font-semibold px-5 py-2.5 rounded-lg text-sm transition-all duration-200 shadow-md hover:shadow-orange-200 hover:shadow-lg"
          >
            Enroll Now
          </a>

          {/* Mobile toggle */}
          <button
            className="md:hidden p-2 text-slate-600 rounded-lg hover:bg-slate-100"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-slate-100 px-4 pt-3 pb-5 space-y-1">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="block text-slate-700 hover:text-blue-800 hover:bg-slate-50 font-medium py-2.5 px-3 rounded-lg"
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <a
            href="#location"
            className="block bg-orange-500 text-white text-center font-semibold px-5 py-3 rounded-lg text-sm mt-3"
            onClick={() => setMenuOpen(false)}
          >
            Enroll Now
          </a>
        </div>
      )}
    </nav>
  );
}
