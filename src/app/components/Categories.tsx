"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Category } from "@/types/category";
import { allCategory } from "@/src/sanity/lib/queries";
import { client, urlFor } from "@/src/sanity/lib/client";
import Link from "next/link";

export default function Categories() {
  const [categories, setCategories] = useState<Category[]>([]);

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

  return (
    <section className="w-full px-6 py-28">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <header className="mb-10">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900">
            Top Categories
          </h2>
        </header>

        {/* Category Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category) => (
            <Link
              key={category._id}
              href={`/categories/${category.slug.current}`}
              className="group relative rounded-lg overflow-hidden transition-shadow hover:shadow-lg"
            >
              {/* Image Section */}
              <div className="aspect-[4/3] w-full">
                {category.image ? (
                  <Image
                    src={urlFor(category.image).url()}
                    alt={category.title}
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

              {/* Overlay with Details */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent">
                <div className="absolute bottom-0 p-6">
                  <h3 className="text-xl font-medium text-white mb-2">
                    {category.title}
                  </h3>
                  <p className="text-sm text-gray-200">
                    {category.products
                      ? `${category.products} Products`
                      : "No products available"}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}