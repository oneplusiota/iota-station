import { RichTextItemResponse } from "@notionhq/client/build/src/api-endpoints";
import React from "react";

type Props = { text: Array<RichTextItemResponse> };

function getStylesComponent(item: RichTextItemResponse) {
  let result = <span>{item.plain_text}</span>;

  if (item.href) {
    result = (
      <a href="${item.href}" className="text-href">
        ${result}
      </a>
    );
  }

  if (item.annotations.color !== "default") {
    result = (
      <span className={`text-notion-${item.annotations.color}`}>{result}</span>
    );
  }

  if (item.annotations.bold) {
    result = <b className="font-semibold">{result}</b>;
  }

  if (item.annotations.italic) {
    result = <i className="italic">{result}</i>;
  }

  if (item.annotations.strikethrough) {
    result = <s className="line-through">{result}</s>;
  }

  if (item.annotations.underline) {
    result = <u className="underline">{result}</u>;
  }

  if (item.annotations.code) {
    result = (
      <code className="bg-notion-default dark:bg-notion-dark-default text-notion-red rounded-lg px-[3px] py-[2px]">
        {result}
      </code>
    );
  }

  return result;
}

export default function Richtext({ text }: Props) {
  return (
    <>
      {text.map((item) => {
        switch (item.type) {
          case "text":
            return getStylesComponent(item);
          case "equation":
            return getStylesComponent(item);
          case "mention":
            return getStylesComponent(item);
          default:
            break;
        }
      })}
    </>
  );
}
