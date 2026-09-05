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
  /(^|\/)tools\/tc0[1-4](\/|$)/i,
  /(^|\/)Guide_formateur[^/]*$/i,
  /(^|\/)corrige[^/]*tc0[1-4][^/]*$/i
];

for (const path of files) {
  if (forbiddenPathPatterns.some((pattern) => pattern.test(path))) failures.push(`Chemin privé publié: ${path}`);
}

for (const required of [
  ".nojekyll",
  "index.html",
  "index-multifile.html",
  "README.md",
  "data/tc01-v1.4.js",
  "data/tc02-v1.0.js",
  "data/tc03-v1.0.js",
  "data/tc04-v1.0.js",
  "data/runtime-enhancements.js"
]) {
  if (!existsSync(join(root, required))) failures.push(`Fichier public requis absent: ${required}`);
}

const packages = {
  TC02: {
    dir: "ressources/tc02-apprenant-v1.0",
    files: [
      "00_LIRE_EN_PREMIER.md", "01_Cours_TC02.md", "02_Dossier_simule_TC02.md",
      "03_Matrice_flux_TC02.csv", "04_Chronologie_reprise_TC02.csv", "05_Journal_verification_TC02.csv",
      "06_Fiche_identite_juridique_TC02.csv", "07_Tableau_reprise_TC02.csv", "08_Note_points_ouverts_TC02.md",
      "09_Sources_et_version.md"
    ]
  },
  TC03: {
    dir: "ressources/tc03-apprenant-v1.0",
    files: [
      "00_LIRE_EN_PREMIER.md", "01_Cours_TC03.md", "02_Dossier_simule_TC03.md",
      "03_Inventaire_donnees_TC03.csv", "04_Matrice_acces_TC03.csv", "05_Registre_partages_TC03.csv",
      "06_Checklist_acces_TC03.csv", "07_Fiche_incident_TC03.md", "08_Journal_verification_TC03.csv",
      "09_Sources_et_version.md"
    ]
  },
  TC04: {
    dir: "ressources/tc04-apprenant-v1.0",
    files: [
      "00_LIRE_EN_PREMIER.md", "01_Cours_TC04.md", "02_Dossier_simule_TC04.md",
      "03_Fiche_identite_TC04.csv", "04_Controle_UBO_TC04.csv", "05_Profil_economique_TC04.csv",
      "06_Matrice_services_LBA_TC04.csv", "07_Note_escalade_TC04.md", "08_Journal_verification_TC04.csv",
      "09_Sources_et_version.md"
    ]
  }
};

for (const [code, pack] of Object.entries(packages)) {
  for (const name of pack.files) {
    const path = `${pack.dir}/${name}`;
    if (!existsSync(join(root, path))) failures.push(`Fichier apprenant ${code} absent: ${path}`);
  }
}

const source = readFileSync(join(root, "app.js"), "utf8");
const built = readFileSync(join(root, "index.html"), "utf8");
const tc02 = readFileSync(join(root, "data/tc02-v1.0.js"), "utf8");
const tc03 = readFileSync(join(root, "data/tc03-v1.0.js"), "utf8");
const tc04 = readFileSync(join(root, "data/tc04-v1.0.js"), "utf8");
const runtime = readFileSync(join(root, "data/runtime-enhancements.js"), "utf8");
if (!source.includes("Édition publique de démonstration")) failures.push("Statut public absent de l’application source");
if (!built.includes("Édition publique de démonstration")) failures.push("Statut public absent de la version autonome");
if (!built.includes('class="skip-link"')) failures.push("Lien d’évitement absent de la version autonome");
if (!built.includes("validations locales non authentifiées")) failures.push("Limite d’authentification absente de la version autonome");
if (!tc02.includes('module.status = "core"')) failures.push("TC02 n’est pas promu au statut cœur");
if (!tc03.includes('module.status = "core"')) failures.push("TC03 n’est pas promu au statut cœur");
if (!tc04.includes('module.status = "core"')) failures.push("TC04 n’est pas promu au statut cœur");
if (!tc03.includes('module.critical = true')) failures.push("TC03 critique n’est pas marqué comme tel");
if (!tc04.includes('module.critical = true')) failures.push("TC04 critique n’est pas marqué comme tel");
if (!tc04.includes('module.quizThresholdCount = 11')) failures.push("Seuil TC04 11/12 absent");
if (!tc04.includes("1er octobre 2026")) failures.push("Date de bascule TC04 absente du module");
if (!runtime.includes("FIDUCIAIRE_MATURITY")) failures.push("Compteur dynamique de maturité absent");
if (!runtime.includes("invalidatePersistedPracticalReview")) failures.push("Garde anti-revue pratique obsolète absente");

for (const code of ["TC01", "TC02", "TC03", "TC04"]) {
  const direct = readFileSync(join(root, `tronc-commun/${code}.html`), "utf8");
  if (!direct.includes(`../index.html#module/${code}`)) failures.push(`Page directe ${code} ne redirige pas vers le SPA canonique`);
}

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
  tc02LearnerFilesChecked: packages.TC02.files.length,
  tc03LearnerFilesChecked: packages.TC03.files.length,
  tc04LearnerFilesChecked: packages.TC04.files.length,
  canonicalModuleRedirects: 4,
  dynamicMaturity: true,
  stalePracticalReviewGuard: true,
  trustNotice: true,
  skipLink: true
}, null, 2));
