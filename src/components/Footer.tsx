import { Monitor, MapPin, Phone, Instagram, Facebook, Youtube } from "lucide-react";

const quickLinks = [
  { label: "Home", href: "#home" },
  { label: "Courses", href: "#courses" },
  { label: "Why Choose Us", href: "#why-us" },
  { label: "Reviews", href: "#reviews" },
  { label: "Location", href: "#location" },
];

const courses = [
  "MS Office Suite",
  "Tally Prime & GST",
  "Graphic Design",
  "Web Design",
  "Python Programming",
  "Hardware & Networking",
];

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-slate-800">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2.5 mb-4">
              <div className="bg-blue-600 text-white p-2 rounded-lg">
                <Monitor size={20} />
              </div>
              <div className="leading-tight">
                <span className="font-bold text-white text-lg block font-heading">
                  AI Computer
                </span>
                <span className="text-[11px] text-orange-400 font-semibold uppercase tracking-widest">
                  Institute
                </span>
              </div>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed mb-5">
              Empowering students with professional computer skills since 2019.
              Your success is our mission.
            </p>
            <div className="flex gap-3">
              {[
                { Icon: Instagram, label: "Instagram" },
                { Icon: Facebook, label: "Facebook" },
                { Icon: Youtube, label: "YouTube" },
              ].map(({ Icon, label }) => (
                <a
                  key={label}
                  href="#"
                  aria-label={label}
                  className="bg-slate-800 hover:bg-blue-600 text-slate-400 hover:text-white p-2.5 rounded-lg transition-all duration-200"
                >
                  <Icon size={17} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-white mb-5 text-sm uppercase tracking-wider">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-slate-400 hover:text-orange-400 text-sm transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Courses */}
          <div>
            <h4 className="font-bold text-white mb-5 text-sm uppercase tracking-wider">
              Our Courses
            </h4>
            <ul className="space-y-3">
              {courses.map((course) => (
                <li key={course}>
                  <a
                    href="#courses"
                    className="text-slate-400 hover:text-orange-400 text-sm transition-colors"
                  >
                    {course}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold text-white mb-5 text-sm uppercase tracking-wider">
              Contact Us
            </h4>
            <div className="space-y-3 mb-6">
              <div className="flex items-start gap-3 text-sm text-slate-400">
                <MapPin size={15} className="text-orange-400 flex-shrink-0 mt-0.5" />
                <span>AI Computer Institute, Govandi, Mumbai — 400088</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-slate-400">
                <Phone size={15} className="text-orange-400 flex-shrink-0" />
                <a
                  href="tel:+919876543210"
                  className="hover:text-orange-400 transition-colors"
                >
                  +91 98765 43210
                </a>
              </div>
            </div>

            {/* Kurla teaser */}
            <div className="bg-orange-500/15 border border-orange-500/30 rounded-xl p-4">
              <div className="text-orange-400 font-bold text-sm mb-1">🚀 Coming Soon</div>
              <div className="text-slate-300 text-xs leading-relaxed">
                New branch opening in Kurla, Mumbai. Stay tuned for our launch!
              </div>
            </div>
          </div>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-slate-500">
          <p>© 2025 AI Computer Institute. All rights reserved.</p>
          <p>Made with ❤️ in Mumbai</p>
        </div>
      </div>
    </footer>
  );
}
