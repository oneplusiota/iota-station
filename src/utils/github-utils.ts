import { Octokit } from "@octokit/rest";
import { remark } from "remark";
import remarkHtml from "remark-html";
import remarkParse from "remark-parse";
import matter from "gray-matter";
import getEnvVar from "./utils";

// Determine the current environment
const environment = process.env.NEXT_PUBLIC_ENV || 'local';

// Initialize Octokit only for development and production environments
const octokit = environment !== 'local' && process.env.GITHUB_TOKEN ? 
  new Octokit({
    auth: process.env.GITHUB_TOKEN,
  }) : 
  // For local environment, we'll use the local filesystem
  null;

// GitHub repository information
const owner = process.env.GITHUB_OWNER || "shivam-nayak2";
const repo = process.env.GITHUB_REPO || "iota-station";

// Path to projects directory in the repository
const projectsPath = "data/projects";

// Path to blogs directory in the repository
const blogsPath = "data/blogs";

/**
 * Fetch projects from GitHub repository or local filesystem based on environment
 */
export async function fetchProjects() {
  try {
    let projectFolders: any[] = [];
    
    if (environment !== 'local' && octokit) {
      console.log("Fetching projects from GitHub API");
      // Get the list of project folders from GitHub
      const response = await octokit.repos.getContent({
        owner,
        repo,
        path: projectsPath,
      });

      // If the response is not an array (directory), throw an error
      if (!Array.isArray(response.data)) {
        throw new Error("Projects directory not found");
      }

      // Filter for directories only
      projectFolders = response.data.filter(
        (item: any) => item.type === "dir"
      );
    } else {
      console.log("Using local projects data");
      // For local environment, read from the local filesystem
      try {
        const fs = require('fs');
        const path = require('path');
        
        // Read the directory
        const folders = fs.readdirSync(path.join(process.cwd(), projectsPath), { withFileTypes: true });
        
        // Create folder objects similar to GitHub API response
        projectFolders = folders
          .filter((dirent: any) => dirent.isDirectory())
          .map((dirent: any) => ({
            name: dirent.name,
            path: `${projectsPath}/${dirent.name}`,
            type: 'dir'
          }));
      } catch (err) {
        console.error("Error reading local projects directory:", err);
        return [];
      }
    }

    // Fetch and process each project
    const projects = await Promise.all(
      projectFolders.map(async (folder: any) => {
        try {
          let projectData: any = {};
          
          if (environment !== 'local' && octokit) {
            // Get the project.json file from GitHub
            const fileResponse = await octokit.repos.getContent({
              owner,
              repo,
              path: `${folder.path}/project.json`,
            });

            if (!("content" in fileResponse.data)) {
              throw new Error(`Project file not found: ${folder.path}/project.json`);
            }

            // Decode the base64 content
            const content = Buffer.from(fileResponse.data.content, "base64").toString();
            
            // Parse the JSON content
            projectData = JSON.parse(content);
          } else {
            // For local environment, read from the local filesystem
            try {
              const fs = require('fs');
              const path = require('path');
              const content = fs.readFileSync(
                path.join(process.cwd(), `${folder.path}/project.json`), 
                'utf8'
              );
              projectData = JSON.parse(content);
            } catch (err) {
              console.error(`Error reading local project file ${folder.path}/project.json:`, err);
              return null;
            }
          }
          
          // Process links
          const linkProperties: Record<string, any> = {};
          
          if (projectData.links && Array.isArray(projectData.links)) {
            projectData.links.forEach((link: any) => {
              if (link.type && link.url) {
                // Convert to title case for property name
                const propertyName = link.label || 
                  (link.type.charAt(0).toUpperCase() + link.type.slice(1) + " Link");
                
                linkProperties[propertyName] = {
                  type: "url",
                  url: link.url
                };
              }
            });
          }
          
          // Convert to the format expected by the components
          return {
            id: projectData.id,
            section: projectData.section || "Other Projects",
            featured: projectData.featured || false, // Include the featured flag
            cover: {
              type: "external",
              external: {
                url: projectData.screenshots && projectData.screenshots.length > 0 
                  ? `/api/project-image?path=${folder.name}/${projectData.screenshots[0]}`
                  : "/defaultproject.jpeg"
              }
            },
            properties: {
              "Name": {
                type: "title",
                title: [
                  {
                    plain_text: projectData.title,
                    annotations: {},
                    type: "text"
                  }
                ]
              },
              "Description": {
                type: "rich_text",
                rich_text: [
                  {
                    plain_text: projectData.description,
                    annotations: {},
                    type: "text"
                  }
                ]
              },
              ...linkProperties,
              "tags": {
                type: "multi_select",
                multi_select: projectData.technologies.map((tech: string, index: number) => ({
                  id: index.toString(),
                  name: tech
                }))
              },
              "Section": {
                type: "select",
                select: {
                  name: projectData.section || "Other Projects"
                }
              },
              "Featured": {
                type: "checkbox",
                checkbox: projectData.featured || false
              }
            }
          };
        } catch (error) {
          console.error(`Error processing project ${folder.name}:`, error);
          return null;
        }
      })
    );

    // Filter out any null values from failed reads and only include published projects
    return projects.filter(project => project !== null);
  } catch (error) {
    console.error("Error fetching projects:", error);
    return [];
  }
}

