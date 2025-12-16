"use client";

import { useState } from "react";
// import { supabase } from '@/lib/supabaseClient';
import { db } from "@/lib/firebase";
import { doc, updateDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";

export default function EditExperienceForm({ experience }) {
  // Isi state dengan data awal dari props yang diterima
  const [title, setTitle] = useState(experience.title);
  const [categories, setCategories] = useState(experience.categories);
  const [description, setDescription] = useState(experience.description || "");

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      // Update data di tabel 'experiences'
      const expRef = doc(db, "experiences", experience.id.toString());

      await updateDoc(expRef, {
        title,
        categories,
        description,
      });

      setMessage("Experience updated successfully!");
      // Arahkan kembali ke halaman daftar setelah berhasil
      router.push("/admin/experiences");
      router.refresh(); // Memaksa refresh data di halaman daftar
    } catch (error) {
      setMessage("Error updating experience: " + error.message);
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 bg-white p-8 rounded-lg shadow-md"
    >
      {/* Input untuk Role/Posisi */}
      <div>
        <label
          htmlFor="title"
          className="block text-sm font-medium text-gray-700"
        >
          Role / Position
        </label>
        <input
          id="title"
          type="text"
          placeholder="e.g., Frontend Developer Intern"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="mt-1 w-full p-3 border rounded-md"
          required
        />
      </div>

      {/* Input untuk Perusahaan/Organisasi */}
      <div>
        <label
          htmlFor="categories"
          className="block text-sm font-medium text-gray-700"
        >
          Company / Organization
        </label>
        <input
          id="categories"
          type="text"
          placeholder="e.g., Vercel"
          value={categories}
          onChange={(e) => setCategories(e.target.value)}
          className="mt-1 w-full p-3 border rounded-md"
          required
        />
      </div>

      {/* Input untuk Deskripsi */}
      <div>
        <label
          htmlFor="description"
          className="block text-sm font-medium text-gray-700"
        >
          Description
        </label>
        <textarea
          id="description"
          placeholder="Describe your roles and achievements..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="mt-1 w-full p-3 border rounded-md"
          rows="5"
        />
      </div>

      {/* Tombol Aksi */}
      <div className="flex items-center gap-4 pt-4 border-t">
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white px-8 py-3 rounded-md disabled:bg-gray-400 hover:bg-blue-700 transition-colors"
        >
          {loading ? "Saving..." : "Save Changes"}
        </button>
        <button
          type="button"
          onClick={() => router.back()}
          className="bg-gray-200 text-gray-800 px-8 py-3 rounded-md hover:bg-gray-300 transition-colors"
        >
          Cancel
        </button>
        {message && (
          <p
            className={`text-sm ${
              message.startsWith("Error") ? "text-red-600" : "text-green-600"
            }`}
          >
            {message}
          </p>
        )}
      </div>
    </form>
  );
}
