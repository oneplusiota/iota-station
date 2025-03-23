"use client";
import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExternalLinkAlt, faArrowRight, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { faGithub } from "@fortawesome/free-brands-svg-icons";

type Link = {
  type: string;
  url: string;
  label?: string;
};

type Project = {
  id: string;
  title: string;
  description: string;
  image: string;
  tags: string[];
  githubUrl?: string;
  liveUrl?: string;
  featured?: boolean;
  links?: Link[];
};

// Project Card - Redesigned without images
function ProjectCard({ project, index, isVisible, onClick }: { project: Project; index: number; isVisible: boolean; onClick: () => void }) {
  const delay = index * 0.15;
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.6, delay }}
      className="group bg-white dark:bg-gray-900 rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 h-full flex flex-col border border-gray-200 dark:border-gray-800 hover:border-indigo-500 relative cursor-pointer"
      onClick={onClick}
    >
      <div className="p-5 flex-grow flex flex-col">
        {/* Title */}
        <h3 className="text-xl font-bold mb-3 text-gray-800 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors duration-300">
          {project.title}
        </h3>
        
        {/* Featured Badge */}
        {project.featured && (
          <div className="absolute top-4 right-4 bg-gradient-to-r from-amber-500 to-amber-600 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-md">
            Featured
          </div>
        )}
        
        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {project.tags.slice(0, 3).map((tag, idx) => (
            <span
              key={idx}
              className="inline-block bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full px-3 py-1 text-xs font-medium"
            >
              {tag}
            </span>
          ))}
          {project.tags.length > 3 && (
            <span className="inline-block bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full px-3 py-1 text-xs font-medium">
              +{project.tags.length - 3}
            </span>
          )}
        </div>
        
        {/* Description */}
        <p className="text-sm text-gray-700 dark:text-gray-300 mb-5 flex-grow line-clamp-3">
          {project.description}
        </p>
        
        {/* View Details Button */}
        <div className="flex justify-center mt-auto">
          <button 
            className="flex items-center justify-center px-4 py-2 rounded-xl bg-indigo-600 text-white hover:bg-indigo-700 transition-colors duration-200 w-full"
            onClick={(e) => {
              e.stopPropagation();
              onClick();
            }}
          >
            <FontAwesomeIcon icon={faInfoCircle} className="mr-2" />
            <span>View Details</span>
          </button>
        </div>
      </div>
    </motion.div>
  );
}

