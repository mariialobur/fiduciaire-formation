import { execFileSync } from "node:child_process";
import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative } from "node:path";

const root = process.cwd();
const failures = [];
const files = [];

function walk(directory) {
  for (const entry of readdirSync(directory)) {
    if ([".git", "node_modules"].includes(entry)) continue;
    const absolute = join(directory, entry);
    if (statSync(absolute).isDirectory()) walk(absolute);
    else files.push(relative(root, absolute).replaceAll("\\", "/"));
  }
}

walk(root);

const forbiddenPathPatterns = [
  /(^|\/)Corrige_responsable(\/|$)/i,
  /(^|\/)materials\/formateur(\/|$)/i,
  /(^|\/)tools\/tc01(\/|$)/i,
  /(^|\/)Guide_formateur[^/]*$/i
];

for (const path of files) {
  if (forbiddenPathPatterns.some((pattern) => pattern.test(path))) failures.push(`Chemin privé publié: ${path}`);
}

for (const required of [".nojekyll", "index.html", "index-multifile.html", "README.md"]) {
  if (!existsSync(join(root, required))) failures.push(`Fichier public requis absent: ${required}`);
}

const source = readFileSync(join(root, "app.js"), "utf8");
const built = readFileSync(join(root, "index.html"), "utf8");
if (!source.includes("Édition publique de démonstration")) failures.push("Statut public absent de l’application source");
if (!built.includes("Édition publique de démonstration")) failures.push("Statut public absent de la version autonome");
if (!built.includes('class="skip-link"')) failures.push("Lien d’évitement absent de la version autonome");
if (!built.includes("validations locales non authentifiées")) failures.push("Limite d’authentification absente de la version autonome");

const learnerZip = files.find((path) => /^ressources\/tc01-apprenant-v[\d.]+\.zip$/i.test(path));
if (!learnerZip) {
  failures.push("ZIP apprenant TC01 absent");
} else {
  try {
    const entries = execFileSync("unzip", ["-Z1", join(root, learnerZip)], { encoding: "utf8" })
      .split(/\r?\n/)
      .filter(Boolean);
    const forbiddenEntries = entries.filter((entry) => /Corrige_responsable|Guide_formateur|(^|\/)formateur(\/|$)/i.test(entry));
    forbiddenEntries.forEach((entry) => failures.push(`Contenu privé dans le ZIP apprenant: ${entry}`));
  } catch (error) {
    failures.push(`ZIP apprenant illisible: ${learnerZip}`);
  }
}

if (failures.length) {
  console.error(JSON.stringify({ publicSafety: false, failures }, null, 2));
  process.exit(1);
}

console.log(JSON.stringify({
  publicSafety: true,
  repositoryFilesChecked: files.length,
  forbiddenPaths: 0,
  learnerZipChecked: learnerZip,
  trustNotice: true,
  skipLink: true
}, null, 2));
