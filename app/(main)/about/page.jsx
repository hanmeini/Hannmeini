'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { FiCode, FiCoffee, FiAward, FiBookOpen } from 'react-icons/fi';
import Link from 'next/link';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

const galleryPhotos = [
  { src: '/logos/poto1.jpg', alt: 'Foto profil', className: 'col-span-2 row-span-2' },
  { src: '/logos/poto7.jpg', alt: 'Foto proyek Selaras', className: 'col-span-2 row-span-1' },
  { src: '/logos/poto3.jpg', alt: 'Foto setup kerja', className: 'col-span-1 row-span-1' },
  { src: '/logos/poto4.jpg', alt: 'Foto saat lomba', className: 'col-span-1 row-span-1' },
  { src: '/logos/poto5.jpg', alt: 'Foto lainnya 1', className: 'col-span-1 row-span-1' },
  { src: '/logos/poto6.jpg', alt: 'Foto lainnya 2', className: 'col-span-1 row-span-1' },
  { src: '/logos/poto2.jpg', alt: 'Foto lainnya 2', className: 'col-span-2 row-span-1' },
];

const certificates = [
  { 
    id: 1,
    src: '/logos/sertif1.png', 
    alt: 'Sertifikat Juara 1 Lomba Web Desain',
    title: '1st Place - National Web Design Competition',
    description: 'Achieved first place by developing "Selaras", a web platform focused on solving food waste. This project demonstrated proficiency in front-end development, UI/UX implementation, and problem-solving.',
  },
  { 
    id: 2,
    src: '/logos/sertif2.png', 
    alt: 'Sertifikat JavaScript Fundamental',
    title: 'JavaScript Fundamentals Certification',
    description: 'Completed a comprehensive course covering core JavaScript concepts, including ES6+, DOM manipulation, and asynchronous programming, laying a strong foundation for web development.',
  },
  { 
    id: 3,
    src: '/logos/sertif3.png', 
    alt: 'Sertifikat React Basics',
    title: 'React Basics Workshop',
    description: 'Participated in an intensive workshop on React, learning about component-based architecture, state management, and hooks to build modern, interactive user interfaces.',
  },
  { 
    id: 4,
    src: '/logos/sertif4.png', 
    alt: 'Sertifikat React Basics',
    title: 'React Basics Workshop',
    description: 'Participated in an intensive workshop on React, learning about component-based architecture, state management, and hooks to build modern, interactive user interfaces.',
  },
  { 
    id: 5,
    src: '/logos/sertif5.png', 
    alt: 'Sertifikat React Basics',
    title: 'React Basics Workshop',
    description: 'Participated in an intensive workshop on React, learning about component-based architecture, state management, and hooks to build modern, interactive user interfaces.',
  },
];

const experiences = [
    {
    company: 'GoPay',
    role: 'UI/UX Design Intern',
    description: [
      'As a UI/UX Designer Intern at GoPay, I had the privilege of contributing to the dynamic and innovative world of digital payments. During my internship, I immersed myself in the intricacies of creating seamless and user-friendly interfaces that align with GoPay commitment to providing an exceptional financial experience.',
      'I Collaborated with the design team to create visually appealing and intuitive user interfaces for GoPay mobile and web applications. Assisted in designing clean, modern layouts that enhanced the overall user experienced.',
      'I Engaged in cross-functional collaboration with developers, product managers, and fellow designers. Participated in design sprints and brainstorming sessions to ideate and solve complex design challenges.'
    ]
  },
  {
    company: 'National Web Design Competition',
    role: '1st Place Winner & Frontend Developer',
    description: [
      'Developed "Saresa", a web platform focused on solving food waste, which won first place in a national competition. My role involved translating a complex UI/UX design into a pixel-perfect, responsive, using vanilla HTML, CSS, and JavaScript.',
      'This experience honed my skills in front-end architecture, DOM manipulation, and creating fluid animations with pure CSS, proving my ability to deliver a high-quality product under competitive pressure.'
    ]
  },
    {
    company: 'National Web Design Competition',
    role: '3rd Place Winner & Frontend Developer',
    description: [
      'Developed "Swara", a web platform focused on solving food waste, which won first place in a national competition. My role involved translating a complex UI/UX design into a pixel-perfect, responsive, using vanilla HTML, CSS, and JavaScript.',
      'This experience honed my skills in front-end architecture, DOM manipulation, and creating fluid animations with pure CSS, proving my ability to deliver a high-quality product under competitive pressure.'
    ]
  },
];

