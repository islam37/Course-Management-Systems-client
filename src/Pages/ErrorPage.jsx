import React from "react";
import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-900 via-purple-900 to-black text-white">
      <div className="text-center px-6">
        {/* 404 Big Text */}
        <h1 className="text-9xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-pink-400 to-indigo-400">
          404
        </h1>

        {/* Subtitle */}
        <p className="mt-4 text-2xl font-semibold text-gray-200">
          Oops! The page you’re looking for doesn’t exist.
        </p>
        <p className="mt-2 text-gray-400">
          It might have been moved or deleted. Don’t worry, you can head back.
        </p>

        {/* Illustration (optional) */}
        <div className="mt-8">
          <img
            src="https://illustrations.popsy.co/gray/error-404.svg"
            alt="404 illustration"
            className="mx-auto w-72 opacity-80"
          />
        </div>

        {/* Action Button */}
        <div className="mt-8">
          <Link
            to="/"
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-pink-500 hover:from-indigo-700 hover:to-pink-600 shadow-lg transition transform hover:scale-105 font-semibold"
          >
            ⬅ Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
