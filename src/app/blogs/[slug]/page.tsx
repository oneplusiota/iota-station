import Image from "next/image";
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import rehypeSlug from "rehype-slug";
import rehypeStringify from "rehype-stringify";
import { load } from "cheerio";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarAlt, faUser, faClock, faTag } from "@fortawesome/free-solid-svg-icons";

export const revalidate = 3600; // Revalidate every hour

// Define types for blog data
interface BlogFrontmatter {
  title?: string;
  description?: string;
  date?: string;
  author?: string;
  cover?: string;
  icon?: string;
  tags?: string[];
  featured?: boolean;
}

interface BlogData {
  id: string;
  slug: string;
  title: string;
  description: string;
  date: string;
  author: string;
  cover: string;
  icon: string | null;
  tags: string[];
  featured: boolean;
  content: string;
  html?: string;
}

export default async function Blog({ params }: { params: { slug: string } }) {
  try {
    // Determine the current environment
    const environment = process.env.NEXT_PUBLIC_ENV || 'local';
    let blogData: BlogData | null = null;
    let htmlContent = '';
    
    if (environment === 'local') {
      // Local environment: Read from the data/blogs directory
      console.log(`Using local blog data for ${params.slug}`);
      
      // Get the file path
      const filePath = path.join(process.cwd(), 'data/blogs', `${params.slug}.md`);
      
      // Check if the file exists
      if (!fs.existsSync(filePath)) {
        throw new Error(`Blog post not found: ${params.slug}`);
      }
      
      // Read the file content
      const fileContent = fs.readFileSync(filePath, 'utf8');
      
      // Parse the frontmatter and content
      const { data: frontmatter, content: markdownContent } = matter(fileContent);
      
      // Use a more direct approach to convert markdown to HTML
      try {
        // Import the remark and remark-html libraries directly
        const { remark } = await import('remark');
        const remarkHtml = await import('remark-html');
        
        // Process the markdown content
        const processedContent = await remark()
          .use(remarkHtml.default)
          .process(markdownContent);
        
        htmlContent = processedContent.toString();
      } catch (err) {
        console.error("Error processing markdown:", err);
        // Fallback to simple HTML if processing fails
        htmlContent = `<div><pre>${markdownContent}</pre></div>`;
      }
      
      // Create blog data object
      blogData = {
        id: params.slug,
        slug: params.slug,
        title: frontmatter.title || params.slug,
        description: frontmatter.description || '',
        date: frontmatter.date || new Date().toISOString(),
        author: frontmatter.author || 'Shivam Nayak',
        cover: frontmatter.cover || '/defaultproject.jpeg',
        icon: frontmatter.icon || null,
        tags: frontmatter.tags || [],
        featured: frontmatter.featured || false,
        content: markdownContent,
        html: htmlContent
      };
    } else {
      // Development or production environment: Use API call
      console.log(`Fetching blog ${params.slug} from API`);
      
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL || ''}/api/blogs/${params.slug}`,
        { next: { revalidate } }
      );
      
      if (!response.ok) {
        throw new Error(`Failed to fetch blog: ${response.status}`);
      }
      
      const data = await response.json();
      blogData = data.page || null;
      htmlContent = data.html || '';
    }
    
    if (!blogData) {
      throw new Error(`Blog post data not found: ${params.slug}`);
    }
    
    // Add table of contents
    const $ = load(htmlContent);
    
    // Add IDs to headings if they don't already have them
    $('h1, h2, h3').each((i, el) => {
      const $el = $(el);
      if (!$el.attr('id')) {
        const id = $el.text().toLowerCase().replace(/[^\w]+/g, '-');
        $el.attr('id', id);
      }
    });
    
    // Generate table of contents
    let tocContent = '<ul class="space-y-2">';
    $('h1, h2, h3').each((i, el) => {
      const $el = $(el);
      const id = $el.attr('id');
      const text = $el.text();
      const tagName = el.tagName.toLowerCase();
      
      // Add indentation based on heading level
      const indent = tagName === 'h1' ? '' : tagName === 'h2' ? 'ml-4' : 'ml-8';
      
      tocContent += `<li class="${indent}">
        <a href="#${id}" class="text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-300 transition-colors duration-200">
          ${text}
        </a>
      </li>`;
    });
    tocContent += '</ul>';
    
    // If no headings were found, set tocContent to null
    if ($('h1, h2, h3').length === 0) {
      tocContent = '';
    }
    
    const content = $.html();
    
    // Format date
    const formattedDate = blogData.date 
      ? new Date(blogData.date).toLocaleDateString('en-US', { 
          year: 'numeric', 
          month: 'long', 
          day: 'numeric' 
        })
      : null;
    
    // Calculate read time using the same deterministic approach as the blog list page
    // This ensures consistency between list and detail views
    const readTimeMinutes = Math.max(5, Math.ceil((blogData.slug.length % 10) + 5));
    const readTime = `${readTimeMinutes} min read`;

    return (
      <div className="container mx-auto px-6 py-16 max-w-6xl">
        <div className="w-full flex justify-center items-center flex-col mb-12">
          {/* Cover Image */}
          <div className="w-full h-[25rem] relative rounded-2xl overflow-hidden mb-8">
            <Image
              src={blogData.cover || "/defaultproject.jpeg"}
              alt={blogData.title || "Blog post cover image"}
              fill
              className="object-cover"
              quality={100}
              sizes="(max-width: 768px) 100vw, 1200px"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
            
            {/* Title Overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
              <div className="flex items-center mb-4">
                {blogData.icon && (
                  <span className="text-3xl mr-3">{blogData.icon}</span>
                )}
                <h1 className="text-4xl md:text-5xl font-bold">{blogData.title}</h1>
              </div>
              
              {blogData.description && (
                <p className="text-lg text-gray-200 max-w-3xl mt-2">{blogData.description}</p>
              )}
            </div>
          </div>
          
          {/* Meta Information */}
          <div className="flex flex-wrap items-center justify-center gap-6 mb-8 text-gray-600 dark:text-gray-400">
            {blogData.author && (
              <div className="flex items-center">
                <FontAwesomeIcon icon={faUser} className="mr-2" />
                <span>{blogData.author}</span>
              </div>
            )}
            
            {formattedDate && (
              <div className="flex items-center">
                <FontAwesomeIcon icon={faCalendarAlt} className="mr-2" />
                <span>{formattedDate}</span>
              </div>
            )}
            
            <div className="flex items-center">
              <FontAwesomeIcon icon={faClock} className="mr-2" />
              <span>{readTime}</span>
            </div>
          </div>
          
          {/* Tags */}
          {blogData.tags && blogData.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 justify-center mb-8">
              {blogData.tags.map((tag: string, index: number) => (
                <span 
                  key={index}
                  className="px-3 py-1 text-sm font-medium bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 rounded-full"
                >
                  <FontAwesomeIcon icon={faTag} className="mr-1.5 text-xs" />
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
        
        <div className="flex justify-center md:items-start md:flex-row flex-col-reverse items-center gap-12">
          {/* Main Content */}
          <div className="w-full md:w-2/3">
            <div
              className="prose prose-lg dark:prose-invert max-w-none 
                prose-headings:font-bold prose-headings:text-gray-800 dark:prose-headings:text-white 
                prose-p:text-gray-700 dark:prose-p:text-gray-200 
                prose-a:text-indigo-600 dark:prose-a:text-indigo-300 
                prose-strong:text-gray-800 dark:prose-strong:text-white
                prose-code:text-gray-800 dark:prose-code:text-gray-200
                prose-code:bg-gray-100 dark:prose-code:bg-gray-800
                prose-pre:bg-gray-100 dark:prose-pre:bg-gray-800
                prose-pre:text-gray-800 dark:prose-pre:text-gray-200
                prose-ol:text-gray-700 dark:prose-ol:text-gray-200
                prose-ul:text-gray-700 dark:prose-ul:text-gray-200
                prose-li:text-gray-700 dark:prose-li:text-gray-200
                prose-img:rounded-xl"
              dangerouslySetInnerHTML={{ __html: content }}
            />
          </div>
          
          {/* Table of Contents */}
          <div className="w-full md:w-1/3 md:sticky md:top-24 self-start">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 border border-gray-100 dark:border-gray-700">
              <h4 className="text-xl font-bold mb-4 text-gray-800 dark:text-gray-200">Table of Contents</h4>
              {tocContent ? (
                <div 
                  className="toc-content text-gray-700 dark:text-gray-300"
                  dangerouslySetInnerHTML={{ __html: tocContent }} 
                />
              ) : (
                <p className="text-gray-500 dark:text-gray-400 italic">No table of contents available</p>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error("Error fetching blog post:", error);
    return (
      <div className="container mx-auto px-6 py-16 max-w-6xl text-center">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-12 border border-gray-100 dark:border-gray-700">
          <h2 className="text-3xl font-bold mb-4 text-gray-800 dark:text-gray-200">Blog Post Not Found</h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
            Sorry, we couldn&apos;t find the blog post you&apos;re looking for.
          </p>
          <a 
            href="/blogs" 
            className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors duration-300"
          >
            Back to All Blogs
          </a>
        </div>
      </div>
    );
  }
}