export default function AboutPage() {
  const [selectedCert, setSelectedCert] = useState(0);

  const handleNext = () => {
    setSelectedCert((prev) => (prev + 1) % certificates.length);
  };

  const handlePrev = () => {
    setSelectedCert((prev) => (prev - 1 + certificates.length) % certificates.length);
  };

  return (
    <section id="about" className="py-20 lg:py-24 bg-white px-4 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5 }}
        >
          <div className='flex flex-row justify-between items-center'>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800" style={{ fontFamily:'asgard' }}>About</h2>
            <Link href='/' className='bg-[#1E1E1E] py-4 px-10 rounded-xl text-white font-medium'>Home</Link>
          </div>
          <hr className="mt-4 mb-20 text-gray-300 w-full" />
        </motion.div>
        
        <div className="grid grid-cols-4 grid-rows-3 gap-4 h-[300px] md:h-[700px] max-w-4xl mx-auto">
          {galleryPhotos.map((photo, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`relative rounded-lg overflow-hidden ${photo.className}`}
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                sizes="(max-width: 768px) 50vw, 25vw"
                className="object-cover hover:scale-105 transition-transform duration-300"
              />
            </motion.div>
          ))}
        </div>

        <div className="max-w-4xl mx-auto text-center my-24">
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.8 }}
            className="text-lg md:text-2xl text-gray-600 leading-relaxed"
          >
            I'm a Software Development student with a deep passion for technology and creativity. My journey began with a simple "Hello, World!", which quickly grew into a mission to build beautiful, functional, and user-centric digital solutions.
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="my-24 max-w-2xl mx-auto flex flex-row"
        >
          <div className="flex-1 p-2 md:p-6 text-center">
            <FiCode className="mx-auto w-8 h-8  mb-2" />
            <p className="text-md md:text-2xl font-bold">10+</p>
            <p className="text-sm text-gray-500">Projects</p>
          </div>
          <div className="flex-1 p-2 md:p-6 text-center">
            <FiCoffee className="mx-auto w-8 h-8  mb-2" />
            <p className="text-md md:text-2xl font-bold">2</p>
            <p className="text-sm text-gray-500">Awards</p>
          </div>
          <div className="flex-1 p-2 md:p-6 text-center">
            <FiAward className="mx-auto w-8 h-8  mb-2" />
            <p className="text-md md:text-2xl font-bold">2+</p>
            <p className="text-sm text-gray-500">Years</p>
          </div>
          <div className="flex-1 p-2 md:p-6 text-center">
            <FiBookOpen className="mx-auto w-8 h-8 mb-2" />
            <p className="text-md md:text-2xl font-bold">10+</p>
            <p className="text-sm text-gray-500">Skills Learned</p>
          </div>
        </motion.div>

        <section className="mb-24 max-w-6xl">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800" style={{ fontFamily:'asgard' }}>Achievements</h2>
          <hr className="mt-4 text-gray-300 w-full mb-20 md:mb-auto" />
          
          {/* DESKTOP VIEW */}
          <div className="hidden lg:grid grid-cols-2 gap-12 min-h-[500px]">
            {/* Kolom kiri: tumpukan sertifikat */}
            <div className="relative h-full flex justify-center items-center">
              {certificates.map((cert, index) => (
                <motion.div
                  key={cert.id}
                  initial={{ opacity: 0, y: 100 }}
                  animate={{
                    x: selectedCert === index ? -150 : 0,
                    scale: selectedCert === index ? 1.1 : 0.9,
                    zIndex: certificates.length - Math.abs(selectedCert - index),
                    opacity: selectedCert === index ? 1 : 0.5,
                  }}
                  transition={{ type: 'spring', stiffness: 100, damping: 20 }}
                  className="absolute w-80 h-56 md:w-96 md:h-64 flex items-center shadow-2xl rounded-lg cursor-pointer bg-gray-100"
                  onClick={() => setSelectedCert(index)}
                >
                  <Image src={cert.src} alt={cert.alt} fill className="object-cover rounded-lg" />
                </motion.div>
              ))}
            </div>

            {/* Kanan: Deskripsi (dengan perbaikan centering) */}
            <div className="relative flex flex-col justify-center h-full">
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedCert}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="w-full"
                >
                  <h3 className="text-2xl font-bold text-gray-900">{certificates[selectedCert].title}</h3>
                  <p className="mt-4 text-lg text-gray-600 leading-relaxed">{certificates[selectedCert].description}</p>
                </motion.div>
              </AnimatePresence>

              {/* Tombol navigasi (desktop) */}
              <div className="mt-6 flex gap-4">
                <button
                  onClick={handlePrev}
                  className="bg-gray-100 hover:bg-gray-200 p-3 rounded-full border shadow-sm transition-colors"
                >
                  <FiChevronLeft />
                </button>
                <button
                  onClick={handleNext}
                  className="bg-gray-100 hover:bg-gray-200 p-3 rounded-full border shadow-sm transition-colors"
                >
                  <FiChevronRight />
                </button>
              </div>
            </div>
          </div>

          {/* MOBILE VIEW: Swipe dan tombol */}
          <div className="lg:hidden flex flex-col items-center space-y-8">
            <div className="relative w-full max-w-sm h-56 sm:h-64 shadow-2xl rounded-lg bg-gray-100 overflow-hidden cursor-grab">
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedCert}
                  className="relative w-full h-full"
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ duration: 0.4 }}
                  drag="x"
                  dragConstraints={{ left: 0, right: 0 }}
                  onDragEnd={(e, info) => {
                    if (info.offset.x < -50) handleNext();
                    else if (info.offset.x > 50) handlePrev();
                  }}
                >
                  <Image
                    src={certificates[selectedCert].src}
                    alt={certificates[selectedCert].alt}
                    fill
                    className="object-cover rounded-lg"
                  />
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Deskripsi */}
            <div className="text-center px-4">
              <h3 className="text-xl font-bold text-gray-900">{certificates[selectedCert].title}</h3>
              <p className="mt-2 text-gray-600">{certificates[selectedCert].description}</p>
            </div>

            {/* Tombol navigasi */}
            <div className="flex gap-4">
              <button
                onClick={handlePrev}
                className="bg-gray-100 hover:bg-gray-200 p-3 rounded-full border shadow-sm transition-colors"
              >
                <FiChevronLeft />
              </button>
              <button
                onClick={handleNext}
                className="bg-gray-100 hover:bg-gray-200 p-3 rounded-full border shadow-sm transition-colors"
              >
                <FiChevronRight />
              </button>
            </div>
          </div>
        </section>

        <section className="my-24 max-w-6xl">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800" style={{ fontFamily:'asgard' }}>My Experience</h2>
          <hr className="mt-4 text-gray-300 w-full mb-20" />
          <div className="space-y-20">
            {experiences.map((exp, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6 }}
                className='border-b border-gray-200 pb-5'
              >
                <div className=" pb-8">
                  <h3 className="text-xl md:text-4xl font-bold text-gray-900">{exp.company}</h3>
                  <p className="text-lg text-gray-500 mt-1">{exp.role}</p>
                </div>
                <div className="mt-8 text-gray-700 text-lg leading-relaxed space-y-5">
                  {exp.description.map((paragraph, pIndex) => (
                    <p key={pIndex}>{paragraph}</p>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      </div>
    </section>
  );
}
