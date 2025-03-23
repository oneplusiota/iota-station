"use client";
import Blog from "./Blog";
import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faTimes, faFilter, faSort, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

type Props = { results: any[] };

// Define categories for filtering
const categories = [
  "All",
  "Web Development",
  "Design Patterns",
  "Computer Science",
  "JavaScript",
  "React",
  "Next.js"
];

// Blog Modal Component
function BlogModal({ blog, onClose }: { blog: any; onClose: () => void }) {
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
  
  // Format date
  const formattedDate = new Date(blog.date || blog.created_time || new Date()).toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric' 
  });
  
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
              {blog.icon && <span className="mr-2">{blog.icon}</span>}
              {blog.title || ""}
            </h2>
            
            {/* Featured Badge */}
            {blog.featured && (
              <span className="inline-block bg-gradient-to-r from-amber-500 to-amber-600 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-md mt-2">
                Featured Article
              </span>
            )}
            
            {/* Author and Date */}
            <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mt-2 space-x-4">
              <span>{blog.author || "Shivam Nayak"}</span>
              <span>•</span>
              <span>{formattedDate}</span>
              <span>•</span>
              <span>{blog.readTime}</span>
            </div>
          </div>
        </div>
        
        {/* Modal Content */}
        <div className="p-6 overflow-y-auto">
          {/* Description */}
          <div className="text-gray-700 dark:text-gray-300 mb-6">
            {blog.description || ""}
          </div>
          
          {/* Tags */}
          {blog.tags && blog.tags.length > 0 && (
            <div className="mb-8">
              <h4 className="text-sm uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-3 font-semibold">Topics</h4>
              <div className="flex flex-wrap gap-2">
                {blog.tags.map((tag: string, idx: number) => (
                  <span
                    key={idx}
                    className="inline-block bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full px-3 py-1 text-sm font-medium"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}
          
          {/* Read Full Article Button */}
          <div className="flex justify-center mt-8">
            <a 
              href={`/blogs/${blog.slug || blog.id}`}
              className="flex items-center justify-center px-6 py-3 rounded-xl bg-indigo-600 text-white hover:bg-indigo-700 transition-colors duration-200"
            >
              Read Full Article
            </a>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default function BlogPage({ results }: Props) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("newest");
  const [showFilters, setShowFilters] = useState(false);
  const [selectedBlog, setSelectedBlog] = useState<any | null>(null);
  const focusRef = useRef<HTMLInputElement>(null);
  
  // Add readTime to blogs and respect existing featured flag
  const enhancedResults = results.map((blog, index) => ({
    ...blog,
    // Use existing featured flag if present, otherwise mark first blog as featured
    featured: blog.featured !== undefined ? blog.featured : index === 0,
    // Use a deterministic approach for read time to avoid hydration errors
    readTime: blog.readTime || `${Math.max(5, Math.ceil((blog.slug?.length || 0) % 10) + 5)} min read`
  }));
  
  // Filter blogs based on search term and category
  const filteredBlogs = enhancedResults.filter((blog) => {
    const matchesSearch = blog.title
      ? blog.title.toLowerCase().includes(searchTerm.toLowerCase())
      : blog.slug.toLowerCase().includes(searchTerm.toLowerCase());
      
    const matchesCategory = selectedCategory === "All" || 
      (blog.tags && blog.tags.some((tag: string) => 
        tag.toLowerCase() === selectedCategory.toLowerCase()
      ));
      
    return matchesSearch && matchesCategory;
  });
  
  // Sort blogs
  const sortedBlogs = [...filteredBlogs].sort((a, b) => {
    const dateA = new Date(a.date || a.created_time || new Date());
    const dateB = new Date(b.date || b.created_time || new Date());
    
    if (sortBy === "newest") {
      return dateB.getTime() - dateA.getTime();
    } else if (sortBy === "oldest") {
      return dateA.getTime() - dateB.getTime();
    } else if (sortBy === "title") {
      return (a.title || "").localeCompare(b.title || "");
    }
    
    return 0;
  });
  
  // Get featured blogs
  const featuredBlogs = enhancedResults.filter(blog => blog.featured);

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };
  
  const clearSearch = () => {
    setSearchTerm("");
    if (focusRef.current) {
      focusRef.current.focus();
    }
  };
  
  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
  };
  
  const handleSortChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setSortBy(e.target.value);
  };
  
  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  return (
    <div className="container mx-auto px-6 py-16 max-w-6xl">
      {/* Header Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4 relative inline-block text-gray-800 dark:text-white">
          My Blog
          <div className="absolute -bottom-2 left-0 w-24 h-1.5 bg-indigo-600 rounded-full"></div>
        </h1>
        <p className="text-lg font-light mt-6 mb-8 max-w-2xl mx-auto text-gray-600 dark:text-gray-300">
          Thoughts, stories and ideas about web development, design patterns and
          computer science. Posted{" "}
          <span className="font-semibold text-indigo-600 dark:text-indigo-400">{results.length} articles</span> so far.
        </p>
      </div>
      
      {/* Featured Blogs Section - Only show if there are featured blogs */}
      {featuredBlogs.length > 0 && (
        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white flex items-center">
            <span className="mr-2">✨</span> Featured Articles
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {featuredBlogs.slice(0, 2).map((blog) => (
              <div key={`featured-${blog.id}`} onClick={() => setSelectedBlog(blog)} className="cursor-pointer">
                <Blog blog={blog} />
              </div>
            ))}
          </div>
        </div>
      )}
      
      {/* Search and Filter Section */}
      <div className="mb-10 bg-white dark:bg-gray-900 rounded-2xl shadow-md p-6 border border-gray-200 dark:border-gray-800">
        <div className="flex justify-between items-center gap-4 mb-6">
          {/* Search Input */}
          <div className="relative flex-grow max-w-xl">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FontAwesomeIcon icon={faSearch} className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search articles..."
              ref={focusRef}
              value={searchTerm}
              onChange={handleSearch}
              className="w-full pl-10 pr-10 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-700 dark:text-white"
            />
            {searchTerm && (
              <button 
                onClick={clearSearch}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
              >
                <FontAwesomeIcon icon={faTimes} />
              </button>
            )}
          </div>
          
          <div className="flex items-center gap-4">
            {/* Filter Toggle Button */}
            <button
              onClick={toggleFilters}
              className="flex items-center justify-center px-5 py-3 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-white rounded-xl hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200"
            >
              <FontAwesomeIcon icon={faFilter} className="mr-2" />
              <span>Filters</span>
            </button>
            
            {/* Sort Dropdown */}
            <div className="relative">
              <select
                value={sortBy}
                onChange={handleSortChange}
                className="appearance-none bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-white rounded-xl px-5 py-3 pr-10 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="title">Title (A-Z)</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-400">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </div>
            </div>
          </div>
        </div>
        
        {/* Expandable Filter Section */}
        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-300 mb-3">Categories</h3>
                <div className="flex flex-wrap gap-2">
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => handleCategoryChange(category)}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${
                        selectedCategory === category
                          ? "bg-indigo-600 text-white"
                          : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      
      {/* Results Count */}
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
          {selectedCategory === "All" ? "All Articles" : selectedCategory} <span className="text-gray-500 dark:text-gray-400 font-normal">({sortedBlogs.length})</span>
        </h2>
      </div>
      
      {/* Blog Grid */}
      {sortedBlogs.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {sortedBlogs.map((blog) => (
            <div key={blog.id} onClick={() => setSelectedBlog(blog)} className="cursor-pointer">
              <Blog blog={blog} />
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800">
          <div className="text-5xl mb-4">🔍</div>
          <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white">No articles found</h3>
          <p className="text-gray-500 dark:text-gray-400 mb-6">Try adjusting your search or filter criteria</p>
          <button 
            onClick={() => {
              setSearchTerm("");
              setSelectedCategory("All");
              setShowFilters(false);
            }}
            className="px-6 py-2.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors duration-200"
          >
            Reset filters
          </button>
        </div>
      )}
      
      {/* Blog Modal */}
      {selectedBlog && (
        <BlogModal 
          blog={selectedBlog} 
          onClose={() => setSelectedBlog(null)} 
        />
      )}
    </div>
  );
}
