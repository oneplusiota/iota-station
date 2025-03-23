import React from "react";
import Projects from "../../components/Projects";

// Force static generation
export const dynamic = 'force-static';
export const revalidate = false;

export default function ProjectsPage() {
  return (
    <div className="container mx-auto px-6 py-16 max-w-6xl">
      <Projects />
    </div>
  );
}
