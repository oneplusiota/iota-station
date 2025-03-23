"use client";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Richtext from "./notion-components/Richtext";
import { PageObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExternalLinkAlt, faArrowRight, faCode, faLaptopCode } from "@fortawesome/free-solid-svg-icons";
import { faGithub as faGithubBrand } from "@fortawesome/free-brands-svg-icons";
import { motion } from "framer-motion";

// Extend PageObjectResponse to include our custom properties
interface ExtendedPageObjectResponse extends PageObjectResponse {
  section?: string;
  featured?: boolean;
}

type ProjectProps = { 
  project: ExtendedPageObjectResponse;
  index: number;
  isVisible: boolean;
  featured?: boolean;
};

// Sample project data for fallback when API is not available
const sampleProjects = [
  {
    id: "1",
    cover: { type: "external", external: { url: "/defaultproject.jpeg" } },
    properties: {
      "Name": { 
        type: "title", 
        title: [{ plain_text: "Portfolio Website", annotations: {}, type: "text" }] 
      },
      "Description": { 
        type: "rich_text", 
        rich_text: [{ plain_text: "A modern portfolio website built with Next.js and Tailwind CSS.", annotations: {}, type: "text" }] 
      },
      "Github Link": { type: "url", url: "https://github.com/yourusername/portfolio" },
      "Live Link": { type: "url", url: "https://your-portfolio.com" },
      "tags": { 
        type: "multi_select", 
        multi_select: [
          { id: "1", name: "Next.js" },
          { id: "2", name: "Tailwind CSS" },
          { id: "3", name: "React" }
        ]
      }
    }
  },
  {
    id: "2",
    cover: { type: "external", external: { url: "/defaultproject.jpeg" } },
    properties: {
      "Name": { 
        type: "title", 
        title: [{ plain_text: "E-commerce Platform", annotations: {}, type: "text" }] 
      },
      "Description": { 
        type: "rich_text", 
        rich_text: [{ plain_text: "A full-stack e-commerce platform with payment integration.", annotations: {}, type: "text" }] 
      },
      "Github Link": { type: "url", url: "https://github.com/yourusername/ecommerce" },
      "tags": { 
        type: "multi_select", 
        multi_select: [
          { id: "4", name: "Node.js" },
          { id: "5", name: "Express" },
          { id: "6", name: "MongoDB" }
        ]
      }
    }
  }
];

