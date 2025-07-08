'use client'
import React from 'react';
import Image from 'next/image';

const Icon = ({ src, alt, ...props }) => {
  return (
    <Image
      src={`/logos/${src}`}
      alt={alt}
      width={48}
      height={48}
      {...props}
    />
  );
};


export default Icon;