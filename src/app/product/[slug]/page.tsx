"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation"; // ✅ Fix: Use useParams()
import { Product } from "@/types/products";
import { client, urlFor } from "@/src/sanity/lib/client";
import { groq } from "next-sanity";
import Image from "next/image";
import { ShoppingCart } from "lucide-react";
import Swal from "sweetalert2";
import { addToCart } from "@/src/app/actions/actions";

async function getProduct(slug: string): Promise<Product | null> {
  return await client.fetch(
    groq`
      *[_type == "products" && slug.current == $slug][0] {
        _id,
        title,
        description,
        price,
        priceWithoutDiscount,
        badge,
        image,
        inventory,
        slug,
      }
    `,
    { slug }
  );
}

export default function ProductPage() {
  const params = useParams(); // ✅ Fix: useParams() to unwrap params
  const slug = Array.isArray(params?.slug) ? params.slug[0] : params?.slug; // ✅ Ensure slug is a string

  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    if (!slug) return; // ✅ Prevent fetching if slug is missing

    async function fetchProduct() {
      if (slug) {
        const fetchedProduct = await getProduct(slug);
        setProduct(fetchedProduct);
      }
    }

    fetchProduct();
  }, [slug]);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();

    if (product && product.inventory > 0) {
      addToCart(product);
      window.dispatchEvent(new CustomEvent("cart-updated"));
    } else {
      Swal.fire({
        title: "Out of Stock",
        text: `Sorry, ${product?.title} is out of stock.`,
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  if (!product) {
    return (
      <div className="container mx-auto px-6 py-20">
        <p className="text-center text-gray-500">Loading product...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-6 py-20">
      <div className="flex flex-col lg:flex-row items-start bg-white rounded-lg shadow-md p-6 gap-8">
        <div className="flex-shrink-0 mb-6 lg:mb-0">
          <Image
            src={urlFor(product.image).url()}
            alt={product.title}
            width={300}
            height={300}
            className="rounded-md object-contain"
          />
        </div>

        <div className="flex-grow">
          <h1 className="text-3xl font-bold text-gray-900">{product.title}</h1>

          {product.badge && (
            <span
              className={`inline-block px-3 py-1 mt-2 text-sm font-medium rounded ${
                product.badge === "New"
                  ? "bg-emerald-500 text-white"
                  : "bg-orange-500 text-white"
              }`}
            >
              {product.badge}
            </span>
          )}

          <div className="mt-4 flex items-center gap-4">
            <span className="text-2xl font-semibold text-teal-600">
              ${product.price.toFixed(2)}
            </span>
            {product.priceWithoutDiscount && (
              <span className="text-lg text-gray-500 line-through">
                ${product.priceWithoutDiscount.toFixed(2)}
              </span>
            )}
          </div>

          <p className="mt-4 text-sm text-gray-600">
            {product.inventory
              ? `${product.inventory} items in stock`
              : "Out of stock"}
          </p>

          <p className="mt-4 text-gray-700">{product.description}</p>

          <button
            className={`mt-6 px-6 py-3 ${
              product.inventory > 0
                ? "bg-[#00B5A5] hover:bg-[#00A294]"
                : "bg-gray-500 cursor-not-allowed"
            } text-white text-lg font-medium rounded-full transition-colors`}
            aria-label="Add to cart"
            onClick={handleAddToCart}
            disabled={!product.inventory}
          >
            <ShoppingCart className="h-5 w-5 inline-block mr-2" />
            {product.inventory ? "Add to Cart" : "Out of Stock"}
          </button>
        </div>
      </div>
    </div>
  );
}
