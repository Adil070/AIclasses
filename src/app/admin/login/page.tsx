"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { signInWithEmailAndPassword } from "firebase/auth";
import { Loader2, Lock } from "lucide-react";
import { auth } from "@/lib/firebase/client";
import { useAdminUser } from "@/lib/admin/useAdminUser";
import { Button, Field, Input } from "@/components/admin/ui";

export default function AdminLoginPage() {
  const router = useRouter();
  const { user, loading: checkingSession } = useAdminUser();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  if (!checkingSession && user) {
    router.replace("/admin");
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push("/admin");
    } catch {
      setError("Invalid email or password.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen bg-neutral-50 flex items-center justify-center px-4">
      <div className="w-full max-w-sm bg-white border border-neutral-200 rounded-2xl p-8">
        <div className="flex items-center gap-2.5 mb-6">
          <div className="bg-neutral-900 text-white p-2 rounded-lg">
            <Lock size={18} />
          </div>
          <h1 className="font-semibold text-lg text-neutral-900">Admin Sign In</h1>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Field label="Email">
            <Input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="username"
            />
          </Field>
          <Field label="Password">
            <Input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
            />
          </Field>
          {error && <p className="text-sm text-red-600">{error}</p>}
          <Button type="submit" disabled={submitting} className="w-full justify-center">
            {submitting && <Loader2 size={15} className="animate-spin" />}
            Sign in
          </Button>
        </form>
      </div>
    </div>
  );
}
