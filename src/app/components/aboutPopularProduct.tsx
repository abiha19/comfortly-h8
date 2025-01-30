"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Product } from "@/types/products";
import { firstFiveProducts } from "@/src/sanity/lib/queries";
import { client, urlFor } from "@/src/sanity/lib/client";
import { ShoppingCart } from "lucide-react";
import Link from "next/link";
import { addToCart } from "@/src/app/actions/actions";

export default function AboutPopularProduct() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    async function fetchProducts() {
      const fetchedProducts: Product[] = await client.fetch(firstFiveProducts);
      setProducts(fetchedProducts);
    }
    fetchProducts();
  }, []);

  const handleAddToCart = (e: React.MouseEvent, product: Product) => {
    e.preventDefault();
    addToCart(product);

    // Dispatch event to notify the header component
    const event = new CustomEvent("cart-updated");
    window.dispatchEvent(event);
  };

  return (
    <section className="w-full mx-auto px-6 py-20">
      <header className="mb-10">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">
          Popular Products
        </h1>
      </header>

      {products.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8">
          {products.map((prod) => {
            const productImage =
              prod.image && Array.isArray(prod.image)
                ? prod.image[0]
                : prod.image;

            return (
              <div
                key={prod._id}
                className="group relative rounded-lg bg-white shadow-md hover:shadow-lg transition-shadow duration-300"
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
                    {productImage ? (
                      <Image
                        src={urlFor(productImage).url()}
                        alt={prod.title}
                        width={400}
                        height={400}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gray-200 text-gray-500">
                        No Image
                      </div>
                    )}
                  </div>
                </Link>

                {/* Product Info */}
                <div className="mt-4 flex justify-between items-center px-2">
                  <div>
                    <h3 className="text-sm text-[#1C1B1F] font-medium">
                      {prod.title}
                    </h3>
                    <div className="mt-1 flex items-center gap-2">
                      <span className="text-lg font-semibold text-[#1C1B1F]">
                        ${prod.price.toFixed(2)}
                      </span>
                    </div>
                  </div>

                  <button
                    className="p-2 bg-[#00B5A5] text-white rounded-full hover:bg-[#00A294] transition-colors"
                    aria-label="Add to cart"
                    onClick={(e) => handleAddToCart(e, prod)}
                  >
                    <ShoppingCart className="h-5 w-5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div>No products available.</div>
      )}
    </section>
  );
}