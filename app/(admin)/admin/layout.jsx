'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { useRouter } from 'next/navigation';
import Sidebar from '@/components/admin/Sidebar';

export default function AdminDashboardLayout({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        setUser(session.user);
      }
      setLoading(false);
    };
    checkSession();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/login');
  };

  if (loading) {
    return <p>Loading admin layout...</p>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar user={user} handleLogout={handleLogout} />
      <main className="sm:ml-64">
        <div className="p-4 md:p-8">
          {children}
        </div>
      </main>
    </div>
  );
}