"use client";

import type { LearningStep } from "@/lib/data/types";
import { CrudManager } from "@/components/admin/CrudManager";
import { Checkbox, Field, Input, Textarea } from "@/components/admin/ui";

export default function LearningStepsAdminPage() {
  return (
    <CrudManager<LearningStep>
      title="Learning Journey"
      description="Steps shown in the scroll-driven 'Your learning journey' section. Order controls the sequence."
      collectionName="learningSteps"
      revalidateTag="learningSteps"
      emptyItem={() => ({
        label: "",
        description: "",
        order: 0,
        published: true,
      })}
      renderForm={(draft, setDraft) => (
        <>
          <Field label="Step label">
            <Input
              value={draft.label}
              onChange={(e) => setDraft({ ...draft, label: e.target.value })}
              placeholder="Computer Basics"
              required
            />
          </Field>
          <Field label="Description">
            <Textarea
              rows={2}
              value={draft.description}
              onChange={(e) => setDraft({ ...draft, description: e.target.value })}
              required
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
        <div className="min-w-0">
          <p className="font-medium text-neutral-900">
            {item.label}
            {!item.published && (
              <span className="text-xs text-neutral-400 ml-2">(unpublished)</span>
            )}
          </p>
          <p className="text-sm text-neutral-500 truncate">{item.description}</p>
        </div>
      )}
      confirmDeleteLabel={(item) => `Delete step "${item.label}"?`}
    />
  );
}
