"use client";

import Link from "next/link";
import Image from "next/image";
import { FaShoppingCart } from "react-icons/fa";
import { useState, useEffect } from "react";

export default function Header() {
  const [cartCount, setCartCount] = useState<number>(0);

  useEffect(() => {
    const handleCartUpdated = () => {
      const cart = JSON.parse(localStorage.getItem("cart") || "[]");
      setCartCount(cart.length);
    };

    window.addEventListener("cart-updated", handleCartUpdated);

    // Initial load
    handleCartUpdated();

    return () => {
      window.removeEventListener("cart-updated", handleCartUpdated);
    };
  }, []);

  return (
    <header className="bg-[#F0F2F3] w-full shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <div className="flex items-center">
          <Link href="/">
            <Image
              src="/Vector.png"
              alt="Comforty Logo"
              width={30}
              height={18}
              className="ml-2"
            />
          </Link>
          <Link href="/" className="text-[#007580] text-lg font-bold ml-2">
            Comforty
          </Link>
        </div>
        <Link
          href="/cart"
          className="flex items-center space-x-3 bg-white py-2 px-4 rounded-md shadow-sm hover:shadow-lg transition-all duration-300"
        >
          <FaShoppingCart className="text-xl text-[#007580]" />
          <span className="hidden sm:inline-block text-[#007580]">Cart</span>
          <div className="flex items-center justify-center w-6 h-6 bg-[#007580] text-white text-xs rounded-full">
            {cartCount}
          </div>
        </Link>
      </div>
    </header>
  );
}