"use client";
import Image from 'next/image';
import { motion } from 'framer-motion';
import { FiLinkedin, FiGithub, FiTwitter, FiInstagram } from 'react-icons/fi';
import Link from 'next/link';

export default function About() {
  return (
    <section id="about" className="py-20 lg:py-32 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5 }}
        >
        <div className='flex flex-row justify-between items-center'>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800" style={{ fontFamily:'asgard' }}>About</h2>
          <Link href='/' className='bg-[#1E1E1E] py-3 px-10 rounded-xl text-white md:text-xl font-medium'>Home</Link>
        </div>
          <hr className="mt-4 text-gray-300 w-full" />
        </motion.div>
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-12 items-center">
        <motion.div
            className="flex justify-center md:justify-end"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.7 }}
          >
            <div className="relative w-64 h-64 md:w-80 md:h-80">
              <Image
                src="/logos/rehanporto.png" 
                alt="Your Name"
                fill
                className="rounded-full object-cover shadow-lg"
              />
            </div>
          </motion.div>
          <motion.div
            className="md:col-span-2"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7 }}
          >
            <p className="text-base md:text-xl text-gray-600 leading-relaxed">
              I am a passionate and detail-oriented Software Development student with hands-on experience in creating intuitive and functional web applications.
            </p>
            <p className="mt-4 text-base md:text-xl text-gray-600 leading-relaxed">
              My journey in the tech field has equipped me with a diverse skill set that combines problem-solving, clean code principles, and a strong understanding of modern web technologies.
            </p>
            <div className="mt-8 flex items-center gap-4 flex-wrap">
              <button className="bg-gray-200 text-gray-800 font-semibold py-5 px-14 rounded-2xl hover:bg-gray-300 text-xl transition-colors">
                About Me
              </button>
              <div className="flex items-center gap-10 text-gray-500">
                <a href="#" target="_blank" rel="noopener noreferrer" aria-label="Twitter" className="text-black"><FiTwitter size={40} /></a>
                <a href="#" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="text-black"><FiLinkedin size={40} /></a>
                <a href="#" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="text-black"><FiGithub size={40} /></a>
                <a href="#" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-black"><FiInstagram size={40} /></a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}