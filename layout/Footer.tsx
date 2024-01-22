"use client";

import React, { useState } from "react";
import { ContentContainer } from "./ContentContainer";

const Footer: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = () => {
    setIsDarkMode((prevMode) => !prevMode);
    console.log(isDarkMode);
    console.log("clicked");
  };

  return (
    <footer
      className={`bg-gray-900 ${
        isDarkMode ? "text-white" : "text-gray-400"
      } mt-auto`}
    >
      <ContentContainer className="flex justify-between">
        <div className="w-full px-4 py-8 flex flex-col sm:flex-row items-center justify-between">
          <div className="mb-4 sm:mb-0 text-sm md:text-base">
            <div className="flex flex-col justify-between">
              <div className="flex items-center gap-2">
                <img src="/favicon.ico" alt="YAnime" className="w-10 h-10" />
                <h3 className="text-lg font-bold">YourAnime</h3>
              </div>
              <p className="mt-2">
                Discover new anime and track your progress.
              </p>
            </div>
          </div>
          {/* <div className="flex items-center">
            <button
              className={`mr-4 focus:outline-none transition duration-300 ${
                isDarkMode ? "text-gray-400" : "text-white"
              }`}
              onClick={toggleTheme}
            >
              Dark Mode
            </button>
            <div
              className={`w-10 h-6 flex items-center justify-between rounded-full bg-gray-400 ${
                isDarkMode ? "bg-indigo-600" : "bg-white"
              }`}
            >
              <div
                className={`w-4 h-4 rounded-full bg-white shadow transform ${
                  isDarkMode ? "translate-x-4" : "translate-x-0"
                } transition duration-300`}
              ></div>
            </div>
          </div> */}
          <div className="mt-auto">
            <h6 className="text-sm md:text-base">
              ⓒ 2024 Engineered by Jett Dembin
            </h6>
          </div>
        </div>
      </ContentContainer>
    </footer>
  );
};

export default Footer;
