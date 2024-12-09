"use client";

import Link from "next/link";
import React, { useState } from "react";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleMenuToggle = () => {
    setMenuOpen((prev) => !prev);
  };

  return (
    <nav className="bg-white border-b border-gray-200">
      <div className="container mx-auto px-4 flex justify-between items-center py-4">
        {/* Logo Section */}
        <div>
          <Link href="/" className="text-[#007580] text-lg font-bold">
            Comforty
          </Link>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-6">
          <Link href="/" className="text-gray-700 hover:text-[#007580]">
            Home
          </Link>
          <Link href="#" className="text-gray-700 hover:text-[#007580]">
            Shop
          </Link>
          <Link href="/product" className="text-gray-700 hover:text-[#007580]">
            Product
          </Link>
          <Link href="#" className="text-gray-700 hover:text-[#007580]">
            Pages
          </Link>
          <Link href="/about" className="text-gray-700 hover:text-[#007580]">
            About
          </Link>
        </div>

        {/* Contact Info (Desktop Only) */}
        <div className="hidden md:flex items-center space-x-2">
          <span className="text-gray-500">Contact:</span>
          <span className="text-gray-800 font-medium">(808) 555-0111</span>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden p-2 focus:outline-none"
          onClick={handleMenuToggle}
          aria-label="Toggle navigation menu"
        >
          {menuOpen ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              className="w-6 h-6 text-gray-700"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              className="w-6 h-6 text-gray-700"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-gray-50 border-t border-gray-200">
          <div className="flex flex-col items-start space-y-4 py-4 px-4">
            <Link href="/" className="text-gray-700 hover:text-[#007580]">
              Home
            </Link>
            <Link href="#" className="text-gray-700 hover:text-[#007580]">
              Shop
            </Link>
            <Link href="/product" className="text-gray-700 hover:text-[#007580]">
              Product
            </Link>
            <Link href="#" className="text-gray-700 hover:text-[#007580]">
              Pages
            </Link>
            <Link href="/about" className="text-gray-700 hover:text-[#007580]">
              About
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

