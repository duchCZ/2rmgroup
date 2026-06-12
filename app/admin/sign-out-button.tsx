"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { signOut } from "@/lib/auth-client";

export function SignOutButton() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  return (
    <button
      type="button"
      disabled={loading}
      onClick={async () => {
        setLoading(true);
        await signOut();
        router.push("/admin/login");
        router.refresh();
      }}
      className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors disabled:opacity-50"
    >
      {loading ? "Odhlašuji…" : "Odhlásit"}
    </button>
  );
}
