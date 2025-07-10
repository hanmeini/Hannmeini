'use client';

import { useState, useEffect } from 'react';
import { AppProgressBar as ProgressBar } from 'next-nprogress-bar';
import { usePathname } from 'next/navigation';

const Providers = ({ children }) => {
  const [isMounted, setIsMounted] = useState(false);
  const pathname = usePathname(); // deteksi route aktif

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <>
      {isMounted && (
        <ProgressBar
          key={pathname} // rerender saat path berubah
          height="4px"
          color="#2563EB"
          options={{ showSpinner: false }}
          shallowRouting
        />
      )}
      {children}
    </>
  );
};

export default Providers;
