"use client";
import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark, faDownload, faExpand, faCompress, faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
  resumeUrl: string;
}

const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose, resumeUrl }) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Close modal when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      // Prevent scrolling when modal is open
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      // Restore scrolling when modal is closed
      document.body.style.overflow = "auto";
    };
  }, [isOpen, onClose]);

  // Close modal on escape key press
  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        if (isFullscreen) {
          setIsFullscreen(false);
        } else {
          onClose();
        }
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscKey);
    }

    return () => {
      document.removeEventListener("keydown", handleEscKey);
    };
  }, [isOpen, onClose, isFullscreen]);

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  const modalVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        type: "spring",
        damping: 25,
        stiffness: 500,
        duration: 0.4
      }
    },
    exit: { 
      opacity: 0, 
      y: 20,
      transition: { duration: 0.2, ease: "easeIn" }
    }
  };

  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { duration: 0.3 }
    },
    exit: { 
      opacity: 0,
      transition: { duration: 0.2 }
    }
  };

  const buttonHoverVariants = {
    hover: { 
      scale: 1.1,
      transition: { duration: 0.2 }
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop with blur effect */}
          <motion.div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={backdropVariants}
          />
          
          {/* Modal */}
          <motion.div
            className={`fixed inset-0 flex items-center justify-center z-50 p-4 ${isFullscreen ? 'p-0' : ''}`}
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={modalVariants}
          >
            <div 
              ref={modalRef}
              className={`bg-white dark:bg-gray-800 rounded-xl shadow-2xl w-full ${isFullscreen ? 'h-screen rounded-none' : 'max-w-5xl h-[85vh]'} flex flex-col overflow-hidden transition-all duration-300`}
              style={{ 
                boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)"
              }}
            >
              {/* Modal Header */}
              <div className="flex justify-between items-center px-6 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
                <h2 className="text-xl font-bold">My Resume</h2>
                <div className="flex gap-4">
                  <motion.a 
                    href={resumeUrl} 
                    download
                    className="p-2 rounded-full hover:bg-white/20 transition-colors duration-200 flex items-center justify-center"
                    title="Download Resume"
                    variants={buttonHoverVariants}
                    whileHover="hover"
                  >
                    <FontAwesomeIcon icon={faDownload} className="text-lg" />
                  </motion.a>
                  
                  <motion.button 
                    onClick={toggleFullscreen}
                    className="p-2 rounded-full hover:bg-white/20 transition-colors duration-200 flex items-center justify-center"
                    title={isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
                    variants={buttonHoverVariants}
                    whileHover="hover"
                  >
                    <FontAwesomeIcon icon={isFullscreen ? faCompress : faExpand} className="text-lg" />
                  </motion.button>
                  
                  <motion.button 
                    onClick={onClose}
                    className="p-2 rounded-full hover:bg-white/20 transition-colors duration-200 flex items-center justify-center"
                    title="Close"
                    variants={buttonHoverVariants}
                    whileHover="hover"
                  >
                    <FontAwesomeIcon icon={faXmark} className="text-lg" />
                  </motion.button>
                </div>
              </div>
              
              {/* PDF Viewer */}
              <div className="flex-grow w-full h-full bg-gray-100 dark:bg-gray-900">
                <iframe 
                  src={`${resumeUrl}#view=FitH`}
                  className="w-full h-full border-none"
                  title="Resume"
                />
              </div>
              
              {/* Modal Footer */}
              <div className="flex justify-between items-center px-6 py-3 bg-gray-100 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  Press <kbd className="px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded text-xs">ESC</kbd> to close
                </div>
                <div className="flex gap-2">
                  <motion.a
                    href={resumeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors duration-200"
                    variants={buttonHoverVariants}
                    whileHover="hover"
                  >
                    Open in New Tab
                  </motion.a>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ResumeModal;
