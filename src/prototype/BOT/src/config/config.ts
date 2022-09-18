import {load} from "node-yaml-config";
import {existsSync} from "fs";
import {resolve} from "path";

export const getConfig = (filename: string) => {
  if (!existsSync(resolve(__dirname, "../" + filename))) {
    console.error("[PassBOT]: Не найден конфигурационный файл");
    throw new Error();
  }
  return load(resolve(__dirname, "../" + filename));
}