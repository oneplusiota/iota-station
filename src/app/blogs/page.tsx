import { notion } from "../../utils/notion-utils";
import getEnvVar from "../../utils/utils";
import { PageObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import BlogPage from "./BlogPage";

export default async function BlogsSection() {
  //@ts-ignore
  const { results }: { results: PageObjectResponse[] } =
    await notion.databases.query({
      database_id: getEnvVar("NOTION_BLOG_DATABASE_ID"),
      filter: {
        property: "Published",
        select: {
          equals: "Published",
        },
      },
      sorts: [
        {
          property: "Created time",
          direction: "descending",
        },
      ],
    });

  return (
    <>
      <BlogPage results={results} />
    </>
  );
}
