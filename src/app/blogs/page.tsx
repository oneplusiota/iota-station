"use client";
import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarAlt, faClock, faArrowRight, faSearch, faTimes } from "@fortawesome/free-solid-svg-icons";

type Blog = {
  id: string;
  slug: string;
  title: string;
  description?: string;
  date: string;
  readTime?: string;
  tags: string[];
  coverImage?: string;
  author?: string;
};

// Blog Card - Direct link to blog post
function BlogCard({ blog, index, isVisible }: { blog: Blog; index: number; isVisible: boolean }) {
  const delay = index * 0.15;
  
  return (
    <Link href={`/blogs/${blog.slug}`} className="block h-full">
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ duration: 0.6, delay }}
        className="group bg-white dark:bg-gray-900 rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 h-full flex flex-col border border-gray-200 dark:border-gray-800 hover:border-indigo-500 relative"
      >
        <div className="p-5 flex-grow flex flex-col">
          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-3">
            {blog.tags.slice(0, 2).map((tag, idx) => (
              <span
                key={idx}
                className="inline-block bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full px-3 py-1 text-xs font-medium"
              >
                {tag}
              </span>
            ))}
            {blog.tags.length > 2 && (
              <span className="inline-block bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full px-3 py-1 text-xs font-medium">
                +{blog.tags.length - 2}
              </span>
            )}
          </div>
          
          {/* Title */}
          <h3 className="text-xl font-bold mb-3 text-gray-800 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors duration-300">
            {blog.title}
          </h3>
          
          {/* Meta Info */}
          <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-4 space-x-4">
            {blog.date && (
              <div className="flex items-center">
                <FontAwesomeIcon icon={faCalendarAlt} className="mr-1.5 text-gray-400 dark:text-gray-500" />
                <span>{new Date(blog.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}</span>
              </div>
            )}
            
            {blog.readTime && (
              <div className="flex items-center">
                <FontAwesomeIcon icon={faClock} className="mr-1.5 text-gray-400 dark:text-gray-500" />
                <span>{blog.readTime}</span>
              </div>
            )}
          </div>
          
          {/* Description */}
          {blog.description && (
            <p className="text-sm text-gray-700 dark:text-gray-300 mb-5 flex-grow line-clamp-3">
              {blog.description}
            </p>
          )}
          
          {/* Read Article Button */}
          <div className="flex justify-center mt-auto">
            <div className="flex items-center justify-center text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors duration-200 font-medium">
              <span>Read article</span>
              <FontAwesomeIcon icon={faArrowRight} className="ml-2" />
            </div>
          </div>
        </div>
      </motion.div>
    </Link>
  );
}

export default function BlogsPage() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    async function fetchBlogs() {
      try {
        // Use the API route for both local and production environments
        const response = await fetch('/api/blogs', { cache: 'no-store' });
        
        if (!response.ok) {
          throw new Error(`Failed to fetch blogs: ${response.status}`);
        }
        
        const data = await response.json();
        console.log("Fetched blogs data:", data);
        
        if (!data || !data.results) {
          throw new Error("Invalid data format received from API");
        }
        
        // Transform the blogs to match our Blog type
        const transformedBlogs = data.results.map((blog: any) => ({
          id: blog.id,
          slug: blog.slug,
          title: blog.title || "Untitled Blog",
          description: blog.description || "",
          date: blog.created_time || new Date().toISOString(),
          readTime: blog.readTime || `${Math.ceil(blog.content?.length / 1500)} min read`,
          tags: blog.tags || [],
          coverImage: blog.cover || null,
          author: blog.author || "Shivam Nayak"
        }));
        
        setBlogs(transformedBlogs);
      } catch (error) {
        console.error('Error fetching blogs:', error);
        setError(true);
      } finally {
        setIsLoading(false);
      }
    }

    fetchBlogs();
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

  // Add "Featured" tag if it doesn't exist
  useEffect(() => {
    if (blogs.length > 0 && !blogs.some(blog => blog.tags && blog.tags.includes('Featured'))) {
      // Create a copy of blogs array with the first blog marked as featured
      const updatedBlogs = [...blogs];
      updatedBlogs[0].tags = [...(updatedBlogs[0].tags || []), 'Featured'];
      setBlogs(updatedBlogs);
    }
  }, [blogs]);

  // Filter blogs based on search query and selected tag
  const filteredBlogs = blogs.filter(blog => {
    const matchesSearch = searchQuery === "" || 
      blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (blog.description && blog.description.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesTag = selectedTag === null || (blog.tags && blog.tags.includes(selectedTag));
    
    return matchesSearch && matchesTag;
  });

  // Get all unique tags from blogs
  const allTags = Array.from(new Set(blogs.flatMap(blog => blog.tags || [])));

  return (
    <div ref={sectionRef} className="container mx-auto px-6 py-16 max-w-6xl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-6"
      >
        <h1 className="text-4xl font-bold mb-4 text-gray-800 dark:text-white relative inline-block">
          My Blog
          <div className="absolute -bottom-2 left-0 w-24 h-1.5 bg-indigo-600 rounded-full"></div>
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 mt-4">
          Thoughts, stories and ideas about web development, design patterns and computer science. Posted {blogs.length} articles so far.
        </p>
      </motion.div>
      
      {/* Search and Filter */}
      {!isLoading && blogs.length > 0 && (
        <div className="mb-12">
          {/* Search Bar */}
          <div className="relative mb-6">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FontAwesomeIcon icon={faSearch} className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
              >
                <FontAwesomeIcon icon={faTimes} />
              </button>
            )}
          </div>
          
          {/* Tag Filter */}
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
            
            {allTags.map(tag => (
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
              <p>Failed to load blog posts. Please try again later.</p>
            </div>
          )}
          
          {/* Featured Articles */}
          {filteredBlogs.some(blog => blog.tags && blog.tags.includes('Featured')) && (
            <div className="mb-16">
              <h2 className="text-2xl font-bold mb-8 text-gray-800 dark:text-white flex items-center">
                <span className="mr-2">✨</span> Featured Articles
                <div className="w-16 h-1 bg-indigo-600 ml-4 rounded-full"></div>
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {filteredBlogs
                  .filter(blog => blog.tags && blog.tags.includes('Featured'))
                  .map((blog, index) => (
                    <BlogCard
                      key={blog.id}
                      blog={blog}
                      index={index}
                      isVisible={isVisible}
                    />
                  ))}
              </div>
            </div>
          )}
          
          {/* All Articles */}
          <div className="mb-16">
            <h2 className="text-2xl font-bold mb-8 text-gray-800 dark:text-white">
              {selectedTag ? `Articles: ${selectedTag}` : "All Articles"}
              <div className="w-16 h-1 bg-indigo-600 mt-2 rounded-full"></div>
            </h2>
            
            {filteredBlogs.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredBlogs.map((blog, index) => (
                  <BlogCard
                    key={blog.id}
                    blog={blog}
                    index={index}
                    isVisible={isVisible}
                  />
                ))}
              </div>
            ) : (
              <div className="p-6 bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 text-center">
                <p className="text-gray-500 dark:text-gray-400">No articles match your search criteria.</p>
                <button
                  onClick={() => {
                    setSearchQuery("");
                    setSelectedTag(null);
                  }}
                  className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors duration-200"
                >
                  Reset Filters
                </button>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}
