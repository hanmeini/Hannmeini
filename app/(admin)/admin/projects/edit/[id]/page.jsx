import { supabase } from '@/lib/supabaseClient';
import EditProjectForm from '@/components/admin/EditProjects'; 
import { notFound } from 'next/navigation';

// Fungsi ini mengambil data awal untuk satu proyek
async function getProjectData(id) {
  const { data: project, error } = await supabase
    .rpc('get_project_by_id', { p_id: id })
    .single();
  
  if (error) {
    console.error(error);
    notFound();
  }
  return project;
}

export default async function EditProjectPage({ params }) {
  const project = await getProjectData(params.id);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Edit Project: {project.title}</h1>
      <EditProjectForm project={project} />
    </div>
  );
}