"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { client } from "@/src/sanity/lib/client";
import { allCategory } from "@/src/sanity/lib/queries";
import Link from "next/link";
import { Category } from "@/types/category";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaPinterestP,
  FaYoutube,
  FaPaypal,
  FaCcVisa,
  FaCcMastercard,
  FaCcAmex,
} from "react-icons/fa";
import Swal from "sweetalert2";

export default function Footer() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [email, setEmail] = useState("");

  useEffect(() => {
    async function fetchCategories() {
      try {
        const fetchedCategories: Category[] = await client.fetch(allCategory);
        setCategories(fetchedCategories);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    }
    fetchCategories();
  }, []);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      Swal.fire({
        icon: "error",
        title: "Invalid Email",
        text: "Please enter a valid email address.",
      });
      return;
    }

    // Success prompt
    Swal.fire({
      icon: "success",
      title: "Subscribed!",
      text: "You have successfully subscribed to our newsletter.",
    });

    // Clear input field
    setEmail("");
  };

  return (
    <footer className="bg-white border-t border-gray-200 px-4 sm:px-12 md:px-28">
      <div className="mx-auto py-12">
        {/* Main Footer Content */}
        <div className="flex flex-wrap gap-8 lg:gap-16 justify-between">
          {/* Brand Section */}
          <div className="flex flex-col w-full lg:w-1/4 items-start">
            <div className="flex items-center gap-2">
              <Image src="/Vector.png" alt="logo" width={40} height={40} />
              <span className="text-[#272343] text-2xl font-bold">Comforty</span>
            </div>
            <p className="mt-4 text-gray-500 text-sm">
              Vivamus tristique odio sit amet velit semper, eu posuere turpis
              interdum. Cras egestas purus.
            </p>
            <div className="flex justify-start gap-4 mt-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-[#007580] text-xl p-2 border-2 border-transparent rounded-full hover:border-[#007580]"
              >
                <FaFacebookF />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-[#007580] text-xl p-2 border-2 border-transparent rounded-full hover:border-[#007580]"
              >
                <FaTwitter />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-[#007580] text-xl p-2 border-2 border-transparent rounded-full hover:border-[#007580]"
              >
                <FaInstagram />
              </a>
              <a
                href="https://pinterest.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-[#007580] text-xl p-2 border-2 border-transparent rounded-full hover:border-[#007580]"
              >
                <FaPinterestP />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-[#007580] text-xl p-2 border-2 border-transparent rounded-full hover:border-[#007580]"
              >
                <FaYoutube />
              </a>
            </div>
          </div>

          {/* Category Section */}
          <div className="w-full lg:w-1/6">
            <h4 className="text-lg font-semibold text-[#9A9CAA]">Category</h4>
            <ul className="mt-4 text-[#272343] space-y-2 text-sm">
              {categories.length > 0 ? (
                categories.map((category) => (
                  <li key={category._id}>
                    <Link
                      href={`/categories/${category.slug.current}`}
                      className="hover:text-[#007580] hover:underline hover:underline-offset-4"
                    >
                      {category.title}
                    </Link>
                  </li>
                ))
              ) : (
                <li>Loading categories...</li>
              )}
            </ul>
          </div>

          {/* Support Section */}
          <div className="w-full lg:w-1/6">
            <h4 className="text-lg font-semibold text-[#9A9CAA]">Support</h4>
            <ul className="mt-4 text-[#272343] space-y-2 text-sm">
              {["Help & Support", "Terms & Conditions", "Privacy Policy", "Help"].map(
                (item) => (
                  <li key={item}>
                    <a
                      href="#"
                      className="hover:text-[#007580] hover:underline hover:underline-offset-4"
                    >
                      {item}
                    </a>
                  </li>
                )
              )}
            </ul>
          </div>

          {/* Newsletter Section */}
          <div className="w-full lg:w-1/3">
            <h4 className="text-lg font-semibold text-[#9A9CAA]">Newsletter</h4>
            <form onSubmit={handleSubscribe} className="mt-4 flex gap-2">
              <input
                type="email"
                placeholder="Your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="px-4 py-2 w-full border text-[#9A9CAA] border-gray-300 rounded-l-md focus:outline-none"
              />
              <button
                type="submit"
                className="bg-[#029FAE] text-white px-6 py-2 rounded-md hover:bg-teal-700"
              >
                Subscribe
              </button>
            </form>
            <p className="mt-4 text-gray-500 text-sm">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
              tincidunt erat enim.
            </p>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="flex justify-between items-center flex-wrap text-[#9A9CAA] border-t pt-8 mt-8">
          <p className="text-sm">
            © 2021 - Blogy - Designed & Developed by{" "}
            <a href="#" className="text-[#272343] hover:underline">
              Mustafa Raheel
            </a>
          </p>
          <div className="flex justify-center mt-4 lg:mt-0 space-x-4">
            <FaCcMastercard size={30} />
            <FaPaypal size={30} />
            <FaCcAmex size={30} />
            <FaCcVisa size={30} />
          </div>
        </div>
      </div>
    </footer>
  );
}
