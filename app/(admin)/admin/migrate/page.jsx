"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { db } from "@/lib/firebase";
import {
  collection,
  addDoc,
  getDocs,
  writeBatch,
  doc,
} from "firebase/firestore";

export default function MigrationPage() {
  const [status, setStatus] = useState("Idle");
  const [logs, setLogs] = useState([]);

  const addLog = (msg) =>
    setLogs((prev) => [
      ...prev,
      `${new Date().toISOString().split("T")[1].split(".")[0]} - ${msg}`,
    ]);

  const migrateCollection = async (tableName, collectionName) => {
    addLog(`Starting migration for ${tableName}...`);
    try {
      const { data, error } = await supabase.from(tableName).select("*");
      if (error) throw error;

      addLog(`Fetched ${data.length} records from Supabase '${tableName}'.`);

      if (data.length === 0) {
        addLog(`No data to migrate for ${tableName}.`);
        return;
      }

      const batch = writeBatch(db);
      let count = 0;

      // We process only regular fields. ID is usually auto-generated in Firestore,
      // but to preserve relationships or specific IDs, we can set it.
      // For now, let's let Firestore generate IDs but save the old ID in a field just in case.

      // Note: Firestore batch limit is 500. If we have more, we need chunks.
      // Assuming small dataset for portfolio.

      for (const item of data) {
        // Use the existing ID if possible, or add it to data
        // item.old_supabase_id = item.id;
        // delete item.id; // Let Firestore generate its own ID or use setDoc with item.id

        // Better approach: Use the same ID to ensure consistency if we re-run
        const docRef = doc(db, collectionName, item.id.toString());
        batch.set(docRef, item);
        count++;
      }

      await batch.commit();
      addLog(
        `Successfully wrote ${count} records to Firebase collection '${collectionName}'.`
      );
    } catch (err) {
      addLog(`Error migrating ${tableName}: ${err.message}`);
      console.error(err);
    }
  };

  const handleMigration = async () => {
    setStatus("Migrating...");
    setLogs([]);

    try {
      await migrateCollection("projects", "projects");
      await migrateCollection("experiences", "experiences");
      await migrateCollection("certificates", "certificates");

      setStatus("Done");
      addLog("All migrations completed.");
    } catch (error) {
      setStatus("Error");
      addLog(`Migration failed: ${error.message}`);
    }
  };

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">
        Supabase to Firebase Migration
      </h1>

      <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded">
        <p className="font-semibold text-yellow-800">Warning:</p>
        <p className="text-sm text-yellow-700">
          Ensure you have set up your Firebase environment variables in
          .env.local before running this. This script copies data from Supabase
          tables (projects, experiences, certificates) to Firebase Firestore. It
          attempts to preserve IDs.
        </p>
      </div>

      <button
        onClick={handleMigration}
        disabled={status === "Migrating..."}
        className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
      >
        {status === "Migrating..." ? "Migrating..." : "Start Migration"}
      </button>

      <div className="mt-8 bg-gray-900 text-green-400 p-4 rounded h-96 overflow-y-auto font-mono text-sm">
        {logs.length === 0 ? (
          <p className="text-gray-500">// Logs will appear here</p>
        ) : (
          logs.map((log, i) => <div key={i}>{log}</div>)
        )}
      </div>
    </div>
  );
}
