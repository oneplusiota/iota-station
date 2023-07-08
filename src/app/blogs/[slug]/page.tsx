import Richtext from "@/src/components/notion-components/Richtext";
import { notion } from "@/src/utils/notion-utils";
import { NotionRenderer } from "@notion-render/client";
import {
  BlockObjectResponse,
  ListBlockChildrenResponse,
  PageObjectResponse,
} from "@notionhq/client/build/src/api-endpoints";
import Image from "next/image";
import { unified } from "unified";
import parse from "rehype-parse";
import slug from "rehype-slug";
import stringify from "rehype-stringify";
import toc from "@jsdevtools/rehype-toc";
import remark from "remark-rehype";
import highlight from "rehype-highlight";
import { load } from "cheerio";

export const revalidate = 10;

export default async function Blog({ params }: { params: { slug: string } }) {
  //@ts-ignore
  let { results }: { results: BlockObjectResponse[] } =
    await notion.blocks.children.list({
      block_id: params.slug,
    });
  const page = (await notion.pages.retrieve({
    page_id: params.slug,
  })) as PageObjectResponse;

  let path = "/defaultproject.jpeg";
  if (page.cover && page.cover.type == "external") {
    path = page.cover.external.url;
  } else if (page.cover && page.cover.type == "file") {
    path = page.cover.file.url;
  }

  const renderer = new NotionRenderer();
  // @ts-ignore
  const html = await renderer.render(...results);

  const table = await unified()
    .use(stringify)
    .use(parse)
    .use(slug)
    // .use(remark)
    // .use(highlight, { ignoreMissing: true })
    .use(toc, {
      headings: ["h1", "h2", "h3"],
    })
    .process(html);

  const $ = load(table.toString());
  const tocContent = $("nav.toc").html() as string;
  $("nav.toc").remove();

  const content = $.html();

  return (
    <div className="container mt-24">
      <div className="md:shrink-0 w-full flex justify-center items-center flex-col">
        <div className="md:w-5/6 w-[95%] md:h-[25rem] h-[15rem] relative">
          <Image
            src={path}
            alt="blog image"
            fill
            className="object-cover !relative rounded-2xl"
            quality={100}
          />
        </div>
        <h2 className="text-3xl mt-2 text-center">
          {page.icon?.type === "emoji" ? page.icon.emoji : "👾"} -{" "}
          {page.properties["Name"].type === "title" ? (
            <Richtext text={page.properties["Name"].title} />
          ) : (
            ""
          )}
        </h2>
      </div>
      <div className="flex justify-center md:items-baseline md:flex-row flex-col-reverse items-center">
        <div className="flex justify-center overflow-y-scroll hide-scroll">
          <div
            className="notion-render w-full max-w-[80%] md:w-2/3"
            dangerouslySetInnerHTML={{ __html: content }}
          />
        </div>
        <div className="hidden md:block w-full md:w-1/3 overflow-y-hidden hide-scroll sticky top-20">
          <h4 className="text-xl font-bold">Table Of Contents</h4>
          <div dangerouslySetInnerHTML={{ __html: tocContent }} />
        </div>
      </div>
    </div>
  );
}
