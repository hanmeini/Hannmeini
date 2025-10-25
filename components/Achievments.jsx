'use client'

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { FiCode, FiCoffee, FiAward, FiBookOpen } from 'react-icons/fi';
import Link from 'next/link';
import { supabase } from '@/lib/supabaseClient'; 
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import CertificateSkeleton from '@/components/CertificateSkeleton'; 
import ExperienceSkeleton from '@/components/ExperiencesSkeleton';

const Achievments = () => {
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

    const handleNext = () => {
    if (certificates.length === 0) return;
    setSelectedCert((prev) => (prev + 1) % certificates.length);
  };

  const handlePrev = () => {
    if (certificates.length === 0) return;
    setSelectedCert((prev) => (prev - 1 + certificates.length) % certificates.length);
  };

  return (
            <section className="px-4 py-10 max-w-[68rem] mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800" style={{ fontFamily:'asgard' }}>Achievements</h2>
              <hr className="mt-4 mb-20 md:mb-auto text-gray-300 w-full" />
              
              {loadingCerts ? (
                <CertificateSkeleton />
              ) : certificates.length > 0 ? (
                <>
                  {/* DESKTOP VIEW */}
                  <div className="hidden lg:grid grid-cols-2 gap-12 min-h-[500px]">
                    <div className="relative h-full flex justify-center items-start">
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
                          <p className="mt-4 text-lg text-gray-600 leading-relaxed text-justify">{certificates[selectedCert].description}</p>
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
                      <h3 className="text-xl font-bold text-gray-900 text-justify mb-5">{certificates[selectedCert].title}</h3>
                      <p className="mt-2 text-gray-600 text-justify">{certificates[selectedCert].description}</p>
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
  )
}

export default Achievments
