"use client";

import Link from "next/link";
import {
  FolderKanban,
  GraduationCap,
  Mail,
  MapPin,
  Megaphone,
  MessageSquareQuote,
  Sparkles,
} from "lucide-react";
import { useFirestoreCollection } from "@/lib/admin/useFirestoreCollection";
import { Card, PageHeader } from "@/components/admin/ui";

const TILES = [
  { href: "/admin/banners", label: "Banners", collection: "banners", icon: Megaphone },
  { href: "/admin/courses", label: "Courses", collection: "courses", icon: GraduationCap },
  { href: "/admin/features", label: "Why Us features", collection: "features", icon: Sparkles },
  {
    href: "/admin/testimonials",
    label: "Testimonials",
    collection: "testimonials",
    icon: MessageSquareQuote,
  },
  {
    href: "/admin/student-projects",
    label: "Student projects",
    collection: "studentProjects",
    icon: FolderKanban,
  },
  { href: "/admin/branches", label: "Branches", collection: "branches", icon: MapPin },
] as const;

function CountTile({ href, label, collection, icon: Icon }: (typeof TILES)[number]) {
  const { items, loading } = useFirestoreCollection(collection);
  return (
    <Link href={href}>
      <Card className="hover:border-neutral-300 transition-colors">
        <div className="flex items-center justify-between mb-4">
          <div className="bg-neutral-100 text-neutral-700 p-2.5 rounded-xl">
            <Icon size={18} />
          </div>
          <span className="text-2xl font-semibold text-neutral-900">
            {loading ? "—" : items.length}
          </span>
        </div>
        <p className="text-sm font-medium text-neutral-600">{label}</p>
      </Card>
    </Link>
  );
}

export default function AdminHomePage() {
  const { items: messages } = useFirestoreCollection("contactSubmissions", "createdAt", "desc");

  return (
    <div>
      <PageHeader
        title="Dashboard"
        description="Everything on the public site is powered from here — changes go live within seconds."
      />
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {TILES.map((tile) => (
          <CountTile key={tile.href} {...tile} />
        ))}
      </div>
      <Link href="/admin/messages">
        <Card className="flex items-center justify-between hover:border-neutral-300 transition-colors">
          <div className="flex items-center gap-3">
            <div className="bg-neutral-100 text-neutral-700 p-2.5 rounded-xl">
              <Mail size={18} />
            </div>
            <p className="text-sm font-medium text-neutral-600">Query submissions</p>
          </div>
          <span className="text-2xl font-semibold text-neutral-900">{messages.length}</span>
        </Card>
      </Link>
    </div>
  );
}
