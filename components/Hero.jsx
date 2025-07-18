"use client";
import { motion } from 'framer-motion';
import {FiArrowRight, FiDownloadCloud} from 'react-icons/fi'


const ShimmerBorderButton = ({ text, primary = true }) => {
  const primaryClasses = "bg-gray-900 text-white";
  const secondaryClasses = "bg-gray-200 text-gray-800";

  return (
    <button className={`
      relative 
      text-sm md:text-md font-semibold py-3 px-8 rounded-lg 
      w-max sm:w-auto
      overflow-hidden
      group
      ${primary ? primaryClasses : secondaryClasses}
    `}>
      {/* Lapisan Latar Belakang */}
      <span className="absolute inset-0 z-0 transition-colors duration-300 group-hover:bg-gray-800"></span>
      
      {/* Lapisan Gradasi Berputar (Awalnya tidak terlihat) */}
      <span className="absolute -inset-1 z-0 transition-opacity duration-300 opacity-0 group-hover:opacity-100">
        <span className="absolute inset-0 animate-border-spin rounded-xl bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
      </span>

      {/* Konten Tombol */}
      <span className="relative z-10">{text}</span>
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
      <div className="flex flex-row items-center gap-4">
        <ShimmerBorderButton text="Let's Work Together" primary={true} />
        <ShimmerBorderButton text="My CV" primary={false} />
      </div>
      </motion.div>

      {/* <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.8 }}
        className="mt-16 w-full max-w-2xl flex flex-row "
      >
        <div className="flex-1 p-5 text-center">
          <p className="text-2xl md:text-3xl font-bold text-purple-800">2+</p>
          <p className="text-sm text-gray-500 mt-1">Years of Learning</p>
        </div>
        <div className="flex-1 p-5 text-center">
          <p className="text-2xl md:text-3xl font-bold text-purple-800">10+</p>
          <p className="text-sm text-gray-500 mt-1">Projects Completed</p>
        </div>
        <div className="flex-1 p-5 text-center">
          <p className="text-2xl md:text-3xl font-bold text-purple-800">5+</p>
          <p className="text-sm text-gray-500 mt-1">Core Technologies</p>
        </div>
        <div className="flex-1 p-5 text-center">
          <p className="text-2xl md:text-3xl font-bold text-purple-800">2</p>
          <p className="text-sm text-gray-500 mt-1">Championship</p>
        </div>
      </motion.div> */}
    </section>
  );
}
