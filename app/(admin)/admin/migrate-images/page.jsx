"use client";

import { useState, useEffect } from "react";
import { db } from "@/lib/firebase";
import { collection, getDocs, updateDoc, doc } from "firebase/firestore";
import { uploadToCloudinary } from "@/lib/cloudinary";

export default function ImageMigrationPage() {
  const [logs, setLogs] = useState([]);
  const [isMigrating, setIsMigrating] = useState(false);
  const [completed, setCompleted] = useState(false);

  const addLog = (message) => {
    setLogs((prev) => [
      ...prev,
      `${new Date().toLocaleTimeString()} - ${message}`,
    ]);
  };

  const migrateCollection = async (
    collectionName,
    imageField = "image_url"
  ) => {
    addLog(`Starting migration for ${collectionName}...`);
    try {
      const querySnapshot = await getDocs(collection(db, collectionName));
      const total = querySnapshot.size;
      let count = 0;

      for (const document of querySnapshot.docs) {
        const data = document.data();
        const currentImage = data[imageField];

        // Check if image exists and is NOT already a cloudinary url
        if (currentImage && !currentImage.includes("cloudinary.com")) {
          addLog(`Migrating image for ${document.id}...`);
          try {
            // Upload to Cloudinary (passing the URL lets Cloudinary fetch it)
            const newUrl = await uploadToCloudinary(currentImage);

            // Update Firestore
            await updateDoc(doc(db, collectionName, document.id), {
              [imageField]: newUrl,
            });

            addLog(`Success: ${document.id} -> ${newUrl}`);
          } catch (err) {
            addLog(`Failed to migrate ${document.id}: ${err.message}`);
          }
        } else {
          addLog(`Skipping ${document.id} (No image or already migrated)`);
        }
        count++;
      }
      addLog(`Completed ${collectionName}.`);
    } catch (err) {
      addLog(`Error accessing ${collectionName}: ${err.message}`);
    }
  };

  const handleMigration = async () => {
    if (
      !confirm(
        "This will upload all existing images from Supabase URL to Cloudinary and update Firestore. Ensure Cloudinary settings are correct. Continue?"
      )
    )
      return;

    setIsMigrating(true);
    setLogs([]);
    setCompleted(false);

    await migrateCollection("projects", "image_url");
    await migrateCollection("certificates", "image_url");
    // Experiences don't have images in schemas currently viewed

    setIsMigrating(false);
    setCompleted(true);
    addLog("All image migrations finished.");
  };

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Migrate Images to Cloudinary</h1>

      <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
        <p className="font-bold">Important:</p>
        <p>
          Ensure `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME` and
          `NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET` are set in `.env.local`.
        </p>
        <p>The Preset must be **Unsigned**.</p>
      </div>

      <button
        onClick={handleMigration}
        disabled={isMigrating}
        className="bg-purple-600 text-white px-6 py-3 rounded-md font-bold disabled:bg-gray-400 hover:bg-purple-700 transition"
      >
        {isMigrating ? "Migrating Images..." : "Start Image Migration"}
      </button>

      <div className="mt-8 bg-black text-green-400 p-4 rounded-md h-96 overflow-y-auto font-mono text-sm">
        {logs.length === 0 ? (
          <p className="text-gray-500">Logs will appear here...</p>
        ) : (
          logs.map((log, index) => <div key={index}>{log}</div>)
        )}
      </div>
    </div>
  );
}
