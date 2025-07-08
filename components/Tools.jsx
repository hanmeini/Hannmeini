'use client';

import Icon from './Icon'; // Pastikan path ke komponen Icon sudah benar

// Data logo Anda
const logos = [
  { id: 1, src: 'react.svg', alt: 'React' },
  { id: 2, src: 'nextdotjs.svg', alt: 'Next.js' },
  { id: 3, src: 'tailwindcss.svg', alt: 'Tailwind CSS' },
  { id: 4, src: 'figma.svg', alt: 'Figma' },
  { id: 5, src: 'nodedotjs.svg', alt: 'Node.js' },
  { id: 6, src: 'typescript.svg', alt: 'TypeScript' },
  { id: 7, src: 'javascript.svg', alt: 'JavaScript' },
];

export default function Tools() {
  return (
    <section id="tools" className="py-20 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="items-center mb-4 md:mb-10">
          <h2 className="text-xl md:text-3xl font-bold">Tools & Technologies</h2>
        </div>
        <hr className='my-5 border-gray-300' />
        
        {/* 1. Container utama harus memiliki 'overflow-hidden' */}
        <div className="relative w-full overflow-hidden">
          {/* Gradasi di sisi kiri dan kanan */}
          <div className="absolute top-0 left-0 h-full w-24 bg-gradient-to-r from-white to-transparent z-10" />
          <div className="absolute top-0 right-0 h-full w-24 bg-gradient-to-l from-white to-transparent z-10" />

          {/* 2. Wrapper untuk animasi. Render logo dua kali untuk loop yang mulus. */}
          <div className="flex animate-marquee whitespace-nowrap">
            {/* Render pertama */}
            {logos.map((logo) => (
              <div key={`first-${logo.id}`} className="flex-shrink-0 flex items-center justify-center w-32 h-24">
                {/* 3. Ukuran ikon disesuaikan menjadi lebih besar tapi wajar */}
                <Icon src={logo.src} alt={logo.alt} className='h-12 w-12' />
              </div>
            ))}
            {/* Render kedua (untuk menciptakan ilusi loop tak terbatas) */}
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
