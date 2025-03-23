import Image from "next/image";
import Link from "next/link";
import React from "react";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarAlt, faUser, faArrowRight, faClock, faTag } from "@fortawesome/free-solid-svg-icons";

export default function Blog({ blog }: { blog: any }) {
  let path = blog.cover || "/defaultproject.jpeg";
  let author = blog.author || "Shivam Nayak";
  let title = blog.title || "";
  let description = blog.description || "";
  let date = blog.date || blog.created_time || new Date().toISOString();
  let tags = blog.tags || [];
  // Use the readTime passed from the parent component
  let readTime = blog.readTime || `${Math.max(5, Math.ceil((blog.slug?.length || 0) % 10) + 5)} min read`;

  // Format date
  const formattedDate = new Date(date).toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric' 
  });

  return (
    <motion.div 
      whileHover={{ y: -5 }}
      className="h-full"
    >
      <Link
        href={`/blogs/${blog.slug || blog.id}`}
        className="group bg-white dark:bg-gray-900 rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col h-full border border-gray-200 dark:border-gray-800 hover:border-indigo-500 relative"
      >
        {/* Featured Tag - Show if blog is featured */}
        {blog.featured && (
          <div className="absolute top-4 right-4 z-20 bg-amber-500 text-white text-xs font-semibold px-5 py-1.5 rounded-full shadow-md pointer-events-none">
            Featured
          </div>
        )}
        
        <div className="relative h-56 overflow-hidden">
          {/* Blog Image */}
          <Image
            src={path}
            alt={title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
          
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
          
          {/* Tags Overlay */}
          {tags.length > 0 && (
            <div className="absolute top-4 left-4 z-10 flex flex-wrap gap-2">
              {tags.slice(0, 2).map((tag: string, index: number) => (
                <span 
                  key={index}
                  className="px-3 py-1 text-xs font-medium bg-black/60 text-white backdrop-blur-sm rounded-full border border-white/20"
                >
                  {tag}
                </span>
              ))}
              {tags.length > 2 && (
                <span className="px-3 py-1 text-xs font-medium bg-black/60 text-white backdrop-blur-sm rounded-full border border-white/20">
                  +{tags.length - 2}
                </span>
              )}
            </div>
          )}
          
          {/* Title Overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
            <h3 className="text-xl font-bold mb-1 line-clamp-2 group-hover:text-indigo-300 transition-colors duration-300">
              {blog.icon && <span className="mr-2">{blog.icon}</span>}
              {title}
            </h3>
          </div>
        </div>
        
        <div className="p-5 flex-grow flex flex-col">
          {/* Meta Information */}
          <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 mb-4 border-b border-gray-200 dark:border-gray-800 pb-4">
            <div className="flex items-center">
              <FontAwesomeIcon icon={faUser} className="mr-1.5" />
              <span>{author}</span>
            </div>
            <div className="flex items-center">
              <FontAwesomeIcon icon={faCalendarAlt} className="mr-1.5" />
              <span>{formattedDate}</span>
            </div>
            <div className="flex items-center">
              <FontAwesomeIcon icon={faClock} className="mr-1.5" />
              <span>{readTime}</span>
            </div>
          </div>
          
          {/* Description */}
          <p className="text-sm text-gray-700 dark:text-gray-300 mb-5 flex-grow line-clamp-3">
            {description}
          </p>
          
          {/* Read More Button */}
          <div className="mt-auto">
            <div className="inline-flex items-center text-indigo-600 dark:text-indigo-400 font-medium text-sm group-hover:text-indigo-700 dark:group-hover:text-indigo-300 transition-colors duration-300">
              <span className="mr-2">Read article</span>
              <FontAwesomeIcon icon={faArrowRight} className="group-hover:translate-x-1.5 transition-transform duration-300" />
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
