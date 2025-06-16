import React from "react";
import { assets } from "../assets/assets";

export const Header = () => {
    return (
      <section className="relative min-h-screen flex items-center bg-gradient-to-br from-gray-50 via-white to-violet-50/30 dark:from-gray-900 dark:via-gray-900 dark:to-violet-950/30 transition-colors duration-300">
        
        {/* Background decorative elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-96 h-96 bg-gradient-to-r from-violet-400/20 to-purple-400/20 dark:from-violet-600/10 dark:to-purple-600/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-r from-pink-400/20 to-rose-400/20 dark:from-pink-600/10 dark:to-rose-600/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>
  
        <div className="relative z-10 flex flex-col-reverse lg:flex-row items-center justify-between gap-y-16 px-4 lg:px-44 py-20 w-full">
          
          {/* Left Content */}
          <div className="flex-1 text-center lg:text-left space-y-8 animate-fade-in-up max-w-2xl">
            <div className="space-y-6">
              <h1 className="text-4xl sm:text-5xl xl:text-6xl 2xl:text-7xl font-bold leading-tight">
                <span className="text-gray-900 dark:text-white">Remove the</span>
                <br />
                <span className="bg-gradient-to-r from-violet-600 via-purple-600 to-pink-600 dark:from-violet-400 dark:via-purple-400 dark:to-pink-400 bg-clip-text text-transparent">
                  background
                </span>
                <br />
                <span className="text-gray-900 dark:text-white">instantly</span>
              </h1>
  
              <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 leading-relaxed max-w-xl">
                Transform your images with AI-powered precision. 
                <span className="font-medium text-gray-800 dark:text-gray-200">No design skills required</span> — 
                just upload, process, and download in seconds.
              </p>
            </div>
  
            {/* CTA Section */}
            <div className="space-y-6">
              <div>
                <input type="file" id="upload1" hidden accept="image/*" />
                <label
                  htmlFor="upload1"
                  className="group inline-flex items-center gap-4 px-8 py-4 bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 text-white font-semibold text-lg rounded-2xl cursor-pointer shadow-lg hover:shadow-2xl dark:shadow-purple-900/25 transform hover:scale-105 active:scale-95 transition-all duration-300"
                >
                  <div className="w-6 h-6 bg-white/20 rounded-lg flex items-center justify-center group-hover:rotate-12 transition-transform duration-300">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                    </svg>
                  </div>
                  <span>Upload Your Image</span>
                </label>
              </div>
  
              {/* Features list */}
              <div className="flex flex-wrap gap-4 text-sm text-gray-600 dark:text-gray-400">
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 bg-green-100 dark:bg-green-900/50 rounded-full flex items-center justify-center">
                    <svg className="w-3 h-3 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span>100% Free</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 bg-blue-100 dark:bg-blue-900/50 rounded-full flex items-center justify-center">
                    <svg className="w-3 h-3 text-blue-600 dark:text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span>AI-Powered</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 bg-purple-100 dark:bg-purple-900/50 rounded-full flex items-center justify-center">
                    <svg className="w-3 h-3 text-purple-600 dark:text-purple-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span>Instant Results</span>
                </div>
              </div>
            </div>
          </div>
  
          {/* Right Image */}
          <div className="flex-1 max-w-lg lg:max-w-xl relative">
            <div className="relative group">
              {/* Decorative background */}
              <div className="absolute inset-0 bg-gradient-to-r from-violet-500/20 to-purple-500/20 dark:from-violet-600/30 dark:to-purple-600/30 rounded-3xl blur-2xl group-hover:blur-3xl transition-all duration-500 transform group-hover:scale-110"></div>
              
              {/* Main image container */}
              <div className="relative bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-3xl p-4 shadow-2xl dark:shadow-gray-900/50 group-hover:shadow-3xl transition-all duration-500 border border-white/20 dark:border-gray-700/50">
                <img
                  src={assets.header_img}
                  alt="AI Background Removal Preview"
                  className="w-full h-auto rounded-2xl object-cover group-hover:scale-105 transition-transform duration-500"
                />
                
                {/* Floating elements */}
                <div className="absolute -top-4 -right-4 w-16 h-16 bg-gradient-to-r from-violet-500 to-purple-500 rounded-2xl flex items-center justify-center shadow-lg animate-bounce">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  };