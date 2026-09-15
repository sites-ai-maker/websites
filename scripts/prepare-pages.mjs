import { cp, mkdir, rm } from "node:fs/promises";

const outputDirectory = ".pages-dist";
const files = ["index.html", "styles.css"];

await rm(outputDirectory, { recursive: true, force: true });
await mkdir(outputDirectory, { recursive: true });

await Promise.all(files.map((file) => cp(file, `${outputDirectory}/${file}`)));

console.log(`Prepared ${files.length} static files for GitHub Pages.`);
