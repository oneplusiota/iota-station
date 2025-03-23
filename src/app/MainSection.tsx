"use client";
import React, { ReactNode, useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";

type Props = { children: ReactNode };

function MainSection({ children }: Props) {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [clickAway, setClickAway] = useState<boolean>(false);
  const pathname = usePathname();

  // Page transition variants
  const pageVariants = {
    initial: {
      opacity: 0,
      y: 20,
    },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.6, -0.05, 0.01, 0.99],
      },
    },
    exit: {
      opacity: 0,
      y: -20,
      transition: {
        duration: 0.4,
      },
    },
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Sidebar Navigation */}
      <Navbar
        clickAway={clickAway}
        setClickAway={setClickAway}
        isMobileMenuOpen={isMobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
      />
      
      {/* Main Content with Left Padding for Sidebar */}
      <AnimatePresence mode="wait">
        <motion.main
          key={pathname} // Use pathname as key instead of random number
          initial="initial"
          animate="animate"
          exit="exit"
          variants={pageVariants}
          className="flex-grow relative dark:bg-gray-950 dark:text-white pl-24 md:pl-28 flex justify-center items-center w-full scroll-smooth"
          onClick={() => {
            if (isMobileMenuOpen) {
              setClickAway(false);
              setMobileMenuOpen(false);
            }
          }}
        >
          {children}
        </motion.main>
      </AnimatePresence>
      
      {/* Footer */}
      <footer className="w-full py-6 pl-24 md:pl-28 dark:bg-gray-950 dark:text-white flex justify-center items-center border-t border-gray-200 dark:border-gray-800">
        <Footer />
      </footer>
    </div>
  );
}

export default MainSection;
