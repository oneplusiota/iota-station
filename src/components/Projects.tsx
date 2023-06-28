import React from "react";
import { notion } from "../utils/notion-utils";
import getEnvVar from "../utils/utils";
import Image from "next/image";
import Richtext from "./notion-components/Richtext";
import { PageObjectResponse } from "@notionhq/client/build/src/api-endpoints";

type Props = { project: PageObjectResponse };

function Project({ project }: Props) {
  let path = "/defaultproject.jpeg";
  if (project.cover && project.cover.type == "external") {
    path = project.cover.external.url;
  } else if (project.cover && project.cover.type == "file") {
    path = project.cover.file.url;
  }
  return (
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl my-4">
      <div className="md:flex">
        <div className="md:shrink-0">
          <div className="h-48 w-full md:h-full md:w-48 relative">
            <Image
              src={path}
              alt="Project Image"
              fill
              className="object-cover"
              quality={100}
            />
          </div>
        </div>
        <div className="p-8">
          <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
            Project Name
          </div>
          <a
            href="#"
            className="block mt-1 text-lg leading-tight font-medium text-black hover:underline"
          >
            {project.properties["Name"].type == "title" ? (
              <Richtext text={project.properties["Name"].title} />
            ) : (
              ""
            )}
          </a>
          <p className="mt-2 text-gray-500">
            {project.properties["Description"].type == "rich_text" ? (
              <Richtext text={project.properties["Description"].rich_text} />
            ) : (
              ""
            )}
          </p>
          <div className="mt-4">
            {project.properties["tags"].type == "multi_select"
              ? project.properties["tags"].multi_select.map((tag) => (
                  <span
                    key={tag.id}
                    className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2"
                  >
                    {"#" + tag.name}
                  </span>
                ))
              : ""}
          </div>
        </div>
      </div>
    </div>
  );
}

export const revalidate = 15 * 60;

export default async function Projects() {
  const projects = await notion.databases.query({
    database_id: getEnvVar("NOTION_PROJECT_DATABASE_ID"),
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
    <div className="flex flex-col justify-center items-center h-full">
      <h2 className="text-xl">Projects</h2>
      <div className="flex flex-row justify-center flex-wrap items-center p-5">
        {projects.results.map((project) => {
          //@ts-ignore
          return <Project key={project.id} project={project} />;
        })}
      </div>
    </div>
  );
}
