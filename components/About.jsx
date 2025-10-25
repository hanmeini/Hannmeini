"use client";
import Image from 'next/image';
import { motion } from 'framer-motion';
import { FiLinkedin, FiGithub, FiTwitter, FiInstagram } from 'react-icons/fi';
import { FaWhatsapp, FaChevronRight } from "react-icons/fa";
import Link from 'next/link';
import { FaRightLong } from 'react-icons/fa6';
import { FaArrowRight } from "react-icons/fa";
import { FiArrowRight } from 'react-icons/fi';

const ShimmerBorderButton = ({ children, primary = true }) => {
  const primaryClasses = "bg-gray-900 text-white";
  const secondaryClasses = "bg-white text-gray-800 border border-gray-300";

  return (
    <Link href='/about' className={`
      relative 
      text-sm md:text-md font-semibold py-3 px-8 rounded-lg 
      w-max sm:w-auto
      overflow-hidden
      group
      transition-transform duration-200 ease-in-out active:scale-95
      ${primary ? primaryClasses : secondaryClasses}
    `}>
      {/* Lapisan Gradasi Berputar */}
      <span className="absolute -inset-1 z-0 transition-opacity duration-300 opacity-0 group-hover:opacity-100">
        <span className="absolute inset-0 animate-border-spin rounded-xl bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
      </span>
      
      {/* Lapisan Latar Belakang Solid untuk menutupi gradasi */}
      <span className={`absolute inset-[1.5px] z-10 rounded-[7px] ${primary ? 'bg-gray-900' : 'bg-white'} transition-colors duration-300 ${primary ? 'group-hover:bg-gray-800' : 'group-hover:bg-gray-50'}`}></span>

      {/* Konten Tombol (sekarang menggunakan children) */}
      <span className="relative z-20 flex items-center justify-center gap-2">
        {children}
      </span>
    </Link>
  );
};

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
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800" style={{ fontFamily:'asgard' }}>About</h2>
          <hr className="mt-4 text-gray-300 w-full" />
        </motion.div>
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-12 items-center">
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
            <ShimmerBorderButton primary={true}>
              <span>About Me</span>
              <FiArrowRight />
            </ShimmerBorderButton>
              <div className="flex items-center gap-10 text-gray-500">
                <Link href="https://github.com/hanmeini" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="text-black"><FiGithub size={30} /></Link>
                <Link href="https://www.instagram.com/hanmeini_/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-black"><FiInstagram size={30} /></Link>
                <a 
                  href="https://wa.me/6288216418544?text=Halo%20Raihan,%20saya%20melihat%20portofolio%20Anda%20dan%20tertarik%20untuk%20berdiskusi%20lebih%20lanjut." 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  aria-label="WhatsApp" 
                  className="text-black"
                >
                  <FaWhatsapp size={30} />
                </a>
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
                src="/logos/poto1.jpg" 
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