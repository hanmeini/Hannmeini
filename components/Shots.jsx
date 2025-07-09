'use client'
import Link from 'next/link';
import { useRef, useEffect } from 'react';
import { register } from 'swiper/element/bundle';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/autoplay';
import Icon from './Icon';

const logos = [
  { id: 1, src: 'react.svg', alt: 'React' },
  { id: 2, src: 'nextdotjs.svg', alt: 'Next.js' },
  { id: 3, src: 'tailwindcss.svg', alt: 'Tailwind CSS' },
  { id: 4, src: 'figma.svg', alt: 'Figma' },
  { id: 5, src: 'nodedotjs.svg', alt: 'Node.js' },
  { id: 6, src: 'typescript.svg', alt: 'TypeScript' },
  { id: 7, src: 'javascript.svg', alt: 'JavaScript' },
];

export default function Shots() {
  return (
    <section id="projects" className="py-10 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="items-center mb-4 md:mb-10">
          <h2 className="text-xl md:text-3xl font-bold" style={{ fontFamily: 'asgard' }}>My Shots</h2>
        </div>
        <hr className='my-5 border-gray-300' />
        <div className="relative w-full overflow-hidden">
          {/* Gradasi di sisi kiri dan kanan */}
          <div className="absolute top-0 left-0 h-full w-24 bg-gradient-to-r from-white to-transparent z-10" />
          <div className="absolute top-0 right-0 h-full w-24 bg-gradient-to-l from-white to-transparent z-10" />
          <div className="flex animate-marquee whitespace-nowrap">
            {/* Render pertama */}
            {logos.map((logo) => (
              <div key={`first-${logo.id}`} className="flex-shrink-0 flex items-center justify-center w-32 h-24">
                {/* 3. Ukuran ikon disesuaikan menjadi lebih besar tapi wajar */}
                <Icon src={logo.src} alt={logo.alt} className='h-12 w-12' />
              </div>
            ))}
            {/* Render kedua */}
            {logos.map((logo) => (
              <div key={`second-${logo.id}`} className="flex-shrink-0 flex items-center justify-center w-32 h-24">
                <Icon src={logo.src} alt={logo.alt} className='h-12 w-12' />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}