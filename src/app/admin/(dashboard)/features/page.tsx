"use client";

import { FEATURE_ICONS, type Feature } from "@/lib/data/types";
import { CrudManager } from "@/components/admin/CrudManager";
import { Field, Input, Textarea } from "@/components/admin/ui";

export default function FeaturesAdminPage() {
  return (
    <CrudManager<Feature>
      title="Why Choose Us"
      description="The feature grid explaining why students should pick this institute."
      collectionName="features"
      revalidateTag="features"
      emptyItem={() => ({ title: "", description: "", icon: "Trophy", order: 0 })}
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
            <Field label="Icon">
              <select
                value={draft.icon}
                onChange={(e) => setDraft({ ...draft, icon: e.target.value as Feature["icon"] })}
                className="w-full rounded-lg border border-neutral-300 px-3.5 py-2.5 text-sm text-neutral-900 focus:border-neutral-900 focus:outline-none focus:ring-1 focus:ring-neutral-900"
              >
                {FEATURE_ICONS.map((icon) => (
                  <option key={icon} value={icon}>
                    {icon}
                  </option>
                ))}
              </select>
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
          <p className="font-medium text-neutral-900">{item.title}</p>
          <p className="text-sm text-neutral-500 truncate">{item.description}</p>
        </>
      )}
      confirmDeleteLabel={(item) => `Delete feature "${item.title}"?`}
    />
  );
}
