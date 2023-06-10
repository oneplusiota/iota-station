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

// validate env variables
export default function getEnvVar(v: string): string {
  const ret = process.env[v];
  if (!ret) {
    throw new Error("process.env." + v + " is undefined!");
  }
  return ret;
}
