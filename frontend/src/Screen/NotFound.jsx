import React from "react";

export default function NotFound() {
  return (
    <>
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <div className="text-center">
          <h1 className="text-6xl font-bold text-red-600">404</h1>
          <p className="mt-4 text-lg text-gray-700">
            Oops! The page you're looking for doesn't exist.
          </p>
          <a
            href="/"
            className="mt-6 inline-block px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300"
          >
            Go Back to Home
          </a>
        </div>
      </div>
    </>
  );
}
