import { Search } from "lucide-react";

const Navbar = () => {
  return (
    <nav className="sticky top-0 z-10 bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <span className="text-2xl font-bold text-blue-600">Feedbook</span>
          </div>

          {/* Search Bar (Desktop) */}
          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search Facebook"
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-full bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-colors"
                disabled
              />
            </div>
          </div>

          {/* User Menu */}
          <div className="flex items-center space-x-4">
            <button className="md:hidden p-2 rounded-full hover:bg-gray-100 transition-colors">
              <Search className="h-5 w-5 text-gray-600" />
            </button>

            <div className="relative">
              <button className="flex items-center space-x-2 p-1.5 rounded-full hover:bg-gray-100 transition-colors">
                <div className="h-8 w-8 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white font-semibold text-sm">
                  U
                </div>
                <span className="hidden sm:inline-block text-sm font-medium text-gray-700">
                  User
                </span>
                <svg
                  className="hidden sm:block h-4 w-4 text-gray-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