// Regular Project Card
function Project({ project, index, isVisible, featured = false }: ProjectProps) {
  const delay = index * 0.15;
  
  let path = "/defaultproject.jpeg";
  if (project.cover && project.cover.type === "external") {
    path = project.cover.external.url;
  } else if (project.cover && project.cover.type === "file") {
    path = project.cover.file.url;
  }

  let projectName = "";
  if (project.properties["Name"].type === "title") {
    project.properties["Name"].title.forEach((text) => {
      projectName += text.plain_text;
    });
  }
  
  // Get all links from properties
  const links = Object.entries(project.properties)
    .filter(([key, value]) => value?.type === "url" && value.url)
    .map(([key, value]) => ({
      key,
      url: (value as any).url as string,
      isGithub: key.toLowerCase().includes('github'),
      isLive: key.toLowerCase().includes('live') || key.toLowerCase().includes('demo')
    }));

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
          src={path}
          alt={projectName}
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
          {project.properties["tags"]?.type === "multi_select" && 
            project.properties["tags"].multi_select.slice(0, featured ? 4 : 2).map((tag) => (
              <span
                key={tag.id}
                className="px-3 py-1 text-xs font-medium bg-black/60 text-white backdrop-blur-sm rounded-full border border-white/20"
              >
                {tag.name}
              </span>
            ))}
          {project.properties["tags"]?.type === "multi_select" && 
            project.properties["tags"].multi_select.length > (featured ? 4 : 2) && (
              <span className="px-3 py-1 text-xs font-medium bg-black/60 text-white backdrop-blur-sm rounded-full border border-white/20">
                +{project.properties["tags"].multi_select.length - (featured ? 4 : 2)}
              </span>
            )}
        </div>
        
        {/* Title Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
          <h3 className={`${featured ? 'text-2xl' : 'text-xl'} font-bold mb-1 group-hover:text-indigo-300 transition-colors duration-300`}>
            {project.properties["Name"].type === "title" ? (
              <Richtext text={project.properties["Name"].title} />
            ) : (
              ""
            )}
          </h3>
        </div>
      </div>
      
      <div className="p-6 flex-grow flex flex-col">
        {/* Description */}
        <div className="text-sm text-gray-600 dark:text-gray-400 mb-6 flex-grow">
          {project.properties["Description"]?.type === "rich_text" ? (
            <Richtext text={project.properties["Description"].rich_text} />
          ) : (
            ""
          )}
        </div>
        
        {/* Tech Stack */}
        {project.properties["tags"]?.type === "multi_select" && (
          <div className="mb-6">
            <h4 className="text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-2 font-semibold">Tech Stack</h4>
            <div className="flex flex-wrap gap-2">
              {project.properties["tags"].multi_select.map((tag) => (
                <span
                  key={tag.id}
                  className="inline-block bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 rounded-full px-3 py-1 text-xs font-medium"
                >
                  {tag.name}
                </span>
              ))}
            </div>
          </div>
        )}
        
        {/* Links */}
        <div className="flex flex-wrap gap-3 mt-auto">
          {links.map((link) => (
            <Link
              key={link.key}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center justify-center px-4 py-2 rounded-lg transition-all duration-300 ${
                link.isGithub 
                  ? 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600 hover:shadow-md' 
                  : link.isLive
                  ? 'bg-gradient-to-r from-indigo-600 to-indigo-700 text-white hover:from-indigo-700 hover:to-indigo-800 hover:shadow-md'
                  : 'bg-blue-500 text-white hover:bg-blue-600 hover:shadow-md'
              }`}
            >
              <FontAwesomeIcon 
                icon={link.isGithub ? faGithubBrand : faExternalLinkAlt} 
                className="mr-2" 
              />
              <span>{link.key.replace(' Link', '')}</span>
            </Link>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

// Featured Project Card (Horizontal Layout)
function FeaturedProjectHorizontal({ project, index, isVisible }: ProjectProps) {
  const delay = index * 0.15;
  
  let path = "/defaultproject.jpeg";
  if (project.cover && project.cover.type === "external") {
    path = project.cover.external.url;
  } else if (project.cover && project.cover.type === "file") {
    path = project.cover.file.url;
  }

  let projectName = "";
  if (project.properties["Name"].type === "title") {
    project.properties["Name"].title.forEach((text) => {
      projectName += text.plain_text;
    });
  }
  
  // Get all links from properties
  const links = Object.entries(project.properties)
    .filter(([key, value]) => value?.type === "url" && value.url)
    .map(([key, value]) => ({
      key,
      url: (value as any).url as string,
      isGithub: key.toLowerCase().includes('github'),
      isLive: key.toLowerCase().includes('live') || key.toLowerCase().includes('demo')
    }));

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
            src={path}
            alt={projectName}
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
              {project.properties["Name"].type === "title" ? (
                <Richtext text={project.properties["Name"].title} />
              ) : (
                ""
              )}
            </h3>
          </div>
        </div>
        
        {/* Right: Content (on mobile: bottom) */}
        <div className="p-6 md:p-8 md:w-1/2 flex flex-col">
          {/* Desktop Title (hidden on mobile) */}
          <div className="hidden md:block mb-4">
            <h3 className="text-2xl font-bold text-gray-800 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors duration-300">
              {project.properties["Name"].type === "title" ? (
                <Richtext text={project.properties["Name"].title} />
              ) : (
                ""
              )}
            </h3>
          </div>
          
          {/* Description */}
          <div className="text-gray-600 dark:text-gray-300 mb-6">
            {project.properties["Description"]?.type === "rich_text" ? (
              <Richtext text={project.properties["Description"].rich_text} />
            ) : (
              ""
            )}
          </div>
          
          {/* Tech Stack */}
          {project.properties["tags"]?.type === "multi_select" && (
            <div className="mb-8">
              <h4 className="text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-3 font-semibold">Tech Stack</h4>
              <div className="flex flex-wrap gap-2">
                {project.properties["tags"].multi_select.map((tag) => (
                  <span
                    key={tag.id}
                    className="inline-block bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 rounded-full px-3 py-1 text-xs font-medium"
                  >
                    {tag.name}
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
            {links.map((link) => (
              <Link
                key={link.key}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center justify-center px-5 py-2.5 rounded-lg transition-all duration-300 ${
                  link.isGithub 
                    ? 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600 hover:shadow-md' 
                    : link.isLive
                    ? 'bg-gradient-to-r from-indigo-600 to-indigo-700 text-white hover:from-indigo-700 hover:to-indigo-800 hover:shadow-md'
                    : 'bg-blue-500 text-white hover:bg-blue-600 hover:shadow-md'
                }`}
              >
                <FontAwesomeIcon 
                  icon={link.isGithub ? faGithubBrand : faExternalLinkAlt} 
                  className="mr-2" 
                />
                <span>{link.key.replace(' Link', '')}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function Projects() {
  const [projects, setProjects] = useState<ExtendedPageObjectResponse[]>([]);
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
        setProjects(data.results || []);
      } catch (error) {
        console.error('Error fetching projects:', error);
        // Use sample projects as fallback when API fails
        setProjects(sampleProjects as unknown as ExtendedPageObjectResponse[]);
        setError(true);
      } finally {
        setIsLoading(false);
      }
    }

    fetchProjects();
  }, []);

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

  // Group projects by section
  const groupProjectsBySection = () => {
    const sections: Record<string, ExtendedPageObjectResponse[]> = {};
    
    projects.forEach(project => {
      const section = project.properties["Section"]?.type === "select" 
        ? project.properties["Section"].select?.name || "Other Projects"
        : project.section || "Other Projects";
      
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
    console.log("Featured projects:", featured);
    
    // If no featured projects found, mark the first project as featured
    if (featured.length === 0 && projects.length > 0) {
      console.log("No featured projects found, using first project as featured");
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
              <p>Using sample project data. Connect to GitHub for real projects.</p>
            </div>
          )}
          
          {/* Featured Project Section */}
          {featuredProjects.length > 0 && (
            <div className="mb-16">
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
