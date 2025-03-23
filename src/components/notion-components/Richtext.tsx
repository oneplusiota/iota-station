import React from "react";

type RichTextAnnotations = {
  bold: boolean;
  italic: boolean;
  strikethrough: boolean;
  underline: boolean;
  code: boolean;
  color: string;
};

type RichTextItem = {
  type: string;
  plain_text: string;
  href?: string;
  annotations: RichTextAnnotations;
};

type Props = { text: Array<RichTextItem> };

function getStylesComponent(item: RichTextItem) {
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
      <code className="bg-notion-default dark:bg-slate-300 text-notion-red rounded-md px-[3px] py-[2px] break-keep">
        {result}
      </code>
    );
  }

  return result;
}

export default function Richtext({ text }: Props) {
  return (
    <>
      {text.map((item, idx) => {
        switch (item.type) {
          case "text":
            return <span key={idx}>{getStylesComponent(item)}</span>;
          case "equation":
            return <span key={idx}>{getStylesComponent(item)}</span>;
          case "mention":
            return <span key={idx}>{getStylesComponent(item)}</span>;
          default:
            break;
        }
      })}
    </>
  );
}
