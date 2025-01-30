import React from "react";
import { FaTruck, FaCheck } from "react-icons/fa";
import { IoFileTrayOutline } from "react-icons/io5";
import { BiSolidLeaf } from "react-icons/bi";

const AboutSection = () => {
  const features = [
    {
      icon: <FaTruck className="text-[#007580] mb-2" />,
      title: "Next day as standard",
      description: "Order before 3pm and get your order the next day as standard",
    },
    {
      icon: <FaCheck className="text-[#007580] mb-2" />,
      title: "Made by true artisans",
      description:
        "Handmade crafted goods made with real passion and craftsmanship",
    },
    {
      icon: <IoFileTrayOutline className="text-[#007580] mb-2" />,
      title: "Unbeatable prices",
      description:
        "For our materials and quality, you won’t find better prices anywhere",
    },
    {
      icon: <BiSolidLeaf className="text-[#007580] mb-2" />,
      title: "Recycled packaging",
      description:
        "We use 100% recycled material to ensure our footprint is more manageable",
    },
  ];

  return (
    <section className="max-w-screen-xl mx-auto mt-32 px-6">
      {/* Section Title */}
      <header className="mb-12 text-center">
        <h2 className="text-2xl sm:text-3xl font-semibold">
          What Makes Our Brand Different
        </h2>
      </header>

      {/* Features Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {features.map((feature, index) => (
          <div
            key={index}
            className="bg-[#F9F9F9] p-6 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow duration-300"
          >
            {/* Icon */}
            <div className="flex justify-center items-center text-3xl">
              {feature.icon}
            </div>

            {/* Title */}
            <h3 className="text-lg sm:text-xl font-medium text-[#007580] mt-4">
              {feature.title}
            </h3>

            {/* Description */}
            <p className="text-sm sm:text-base text-[#007580] mt-3">
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default AboutSection;
