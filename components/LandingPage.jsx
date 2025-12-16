"use client";
import { motion } from "framer-motion";
import { featuredProjects } from "@/lib/data";
import ProjectCard from "../components/ProjectCard";
import Link from "next/link";
import { FiLinkedin, FiGithub, FiTwitter, FiInstagram } from "react-icons/fi";

export default function LandingPage() {
  return (
    <section>
      <section
        id="home"
        className="h-max md:h-screen w-full flex flex-col justify-center items-center text-center px-4 mt-20"
      >
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8 border border-gray-400 rounded-full flex flex-row font-medium items-center justify-between gap-2 px-4 py-2.5 text-xs text-gray-800"
        >
          <div className="w-[6px] h-[6px] bg-green-500 animate-blink rounded-full"></div>
          Available for work
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-3xl md:text-4xl lg:text-6xl font-bold font-display text-gray-900 leading-tight"
        >
          Hey there, <br />
          I am Ahmad Raihan, <br />a Student and a Software Enginer.
        </motion.h1>

        {/* Subheading */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="mt-6 text-base md:text-lg font-manrope max-w-3xl text-gray-700"
        >
          Building digital solutions with code 💻, focused on clean code and
          solid UX ✨, fueled by new challenges 🚀, on a mission to create
          innovative apps and websites 🎮.
        </motion.p>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="flex flex-row items-center gap-4 mt-10"
        >
          <button className="bg-gray-900 text-white text-sm md:text-md font-semibold py-3 px-8 rounded-lg hover:bg-gray-800 transition-colors w-max sm:w-auto">
            Let's Work Together
          </button>
          <button className="bg-gray-200 text-gray-800 text-sm md:text-md font-semibold py-3 px-8 rounded-lg hover:bg-gray-300 transition-colors w-max sm:w-auto">
            My CV
          </button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.8 }}
          className="
          mt-16 w-full max-w-2xl rounded-xl
          flex flex-col sm:flex-row 
        "
        >
          {/* Metrik 1 */}
          <div className="flex-1 p-5 text-center">
            <p className="text-2xl md:text-3xl font-bold text-purple-700">2+</p>
            <p className="text-sm text-gray-500 mt-1">Years of Learning</p>
          </div>

          {/* Metrik 2 */}
          <div className="flex-1 p-5 text-center">
            <p className="text-2xl md:text-3xl font-bold text-purple-700">
              15+
            </p>
            <p className="text-sm text-gray-500 mt-1">Projects Completed</p>
          </div>

          {/* Metrik 3 */}
          <div className="flex-1 p-5 text-center">
            <p className="text-2xl md:text-3xl font-bold text-purple-700">5+</p>
            <p className="text-sm text-gray-500 mt-1">Core Technologies</p>
          </div>
        </motion.div>
      </section>

      <section id="projects" className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header Section */}
          <div className="flex justify-between items-center mb-4 md:mb-10">
            <h2 className="text-xl md:text-3xl font-bold">My works</h2>
            <Link
              href="/all-projects"
              className="text-xl md:text-3xl font-semibold pb-1 /* Memberi sedikit ruang untuk garis */bg-gradient-to-r from-black to-black /* Warna garis bawah */bg-no-repeatbg-bottom bg-[length:0%_2px] /* Awalnya, lebar garis 0% (tidak terlihat) dan tebal 2px */hover:bg-[length:100%_2px] /* Saat hover, lebar garis menjadi 100% */transition-all duration-300 ease-in-out"
            >
              All works
            </Link>
          </div>
          <hr className="my-5 border-gray-300" />
          {/* Grid untuk Kartu Proyek */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {featuredProjects.slice(0, 6).map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>

          <div className="mt-12 flex justify-center">
            <Link
              href="/projects"
              className="bg-black text-white px-8 py-3 rounded-full font-medium hover:bg-gray-800 transition-colors duration-300"
            >
              See More
            </Link>
          </div>
        </div>
      </section>
      <section id="about" className="py-20 lg:py-32 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Judul Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
              About
            </h2>
            <hr className="mt-4 border-t-2 border-gray-200 w-24" />
          </motion.div>

          {/* Konten Utama (Grid 2 Kolom) */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-12 items-center">
            {/* Kolom Kiri: Teks dan Tombol */}
            <motion.div
              className="md:col-span-2"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7 }}
            >
              <p className="text-base md:text-lg text-gray-600 leading-relaxed">
                I am a passionate and detail-oriented Software Development
                student with hands-on experience in creating intuitive and
                functional web applications.
              </p>
              <p className="mt-4 text-base md:text-lg text-gray-600 leading-relaxed">
                My journey in the tech field has equipped me with a diverse
                skill set that combines problem-solving, clean code principles,
                and a strong understanding of modern web technologies.
              </p>

              {/* Tombol dan Ikon Sosial */}
              <div className="mt-8 flex items-center gap-4 flex-wrap">
                <button className="bg-gray-200 text-gray-800 font-semibold py-2 px-5 rounded-full hover:bg-gray-300 transition-colors">
                  About Me
                </button>
                <div className="flex items-center gap-4 text-gray-500">
                  <Link
                    href="https://www.instagram.com/hanmeini_/"
                    ref={true}
                    aria-label="Twitter"
                    className="hover:text-blue-500 transition-colors"
                  >
                    <FiTwitter size={22} />
                  </Link>
                  <Link
                    href="#"
                    aria-label="LinkedIn"
                    className="hover:text-blue-500 transition-colors"
                  >
                    <FiLinkedin size={22} />
                  </Link>
                  <Link
                    href="#"
                    aria-label="GitHub"
                    className="hover:text-blue-500 transition-colors"
                  >
                    <FiGithub size={22} />
                  </Link>
                  <Link
                    href="#"
                    aria-label="Instagram"
                    className="hover:text-blue-500 transition-colors"
                  >
                    <FiInstagram size={22} />
                  </Link>
                </div>
              </div>
            </motion.div>

            {/* Kolom Kanan: Gambar */}
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
    </section>
  );
}
