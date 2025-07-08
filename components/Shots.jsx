'use client'
import Link from 'next/link';
import { useRef, useEffect } from 'react';
import { register } from 'swiper/element/bundle';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/autoplay';

const logos = [
  { id: 1, src: '/logos/react.svg', alt: 'React' },
  { id: 2, src: '/logos/nextjs.svg', alt: 'Next.js' },
  { id: 3, src: '/logos/tailwindcss.svg', alt: 'Tailwind CSS' },
  { id: 4, src: '/logos/figma.svg', alt: 'Figma' },
  { id: 5, src: '/logos/nodejs.svg', alt: 'Node.js' },
  { id: 6, src: '/logos/typescript.svg', alt: 'TypeScript' },
  { id: 7, src: '/logos/javascript.svg', alt: 'JavaScript' },
];

export default function Shots() {
  return (
    <section id="projects" className="py-10 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="items-center mb-4 md:mb-10">
          <h2 className="text-xl md:text-3xl font-bold" style={{ fontFamily: 'asgard' }}>My Shots</h2>
        </div>
        <hr className='my-5 border-gray-300' />
        <div className="container mx-auto">
            <Swiper
            // Daftarkan modul yang akan digunakan
            modules={[Autoplay]}
            
            // Konfigurasi utama untuk efek marquee
            loop={true}
            slidesPerView={'auto'}
            speed={5000} // Durasi transisi yang panjang untuk gerakan halus
            autoplay={{
                delay: 1, // Jeda 1ms antar transisi
                disableOnInteraction: false, // Lanjutkan autoplay meski ada interaksi
            }}
            spaceBetween={60} // Jarak antar logo
            className="logoSwiper" // Class kustom untuk styling tambahan
            >
            {logos.map((logo) => (
                <SwiperSlide key={logo.id} className="!w-auto">
                <div className="flex items-center justify-center h-16">
                    <img 
                    src={logo.src} 
                    alt={logo.alt} 
                    className="max-h-12 w-auto grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
                    />
                </div>
                </SwiperSlide>
            ))}
            </Swiper>
        </div>
      </div>
    </section>
  );
}