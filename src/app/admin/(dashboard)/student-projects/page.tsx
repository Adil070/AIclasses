"use client";

import type { StudentProject } from "@/lib/data/types";
import { CrudManager } from "@/components/admin/CrudManager";
import { Checkbox, Field, Input } from "@/components/admin/ui";
import { ImageUploader } from "@/components/admin/ImageUploader";

export default function StudentProjectsAdminPage() {
  return (
    <CrudManager<StudentProject>
      title="Student Projects"
      description="Projects showcased in the Student Projects gallery on the homepage."
      collectionName="studentProjects"
      revalidateTag="studentProjects"
      emptyItem={() => ({
        title: "",
        student: "",
        imageUrl: "",
        order: 0,
        published: true,
      })}
      renderForm={(draft, setDraft) => (
        <>
          <Field label="Project title">
            <Input
              value={draft.title}
              onChange={(e) => setDraft({ ...draft, title: e.target.value })}
              required
            />
          </Field>
          <Field label="Student name">
            <Input
              value={draft.student}
              onChange={(e) => setDraft({ ...draft, student: e.target.value })}
              placeholder="Aisha K."
              required
            />
          </Field>
          <Field label="Image (optional)">
            <ImageUploader
              kind="studentProject"
              title={draft.title}
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
            <p className="text-sm text-neutral-500 truncate">by {item.student}</p>
          </div>
        </div>
      )}
      confirmDeleteLabel={(item) => `Delete project "${item.title}"?`}
    />
  );
}
