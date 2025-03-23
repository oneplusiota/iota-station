import React from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub, faLinkedin, faTwitter } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import personalInfo from "../config/personal-info";

function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="w-full py-8">
      <div className="container mx-auto max-w-6xl px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <Link href="/" className="text-xl font-bold text-indigo-600 dark:text-indigo-400">
              {personalInfo.name}
            </Link>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              {personalInfo.title}
            </p>
          </div>
          
          <div className="flex flex-col items-center md:items-end">
            <div className="flex space-x-4 mb-4">
              <a 
                href={personalInfo.social.github}
                target="_blank" 
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="text-gray-600 hover:text-indigo-600 dark:text-gray-400 dark:hover:text-indigo-400 transition-colors duration-300"
              >
                <FontAwesomeIcon icon={faGithub} className="text-xl" />
              </a>
              <a 
                href={personalInfo.social.linkedin}
                target="_blank" 
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="text-gray-600 hover:text-indigo-600 dark:text-gray-400 dark:hover:text-indigo-400 transition-colors duration-300"
              >
                <FontAwesomeIcon icon={faLinkedin} className="text-xl" />
              </a>
              <a 
                href={personalInfo.social.twitter}
                target="_blank" 
                rel="noopener noreferrer"
                aria-label="Twitter"
                className="text-gray-600 hover:text-indigo-600 dark:text-gray-400 dark:hover:text-indigo-400 transition-colors duration-300"
              >
                <FontAwesomeIcon icon={faTwitter} className="text-xl" />
              </a>
              <a 
                href={`mailto:${personalInfo.contact.email}`}
                aria-label="Email"
                className="text-gray-600 hover:text-indigo-600 dark:text-gray-400 dark:hover:text-indigo-400 transition-colors duration-300"
              >
                <FontAwesomeIcon icon={faEnvelope} className="text-xl" />
              </a>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              © {currentYear} {personalInfo.name}. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
