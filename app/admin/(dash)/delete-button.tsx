"use client";

import { useTransition } from "react";
import { deleteLink } from "../actions";

export function DeleteButton({ id, title }: { id: string; title: string }) {
  const [pending, startTransition] = useTransition();

  return (
    <button
      type="button"
      disabled={pending}
      onClick={() => {
        if (confirm(`Opravdu smazat „${title}"?`)) {
          startTransition(() => deleteLink(id));
        }
      }}
      className="text-xs font-medium text-red-400 hover:text-red-300 transition-colors disabled:opacity-50"
    >
      {pending ? "Mažu…" : "Smazat"}
    </button>
  );
}
