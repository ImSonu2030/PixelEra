import React from 'react'
import { assets } from '../assets/assets'

export const Footer = () => {
  return (
    <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 transition-colors duration-300 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-8 sm:py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
            
            {/* Logo Section */}
            <div className="flex justify-center md:justify-start">
              <a href="/" className="group">
                <img 
                  className="w-7 sm:w-7 md:w-8 lg:w-9 xl:w-10 transition-all duration-300 group-hover:scale-110" 
                  src={assets.main_logo}
                  alt="Company Logo" 
                />
              </a>
            </div>

            {/* Copyright Section */}
            <div className="text-center">
              <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 leading-relaxed">
                Copyright © 2025{' '}
                <a 
                  href="https://github.com/imsonu2030" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 font-medium transition-colors duration-300 hover:underline"
                >
                  @Imsonu2030
                </a>
                <br className="sm:hidden" />
                <span className="hidden sm:inline"> | </span>
                All rights reserved
              </p>
            </div>

            {/* Social Media Section */}
            <div className="flex justify-center md:justify-end">
              <div className="flex items-center space-x-4 sm:space-x-6">
                <a 
                  href="#" 
                  className="group p-2 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-purple-100 dark:hover:bg-purple-900/30 transition-all duration-300 hover:scale-110"
                  aria-label="Facebook"
                >
                  <svg className="w-5 h-5 sm:w-6 sm:h-6 text-gray-600 dark:text-gray-300 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors duration-300" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>
                
                <a 
                  href="#" 
                  className="group p-2 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-purple-100 dark:hover:bg-purple-900/30 transition-all duration-300 hover:scale-110"
                  aria-label="Twitter"
                >
                  <svg className="w-5 h-5 sm:w-6 sm:h-6 text-gray-600 dark:text-gray-300 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors duration-300" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                  </svg>
                </a>
                
                <a 
                  href="#" 
                  className="group p-2 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-purple-100 dark:hover:bg-purple-900/30 transition-all duration-300 hover:scale-110"
                  aria-label="YouTube"
                >
                  <svg className="w-5 h-5 sm:w-6 sm:h-6 text-gray-600 dark:text-gray-300 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors duration-300" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Border */}
        <div className="border-t border-gray-200 dark:border-gray-700 py-4">
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-2 sm:space-y-0">
            <div className="flex items-center space-x-6">
            <a href="/buy" className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors duration-300">
                Buy Credit
              </a>
              <a href="/result" className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors duration-300">
                Results
              </a>
              <a href="/privacy" className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors duration-300">
                Privacy Policy
              </a>
              <a href="/terms" className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors duration-300">
                Terms of Service
              </a>
              <a href="/contact" className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors duration-300">
                Contact
              </a>
            </div>
            
          </div>
        </div>
      </div>
    </footer>
  );
};
