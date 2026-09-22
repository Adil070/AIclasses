"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { signOut } from "firebase/auth";
import {
  GraduationCap,
  LayoutDashboard,
  LogOut,
  Mail,
  Megaphone,
  Menu,
  MessageSquareQuote,
  Settings,
  Sparkles,
  X,
} from "lucide-react";
import { auth } from "@/lib/firebase/client";

const NAV = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/banners", label: "Banners", icon: Megaphone },
  { href: "/admin/courses", label: "Courses", icon: GraduationCap },
  { href: "/admin/features", label: "Why Us", icon: Sparkles },
  { href: "/admin/testimonials", label: "Testimonials", icon: MessageSquareQuote },
  { href: "/admin/settings", label: "Site Settings", icon: Settings },
  { href: "/admin/messages", label: "Messages", icon: Mail },
];

export function AdminShell({
  email,
  children,
}: {
  email: string | null;
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);

  async function handleLogout() {
    await signOut(auth);
    router.push("/admin/login");
  }

  return (
    <div className="min-h-screen bg-neutral-50 lg:flex">
      {/* Mobile top bar */}
      <header className="lg:hidden sticky top-0 z-30 flex h-14 items-center gap-3 border-b border-neutral-200 bg-white px-4">
        <button
          onClick={() => setOpen(true)}
          aria-label="Open menu"
          className="rounded-lg p-2 text-neutral-700 hover:bg-neutral-100"
        >
          <Menu size={20} />
        </button>
        <span className="font-semibold tracking-tight text-neutral-900">Admin Panel</span>
      </header>

      {/* Backdrop for mobile drawer */}
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/40 lg:hidden"
          onClick={() => setOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Sidebar: drawer on mobile, static on desktop */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-64 shrink-0 flex-col border-r border-neutral-200 bg-white transition-transform duration-200 lg:static lg:z-auto lg:translate-x-0 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-16 items-center justify-between border-b border-neutral-200 px-6">
          <span className="font-semibold tracking-tight text-neutral-900">Admin Panel</span>
          <button
            onClick={() => setOpen(false)}
            aria-label="Close menu"
            className="rounded-lg p-2 text-neutral-500 hover:bg-neutral-100 lg:hidden"
          >
            <X size={18} />
          </button>
        </div>
        <nav className="flex-1 space-y-1 px-3 py-4">
          {NAV.map((item) => {
            const Icon = item.icon;
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                  active
                    ? "bg-neutral-900 text-white"
                    : "text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900"
                }`}
              >
                <Icon size={17} />
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="border-t border-neutral-200 p-4">
          <p className="mb-2 truncate text-xs text-neutral-400">{email}</p>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 text-sm font-medium text-neutral-600 hover:text-neutral-900"
          >
            <LogOut size={15} /> Sign out
          </button>
        </div>
      </aside>

      <main className="w-full flex-1 px-4 py-6 sm:px-6 lg:max-w-5xl lg:px-8 lg:py-10">
        {children}
      </main>
    </div>
  );
}
