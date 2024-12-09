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

export default function OurProduct() {
  const products: Product[] = [
    {
      id: 1,
      title: "Library Stool Chair",
      price: 20,
      image: "/c1.jpg",
      isNew: true,
    },
    {
      id: 2,
      title: "Library Stool Chair",
      price: 20,
      originalPrice: 30,
      image: "/c2.jpg",
      isSale: true,
    },
    {
      id: 3,
      title: "Library Stool Chair",
      price: 20,
      image: "/c3.jpg",
    },
    {
      id: 4,
      title: "Library Stool Chair",
      price: 20,
      image: "/c4.jpg",
    },
    {
      id: 5,
      title: "Library Stool Chair",
      price: 20,
      image: "/c5.jpg",
      isNew: true,
    },
    {
      id: 6,
      title: "Library Stool Chair",
      price: 20,
      originalPrice: 30,
      image: "/c6.jpg",
      isSale: true,
    },
    {
      id: 7,
      title: "Library Stool Chair",
      price: 20,
      image: "/c7.jpg",
    },
    {
      id: 8,
      title: "Library Stool Chair",
      price: 20,
      image: "/c8.jpg",
    },
  ];

  return (
    <section className="container mx-auto px-6 py-20">
      {/* Section Title */}
      <header className="mb-10 text-center">
        <h1 className="text-3xl font-semibold text-[#1C1B1F] tracking-tight">
          Our Products
        </h1>
      </header>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="group relative rounded-lg bg-white shadow-md overflow-hidden"
          >
            {/* Product Image */}
            <div className="relative aspect-square">
              {product.isNew && (
                <Badge className="absolute left-3 top-3 bg-emerald-500 hover:bg-emerald-600">
                  New
                </Badge>
              )}
              {product.isSale && (
                <Badge className="absolute left-3 top-3 bg-orange-500 hover:bg-orange-600">
                  Sale
                </Badge>
              )}
              <Link href="/components/productDescription/description">
                <Image
                  src={product.image}
                  alt={product.title}
                  width={400}
                  height={400}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </Link>
            </div>

            {/* Product Details */}
            <div className="p-4">
              <h3 className="text-sm font-medium text-[#1C1B1F]">
                {product.title}
              </h3>
              <div className="mt-2 flex items-center gap-2">
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

            {/* Add to Cart Button */}
            <div className="absolute bottom-4 right-4">
              <button className="flex items-center justify-center w-10 h-10 rounded-full bg-[#00B5A5] text-white hover:bg-[#00A294] transition-colors">
                <ShoppingCart className="h-5 w-5" />
                <span className="sr-only">Add to cart</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
