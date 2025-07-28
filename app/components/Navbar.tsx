"use client";

import { useState } from "react";
import {
  FaSearch,
  FaUser,
  FaShoppingBag,
  FaBars,
  FaTimes,
  FaHome,
} from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const toggleDropdown = (key: string) => {
    setOpenDropdown(openDropdown === key ? null : key);
  };

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md">
      {/* Top Info Bar */}
      <div className="text-white text-xs overflow-hidden gold-theme-bg">
        <div className="whitespace-nowrap animate-marquee py-1 px-2">
          <span className="mx-4">2621 E Nettleton</span>
          <span className="mx-4">Chardaywoods@gmail.com</span>
          <span className="mx-4">870-627-1281</span>
          <span className="mx-4">Labels</span>
        </div>
      </div>

      {/* Main Nav */}
      <nav className="flex items-center justify-between px-4 py-4 md:px-6 border-b">
        {/* Logo */}

        {/* Desktop Nav */}

        {/* Right Icons */}
        <div className="flex items-center gap-4 text-lg md:text-xl">
          <FaHome className="cursor-pointer text-2xl" />
        </div>
        <div className="flex items-center gap-2">
          <Image src="/pp.jpg" alt="Logo" width={250} height={66} />
        </div>
        <div className="flex items-center gap-4 text-lg md:text-xl">
          <FaShoppingBag className="cursor-pointer text-2xl" />
          <button className="md:hidden" onClick={toggleMenu}>
            {menuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </nav>

      <ul className="hidden md:flex justify-center py-4 border-b gap-6 text-sm font-medium ">
        <li className="relative group">
          <button
            onClick={() => toggleDropdown("dtf")}
            className="hover:text-indigo-700"
          >
            DTF Transfers ▾
          </button>
          {openDropdown === "dtf" && (
            <ul className="absolute top-full left-0 bg-white shadow-md rounded py-2 w-48 z-10">
              <li>
                <Link href="#" className="block px-4 py-2 hover:bg-gray-100">
                  Gang Sheet Builder
                </Link>
              </li>
              <li>
                <Link href="#" className="block px-4 py-2 hover:bg-gray-100">
                  DTF Roll Transfers
                </Link>
              </li>
            </ul>
          )}
        </li>
        <li className="relative group">
          <button
            onClick={() => toggleDropdown("uvdtf")}
            className="hover:text-indigo-700"
          >
            UV DTF Stickers ▾
          </button>
          {openDropdown === "uvdtf" && (
            <ul className="absolute top-full left-0 bg-white shadow-md rounded py-2 w-48 z-10">
              <li>
                <Link href="#" className="block px-4 py-2 hover:bg-gray-100">
                  Glossy Finish
                </Link>
              </li>
              <li>
                <Link href="#" className="block px-4 py-2 hover:bg-gray-100">
                  Matte Finish
                </Link>
              </li>
            </ul>
          )}
        </li>
        <li>
          <Link href="#" className="hover:text-indigo-700">
            Custom Shirts
          </Link>
        </li>
        <li>
          <Link href="#" className="hover:text-indigo-700">
            Ready To Press DTF Designs
          </Link>
        </li>
        <li>
          <Link href="#" className="hover:text-indigo-700">
            Free Samples
          </Link>
        </li>
        <li>
          <Link href="#" className="hover:text-indigo-700">
            Artwork Services
          </Link>
        </li>
        <li>
          <Link href="#" className="hover:text-indigo-700">
            Contact
          </Link>
        </li>
      </ul>

      {/* Mobile Nav */}
      {menuOpen && (
        <ul className="md:hidden px-4 p-4 pb-4 space-y-3 text-sm font-medium">
          <li>
            <button
              onClick={() => toggleDropdown("dtf")}
              className="w-full text-left"
            >
              DTF Transfers ▾
            </button>
            {openDropdown === "dtf" && (
              <ul className="pl-4 space-y-2">
                <li>
                  <Link href="#">Gang Sheet Builder</Link>
                </li>
                <li>
                  <Link href="#">DTF Roll Transfers</Link>
                </li>
              </ul>
            )}
          </li>
          <li>
            <button
              onClick={() => toggleDropdown("uvdtf")}
              className="w-full text-left"
            >
              UV DTF Stickers ▾
            </button>
            {openDropdown === "uvdtf" && (
              <ul className="pl-4 space-y-2">
                <li>
                  <Link href="#">Glossy Finish</Link>
                </li>
                <li>
                  <Link href="#">Matte Finish</Link>
                </li>
              </ul>
            )}
          </li>
          <li>
            <Link href="#">Custom Shirts</Link>
          </li>
          <li>
            <Link href="#">Ready To Press DTF Designs</Link>
          </li>
          <li>
            <Link href="#">Free Samples</Link>
          </li>
          <li>
            <Link href="#">Artwork Services</Link>
          </li>
          <li>
            <Link href="#">Contact</Link>
          </li>
        </ul>
      )}
    </header>
  );
}
