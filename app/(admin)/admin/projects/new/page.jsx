"use client";

import { useState, useEffect } from "react";
// import { supabase } from '@/lib/supabaseClient';
import { db, auth } from "@/lib/firebase";
import { collection, getDocs, addDoc } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { onAuthStateChanged, signOut } from "firebase/auth"; // Import signOut here
import { useRouter } from "next/navigation";

export default function AdminPage() {
  const [user, setUser] = useState(null);
  const [loadingUser, setLoadingUser] = useState(true);
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [githubUrl, setGithubUrl] = useState("");
  const [liveUrl, setLiveUrl] = useState("");
  const [projectDate, setProjectDate] = useState("");
  const [technologies, setTechnologies] = useState([]);
  const [selectedTech, setSelectedTech] = useState([]);

  const [loadingSubmit, setLoadingSubmit] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      console.log("Session info:", currentUser);
      if (currentUser) {
        setUser(currentUser);
        fetchTechnologies();
      } else {
        console.warn("User not logged in");
        router.push("/login");
      }
      setLoadingUser(false);
    });

    const fetchTechnologies = async () => {
      try {
        const snapshot = await getDocs(collection(db, "technologies"));
        const techs = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setTechnologies(techs);
      } catch (error) {
        console.error("Fetch tech error:", error);
      }
    };

    return () => unsubscribe();
  }, [router]);

  const handleLogout = async () => {
    await signOut(auth);
    router.push("/login");
  };

  const handleTechChange = (techId) => {
    setSelectedTech((prev) =>
      prev.includes(techId)
        ? prev.filter((id) => id !== techId)
        : [...prev, techId]
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!imageFile) {
      setMessage("Please select an image file.");
      return;
    }

    setLoadingSubmit(true);
    setMessage("");

    try {
      // 1. Upload gambar to Cloudinary
      const { uploadToCloudinary } = await import("@/lib/cloudinary");
      const publicUrl = await uploadToCloudinary(imageFile);

      if (!publicUrl)
        throw new Error("Could not retrieve public URL from Cloudinary");

      // 2. Insert ke tabel projects
      // In Firebase, we can store selected technologies directly as an array of IDs
      const newProjectData = {
        title,
        description,
        category,
        image_url: publicUrl,
        github_url: githubUrl,
        live_url: liveUrl,
        project_date: projectDate,
        technology_ids: selectedTech, // Store array directly
        created_at: new Date().toISOString(),
      };

      const docRef = await addDoc(collection(db, "projects"), newProjectData);

      console.log("Project inserted with ID: ", docRef.id);

      setMessage("Project added successfully!");
      // Reset form
      setTitle("");
      setDescription("");
      setCategory("");
      setImageFile(null);
      setGithubUrl("");
      setLiveUrl("");
      setProjectDate("");
      setSelectedTech([]);
      e.target.reset();
    } catch (error) {
      setMessage(`Error: ${error.message}`);
      console.error("Submission Error:", error);
    } finally {
      setLoadingSubmit(false);
    }
  };

  if (loadingUser) {
    return <p className="p-8 text-center">Checking session...</p>;
  }
  return (
    user && (
      <div className=" max-w-5xl h-screen mx-auto">
        <form
          onSubmit={handleSubmit}
          className="space-y-6 bg-white p-8 rounded-lg shadow-md"
        >
          <h2 className="text-2xl font-semibold mb-4 border-b pb-4">
            Add New Project
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <input
              type="text"
              placeholder="Project Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-3 border rounded-md"
              required
            />
            <input
              type="text"
              placeholder="Category (e.g., Web Application)"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full p-3 border rounded-md"
            />
          </div>

          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-3 border rounded-md"
            rows="4"
            required
          />

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Project Image
            </label>
            <input
              type="file"
              onChange={(e) => setImageFile(e.target.files[0])}
              className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <input
              type="url"
              placeholder="GitHub URL"
              value={githubUrl}
              onChange={(e) => setGithubUrl(e.target.value)}
              className="w-full p-3 border rounded-md"
            />
            <input
              type="url"
              placeholder="Live URL / Demo"
              value={liveUrl}
              onChange={(e) => setLiveUrl(e.target.value)}
              className="w-full p-3 border rounded-md"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Project Date
            </label>
            <input
              type="date"
              value={projectDate}
              onChange={(e) => setProjectDate(e.target.value)}
              className="w-full p-3 border rounded-md"
              required
            />
          </div>

          <div className="border p-4 rounded-md">
            <h3 className="font-semibold mb-2">Technologies Used</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {technologies.map((tech) => (
                <label
                  key={tech.id}
                  className="flex items-center gap-2 text-sm cursor-pointer"
                >
                  <input
                    type="checkbox"
                    className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    checked={selectedTech.includes(tech.id)}
                    onChange={() => handleTechChange(tech.id)}
                  />
                  {tech.name}
                </label>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button
              type="submit"
              disabled={loadingSubmit}
              className="bg-green-600 text-white px-8 py-3 rounded-md disabled:bg-gray-400 hover:bg-green-700 transition-colors"
            >
              {loadingSubmit ? "Submitting..." : "Add Project"}
            </button>
            {message && (
              <p
                className={`mt-4 text-sm ${
                  message.startsWith("Error")
                    ? "text-red-600"
                    : "text-green-600"
                }`}
              >
                {message}
              </p>
            )}
          </div>
        </form>
      </div>
    )
  );
}
