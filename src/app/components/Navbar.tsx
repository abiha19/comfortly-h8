"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FaSearch, FaBars, FaTimes } from "react-icons/fa";

export default function Navbar() {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?query=${searchQuery}`);
    }
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <Link href="/" className="text-[#007580] text-lg font-bold">
          Comforty
        </Link>

        {/* Search Bar */}
        <form
          onSubmit={handleSearch}
          className="hidden md:flex flex-1 justify-center relative"
        >
          <div className="relative w-[300px] group focus-within:w-[400px] transition-all duration-300 ease-in-out">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search..."
              className="w-full p-2 text-gray-700 rounded-full border-2 border-gray-300 focus:ring-2 focus:ring-[#007580] focus:w-full transition-all duration-300 ease-in-out"
            />
            <button type="submit" className="absolute right-3 top-1/2 transform -translate-y-1/2">
              <FaSearch className="text-[#007580] text-lg transition-all duration-300 ease-in-out" />
            </button>
          </div>
        </form>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-6">
          <Link
            href="/"
            className="text-gray-700 hover:text-[#007580] group relative"
          >
            Home
            <span className="absolute left-0 bottom-0 w-full h-0.5 bg-[#007580] scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
          </Link>
          <Link
            href="#"
            className="text-gray-700 hover:text-[#007580] group relative"
          >
            Studio
            <span className="absolute left-0 bottom-0 w-full h-0.5 bg-[#007580] scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
          </Link>
          <Link
            href="/product"
            className="text-gray-700 hover:text-[#007580] group relative"
          >
            Product
            <span className="absolute left-0 bottom-0 w-full h-0.5 bg-[#007580] scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
          </Link>
          <Link
            href="/about"
            className="text-gray-700 hover:text-[#007580] group relative"
          >
            About
            <span className="absolute left-0 bottom-0 w-full h-0.5 bg-[#007580] scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
          </Link>
          <Link
            href="/contact"
            className="text-gray-700 hover:text-[#007580] group relative"
          >
            Contact
            <span className="absolute left-0 bottom-0 w-full h-0.5 bg-[#007580] scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center">
          <button onClick={toggleMobileMenu} className="text-[#007580] text-2xl">
            {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      {/* Mobile Search Bar */}
      <form
        onSubmit={handleSearch}
        className="md:hidden flex justify-center mt-4 px-4"
      >
        <div className="relative w-full mb-3 items-center max-w-md group focus-within:w-full transition-all duration-300 ease-in-out">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search..."
            className="w-full p-2 text-gray-700 rounded-full border-2 border-gray-300 focus:ring-[#007580] focus:w-full transition-all duration-300 ease-in-out"
          />
          <button type="submit" className="absolute right-3 top-1/2 transform -translate-y-1/2">
            <FaSearch className="text-[#007580] text-lg transition-all duration-300 ease-in-out" />
          </button>
        </div>
      </form>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white shadow-md mt-4">
          <div className="container mx-auto px-6 py-4 flex flex-col space-y-4">
            <Link
              href="/"
              className="text-gray-700 hover:text-[#007580] group relative"
              onClick={toggleMobileMenu}
            >
              Home
              <span className="absolute left-0 bottom-0 w-full h-0.5 bg-[#007580] scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
            </Link>
            <Link
              href="/studio"
              className="text-gray-700 hover:text-[#007580] group relative"
              onClick={toggleMobileMenu}
            >
              Studio
              <span className="absolute left-0 bottom-0 w-full h-0.5 bg-[#007580] scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
            </Link>
            <Link
              href="/product"
              className="text-gray-700 hover:text-[#007580] group relative"
              onClick={toggleMobileMenu}
            >
              Product
              <span className="absolute left-0 bottom-0 w-full h-0.5 bg-[#007580] scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
            </Link>
            <Link
              href="/about"
              className="text-gray-700 hover:text-[#007580] group relative"
              onClick={toggleMobileMenu}
            >
              About
              <span className="absolute left-0 bottom-0 w-full h-0.5 bg-[#007580] scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
            </Link>
            <Link
              href="/contact"
              className="text-gray-700 hover:text-[#007580] group relative"
              onClick={toggleMobileMenu}
            >
              Contact
              <span className="absolute left-0 bottom-0 w-full h-0.5 bg-[#007580] scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}