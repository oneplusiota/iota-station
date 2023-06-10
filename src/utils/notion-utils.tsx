import { Client } from "@notionhq/client";
import getEnvVar from "./utils";

export const notion = new Client({
  auth: getEnvVar("NOTION_INTEGRATION_KEY"),
});
