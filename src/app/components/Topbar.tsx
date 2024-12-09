import { ChevronDown } from "lucide-react";
import Link from "next/link";
import { FaCheck, FaExclamationCircle } from "react-icons/fa";

const Topbar = () => {
  return (
    <div className="w-full bg-[#272343] py-[14px] sm:py-[14px] flex flex-col sm:flex-row items-center justify-between h-[45px] sm:h-[50px]">
      <div className="max-w-screen-xl mx-auto container px-4 flex items-center justify-between w-full">
        {/* Left Section: Promo Message */}
        <div className="text-white flex items-center space-x-2 text-[10px] sm:text-[12px] font-normal text-center sm:text-left xs:text-left">
          <FaCheck className="text-white" />
          <span>Free shipping on all orders over $50</span>
        </div>

        {/* Right Section: Language Selector, FAQ and Help */}
        <div className="text-white flex items-center space-x-4 text-[10px] sm:text-[12px] font-normal text-center sm:text-left xs:text-left">
          {/* Language Selector */}
          <div className="flex items-center space-x-1 cursor-pointer">
            <span>Eng</span>
            <ChevronDown className="text-white" />
          </div>

          {/* FAQ Link */}
          <Link href="/faq">
            <a className="cursor-pointer">FAQs</a>
          </Link>

          {/* Help Section */}
          <div className="flex items-center space-x-2 cursor-pointer">
            <FaExclamationCircle className="text-white" />
            <span>Need Help</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Topbar;
