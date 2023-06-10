import { notion } from "@/src/utils/notion-utils";
import getEnvVar from "@/src/utils/utils";
import { NotionRenderer } from "@notion-render/client";

export async function generateStaticParams() {
  const blogs = await notion.databases.query({
    database_id: getEnvVar("NOTION_DATABASE_ID"),
    filter: {
      property: "Published",
      select: {
        equals: "Published",
      },
    },
    sorts: [
      {
        property: "Created time",
        direction: "ascending",
      },
    ],
  });

  return blogs.results.map((blog) => ({
    slug: blog.id,
  }));
}

export default async function Blog({ params }: { params: { slug: string } }) {
  const { results } = await notion.blocks.children.list({
    block_id: params.slug,
  });

  const renderer = new NotionRenderer();
  // @ts-ignore
  const html = await renderer.render(...results);

  return (
    <div className="notion-render" dangerouslySetInnerHTML={{ __html: html }} />
  );
}
