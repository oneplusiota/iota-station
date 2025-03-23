"use client";
import React, { useEffect, useRef, useState } from "react";

// Define skill categories
const skillCategories = [
  {
    name: "Languages",
    skills: [
      { name: "C/C++", level: "Advanced", icon: "💻" },
      { name: "Java", level: "Advanced", icon: "☕" },
      { name: "Python", level: "Advanced", icon: "🐍" },
      { name: "JavaScript", level: "Advanced", icon: "📜" },
      { name: "TypeScript", level: "Intermediate", icon: "🔷" },
      { name: "HTML", level: "Advanced", icon: "🌐" },
      { name: "CSS", level: "Advanced", icon: "🎨" },
    ]
  },
  {
    name: "Frameworks & Libraries",
    skills: [
      { name: "React", level: "Intermediate", icon: "⚛️" },
      { name: "Node.js", level: "Advanced", icon: "🟢" },
      { name: "Express.js", level: "Advanced", icon: "🚂" },
      { name: "Next.js", level: "Intermediate", icon: "▲" },
      { name: "Nest.js", level: "Advanced", icon: "🐱" },
      { name: "Springboot", level: "Intermediate", icon: "🍃" },
      { name: "Tailwind CSS", level: "Intermediate", icon: "🌊" },
    ]
  },
  {
    name: "Tools & Platforms",
    skills: [
      { name: "Git", level: "Advanced", icon: "🔄" },
      { name: "Docker", level: "Intermediate", icon: "🐳" },
      { name: "AWS/Azure", level: "Intermediate", icon: "☁️" },
      { name: "GCP", level: "Advanced", icon: "🌩️" },
      { name: "Jest", level: "Intermediate", icon: "🧪" },
      { name: "Postman", level: "Intermediate", icon: "📮" },
    ]
  }
];

// Skill level to percentage mapping
const levelToPercentage = {
  "Beginner": 30,
  "Intermediate": 65,
  "Advanced": 90,
  "Expert": 100
};

function SkillCard({ skill, index, isVisible }: { skill: any; index: number; isVisible: boolean }) {
  const delay = index * 0.1;
  
  return (
    <li
      className={`p-5 rounded-lg bg-white dark:bg-gray-800 shadow-md hover:shadow-lg transition-all duration-300 transform ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
      }`}
      style={{ transitionDelay: `${delay}s` }}
    >
      <div className="flex items-center mb-3">
        <span className="text-2xl mr-3">{skill.icon}</span>
        <h3 className="text-lg font-bold">{skill.name}</h3>
      </div>
      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 mb-2">
        <div 
          className="bg-gradient-to-r from-indigo-600 to-purple-600 h-2.5 rounded-full transition-all duration-1000 ease-out"
          style={{ 
            width: isVisible ? `${levelToPercentage[skill.level as keyof typeof levelToPercentage]}%` : '0%',
            transitionDelay: `${delay + 0.3}s`
          }}
        ></div>
      </div>
      <span className="text-sm text-gray-500 dark:text-gray-400">{skill.level}</span>
    </li>
  );
}

function SkillCategory({ category, isVisible }: { category: any; isVisible: boolean }) {
  return (
    <div className="mb-12">
      <h3 className="text-xl font-bold mb-6 text-indigo-600 dark:text-indigo-400">{category.name}</h3>
      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {category.skills.map((skill: any, index: number) => (
          <SkillCard key={skill.name} skill={skill} index={index} isVisible={isVisible} />
        ))}
      </ul>
    </div>
  );
}

function Skills() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      const currentRef = sectionRef.current;
      observer.observe(currentRef);

      return () => {
        observer.unobserve(currentRef);
      };
    }

    return () => {};
  }, []);

  return (
    <div ref={sectionRef} className="container mx-auto px-6 py-16 max-w-6xl">
      <h2 className="text-3xl font-bold mb-10 text-center relative">
        Skills
        <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-20 h-1 bg-indigo-600 mt-2"></span>
      </h2>
      
      <div className="space-y-12">
        {skillCategories.map((category) => (
          <SkillCategory key={category.name} category={category} isVisible={isVisible} />
        ))}
      </div>
    </div>
  );
}

export default Skills;
