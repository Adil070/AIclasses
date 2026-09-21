import type { SiteSettings } from "./types";

export const DEFAULT_SETTINGS: SiteSettings = {
  instituteName: "AI Computer Institute",
  tagline: "Empowering Digital Careers",
  heroHeadline: "Unlock Your Digital Future Today",
  heroSubheadline:
    "Professional computer education designed to give you real-world skills.",
  heroBadges: [
    "Admissions open · new batch this month",
    "Certification programmes available",
    "Free demo class · limited seats",
  ],
  phone: "+91 98765 43210",
  email: "info@aicomputerinstitute.example",
  addressLines: ["AI Computer Institute", "Govandi, Mumbai", "Maharashtra — 400088"],
  timingsWeekday: "8:00 AM – 8:00 PM",
  timingsSunday: "9:00 AM – 2:00 PM",
  socials: {},
  mapEmbedUrl:
    "https://maps.google.com/maps?q=AI+Computer+Institute+Govandi+Mumbai&z=16&output=embed",
  mapLinkUrl: "https://maps.app.goo.gl/H1TfHx7BSdhrHTYY8",
  stats: {
    studentsTrained: "500+",
    coursesOffered: "15+",
    yearsExperience: "5+",
    placementRate: "95%",
  },
  footerBlurb: "Empowering students with professional computer skills.",
};
