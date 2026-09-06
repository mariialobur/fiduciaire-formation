import { readFile, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const root = dirname(fileURLToPath(import.meta.url));
const [css, appData, roadmapData, tc01v14, tc02v10, tc03v10, tc04v10, app, runtimeEnhancements, autonomyObserverGuard, autonomyFirst, beginnerUx, tc01Polish, tc01Mission, developerCredit] = await Promise.all([
  readFile(join(root, "style.css"), "utf8"),
  readFile(join(root, "data/app-data.js"), "utf8"),
  readFile(join(root, "data/roadmap-data.js"), "utf8"),
  readFile(join(root, "data/tc01-v1.4.js"), "utf8"),
  readFile(join(root, "data/tc02-v1.0.js"), "utf8"),
  readFile(join(root, "data/tc03-v1.0.js"), "utf8"),
  readFile(join(root, "data/tc04-v1.0.js"), "utf8"),
  readFile(join(root, "app.js"), "utf8"),
  readFile(join(root, "data/runtime-enhancements.js"), "utf8"),
  readFile(join(root, "data/autonomy-observer-guard.js"), "utf8"),
  readFile(join(root, "data/autonomy-first.js"), "utf8"),
  readFile(join(root, "data/beginner-ux.js"), "utf8"),
  readFile(join(root, "data/tc01-polish-v1.5.js"), "utf8"),
  readFile(join(root, "data/tc01-mission-v1.6.js"), "utf8"),
  readFile(join(root, "data/developer-credit.js"), "utf8")
]);

const safeScript = (content) => content.replace(/<\/script/gi, "<\\/script");

const html = `<!doctype html>
<html lang="fr-CH">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="description" content="Pilote public de formation fiduciaire suisse sur 12 mois: TC01 à TC04 complets, premier mois entièrement publié.">
  <meta name="author" content="Mariia Lobur">
  <meta name="theme-color" content="#102f3c">
  <title>Fiduciaire Formation · Standalone · 4/25 modules complets</title>
  <link rel="icon" href="favicon.svg" type="image/svg+xml">
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
  <script>${safeScript(autonomyObserverGuard)}</script>
  <script>${safeScript(autonomyFirst)}</script>
  <script>${safeScript(beginnerUx)}</script>
  <script>${safeScript(tc01Polish)}</script>
  <script>${safeScript(tc01Mission)}</script>
  <script>${safeScript(developerCredit)}</script>
  <script>FiduApp.route();</script>
</body>
</html>`;

await Promise.all([
  writeFile(join(root, "index.html"), html),
  writeFile(join(root, "LANCER_ICI.html"), html)
]);

console.log(`Standalone généré: ${html.length} caractères · 4/25 modules complets · TC01 Mission 01 v1.6 + autonomie-first activés`);
