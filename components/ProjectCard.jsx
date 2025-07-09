"use client";
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function ProjectCard({ project }) {
  return (
    <Link href={`/projects/${project.id}`}>
      <div className={`block rounded-xl overflow-hidden relative ${project.bgColor}`}>
        <div className="relative group w-full h-64 md:h-[550px] overflow-hidden">
            <Image
              src={project.imageUrl}
              alt={`Mockup of ${project.title}`}
              fill
              className="object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
            />


          <div className="absolute bottom-0 left-0 w-full h-2/3 bg-gradient-to-t from-black/70 to-transparent z-10" />

          <div className="absolute bottom-4 p-4 md:p-5 left-4 right-4 z-20">
            <h3 className="text-xl md:text-5xl font-medium text-white" style={{ fontFamily:'asgard' }}>{project.title}</h3>
            <p className="text-sm md:text-2xl font-medium text-gray-300">{project.category}</p>
          </div>
        </div>
      </div>
    </Link>
  );
}
