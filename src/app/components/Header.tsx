import { FaShoppingCart } from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";

const Header = () => {
  return (
    <header className="w-full bg-[#F0F2F3] py-5 h-[84px]">
      <div className="max-w-screen-xl mx-auto flex justify-between items-center px-6 sm:px-8">
        {/* Logo and Brand Name */}
        <div className="flex items-center space-x-4">
          <Image
            src="/Vector.png"
            alt="Comforty Logo"
            width={40}
            height={23.34}
            className="ml-2"
          />
          <h2 className="text-2xl font-semibold text-[#333]">Comforty</h2>
        </div>

        {/* Cart Section */}
        <div className="flex items-center space-x-4">
          <Link href="/cart">
            <a className="flex items-center space-x-3 bg-white py-2 px-4 rounded-md shadow-sm hover:shadow-lg transition-all duration-300">
              <FaShoppingCart className="text-xl text-[#007580]" />
              <span className="hidden sm:inline-block text-[#007580]">Cart</span>
              <div className="flex items-center justify-center w-6 h-6 bg-[#007580] text-white text-xs rounded-full">
                2
              </div>
            </a>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header; 