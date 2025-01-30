"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Product } from "@/types/products";
import { firstSixProducts } from "@/src/sanity/lib/queries";
import { client, urlFor } from "@/src/sanity/lib/client";
import Link from "next/link";
import Swal from "sweetalert2";

export default function Instagram() {
  const [products, setProducts] = useState<Product[]>([]);
  const [email, setEmail] = useState("");

  useEffect(() => {
    async function fetchProducts() {
      const fetchedProducts: Product[] = await client.fetch(firstSixProducts);
      setProducts(fetchedProducts);
    }
    fetchProducts();
  }, []);

  const handleSubscribe = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (emailRegex.test(email)) {
      Swal.fire({
        icon: "success",
        title: "Subscribed!",
        text: "Thank you for subscribing to our newsletter.",
      });
      setEmail(""); // Clear the email input field
    } else {
      Swal.fire({
        icon: "error",
        title: "Invalid Email",
        text: "Please enter a valid email address.",
      });
    }
  };

  return (
    <div className="w-full h-auto bg-[#F0F2F3]">
      {/* Newsletter Section */}
      <div className="max-w-3xl mx-auto py-16 px-4 text-center space-y-6">
        <h2 className="font-bold text-[50px] mt-4">
          Or Subscribe to the Newsletter
        </h2>
        <div className="flex justify-center items-center gap-16 flex-col sm:flex-row">
          {/* Email Input */}
          <div className="flex flex-col items-start mt-12 relative w-full sm:w-[643px]">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              id="email"
              required
              placeholder=" "
              className="peer bg-[#F0F2F3] text-black-500 px-4 py-2 w-full border-b-2 border-gray-300 focus:outline-none transition-all"
            />
            <label
              htmlFor="email"
              className="absolute left-4 -top-4 text-sm text-gray-500 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:-top-4 peer-focus:text-sm peer-focus:text-gray-600"
            >
              Email Address
            </label>
            <div className="w-full h-[2px] bg-black"></div>
          </div>

          {/* Submit Button */}
          <div className="flex flex-col items-center mt-12">
            <button
              onClick={handleSubscribe}
              className="text-black hover:text-gray-400 text-[16px] font-normal transition-all px-8 py-2 rounded-md"
            >
              SUBMIT
            </button>
            <div className="w-[91px] h-[2px] bg-black hover:bg-black-400"></div>
          </div>
        </div>
      </div>

      {/* Instagram Follow Section */}
      <div className="max-w-7xl mx-auto px-4 py-6 space-y-8">
        <h2 className="text-[50px] font-bold text-center">
          Follow Products and Discounts on Instagram
        </h2>
      </div>

      {/* Products Section */}
      {products.length > 0 ? (
        <div className="flex space-x-8 overflow-x-auto p-4 py-8 sm:p-8 md:p-12">
          {products.map((prod) => (
            <div
              key={prod._id}
              className="group relative rounded-lg bg-white shadow-md hover:shadow-lg transition-shadow duration-300 w-64 sm:w-72 md:w-80"
            >
              {/* Product Image */}
              <Link href={`/product/${prod.slug.current}`}>
                <div className="relative overflow-hidden rounded-lg aspect-square">
                  {prod.badge && (
                    <span
                      className={`absolute left-3 top-3 px-3 py-1 rounded-lg text-xs ${
                        prod.badge === "New"
                          ? "bg-emerald-500 text-white"
                          : "bg-orange-500 text-white"
                      }`}
                    >
                      {prod.badge}
                    </span>
                  )}
                  <Image
                    src={urlFor(prod.image).url()}
                    alt={prod.title}
                    width={400}
                    height={400}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
              </Link>
            </div>
          ))}
        </div>
      ) : (
        <div>No products available.</div>
      )}
    </div>
  );
}
