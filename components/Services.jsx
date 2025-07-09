
"use client";

import { motion } from 'framer-motion';
import { FiLayout, FiServer, FiSmartphone } from 'react-icons/fi';
const services = [
  {
    icon: FiLayout,
    title: 'Front End Web',
    description: 'I create websites with designs matching UI/UX specifications using Tailwind CSS for styling. For API consumption, I utilize front-end frameworks like React.js and to build responsive and interactive interfaces.',
    color: 'blue',
  },
  {
    icon: FiServer,
    title: 'Backend Dev',
    description: "I use Node.js and Express for the backend, with expertise in SQL (PostgreSQL via Supabase) and NoSQL databases. My experience includes query optimization, security implementation, and building reliable, efficient, and secure solutions.",
    color: 'red',
  },
  {
    icon: FiSmartphone,
    title: 'Mobile Dev',
    description: "I am exploring mobile development, focusing on creating smooth user experiences. My skills in hybrid app development with frameworks like React Native enable me to create responsive applications across various platforms.",
    color: 'purple',
  },
];

// Komponen untuk satu kartu layanan
const ServiceCard = ({ icon, title, description, color, index }) => {
  const Icon = icon;
  
  // Menentukan warna gradasi berdasarkan prop 'color'
  const colorClasses = {
    blue: {
      bg: 'bg-gradient-to-br from-blue-100 to-cyan-200',
      text: 'text-blue-600',
    },
    red: {
      bg: 'bg-gradient-to-br from-red-100 to-orange-200',
      text: 'text-red-600',
    },
    purple: {
      bg: 'bg-gradient-to-br from-purple-100 to-violet-200',
      text: 'text-purple-600',
    },
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="bg-gray-100 p-8 border border-gray-200 rounded-2xl shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 ease-in-out"
    >
      {/* Wrapper untuk ikon dan efek blur di belakangnya */}
      <div className="relative inline-flex items-center justify-center w-16 h-16 mb-6">
        {/* Efek blur di belakang ikon */}
        <div className={`absolute inset-0 rounded-full filter blur-md opacity-70 ${colorClasses[color].bg}`} />
        {/* Ikon di atas efek blur */}
        <Icon className={`relative z-10 w-8 h-8 ${colorClasses[color].text}`} />
      </div>

      <h3 className="text-xl font-bold text-gray-800 mb-3">{title}</h3>
      <p className="text-gray-600 leading-relaxed">{description}</p>
    </motion.div>
  );
};


// Komponen utama section
export default function Services() {
  return (
    <section id="services" className="py-10 lg:py-10 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="text-left mx-auto mb-16">
          <h2 className="text-xl md:text-3xl font-bold" style={{ fontFamily:'asgard' }}>What I Can Do</h2>
          <hr className="mt-4 text-gray-300 w-full" />
          <p className="mt-4 text-lg text-gray-600 max-w-3xl">
            I have skills in web and mobile application development, focusing on creating functional and user-friendly solutions. I'm accustomed to implementing clean code principles and best practices.
          </p>
        </div>

        {/* Grid untuk Kartu Layanan */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <ServiceCard 
              key={service.title}
              icon={service.icon}
              title={service.title}
              description={service.description}
              color={service.color}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
