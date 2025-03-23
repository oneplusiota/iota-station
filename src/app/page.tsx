"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import ResumeModal from "../components/ResumeModal";

export default function Home() {
  const [isVisible, setIsVisible] = useState(false);
  const [isResumeModalOpen, setResumeModalOpen] = useState(false);
  const resumeUrl = "/resume.pdf";

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
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

  const buttonVariants = {
    hover: {
      scale: 1.05,
      transition: {
        duration: 0.2,
        yoyo: Infinity,
      },
    },
  };

  return (
    <div className="w-full flex flex-col justify-center items-center py-12 md:py-16">
      <motion.div
        className="text-center w-full max-w-4xl px-4 md:px-6"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <motion.div variants={itemVariants} className="mb-6">
          <Image
            src="/profile.jpg"
            alt="Shivam Nayak"
            width={180}
            height={180}
            className="rounded-full border-4 border-indigo-600 mx-auto shadow-xl"
            priority
          />
        </motion.div>

        <motion.h1
          variants={itemVariants}
          className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent"
        >
          Shivam Nayak
        </motion.h1>

        <motion.p
          variants={itemVariants}
          className="text-xl md:text-2xl mb-10 text-gray-700 dark:text-gray-300"
        >
          Software Developer, Final Year - IIT Kharagpur
        </motion.p>

        <motion.div
          variants={itemVariants}
          className="flex flex-wrap justify-center gap-4 mb-16"
        >
          <motion.button
            onClick={() => setResumeModalOpen(true)}
            className="flex items-center px-6 py-3 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 transition-colors duration-300 shadow-md"
            variants={buttonVariants}
            whileHover="hover"
          >
            <FontAwesomeIcon icon={faDownload} className="mr-2" />
            <span>Resume</span>
          </motion.button>

          <motion.a
            href="https://github.com/shivam-nayak2"
            target="_blank"
            rel="noopener noreferrer"
            className="flex justify-center items-center w-12 h-12 rounded-full bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors duration-300 shadow-md"
            variants={buttonVariants}
            whileHover="hover"
          >
            <FontAwesomeIcon icon={faGithub} className="text-2xl" />
          </motion.a>

          <motion.a
            href="https://linkedin.com/in/shivam-nayak2"
            target="_blank"
            rel="noopener noreferrer"
            className="flex justify-center items-center w-12 h-12 rounded-full bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors duration-300 shadow-md"
            variants={buttonVariants}
            whileHover="hover"
          >
            <FontAwesomeIcon icon={faLinkedin} className="text-2xl" />
          </motion.a>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 w-full mt-8"
        >
            <Link href="/about" className="h-full">
              <motion.div
                className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer group h-full flex flex-col"
                whileHover={{ y: -5 }}
              >
                <h2 className="text-xl font-bold mb-2 group-hover:text-indigo-600 transition-colors duration-300">
                  About Me
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mb-4 flex-grow">
                  Learn more about my background, experience, and interests.
                </p>
                <div className="flex justify-end mt-auto">
                  <span className="text-indigo-600 group-hover:translate-x-1 transition-transform duration-300">
                    <FontAwesomeIcon icon={faArrowRight} />
                  </span>
                </div>
              </motion.div>
            </Link>

            <Link href="/skills" className="h-full">
              <motion.div
                className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer group h-full flex flex-col"
                whileHover={{ y: -5 }}
              >
                <h2 className="text-xl font-bold mb-2 group-hover:text-indigo-600 transition-colors duration-300">
                  Skills
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mb-4 flex-grow">
                  Explore my technical skills and areas of expertise.
                </p>
                <div className="flex justify-end mt-auto">
                  <span className="text-indigo-600 group-hover:translate-x-1 transition-transform duration-300">
                    <FontAwesomeIcon icon={faArrowRight} />
                  </span>
                </div>
              </motion.div>
            </Link>

            <Link href="/projects" className="h-full">
              <motion.div
                className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer group h-full flex flex-col"
                whileHover={{ y: -5 }}
              >
                <h2 className="text-xl font-bold mb-2 group-hover:text-indigo-600 transition-colors duration-300">
                  Projects
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mb-4 flex-grow">
                  View my portfolio of projects and applications.
                </p>
                <div className="flex justify-end mt-auto">
                  <span className="text-indigo-600 group-hover:translate-x-1 transition-transform duration-300">
                    <FontAwesomeIcon icon={faArrowRight} />
                  </span>
                </div>
              </motion.div>
            </Link>
        </motion.div>
      </motion.div>

      {/* Resume Modal */}
      <ResumeModal 
        isOpen={isResumeModalOpen} 
        onClose={() => setResumeModalOpen(false)} 
        resumeUrl={resumeUrl}
      />
    </div>
  );
}
