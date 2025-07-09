'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FiExternalLink } from 'react-icons/fi';

export default function SingleProject({ project, index }) {
  // Menentukan apakah layout ini genap atau ganjil untuk efek zig-zag
  const isOdd = index % 2 !== 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6 }}
      className='group'
    >
      {/* Kunci dari layout zig-zag ada di sini:
        - lg:flex-row-reverse akan membalik urutan (gambar di kanan) jika index-nya ganjil.
      */}
      <div className={`flex flex-col lg:flex-row ${isOdd ? 'lg:flex-row-reverse' : ''} gap-12 items-center`}>
        
        {/* Kolom Gambar */}
        <div className="w-full lg:w-1/2">
          <div className="relative w-full h-80 lg:h-96 rounded-lg bg-gray-100 overflow-hidden transition-all duration-500 ease-in-out group-hover:shadow-xl group-hover:-translate-y-2">
            <Image
              src={project.image_url}
              alt={`Showcase image for ${project.title}`}
              fill
              className="object-cover"
            />
          </div>
        </div>

        {/* Kolom Teks */}
        <div className="w-full lg:w-1/2">
          <h1 className="text-4xl md:text-5xl font-medium text-gray-900 inline-block">
            <span className="pb-2 bg-gradient-to-r from-black to-black bg-no-repeat bg-bottom bg-[length:0%_3px] group-hover:bg-[length:100%_3px] transition-all duration-500" style={{ fontFamily:'asgard' }}>
              {project.title}
            </span>
          </h1>
          <p className="mt-5 text-base text-gray-600 leading-relaxed">
            {project.description}
          </p>
          <div className="flex flex-wrap gap-2 mt-5">
            {project.technologies?.map((tech) => (
            <span key={tech} className="bg-gray-200 text-gray-700 text-xs font-medium px-3 py-1 rounded-full">
                {tech}
            </span>
            ))}
          </div>
            <Link 
            href={`projects/${project.id}`} 
            className="inline-flex items-center gap-2 mt-8 text-lg font-semibold text-blue-600 hover:text-blue-800 w-fit"
            >
                <span className="pb-1 bg-gradient-to-r from-blue-500 to-blue-500 bg-no-repeat bg-bottom bg-[length:0%_2px] group-hover:bg-[length:100%_2px] transition-all duration-500">
                View Project
                </span>
                <FiExternalLink className="transition-transform duration-500 group-hover:translate-x-1" />
            </Link>
        </div>
        
      </div>
    </motion.div>
  );
}