/**
 * Fetch all blog posts from GitHub repository or local filesystem based on environment
 */
export async function fetchBlogs() {
  try {
    let blogFiles: any[] = [];
    
    if (environment !== 'local' && octokit) {
      console.log("Fetching blogs from GitHub API");
      // Get the list of files in the blogs directory from GitHub
      const response = await octokit.repos.getContent({
        owner,
        repo,
        path: blogsPath,
      });

      // If the response is not an array (directory), throw an error
      if (!Array.isArray(response.data)) {
        throw new Error("Blogs directory not found");
      }

      // Filter for markdown files only
      blogFiles = response.data.filter(
        (file: any) => file.type === "file" && file.name.endsWith(".md")
      );
    } else {
      console.log("Using local blogs data");
      // For local environment, read from the local filesystem
      try {
        const fs = require('fs');
        const path = require('path');
        
        // Read the directory
        const files = fs.readdirSync(path.join(process.cwd(), blogsPath));
        
        // Create file objects similar to GitHub API response
        blogFiles = files
          .filter((file: string) => file.endsWith('.md'))
          .map((file: string) => ({
            name: file,
            path: `${blogsPath}/${file}`,
            type: 'file'
          }));
      } catch (err) {
        console.error("Error reading local blogs directory:", err);
        return [];
      }
    }

    // Fetch and process each blog file
    const blogs = await Promise.all(
      blogFiles.map(async (file: any) => {
        let content = '';
        
        if (environment !== 'local' && octokit) {
          // Get the file content from GitHub
          const fileResponse = await octokit.repos.getContent({
            owner,
            repo,
            path: file.path,
          });

          if (!("content" in fileResponse.data)) {
            throw new Error(`Blog file not found: ${file.path}`);
          }

          // Decode the base64 content
          content = Buffer.from(fileResponse.data.content, "base64").toString();
        } else {
          // For local environment, read from the local filesystem
          try {
            const fs = require('fs');
            const path = require('path');
            content = fs.readFileSync(path.join(process.cwd(), file.path), 'utf8');
          } catch (err) {
            console.error(`Error reading local blog file ${file.path}:`, err);
            return null;
          }
        }
        
        // Extract metadata from frontmatter
        const { metadata, markdown } = extractFrontmatter(content);
        
        return {
          id: file.name.replace(".md", ""),
          slug: file.name.replace(".md", ""),
          content: markdown,
          ...metadata,
          created_time: metadata.date || new Date().toISOString(),
        };
      })
    );

    // Filter out any null values from failed reads
    const validBlogs = blogs.filter(blog => blog !== null);

    // Sort blogs by date (newest first)
    return validBlogs.sort((a: any, b: any) => {
      return new Date(b.created_time).getTime() - new Date(a.created_time).getTime();
    });
  } catch (error) {
    console.error("Error fetching blogs:", error);
    return [];
  }
}

/**
 * Fetch a single blog post by slug from GitHub repository or local filesystem based on environment
 */
export async function fetchBlogBySlug(slug: string) {
  try {
    let content = '';
    
    if (environment !== 'local' && octokit) {
      console.log(`Fetching blog ${slug} from GitHub API`);
      // Get the blog file from GitHub
      const response = await octokit.repos.getContent({
        owner,
        repo,
        path: `${blogsPath}/${slug}.md`,
      });

      if (!("content" in response.data)) {
        throw new Error(`Blog file not found: ${slug}`);
      }

      // Decode the base64 content
      content = Buffer.from(response.data.content, "base64").toString();
    } else {
      console.log(`Using local blog data for ${slug}`);
      // For local environment, read from the local filesystem
      try {
        const fs = require('fs');
        const path = require('path');
        content = fs.readFileSync(path.join(process.cwd(), `${blogsPath}/${slug}.md`), 'utf8');
      } catch (err) {
        console.error(`Error reading local blog file ${slug}:`, err);
        return null;
      }
    }
    
    // Extract metadata from frontmatter
    const { metadata, markdown } = extractFrontmatter(content);
    
    // Convert markdown to HTML
    const processedContent = await remark()
      .use(remarkParse)
      .use(remarkHtml)
      .process(markdown);
    
    const htmlContent = processedContent.toString();

    return {
      id: slug,
      slug,
      content: markdown,
      html: htmlContent,
      title: metadata.title || slug,
      description: metadata.description || "",
      cover: metadata.cover || null,
      icon: metadata.icon || null,
      ...metadata,
      created_time: metadata.date || new Date().toISOString(),
    };
  } catch (error) {
    console.error(`Error fetching blog by slug ${slug}:`, error);
    return null;
  }
}

/**
 * Extract frontmatter metadata from markdown content
 */
function extractFrontmatter(content: string) {
  // Use gray-matter to parse frontmatter
  const { data, content: markdown } = matter(content);
  
  return {
    metadata: data,
    markdown,
  };
}
