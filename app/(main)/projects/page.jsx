'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import SingleProject from '@/components/AllSingleProject';
import ProjectListSkeleton from '@/components/SkeletonProjects'

export default function AllProjectsPage() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('project_date', { ascending: false });

      if (error) {
        console.error('Gagal memuat proyek:', error.message);
      } else {
        setProjects(data);
      }

      setLoading(false);
    };

    fetchProjects();
  }, []);

  return (
    <div className="bg-white">
      <main className="max-w-7xl mx-auto px-4 py-24 sm:py-32">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900" style={{ fontFamily: 'asgard' }}>
            Let's See My Project
          </h1>
          <p className="mt-4 text-lg text-gray-600">These are some of the projects I've made</p>
        </div>

        {/* Daftar Proyek */}
        {loading ? (
          <ProjectListSkeleton count={3} />
        ) : (
          <div className="space-y-24">
            {projects.length === 0 ? (
              <div className="text-center text-red-500">Belum ada proyek ditemukan.</div>
            ) : (
              projects.map((project, index) => (
                <SingleProject key={project.id} project={project} index={index} />
              ))
            )}
          </div>
        )}
      </main>
    </div>
  );
}
