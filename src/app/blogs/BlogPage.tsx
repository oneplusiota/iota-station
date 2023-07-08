"use client";
import Blog from "./Blog";
import { PageObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import React, { ChangeEvent, useRef, useState } from "react";

type Props = { results: PageObjectResponse[] };

export default function BlogPage({ results }: Props) {
  const [searchTerm, setSearchTerm] = useState("");
  const focusRef = useRef<HTMLInputElement>(null);
  const filteredBlogs = results.filter((blog) =>
    blog.properties["Name"].type === "title"
      ? blog.properties["Name"].title[0].plain_text
          .toLowerCase()
          .includes(searchTerm.toLowerCase())
      : "default"
  );

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="flex flex-col justify-center items-center mt-20 w-full">
      <div className="w-full flex justify-center items-center flex-col">
        <h1 className="text-4xl text-left font-bold mb-4 md:w-3/5 w-[90%]">
          Blogs
        </h1>
        <p className="text-md text-left font-light mb-4 md:w-3/5 w-[90%]">
          Started writing blogs related to web development, design patterns and
          computer science... <br /> Posted{" "}
          <b className="font-bold">{results.length} blogs </b>yet.
        </p>
        <input
          type="text"
          placeholder="Search blogs..."
          ref={focusRef}
          value={searchTerm}
          onChange={handleSearch}
          className="px-4 py-2 border border-gray-300 rounded mb-4 md:w-1/3 w-[90%]"
        />
        <h1 className="text-2xl font-bold mb-4">
          All Posts {`(${filteredBlogs.length})`}
        </h1>
      </div>
      <ul className="container w-full md:w-3/5">
        {filteredBlogs.map((blog) => (
          //@ts-ignore
          <Blog key={blog.id} blog={blog} />
        ))}
      </ul>
    </div>
  );
}
