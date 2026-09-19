"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { useAdminUser } from "@/lib/admin/useAdminUser";
import { AdminShell } from "@/components/admin/AdminShell";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAdminUser();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.replace("/admin/login");
    }
  }, [loading, user, router]);

  if (loading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-neutral-50">
        <Loader2 className="animate-spin text-neutral-400" size={28} />
      </div>
    );
  }

  return <AdminShell email={user.email}>{children}</AdminShell>;
}
