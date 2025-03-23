"use client";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExternalLinkAlt, faArrowRight, faCode, faLaptopCode } from "@fortawesome/free-solid-svg-icons";
import { faGithub as faGithubBrand } from "@fortawesome/free-brands-svg-icons";
import { motion } from "framer-motion";

type RichTextItem = {
  type: string;
  plain_text: string;
  href?: string;
  annotations: {
    bold: boolean;
    italic: boolean;
    strikethrough: boolean;
    underline: boolean;
    code: boolean;
    color: string;
  };
};

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
  section?: string;
};

// Regular Project Card
function Project({ project, index, isVisible, featured = false }: { project: Project; index: number; isVisible: boolean; featured?: boolean }) {
  const delay = index * 0.15;
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.6, delay }}
      className={`group bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-500 h-full flex flex-col border border-gray-100 dark:border-gray-700 ${
        featured ? 'md:col-span-2' : ''
      }`}
    >
      <div className={`relative ${featured ? 'h-64 md:h-80' : 'h-56'} overflow-hidden`}>
        {/* Project Image */}
        <Image
          src={project.image}
          alt={project.title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          sizes={featured ? "(max-width: 768px) 100vw, 66vw" : "(max-width: 768px) 100vw, 33vw"}
          priority={featured}
        />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
        
        {/* Featured Badge */}
        {featured && (
          <div className="absolute top-4 right-4 z-10 bg-gradient-to-r from-amber-500 to-amber-600 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-md">
            Featured Project
          </div>
        )}
        
        {/* Tags Overlay */}
        <div className="absolute top-4 left-4 z-10 flex flex-wrap gap-2">
          {project.tags.slice(0, featured ? 4 : 2).map((tag, idx) => (
            <span
              key={idx}
              className="px-3 py-1 text-xs font-medium bg-black/60 text-white backdrop-blur-sm rounded-full border border-white/20"
            >
              {tag}
            </span>
          ))}
          {project.tags.length > (featured ? 4 : 2) && (
            <span className="px-3 py-1 text-xs font-medium bg-black/60 text-white backdrop-blur-sm rounded-full border border-white/20">
              +{project.tags.length - (featured ? 4 : 2)}
            </span>
          )}
        </div>
        
        {/* Title Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
          <h3 className={`${featured ? 'text-2xl' : 'text-xl'} font-bold mb-1 group-hover:text-indigo-300 transition-colors duration-300`}>
            {project.title}
          </h3>
        </div>
      </div>
      
      <div className="p-6 flex-grow flex flex-col">
        {/* Description */}
        <div className="text-sm text-gray-600 dark:text-gray-400 mb-6 flex-grow">
          {project.description}
        </div>
        
        {/* Tech Stack */}
        {project.tags && (
          <div className="mb-6">
            <h4 className="text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-2 font-semibold">Tech Stack</h4>
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag, idx) => (
                <span
                  key={idx}
                  className="inline-block bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 rounded-full px-3 py-1 text-xs font-medium"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}
        
        {/* Links */}
        <div className="flex flex-wrap gap-3 mt-auto">
          {project.githubUrl && (
            <Link
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600 transition-all duration-300 hover:shadow-md"
            >
              <FontAwesomeIcon icon={faGithubBrand} className="mr-2" />
              <span>GitHub</span>
            </Link>
          )}
          
          {project.liveUrl && (
            <Link
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center px-4 py-2 rounded-lg bg-gradient-to-r from-indigo-600 to-indigo-700 text-white hover:from-indigo-700 hover:to-indigo-800 transition-all duration-300 hover:shadow-md"
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
                className="flex items-center justify-center px-4 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition-all duration-300 hover:shadow-md"
              >
                <span>{link.label || link.type}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}

// Featured Project Card (Horizontal Layout)
function FeaturedProjectHorizontal({ project, index, isVisible }: { project: Project; index: number; isVisible: boolean }) {
  const delay = index * 0.15;
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.6, delay }}
      className="group bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-500 border border-gray-100 dark:border-gray-700 mb-12"
    >
      <div className="md:flex">
        {/* Left: Image (on mobile: top) */}
        <div className="relative h-64 md:h-auto md:w-1/2 overflow-hidden">
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, 50vw"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-black/70 via-black/40 to-transparent"></div>
          
          {/* Featured Badge */}
          <div className="absolute top-4 right-4 z-10 bg-gradient-to-r from-amber-500 to-amber-600 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-md">
            Featured Project
          </div>
          
          {/* Mobile Title (hidden on desktop) */}
          <div className="absolute bottom-0 left-0 right-0 p-5 text-white md:hidden">
            <h3 className="text-2xl font-bold mb-1 group-hover:text-indigo-300 transition-colors duration-300">
              {project.title}
            </h3>
          </div>
        </div>
        
        {/* Right: Content (on mobile: bottom) */}
        <div className="p-6 md:p-8 md:w-1/2 flex flex-col">
          {/* Desktop Title (hidden on mobile) */}
          <div className="hidden md:block mb-4">
            <h3 className="text-2xl font-bold text-gray-800 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors duration-300">
              {project.title}
            </h3>
          </div>
          
          {/* Description */}
          <div className="text-gray-600 dark:text-gray-300 mb-6">
            {project.description}
          </div>
          
          {/* Tech Stack */}
          {project.tags && (
            <div className="mb-8">
              <h4 className="text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-3 font-semibold">Tech Stack</h4>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="inline-block bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 rounded-full px-3 py-1 text-xs font-medium"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}
          
          {/* Key Features */}
          <div className="mb-8">
            <h4 className="text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-3 font-semibold">Key Features</h4>
            <ul className="space-y-2">
              <li className="flex items-start">
                <span className="text-indigo-500 mr-2">•</span>
                <span className="text-sm text-gray-600 dark:text-gray-300">Responsive design that works on all devices</span>
              </li>
              <li className="flex items-start">
                <span className="text-indigo-500 mr-2">•</span>
                <span className="text-sm text-gray-600 dark:text-gray-300">Modern UI with smooth animations</span>
              </li>
              <li className="flex items-start">
                <span className="text-indigo-500 mr-2">•</span>
                <span className="text-sm text-gray-600 dark:text-gray-300">Optimized performance and accessibility</span>
              </li>
            </ul>
          </div>
          
          {/* Links */}
          <div className="flex flex-wrap gap-3 mt-auto">
            {project.githubUrl && (
              <Link
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center px-5 py-2.5 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600 transition-all duration-300 hover:shadow-md"
              >
                <FontAwesomeIcon icon={faGithubBrand} className="mr-2" />
                <span>GitHub</span>
              </Link>
            )}
            
            {project.liveUrl && (
              <Link
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center px-5 py-2.5 rounded-lg bg-gradient-to-r from-indigo-600 to-indigo-700 text-white hover:from-indigo-700 hover:to-indigo-800 transition-all duration-300 hover:shadow-md"
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
                  className="flex items-center justify-center px-5 py-2.5 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition-all duration-300 hover:shadow-md"
                >
                  <span>{link.label || link.type}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isVisible, setIsVisible] = useState(false);
  const [error, setError] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    async function fetchProjects() {
      try {
        const response = await fetch('/api/projects');
        
        if (!response.ok) {
          throw new Error(`Failed to fetch projects: ${response.status}`);
        }
        
        const data = await response.json();
        
        // Transform API response to our Project type
        const transformedProjects = data.results.map((project: any) => {
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
          
          // Extract section
          const section = project.properties["Section"]?.type === "select" 
            ? project.properties["Section"].select?.name || "Other Projects"
            : project.section || "Other Projects";
          
          // Extract featured flag
          const featured = project.properties["Featured"]?.type === "checkbox" 
            ? project.properties["Featured"].checkbox 
            : project.featured || false;
          
          return {
            id: project.id,
            title,
            description,
            image: imagePath,
            tags,
            githubUrl,
            liveUrl,
            links,
            section,
            featured
          };
        });
        
        setProjects(transformedProjects);
      } catch (error) {
        console.error('Error fetching projects:', error);
        setError(true);
      } finally {
        setIsLoading(false);
      }
    }

    fetchProjects();
  }, []);

  // Ensure at least one project is marked as featured
  useEffect(() => {
    if (projects.length > 0 && !projects.some(project => project.featured)) {
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
      const currentRef = sectionRef.current;
      observer.observe(currentRef);

      return () => {
        observer.unobserve(currentRef);
      };
    }

    return () => {};
  }, []);

  // Group projects by section
  const groupProjectsBySection = () => {
    const sections: Record<string, Project[]> = {};
    
    projects.forEach(project => {
      const section = project.section || "Other Projects";
      
      if (!sections[section]) {
        sections[section] = [];
      }
      
      sections[section].push(project);
    });
    
    return sections;
  };

  const projectSections = groupProjectsBySection();
  
  // Find featured projects
  const getFeaturedProjects = () => {
    // Filter projects that have the featured flag set to true
    const featured = projects.filter(project => project.featured === true);
    
    // If no featured projects found, mark the first project as featured
    if (featured.length === 0 && projects.length > 0) {
      return [projects[0]];
    }
    
    return featured;
  };
  
  const featuredProjects = getFeaturedProjects();
  
  return (
    <div ref={sectionRef} className="container mx-auto px-6 py-16 max-w-6xl">
      <h2 className="text-4xl font-bold mb-12 text-center relative">
        My Projects
        <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-24 h-1.5 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full"></div>
      </h2>
      
      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
        </div>
      ) : projects.length > 0 ? (
        <>
          {error && (
            <div className="mb-8 p-4 bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 rounded-lg">
              <p>Error loading projects. Using local project data.</p>
            </div>
          )}
          
          {/* Featured Project Section */}
          {featuredProjects.length > 0 && (
            <div className="mb-16">
              <h3 className="text-2xl font-bold mb-8 text-gray-800 dark:text-gray-200 flex items-center">
                <span className="mr-2">✨</span> Featured Projects
                <div className="w-16 h-1 bg-indigo-600 ml-4 rounded-full"></div>
              </h3>
              
              {featuredProjects.map((project, index) => (
                <FeaturedProjectHorizontal
                  key={`featured-${project.id}`}
                  project={project}
                  index={index}
                  isVisible={isVisible}
                />
              ))}
            </div>
          )}
          
          {/* Project Sections */}
          {Object.entries(projectSections).map(([section, sectionProjects]) => (
            <div key={section} className="mb-16">
              <h3 className="text-2xl font-bold mb-8 text-gray-800 dark:text-gray-200">
                {section}
                <div className="w-16 h-1 bg-indigo-600 mt-2 rounded-full"></div>
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {sectionProjects.map((project, index) => (
                  <Project 
                    key={project.id} 
                    project={project} 
                    index={index}
                    isVisible={isVisible}
                    featured={index === 0 && sectionProjects.length > 3}
                  />
                ))}
              </div>
            </div>
          ))}
        </>
      ) : (
        <div className="text-center py-16 bg-gray-50 dark:bg-gray-800/50 rounded-2xl">
          <div className="text-5xl mb-4">🔍</div>
          <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-gray-200">No projects found</h3>
          <p className="text-gray-600 dark:text-gray-400 mb-6">Connect your GitHub account to display your projects</p>
        </div>
      )}
    </div>
  );
}
