// components/Footer.jsx
'use client';

import Link from 'next/link';
// Impor ikon yang dibutuhkan dari React Icons
import { FiFacebook, FiTwitter, FiInstagram, FiLinkedin } from 'react-icons/fi';

export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-6 pt-16">
        
        {/* Grid Utama Footer */}
        <div className="grid grid-cols-1 md:grid-cols-10 gap-12">
          
          {/* Kolom 1: Who Am I? */}
          <div className="md:col-span-4">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Who Am I?</h3>
            <p className="text-gray-600">
              I'm <span className="font-semibold text-blue-600">Ahmad Raihan</span>, a Software Engineer. I code just for fun & I love it.
            </p>
            <div className="flex space-x-4 mt-6">
              <a href="#" aria-label="Facebook" className="text-gray-500 hover:text-blue-600 transition-colors">
                <FiFacebook size={20} />
              </a>
              <a href="#" aria-label="Twitter" className="text-gray-500 hover:text-blue-500 transition-colors">
                <FiTwitter size={20} />
              </a>
              <a href="#" aria-label="Instagram" className="text-gray-500 hover:text-pink-500 transition-colors">
                <FiInstagram size={20} />
              </a>
              <a href="#" aria-label="LinkedIn" className="text-gray-500 hover:text-blue-700 transition-colors">
                <FiLinkedin size={20} />
              </a>
            </div>
          </div>

          {/* Kolom 2: Quick Links */}
          <div className="md:col-span-2">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Quick Links</h3>
            <ul className="space-y-3">
              <li><Link href="/#home" className="text-gray-600 hover:text-blue-600 hover:underline">Home</Link></li>
              <li><Link href="/#about" className="text-gray-600 hover:text-blue-600 hover:underline">About Me</Link></li>
              <li><Link href="/#projects" className="text-gray-600 hover:text-blue-600 hover:underline">Project</Link></li>
              <li><Link href="/#contact" className="text-gray-600 hover:text-blue-600 hover:underline">Contact</Link></li>
            </ul>
          </div>

          {/* Kolom 3: Connect/Newsletter */}
          <div className="md:col-span-4">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Connect</h3>
            <p className="text-gray-600 mb-4">If you need me for business you can send ur email.</p>
            <form onSubmit={(e) => e.preventDefault()}>
              <div className="flex flex-col sm:flex-row gap-2">
                <input 
                  type="email" 
                  placeholder="Enter your email" 
                  className="flex-grow w-full px-4 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button 
                  type="submit"
                  className="bg-blue-600 text-white font-semibold px-6 py-2.5 rounded-md hover:bg-blue-700 transition-colors"
                >
                  Send
                </button>
              </div>
            </form>
          </div>

        </div>

        {/* Sub-footer untuk Copyright */}
        <div className="border-t border-gray-200 text-center text-sm text-gray-500 p-5 flex justify-start">
          <p>
            © {new Date().getFullYear()} Who cares ? It's {' '}
            <a href="" className="text-blue-600 hover:underline">open source</a>
          </p>
        </div>
      </div>
    </footer>
  );
}
