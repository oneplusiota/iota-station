"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMoon,
  faSun,
  faBars,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import { useTheme } from "next-themes";
import CustomThemeProvider from "../context/ThemeProvider";

const Navbar: React.FC = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  // When mounted on client, now we can show the UI

  const handleMobileMenuToggle = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };
  return (
    <CustomThemeProvider>
      <nav
        className={`py-4 dark:bg-slate-600 bg-gray-200 flex justify-center items-center px-6 md:px-10 sticky top-0`}
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
            <ul className="flex space-x-16">
              <li>
                <Link
                  href="/"
                  className={`text-lg text-gray-600 dark:text-white`}
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/blogs"
                  className={`text-lg text-gray-600 dark:text-white`}
                >
                  Blog
                </Link>
              </li>
            </ul>
          </div>
          <div className="hidden md:flex items-center justify-center">
            <button
              onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            >
              <FontAwesomeIcon
                icon={theme == "light" ? faMoon : faSun}
                className={`text-xl text-gray-600 dark:text-white`}
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
              className={`md:hidden dark:bg-slate-600 bg-gray-200 absolute dark:bg- top-full left-0 right-0 text-black py-2`}
            >
              <ul className="flex flex-col items-center space-y-4">
                <li>
                  <div className="flex items-center justify-center">
                    <button
                      className="toggle-button"
                      onClick={() =>
                        setTheme(theme === "light" ? "dark" : "light")
                      }
                    >
                      <FontAwesomeIcon icon={faMoon} className={`text-xl`} />
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
              </ul>
            </div>
          )}
        </div>
      </nav>
    </CustomThemeProvider>
  );
};

export default Navbar;
