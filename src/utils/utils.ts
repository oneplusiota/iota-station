import { BlockObjectResponse } from "@notionhq/client/build/src/api-endpoints";
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

export const readTimeCalculator = (results: BlockObjectResponse[]) => {
  let words = "";
  results.forEach((result) => {
    if (result.type == "paragraph") {
      result.paragraph.rich_text.forEach((text) => {
        words += text.plain_text;
      });
    } else if (result.type == "heading_1") {
      result.heading_1.rich_text.forEach((text) => {
        words += text.plain_text;
      });
    } else if (result.type == "heading_2") {
      result.heading_2.rich_text.forEach((text) => {
        words += text.plain_text;
      });
    } else if (result.type == "heading_3") {
      result.heading_3.rich_text.forEach((text) => {
        words += text.plain_text;
      });
    } else if (result.type == "bulleted_list_item") {
      result.bulleted_list_item.rich_text.forEach((text) => {
        words += text.plain_text;
      });
    } else if (result.type == "code") {
      result.code.rich_text.forEach((text) => {
        words += text.plain_text;
      });
    } else if (result.type == "numbered_list_item") {
      result.numbered_list_item.rich_text.forEach((text) => {
        words += text.plain_text;
      });
    }
  });

  const readingTime = readTime(words).time;
  return readingTime;
};

// validate env variables
export default function getEnvVar(v: string): string {
  const ret = process.env[v];
  if (!ret) {
    throw new Error("process.env." + v + " is undefined!");
  }
  return ret;
}
