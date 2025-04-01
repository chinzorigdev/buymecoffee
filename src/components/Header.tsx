"use client";
import Link from "next/link";
import Image from "next/image";
import { FiSearch } from "react-icons/fi";

const Header = () => {
  return (
    <header className="flex justify-between items-center xs:bg-floral-white py-4 px-4 md:px-8 shadow-sm">
      <div className="flex items-center">
        <nav className="hidden md:block">
          <ul className="flex space-x-6 font-medium text-gray-600">
            <li className="hover:text-yellow-500 cursor-pointer">Explore</li>
            <li className="hover:text-yellow-500 cursor-pointer">FAQ</li>
            <li className="hover:text-yellow-500 cursor-pointer">Resources</li>
          </ul>
        </nav>
      </div>
      <div className="flex items-center ">
        <Link href="/" className="hidden md:block">
          <Image
            src="/img/bmc-brand-logo.svg"
            alt="Logo"
            width={150}
            height={40}
            priority
            className="mr-6"
          />
        </Link>
      </div>
      <div className="flex items-center space-x-3">
        <div className="relative hidden md:block">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FiSearch className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search..."
            className="bg-gray-100 pl-10 pr-4 py-2 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400 w-48"
          />
        </div>
        <button className="text-gray-700 font-medium hover:text-yellow-500 py-2 px-3 rounded transition-colors">
          Нэвтрэх
        </button>
        <button className="bg-yellow-400 hover:bg-yellow-500 text-gray-800 font-medium py-2 px-4 rounded-full transition-colors">
          Бүртгүүлэх
        </button>
      </div>
    </header>
  );
};

export default Header;
