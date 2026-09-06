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
  ".nojekyll", "index.html", "index-multifile.html", "README.md", "PILOTE_MOIS_1.md", "favicon.svg",
  "data/tc01-v1.4.js", "data/tc01-polish-v1.5.js", "data/tc01-mission-v1.6.js",
  "data/tc02-v1.0.js", "data/tc03-v1.0.js", "data/tc04-v1.0.js",
  "data/runtime-enhancements.js", "data/autonomy-first.js", "data/beginner-ux.js",
  "ressources/Glossaire_fiduciaire_debutant.html",
  "ressources/tc01-apprenant-v1.6/00_Mission_TC01_v1.6.html",
  "ressources/tc01-apprenant-v1.6/01_Zefix_MicroMission_RC.html",
  "ressources/tc01-apprenant-v1.6/02_IDE_TVA_MicroMission.html"
]) {
  if (!existsSync(join(root, required))) failures.push(`Fichier public requis absent: ${required}`);
}

const packages = {
  TC01_BASE: {
    dir: "ressources/tc01-apprenant-v1.4",
    files: [
      "01_Exercice_Zefix_reel_Nestle.html", "03_B_Extrait_RC_ancien_corrige.html",
      "04_Fiche_Zefix_reel_Nestle.xlsx", "11_Email_client_TC01.txt",
      "13_Exercice_IDE_TVA_reel.html", "14_Fiche_IDE_TVA_reel.xlsx"
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

for (const removed of [
  "ressources/tc01-apprenant-v1.3.zip",
  "ressources/tc01-apprenant-v1.3/Dossier_simule/00_Protocole_de_remise.md",
  "ressources/tc01-apprenant-v1.4/04_Fiche_Zefix_reel_Nestle.csv",
  "ressources/tc01-apprenant-v1.4/12_Journal_verification_TC01.csv",
  "ressources/tc01-apprenant-v1.4/14_Fiche_IDE_TVA_reel.csv"
]) {
  if (existsSync(join(root, removed))) failures.push(`Ancien fichier TC01 encore publié: ${removed}`);
}

const source = readFileSync(join(root, "app.js"), "utf8");
const built = readFileSync(join(root, "index.html"), "utf8");
const tc01 = readFileSync(join(root, "data/tc01-v1.4.js"), "utf8");
const missionLayer = readFileSync(join(root, "data/tc01-mission-v1.6.js"), "utf8");
const mission = readFileSync(join(root, "ressources/tc01-apprenant-v1.6/00_Mission_TC01_v1.6.html"), "utf8");
const rcMicro = readFileSync(join(root, "ressources/tc01-apprenant-v1.6/01_Zefix_MicroMission_RC.html"), "utf8");
const vatMicro = readFileSync(join(root, "ressources/tc01-apprenant-v1.6/02_IDE_TVA_MicroMission.html"), "utf8");
const legacyRc = readFileSync(join(root, "ressources/tc01-apprenant-v1.4/01_Exercice_Zefix_reel_Nestle.html"), "utf8");
const legacyVat = readFileSync(join(root, "ressources/tc01-apprenant-v1.4/13_Exercice_IDE_TVA_reel.html"), "utf8");
const tc02 = readFileSync(join(root, "data/tc02-v1.0.js"), "utf8");
const tc03 = readFileSync(join(root, "data/tc03-v1.0.js"), "utf8");
const tc04 = readFileSync(join(root, "data/tc04-v1.0.js"), "utf8");
const runtime = readFileSync(join(root, "data/runtime-enhancements.js"), "utf8");
const autonomy = readFileSync(join(root, "data/autonomy-first.js"), "utf8");
const beginner = readFileSync(join(root, "data/beginner-ux.js"), "utf8");
const glossary = readFileSync(join(root, "ressources/Glossaire_fiduciaire_debutant.html"), "utf8");
const pilot = readFileSync(join(root, "PILOTE_MOIS_1.md"), "utf8");

if (!source.includes("Édition publique de démonstration")) failures.push("Statut public absent de l’application source");
if (!built.includes("2.5-autonomy-first") || !built.includes("FIDUCIAIRE_BEGINNER_UX") || !built.includes("1.6-mission")) failures.push("Couches autonomie/beginner/mission absentes de la version autonome");
if (!built.includes("favicon.svg")) failures.push("Favicon absent de la version autonome");
if (!built.includes('class="skip-link"')) failures.push("Lien d’évitement absent de la version autonome");
if (!tc01.includes("Nestlé S.A.")) failures.push("Exercice registre réel TC01 absent de la base");

if (!rcMicro.includes("https://zefix.ch/") || !rcMicro.includes("Nestlé S.A.")) failures.push("Micro-mission RC / Zefix incomplète");
if (!rcMicro.includes("Mode de signature") || !rcMicro.includes("IDE / UID") || !rcMicro.includes("localStorage")) failures.push("Micro-mission RC manque les apprentissages ou la progression locale");
if (!legacyRc.includes("01_Zefix_MicroMission_RC.html")) failures.push("Ancienne URL Zefix ne redirige pas vers la micro-mission v1.6");

const vatLower = vatMicro.toLowerCase();
if (!vatMicro.includes("https://www.uid.admin.ch/") || !vatMicro.includes("Nestlé S.A.")) failures.push("Micro-mission IDE/TVA ne relie pas le registre réel");
for (const expected of ["Statut IDE", "Statut Registre TVA", "Début d’assujettissement", "Fin d’assujettissement", "Date / période que je traite"]) {
  if (!vatMicro.includes(expected)) failures.push(`Micro-mission IDE/TVA incomplète: ${expected}`);
}
if (!vatLower.includes("rc actif") || !vatLower.includes("tva active") || !vatMicro.includes("localStorage")) failures.push("Micro-mission IDE/TVA ne distingue pas RC/IDE/TVA ou ne conserve pas la progression");
if (!vatMicro.includes("groupe d’imposition TVA") || !vatMicro.includes("À savoir, sans devoir tout maîtriser")) failures.push("Groupe TVA n’est pas présenté comme approfondissement progressif");
if (!legacyVat.includes("02_IDE_TVA_MicroMission.html")) failures.push("Ancienne URL IDE/TVA ne redirige pas vers la micro-mission v1.6");

if (!glossary.includes("IDE / UID") || !glossary.includes("Assujettissement TVA")) failures.push("Glossaire débutant incomplet");

if (!missionLayer.includes("1.6-mission")) failures.push("Révision Mission TC01 non activée");
if (!missionLayer.includes("01_Zefix_MicroMission_RC.html") || !missionLayer.includes("02_IDE_TVA_MicroMission.html")) failures.push("Mission layer ne pointe pas vers les micro-missions RC/IDE v1.6");
if (!missionLayer.includes("module.evidenceItems") || !missionLayer.includes("dossier_opening") || !missionLayer.includes("client_email")) failures.push("TC01 Mission ne réduit pas les livrables à deux résultats utiles");
if (!missionLayer.includes("module.quizThresholdCount=7") || !missionLayer.includes("Q08")) failures.push("Challenge final TC01 Mission 8 situations absent");
if (!missionLayer.includes("scoreItems=[") || !missionLayer.includes("vat_timing")) failures.push("Autocontrôle TC01 Mission non simplifié");
if (!missionLayer.includes("module.sections=[")) failures.push("Page module TC01 non simplifiée autour de la Mission");

for (const expected of [
  "Pouvez-vous prendre ce dossier?",
  "Étape 1 / 8",
  "Comprendre ce que vous voyez dans Zefix",
  "RC actif ≠ TVA active",
  "Que couvre réellement le mandat?",
  "Remise 1",
  "Remise 2",
  "Deux résultats, pas cinq formulaires",
  "Télécharger .txt",
  "Copier l’e-mail"
]) if (!mission.includes(expected)) failures.push(`Mission TC01 incomplète: ${expected}`);

if (!mission.includes("01_Exercice_Zefix_reel_Nestle.html") || !mission.includes("13_Exercice_IDE_TVA_reel.html")) failures.push("Mission principale doit préserver les anciennes URLs de transition vers les micro-missions");
if (!mission.includes("C_Mandat_signe.pdf") || !mission.includes("F_Extrait_RC_actuel.pdf") || !mission.includes("G_Extrait_IDE_TVA.pdf")) failures.push("Mission ne relie pas les pièces du dossier simulé");
if (!mission.includes("localStorage") || !mission.includes("tc01_mission_v16")) failures.push("Mission ne conserve pas la progression locale");

if (!autonomy.includes("Aucun fichier n’est envoyé au site")) failures.push("Workflow sans faux upload absent");
if (!autonomy.includes("Autocontrôle guidé")) failures.push("Autocontrôle guidé absent");
if (!autonomy.includes("Revue humaine ciblée")) failures.push("Principe de revue humaine ciblée absent");
if (!beginner.includes("Glossaire") || !beginner.includes("term-help")) failures.push("Glossaire ou infobulles débutant absents");
if (!beginner.includes('["Importer", "Exporter"]')) failures.push("Importer/Exporter restent dans la navigation principale");
if (!runtime.includes("autonomyMode")) failures.push("Runtime ne respecte pas le mode autonomie");

if (!tc02.includes('module.status = "core"')) failures.push("TC02 n’est pas promu au statut cœur");
if (!tc03.includes('module.status = "core"')) failures.push("TC03 n’est pas promu au statut cœur");
if (!tc04.includes('module.status = "core"')) failures.push("TC04 n’est pas promu au statut cœur");
if (!tc03.includes('module.critical = true')) failures.push("TC03 critique n’est pas marqué comme tel");
if (!tc04.includes('module.critical = true')) failures.push("TC04 critique n’est pas marqué comme tel");
if (!tc04.includes('module.quizThresholdCount = 11')) failures.push("Seuil TC04 11/12 absent");
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
  tc01Mission: "1.6",
  tc01MissionSteps: 8,
  tc01LearnerResults: 2,
  tc01ChallengeQuestions: 8,
  tc01RcMicroMission: true,
  tc01IdeVatMicroMission: true,
  tc01RealRegistryExercise: "Nestlé S.A.",
  beginnerGlossary: true,
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