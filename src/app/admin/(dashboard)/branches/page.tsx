"use client";

import type { Branch } from "@/lib/data/types";
import { CrudManager } from "@/components/admin/CrudManager";
import { Checkbox, Field, Input, Textarea } from "@/components/admin/ui";

export default function BranchesAdminPage() {
  return (
    <CrudManager<Branch>
      title="Branches"
      description="Institute locations shown in the Visit Us section (each is selectable from the map dropdown)."
      collectionName="branches"
      revalidateTag="branches"
      emptyItem={() => ({
        name: "",
        addressLines: [],
        phone: "",
        timingsWeekday: "8:00 AM – 8:00 PM",
        timingsSunday: "9:00 AM – 2:00 PM",
        mapEmbedUrl: "",
        mapLinkUrl: "",
        order: 0,
        published: true,
      })}
      renderForm={(draft, setDraft) => (
        <>
          <Field label="Branch name">
            <Input
              value={draft.name}
              onChange={(e) => setDraft({ ...draft, name: e.target.value })}
              placeholder="Govandi (Main)"
              required
            />
          </Field>
          <Field label="Address (one line per row)">
            <Textarea
              rows={3}
              value={draft.addressLines.join("\n")}
              onChange={(e) =>
                setDraft({ ...draft, addressLines: e.target.value.split("\n") })
              }
            />
          </Field>
          <Field label="Phone">
            <Input
              value={draft.phone}
              onChange={(e) => setDraft({ ...draft, phone: e.target.value })}
              placeholder="+91 98765 43210"
            />
          </Field>
          <div className="grid grid-cols-2 gap-4">
            <Field label="Timings — Mon to Sat">
              <Input
                value={draft.timingsWeekday}
                onChange={(e) => setDraft({ ...draft, timingsWeekday: e.target.value })}
              />
            </Field>
            <Field label="Timings — Sunday">
              <Input
                value={draft.timingsSunday}
                onChange={(e) => setDraft({ ...draft, timingsSunday: e.target.value })}
              />
            </Field>
          </div>
          <Field label="Google Maps embed URL">
            <Input
              value={draft.mapEmbedUrl}
              onChange={(e) => setDraft({ ...draft, mapEmbedUrl: e.target.value })}
              placeholder="https://maps.google.com/maps?q=...&output=embed"
            />
          </Field>
          <Field label="Google Maps link (Get Directions)">
            <Input
              value={draft.mapLinkUrl}
              onChange={(e) => setDraft({ ...draft, mapLinkUrl: e.target.value })}
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
            {item.name}
            {!item.published && (
              <span className="text-xs text-neutral-400 ml-2">(unpublished)</span>
            )}
          </p>
          <p className="text-sm text-neutral-500 truncate">
            {item.addressLines.join(", ")}
          </p>
        </div>
      )}
      confirmDeleteLabel={(item) => `Delete branch "${item.name}"?`}
    />
  );
}
