"use client";

import { useState, useEffect } from "react";
// import { supabase } from '@/lib/supabaseClient';
import { auth } from "@/lib/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useRouter, usePathname } from "next/navigation";
import Sidebar from "@/components/admin/Sidebar";

export default function AdminDashboardLayout({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      } else {
        // If not logged in and trying to access admin routes (except login which is outside this layout usually?)
        // If this layout wraps '/admin', then correct.
        router.push("/login");
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, [router]);

  const handleLogout = async () => {
    await signOut(auth);
    router.push("/login");
  };

  if (loading) {
    return <p>Loading admin layout...</p>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar user={user} handleLogout={handleLogout} />
      <main className="sm:ml-64">
        <div className="p-4 md:p-8">{children}</div>
      </main>
    </div>
  );
}
