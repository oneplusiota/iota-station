import React from "react";
import About from "../../components/About";

// Force static generation
export const dynamic = 'force-static';
export const revalidate = false;

export default function AboutPage() {
  return (
    <div className="container mx-auto px-6 py-16 max-w-6xl">
      <About />
    </div>
  );
}
