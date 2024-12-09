import React from "react";
import { ShoppingCart } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import Link from "next/link";

interface Product {
  id: number;
  title: string;
  price: number;
  originalPrice?: number;
  image: string;
  isNew?: boolean;
  isSale?: boolean;
}

export default function AllProduct() {
  const products: Product[] = [
    { id: 1, title: "Library Stool Chair", price: 20, image: "/c1.jpg", isNew: true },
    { id: 2, title: "Library Stool Chair", price: 20, originalPrice: 30, image: "/c2.jpg", isSale: true },
    { id: 3, title: "Library Stool Chair", price: 20, image: "/c3.jpg" },
    { id: 4, title: "Library Stool Chair", price: 20, image: "/c4.jpg" },
    { id: 5, title: "Library Stool Chair", price: 20, image: "/c5.jpg", isNew: true },
    { id: 6, title: "Library Stool Chair", price: 20, originalPrice: 30, image: "/c6.jpg", isSale: true },
    { id: 7, title: "Library Stool Chair", price: 20, image: "/c7.jpg" },
    { id: 8, title: "Library Stool Chair", price: 20, image: "/c1.jpg" },
  ];

  return (
    <section className="container mx-auto px-6 py-16">
      {/* Header */}
      <header className="mb-10 text-center">
        <h1 className="text-3xl font-semibold text-[#1C1B1F]">Our Products</h1>
      </header>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {products.map((product) => (
          <div
            key={product.id}
            className="group relative rounded-lg bg-white shadow-md hover:shadow-lg transition-shadow duration-300"
          >
            {/* Product Image */}
            <div className="relative overflow-hidden rounded-lg aspect-square">
              {product.isNew && (
                <Badge className="absolute left-3 top-3 bg-emerald-500 text-white px-3 py-1 rounded-lg hover:bg-emerald-600">
                  New
                </Badge>
              )}
              {product.isSale && (
                <Badge className="absolute left-3 top-3 bg-orange-500 text-white px-3 py-1 rounded-lg hover:bg-orange-600">
                  Sale
                </Badge>
              )}
              <Link href={"/components/productDescription/description"}>
                <Image
                  src={product.image}
                  alt={product.title}
                  width={400}
                  height={400}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </Link>
            </div>

            {/* Product Info */}
            <div className="mt-4 flex justify-between items-center px-2">
              <div>
                <h3 className="text-sm text-[#1C1B1F]">{product.title}</h3>
                <div className="mt-1 flex items-center gap-2">
                  <span className="text-lg font-semibold text-[#1C1B1F]">
                    ${product.price}
                  </span>
                  {product.originalPrice && (
                    <span className="text-sm text-gray-500 line-through">
                      ${product.originalPrice}
                    </span>
                  )}
                </div>
              </div>
              <button
                className="p-2 bg-[#00B5A5] text-white rounded-full hover:bg-[#00A294] transition-colors"
                aria-label="Add to cart"
              >
                <ShoppingCart className="h-5 w-5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
