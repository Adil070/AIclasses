"use client";

import type { Course } from "@/lib/data/types";
import { CrudManager } from "@/components/admin/CrudManager";
import { Checkbox, Field, Input, Textarea } from "@/components/admin/ui";
import { ImageUploader } from "@/components/admin/ImageUploader";

export default function CoursesAdminPage() {
  return (
    <CrudManager<Course>
      title="Courses"
      description="Courses shown in the Courses section, with photo, duration, level and an optional badge."
      collectionName="courses"
      revalidateTag="courses"
      emptyItem={() => ({
        title: "",
        description: "",
        duration: "",
        level: "Beginner",
        imageUrl: "",
        badge: "",
        order: 0,
        published: true,
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
          <Field label="Description">
            <Textarea
              rows={3}
              value={draft.description}
              onChange={(e) => setDraft({ ...draft, description: e.target.value })}
              required
            />
          </Field>
          <div className="grid grid-cols-2 gap-4">
            <Field label="Duration">
              <Input
                value={draft.duration}
                onChange={(e) => setDraft({ ...draft, duration: e.target.value })}
                placeholder="3 Months"
              />
            </Field>
            <Field label="Level">
              <Input
                value={draft.level}
                onChange={(e) => setDraft({ ...draft, level: e.target.value })}
                placeholder="Beginner"
              />
            </Field>
          </div>
          <Field label="Badge (optional)">
            <Input
              value={draft.badge}
              onChange={(e) => setDraft({ ...draft, badge: e.target.value })}
              placeholder="Most Popular"
            />
          </Field>
          <Field label="Photo">
            <ImageUploader
              value={draft.imageUrl}
              onChange={(url) => setDraft({ ...draft, imageUrl: url })}
            />
          </Field>
          <div className="flex items-center gap-8">
            <Checkbox
              label="Published"
              checked={draft.published}
              onChange={(e) => setDraft({ ...draft, published: e.target.checked })}
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
              {!item.published && (
                <span className="text-xs text-neutral-400 ml-2">(unpublished)</span>
              )}
            </p>
            <p className="text-sm text-neutral-500 truncate">
              {item.duration} · {item.level}
            </p>
          </div>
        </div>
      )}
      confirmDeleteLabel={(item) => `Delete course "${item.title}"?`}
    />
  );
}
