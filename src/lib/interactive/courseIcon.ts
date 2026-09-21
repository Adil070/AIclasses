import {
  BookOpen,
  Calculator,
  Code,
  Cpu,
  FileText,
  Monitor,
  Palette,
  Printer,
  Terminal,
  type LucideIcon,
} from "lucide-react";

/**
 * Pick a representative icon for a course from keywords in its title. Falls
 * back to a generic book icon. Pure and deterministic so it can be reused
 * anywhere a course needs a glyph (e.g. the rotary selector).
 */
export function iconForCourse(title: string): LucideIcon {
  const t = title.toLowerCase();
  if (t.includes("graphic") || t.includes("design")) return Palette;
  if (t.includes("web")) return Code;
  if (t.includes("python") || t.includes("programming")) return Terminal;
  if (t.includes("tally") || t.includes("account") || t.includes("gst")) return Calculator;
  if (t.includes("hardware") || t.includes("network")) return Cpu;
  if (t.includes("office") || t.includes("ms ")) return FileText;
  if (t.includes("dtp") || t.includes("data entry") || t.includes("print")) return Printer;
  if (t.includes("basic") || t.includes("computer")) return Monitor;
  return BookOpen;
}
