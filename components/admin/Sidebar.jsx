"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  FiGrid,
  FiFileText,
  FiAward,
  FiBriefcase,
  FiSettings,
  FiLogOut,
  FiCpu,
} from "react-icons/fi";

const navLinks = [
  { href: "/admin", label: "Dashboard", icon: FiGrid },
  { href: "/admin/projects", label: "Projects", icon: FiFileText },
  { href: "/admin/certificates", label: "Certificates", icon: FiAward },
  { href: "/admin/experiences", label: "Experiences", icon: FiBriefcase },
  { href: "/admin/technologies", label: "Technologies", icon: FiCpu },
  { href: "/admin/settings", label: "Settings", icon: FiSettings },
];

// Sidebar sekarang menerima 'user' dan 'handleLogout' sebagai props
export default function Sidebar({ user, handleLogout }) {
  const pathname = usePathname();

  return (
    <aside className="fixed top-0 left-0 z-40 w-64 h-screen bg-gray-800 border-r border-gray-600 text-white flex flex-col transition-transform -translate-x-full sm:translate-x-0">
      <div className="flex items-center justify-center h-20 border-b border-gray-700">
        <h1 className="text-2xl font-bold">Admin Panel</h1>
      </div>
      <nav className="flex-grow px-4 py-6">
        <ul>
          {navLinks.map((link) => {
            const isActive =
              pathname.startsWith(link.href) &&
              (link.href !== "/admin" || pathname === "/admin");
            return (
              <li key={link.label} className="mb-2">
                <Link
                  href={link.href}
                  className={`flex items-center p-3 rounded-lg transition-colors ${
                    isActive
                      ? "bg-blue-500 text-white"
                      : "text-gray-400 hover:bg-gray-700 hover:text-white"
                  }`}
                >
                  <link.icon className="w-5 h-5 mr-3" />
                  <span>{link.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
      <div className="px-4 py-6 border-t border-gray-700">
        {/* Menampilkan info user dan tombol logout */}
        {user && (
          <div className="mb-4 p-2 rounded bg-gray-700">
            <p className="text-sm font-semibold text-white">Logged in as:</p>
            <p className="text-xs text-gray-300 truncate">{user.email}</p>
          </div>
        )}
        <button
          onClick={handleLogout}
          className="flex items-center w-full p-3 rounded-lg text-gray-400 hover:bg-red-500 hover:text-white transition-colors"
        >
          <FiLogOut className="w-5 h-5 mr-3" />
          <span>Log Out</span>
        </button>
      </div>
    </aside>
  );
}
