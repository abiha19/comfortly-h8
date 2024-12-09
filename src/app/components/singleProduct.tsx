import Image from "next/image";
import { ShoppingCart } from "lucide-react";

export default function SingleProductPage() {
  return (
    <>
      {/* Main Product Section */}
      <div className="px-6 md:px-24 py-12 flex flex-col md:flex-row items-center md:items-start space-y-12 md:space-y-0">
        {/* Product Image */}
        <div className="w-full md:w-[620px] h-[300px] md:h-auto p-4">
          <Image
            src="/c1.jpg"
            alt="Library Stool Chair"
            width={620}
            height={600}
            className="object-cover h-full w-full rounded-md"
          />
        </div>

        {/* Product Details */}
        <div className="w-full md:w-[620px] p-4 space-y-6">
          <h1 className="text-3xl md:text-5xl font-semibold">Library Stool Chair</h1>

          <div className="border-b-2 border-[#029fae] pb-6">
            <span className="inline-block bg-[#029fae] text-white text-base py-3 px-6 rounded-3xl">
              $20.00 USD
            </span>
          </div>

          <p className="text-base leading-relaxed md:w-[550px]">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat, dolorum saepe? Architecto sint illum ad
            aliquid voluptates officia earum? Et?
          </p>

          <div className="border-b-2 border-[#029fae] pb-6">
            <button className="flex items-center gap-4 bg-[#029fae] text-white text-base py-3 px-8 rounded-xl">
              <ShoppingCart size={24} strokeWidth={1.5} />
              Add to Cart
            </button>
          </div>
        </div>
      </div>

      {/* Featured Products Section */}
      <div className="px-6 md:px-24 py-12">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold">Featured Products</h2>
          <button className="border-b-2 border-[#029fae] text-sm font-medium hover:text-[#029fae] transition-colors">
            View All
          </button>
        </div>

        {/* Product Cards */}
        <div className="flex flex-wrap justify-center md:justify-between gap-6 py-12">
          {[1, 2, 3, 4, 5].map((item, index) => (
            <div
              key={index}
              className="w-full sm:w-[170px] h-36 hover:bg-[#F0F2F3] py-4 flex flex-col items-center justify-center text-center rounded-lg transition-all duration-200"
            >
              <Image
                src={`/${String(item).padStart(2, "0")}.jpg`}
                alt={`Product ${item}`}
                width={100}
                height={100}
                className="object-cover rounded-md"
              />
              <div className="mt-2">
                <p className="text-sm font-medium">Library Stool Chair</p>
                <p className="text-sm text-gray-600">$99.00</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
