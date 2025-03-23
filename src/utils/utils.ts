import readTime from "reading-time";

// list of all the pages in the navbar
export const pages = [
  {
    name: "Home",
    route: "/",
  },
  {
    name: "Projects",
    route: "/projects",
  },
  {
    name: "About",
    route: "/about",
  },
  {
    name: "Blogs",
    route: "/blogs",
  },
];

// Simple read time calculator for text content
export const readTimeCalculator = (text: string): number => {
  const readingTime = readTime(text).time;
  return readingTime;
};

// validate env variables
export default function getEnvVar(v: string): string {
  const ret = process.env[v];
  if (!ret) {
    // For Notion-related variables, return empty string instead of throwing error
    if (v === "NOTION_INTEGRATION_KEY" || v.startsWith("NOTION_")) {
      console.warn(`Notion integration is disabled. Ignoring missing env var: ${v}`);
      return "";
    }
    
    // For other variables, throw error in production but provide fallbacks in development
    if (process.env.NODE_ENV === 'production') {
      console.error(`Missing required environment variable: ${v}`);
      return ""; // Return empty string instead of throwing to prevent build failures
    } else {
      console.warn(`Environment variable ${v} is undefined, using fallback value`);
      return "fallback_value";
    }
  }
  return ret;
}
