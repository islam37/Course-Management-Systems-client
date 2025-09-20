import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "./context/AuthContext";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/");
    } catch (err) {
      console.error("Logout failed", err);
    }
  };

  return (
    <nav className="bg-gradient-to-r from-indigo-900 to-blue-800 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="bg-white p-2 rounded-lg">
              <svg
                className="h-6 w-6 text-indigo-700"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                <path
                  fillRule="evenodd"
                  d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 
                  9.542 7c-1.274 4.057-5.064 7-9.542 
                  7S1.732 14.057.458 10zM14 10a4 4 
                  0 11-8 0 4 4 0 018 0z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <span className="text-xl font-bold">EduManagement</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6">
            <Link to="/" className="hover:text-indigo-300 transition">
              Home
            </Link>
            <Link to="/about" className="hover:text-indigo-300 transition">
              About
            </Link>
            {user && (
              <>
                <Link to="/courses" className="hover:text-indigo-300 transition">
                  Courses
                </Link>
                <Link to="/add-course" className="hover:text-indigo-300 transition">
                  Add Course
                </Link>
                <Link to="/manage-courses" className="hover:text-indigo-300 transition">
                  Manage Courses
                </Link>
                <Link to="/my-enrolled" className="hover:text-indigo-300 transition">
                  My Enrolled
                </Link>
              </>
            )}
          </div>

          {/* Right Section */}
          <div className="hidden md:flex items-center space-x-4">
            {!user ? (
              <>
                <Link
                  to="/login"
                  className="px-4 py-2 rounded-md hover:bg-indigo-700 transition"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="px-4 py-2 rounded-md bg-white text-indigo-700 hover:bg-indigo-100 transition"
                >
                  Register
                </Link>
              </>
            ) : (
              <div className="flex items-center space-x-4">
                {/* Profile Dropdown */}
                <div className="relative">
                  <button
                    onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                    className="flex items-center space-x-2 focus:outline-none"
                  >
                    <img
                      src={user.photoURL || "https://i.pravatar.cc/40"}
                      alt="profile"
                      className="h-9 w-9 rounded-full border-2 border-indigo-400"
                    />
                  </button>
                  {isProfileMenuOpen && (
                    <div className="absolute right-0 mt-2 w-40 bg-white text-black rounded-md shadow-lg py-2 z-20">
                      <Link
                        to="/profile"
                        className="block px-4 py-2 hover:bg-indigo-100"
                      >
                        Profile
                      </Link>
                    </div>
                  )}
                </div>

                {/* Logout Button */}
                <button
                  onClick={handleLogout}
                  className="px-3 py-1 rounded-md bg-red-600 hover:bg-red-700 text-white text-sm transition"
                >
                  Logout
                </button>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-md text-indigo-200 hover:text-white hover:bg-indigo-700"
            >
              {isMobileMenuOpen ? (
                <svg
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-indigo-800 px-4 pb-4 space-y-2">
          <Link to="/" className="block hover:text-indigo-300">
            Home
          </Link>
          <Link to="/about" className="block hover:text-indigo-300">
            About
          </Link>
          {user && (
            <>
              <Link to="/courses" className="block hover:text-indigo-300">
                Courses
              </Link>
              <Link to="/add-course" className="block hover:text-indigo-300">
                Add Course
              </Link>
              <Link to="/manage-courses" className="block hover:text-indigo-300">
                Manage Courses
              </Link>
              <Link to="/my-enrolled" className="block hover:text-indigo-300">
                My Enrolled
              </Link>
              <Link to="/profile" className="block hover:text-indigo-300 mt-2">
                Profile
              </Link>
              <button
                onClick={handleLogout}
                className="block w-full text-left mt-2 px-3 py-2 rounded-md bg-red-600 hover:bg-red-700 text-white"
              >
                Logout
              </button>
            </>
          )}
          {!user && (
            <>
              <Link to="/login" className="block hover:text-indigo-300">
                Login
              </Link>
              <Link to="/signup" className="block hover:text-indigo-300">
                Register
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
