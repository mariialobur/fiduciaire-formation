import { readFile, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const root = dirname(fileURLToPath(import.meta.url));
const [css, appData, roadmapData, tc01v14, tc02v10, tc03v10, tc04v10, app, runtimeEnhancements, autonomyFirst] = await Promise.all([
  readFile(join(root, "style.css"), "utf8"),
  readFile(join(root, "data/app-data.js"), "utf8"),
  readFile(join(root, "data/roadmap-data.js"), "utf8"),
  readFile(join(root, "data/tc01-v1.4.js"), "utf8"),
  readFile(join(root, "data/tc02-v1.0.js"), "utf8"),
  readFile(join(root, "data/tc03-v1.0.js"), "utf8"),
  readFile(join(root, "data/tc04-v1.0.js"), "utf8"),
  readFile(join(root, "app.js"), "utf8"),
  readFile(join(root, "data/runtime-enhancements.js"), "utf8"),
  readFile(join(root, "data/autonomy-first.js"), "utf8")
]);

const safeScript = (content) => content.replace(/<\/script/gi, "<\\/script");

const html = `<!doctype html>
<html lang="fr-CH">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="description" content="Pilote public de formation fiduciaire suisse sur 12 mois: TC01 à TC04 complets, premier mois entièrement publié.">
  <meta name="theme-color" content="#102f3c">
  <title>Fiduciaire Formation · Standalone · 4/25 modules complets</title>
  <style>${css}</style>
</head>
<body data-level="root">
  <div id="app" class="app-shell"></div>
  <script>${safeScript(appData)}</script>
  <script>${safeScript(roadmapData)}</script>
  <script>${safeScript(tc01v14)}</script>
  <script>${safeScript(tc02v10)}</script>
  <script>${safeScript(tc03v10)}</script>
  <script>${safeScript(tc04v10)}</script>
  <script>${safeScript(app)}</script>
  <script>${safeScript(runtimeEnhancements)}</script>
  <script>${safeScript(autonomyFirst)}</script>
  <script>FiduApp.route();</script>
</body>
</html>`;

await Promise.all([
  writeFile(join(root, "index.html"), html),
  writeFile(join(root, "LANCER_ICI.html"), html)
]);

console.log(`Standalone généré: ${html.length} caractères · 4/25 modules complets · autonomie-first activée`);