// Project Modal - For displaying detailed project information
function ProjectModal({ project, onClose }: { project: Project; onClose: () => void }) {
  // Close modal when clicking outside
  const modalRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose();
      }
    };
    
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscKey);
    
    // Prevent scrolling when modal is open
    document.body.style.overflow = 'hidden';
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscKey);
      document.body.style.overflow = 'auto';
    };
  }, [onClose]);
  
  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <motion.div 
        ref={modalRef}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.3 }}
        className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl overflow-hidden max-w-4xl w-full max-h-[90vh] flex flex-col border border-gray-200 dark:border-gray-800"
      >
        {/* Modal Header */}
        <div className="relative p-6 border-b border-gray-200 dark:border-gray-800">
          {/* Close Button */}
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200"
          >
            <FontAwesomeIcon icon={faTimes} />
          </button>
          
          <div className="pr-8">
            {/* Title */}
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-1">
              {project.title}
            </h2>
            
            {/* Featured Badge */}
            {project.featured && (
              <span className="inline-block bg-gradient-to-r from-amber-500 to-amber-600 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-md mt-2">
                Featured Project
              </span>
            )}
          </div>
        </div>
        
        {/* Modal Content */}
        <div className="p-6 overflow-y-auto">
          {/* Project Image */}
          <div className="relative h-64 mb-6 overflow-hidden rounded-xl">
            <Image
              src={project.image}
              alt={project.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 800px"
            />
          </div>
          
          {/* Description */}
          <div className="text-gray-700 dark:text-gray-300 mb-6">
            {project.description}
          </div>
          
          {/* Tech Stack */}
          <div className="mb-8">
            <h4 className="text-sm uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-3 font-semibold">Tech Stack</h4>
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag, idx) => (
                <span
                  key={idx}
                  className="inline-block bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full px-3 py-1 text-sm font-medium"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
          
          {/* Key Features */}
          <div className="mb-8">
            <h4 className="text-sm uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-3 font-semibold">Key Features</h4>
            <ul className="space-y-2">
              <li className="flex items-start">
                <span className="text-indigo-500 mr-2">•</span>
                <span className="text-sm text-gray-700 dark:text-gray-300">Responsive design that works on all devices</span>
              </li>
              <li className="flex items-start">
                <span className="text-indigo-500 mr-2">•</span>
                <span className="text-sm text-gray-700 dark:text-gray-300">Modern UI with smooth animations</span>
              </li>
              <li className="flex items-start">
                <span className="text-indigo-500 mr-2">•</span>
                <span className="text-sm text-gray-700 dark:text-gray-300">Optimized performance and accessibility</span>
              </li>
            </ul>
          </div>
          
          {/* Links */}
          <div className="flex flex-wrap gap-3 mt-8">
            {project.githubUrl && (
              <Link
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center px-5 py-2.5 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200"
              >
                <FontAwesomeIcon icon={faGithub} className="mr-2" />
                <span>GitHub</span>
              </Link>
            )}
            
            {project.liveUrl && (
              <Link
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center px-5 py-2.5 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition-colors duration-200"
              >
                <FontAwesomeIcon icon={faExternalLinkAlt} className="mr-2" />
                <span>Live Demo</span>
              </Link>
            )}
            
            {/* Additional Links */}
            {project.links && project.links.map((link, idx) => {
              // Skip GitHub and Live links as they're already handled above
              if (link.type === 'github' || link.type === 'live') return null;
              
              return (
                <Link
                  key={idx}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center px-5 py-2.5 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200"
                >
                  <span>{link.label || link.type}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    async function fetchProjects() {
      try {
        // Use the API route for both local and production environments
        console.log("Fetching projects from API");
        
        const response = await fetch('/api/projects');
        
        if (!response.ok) {
          throw new Error(`Failed to fetch projects: ${response.status}`);
        }
        
        const data = await response.json();
        
        // Get the projects data
        const projectsData = data.results || [];
        
        // Transform the projects to match our Project type
        const transformedProjects = projectsData.map((project: any) => {
          // Extract image path
          let imagePath = "/defaultproject.jpeg";
          if (project.cover && project.cover.type === "external") {
            imagePath = project.cover.external.url;
          } else if (project.cover && project.cover.type === "file") {
            imagePath = project.cover.file.url;
          }
          
          // Extract title
          let title = "";
          if (project.properties["Name"]?.type === "title") {
            project.properties["Name"].title.forEach((text: any) => {
              title += text.plain_text;
            });
          }
          
          // Extract description
          let description = "";
          if (project.properties["Description"]?.type === "rich_text") {
            project.properties["Description"].rich_text.forEach((text: any) => {
              description += text.plain_text;
            });
          }
          
          // Extract tags
          const tags = project.properties["tags"]?.type === "multi_select" 
            ? project.properties["tags"].multi_select.map((tag: any) => tag.name)
            : [];
            
          // Extract GitHub and Live URLs
          const githubUrl = project.properties["GitHub Repository"]?.type === "url" 
            ? project.properties["GitHub Repository"].url 
            : undefined;
            
          const liveUrl = project.properties["Live Demo"]?.type === "url" 
            ? project.properties["Live Demo"].url 
            : undefined;
          
          // Extract links
          const links: Link[] = [];
          
          // Look for properties that are URLs and convert them to links
          Object.entries(project.properties).forEach(([key, value]: [string, any]) => {
            if (value && value.type === "url" && value.url) {
              const isGithub = key.toLowerCase().includes('github');
              const isLive = key.toLowerCase().includes('live') || key.toLowerCase().includes('demo');
              const isDoc = key.toLowerCase().includes('doc');
              
              links.push({
                type: isGithub ? 'github' : isLive ? 'live' : isDoc ? 'documentation' : 'external',
                url: value.url,
                label: key.replace(' Link', '')
              });
            }
          });
          
          return {
            id: project.id,
            title,
            description,
            image: imagePath,
            tags,
            githubUrl,
            liveUrl,
            links,
            featured: project.properties["Featured"]?.type === "checkbox" 
              ? project.properties["Featured"].checkbox 
              : false
          };
        });
        
        if (transformedProjects.length > 0) {
          // If no projects are explicitly marked as featured, mark the first one
          const hasExplicitFeatured = transformedProjects.some((project: Project) => project.featured);
          if (!hasExplicitFeatured && transformedProjects.length > 0) {
            transformedProjects[0].featured = true;
          }
          
          setProjects(transformedProjects);
        } else {
          // No projects could be loaded
          setProjects([]);
          setError(true);
        }
      } catch (error) {
        console.error('Error fetching projects:', error);
        // Set empty projects array when loading fails
        setProjects([]);
        setError(true);
      } finally {
        setIsLoading(false);
      }
    }

    fetchProjects();
  }, []);

  // Ensure featured projects are displayed in a separate section
  useEffect(() => {
    if (projects.length > 0 && !projects.some(project => project.featured)) {
      // Create a copy of projects array with the first project marked as featured
      const updatedProjects = [...projects];
      updatedProjects[0].featured = true;
      setProjects(updatedProjects);
    }
  }, [projects]);

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
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <div ref={sectionRef} className="container mx-auto px-6 py-16 max-w-6xl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-6"
      >
        <h1 className="text-4xl font-bold mb-4 text-gray-800 dark:text-white relative inline-block">
          My Projects
          <div className="absolute -bottom-2 left-0 w-24 h-1.5 bg-indigo-600 rounded-full"></div>
        </h1>
      </motion.div>
      
      {/* Tag Filter */}
      {!isLoading && projects.length > 0 && (
        <div className="mb-12">
          <div className="flex flex-wrap gap-2 mt-4">
            <button
              onClick={() => setSelectedTag(null)}
              className={`px-3 py-1.5 text-sm font-medium rounded-lg transition-colors duration-200 ${
                selectedTag === null
                  ? 'bg-indigo-600 text-white'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
              }`}
            >
              All
            </button>
            
            {/* Get unique tags from all projects */}
            {Array.from(new Set(projects.flatMap(p => p.tags))).map(tag => (
              <button
                key={tag}
                onClick={() => setSelectedTag(tag)}
                className={`px-3 py-1.5 text-sm font-medium rounded-lg transition-colors duration-200 ${
                  selectedTag === tag
                    ? 'bg-indigo-600 text-white'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      )}
      
      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
        </div>
      ) : (
        <>
          {error && (
            <div className="mb-8 p-4 bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 rounded-lg">
              <p>No projects found. Please check your data source or connection.</p>
            </div>
          )}
          
          {/* Featured Projects */}
          {projects.some(project => project.featured) && (
            <div className="mb-16">
              <h2 className="text-2xl font-bold mb-8 text-gray-800 dark:text-white flex items-center">
                <span className="mr-2">✨</span> Featured Projects
                <div className="w-16 h-1 bg-indigo-600 ml-4 rounded-full"></div>
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {projects
                  .filter(project => project.featured && (selectedTag === null || project.tags.includes(selectedTag)))
                  .map((project, index) => (
                    <ProjectCard
                      key={project.id}
                      project={project}
                      index={index}
                      isVisible={isVisible}
                      onClick={() => setSelectedProject(project)}
                    />
                  ))}
              </div>
            </div>
          )}
          
          {/* All Projects Grid */}
          <div className="mb-16">
            <h2 className="text-2xl font-bold mb-8 text-gray-800 dark:text-white">
              {selectedTag ? `Projects: ${selectedTag}` : "All Projects"}
              <div className="w-16 h-1 bg-indigo-600 mt-2 rounded-full"></div>
            </h2>
            
            {projects
              .filter(project => selectedTag === null || project.tags.includes(selectedTag))
              .length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {projects
                    .filter(project => selectedTag === null || project.tags.includes(selectedTag))
                    .map((project, index) => (
                      <ProjectCard
                        key={project.id}
                        project={project}
                        index={index}
                        isVisible={isVisible}
                        onClick={() => setSelectedProject(project)}
                      />
                    ))}
                </div>
              ) : (
                <div className="p-6 bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 text-center">
                  <p className="text-gray-500 dark:text-gray-400">No projects match the selected filter.</p>
                </div>
              )}
          </div>
          
          {/* Call to Action */}
          <div className="mt-16 text-center">
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Interested in working together? Check out more of my work or get in touch!
            </p>
            <div className="flex justify-center gap-4">
              <Link 
                href="https://github.com/yourusername" 
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-white rounded-xl hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-300"
              >
                <FontAwesomeIcon icon={faGithub} className="mr-2" />
                More on GitHub
              </Link>
              <Link 
                href="/contact" 
                className="px-6 py-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-colors duration-300"
              >
                <FontAwesomeIcon icon={faArrowRight} className="mr-2" />
                Contact Me
              </Link>
            </div>
          </div>
          
          {/* Project Modal */}
          {selectedProject && (
            <ProjectModal 
              project={selectedProject} 
              onClose={() => setSelectedProject(null)} 
            />
          )}
        </>
      )}
    </div>
  );
}
