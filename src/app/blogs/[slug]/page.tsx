import { notion } from "@/src/utils/notion-utils";
import { NotionRenderer } from "@notion-render/client";

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
