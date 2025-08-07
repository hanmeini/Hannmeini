"use client";
import { motion } from 'framer-motion';
import { FiArrowRight, FiDownloadCloud } from 'react-icons/fi';
import Link from 'next/link'; // 1. Impor komponen Link

/**
 * MODIFIED SHIMMER BORDER BUTTON
 * Menerima `children` untuk fleksibilitas (teks + ikon).
 */
const ShimmerBorderButton = ({ children, primary = true }) => {
  const primaryClasses = "bg-gray-900 text-white";
  const secondaryClasses = "bg-white text-gray-800 border border-gray-300";

  return (
    <button className={`
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
    </button>
  );
};


export default function Hero() {
  return (
    <section id="home" className="min-h-screen w-full flex flex-col justify-center items-center text-center px-4 pt-24 pb-12">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8 border border-gray-400 rounded-full flex flex-row font-medium items-center justify-center gap-2 px-4 py-2 text-xs text-gray-800"
      >
        <div className='w-[6px] h-[6px] bg-green-500 animate-pulse rounded-full'></div>
        Available for work
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.2 }}
        className="text-3xl md:text-4xl lg:text-6xl font-bold font-asgard text-gray-900 leading-tight"
        style={{ fontFamily: 'asgard' }}
      >
        Hey there, <br />
        I am Ahmad Raihan, <br />
        a Student and a Software Engineer.
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.4 }}
        className="mt-6 text-base md:text-lg font-manrope max-w-3xl text-gray-700"
      >
        Building digital solutions with code 💻, focused on clean code and solid UX ✨, fueled by new challenges 🚀, on a mission to create innovative apps and websites 🎮.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.6 }}
        className="flex flex-col sm:flex-row items-center gap-4 mt-10"
      >
        <Link href="#contact">
            <ShimmerBorderButton primary={true}>
              <span>Let's Work Together</span>
              <FiArrowRight />
            </ShimmerBorderButton>
        </Link>
        
        <a href="/Resume Raihan.pdf" download>
            <ShimmerBorderButton primary={false}>
              <span>My CV</span>
              <FiDownloadCloud />
            </ShimmerBorderButton>
        </a>
      </motion.div>
    </section>
  );
}