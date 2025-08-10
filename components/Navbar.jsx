"use client"
import Link from 'next/link'
import { useRouter } from 'next/navigation';
import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiHome, FiHelpCircle, FiSend, FiMail, FiUser, FiChevronRight, FiChevronDown, FiLogOut } from 'react-icons/fi';


const DefaultAvatar = ({ className = 'w-10 h-10' }) => ( 
  <div className={`${className} rounded-full bg-gray-200 flex items-center justify-center border-2 border-white shadow`}>
    <img src='/images/person-icon.png' alt="person icon" className="w-1/2 h-1/2" />
  </div> 
);
const HamburgerIcon = () => ( <svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12.5 14.5833H22.9167C23.4692 14.5833 23.9991 14.8028 24.3898 15.1935C24.7805 15.5842 25 16.1141 25 16.6666C25 17.2192 24.7805 17.7491 24.3898 18.1398C23.9991 18.5305 23.4692 18.75 22.9167 18.75H12.5C11.9475 18.75 11.4176 18.5305 11.0269 18.1398C10.6362 17.7491 10.4167 17.2192 10.4167 16.6666C10.4167 16.1141 10.6362 15.5842 11.0269 15.1935C11.4176 14.8028 11.9475 14.5833 12.5 14.5833ZM27.0834 31.25H37.5C38.0526 31.25 38.5825 31.4695 38.9732 31.8602C39.3639 32.2509 39.5834 32.7808 39.5834 33.3333C39.5834 33.8858 39.3639 34.4158 38.9732 34.8065C38.5825 35.1972 38.0526 35.4166 37.5 35.4166H27.0834C26.5308 35.4166 26.0009 35.1972 25.6102 34.8065C25.2195 34.4158 25 33.8858 25 33.3333C25 32.7808 25.2195 32.2509 25.6102 31.8602C26.0009 31.4695 26.5308 31.25 27.0834 31.25ZM12.5 22.9166H37.5C38.0526 22.9166 38.5825 23.1361 38.9732 23.5268C39.3639 23.9175 39.5834 24.4474 39.5834 25C39.5834 25.5525 39.3639 26.0824 38.9732 26.4731C38.5825 26.8638 38.0526 27.0833 37.5 27.0833H12.5C11.9475 27.0833 11.4176 26.8638 11.0269 26.4731C10.6362 26.0824 10.4167 25.5525 10.4167 25C10.4167 24.4474 10.6362 23.9175 11.0269 23.5268C11.4176 23.1361 11.9475 22.9166 12.5 22.9166Z" fill="#003366"/></svg>);
const CloseIcon = () => ( <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg> );


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
        <div className="flex items-center justify-end mx-auto md:mx-10 lg:mx-24 h-10 ">          
          {/*  Navigasi Desktop */}
          <div className="hidden md:flex flex-auto justify-end items-center gap-14 text-sm font-medium text-[#2E2E2E]">
            <Link href="/" className="hover:text-blue-600 hover:-translate-y-1 transition-all duration-300 ease-in-out">Home</Link>
            <Link href="/about" className="hover:text-blue-600 hover:-translate-y-1 transition-all duration-300 ease-in-out">About Me</Link>
            <Link href="/projects" className="hover:text-blue-600 hover:-translate-y-1 transition-all duration-300 ease-in-out">Project</Link>
            <Link href="/#contact" className="hover:text-blue-600 hover:-translate-y-1 transition-all duration-300 ease-in-out">Contact</Link>
          </div>
          <button onClick={() => setMobileMenuOpen(true)} className="md:hidden p-2 -ml-2 text-gray-700">
            <HamburgerIcon />
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
                  <button onClick={() => setMobileMenuOpen(false)} className="p-2 transition hover:rotate-90 duration-300">
                    <CloseIcon />
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
                              <FiHome /> Home
                          </Link>
                      </motion.div>
                      <motion.div variants={itemVariants}>
                          <Link
                            href="/about"
                            onClick={() => setMobileMenuOpen(false)}
                            className="flex items-center gap-4 p-3 rounded-lg text-lg font-medium text-gray-700 hover:bg-gray-100 transition-colors"
                            >
                              <FiUser /> About Me
                          </Link>
                      </motion.div>
                      <motion.div variants={itemVariants}>
                          <Link
                            href="/projects"
                            onClick={() => setMobileMenuOpen(false)}
                            className="flex items-center gap-4 p-3 rounded-lg text-lg font-medium text-gray-700 hover:bg-gray-100 transition-colors"
                            >
                              <FiHelpCircle /> Project
                          </Link>
                      </motion.div>
                  </nav>

                  <hr className="my-6" />
                  <div className="space-y-2">
                      <motion.p variants={itemVariants} className="px-3 text-sm font-semibold text-gray-400">FIND ME ON</motion.p>
                      <motion.a variants={itemVariants} href="https://github.com/hanmeini" target="_blank" className="flex items-center gap-4 p-3 rounded-lg text-base font-medium text-gray-700 hover:bg-gray-100 transition-colors">
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
                      <FiSend />
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