// BgSlider Component
import React, { useState } from "react";
import { assets } from "../assets/assets";

export const BgSlider = () => {
  const [sliderPos, setSliderPos] = useState(70);
  const [isHovering, setIsHovering] = useState(false);
  
  const handlerSlider = (e) => {
    setSliderPos(e.target.value);
  };

  return (
    <div className="pb-20 md:py-32 mx-4 lg:mx-8 bg-gradient-to-br from-gray-50 via-white to-violet-50/30 dark:from-gray-900 dark:via-gray-900 dark:to-violet-950/20 transition-colors duration-300">
      
      {/* Header Section */}
      <div className="text-center mb-16 md:mb-24 max-w-4xl mx-auto">
        <div className="inline-flex items-center gap-2 bg-violet-100 dark:bg-violet-900/30 text-violet-700 dark:text-violet-300 px-4 py-2 rounded-full text-sm font-medium mb-6 backdrop-blur-sm border border-violet-200 dark:border-violet-800">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
          <span>AI-Powered Technology</span>
        </div>
        
        <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-violet-600 via-purple-600 to-blue-600 dark:from-violet-400 dark:via-purple-400 dark:to-blue-400 bg-clip-text text-transparent leading-tight mb-6">
          Pixel-Perfect Background
          <span className="block">Removal</span>
        </h1>
        
        <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
          Experience the power of AI with professional-grade accuracy. 
          <span className="font-semibold text-gray-800 dark:text-gray-200">Drag the slider</span> to see the magic happen.
        </p>
      </div>

      {/* Interactive Slider Section */}
      <div className="max-w-5xl mx-auto">
        <div 
          className="relative group"
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          
          {/* Main Container with Glass Effect */}
          <div className="relative bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-3xl p-6 md:p-8 shadow-2xl dark:shadow-gray-900/50 border border-white/20 dark:border-gray-700/30 overflow-hidden">
            
            {/* Decorative Background */}
            <div className="absolute inset-0 bg-gradient-to-r from-violet-500/5 via-purple-500/5 to-pink-500/5 dark:from-violet-400/10 dark:via-purple-400/10 dark:to-pink-400/10"></div>
            
            {/* Image Container */}
            <div className="relative w-full max-w-4xl mx-auto overflow-hidden rounded-2xl shadow-xl">
              
              {/* Before/After Labels */}
              <div className="absolute top-4 left-4 z-20">
                <div className="bg-black/70 dark:bg-black/80 text-white px-3 py-1 rounded-full text-sm font-medium backdrop-blur-sm">
                  Original
                </div>
              </div>
              
              <div className="absolute top-4 right-4 z-20">
                <div className="bg-black/70 dark:bg-black/80 text-white px-3 py-1 rounded-full text-sm font-medium backdrop-blur-sm">
                  AI Processed
                </div>
              </div>
              
              {/* Progress Indicator */}
              <div className="absolute bottom-4 left-4 z-20">
                <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm px-3 py-2 rounded-lg shadow-lg border border-white/20 dark:border-gray-700/30">
                  <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">Processing</div>
                  <div className="text-lg font-bold text-gray-900 dark:text-white">
                    {Math.round(sliderPos)}%
                  </div>
                </div>
              </div>

              {/* Images */}
              <img 
                src={assets.image_w_bg} 
                style={{clipPath:`inset(0 ${100.2-sliderPos}% 0 0)`}} 
                alt="Original image with background"
                className="w-full h-auto transition-all duration-300 ease-out"
              />
              
              <img 
                className="absolute top-0 left-0 w-full h-full transition-all duration-300 ease-out" 
                src={assets.image_wo_bg} 
                style={{clipPath:`inset(0 0 0 ${sliderPos}%)`}} 
                alt="Processed image without background"
              />

              {/* Divider Line */}
              <div 
                className="absolute top-0 bottom-0 w-1 bg-gradient-to-b from-violet-500 via-purple-500 to-pink-500 shadow-lg z-10 transition-all duration-300"
                style={{left: `${sliderPos}%`, transform: 'translateX(-50%)'}}
              >
                {/* Glow effect */}
                <div className="absolute inset-0 bg-white/50 dark:bg-white/30 blur-sm"></div>
              </div>

              {/* Slider Input */}
              <input 
                className="modern-slider absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full z-20 cursor-grab active:cursor-grabbing"
                type="range" 
                min={0} 
                max={100} 
                value={sliderPos} 
                onChange={handlerSlider}
                style={{background: 'transparent'}}
              />

              {/* Slider Handle */}
              <div 
                className={`absolute top-1/2 transform -translate-y-1/2 -translate-x-1/2 z-30 pointer-events-none transition-all duration-300 ${isHovering ? 'scale-110' : 'scale-100'}`}
                style={{left: `${sliderPos}%`}}
              >
                <div className="relative">
                  {/* Handle Shadow */}
                  <div className="absolute inset-0 bg-black/20 dark:bg-black/40 rounded-full blur-lg transform translate-y-1"></div>
                  
                  {/* Main Handle */}
                  <div className="w-12 h-12 bg-white dark:bg-gray-800 rounded-full shadow-2xl border-4 border-violet-500 dark:border-violet-400 flex items-center justify-center group-hover:border-purple-500 transition-colors duration-300">
                    <div className="w-6 h-6 bg-gradient-to-r from-violet-500 to-purple-500 dark:from-violet-400 dark:to-purple-400 rounded-full flex items-center justify-center">
                      <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
                      </svg>
                    </div>
                  </div>
                  
                  {/* Pulse Effect */}
                  <div className="absolute inset-0 bg-violet-500/30 dark:bg-violet-400/30 rounded-full animate-ping"></div>
                </div>
              </div>
            </div>

            {/* Instructions */}
            <div className="mt-8 text-center">
              <div className="inline-flex items-center gap-3 bg-gray-100 dark:bg-gray-700/50 px-6 py-3 rounded-2xl backdrop-blur-sm border border-gray-200 dark:border-gray-600">
                <div className="w-8 h-8 bg-gradient-to-r from-violet-500 to-purple-500 rounded-full flex items-center justify-center animate-pulse">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
                  </svg>
                </div>
                <span className="text-gray-700 dark:text-gray-300 font-medium">
                  Drag the slider to compare before and after
                </span>
              </div>
            </div>
          </div>

          {/* Floating Stats */}
          <div className="absolute -top-6 -right-6 bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-xl border border-gray-200 dark:border-gray-700 hidden lg:block">
            <div className="text-center">
              <div className="text-2xl font-bold text-violet-600 dark:text-violet-400">99.9%</div>
              <div className="text-xs text-gray-500 dark:text-gray-400">Accuracy</div>
            </div>
          </div>

          <div className="absolute -bottom-6 -left-6 bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-xl border border-gray-200 dark:border-gray-700 hidden lg:block">
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">&lt;3s</div>
              <div className="text-xs text-gray-500 dark:text-gray-400">Processing</div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="text-center mt-16">
        <button className="group inline-flex items-center gap-3 bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 text-white px-8 py-4 rounded-2xl font-semibold text-lg shadow-lg hover:shadow-2xl dark:shadow-purple-900/25 transform hover:scale-105 active:scale-95 transition-all duration-300">
          <span>Try It Now</span>
          <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </button>
      </div>
    </div>
  );
};