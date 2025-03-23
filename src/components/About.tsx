"use client";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import personalInfo from "../config/personal-info";

function About() {
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
      { threshold: 0.2 }
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

  // Format bio text into paragraphs
  const bioParagraphs = personalInfo.bio.split('\n\n');

  return (
    <div ref={sectionRef} className="flex justify-center items-center flex-col h-full py-16">
      <h2 className="text-3xl font-bold mb-10 text-center relative text-gray-900 dark:text-white">
        About Me
        <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-20 h-1 bg-indigo-600 mt-2"></span>
      </h2>
      
      <div 
        className={`container max-w-6xl flex flex-col-reverse md:flex-row justify-center items-center gap-8 md:gap-16 transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <div className="flex justify-center items-start w-full md:w-1/2 px-5">
          <div className="prose prose-lg dark:prose-invert">
            <p className="text-lg leading-relaxed mb-4 font-poppins text-gray-800 dark:text-gray-200">
              I&apos;m {personalInfo.name}, a passionate {personalInfo.title.split(',')[0]} with expertise
              in {personalInfo.skills.backend.slice(0, 2).join(' and ')}. I&apos;m currently pursuing my final
              year at the prestigious {personalInfo.education[0].institution}.
            </p>
            
            <p className="text-lg leading-relaxed mb-4 font-poppins text-gray-800 dark:text-gray-200">
              {personalInfo.bio}
            </p>
            
            <p className="text-lg leading-relaxed mb-4 font-poppins text-gray-800 dark:text-gray-200">
              From designing APIs to optimizing database performance, I strive to create seamless
              connections between the front-end and back-end, ensuring smooth data
              flow and efficient functionality. I believe in the power of
              collaboration and continuously seek opportunities to work with
              diverse teams.
            </p>
          </div>
        </div>
        
        <div className="flex justify-center items-center w-full md:w-1/2 mb-8 md:mb-0">
          <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-indigo-600 shadow-xl">
            <Image
              src={personalInfo.profileImage}
              alt={personalInfo.name}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 16rem, 20rem"
              priority
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
