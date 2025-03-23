import React from "react";
import HeroSection from "../components/HeroSection";

// Use static rendering
export const dynamic = 'error';
export const dynamicParams = false;
export const revalidate = false;
export const fetchCache = 'force-cache';
export const runtime = 'nodejs';
export const preferredRegion = 'auto';

export default function Home() {
  return (
    <div className="container mx-auto px-6 py-16 max-w-6xl">
      <HeroSection />
    </div>
  );
}
