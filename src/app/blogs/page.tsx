import React from "react";
import { fetchBlogs } from "../../utils/github-utils";
import BlogPage from "./BlogPage";

// Use static rendering with server-side data fetching
export const dynamic = 'error';
export const dynamicParams = false;
export const revalidate = false;
export const fetchCache = 'force-cache';
export const runtime = 'nodejs';
export const preferredRegion = 'auto';

export default async function Blogs() {
  // Fetch blogs server-side
  const blogs = await fetchBlogs();
  
  return (
    <div className="container mx-auto px-6 py-16 max-w-6xl">
      <BlogPage results={blogs} />
    </div>
  );
}
