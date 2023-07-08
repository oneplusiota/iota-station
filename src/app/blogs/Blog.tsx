import Richtext from "@/src/components/notion-components/Richtext";
import { notion } from "@/src/utils/notion-utils";
import { readTimeCalculator } from "@/src/utils/utils";
import {
  BlockObjectResponse,
  PageObjectResponse,
} from "@notionhq/client/build/src/api-endpoints";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function Blog({ blog }: { blog: PageObjectResponse }) {
  let path = "/defaultproject.jpeg";
  if (blog.cover && blog.cover.type == "external") {
    path = blog.cover.external.url;
  } else if (blog.cover && blog.cover.type == "file") {
    path = blog.cover.file.url;
  }

  let author = "Shivam Nayak";

  return (
    <Link
      href={`/blogs/${blog.id}`}
      className="w-full flex flex-col md:flex-row justify-center items-center md:h-[20rem] rounded-lg mb-3 shadow-lg"
    >
      <div className="w-full h-[16rem] md:w-[90%] md:h-full relative p-2 rounded-xl">
        <Image
          src={path}
          alt="blog image"
          fill
          className="object-cover !relative rounded-xl"
          quality={100}
        />
      </div>
      <div className="relative block p-4 sm:p-6 lg:p-8 w-full border-l border-gray-100">
        <div className="sm:flex sm:justify-between sm:gap-4 ">
          <div>
            <h3 className="text-lg font-bold sm:text-xl">
              {blog.icon?.type === "emoji" ? blog.icon.emoji : ""} -{" "}
              {blog.properties["Name"].type === "title" ? (
                <Richtext text={blog.properties["Name"].title} />
              ) : (
                ""
              )}
            </h3>

            <p className="mt-1 text-xs font-medium">{author}</p>
          </div>
        </div>

        <div className="mt-4">
          <p className="text-sm">
            {blog.properties["Description"].type == "rich_text" ? (
              <Richtext text={blog.properties["Description"].rich_text} />
            ) : (
              ""
            )}
          </p>
        </div>

        <dl className="mt-6 flex gap-4 sm:gap-6">
          <div className="flex flex-col-reverse">
            <dt className="text-sm font-medium">Published</dt>
            <dd className="text-xs">
              {new Date(blog.created_time).toDateString()}
            </dd>
          </div>
        </dl>
      </div>
    </Link>
  );
}
