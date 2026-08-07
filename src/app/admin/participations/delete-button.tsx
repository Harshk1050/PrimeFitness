"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function DeleteParticipantButton({ id }: { id: string }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    if (!confirm("Remove this participant?")) return;
    setLoading(true);
    await fetch(`/api/participations/${id}`, { method: "DELETE" });
    router.refresh();
    setLoading(false);
  };

  return (
    <button
      onClick={handleDelete}
      disabled={loading}
      className="text-xs text-red-500 hover:text-red-700 font-semibold disabled:opacity-50"
    >
      {loading ? "..." : "Remove"}
    </button>
  );
}
