"use client";

import { useRef, useState } from "react";
import { Check, Copy, ImagePlus, Loader2, Sparkles, X } from "lucide-react";
import { auth } from "@/lib/firebase/client";
import {
  buildImagePrompt,
  imageHelperText,
  type ImageKind,
} from "@/lib/admin/imageSpecs";

export function ImageUploader({
  value,
  onChange,
  kind,
  title = "",
}: {
  value: string;
  onChange: (url: string) => void;
  /** When set, shows format/size guidance and an AI-prompt generator. */
  kind?: ImageKind;
  /** Item title used to tailor the generated prompt. */
  title?: string;
}) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showPrompt, setShowPrompt] = useState(false);
  const [copied, setCopied] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const prompt = kind ? buildImagePrompt(kind, title) : "";

  async function copyPrompt() {
    try {
      await navigator.clipboard.writeText(prompt);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      setCopied(false);
    }
  }

  async function handleFile(file: File) {
    setError(null);
    setUploading(true);
    try {
      const idToken = await auth.currentUser?.getIdToken();
      if (!idToken) throw new Error("Not signed in.");

      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/upload", {
        method: "POST",
        headers: { Authorization: `Bearer ${idToken}` },
        body: formData,
      });

      const body = await res.json();
      if (!res.ok) throw new Error(body.error || "Upload failed.");

      onChange(body.url);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed.");
    } finally {
      setUploading(false);
    }
  }

  return (
    <div>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) handleFile(file);
          e.target.value = "";
        }}
      />
      {value ? (
        <div className="relative w-40 h-28 rounded-xl overflow-hidden border border-neutral-200 group">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={value} alt="" className="w-full h-full object-cover" />
          <button
            type="button"
            onClick={() => onChange("")}
            className="absolute top-1.5 right-1.5 bg-black/60 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
            aria-label="Remove image"
          >
            <X size={14} />
          </button>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={uploading}
          className="w-40 h-28 rounded-xl border border-dashed border-neutral-300 flex flex-col items-center justify-center gap-1.5 text-neutral-400 hover:border-neutral-500 hover:text-neutral-500 text-xs transition-colors"
        >
          {uploading ? <Loader2 size={20} className="animate-spin" /> : <ImagePlus size={20} />}
          {uploading ? "Uploading…" : "Upload image"}
        </button>
      )}
      {error && <p className="text-xs text-red-600 mt-1.5">{error}</p>}

      {kind && (
        <div className="mt-3 max-w-md">
          <p className="text-[11px] leading-relaxed text-neutral-500">{imageHelperText(kind)}</p>

          <button
            type="button"
            onClick={() => setShowPrompt((v) => !v)}
            className="mt-2 inline-flex items-center gap-1.5 text-xs font-medium text-neutral-600 hover:text-neutral-900"
          >
            <Sparkles size={13} />
            {showPrompt ? "Hide image prompt" : "Generate image prompt"}
          </button>

          {showPrompt && (
            <div className="mt-2 rounded-lg border border-neutral-200 bg-neutral-50 p-3">
              <p className="text-[13px] leading-relaxed text-neutral-700 whitespace-pre-wrap">
                {prompt}
              </p>
              <button
                type="button"
                onClick={copyPrompt}
                className="mt-2.5 inline-flex items-center gap-1.5 text-xs font-medium text-white bg-neutral-900 hover:bg-black rounded-md px-3 py-1.5"
              >
                {copied ? <Check size={13} /> : <Copy size={13} />}
                {copied ? "Copied" : "Copy prompt"}
              </button>
              <p className="mt-2 text-[11px] text-neutral-400">
                Paste into any AI image tool (e.g. ChatGPT, Midjourney, Gemini), then upload the
                result above.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
