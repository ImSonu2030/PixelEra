import React, { useContext } from "react";
import { assets } from "../assets/assets.jsx";
import { AppContext } from "../context/AppContext.jsx";

export const Result = () => {
  const { image, outputImg } = useContext(AppContext);
  return (
    <div className="px-4 py-6 sm:px-6 md:px-12 lg:px-20 xl:px-44 min-h-[75vh]">
      <div className="bg-white dark:bg-gray-900 transition-colors duration-300">
        {/* Image container */}
        <div className="flex flex-col lg:grid lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
          {/* Left side - Original Image */}
          <div className="w-full">
            <h3 className="font-semibold text-sm sm:text-base text-gray-600 dark:text-gray-300 mb-2 sm:mb-3">
              Original
            </h3>
            <div className="w-full aspect-square sm:aspect-auto lg:h-full rounded-md border border-gray-300 dark:border-gray-600 relative overflow-hidden bg-gray-50 dark:bg-gray-800 min-h-[200px] sm:min-h-[250px] lg:min-h-0">
              <img
                className="w-full h-full object-cover rounded-md border border-gray-200 dark:border-gray-700"
                src={image ? URL.createObjectURL(image) : null}
                alt="Original image"
              />
            </div>
          </div>

          {/* Right side - Processed Image */}
          <div className="w-full">
            <h3 className="font-semibold text-sm sm:text-base text-gray-600 dark:text-gray-300 mb-2 sm:mb-3">
              Background removed
            </h3>
            <div className="w-full aspect-square sm:aspect-auto lg:h-full rounded-md border border-gray-300 dark:border-gray-600 relative overflow-hidden bg-gray-50 dark:bg-gray-800 min-h-[200px] sm:min-h-[250px] lg:min-h-0">
              {/* Loading spinner */}
              {outputImg ? (
                <img
                  className="w-full h-full object-cover rounded-md border border-gray-200 dark:border-gray-700"
                  src={outputImg}
                  alt=""
                />
              ) : (
                image && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="flex flex-col items-center gap-3">
                      <span className="border-4 border-violet-600 dark:border-violet-400 rounded-full h-10 w-10 sm:h-12 sm:w-12 border-t-transparent dark:border-t-transparent animate-spin"></span>
                      <span className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                        Processing...
                      </span>
                    </div>
                  </div>
                )
              )}
            </div>
          </div>

          {/* Action buttons */}
          {outputImg && (
            <div className="flex flex-col sm:flex-row justify-center lg:justify-end items-center gap-3 sm:gap-4 mt-4 sm:mt-6 lg:col-span-2">
              <button className="w-full sm:w-auto px-4 sm:px-6 py-2.5 sm:py-2 text-sm sm:text-base bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-md hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200 font-medium">
                Try another image
              </button>
              <a
                href={outputImg} download={true}
                className="w-full sm:w-auto px-4 sm:px-6 py-2.5 sm:py-2 text-sm sm:text-base bg-violet-600 dark:bg-violet-500 text-white rounded-md hover:bg-violet-700 dark:hover:bg-violet-600 transition-colors duration-200 no-underline text-center font-medium"
              >
                Download image
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
