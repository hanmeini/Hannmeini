"use client"
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation';
import React, { useState, useRef, useEffect } from "react";
import { FaMenuAltRight } from 'react-icons/fa';
import { motion, AnimatePresence } from "framer-motion";
import { CiMenuFries } from "react-icons/ci";
import { RiErrorWarningLine } from "react-icons/ri";
import { GoHome } from "react-icons/go";
import { IoGitNetworkOutline } from "react-icons/io5";
import { FaPaperPlane } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";


export default function Navbar() {
  const router = useRouter();
  const [layananOpen, setLayananOpen] = useState(false);
  const layananRef = useRef(null);
  const [profileOpen, setProfileOpen] = useState(false);
  const profileRef = useRef(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileLayananOpen, setMobileLayananOpen] = useState(false);


  const toggleLayanan = () => setLayananOpen(!layananOpen);
  const toggleProfile = () => setProfileOpen(!profileOpen);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (layananRef.current && !layananRef.current.contains(event.target)) setLayananOpen(false);
      if (profileRef.current && !profileRef.current.contains(event.target)) setProfileOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);


  // animasi
  const sidebarVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.07,
        delayChildren: 0.2,
      },
    },
  };

  // untuk masing-masing item
  const itemVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: { opacity: 1, x: 0, transition: { type: "tween" } },
  };


  return (
    <>
      <nav className="fixed top-0 w-full z-40 bg-white backdrop-blur-lg p-4">
        <div className="flex items-center justify-end md:justify-between mx-auto md:mx-10 lg:mx-24 h-10 ">  
          <Image
          src='/logos/image.png' width={40} height={40} alt='Logo' className='md:flex hidden'/>        
          {/*  Navigasi Desktop */}
          <div className="hidden md:flex flex-auto justify-end items-center gap-14 text-sm font-medium text-[#2E2E2E]">
            <Link href="/" className="hover:text-blue-600 hover:-translate-y-1 transition-all duration-300 ease-in-out">Home</Link>
            <Link href="/about" className="hover:text-blue-600 hover:-translate-y-1 transition-all duration-300 ease-in-out">About Me</Link>
            <Link href="/projects" className="hover:text-blue-600 hover:-translate-y-1 transition-all duration-300 ease-in-out">Project</Link>
            <Link href="/#contact" className="hover:text-blue-600 hover:-translate-y-1 transition-all duration-300 ease-in-out">Contact</Link>
          </div>
          <button onClick={() => setMobileMenuOpen(true)} className="md:hidden p-2 -ml-2">
            <CiMenuFries size={24} />
          </button>
        </div>
      </nav>
      {/* --- Panel Menu Mobile --- */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed top-0 right-0 h-full w-full bg-black/50 z-50 md:hidden"
            onClick={() => setMobileMenuOpen(false)}
          >
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed top-0 right-0 h-full w-4/5 max-w-xs bg-white shadow-xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center p-4 border-b">
                  <button onClick={() => setMobileMenuOpen(false)} className="p-2">
                    <CiMenuFries size={24} />
                  </button>
              </div>
              <motion.div 
                  className="flex-grow p-4 overflow-y-auto"
                  variants={sidebarVariants}
                  initial="hidden"
                  animate="visible"
              >
                  <nav className="flex flex-col space-y-2">
                      <motion.div variants={itemVariants}>
                          <Link
                            href="/"
                            onClick={() => setMobileMenuOpen(false)}
                            className="flex items-center gap-4 p-3 rounded-lg text-lg font-medium text-gray-700 hover:bg-gray-100 transition-colors"
                            >
                              <GoHome />
                               Home
                          </Link>
                      </motion.div>
                      <motion.div variants={itemVariants}>
                          <Link
                            href="/about"
                            onClick={() => setMobileMenuOpen(false)}
                            className="flex items-center gap-4 p-3 rounded-lg text-lg font-medium text-gray-700 hover:bg-gray-100 transition-colors"
                            >
                              <RiErrorWarningLine />
                               About Me
                          </Link>
                      </motion.div>
                      <motion.div variants={itemVariants}>
                          <Link
                            href="/projects"
                            onClick={() => setMobileMenuOpen(false)}
                            className="flex items-center gap-4 p-3 rounded-lg text-lg font-medium text-gray-700 hover:bg-gray-100 transition-colors"
                            >
                              <IoGitNetworkOutline />
                               Project
                          </Link>
                      </motion.div>
                  </nav>

                  <hr className="my-6" />
                  <div className="space-y-2">
                      <motion.p variants={itemVariants} className="px-3 text-sm font-semibold text-gray-400">FIND ME ON</motion.p>
                      <motion.a variants={itemVariants} href="https://github.com/hanmeini" target="_blank" className="flex row items-center gap-4 p-3 rounded-lg text-base font-medium text-gray-700 hover:bg-gray-100 transition-colors">
                      <FaGithub />
                          GitHub
                      </motion.a>
                  </div>
              </motion.div>
              <motion.div 
                  className="p-4 border-t flex-shrink-0"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0, transition: { delay: 0.4 } }}
              >
                  <Link
                    href="/#contact"
                    onClick={() => setMobileMenuOpen(false)}
                    className="w-full flex items-center justify-center gap-2 bg-blue-500 text-white font-bold py-3 px-4 rounded-lg hover:bg-blue-600 transition-colors"
                    >
                      <FaPaperPlane />
                      Let's Talk
                  </Link>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}