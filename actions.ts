// interface
interface Markdown {
  title: string;
  dir: string;
  day: string;
}
// lib
import path from "path";
import fs, { read } from "fs";
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
          day: dir.match(/[0-9]{6}/)?.[0] ?? "?",
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

const dayResult = Array.from(
  result.reduce((acc: Map<string, string[]>, v: Markdown) => {
    if (acc.has(v.day)) {
      const temp = acc.get(v.day) ?? [];
      acc.set(v.day, [...temp, `[${v.title}](${v.dir})`]);
    } else {
      acc.set(v.day, [`[${v.title}](${v.dir})`]);
    }
    return acc;
  }, new Map<string, string[]>())
);

const readme: string = fs.readFileSync(`${root}/README_HEADER.md`).toString();
const newReadme: string =
  readme +
  dayResult.reduce((acc, v) => {
    const [day, mds] = v;
    acc = acc + `### ${day}\n\n` + mds.join("\n\n") + "\n\n";
    return acc;
  }, "");

fs.writeFileSync(root + "/README.md", "\ufeff" + newReadme, {
  encoding: "utf8",
});

console.log("Complete!");
