import { Facebook, Instagram, MapPin, Monitor, Phone, Youtube } from "lucide-react";
import type { Course, SiteSettings } from "@/lib/data/types";

const quickLinks = [
  { label: "Home", href: "#home" },
  { label: "Courses", href: "#courses" },
  { label: "Why Choose Us", href: "#why-us" },
  { label: "Reviews", href: "#reviews" },
  { label: "Location", href: "#location" },
];

export default function Footer({
  settings,
  courses,
}: {
  settings: SiteSettings;
  courses: Course[];
}) {
  const socialLinks = [
    { Icon: Instagram, label: "Instagram", href: settings.socials.instagram },
    { Icon: Facebook, label: "Facebook", href: settings.socials.facebook },
    { Icon: Youtube, label: "YouTube", href: settings.socials.youtube },
  ].filter((s) => s.href);

  return (
    <footer className="bg-[#1d1d1f] dark:bg-[#0c0d12] text-white pt-16 pb-8">
      <div className="section">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-white/10">
          <div>
            <div className="flex items-center gap-2.5 mb-4">
              <div className="bg-white/10 text-white p-2 rounded-lg">
                <Monitor size={18} />
              </div>
              <span className="font-semibold text-white text-[15px] tracking-tight">
                {settings.instituteName}
              </span>
            </div>
            <p className="text-white/50 text-sm leading-relaxed mb-5">{settings.footerBlurb}</p>
            {socialLinks.length > 0 && (
              <div className="flex gap-3">
                {socialLinks.map(({ Icon, label, href }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="bg-white/5 hover:bg-white/15 text-white/60 hover:text-white p-2.5 rounded-lg transition-all duration-200"
                  >
                    <Icon size={16} />
                  </a>
                ))}
              </div>
            )}
          </div>

          <div>
            <h4 className="font-semibold text-white mb-5 text-sm tracking-tight">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-white/50 hover:text-white text-sm transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-5 text-sm tracking-tight">Our Courses</h4>
            <ul className="space-y-3">
              {courses.slice(0, 6).map((course) => (
                <li key={course.id}>
                  <a
                    href="#courses"
                    className="text-white/50 hover:text-white text-sm transition-colors"
                  >
                    {course.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-5 text-sm tracking-tight">Contact Us</h4>
            <div className="space-y-3">
              <div className="flex items-start gap-3 text-sm text-white/50">
                <MapPin size={15} className="text-white/40 flex-shrink-0 mt-0.5" />
                <span>{settings.addressLines.join(", ")}</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-white/50">
                <Phone size={15} className="text-white/40 flex-shrink-0" />
                <a
                  href={`tel:${settings.phone.replace(/\s+/g, "")}`}
                  className="hover:text-white transition-colors"
                >
                  {settings.phone}
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-white/40">
          <p>
            © {new Date().getFullYear()} {settings.instituteName}. All rights reserved.
          </p>
          <p>{settings.tagline}</p>
        </div>
      </div>
    </footer>
  );
}
