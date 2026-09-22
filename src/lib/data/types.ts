export interface SiteSettings {
  instituteName: string;
  tagline: string;
  heroHeadline: string;
  heroSubheadline: string;
  /** Rotating status-pill lines shown in the hero (managed from admin). */
  heroBadges: string[];
  phone: string;
  email: string;
  addressLines: string[];
  timingsWeekday: string;
  timingsSunday: string;
  socials: { instagram?: string; facebook?: string; youtube?: string };
  mapEmbedUrl: string;
  mapLinkUrl: string;
  stats: {
    studentsTrained: string;
    coursesOffered: string;
    yearsExperience: string;
    placementRate: string;
  };
  footerBlurb: string;
}

export interface Banner {
  id: string;
  title: string;
  message: string;
  badgeText: string;
  imageUrl: string;
  active: boolean;
  order: number;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  duration: string;
  level: string;
  imageUrl: string;
  badge: string;
  highlights: string[];
  fee: string;
  mode: string;
  eligibility: string;
  certification: string;
  order: number;
  published: boolean;
}

/** Must match the icon picker options in the admin Features form. */
export const FEATURE_ICONS = [
  "Trophy",
  "CheckCircle",
  "Users",
  "Clock",
  "Banknote",
  "BookOpen",
  "Sparkles",
  "ShieldCheck",
] as const;

export type FeatureIcon = (typeof FEATURE_ICONS)[number];

export interface Feature {
  id: string;
  title: string;
  description: string;
  icon: FeatureIcon;
  order: number;
}

export interface Testimonial {
  id: string;
  name: string;
  course: string;
  rating: number;
  review: string;
  avatarInitials: string;
  order: number;
}

export interface Branch {
  id: string;
  name: string;
  addressLines: string[];
  phone: string;
  timingsWeekday: string;
  timingsSunday: string;
  mapEmbedUrl: string;
  mapLinkUrl: string;
  order: number;
  published: boolean;
}

export interface StudentProject {
  id: string;
  title: string;
  student: string;
  imageUrl: string;
  order: number;
  published: boolean;
}

export interface LearningStep {
  id: string;
  label: string;
  description: string;
  order: number;
  published: boolean;
}

export interface ContactSubmission {
  id: string;
  name: string;
  contact: string;
  courseInterested: string;
  message: string;
  createdAt: string;
}
