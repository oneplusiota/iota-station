import React from "react";
import Skills from "../../components/Skills";

// Force static generation
export const dynamic = 'force-static';
export const revalidate = false;

export default function SkillsPage() {
  return (
    <div className="container mx-auto px-6 py-16 max-w-6xl">
      <Skills />
    </div>
  );
}
