"use client";
import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload } from "@fortawesome/free-solid-svg-icons";
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import personalInfo from "../config/personal-info";

function HeroSection() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="flex flex-col justify-center items-center h-full relative">
      <div className={`transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
        <h1 className="text-5xl md:text-6xl font-bold text-center mb-4 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
          {personalInfo.name}
        </h1>
        <p className="text-xl md:text-2xl text-center mb-8 text-gray-700 dark:text-gray-300">
          {personalInfo.title}
        </p>
        
        <div className="flex justify-center items-center gap-4 mb-12">
          <a
            className="flex justify-center items-center px-6 py-3 rounded-full bg-indigo-600 text-white hover:bg-indigo-700 transition ease-in duration-300 shadow-md"
            href={personalInfo.resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Download Resume"
          >
            <FontAwesomeIcon icon={faDownload} className="mr-2" />
            <span>Resume</span>
          </a>
          
          <a 
            href={personalInfo.social.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub Profile"
            className="flex justify-center items-center w-14 h-14 rounded-full bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors duration-300 shadow-md"
          >
            <FontAwesomeIcon icon={faGithub} className="text-2xl" />
          </a>
          
          <a 
            href={personalInfo.social.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn Profile"
            className="flex justify-center items-center w-14 h-14 rounded-full bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors duration-300 shadow-md"
          >
            <FontAwesomeIcon icon={faLinkedin} className="text-2xl" />
          </a>
        </div>
      </div>
    </div>
  );
}

export default HeroSection;
