import * as fs from 'fs';


export interface Config {
  hooks: {
    [repo_url: string]: string;
  }
}

export function readConfig(): Promise<Config> {
  return new Promise((res, rej) => {
    fs.readFile("config.json", "utf-8", (err, data) => {
      if (err) {
        rej(err);
      } else {
        res(JSON.parse(data));
      }
    })
  })
}