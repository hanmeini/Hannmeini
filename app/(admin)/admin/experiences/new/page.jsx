"use client";

import { useState } from "react";
// import { supabase } from '@/lib/supabaseClient';
import { db } from "@/lib/firebase";
import { collection, addDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";

export default function NewExperiencePage() {
  // State disesuaikan dengan permintaan Anda
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");

  // State untuk loading dan pesan
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      // Kirim data ke koleksi 'experiences' di Firebase
      await addDoc(collection(db, "experiences"), {
        title: title,
        categories: category,
        description: description,
        created_at: new Date().toISOString(),
      });

      setMessage("Experience added successfully!");
      // Arahkan kembali ke halaman daftar pengalaman setelah berhasil
      router.push("/admin/experiences");
      router.refresh(); // Memaksa refresh data di halaman daftar
    } catch (error) {
      setMessage("Error adding experience: " + error.message);
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Add New Experience</h1>
      <form
        onSubmit={handleSubmit}
        className="space-y-6 bg-white p-8 rounded-lg shadow-md"
      >
        {/* Input untuk Title */}
        <div>
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700"
          >
            Title
          </label>
          <input
            id="title"
            type="text"
            placeholder="e.g., 1st Place - National Web Design Competition"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-1 w-full p-3 border rounded-md"
            required
          />
        </div>

        {/* Input untuk Category */}
        <div>
          <label
            htmlFor="category"
            className="block text-sm font-medium text-gray-700"
          >
            Category / Organization
          </label>
          <input
            id="category"
            type="text"
            placeholder="e.g., Competition or Internship"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
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
            placeholder="Describe the experience..."
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
            className="bg-green-600 text-white px-8 py-3 rounded-md disabled:bg-gray-400 hover:bg-green-700 transition-colors"
          >
            {loading ? "Saving..." : "Add Experience"}
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
    </div>
  );
}
