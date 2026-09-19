"use client";

import { auth } from "@/lib/firebase/client";

export async function revalidateTagClient(tag: string) {
  const user = auth.currentUser;
  if (!user) return;

  try {
    const idToken = await user.getIdToken();
    await fetch("/api/revalidate", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${idToken}` },
      body: JSON.stringify({ tag }),
    });
  } catch (err) {
    console.error("Failed to revalidate:", err);
  }
}
