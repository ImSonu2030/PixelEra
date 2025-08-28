import React, { useState, useEffect, useContext } from "react";

import { Link } from "react-router-dom";
import { assets } from "../assets/assets.jsx";
import { AppContext } from "../context/AppContext.jsx";
import { useClerk, UserButton, useUser } from "@clerk/clerk-react";

export const Navbar = () => {
  const [isDark, setIsDark] = useState(false);
  const { openSignIn } = useClerk();
  const { isSignedIn, user } = useUser();
  const { credit, loadCreditData } = useContext(AppContext);

  // load credit of user when he's signed in
  useEffect(() => {
    if (isSignedIn) {
      loadCreditData();
      console.log("my credit balance: " + credit);
    }
  }, [isSignedIn]);

  // Check for saved theme preference or default to light mode
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      setIsDark(true);
      document.documentElement.classList.add("dark");
    } else {
      setIsDark(false);
      document.documentElement.classList.remove("dark");
    }
  }, []);

  // Toggle dark mode
  const toggleDarkMode = () => {
    const newDarkMode = !isDark;
    setIsDark(newDarkMode);

    if (newDarkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  return (
    <div className="flex items-center justify-between mx-4 py-3 lg:mx-44 bg-slate-50 dark:bg-gray-900 transition-colors duration-300">
      <Link to="/">
        <img
          className="w-10 sm:w-10 md:w-11 lg:w-13 xl:w-15 transition-all duration-300"
          src={assets.main_logo}
          alt=""
        />
      </Link>

      <div className="flex items-center gap-4">
        {/* Dark Mode Toggle Button */}
        <button
          onClick={toggleDarkMode}
          className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors duration-300"
          aria-label="Toggle dark mode"
        >
          {isDark ? (
            // Sun icon for light mode
            <svg
              className="w-5 h-5 text-amber-50"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                clipRule="evenodd"
              />
            </svg>
          ) : (
            // Moon icon for dark mode
            <svg
              className="w-5 h-5 text-gray-700"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
            </svg>
          )}
        </button>

        {/* Sign Up Button */}
        {isSignedIn ? (
          <div className="flex items-center gap-3 text-zinc-900 dark:text-zinc-100 ">
            <button
              className="flex items-center gap-2 
             bg-cyan-200 dark:bg-zinc-800/60 
             border border-zinc-700/20 dark:border-zinc-700/40
             font-medium px-2 sm:px-3 py-1 sm:py-1.5 
             rounded-xl
             hover:bg-white/20 dark:hover:bg-zinc-700/70 
             transition-all duration-300"
            >
              <img
                src={assets.credit_icon}
                alt="credit balance"
                width={22}
                height={22}
              />
              <p className="text-sm sm:text-base">{credit}</p>
            </button>
            
            <p className="hidden sm:block">Hi, {user.fullName}</p>
            <UserButton />
          </div>
        ) : (
          <button
            onClick={() => openSignIn({})}
            className="bg-zinc-800 dark:bg-zinc-200 text-white dark:text-gray-900 px-4 py-2 sm:px-7 sm:py-2.5 text-sm rounded-2xl transition-all duration-300 hover:bg-zinc-700 dark:hover:bg-zinc-300"
          >
            Sign Up
          </button>
        )}
      </div>
    </div>
  );
};
