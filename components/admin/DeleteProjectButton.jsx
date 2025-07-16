'use client';
import { supabase } from '@/lib/supabaseClient';
import { useRouter } from 'next/navigation';
import { FiTrash2 } from 'react-icons/fi';

export default function DeleteProjectButton({ projectId }) {
  const router = useRouter();

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this project? This action cannot be undone.')) {
      const { error } = await supabase
        .from('projects')
        .delete()
        .eq('id', projectId);

      if (error) {
        alert('Error deleting project: ' + error.message);
      } else {
        alert('Project deleted successfully.');
        router.refresh(); // Refresh halaman daftar proyek
      }
    }
  };

  return (
    <button onClick={handleDelete} className="text-red-500 hover:underline">
      <FiTrash2 />
    </button>
  );
}