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
for (const path of files) if (forbiddenPathPatterns.some((pattern) => pattern.test(path))) failures.push(`Chemin privé publié: ${path}`);

for (const required of [
  ".nojekyll", "index.html", "index-multifile.html", "README.md", "PILOTE_MOIS_1.md",
  "data/tc01-v1.4.js", "data/tc02-v1.0.js", "data/tc03-v1.0.js", "data/tc04-v1.0.js",
  "data/runtime-enhancements.js", "data/autonomy-first.js"
]) {
  if (!existsSync(join(root, required))) failures.push(`Fichier public requis absent: ${required}`);
}

const packages = {
  TC01: {
    dir: "ressources/tc01-apprenant-v1.4",
    files: [
      "00_LIRE_EN_PREMIER.txt", "01_Exercice_Zefix_reel_Nestle.html", "02_Mode_emploi_cas_simule.html",
      "03_B_Extrait_RC_ancien_corrige.html", "04_Fiche_Zefix_reel_Nestle.csv", "05_Cours_TC01_v1.4.html",
      "06_Dossier_apprenant_TC01_v1.4.html", "07_Fiche_ouverture_TC01.csv", "08_Calendrier_TC01.csv",
      "09_Registre_hors_mandat_TC01.csv", "10_Note_decision_TC01.txt", "11_Email_client_TC01.txt",
      "12_Journal_verification_TC01.csv", "13_Exercice_IDE_TVA_reel.html", "14_Fiche_IDE_TVA_reel.csv"
    ]
  },
  TC02: {
    dir: "ressources/tc02-apprenant-v1.0",
    files: ["00_LIRE_EN_PREMIER.md", "01_Cours_TC02.md", "02_Dossier_simule_TC02.md", "03_Matrice_flux_TC02.csv", "04_Chronologie_reprise_TC02.csv", "05_Journal_verification_TC02.csv", "06_Fiche_identite_juridique_TC02.csv", "07_Tableau_reprise_TC02.csv", "08_Note_points_ouverts_TC02.md", "09_Sources_et_version.md"]
  },
  TC03: {
    dir: "ressources/tc03-apprenant-v1.0",
    files: ["00_LIRE_EN_PREMIER.md", "01_Cours_TC03.md", "02_Dossier_simule_TC03.md", "03_Inventaire_donnees_TC03.csv", "04_Matrice_acces_TC03.csv", "05_Registre_partages_TC03.csv", "06_Checklist_acces_TC03.csv", "07_Fiche_incident_TC03.md", "08_Journal_verification_TC03.csv", "09_Sources_et_version.md"]
  },
  TC04: {
    dir: "ressources/tc04-apprenant-v1.0",
    files: ["00_LIRE_EN_PREMIER.md", "01_Cours_TC04.md", "02_Dossier_simule_TC04.md", "03_Fiche_identite_TC04.csv", "04_Controle_UBO_TC04.csv", "05_Profil_economique_TC04.csv", "06_Matrice_services_LBA_TC04.csv", "07_Note_escalade_TC04.md", "08_Journal_verification_TC04.csv", "09_Sources_et_version.md"]
  },
  M01_PILOT: { dir: "ressources/pilote-m1", files: ["Fiche_observation_pilote.csv", "Checklist_responsable_pilote.md", "DEBRIEF_MOIS_1.md"] }
};
for (const [code, pack] of Object.entries(packages)) {
  for (const name of pack.files) {
    const path = `${pack.dir}/${name}`;
    if (!existsSync(join(root, path))) failures.push(`Fichier apprenant/pilote ${code} absent: ${path}`);
  }
}

if (existsSync(join(root, "ressources/tc01-apprenant-v1.3.zip"))) failures.push("Ancien ZIP TC01 v1.3 encore publié dans le parcours actif");
if (existsSync(join(root, "ressources/tc01-apprenant-v1.3/Dossier_simule/00_Protocole_de_remise.md"))) failures.push("Protocole de remise destiné au responsable encore présent dans le paquet apprenant TC01");

const source = readFileSync(join(root, "app.js"), "utf8");
const built = readFileSync(join(root, "index.html"), "utf8");
const tc01 = readFileSync(join(root, "data/tc01-v1.4.js"), "utf8");
const tc02 = readFileSync(join(root, "data/tc02-v1.0.js"), "utf8");
const tc03 = readFileSync(join(root, "data/tc03-v1.0.js"), "utf8");
const tc04 = readFileSync(join(root, "data/tc04-v1.0.js"), "utf8");
const runtime = readFileSync(join(root, "data/runtime-enhancements.js"), "utf8");
const autonomy = readFileSync(join(root, "data/autonomy-first.js"), "utf8");
const pilot = readFileSync(join(root, "PILOTE_MOIS_1.md"), "utf8");
const zefixExercise = readFileSync(join(root, "ressources/tc01-apprenant-v1.4/01_Exercice_Zefix_reel_Nestle.html"), "utf8");
const vatExercise = readFileSync(join(root, "ressources/tc01-apprenant-v1.4/13_Exercice_IDE_TVA_reel.html"), "utf8");
const vatExerciseLower = vatExercise.toLowerCase();
const caseGuide = readFileSync(join(root, "ressources/tc01-apprenant-v1.4/02_Mode_emploi_cas_simule.html"), "utf8");
const oldRcReplacement = readFileSync(join(root, "ressources/tc01-apprenant-v1.4/03_B_Extrait_RC_ancien_corrige.html"), "utf8");
const course = readFileSync(join(root, "ressources/tc01-apprenant-v1.4/05_Cours_TC01_v1.4.html"), "utf8");
const dossier = readFileSync(join(root, "ressources/tc01-apprenant-v1.4/06_Dossier_apprenant_TC01_v1.4.html"), "utf8");

