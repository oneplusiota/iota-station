import Image from "next/image";
import { notion } from "../../utils/notion-utils";
import getEnvVar from "../../utils/utils";
import Link from "next/link";

function Blog({ blog }: { blog: any }) {
  return (
    <div className="max-w-lg mx-auto">
      <div className="bg-white shadow-md border border-gray-200 rounded-lg max-w-sm mb-5">
        <Link href={`/blogs/${blog.id}`}>
          <Image
            className="rounded-t-lg"
            src={blog.cover.external.url}
            alt=""
            width={300}
            height={200}
          />
        </Link>
        <div className="p-5">
          <Link href={`/blogs/${blog.id}`}>
            <h5 className="text-gray-900 font-bold text-2xl tracking-tight mb-2">
              {blog.icon.emoji} - {blog.properties.Name.title[0].plain_text}
            </h5>
          </Link>
          <p className="font-normal text-gray-700 mb-3">
            Here are the biggest enterprise technology acquisitions of 2021 so
            far, in reverse chronological order.
          </p>
          <Link
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-3 py-2 text-center inline-flex items-center"
            href={`/blogs/${blog.id}`}
          >
            Read more
          </Link>
        </div>
      </div>
    </div>
  );
}

export default async function BlogsPage() {
  const blogs = await notion.databases.query({
    database_id: getEnvVar("NOTION_BLOG_DATABASE_ID"),
    filter: {
      property: "Published",
      select: {
        equals: "Published",
      },
    },
    sorts: [
      {
        property: "Name",
        direction: "ascending",
      },
    ],
  });

  return (
    <div>
      {blogs.results.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  );
}
