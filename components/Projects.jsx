'use client'
import Link from 'next/link';
import { supabase } from '@/lib/supabaseClient';
import ProjectCard from './ProjectCard';
import { useEffect, useState } from 'react';

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(()=>{
    const fetchProjects = async () => {
      const {data, error} = await supabase
      .from('projects')
      .select('*')
      .order('project_date', {ascending : false});

      if (error) {
        console.error('Error fetching projects:', error.message)
      } else {
        setProjects(data)
      }

      setLoading(false)
    }
    fetchProjects();
  },[])

  return (
    <section id="projects" className="py-20 px-4">
      <div className="max-w-[68rem] mx-auto">
        <div className="flex justify-between items-center">
          <h2 className="text-xl md:text-3xl font-bold" style={{ fontFamily: 'asgard' }}>My works</h2>
          <Link
            href="/"
            className="text-xl md:text-2xl font-semibold pb-1 bg-gradient-to-r from-black to-black bg-no-repeat bg-bottom bg-[length:0%_2px] hover:bg-[length:100%_2px] transition-all duration-300 ease-in-out"
          >
            All works
          </Link>
        </div>
        <hr className='my-14 border-gray-300' />

        {loading? (
          <p className='text-center text-gray-600'>Loading Projects...</p>
        ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project) => (
              <ProjectCard key={project.id} project={{
                ...project,
                imageUrl: project.image_url, 

              }} />
          ))}
        </div>
        )}
      </div>
    </section>
  );
}