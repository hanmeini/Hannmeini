'use client';
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function EditProjectForm({ project }) {
  const [title, setTitle] = useState(project.title);
  const [description, setDescription] = useState(project.description);
  const [category, setCategory] = useState(project.category);
  const [githubUrl, setGithubUrl] = useState(project.github_url);
  const [liveUrl, setLiveUrl] = useState(project.live_url);
  const [projectDate, setProjectDate] = useState(project.project_date);
  const [imageFile, setImageFile] = useState(null); 
  const [currentImageUrl, setCurrentImageUrl] = useState(project.image_url);

  const [technologies, setTechnologies] = useState([]);
  const [selectedTech, setSelectedTech] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const router = useRouter();

  useEffect(() => {
    // Ambil semua teknologi dan set teknologi yang sudah dipilih untuk proyek ini
    const fetchAndSetTechnologies = async () => {
      const { data: allTech } = await supabase.from('technologies').select('id, name');
      if (allTech) setTechnologies(allTech);
      
      // Ambil ID dari nama teknologi yang ada di proyek
      if (project.technologies && allTech) {
        const selectedIds = allTech
          .filter(tech => project.technologies.includes(tech.name))
          .map(tech => tech.id);
        setSelectedTech(selectedIds);
      }
    };
    fetchAndSetTechnologies();
  }, [project]);

  const handleTechChange = (techId) => {
    setSelectedTech(prev =>
      prev.includes(techId)
        ? prev.filter(id => id !== techId)
        : [...prev, techId]
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      let imageUrl = currentImageUrl;

      // Jika ada file gambar baru, upload dulu
      if (imageFile) {
        const fileName = `${Date.now()}_${imageFile.name}`;
        const { error: uploadError } = await supabase.storage
          .from('project-images')
          .upload(fileName, imageFile);
        if (uploadError) throw uploadError;

        const { data: publicData } = supabase.storage
          .from('project-images')
          .getPublicUrl(fileName);
        
        imageUrl = publicData.publicUrl;
      }

      // 1. Update data di tabel 'projects'
      const { error: projectError } = await supabase
        .from('projects')
        .update({ 
          title, 
          description, 
          category,
          github_url: githubUrl,
          live_url: liveUrl,
          project_date: projectDate,
          image_url: imageUrl,
        })
        .eq('id', project.id);
      if (projectError) throw projectError;

      // 2. Update relasi di 'project_technologies'
      const { error: deleteError } = await supabase
        .from('project_technologies')
        .delete()
        .eq('project_id', project.id);
      if (deleteError) throw deleteError;

      if (selectedTech.length > 0) {
        const newTechLinks = selectedTech.map(techId => ({
          project_id: project.id,
          technology_id: techId,
        }));
        const { error: insertError } = await supabase
          .from('project_technologies')
          .insert(newTechLinks);
        if (insertError) throw insertError;
      }
      
      setMessage('Project updated successfully!');
      router.push('/admin/projects');
      router.refresh();

    } catch (error) {
      setMessage('Error updating project: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-white p-8 rounded-lg shadow-md">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <input type="text" placeholder="Project Title" value={title} onChange={e => setTitle(e.target.value)} className="w-full p-3 border rounded-md" required />
        <input type="text" placeholder="Category (e.g., Web Application)" value={category} onChange={e => setCategory(e.target.value)} className="w-full p-3 border rounded-md" />
      </div>
      
      <textarea placeholder="Description" value={description} onChange={e => setDescription(e.target.value)} className="w-full p-3 border rounded-md" rows="4" required />
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Project Image</label>
        <div className="flex items-center gap-4">
          <Image src={currentImageUrl} alt="Current project image" width={100} height={56} className="rounded-md object-cover border" />
          <input type="file" onChange={e => setImageFile(e.target.files[0])} className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100" />
        </div>
        <p className="text-xs text-gray-500 mt-1">Leave empty if you don't want to change the image.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <input type="url" placeholder="GitHub URL" value={githubUrl} onChange={e => setGithubUrl(e.target.value)} className="w-full p-3 border rounded-md" />
        <input type="url" placeholder="Live URL / Demo" value={liveUrl} onChange={e => setLiveUrl(e.target.value)} className="w-full p-3 border rounded-md" />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Project Date</label>
        <input type="date" value={projectDate} onChange={e => setProjectDate(e.target.value)} className="w-full p-3 border rounded-md" required />
      </div>

      <div className="border p-4 rounded-md">
        <h3 className="font-semibold mb-2">Technologies Used</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {technologies.map(tech => (
            <label key={tech.id} className="flex items-center gap-2 text-sm cursor-pointer">
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
        <button type="submit" disabled={loading} className="bg-blue-600 text-white px-8 py-3 rounded-md disabled:bg-gray-400 hover:bg-blue-700 transition-colors">
          {loading ? 'Saving...' : 'Save Changes'}
        </button>
        <button type="button" onClick={() => router.push('/admin/projects')} className="bg-gray-200 text-gray-800 px-8 py-3 rounded-md hover:bg-gray-300 transition-colors">
          Cancel
        </button>
        {message && <p className={`text-sm ${message.startsWith('Error') ? 'text-red-600' : 'text-green-600'}`}>{message}</p>}
      </div>
    </form>
  );
}