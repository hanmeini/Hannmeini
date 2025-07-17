import { supabase } from '@/lib/supabaseClient';
import Link from 'next/link';
import Image from 'next/image';
import DeleteExperienceButton from '@/components/admin/DeleteExperiencesButton'; // Komponen baru

export default async function ListExperiencesPage() {
  // 1. Mengambil data dari tabel 'experiences'
  // 2. Mengurutkan berdasarkan 'start_date' yang ada di tabel ini
  const { data: experiences, error } = await supabase
    .from('experiences')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error("Supabase error:", error.message);
    return <p>Could not fetch experiences. Check the console for more details.</p>;
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Manage Experiences</h1>
        {/* 3. Link mengarah ke halaman tambah pengalaman yang benar */}
        <Link href="/admin/experiences/new" className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors">
          + Add New Experience
        </Link>
      </div>
      <div className="bg-white rounded-lg shadow overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-gray-50">
            <tr className="border-b">
              <th className="p-4 font-semibold">Role / Title</th>
              <th className="p-4 font-semibold">Company / Organization</th>
              <th className="p-4 font-semibold">Start Date</th>
              <th className="p-4 font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {experiences.map(exp => (
              <tr key={exp.id} className="border-b hover:bg-gray-50">
                {/* 4. Menampilkan kolom yang benar: 'role' dan 'company' */}
                <td className="p-4 font-medium text-gray-800">{exp.title}</td>
                <td className="p-4 text-gray-600">{exp.description}</td>
                <td className="p-4 text-gray-600">{new Date(exp.created_at).toLocaleDateString()}</td>
                <td className="p-4 flex items-center gap-4">
                  <Link href={`/admin/experiences/edit/${exp.id}`} className="text-blue-500 hover:underline">Edit</Link>
                  {/* 5. Menggunakan komponen DeleteExperienceButton */}
                  <DeleteExperienceButton experienceId={exp.id} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}