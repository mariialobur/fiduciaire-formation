import { access, readdir, readFile } from "node:fs/promises";
import { constants } from "node:fs";
import { dirname, join, resolve } from "node:path";

async function walk(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    if (["node_modules", ".git"].includes(entry.name)) continue;
    const path = join(directory, entry.name);
    if (entry.isDirectory()) files.push(...await walk(path));
    else if (entry.name.endsWith(".html")) files.push(path);
  }
  return files;
}

const root = process.cwd();
const files = await walk(root);
const missing = [];
let checked = 0;

for (const file of files) {
  const html = await readFile(file, "utf8");
  const references = [...html.matchAll(/(?:href|src)=["']([^"']+)["']/gi)].map((match) => match[1]);
  for (const reference of references) {
    if (reference.includes("${") || /^(?:https?:|data:|mailto:|tel:|#)/i.test(reference)) continue;
    const clean = reference.split(/[?#]/)[0];
    if (!clean) continue;
    checked += 1;
    const target = resolve(dirname(file), clean);
    try { await access(target, constants.R_OK); }
    catch { missing.push({ file: file.slice(root.length + 1), reference }); }
  }
}

if (missing.length) {
  console.error(JSON.stringify({ htmlFiles: files.length, checked, missing }, null, 2));
  process.exit(1);
}

console.log(JSON.stringify({ htmlFiles: files.length, localReferencesChecked: checked, missing: 0 }, null, 2));
