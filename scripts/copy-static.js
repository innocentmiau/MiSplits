// tsc only outputs .js files, so the HTML and CSS are copied into dist next to them.
// Written in Node instead of `cp` so the build also works on Windows.
import { cpSync } from "node:fs";

cpSync("src/renderer", "dist/renderer", {
  recursive: true,
  filter: (source) => !source.endsWith(".ts"),
});
