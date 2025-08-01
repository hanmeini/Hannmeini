import { supabase } from '@/lib/supabaseClient';
import EditExperienceForm from '@/components/admin/EditExperience'; // Komponen form yang akan kita buat
import { notFound } from 'next/navigation';

// Fungsi ini mengambil data awal untuk satu pengalaman berdasarkan ID dari URL
async function getExperience(id) {
  const { data, error } = await supabase
    .from('experiences')
    .select('*')
    .eq('id', id)
    .single();
  
  // Jika tidak ada data atau terjadi error, tampilkan halaman 404
  if (error || !data) {
    console.error("Error fetching experience:", error);
    notFound();
  }
  return data;
}

// Ini adalah Server Component yang mengambil data awal
export default async function EditExperiencePage({ params }) {
  const experience = await getExperience(params.id);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Edit Experience</h1>
      {/* Kita passing data awal pengalaman ke komponen form */}
      <EditExperienceForm experience={experience} />
    </div>
  );
}