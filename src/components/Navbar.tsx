"use client";
import React, { ReactElement, useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMoon,
  faSun,
  faBars,
  faTimes,
  faHome,
  faUser,
  faCode,
  faLaptopCode,
  faNewspaper
} from "@fortawesome/free-solid-svg-icons";
import { useTheme } from "next-themes";
import personalInfo from "../config/personal-info";

type Props = {
  clickAway: boolean;
  setClickAway: React.Dispatch<React.SetStateAction<boolean>>;
  isMobileMenuOpen: boolean;
  setMobileMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

type NavItemProps = {
  href: string;
  icon: any;
  label: string;
  isActive: boolean;
  onClick?: () => void;
};

const NavItem = ({ href, icon, label, isActive, onClick }: NavItemProps) => (
  <Link 
    href={href} 
    className="group relative"
    onClick={onClick}
    prefetch={true}
  >
    <div className={`
      flex justify-center items-center w-12 h-12 rounded-full 
      ${isActive 
        ? 'bg-indigo-600 text-white' 
        : 'bg-gray-200 dark:bg-gray-800 text-gray-600 dark:text-gray-300'
      }
      hover:scale-110 transition-all duration-300 shadow-md
      group-hover:bg-indigo-500 group-hover:text-white
    `}>
      <FontAwesomeIcon icon={icon} className="text-xl" />
    </div>
    
    <div className="absolute left-16 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gray-800 text-white px-2 py-1 rounded whitespace-nowrap z-10">
      {label}
    </div>
  </Link>
);

const Navbar = ({
  clickAway,
  setClickAway,
  isMobileMenuOpen,
  setMobileMenuOpen,
}: Props): ReactElement => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();

  // When mounted on client, now we can show the UI
  useEffect(() => {
    setMounted(true);
  }, []);

  const handleMobileMenuToggle = () => {
    setClickAway(!isMobileMenuOpen);
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  const isActive = (path: string) => {
    if (path === '/') return pathname === '/';
    return pathname?.startsWith(path) || false;
  };

  return (
    <nav className="fixed left-0 top-0 h-full flex flex-col justify-center items-center px-4 z-50">
      <div className="py-8 flex flex-col items-center space-y-6 bg-white/10 dark:bg-gray-900/10 backdrop-blur-sm rounded-full px-4">
        <Link
          href="/"
          className="mb-6 w-12 h-12 flex justify-center items-center rounded-full bg-indigo-600 text-white hover:scale-110 transition-all duration-300 shadow-md"
          prefetch={true}
        >
          <span className="text-xl font-bold">
            {personalInfo.name.split(' ').map(name => name[0]).join('')}
          </span>
        </Link>
        
        <NavItem 
          href="/" 
          icon={faHome} 
          label="Home" 
          isActive={isActive('/')} 
        />
        
        <NavItem 
          href="/about" 
          icon={faUser} 
          label="About" 
          isActive={isActive('/about')} 
        />
        
        <NavItem 
          href="/skills" 
          icon={faCode} 
          label="Skills" 
          isActive={isActive('/skills')} 
        />
        
        <NavItem 
          href="/projects" 
          icon={faLaptopCode} 
          label="Projects" 
          isActive={isActive('/projects')} 
        />
        
        <NavItem 
          href="/blogs" 
          icon={faNewspaper} 
          label="Blog" 
          isActive={isActive('/blogs')} 
        />
        
        <button
          onClick={toggleTheme}
          aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
          className="w-12 h-12 flex justify-center items-center rounded-full bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700 hover:scale-110 transition-all duration-300 shadow-md"
        >
          {mounted && (
            <FontAwesomeIcon
              icon={theme === "light" ? faMoon : faSun}
              className="text-xl text-gray-600 dark:text-gray-300"
            />
          )}
        </button>
      </div>
      
      {/* Mobile menu toggle */}
      <button 
        onClick={handleMobileMenuToggle}
        aria-label="Toggle mobile menu"
        aria-expanded={isMobileMenuOpen}
        className="md:hidden fixed top-4 right-4 flex justify-center items-center w-12 h-12 rounded-full bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700 transition-all duration-300 shadow-md z-50"
      >
        <FontAwesomeIcon
          icon={isMobileMenuOpen ? faTimes : faBars}
          className="text-xl text-gray-600 dark:text-gray-300 transition-transform duration-300"
        />
      </button>
      
      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm flex justify-center items-center z-40 animate-fadeIn">
          <div className="flex flex-col items-center space-y-6">
            <NavItem 
              href="/" 
              icon={faHome} 
              label="Home" 
              isActive={isActive('/')} 
              onClick={handleMobileMenuToggle}
            />
            
            <NavItem 
              href="/about" 
              icon={faUser} 
              label="About" 
              isActive={isActive('/about')} 
              onClick={handleMobileMenuToggle}
            />
            
            <NavItem 
              href="/skills" 
              icon={faCode} 
              label="Skills" 
              isActive={isActive('/skills')} 
              onClick={handleMobileMenuToggle}
            />
            
            <NavItem 
              href="/projects" 
              icon={faLaptopCode} 
              label="Projects" 
              isActive={isActive('/projects')} 
              onClick={handleMobileMenuToggle}
            />
            
            <NavItem 
              href="/blogs" 
              icon={faNewspaper} 
              label="Blog" 
              isActive={isActive('/blogs')} 
              onClick={handleMobileMenuToggle}
            />
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
