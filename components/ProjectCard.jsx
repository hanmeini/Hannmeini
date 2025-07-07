"use client";
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function ProjectCard({ project }) {
  return (
    <Link href={`/projects/${project.id}`}>
      <div className={`block rounded-xl overflow-hidden relative ${project.bgColor}`}>
        <div className="relative w-full h-[500px] overflow-hidden">
          <motion.div
            className="w-full h-full"
            whileHover={{ scale: 1.05 }}
            transition={{ type: 'keyframes', stiffness: 300 }}
          >
            <Image
              src={project.imageUrl}
              alt={`Mockup of ${project.title}`}
              fill
              className="object-cover transition-transform duration-300"
            />
          </motion.div>

          {/* Overlay gradasi hitam */}
          <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-black/70 to-transparent z-10" />

          {/* Teks di atas overlay */}
          <div className="absolute bottom-4 p-5 left-4 right-4 z-20">
            <h3 className="text-5xl font-bold text-white" style={{ fontFamily:'asgard' }}>{project.title}</h3>
            <p className="text-2xl font-medium mt-1 text-gray-300">{project.category}</p>
          </div>
        </div>
      </div>
    </Link>
  );
}
