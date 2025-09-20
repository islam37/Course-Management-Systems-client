import React from "react";
import { Link } from "react-router-dom";
import {
  FaFacebook,
  FaTwitter,
  FaLinkedin,
  FaInstagram,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-indigo-900 to-blue-800 text-gray-200 py-10 mt-10">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Logo + Slogan */}
        <div>
          <h2 className="text-2xl font-bold text-white">EduManagement</h2>
          <p className="mt-2 text-sm text-gray-300">
            Empowering learners and educators with modern digital tools.
          </p>
          <div className="flex space-x-4 mt-4">
            <a href="#" className="hover:text-white">
              <FaFacebook size={20} />
            </a>
            <a href="#" className="hover:text-white">
              <FaTwitter size={20} />
            </a>
            <a href="#" className="hover:text-white">
              <FaLinkedin size={20} />
            </a>
            <a href="#" className="hover:text-white">
              <FaInstagram size={20} />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold text-white">Quick Links</h3>
          <ul className="mt-3 space-y-2">
            <li>
              <Link to="/" className="hover:text-white">
                Home
              </Link>
            </li>
            <li>
              <Link to="/courses" className="hover:text-white">
                Courses
              </Link>
            </li>
            <li>
              <Link to="/jobs" className="hover:text-white">
                Jobs
              </Link>
            </li>
          </ul>
        </div>

        {/* Resources */}
        <div>
          <h3 className="text-lg font-semibold text-white">Resources</h3>
          <ul className="mt-3 space-y-2">
            <li>
              <Link to="/about" className="hover:text-white">
                About Us
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-white">
                Contact
              </Link>
            </li>
            <li>
              <Link to="/support" className="hover:text-white">
                Support
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="mt-8 border-t border-indigo-700 pt-4 text-center text-sm text-gray-400">
        © {new Date().getFullYear()} EduManagement. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
