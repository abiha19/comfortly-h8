import Image from "next/image";
import Link from "next/link";

const categoriesData = [
  {
    name: "Wing Chair",
    products: "3,584 Products",
    image: "/c7.jpg",
    href: "/categories/wing-chair",
  },
  {
    name: "Wooden Chair",
    products: "157 Products",
    image: "/c8.jpg",
    href: "/categories/wooden-chair",
  },
  {
    name: "Desk Chair",
    products: "154 Products",
    image: "/c4.jpg",
    href: "/categories/desk-chair",
  },
];

export default function Categories() {
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
          {categoriesData.map((category) => (
            <Link
              key={category.name}
              href={category.href}
              className="group relative rounded-lg overflow-hidden transition-shadow hover:shadow-lg"
            >
              {/* Image Section */}
              <div className="aspect-[4/3] w-full">
                <Image
                  src={category.image}
                  alt={category.name}
                  width={400}
                  height={400}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  priority
                />
              </div>

              {/* Overlay with Details */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent">
                <div className="absolute bottom-0 p-6">
                  <h3 className="text-xl font-medium text-white mb-2">
                    {category.name}
                  </h3>
                  <p className="text-sm text-gray-200">{category.products}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