if (!source.includes("Édition publique de démonstration")) failures.push("Statut public absent de l’application source");
if (!built.includes("data/autonomy-first") && !built.includes("2.5-autonomy-first")) failures.push("Couche autonomy-first absente de la version autonome");
if (!built.includes('class="skip-link"')) failures.push("Lien d’évitement absent de la version autonome");
if (!tc01.includes("Nestlé S.A.")) failures.push("Exercice Zefix réel TC01 absent du module actif");
if (!tc01.includes("Léman Atelier Sàrl reste entièrement fictive")) failures.push("Séparation registre réel / cas fictif absente de TC01");
if (!tc01.includes("05_Cours_TC01_v1.4.html") || !tc01.includes("06_Dossier_apprenant_TC01_v1.4.html")) failures.push("Cours/dossier TC01 v1.4 non utilisés par le paquet actif");
if (tc01.includes("01_Cours_TC01.docx") || tc01.includes("02_Dossier_apprenant_TC01.docx") || tc01.includes("04_Outils_TC01_apprenant.xlsx")) failures.push("Le paquet actif TC01 référence encore des outils pédagogiques v1.3 obsolètes");
if (!zefixExercise.includes("https://zefix.ch/") || !zefixExercise.includes("Nestlé S.A.")) failures.push("Exercice Zefix réel incomplet");
if (!vatExercise.includes("https://www.uid.admin.ch/") || !vatExerciseLower.includes("statut registre tva") || !vatExerciseLower.includes("fin de l’assujettissement") || !vatExerciseLower.includes("groupe d’imposition tva")) failures.push("Exercice IDE/TVA ne contrôle pas les champs critiques");
if (!vatExerciseLower.includes("statut ide") || !vatExerciseLower.includes("statut rc")) failures.push("Exercice IDE/TVA ne distingue pas identité, RC et TVA");
if (!caseGuide.includes("Ne recherchez pas Léman Atelier Sàrl")) failures.push("Consigne de non-recherche du cas fictif absente");
if (!oldRcReplacement.includes("l’extrait simulé actualisé est fourni uniquement dans la Remise 2")) failures.push("Ancien extrait RC TC01 conserve une consigne ambiguë");
if (!course.includes("Registre du commerce: deux exercices différents")) failures.push("Séparation pédagogique Zefix absente du cours TC01 v1.4");
if (!dossier.includes("Nestlé S.A.")) failures.push("Dossier apprenant TC01 ne rappelle pas l’exercice Zefix séparé");

if (!autonomy.includes("Aucun fichier n’est envoyé au site")) failures.push("Workflow sans faux upload absent");
if (!autonomy.includes("Autocontrôle guidé")) failures.push("Autocontrôle guidé absent");
if (!autonomy.includes("Revue humaine ciblée")) failures.push("Principe de revue humaine ciblée absent");
if (!autonomy.includes("saveAutonomyCheck")) failures.push("Sauvegarde de l’autocontrôle absente");
if (!autonomy.includes("toggleEvidenceCompletion")) failures.push("Marquage des livrables terminé absent");
if (!autonomy.includes("13_Exercice_IDE_TVA_reel.html")) failures.push("Exercice TVA réel non rattaché au TC01");
if (!runtime.includes("autonomyMode")) failures.push("Runtime ne respecte pas le mode autonomie");

if (!tc02.includes('module.status = "core"')) failures.push("TC02 n’est pas promu au statut cœur");
if (!tc03.includes('module.status = "core"')) failures.push("TC03 n’est pas promu au statut cœur");
if (!tc04.includes('module.status = "core"')) failures.push("TC04 n’est pas promu au statut cœur");
if (!tc03.includes('module.critical = true')) failures.push("TC03 critique n’est pas marqué comme tel");
if (!tc04.includes('module.critical = true')) failures.push("TC04 critique n’est pas marqué comme tel");
if (!tc04.includes('module.quizThresholdCount = 11')) failures.push("Seuil TC04 11/12 absent");
if (!tc04.includes("1er octobre 2026")) failures.push("Date de bascule TC04 absente du module");
if (!runtime.includes("FIDUCIAIRE_MATURITY")) failures.push("Compteur dynamique de maturité absent");
if (!pilot.includes("Le pilote n’évalue pas seulement l’apprenant")) failures.push("Principe d’audit pédagogique du pilote M1 absent");

for (const code of ["TC01", "TC02", "TC03", "TC04"]) {
  const direct = readFileSync(join(root, `tronc-commun/${code}.html`), "utf8");
  if (!direct.includes(`../index.html#module/${code}`)) failures.push(`Page directe ${code} ne redirige pas vers le SPA canonique`);
}

if (failures.length) {
  console.error(JSON.stringify({ publicSafety: false, failures }, null, 2));
  process.exit(1);
}

console.log(JSON.stringify({
  publicSafety: true,
  repositoryFilesChecked: files.length,
  forbiddenPaths: 0,
  tc01LearnerFilesChecked: packages.TC01.files.length,
  tc01RealRegistryExercise: "Nestlé S.A.",
  tc01RealVatExercise: true,
  autonomyFirst: true,
  falseUploadRemoved: true,
  targetedHumanReview: true,
  tc02LearnerFilesChecked: packages.TC02.files.length,
  tc03LearnerFilesChecked: packages.TC03.files.length,
  tc04LearnerFilesChecked: packages.TC04.files.length,
  canonicalModuleRedirects: 4,
  dynamicMaturity: true,
  skipLink: true
}, null, 2));
