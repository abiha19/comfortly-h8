import React from "react";
import Image from "next/image";

const AboutPopularProduct = () => {
  return (
    <section className="max-w-screen-xl mx-auto mt-32 px-6">
      {/* Section Title */}
      <header className="mb-12">
        <h2 className="text-2xl sm:text-3xl font-semibold text-left">
          Our Popular Products
        </h2>
      </header>

      {/* Products Grid */}
      <div className="flex flex-col sm:flex-row justify-between gap-8">
        {/* Product Card 1 */}
        <div className="flex flex-col items-start">
          <Image
            src="/1.jpg"
            alt="The Poplar Suede Sofa"
            width={590}
            height={375}
            className="w-full h-auto object-cover rounded-lg"
          />
          <h3 className="pt-5 text-lg font-medium text-left">
            The Poplar Suede Sofa
          </h3>
          <p className="pt-2 text-md text-left text-gray-600">$99.00</p>
        </div>

        {/* Product Card 2 */}
        <div className="flex flex-col items-start">
          <Image
            src="/2.jpg"
            alt="The Dandy Chair"
            width={305}
            height={375}
            className="w-full h-auto object-cover rounded-lg"
          />
          <h3 className="pt-5 text-lg font-medium text-left">The Dandy Chair</h3>
          <p className="pt-2 text-md text-left text-gray-600">$99.00</p>
        </div>

        {/* Product Card 3 */}
        <div className="flex flex-col items-start">
          <Image
            src="/3.jpg"
            alt="The Dandy Chair"
            width={305}
            height={375}
            className="w-full h-auto object-cover rounded-lg"
          />
          <h3 className="pt-5 text-lg font-medium text-left">The Dandy Chair</h3>
          <p className="pt-2 text-md text-left text-gray-600">$99.00</p>
        </div>
      </div>
    </section>
  );
};

export default AboutPopularProduct;
