/**
 * Image guidance and static AI-prompt templates for the admin uploaders.
 * There is no AI integration; `buildImagePrompt` just assembles a ready-to-copy
 * prompt string that accounts for the item title and the section's ideal size.
 */

export type ImageKind = "course" | "banner" | "studentProject";

export interface ImageSpec {
  label: string;
  /** Ideal upload dimensions. */
  width: number;
  height: number;
  aspectLabel: string;
  /** Human-readable target file size. */
  maxFileSize: string;
  /** Supported/recommended formats. */
  formats: string;
  /** Short note about how the image is displayed. */
  usage: string;
}

export const IMAGE_SPECS: Record<ImageKind, ImageSpec> = {
  course: {
    label: "Course photo",
    width: 1280,
    height: 720,
    aspectLabel: "16:9 landscape",
    maxFileSize: "under ~300 KB",
    formats: "JPG or WebP (PNG only for graphics/logos)",
    usage: "Shown on the course card and detail modal — cropped to fill (object-cover).",
  },
  banner: {
    label: "Banner image",
    width: 1920,
    height: 640,
    aspectLabel: "3:1 wide panorama",
    maxFileSize: "under ~400 KB",
    formats: "JPG or WebP",
    usage:
      "Full-width background behind a dark 75% overlay — use darker, low-detail images so text stays readable.",
  },
  studentProject: {
    label: "Project image",
    width: 1280,
    height: 800,
    aspectLabel: "16:10 landscape",
    maxFileSize: "under ~300 KB",
    formats: "JPG or WebP (PNG for screenshots)",
    usage: "Shown in the Student Projects gallery — cropped to fill (object-cover).",
  },
};

/** One-line supported-formats/size helper for display next to an uploader. */
export function imageHelperText(kind: ImageKind): string {
  const s = IMAGE_SPECS[kind];
  return `${s.formats} · ideal ${s.width}×${s.height}px (${s.aspectLabel}) · ${s.maxFileSize}`;
}

/**
 * Build a static, copy-ready AI image prompt tailored to the section and the
 * item's title. No network/AI call — pure string assembly.
 */
export function buildImagePrompt(kind: ImageKind, title: string): string {
  const s = IMAGE_SPECS[kind];
  const subject = title.trim() || (kind === "course" ? "computer course" : "institute announcement");

  if (kind === "banner") {
    return [
      `A wide, cinematic promotional banner background for "${subject}" at a computer training institute.`,
      `Modern, professional, slightly dark and low-contrast so white overlay text remains readable.`,
      `Clean composition, subtle technology/education motifs, soft depth of field, no text or logos in the image.`,
      `Aspect ratio ${s.aspectLabel}, ${s.width}x${s.height} pixels, high quality, photorealistic.`,
    ].join(" ");
  }

  if (kind === "studentProject") {
    return [
      `A clean showcase image of a student project titled "${subject}" from a computer training institute.`,
      `Could be a screenshot, mockup, or photo of the work; bright, modern, and uncluttered.`,
      `No text overlays or watermarks, suitable as a gallery card.`,
      `Aspect ratio ${s.aspectLabel}, ${s.width}x${s.height} pixels, high quality.`,
    ].join(" ");
  }

  return [
    `A clean, professional landscape photo representing a "${subject}" course at a computer institute.`,
    `Bright, modern, friendly workspace vibe with relevant tools on screen, shallow depth of field.`,
    `Well-lit, uncluttered background, no text or watermarks, suitable as a card thumbnail.`,
    `Aspect ratio ${s.aspectLabel}, ${s.width}x${s.height} pixels, high quality, photorealistic.`,
  ].join(" ");
}
