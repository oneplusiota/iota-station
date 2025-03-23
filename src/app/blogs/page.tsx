"use client";
import React, { useEffect, useState } from "react";
import BlogPage from "./BlogPage";

export const dynamic = 'force-static';

export default function Blogs() {
  const [blogs, setBlogs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchBlogs() {
      try {
        const response = await fetch('/api/blogs');
        if (!response.ok) {
          throw new Error('Failed to fetch blogs');
        }
        const data = await response.json();
        setBlogs(data.results || []);
      } catch (error) {
        console.error('Error fetching blogs:', error);
        setBlogs([]);
      } finally {
        setIsLoading(false);
      }
    }

    fetchBlogs();
  }, []);

  if (isLoading) {
    return (
      <div className="container mx-auto px-6 py-16 max-w-6xl flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-6 py-16 max-w-6xl">
      <BlogPage results={blogs} />
    </div>
  );
}
