"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

type Skill = {
  name: string;
  level: number;
  icon: string;
  category: "Languages" | "Frameworks & Libraries" | "Tools & Technologies";
};

export default function SkillsPage() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const skills: Skill[] = [
    // Languages
    { name: "C/C++", level: 85, icon: "💻", category: "Languages" },
    { name: "Java", level: 90, icon: "☕", category: "Languages" },
    { name: "Python", level: 85, icon: "🐍", category: "Languages" },
    { name: "JavaScript", level: 90, icon: "📜", category: "Languages" },
    { name: "TypeScript", level: 75, icon: "🔷", category: "Languages" },
    { name: "HTML", level: 95, icon: "🌐", category: "Languages" },
    { name: "CSS", level: 85, icon: "🎨", category: "Languages" },
    
    // Frameworks & Libraries
    { name: "React", level: 90, icon: "⚛️", category: "Frameworks & Libraries" },
    { name: "Next.js", level: 80, icon: "▲", category: "Frameworks & Libraries" },
    { name: "Express.js", level: 85, icon: "🚂", category: "Frameworks & Libraries" },
    { name: "Nest.js", level: 85, icon: "🐱", category: "Frameworks & Libraries" },
    { name: "Springboot", level: 75, icon: "🍃", category: "Frameworks & Libraries" },
    { name: "Tailwind CSS", level: 75, icon: "🌊", category: "Frameworks & Libraries" },
    
    // Tools & Technologies
    { name: "Git", level: 85, icon: "🔄", category: "Tools & Technologies" },
    { name: "Docker", level: 75, icon: "🐳", category: "Tools & Technologies" },
    { name: "AWS/Azure", level: 70, icon: "☁️", category: "Tools & Technologies" },
    { name: "GCP", level: 90, icon: "☁️", category: "Tools & Technologies" },
    { name: "Jest", level: 75, icon: "🧪", category: "Tools & Technologies" },
    { name: "Postman", level: 80, icon: "📬", category: "Tools & Technologies" },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  const categories = ["Languages", "Frameworks & Libraries", "Tools & Technologies"];

  return (
    <div className="container mx-auto px-6 pt-24 pb-16 max-w-6xl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-12"
        id="skills-header"
      >
        <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
          Skills & Expertise
        </h1>
        <p className="text-lg text-gray-700 dark:text-gray-300">
          Here are the technologies I work with and my proficiency level in each.
        </p>
      </motion.div>

      {categories.map((category, categoryIndex) => (
        <div key={category} className="mb-16">
          <motion.h2
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: categoryIndex * 0.2 }}
            className="text-2xl font-bold mb-8 text-indigo-600 dark:text-indigo-400"
          >
            {category}
          </motion.h2>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {skills
              .filter((skill) => skill.category === category)
              .map((skill, index) => (
                <motion.div
                  key={skill.name}
                  className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 h-full flex flex-col"
                  variants={itemVariants}
                  whileHover={{ scale: 1.03 }}
                >
                  <div className="flex items-center mb-4">
                    <span className="text-3xl mr-3">{skill.icon}</span>
                    <h3 className="text-xl font-bold">{skill.name}</h3>
                  </div>
                  
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 mb-2">
                    <motion.div
                      className="bg-gradient-to-r from-indigo-600 to-purple-600 h-2.5 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${skill.level}%` }}
                      transition={{ duration: 1, delay: 0.2 + index * 0.1 }}
                    ></motion.div>
                  </div>
                  
                  <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400">
                    <span>Proficiency</span>
                    <span>{skill.level >= 90 ? "Advanced" : skill.level >= 70 ? "Intermediate" : "Beginner"}</span>
                  </div>
                </motion.div>
              ))}
          </motion.div>
        </div>
      ))}
    </div>
  );
}
