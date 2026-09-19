"use client";

import { useRef, useState } from "react";
import { deleteObject, getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { ImagePlus, Loader2, X } from "lucide-react";
import { storage } from "@/lib/firebase/client";

export function ImageUploader({
  value,
  onChange,
}: {
  value: string;
  onChange: (url: string) => void;
}) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  async function handleFile(file: File) {
    setError(null);
    setUploading(true);
    try {
      const path = `course-images/${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.\-_]/g, "-")}`;
      const storageRef = ref(storage, path);
      await uploadBytes(storageRef, file);
      const url = await getDownloadURL(storageRef);
      onChange(url);
    } catch {
      setError("Upload failed. Check your connection and Storage rules.");
    } finally {
      setUploading(false);
    }
  }

  async function handleRemove() {
    if (value) {
      try {
        await deleteObject(ref(storage, value));
      } catch {
        // File may already be gone or URL wasn't a Storage ref — safe to ignore.
      }
    }
    onChange("");
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
            onClick={handleRemove}
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
    </div>
  );
}
