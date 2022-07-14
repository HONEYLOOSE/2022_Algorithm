// interface
interface Markdown {
  title: string;
  dir: string;
}
// lib
import path from "path";
import fs from "fs";
// constant
const GITHUB_ROOT_DIR =
  "https://github.com/HONEYLOOSE/2022_Algorithm/blob/main";

const [_, currentPath] = process.argv;
const root = path.dirname(currentPath);
let result: Markdown[] = [];

const fileReg = /\.[a-zA-Z]/;
const mdReg = /\.md/;
const getDir = (dir: string) => {
  const inputs = fs.readdirSync(dir);
  const files = inputs.filter((e: string) => fileReg.test(e));
  const directories = inputs
    .filter((e: string) => e !== "node_modules")
    .map((e: string) => `${dir}/${e}`)
    .filter((e: string) => !fileReg.test(e));
  if (directories.length === 0) {
    // 디렉토리 주소가 없을 경우
    const markdowns: Markdown[] = files
      .filter((e: string) => mdReg.test(e))
      .map((e: string) => {
        return {
          dir:
            dir.replace(root, GITHUB_ROOT_DIR) + "/" + e.replace(/\s/g, "%20"),
          title: e,
        };
      });
    result = [...result, ...markdowns];
    return;
  } else {
    // 디렉토리 주소가 있을 경우
    directories.forEach((directory: string) => getDir(directory));
  }
};

getDir(`${root}`);

const readme: string = fs.readFileSync(`${root}/README_HEADER.md`).toString();
const newReadme: string =
  readme + result.map((e: Markdown) => `[${e.title}](${e.dir})`).join("\n\n");
fs.writeFileSync(root + "/README.md", "\ufeff" + newReadme, {
  encoding: "utf8",
});

console.log("Complete!");
