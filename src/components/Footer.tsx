import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <footer className="mt-32 pb-12 sm:mt-24">
      <div className="mx-auto w-full max-w-7xl px-4">
        {/* Main footer content */}
        <div className="hidden text-gray 500 sm:flex items-center">
          © Buy Me a Coffee
        </div>
        <nav className="flex flex-wrap justify-center items-center gap-x-6 gap-y-2 font-medium">
          <Link
            href="https://buymeacoffee.com/about"
            className="hover:text-gray-500"
          >
            About
          </Link>
          <Link
            href="https://help.buymeacoffee.com/en/"
            target="_blank"
            className="hover:text-gray-500"
          >
            Help Center
          </Link>

          <Link
            href="https://buymeacoffee.com/privacy-policy"
            className="hover:text-gray-500 sm:hidden"
          >
            Privacy
          </Link>
          <Link
            href="https://buymeacoffee.com/terms"
            className="hover:text-gray-500 sm:hidden"
          >
            Terms
          </Link>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;
