import React, { useState } from "react";

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div>
      <header className="pb-6 bg-white lg:pb-0">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <nav className="flex items-center justify-between h-16 lg:h-20">
            <div className="flex-shrink-0">
              <a href="#" title="" className="flex">
                <img
                  className="w-auto h-8 lg:h-10"
                  src="https://cdn.rareblocks.xyz/collection/celebration/images/logo.svg"
                  alt="Logo"
                />
              </a>
            </div>

            <div className="hidden lg:flex lg:items-center lg:ml-auto lg:space-x-10">
              {["Features", "Solutions", "Resources"].map((item) => (
                <a
                  key={item}
                  href="#"
                  className="text-base font-medium text-black transition-all duration-200 hover:text-blue-600 focus:text-blue-600"
                >
                  {item}
                </a>
              ))}
            </div>

            <div className="flex lg:hidden">
              <button
                onClick={toggleMobileMenu}
                className="text-black focus:outline-none"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  {isMobileMenuOpen ? (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  ) : (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16m-7 6h7"
                    />
                  )}
                </svg>
              </button>
            </div>
          </nav>

          {/* Mobile Navigation */}
          {isMobileMenuOpen && (
            <nav className="pt-4 pb-6 bg-white border border-gray-200 rounded-md shadow-md lg:hidden">
              <div className="flow-root">
                <div className="flex flex-col px-6 -my-2 space-y-1">
                  {["Features", "Solutions", "Resources"].map((item) => (
                    <a
                      key={item}
                      href="#"
                      className="inline-flex py-2 text-base font-medium text-black transition-all duration-200 hover:text-blue-600 focus:text-blue-600"
                    >
                      {item}
                    </a>
                  ))}
                </div>
              </div>
            </nav>
          )}
        </div>
      </header>
    </div>
  );
};

export default Header;
