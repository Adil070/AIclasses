"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { signOut } from "firebase/auth";
import {
  GraduationCap,
  LayoutDashboard,
  LogOut,
  Mail,
  Megaphone,
  MessageSquareQuote,
  Settings,
  Sparkles,
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

  async function handleLogout() {
    await signOut(auth);
    router.push("/admin/login");
  }

  return (
    <div className="min-h-screen bg-neutral-50 flex">
      <aside className="w-64 shrink-0 border-r border-neutral-200 bg-white flex flex-col">
        <div className="h-16 flex items-center px-6 border-b border-neutral-200">
          <span className="font-semibold text-neutral-900 tracking-tight">Admin Panel</span>
        </div>
        <nav className="flex-1 px-3 py-4 space-y-1">
          {NAV.map((item) => {
            const Icon = item.icon;
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
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
        <div className="p-4 border-t border-neutral-200">
          <p className="text-xs text-neutral-400 mb-2 truncate">{email}</p>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 text-sm font-medium text-neutral-600 hover:text-neutral-900"
          >
            <LogOut size={15} /> Sign out
          </button>
        </div>
      </aside>
      <main className="flex-1 px-8 py-10 max-w-5xl">{children}</main>
    </div>
  );
}
