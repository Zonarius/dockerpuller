import * as fs from 'fs';
import * as Path from 'path';

export interface Config {
  port: string;
  hooks: {
    [repo_url: string]: string;
  }
}

export function readConfig(): Promise<Config> {
  return new Promise((res, rej) => {
    fs.readFile(Path.resolve(__dirname, "../config.json"), "utf-8", (err, data) => {
      if (err) {
        rej(err);
      } else {
        res(JSON.parse(data));
      }
    })
  })
}