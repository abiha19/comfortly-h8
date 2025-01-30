"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { client, urlFor } from "@/src/sanity/lib/client";
import { groq } from "next-sanity";
import { ShoppingCart } from "lucide-react";
import { addToCart } from "@/src/app/actions/actions";
import { Product } from "@/types/products"; // Use the shared Product type

export default function CategoryProducts() {
  const params = useParams();
  const slug = params.slug as string;

  const [products, setProducts] = useState<Product[]>([]);
  const [categoryName, setCategoryName] = useState<string | null>(null);

  useEffect(() => {
    async function fetchProducts() {
      const query = groq`
        *[_type == "products" && category->slug.current == $slug] {
          _id,
          _type,
          title,
          price,
          badge,
          inventory,
          priceWithoutDiscount,
          slug,
          image {
            asset-> {
              _ref,
              url
            }
          }
        }
      `;
      const categoryQuery = groq`
        *[_type == "categories" && slug.current == $slug][0] {
          title
        }
      `;

      try {
        const fetchedProducts = await client.fetch(query, { slug });
        const categoryData = await client.fetch(categoryQuery, { slug });

        setProducts(fetchedProducts);
        setCategoryName(categoryData?.title || "Category");
      } catch (error) {
        console.error("Error fetching products or category:", error);
      }
    }

    fetchProducts();
  }, [slug]);

  const handleAddToCart = (e: React.MouseEvent, product: Product) => {
    e.preventDefault();
    addToCart(product);

    const event = new CustomEvent("cart-updated");
    window.dispatchEvent(event);
  };

  return (
    <section className="container mx-auto px-6 py-20">
      <header className="mb-10">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">
          {categoryName}
        </h1>
      </header>

      {products.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((prod: Product) => {
            const productImage =
              prod.image && Array.isArray(prod.image)
                ? prod.image[0]
                : prod.image;

            return (
              <div
                key={prod._id}
                className="group relative rounded-lg bg-white shadow-md hover:shadow-lg transition-shadow duration-300"
              >
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
        <div className="text-center text-gray-500 text-lg">
          No products available in this category.
        </div>
      )}
    </section>
  );
}
