import { Link } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { IoIosLogOut } from "react-icons/io";

const Navbar = () => {
  const { user, isLoggedIn, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);


  return (
    <nav className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 border-b border-gray-700 shadow-xl sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent hover:from-blue-300 hover:to-purple-400 transition-all duration-300">
              BlogPro
            </Link>
          </div>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center space-x-3 ">
            <Link
              to="/"
              className="px-4 py-2 text-gray-300 hover:text-white hover:bg-gray-700/50 rounded-lg transition-all duration-200"
            >
              Home
            </Link>
            <Link
              to="/create"
              className="px-4 py-2 text-gray-300 hover:text-white hover:bg-gray-700/50 rounded-lg transition-all duration-200"
            >
              Create Post
            </Link>
            {isLoggedIn &&
            <Link
              to="/myposts"
              className="px-4 py-2 text-gray-300 hover:text-white hover:bg-gray-700/50 rounded-lg transition-all duration-200"
            >
              My Posts
            </Link>
}

            {!isLoggedIn && (
              <>
                <Link
                  to="/login"
                  className="px-4 py-2 text-gray-300 hover:text-white hover:bg-gray-700/50 rounded-lg transition-all duration-200"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-lg hover:from-blue-500 hover:to-blue-400 shadow-lg shadow-blue-500/30 transition-all duration-200 font-medium"
                >
                  Register
                </Link>
              </>
            )}

            {isLoggedIn && (
              <div className="relative ml-2">
                <button
                  onClick={() => setMenuOpen(!menuOpen)}
                  className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-gray-700/50 hover:bg-gray-700 transition-all duration-200 border border-gray-600"
                >
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold text-sm">
                    {user?.username?.[0]?.toUpperCase() || "U"}
                  </div>
                  <span className="text-gray-200 font-medium">{user?.username || "User"}</span>
                  <svg className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${menuOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {menuOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-gray-800 rounded-lg shadow-2xl py-2 z-50 border border-gray-700 ">
                    
                    
                    <button
                      onClick={() => {
                        setMenuOpen(false);
                        logout();
                      }}
                      className="flex items-center w-full text-left px-4 py-3 text-gray-300 hover:text-red-400 hover:bg-gray-700/70  cursor-pointer gap-2"
                    >
                      {/* <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                      </svg> */}
                      <IoIosLogOut size={20} />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="text-gray-300 hover:text-white focus:outline-none p-2 hover:bg-gray-700/50 rounded-lg transition-all duration-200"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {menuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-gray-800/95 backdrop-blur-sm px-4 pt-2 pb-4 space-y-1 border-t border-gray-700">
          <Link
            to="/"
            className="block px-4 py-3 text-gray-300 hover:text-white hover:bg-gray-700/70 rounded-lg transition-all duration-150"
            onClick={() => setMenuOpen(false)}
          >
            Home
          </Link>
          <Link
            to="/create"
            className="block px-4 py-3 text-gray-300 hover:text-white hover:bg-gray-700/70 rounded-lg transition-all duration-150"
            onClick={() => setMenuOpen(false)}
          >
            Create Post
          </Link>
          {!isLoggedIn && (
            <>
              <Link
                to="/login"
                className="block px-4 py-3 text-gray-300 hover:text-white hover:bg-gray-700/70 rounded-lg transition-all duration-150"
                onClick={() => setMenuOpen(false)}
              >
                Login
              </Link>
              <Link
                to="/register"
                className="block px-4 py-3 bg-gradient-to-r from-blue-600 to-blue-500 text-white text-center rounded-lg hover:from-blue-500 hover:to-blue-400 shadow-lg shadow-blue-500/30 transition-all duration-200 font-medium"
                onClick={() => setMenuOpen(false)}
              >
                Register
              </Link>
            </>
          )}
          {isLoggedIn && (
            <>
              <div className="flex items-center space-x-3 px-4 py-3 bg-gray-700/30 rounded-lg border border-gray-700">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold">
                  {user?.username?.[0]?.toUpperCase() || "U"}
                </div>
                <span className="text-gray-200 font-medium">{user?.username || "User"}</span>
              </div>
              
              <button
                onClick={() => {
                  logout();
                  setMenuOpen(false);
                }}
                className="block w-full text-left px-4 py-3 text-gray-300 hover:text-red-400 hover:bg-gray-700/70 rounded-lg transition-all duration-150 cursor-pointer"
              >
                Logout
              </button>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;