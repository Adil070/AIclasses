"use client";

import type { Banner } from "@/lib/data/types";
import { CrudManager } from "@/components/admin/CrudManager";
import { Checkbox, Field, Input, Textarea } from "@/components/admin/ui";
import { ImageUploader } from "@/components/admin/ImageUploader";

export default function BannersAdminPage() {
  return (
    <CrudManager<Banner>
      title="Banners"
      description="Announcement banners shown near the top of the site (new branch openings, offers, etc.)."
      collectionName="banners"
      revalidateTag="banners"
      emptyItem={() => ({
        title: "",
        message: "",
        badgeText: "",
        imageUrl: "",
        active: true,
        order: 0,
      })}
      renderForm={(draft, setDraft) => (
        <>
          <Field label="Title">
            <Input
              value={draft.title}
              onChange={(e) => setDraft({ ...draft, title: e.target.value })}
              required
            />
          </Field>
          <Field label="Message">
            <Textarea
              rows={3}
              value={draft.message}
              onChange={(e) => setDraft({ ...draft, message: e.target.value })}
              required
            />
          </Field>
          <Field label="Badge text">
            <Input
              value={draft.badgeText}
              onChange={(e) => setDraft({ ...draft, badgeText: e.target.value })}
              placeholder="Opening Soon"
            />
          </Field>
          <Field label="Image (optional)">
            <ImageUploader
              kind="banner"
              title={draft.title}
              value={draft.imageUrl}
              onChange={(url) => setDraft({ ...draft, imageUrl: url })}
            />
          </Field>
          <div className="flex items-center gap-8">
            <Checkbox
              label="Active"
              checked={draft.active}
              onChange={(e) => setDraft({ ...draft, active: e.target.checked })}
            />
            <Field label="Order">
              <Input
                type="number"
                className="w-24"
                value={draft.order}
                onChange={(e) => setDraft({ ...draft, order: Number(e.target.value) })}
              />
            </Field>
          </div>
        </>
      )}
      renderRow={(item) => (
        <div className="flex items-center gap-4">
          {item.imageUrl && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={item.imageUrl}
              alt=""
              className="w-14 h-14 rounded-lg object-cover shrink-0"
            />
          )}
          <div className="min-w-0">
            <p className="font-medium text-neutral-900">
              {item.title}
              {!item.active && <span className="text-xs text-neutral-400 ml-2">(inactive)</span>}
            </p>
            <p className="text-sm text-neutral-500 truncate">{item.message}</p>
          </div>
        </div>
      )}
      confirmDeleteLabel={(item) => `Delete banner "${item.title}"?`}
    />
  );
}
