import React from "react";
import { assets } from "../assets/assets";

// Steps Component
export const Steps = () => {
  return (
    <div className="mx-4 lg:mx-44 py-20 xl:py-40 bg-white dark:bg-gray-900 transition-colors duration-300">
      <div className="text-center mb-16 xl:mb-24">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-violet-600 via-purple-600 to-blue-600 dark:from-violet-400 dark:via-purple-400 dark:to-blue-400 bg-clip-text text-transparent leading-tight">
          Remove Background in
          <span className="block mt-2">Three Simple Steps</span>
        </h1>
        <p className="mt-6 text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Transform your images with AI-powered precision in seconds
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {/* Step 1 */}
        <div className="group relative bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-8 shadow-lg hover:shadow-2xl dark:shadow-gray-900/50 transition-all duration-500 hover:-translate-y-2 backdrop-blur-sm">
          <div className="absolute inset-0 bg-gradient-to-r from-violet-500/10 to-purple-500/10 dark:from-violet-400/20 dark:to-purple-400/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

          <div className="relative z-10">
            <div className="w-16 h-16 bg-gradient-to-r from-violet-500 to-purple-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
              <svg
                className="w-8 h-8 black"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                />
              </svg>
            </div>

            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
              Upload Image
            </h3>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              Simply drag and drop or click to upload your image. We support all
              major formats including JPG, PNG, and WebP.
            </p>

            <div className="mt-6 flex items-center text-sm text-violet-600 dark:text-violet-400 font-medium">
              <span className="w-6 h-6 bg-violet-100 dark:bg-violet-900/50 rounded-full flex items-center justify-center mr-2 text-xs">
                1
              </span>
              Start here
            </div>
          </div>
        </div>

        {/* Step 2 */}
        <div className="group relative bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-8 shadow-lg hover:shadow-2xl dark:shadow-gray-900/50 transition-all duration-500 hover:-translate-y-2 backdrop-blur-sm">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 dark:from-purple-400/20 dark:to-pink-400/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

          <div className="relative z-10">
            <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
              <svg
                className="w-8 h-8 black"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
                />
              </svg>
            </div>

            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
              AI Processing
            </h3>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              Our advanced AI automatically detects and removes the background
              with pixel-perfect accuracy in just seconds.
            </p>

            <div className="mt-6 flex items-center text-sm text-purple-600 dark:text-purple-400 font-medium">
              <span className="w-6 h-6 bg-purple-100 dark:bg-purple-900/50 rounded-full flex items-center justify-center mr-2 text-xs">
                2
              </span>
              Magic happens
            </div>
          </div>
        </div>

        {/* Step 3 */}
        <div className="group relative bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-8 shadow-lg hover:shadow-2xl dark:shadow-gray-900/50 transition-all duration-500 hover:-translate-y-2 backdrop-blur-sm">
          <div className="absolute inset-0 bg-gradient-to-r from-pink-500/10 to-rose-500/10 dark:from-pink-400/20 dark:to-rose-400/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

          <div className="relative z-10">
            <div className="w-16 h-16 bg-gradient-to-r from-pink-500 to-rose-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
              <svg
                className="w-8 h-8 black"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
            </div>

            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
              Download Result
            </h3>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              Download your processed image instantly in high quality PNG format
              with transparent background.
            </p>

            <div className="mt-6 flex items-center text-sm text-pink-600 dark:text-pink-400 font-medium">
              <span className="w-6 h-6 bg-pink-100 dark:bg-pink-900/50 rounded-full flex items-center justify-center mr-2 text-xs">
                3
              </span>
              You're done!
            </div>
          </div>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-violet-300/20 dark:bg-violet-600/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-pink-300/20 dark:bg-pink-600/10 rounded-full blur-3xl"></div>
      </div>
    </div>
  );
};
