"use client";
import React, { ReactElement, useEffect, useState } from "react";
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

type Props = {
  clickAway: boolean;
  setClickAway: React.Dispatch<React.SetStateAction<boolean>>;
  isMobileMenuOpen: boolean;
  setMobileMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const Navbar = ({
  clickAway,
  setClickAway,
  isMobileMenuOpen,
  setMobileMenuOpen,
}: Props): ReactElement => {
  const { theme, setTheme } = useTheme();

  // When mounted on client, now we can show the UI

  const handleMobileMenuToggle = () => {
    if (isMobileMenuOpen) {
      setClickAway(false);
    } else {
      setClickAway(true);
    }
    setMobileMenuOpen((prev) => !prev);
  };

  return (
    <nav className={`py-4 flex justify-center items-center px-6 md:px-10`}>
      <div className="container flex flex-col items-center justify-between">
        <div className="container flex flex-row items-center justify-between">
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
                <Link href="/" className={`text-lg`}>
                  Home
                </Link>
              </li>
              <li>
                <Link href="/blogs" className={`text-lg`}>
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
            <button onClick={handleMobileMenuToggle}>
              <FontAwesomeIcon
                icon={clickAway && isMobileMenuOpen ? faTimes : faBars}
                className={`text-xl transition-transform ease-in-out delay-100`}
              />
            </button>
          </div>
        </div>
        {clickAway && isMobileMenuOpen && (
          <div className={`py-2 bg-transparent backdrop-blur`}>
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
                  className="text-lg font-bold"
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
  );
};

export default Navbar;
