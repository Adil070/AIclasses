"use client";

import { Trash2 } from "lucide-react";
import type { ContactSubmission } from "@/lib/data/types";
import { removeItem, useFirestoreCollection } from "@/lib/admin/useFirestoreCollection";
import { Card, PageHeader } from "@/components/admin/ui";

export default function MessagesAdminPage() {
  const { items, loading } = useFirestoreCollection<ContactSubmission>(
    "contactSubmissions",
    "createdAt",
    "desc"
  );

  async function remove(item: ContactSubmission) {
    if (!confirm(`Delete message from "${item.name}"?`)) return;
    await removeItem("contactSubmissions", item.id);
  }

  return (
    <div>
      <PageHeader
        title="Messages"
        description="Query form submissions from visitors — also emailed to you directly when received."
      />
      {loading ? (
        <p className="text-sm text-neutral-400">Loading…</p>
      ) : items.length === 0 ? (
        <p className="text-sm text-neutral-400">No enquiries yet.</p>
      ) : (
        <div className="space-y-3">
          {items.map((item) => (
            <Card key={item.id} className="flex items-start justify-between gap-4">
              <div className="min-w-0">
                <p className="font-medium text-neutral-900">
                  {item.name}{" "}
                  <span className="text-neutral-400 font-normal">· {item.contact}</span>
                </p>
                {item.courseInterested && (
                  <p className="text-xs text-neutral-500 mt-0.5">
                    Interested in: {item.courseInterested}
                  </p>
                )}
                <p className="text-sm text-neutral-600 mt-2 whitespace-pre-wrap">{item.message}</p>
                <p className="text-xs text-neutral-400 mt-2">
                  {new Date(item.createdAt).toLocaleString()}
                </p>
              </div>
              <button
                onClick={() => remove(item)}
                className="p-2 text-neutral-400 hover:text-red-600 rounded-lg hover:bg-red-50 shrink-0"
                aria-label="Delete"
              >
                <Trash2 size={16} />
              </button>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
