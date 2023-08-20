"use client";
import React, { ReactNode, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

type Props = { children: ReactNode };

function MainSection({ children }: Props) {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [clickAway, setClickAway] = useState<boolean>(false);
  return (
    <div>
      <header className="fixed top-0 w-full z-10 bg-transparent backdrop-blur">
        <Navbar
          clickAway={clickAway}
          setClickAway={setClickAway}
          isMobileMenuOpen={isMobileMenuOpen}
          setMobileMenuOpen={setMobileMenuOpen}
        />
      </header>
      <main
        className="flex-1 relative dark:bg-gray-950 dark:text-white top-22 flex justify-center items-center flex-col w-full scroll-smooth"
        onClick={() => {
          setClickAway(false);
          setMobileMenuOpen(false);
        }}
      >
        {children}
      </main>
      <div className="flex-1 py-4 dark:bg-gray-950 dark:text-white flex justify-center items-center">
        <Footer />
      </div>
    </div>
  );
}

export default MainSection;
