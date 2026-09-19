"use client";

import { useState, type ReactNode } from "react";
import { Loader2, Pencil, Plus, Trash2, X } from "lucide-react";
import {
  createItem,
  removeItem,
  updateItem,
  useFirestoreCollection,
} from "@/lib/admin/useFirestoreCollection";
import { revalidateTagClient } from "@/lib/admin/revalidate";
import { Button, Card, PageHeader } from "./ui";

interface CrudManagerProps<T extends { id: string; order: number }> {
  title: string;
  description: string;
  collectionName: string;
  revalidateTag: string;
  emptyItem: () => Omit<T, "id">;
  renderForm: (draft: T | Omit<T, "id">, setDraft: (value: T | Omit<T, "id">) => void) => ReactNode;
  renderRow: (item: T) => ReactNode;
  confirmDeleteLabel: (item: T) => string;
}

export function CrudManager<T extends { id: string; order: number }>({
  title,
  description,
  collectionName,
  revalidateTag,
  emptyItem,
  renderForm,
  renderRow,
  confirmDeleteLabel,
}: CrudManagerProps<T>) {
  const { items, loading } = useFirestoreCollection<T>(collectionName);
  const [editing, setEditing] = useState<T | null>(null);
  const [creating, setCreating] = useState(false);
  const [draft, setDraft] = useState<T | Omit<T, "id"> | null>(null);
  const [saving, setSaving] = useState(false);

  function startCreate() {
    setDraft({ ...emptyItem(), order: items.length } as Omit<T, "id">);
    setCreating(true);
    setEditing(null);
  }

  function startEdit(item: T) {
    setDraft(item);
    setEditing(item);
    setCreating(false);
  }

  function cancel() {
    setCreating(false);
    setEditing(null);
    setDraft(null);
  }

  async function save() {
    if (!draft) return;
    setSaving(true);
    try {
      if (editing) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { id: _id, ...rest } = draft as T;
        await updateItem(collectionName, editing.id, rest);
      } else {
        await createItem(collectionName, draft);
      }
      await revalidateTagClient(revalidateTag);
      cancel();
    } finally {
      setSaving(false);
    }
  }

  async function remove(item: T) {
    if (!confirm(confirmDeleteLabel(item))) return;
    await removeItem(collectionName, item.id);
    await revalidateTagClient(revalidateTag);
  }

  return (
    <div>
      <PageHeader
        title={title}
        description={description}
        action={
          !creating && !editing ? (
            <Button onClick={startCreate}>
              <Plus size={16} /> Add new
            </Button>
          ) : undefined
        }
      />

      {(creating || editing) && draft && (
        <Card className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-medium text-neutral-900">{editing ? "Edit" : "New"}</h3>
            <button
              onClick={cancel}
              className="text-neutral-400 hover:text-neutral-600"
              aria-label="Close"
            >
              <X size={18} />
            </button>
          </div>
          <div className="space-y-4">{renderForm(draft, setDraft)}</div>
          <div className="flex gap-3 mt-6">
            <Button onClick={save} disabled={saving}>
              {saving && <Loader2 size={15} className="animate-spin" />} Save
            </Button>
            <Button variant="secondary" onClick={cancel}>
              Cancel
            </Button>
          </div>
        </Card>
      )}

      {loading ? (
        <p className="text-sm text-neutral-400">Loading…</p>
      ) : items.length === 0 ? (
        <p className="text-sm text-neutral-400">Nothing here yet.</p>
      ) : (
        <div className="space-y-3">
          {items.map((item) => (
            <Card key={item.id} className="flex items-start justify-between gap-4">
              <div className="flex-1 min-w-0">{renderRow(item)}</div>
              <div className="flex gap-2 shrink-0">
                <button
                  onClick={() => startEdit(item)}
                  className="p-2 text-neutral-400 hover:text-neutral-900 rounded-lg hover:bg-neutral-100"
                  aria-label="Edit"
                >
                  <Pencil size={16} />
                </button>
                <button
                  onClick={() => remove(item)}
                  className="p-2 text-neutral-400 hover:text-red-600 rounded-lg hover:bg-red-50"
                  aria-label="Delete"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
