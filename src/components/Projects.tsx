import React from "react";
import { notion } from "../utils/notion-utils";
import getEnvVar from "../utils/utils";
import Image from "next/image";
import Richtext from "./notion-components/Richtext";
import { PageObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";

type Props = { project: PageObjectResponse };

function Project({ project }: Props) {
  let path = "/defaultproject.jpeg";
  if (project.cover && project.cover.type == "external") {
    path = project.cover.external.url;
  } else if (project.cover && project.cover.type == "file") {
    path = project.cover.file.url;
  }

  let projectName = "";
  if (project.properties["Name"].type == "title") {
    project.properties["Name"].title.forEach((text) => {
      projectName += text.plain_text;
    });
  }
  return (
    <div className="dark:shadow-[#004db71c] dark:shadow-md my-3 md:w-[60%] h-auto md:h-[18rem] w-[20.5rem] p-2 rounded-2xl shadow-lg flex justify-center items-center flex-col ease-linear duration-300 md:flex-row-reverse">
      <div className=" h-[70%] md:w-[50%] w-full shadow-md rounded-2xl basis-2/3 relative">
        <Link
          href={
            project.properties["Github Link"].type == "url"
              ? (project.properties["Github Link"].url as string)
              : "/"
          }
          target="_blank"
        >
          <div className="z-10 absolute pl-8 pr-8 pb-2 pt-2 bg-slate-200 dark:bg-gray-600 rounded-tl-2xl rounded-br-2xl font-semibold">
            <FontAwesomeIcon icon={faGithub} shake />
          </div>
        </Link>
        <div className="h-full w-full !relative border-2 border-white rounded-2xl">
          <Image
            src={path}
            alt={projectName}
            layout="fill"
            className="object-cover rounded-2xl !relative"
          />
        </div>
      </div>

      <div className="h-full w-auto mr-2 rounded-2xl">
        <p className="m-2 font-bold pl-1 text-lg text-indigo-500">
          Project Name
        </p>
        <h1 className="m-2 text-xl font-medium">
          {project.properties["Name"].type == "title" ? (
            <Richtext text={project.properties["Name"].title} />
          ) : (
            ""
          )}
        </h1>
        <div className="m-2">
          {project.properties["Description"].type == "rich_text" ? (
            <Richtext text={project.properties["Description"].rich_text} />
          ) : (
            ""
          )}
        </div>
        <div className="m-2 mt-4">
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
        property: "Created time",
        direction: "descending",
      },
    ],
  });

  return (
    <div className="flex flex-col justify-center items-center h-full">
      <h2 className="text-2xl font-bold mb-6 text-center">Projects</h2>
      <div className="flex flex-row justify-center flex-wrap items-center p-5">
        {projects.results.map((project) => {
          //@ts-ignore
          return <Project key={project.id} project={project} />;
        })}
      </div>
    </div>
  );
}
