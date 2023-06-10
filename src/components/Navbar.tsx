"use client";
import React, { useState } from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMoon,
  faSun,
  faBars,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import { useTheme } from "next-themes";

const Navbar: React.FC = () => {
  const { theme, setTheme } = useTheme();

  // When mounted on client, now we can show the UI
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleMobileMenuToggle = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };
  return (
    <nav
      className={`py-4 bg-white dark:bg-slate-600 dark:text-white flex justify-center items-center px-6 md:px-10 sticky top-0`}
    >
      <div className="container flex items-center justify-between">
        <div>
          <Link
            href="/"
            className={`text-lg font-bold text-black dark:text-white`}
          >
            Nayak
          </Link>
        </div>
        <div className="hidden md:flex items-center justify-center">
          <ul className="flex space-x-4">
            <li>
              <Link href="/" className={`text-black`}>
                Home
              </Link>
            </li>
            <li>
              <Link href="/blogs" className={`text-black`}>
                Blog
              </Link>
            </li>
            {/* Add more nav links here */}
          </ul>
        </div>
        <div className="hidden md:flex items-center justify-center">
          <button
            onClick={() => setTheme(theme == "light" ? "dark" : "light")}
            className="toggle-button"
          >
            <FontAwesomeIcon
              icon={theme == "light" ? faMoon : faSun}
              className={`text-xl text-gray-600`}
            />
          </button>
        </div>
        <div className="flex items-center justify-center md:hidden">
          <button className="toggle-button" onClick={handleMobileMenuToggle}>
            <FontAwesomeIcon
              icon={isMobileMenuOpen ? faTimes : faBars}
              className={`text-xl text-black transition-transform ease-in-out delay-100`}
            />
          </button>
        </div>
        {isMobileMenuOpen && (
          <div
            className={`md:hidden absolute top-full left-0 right-0 bg-white text-black py-2`}
          >
            <ul className="flex flex-col items-center space-y-4">
              <li>
                <div className="flex items-center justify-center">
                  <button className="toggle-button">
                    <FontAwesomeIcon
                      icon={faMoon}
                      className={`text-xl text-gray-600`}
                    />
                  </button>
                </div>
              </li>
              <li>
                <Link
                  href="/"
                  className="text-lg font-bold"
                  onClick={handleMobileMenuToggle}
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/blogs"
                  className="text-lg"
                  onClick={handleMobileMenuToggle}
                >
                  Blog
                </Link>
              </li>

              {/* Add more nav links here */}
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
