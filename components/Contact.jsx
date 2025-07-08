'use client';

import { motion } from 'framer-motion';

export default function Contact() {
  return (
    <section id="contact" className="py-20 lg:py-32 bg-white px-4">
      <div className="max-w-6xl mx-auto">
        
        {/* Judul Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800">Contact</h2>
          <hr className="mt-4 text-gray-300 w-full" />
        </motion.div>

        {/* Konten Utama (Grid 2 Kolom) */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          
          {/* Kolom Kiri: Judul Besar */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7 }}
          >
            <h1 className="text-5xl md:text-7xl font-bold text-gray-900 leading-tight" style={{ fontFamily:'asgard' }}>
              Let's<br />
              work<br />
              together
            </h1>
          </motion.div>

          {/* Kolom Kanan: Deskripsi dan Email */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            // Menambahkan efek hover pada seluruh kolom kanan
            className='group'
          >
            <p className="text-xl text-gray-600 leading-relaxed">
              I am fueled by new challenges and cutting-edge projects. If you need a committed and passionate developer to enhance your vision, look no further. Let's join forces to create memorable experiences that resonate and leave a lasting impression. Get in touch, and let's start this thrilling adventure together!
            </p>
            {/* Menerapkan efek underline saat group di-hover */}
            <a 
              href="mailto:ahmadraihan607@gmail.com"
              className="mt-8 inline-block text-2xl font-normal bg-gradient-to-r from-black to-black bg-no-repeat bg-bottom bg-[length:0%_2px] group-hover:bg-[length:100%_2px] transition-all duration-500"
            >
              ahmadraihan607@gmail.com
            </a>
          </motion.div>

        </div>
      </div>
    </section>
  );
}