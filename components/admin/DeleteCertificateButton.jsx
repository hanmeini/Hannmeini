'use client';
import { supabase } from '@/lib/supabaseClient';
import { useRouter } from 'next/navigation';
import { FiTrash2 } from 'react-icons/fi';

export default function DeleteCertificateButton({ certificateId }) {
  const router = useRouter();

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this certificate?')) {
      const { error } = await supabase
        .from('certificates')
        .delete()
        .eq('id', certificateId);

      if (error) {
        alert('Error deleting certificate: ' + error.message);
      } else {
        alert('Certificate deleted successfully.');
        router.refresh();
      }
    }
  };

  return (
    <button onClick={handleDelete} className="text-red-500 hover:text-red-700 transition-colors p-2 rounded-full hover:bg-red-100">
      <FiTrash2 />
    </button>
  );
}