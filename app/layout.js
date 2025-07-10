import "./globals.css";
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { Manrope } from 'next/font/google';
import localFont from 'next/font/local';
import { Playfair_Display } from 'next/font/google'; 


const asgard = localFont({
  src: '../fonts/AsgardTrial-FitRegular.ttf',
  variable: '--font-asgard',     
  display: 'swap',
});

const manrope = Manrope({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'], 
  variable: '--font-manrope',
  display: 'swap'
});

const satoshi = localFont({
  src: '../fonts/Satoshi-Variable.ttf', 
  variable: '--font-satoshi',        
  display: 'swap',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair', 
  display: 'swap',
});

export const metadata = {
  title: "Hanmeini",
  description: "Portfolio",
};

export default function RootLayout({ children }) {
  return (
    <html lang="id" className={`${manrope.variable} ${satoshi.variable} ${asgard.variable} ${playfair.variable} no-scrollbar`}>
      <body>
          <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-grow">
              {children}
            </main>
            <Footer />
          </div>
      </body>
    </html>
  );
}
