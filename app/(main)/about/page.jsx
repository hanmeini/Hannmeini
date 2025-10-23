'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { FiCode, FiCoffee, FiAward, FiBookOpen } from 'react-icons/fi';
import Link from 'next/link';
import { supabase } from '@/lib/supabaseClient'; 
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import CertificateSkeleton from '@/components/CertificateSkeleton'; 
import ExperienceSkeleton from '@/components/ExperiencesSkeleton';

const galleryPhotos = [
  { src: '/logos/poto1.jpg', alt: 'Foto profil', className: 'col-span-2 row-span-2' },
  { src: '/logos/poto7.jpg', alt: 'Foto proyek Selaras', className: 'col-span-2 row-span-1' },
  { src: '/logos/poto3.jpg', alt: 'Foto setup kerja', className: 'col-span-1 row-span-1' },
  { src: '/logos/poto4.jpg', alt: 'Foto saat lomba', className: 'col-span-1 row-span-1' },
  { src: '/logos/han1st-place.jpg', alt: 'Binus 1st place', className: 'col-span-1 row-span-1' },
  { src: '/logos/poto6.jpg', alt: 'Foto lainnya 2', className: 'col-span-1 row-span-1' },
  { src: '/logos/poto2.jpg', alt: 'Foto lainnya 2', className: 'col-span-2 row-span-1' },
];



export default function AboutPage() {
  const [selectedCert, setSelectedCert] = useState(0);
  const [certificates, setCertificates] = useState([]);
  const [experiences, setExperiences] = useState([]);
  const [loadingCerts, setLoadingCerts] = useState(true);
  const [loadingExp, setLoadingExp] = useState(true)

  useEffect(() => {
    const fetchCertificates = async () => {
      setLoadingCerts(true);
      const { data, error } = await supabase
        .from('certificates')
        .select('*')
        .order('issue_date', { ascending: false });
      if (error) {
        console.error("Could not fetch certificates:", error);
        setCertificates([]);
      } else {
        setCertificates(data || []);
      }
      setLoadingCerts(false);
    };

    fetchCertificates();
  }, []); 

  useEffect(() => {
    const fetchExperiences = async () => {
      setLoadingExp(true);
      const { data, error } = await supabase
        .from('experiences')
        .select('*')
        .order('created_at', { ascending: false });
      if (error) {
        console.error("Could not fetch experiences:", error);
        setExperiences([]);
      } else {
        setExperiences(data || []);
      }
      setLoadingExp(false);
    };

    fetchExperiences();
  }, []); 

  const handleNext = () => {
    if (certificates.length === 0) return;
    setSelectedCert((prev) => (prev + 1) % certificates.length);
  };

  const handlePrev = () => {
    if (certificates.length === 0) return;
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
            <p className="text-md md:text-2xl font-bold">3+</p>
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
        
        {/* ======================================= */}
        {/* === 2. SECTION SERTIFIKAT INTERAKTIF === */}
        {/* ======================================= */}
        <section className="mb-24">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800" style={{ fontFamily:'asgard' }}>Achievements</h2>
          <hr className="mt-4 mb-20 md:mb-auto text-gray-300 w-full" />
          
          {loadingCerts ? (
            <CertificateSkeleton />
          ) : certificates.length > 0 ? (
            <>
              {/* DESKTOP VIEW */}
              <div className="hidden lg:grid grid-cols-2 gap-12 min-h-[500px]">
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
                      <Image src={cert.image_url} alt={cert.title || 'Certificate Image'} fill className="object-cover rounded-lg" />
                    </motion.div>
                  ))}
                </div>
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
                  <div className="mt-6 flex gap-4">
                    <button onClick={handlePrev} className="bg-gray-100 hover:bg-gray-200 p-3 rounded-full border shadow-sm transition-colors"><FiChevronLeft /></button>
                    <button onClick={handleNext} className="bg-gray-100 hover:bg-gray-200 p-3 rounded-full border shadow-sm transition-colors"><FiChevronRight /></button>
                  </div>
                </div>
              </div>

              {/* MOBILE VIEW */}
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
                      <Image src={certificates[selectedCert].image_url} alt={certificates[selectedCert].title || 'Certificate Image'} fill className="object-cover rounded-lg" />
                    </motion.div>
                  </AnimatePresence>
                </div>
                <div className="text-center px-4">
                  <h3 className="text-xl font-bold text-gray-900">{certificates[selectedCert].title}</h3>
                  <p className="mt-2 text-gray-600">{certificates[selectedCert].description}</p>
                </div>
                <div className="flex gap-4">
                  <button onClick={handlePrev} className="bg-gray-100 hover:bg-gray-200 p-3 rounded-full border shadow-sm transition-colors"><FiChevronLeft /></button>
                  <button onClick={handleNext} className="bg-gray-100 hover:bg-gray-200 p-3 rounded-full border shadow-sm transition-colors"><FiChevronRight /></button>
                </div>
              </div>
            </>
          ) : (
            <div className="text-center text-gray-500 min-h-[500px] flex items-center justify-center">No certificates found.</div>
          )}
        </section>

        <section className="my-24 max-w-6xl">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800" style={{ fontFamily:'asgard' }}>My Experience</h2>
          <hr className="mt-4 text-gray-300 w-full mb-20" />
          <div className="space-y-20">
            {/* 1. Bungkus semua logika dengan {} */}
            {loadingExp ? (
              <ExperienceSkeleton />
            ) : experiences.length > 0 ? (
              // Jika tidak loading DAN ada data, render daftar pengalaman
              experiences.map((exp, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.6 }}
                  className='border-b border-gray-200 pb-5'
                >
                  <div className="pb-8">
                    <h3 className="text-xl md:text-4xl font-bold text-gray-900">{exp.title}</h3>
                    <p className="text-lg text-gray-500 mt-1">{exp.categories}</p>
                  </div>
                  <div className="mt-8 text-gray-700 text-lg leading-relaxed space-y-5">
                    <p>{exp.description}</p>
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="text-center text-gray-500">
                No experiences found.
              </div>
            )}
          </div>
        </section>
      </div>
    </section>
  );
}
