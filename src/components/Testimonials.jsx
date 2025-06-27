import React from "react";
import { testimonialsData } from "../assets/assets.jsx";

export const Testimonials = () => {
  return (
    <div className="text-center mb-16 xl:mb-24">
      <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-violet-600 via-purple-600 to-blue-600 dark:from-violet-400 dark:via-purple-400 dark:to-blue-400 bg-clip-text text-transparent leading-tight">
        Customer Reviews
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto px-4 py-12">
  {testimonialsData.map((item, indx) => {
    return (
      <div key={indx} className="group relative bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-xl border border-gray-100 dark:border-gray-700 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 overflow-hidden">
        {/* Gradient background overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-violet-50/50 to-purple-50/50 dark:from-violet-900/10 dark:to-purple-900/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        
        <div className="relative z-10">
          {/* Quote icon */}
          <div className="w-12 h-12 bg-gradient-to-r from-violet-500 to-purple-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
            <svg
              className="w-6 h-6 text-white"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h4v10h-10z"/>
            </svg>
          </div>

          {/* Testimonial text */}
          <p className="text-gray-800 dark:text-gray-100 text-lg leading-relaxed mb-8 font-medium">
            {item.text}
          </p>

          {/* Author section */}
          <div className="flex items-center space-x-4">
            <div className="relative">
              <img 
                src={item.image} 
                alt={item.author}
                className="w-14 h-14 rounded-2xl object-cover border-2 border-violet-100 dark:border-violet-800 group-hover:border-violet-300 dark:group-hover:border-violet-600 transition-colors duration-300"
              />
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-violet-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
            <div>
              <p className="font-bold text-gray-900 dark:text-white text-lg">
                {item.author}
              </p>
              <p className="text-violet-600 dark:text-violet-400 font-medium">
                {item.jobTitle}
              </p>
            </div>
          </div>

          {/* Bottom accent */}
          <div className="mt-6 flex items-center text-sm text-violet-600 dark:text-violet-400 font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <span className="w-2 h-2 bg-gradient-to-r from-violet-500 to-purple-500 rounded-full mr-2"></span>
            Verified review
          </div>
        </div>
      </div>
    );
  })}
</div>
    </div>
  );
};
