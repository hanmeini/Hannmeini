"use client";

import { useState, useEffect } from "react";
import { db } from "@/lib/firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";

export default function EditTechnologyPage({ params }) {
  const { id } = params;
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchTech = async () => {
      try {
        const docRef = doc(db, "technologies", id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setName(docSnap.data().name);
        } else {
          alert("Technology not found");
          router.push("/admin/technologies");
        }
      } catch (error) {
        console.error("Error fetching technology:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchTech();
  }, [id, router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const docRef = doc(db, "technologies", id);
      await updateDoc(docRef, { name });
      router.push("/admin/technologies");
      router.refresh();
    } catch (error) {
      console.error("Error updating technology:", error);
      alert("Failed to update technology");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md mt-10">
      <h1 className="text-2xl font-bold mb-6">Edit Technology</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">
            Technology Name
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 outline-none"
            required
          />
        </div>

        <div className="flex justify-end gap-3 pt-4">
          <button
            type="button"
            onClick={() => router.back()}
            className="px-4 py-2 text-gray-700 bg-gray-100 rounded hover:bg-gray-200"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={submitting}
            className="px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700 disabled:opacity-50"
          >
            {submitting ? "Saving..." : "Update Technology"}
          </button>
        </div>
      </form>
    </div>
  );
}
