"use client";
import Image from 'next/image';
import { motion } from 'framer-motion';
import { FiLinkedin, FiGithub, FiTwitter, FiInstagram } from 'react-icons/fi';

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
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800">About</h2>
          <hr className="mt-4 border-t-2 border-gray-200 w-24" />
        </motion.div>
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-12 items-center">
          <motion.div
            className="md:col-span-2"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7 }}
          >
            <p className="text-base md:text-lg text-gray-600 leading-relaxed">
              I am a passionate and detail-oriented Software Development student with hands-on experience in creating intuitive and functional web applications.
            </p>
            <p className="mt-4 text-base md:text-lg text-gray-600 leading-relaxed">
              My journey in the tech field has equipped me with a diverse skill set that combines problem-solving, clean code principles, and a strong understanding of modern web technologies.
            </p>
            <div className="mt-8 flex items-center gap-4 flex-wrap">
              <button className="bg-gray-200 text-gray-800 font-semibold py-2 px-5 rounded-full hover:bg-gray-300 transition-colors">
                About Me
              </button>
              <div className="flex items-center gap-4 text-gray-500">
                <a href="#" target="_blank" rel="noopener noreferrer" aria-label="Twitter" className="hover:text-blue-500 transition-colors"><FiTwitter size={22} /></a>
                <a href="#" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="hover:text-blue-500 transition-colors"><FiLinkedin size={22} /></a>
                <a href="#" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="hover:text-blue-500 transition-colors"><FiGithub size={22} /></a>
                <a href="#" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="hover:text-blue-500 transition-colors"><FiInstagram size={22} /></a>
              </div>
            </div>
          </motion.div>
          <motion.div
            className="flex justify-center md:justify-end"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.7 }}
          >
            <div className="relative w-64 h-64 md:w-80 md:h-80">
              <Image
                src="/images/your-photo.jpg" // GANTI DENGAN PATH FOTO ANDA
                alt="Your Name"
                fill
                className="rounded-full object-cover shadow-lg"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}