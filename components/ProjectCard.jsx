// components/ui/ProjectCard.tsx
"use client";
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function ProjectCard({ project }) {
  const textColor = project.bgColor === 'bg-gray-100' ? 'text-neutral-800' : 'text-white';

  return (
    <Link href={project.link} legacyBehavior>
      <motion.div
        className={`block rounded-xl overflow-hidden ${project.bgColor}`}
        whileHover={{ scale: 1.03 }}
        transition={{ type: 'spring', stiffness: 300 }}
      >
        <div className="relative w-full h-64 md:h-80">
          <Image
            src={project.imageUrl}
            alt={`Mockup of ${project.title}`}
            fill
            className="object-cover"
          />
        </div>
        <div className="p-6">
          <h3 className={`text-xl font-bold ${textColor}`}>{project.title}</h3>
          <p className={`text-sm mt-1 ${textColor === 'text-white' ? 'text-neutral-400' : 'text-neutral-500'}`}>
            {project.category}
          </p>
        </div>
      </motion.div>
    </Link>
  );
}