import { readFile, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const root = dirname(fileURLToPath(import.meta.url));
const [css, appData, roadmapData, app] = await Promise.all([
  readFile(join(root, "style.css"), "utf8"),
  readFile(join(root, "data/app-data.js"), "utf8"),
  readFile(join(root, "data/roadmap-data.js"), "utf8"),
  readFile(join(root, "app.js"), "utf8")
]);

const safeScript = (content) => content.replace(/<\/script/gi, "<\\/script");

const html = `<!doctype html>
<html lang="fr-CH">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="description" content="Programme interne de formation fiduciaire sur 12 mois: de l'assistance comptable à l'autonomie supervisée sur les dossiers PME courants.">
  <meta name="theme-color" content="#102f3c">
  <title>Fiduciaire Universelle · Parcours comptable 12 mois</title>
  <style>${css}</style>
</head>
<body data-level="root">
  <div id="app" class="app-shell"></div>
  <script>${safeScript(appData)}</script>
  <script>${safeScript(roadmapData)}</script>
  <script>${safeScript(app)}</script>
  <script>FiduApp.route();</script>
</body>
</html>`;

await Promise.all([
  writeFile(join(root, "index.html"), html),
  writeFile(join(root, "LANCER_ICI.html"), html)
]);

console.log(`Standalone généré: ${html.length} caractères`);
