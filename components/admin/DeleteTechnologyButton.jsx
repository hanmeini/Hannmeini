"use client";

import { useState } from "react";
import { db } from "@/lib/firebase";
import { doc, deleteDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";

export default function DeleteTechnologyButton({ techId }) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this technology?")) return;

    setLoading(true);
    try {
      await deleteDoc(doc(db, "technologies", techId));
      router.refresh();
      alert("Technology deleted successfully.");
    } catch (error) {
      console.error("Error deleting technology:", error);
      alert("Failed to delete technology.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleDelete}
      disabled={loading}
      className="text-red-500 hover:text-red-700 disabled:text-gray-400"
    >
      {loading ? "Deleting..." : "Delete"}
    </button>
  );
}
