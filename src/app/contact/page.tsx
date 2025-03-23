"use client";
import React from "react";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { faGithub, faLinkedin, faTwitter } from "@fortawesome/free-brands-svg-icons";
import personalInfo from "../../config/personal-info";

export default function ContactPage() {
  return (
    <div className="container mx-auto px-6 h-screen flex flex-col justify-center max-w-6xl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8 text-center"
      >
        <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
          Get In Touch
        </h1>
        <p className="text-lg text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
          Feel free to reach out through any of the channels below. I&apos;m always open to discussing new projects and ideas.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Contact & Social Section */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 border border-gray-100 dark:border-gray-700"
        >
          <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-200">
            Connect With Me
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Email */}
            <a 
              href={`mailto:${personalInfo.contact.email}`}
              className="flex items-center p-4 bg-gray-50 dark:bg-gray-700 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors duration-300"
            >
              <div className="w-10 h-10 flex items-center justify-center bg-indigo-100 dark:bg-indigo-900/30 rounded-full mr-3 flex-shrink-0">
                <FontAwesomeIcon icon={faEnvelope} className="text-lg text-indigo-600 dark:text-indigo-400" />
              </div>
              <div>
                <h3 className="font-medium text-gray-800 dark:text-gray-200">Email</h3>
                <p className="text-xs text-gray-500 dark:text-gray-400">Send a message</p>
              </div>
            </a>
            
            {/* GitHub */}
            <a
              href={personalInfo.social.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center p-4 bg-gray-50 dark:bg-gray-700 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors duration-300"
            >
              <div className="w-10 h-10 flex items-center justify-center bg-gray-200 dark:bg-gray-600 rounded-full mr-3 flex-shrink-0">
                <FontAwesomeIcon icon={faGithub} className="text-lg text-gray-700 dark:text-gray-300" />
              </div>
              <div>
                <h3 className="font-medium text-gray-800 dark:text-gray-200">GitHub</h3>
                <p className="text-xs text-gray-500 dark:text-gray-400">View projects</p>
              </div>
            </a>
            
            {/* LinkedIn */}
            <a
              href={personalInfo.social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center p-4 bg-gray-50 dark:bg-gray-700 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors duration-300"
            >
              <div className="w-10 h-10 flex items-center justify-center bg-blue-100 dark:bg-blue-900 rounded-full mr-3 flex-shrink-0">
                <FontAwesomeIcon icon={faLinkedin} className="text-lg text-blue-700 dark:text-blue-300" />
              </div>
              <div>
                <h3 className="font-medium text-gray-800 dark:text-gray-200">LinkedIn</h3>
                <p className="text-xs text-gray-500 dark:text-gray-400">Connect with me</p>
              </div>
            </a>
            
            {/* Twitter */}
            <a
              href={personalInfo.social.twitter}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center p-4 bg-gray-50 dark:bg-gray-700 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors duration-300"
            >
              <div className="w-10 h-10 flex items-center justify-center bg-blue-100 dark:bg-blue-900 rounded-full mr-3 flex-shrink-0">
                <FontAwesomeIcon icon={faTwitter} className="text-lg text-blue-500 dark:text-blue-300" />
              </div>
              <div>
                <h3 className="font-medium text-gray-800 dark:text-gray-200">Twitter</h3>
                <p className="text-xs text-gray-500 dark:text-gray-400">Follow updates</p>
              </div>
            </a>
          </div>
        </motion.div>

        {/* FAQ Section */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 border border-gray-100 dark:border-gray-700"
        >
          <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-200">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-lg text-gray-800 dark:text-gray-200 mb-1">
                What services do you offer?
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                I specialize in full-stack web development, responsive design, and building modern web applications with React, Next.js, and Node.js.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold text-lg text-gray-800 dark:text-gray-200 mb-1">
                What is your typical response time?
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                I typically respond to all inquiries within 24-48 hours during business days.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold text-lg text-gray-800 dark:text-gray-200 mb-1">
                Are you available for freelance work?
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Yes, I&apos;m open to freelance opportunities and collaborations on interesting projects.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
