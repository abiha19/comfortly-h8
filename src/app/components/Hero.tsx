import React from "react";
import Image from "next/image"; // Importing Next.js Image component for optimized images

const Hero = () => {
  return (
    <section className="flex justify-center items-center bg-[#F0F2F3] py-6">
      <div className="w-full max-w-screen-xl flex flex-col sm:flex-row items-center justify-between px-6 sm:px-10 lg:px-16">
        {/* Left Section: Text Content */}
        <div className="w-full sm:w-1/2 text-center sm:text-left flex flex-col items-center sm:items-start space-y-4 sm:space-y-6">
          <h1 className="text-sm sm:text-base font-medium text-[#272343] pt-8 sm:pt-[100px]">
            Welcome to Chairy
          </h1>
          <p className="text-2xl sm:text-4xl font-bold leading-snug sm:leading-tight text-[#272343]">
            Best Furniture Collection for your interior.
          </p>
          <div className="mt-4">
            <button className="bg-[#029FAE] text-white flex items-center gap-4 py-3 px-8 rounded-lg hover:bg-[#027d87] transition-all duration-300">
              <span>Shop Now</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 12h18M15 18l6-6-6-6"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Right Section: Image */}
        <div className="w-full sm:w-1/2 mt-6 sm:mt-0 flex justify-center sm:justify-end">
          <Image
            src="/Product Image.png" // Image path relative to the public folder
            alt="Furniture Collection"
            width={434}
            height={584}
            className="rounded-lg "
            priority={true} // Prioritize loading the hero image
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
