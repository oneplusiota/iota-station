import React from "react";
import HeroSection from "../components/HeroSection";

// Force static generation
export const dynamic = 'force-static';
export const revalidate = false;

export default function Home() {
  return (
    <div className="container mx-auto px-6 py-16 max-w-6xl">
      <HeroSection />
    </div>
  );
}
