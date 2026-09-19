"use client";

import type { Testimonial } from "@/lib/data/types";
import { CrudManager } from "@/components/admin/CrudManager";
import { Field, Input, Textarea } from "@/components/admin/ui";

export default function TestimonialsAdminPage() {
  return (
    <CrudManager<Testimonial>
      title="Testimonials"
      description="Student reviews shown in the Testimonials section."
      collectionName="testimonials"
      revalidateTag="testimonials"
      emptyItem={() => ({
        name: "",
        course: "",
        rating: 5,
        review: "",
        avatarInitials: "",
        order: 0,
      })}
      renderForm={(draft, setDraft) => (
        <>
          <div className="grid grid-cols-2 gap-4">
            <Field label="Name">
              <Input
                value={draft.name}
                onChange={(e) => setDraft({ ...draft, name: e.target.value })}
                required
              />
            </Field>
            <Field label="Course">
              <Input
                value={draft.course}
                onChange={(e) => setDraft({ ...draft, course: e.target.value })}
              />
            </Field>
          </div>
          <Field label="Review">
            <Textarea
              rows={3}
              value={draft.review}
              onChange={(e) => setDraft({ ...draft, review: e.target.value })}
              required
            />
          </Field>
          <div className="grid grid-cols-3 gap-4">
            <Field label="Rating (1–5)">
              <Input
                type="number"
                min={1}
                max={5}
                value={draft.rating}
                onChange={(e) => setDraft({ ...draft, rating: Number(e.target.value) })}
              />
            </Field>
            <Field label="Avatar initials">
              <Input
                value={draft.avatarInitials}
                onChange={(e) => setDraft({ ...draft, avatarInitials: e.target.value })}
                placeholder="PS"
                maxLength={2}
              />
            </Field>
            <Field label="Order">
              <Input
                type="number"
                value={draft.order}
                onChange={(e) => setDraft({ ...draft, order: Number(e.target.value) })}
              />
            </Field>
          </div>
        </>
      )}
      renderRow={(item) => (
        <>
          <p className="font-medium text-neutral-900">
            {item.name} <span className="text-neutral-400 font-normal">· {item.course}</span>
          </p>
          <p className="text-sm text-neutral-500 truncate">{item.review}</p>
        </>
      )}
      confirmDeleteLabel={(item) => `Delete testimonial from "${item.name}"?`}
    />
  );
}
