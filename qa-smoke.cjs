const { readFileSync } = require("node:fs");
const { JSDOM, VirtualConsole } = require("jsdom");

const html = readFileSync("index.html", "utf8");
const staticSources = JSON.parse(readFileSync("data/sources-registry.json", "utf8"));
const errors = [];
const virtualConsole = new VirtualConsole();
virtualConsole.on("jsdomError", (error) => errors.push(error.message));
virtualConsole.on("error", (message) => errors.push(String(message)));

const dom = new JSDOM(html, {
  url: "https://formation.test/#home",
  runScripts: "dangerously",
  pretendToBeVisual: true,
  virtualConsole,
  beforeParse(window) {
    window.scrollTo = () => {};
    window.confirm = () => true;
    window.URL.createObjectURL = () => "blob:test";
    window.URL.revokeObjectURL = () => {};
  }
});

const { window } = dom;
const document = window.document;
const KEY = "fiduciaire_formation_progress_v24";
const assert = (condition, message) => {
  if (!condition) throw new Error(message);
};
const navigate = (hash) => {
  window.location.hash = hash;
  window.FiduApp.route();
};
const feedback = "Revue documentée: les pouvoirs, le périmètre, le calendrier, les preuves et les seuils d’escalade ont été contrôlés; les corrections demandées sont tracées.";

assert(document.querySelector("h1").textContent.includes("autonomie"), "Accueil non rendu");
assert(document.querySelector(".public-trust").textContent.includes("1 module complet sur 25"), "Statut du pilote public absent");
assert(document.querySelector(".skip-link").getAttribute("href") === "#main-content", "Lien d’évitement incorrect");
assert(document.querySelector(".skip-link").getAttribute("onclick").includes("preventDefault"), "Le lien d’évitement entre en conflit avec le routeur");
assert(document.querySelector('a[aria-current="page"]').textContent === "Parcours", "Navigation active incorrecte sur l’accueil");
assert(document.querySelectorAll(".month-card").length === 12, "La feuille de route ne contient pas 12 mois");
assert(window.FIDUCIAIRE_ROADMAP.version === "2.4", "Version 2.4 absente");
assert(window.FIDUCIAIRE_ROADMAP.coreModules.length === 25, "Le parcours ne contient pas 25 compétences cœur");
const roadmapModules = window.FIDUCIAIRE_ROADMAP.coreModules.map((code) => window.FIDUCIAIRE_DATA.modules[code]);
assert(roadmapModules.filter((module) => module.status === "core").length === 1, "TC01 doit être le seul module cœur publié");
assert(roadmapModules.filter((module) => module.status === "blueprint").length === 24, "Les 24 compétences restantes doivent être non validables");

navigate("#module/TC02");
assert(document.querySelector(".blueprint-assessment"), "TC02 n’affiche pas le blocage de maturité");
assert(!document.querySelector("#quizForm"), "Un quiz est encore actif sur une fiche de cadrage");
assert(!document.querySelector("#artifactNotes"), "Un artefact est encore validable sur une fiche de cadrage");

navigate("#module/TC01");
assert(document.title.startsWith("TC01"), "Le titre de page TC01 n’est pas contextualisé");
assert(document.querySelector('a[aria-current="page"]').textContent === "Mois actuel", "Navigation active incorrecte dans TC01");
assert(document.querySelector("#main-content") === document.activeElement, "Le focus n’est pas déplacé vers le contenu après navigation");
const tc01 = window.FIDUCIAIRE_DATA.modules.TC01;
assert(tc01.quiz.length === 16, "TC01 ne contient pas 16 questions");
assert(tc01.quiz.filter((question) => question.critical).length === 4, "TC01 ne contient pas 4 questions critiques");
assert(tc01.quizThresholdCount === 14, "Le seuil TC01 doit être 14/16");
assert(tc01.sourceRefs.includes("TC01_OBA"), "OBA RS 955.01 n’est pas rattachée à TC01");
tc01.sourceRefs.forEach((key) => {
  assert(staticSources.sources[key], `Source TC01 absente du registre statique: ${key}`);
  assert(staticSources.sources[key].url === window.FIDUCIAIRE_DATA.sourcesRegistry.sources[key].url, `URL désynchronisée pour ${key}`);
});
const answerDistribution = tc01.quiz.reduce((counts, question) => {
  counts[question.answer] += 1;
  return counts;
}, [0, 0, 0, 0]);
assert(answerDistribution.every((count) => count === 4), "Les réponses A–D ne sont pas réparties 4/4/4/4");
assert(document.querySelectorAll(".evidence-row").length === 6, "Les 6 preuves TC01 ne sont pas rendues");
assert(document.querySelector(".course-pack"), "Le paquet apprenant TC01 est absent");
const renderedIds = [...document.querySelectorAll("[id]")].map((element) => element.id);
assert(new Set(renderedIds).size === renderedIds.length, "Des identifiants HTML sont dupliqués dans TC01");

document.querySelector('input[name="q0"][value="2"]').checked = true;
window.FiduApp.gradeQuiz("TC01");
assert(!document.querySelector("#quizResult").classList.contains("good"), "Un quiz incomplet a été accepté");
assert(document.querySelector("#explain-0").textContent === "", "La solution a été révélée avant la fin du quiz");

tc01.quiz.forEach((question, index) => {
  const answer = index === 0 ? 0 : question.answer;
  document.querySelector(`input[name="q${index}"][value="${answer}"]`).checked = true;
});
window.FiduApp.gradeQuiz("TC01");
let stored = JSON.parse(window.localStorage.getItem(KEY));
assert(stored.modules.TC01.quizPassed === false, "Une erreur sur Q01 critique a été acceptée malgré 15/16");
assert(stored.modules.TC01.lastQuizAttempt.criticalMissed.includes("Q01"), "Q01 critique n’est pas identifiée");

const nonCriticalIndexes = tc01.quiz.map((question, index) => question.critical ? null : index).filter((index) => index !== null);
tc01.quiz.forEach((question, index) => {
  const wrong = nonCriticalIndexes.slice(0, 3).includes(index);
  const answer = wrong ? (question.answer + 1) % question.choices.length : question.answer;
  document.querySelector(`input[name="q${index}"][value="${answer}"]`).checked = true;
});
window.FiduApp.gradeQuiz("TC01");
stored = JSON.parse(window.localStorage.getItem(KEY));
assert(stored.modules.TC01.lastQuizAttempt.correct === 13, "Le scénario de seuil ne produit pas 13/16");
assert(stored.modules.TC01.lastQuizAttempt.criticalMissed.length === 0, "Le scénario 13/16 ne doit manquer aucune critique");
assert(stored.modules.TC01.quizPassed === false, "13/16 a été accepté malgré le seuil critique de 14/16");

tc01.quiz.forEach((question, index) => {
  const wrong = nonCriticalIndexes.slice(0, 2).includes(index);
  const answer = wrong ? (question.answer + 1) % question.choices.length : question.answer;
  document.querySelector(`input[name="q${index}"][value="${answer}"]`).checked = true;
});
window.FiduApp.gradeQuiz("TC01");
stored = JSON.parse(window.localStorage.getItem(KEY));
assert(stored.modules.TC01.lastQuizAttempt.correct === 14, "Le scénario de seuil ne produit pas 14/16");
assert(stored.modules.TC01.quizPassed === true, "14/16 avec les quatre critiques correctes n’est pas validé");

tc01.quiz.forEach((question, index) => {
  document.querySelector(`input[name="q${index}"][value="${question.answer}"]`).checked = true;
});
window.FiduApp.gradeQuiz("TC01");
stored = JSON.parse(window.localStorage.getItem(KEY));
assert(stored.modules.TC01.quizPassed === true, "Le quiz TC01 correct n’est pas validé");
assert(stored.modules.TC01.quizBestCorrect === 16, "Le score TC01 n’est pas 16/16");

document.getElementById("artifactNotes").value = "Conclusion GO sous conditions. Le RC, l’IDE, la délégation, le mandat et l’échéance TVA au 31 août 2026 ont été contrôlés. Paie et paiements restent hors mandat; les accès et données sont limités; les pièces, hypothèses, versions et points à valider sont tracés pour la revue.";
tc01.evidenceItems.forEach((item, index) => {
  document.getElementById(`evidence-${item.id}`).value = `TC01/ML-01/${index + 1}-${item.id}-v2.xlsx`;
});
window.FiduApp.submitModule("TC01");
stored = JSON.parse(window.localStorage.getItem(KEY));
assert(stored.modules.TC01.status === "review_ready", "TC01 ne passe pas prêt pour revue");
assert(Object.keys(stored.modules.TC01.evidenceRefs).length === 6, "Les références de preuves ne sont pas stockées");

tc01.practicalReview.scoreItems.forEach((item) => {
  document.getElementById(`score-${item.id}`).value = String(item.max);
});
tc01.practicalReview.criticalChecks.forEach((item) => {
  document.getElementById(`critical-${item.id}`).value = "no";
});
document.getElementById("critical-authority").value = "yes";
document.getElementById("practicalReviewer").value = "RS-01";
document.getElementById("practicalDate").value = "2026-08-05";
document.getElementById("practicalDecision").value = "passed";
document.getElementById("practicalFeedback").value = feedback;
window.FiduApp.savePracticalReview("TC01");
stored = JSON.parse(window.localStorage.getItem(KEY));
assert(!stored.modules.TC01.practicalReview, "Une erreur critique a été acceptée");

document.getElementById("critical-authority").value = "no";
window.FiduApp.savePracticalReview("TC01");
stored = JSON.parse(window.localStorage.getItem(KEY));
assert(stored.modules.TC01.practicalReview.passed === true, "La pratique TC01 correcte n’est pas validée");
assert(stored.modules.TC01.practicalReview.score === 100, "Le score pratique TC01 n’est pas 100/100");

navigate("#module/TC01");
tc01.quiz.forEach((question, index) => {
  const answer = index === 0 ? 0 : question.answer;
  document.querySelector(`input[name="q${index}"][value="${answer}"]`).checked = true;
});
window.FiduApp.gradeQuiz("TC01");
stored = JSON.parse(window.localStorage.getItem(KEY));
assert(stored.modules.TC01.quizPassed === false, "La dernière tentative critique échouée n’a pas retiré la réussite du quiz");
assert(stored.modules.TC01.status === "in_progress", "Le module n’est pas revenu en cours après un échec critique");
assert(!stored.modules.TC01.practicalReview, "La revue pratique subsiste après un nouvel échec critique");

tc01.quiz.forEach((question, index) => {
  document.querySelector(`input[name="q${index}"][value="${question.answer}"]`).checked = true;
});
window.FiduApp.gradeQuiz("TC01");
document.getElementById("artifactNotes").value = "Conclusion GO sous conditions. Le RC, l’IDE, la délégation, le mandat et l’échéance TVA au 31 août 2026 ont été contrôlés. Paie et paiements restent hors mandat; les accès et données sont limités; les pièces, hypothèses, versions et points à valider sont tracés pour la revue.";
tc01.evidenceItems.forEach((item, index) => {
  document.getElementById(`evidence-${item.id}`).value = `TC01/ML-01/${index + 1}-${item.id}-v3.xlsx`;
});
window.FiduApp.submitModule("TC01");
tc01.practicalReview.scoreItems.forEach((item) => { document.getElementById(`score-${item.id}`).value = String(item.max); });
tc01.practicalReview.criticalChecks.forEach((item) => { document.getElementById(`critical-${item.id}`).value = "no"; });
document.getElementById("practicalReviewer").value = "RS-01";
document.getElementById("practicalDate").value = "2026-08-06";
document.getElementById("practicalDecision").value = "passed";
document.getElementById("practicalFeedback").value = feedback;
window.FiduApp.savePracticalReview("TC01");
stored = JSON.parse(window.localStorage.getItem(KEY));
assert(stored.modules.TC01.practicalReview.passed === true, "TC01 n’est pas revalidable après reprise correcte");

["TC02", "TC03", "TC04"].forEach((code) => {
  stored.modules[code] = { status: "review_ready", quizBest: 100, quizPassed: true, artifactNote: "Artefact documenté pour le test de validation mensuelle. ".repeat(4) };
});
stored.months[1] = {
  practice: [true, true, true],
  deliverables: [true, true, true],
  external: [],
  evidence: "Dossier anonymisé complet: contrôles, pièces, erreurs corrigées, limites de délégation et références des fichiers ont été documentés puis revus selon la procédure interne du cabinet."
};
window.localStorage.setItem(KEY, JSON.stringify(stored));
navigate("#month/1");
document.getElementById("reviewerName").value = "RS-01";
document.getElementById("reviewerDate").value = "2026-08-05";
document.getElementById("reviewerDecision").value = "validated";
document.getElementById("reviewerFeedback").value = feedback;
window.FiduApp.saveMonthReview(1);
stored = JSON.parse(window.localStorage.getItem(KEY));
assert(!stored.months[1].validatedAt, "Le jalon mensuel a contourné les fiches de cadrage non publiées");
assert(document.querySelector("button[onclick=\"FiduApp.saveMonthReview(1)\"]").disabled, "Le bouton de revue mensuelle n’est pas désactivé quand le contenu est incomplet");

navigate("#module/TC01");
document.getElementById("artifactNotes").value += " Modification post-revue.";
window.FiduApp.saveArtifact("TC01");
stored = JSON.parse(window.localStorage.getItem(KEY));
assert(stored.modules.TC01.status === "quiz_passed", "TC01 ne revient pas à l’étape artefact après modification");
assert(!stored.modules.TC01.practicalReview, "La revue pratique subsiste après modification de preuve");

navigate("#library");
assert(document.querySelector('a[aria-current="page"]').textContent === "Bibliothèque", "Navigation active incorrecte dans la bibliothèque");
assert(document.querySelectorAll(".track-card").length === 11, "La bibliothèque ne contient pas 11 secteurs");
assert(document.querySelector(".library-warning"), "Avertissement qualité bibliothèque absent");
const sectorModule = Object.values(window.FIDUCIAIRE_DATA.modules).find((module) => module.track !== "tronc-commun");
navigate(`#module/${sectorModule.code}`);
assert(document.querySelector('a[aria-current="page"]').textContent === "Bibliothèque", "Un module sectoriel active le mauvais menu");
assert(errors.length === 0, `Erreurs navigateur: ${errors.join(" | ")}`);

assert(typeof window.FiduApp.importProgress === "function", "La restauration JSON n’est pas exposée");
const forgedProgress = JSON.parse(JSON.stringify(stored));
forgedProgress.modules.TC01 = Object.assign({}, forgedProgress.modules.TC01, {
  status: "validated",
  quizPassed: true,
  quizVersion: "1.3",
  validatedAt: "2026-08-06",
  practicalReview: { passed: true, score: 100, artifactSignature: "forged" }
});
forgedProgress.months[1] = Object.assign({}, forgedProgress.months[1] || {}, {
  validatedAt: "2026-08-06",
  reviewer: { name: "FORGED", date: "2026-08-06", decision: "validated", feedback }
});
const exportedPayload = JSON.stringify({
  program: { version: window.FIDUCIAIRE_ROADMAP.version },
  progress: forgedProgress
});
window.localStorage.removeItem(KEY);
window.FiduApp.importProgress(new window.File([exportedPayload], "progression.json", { type: "application/json" }));
setTimeout(() => {
  const restored = JSON.parse(window.localStorage.getItem(KEY));
  assert(restored && restored.version === "2.4", `La sauvegarde v2.4 n’a pas été restaurée (${document.getElementById("appToast")?.textContent || "aucun message"})`);
  assert(restored.modules.TC01.status === "in_progress", "Un statut module forgé a survécu à l’import");
  assert(restored.modules.TC01.quizPassed === false, "Un quizPassed forgé a survécu à l’import");
  assert(restored.modules.TC01.practicalReview === null, "Une revue pratique forgée a survécu à l’import");
  assert(!restored.modules.TC01.validatedAt, "Une date de validation module forgée a survécu à l’import");
  assert(!restored.months[1].validatedAt, "Une validation mensuelle forgée a survécu à l’import");
  assert(restored.months[1].reviewer.decision === "", "Une décision mensuelle forgée a survécu à l’import");
  assert(restored.modules.TC01.artifactNote.length > 0, "Le travail apprenant n’a pas été restauré");

  const previousKey = "fiduciaire_formation_progress_v23";
  window.localStorage.removeItem(KEY);
  window.localStorage.setItem(previousKey, JSON.stringify({
    version: "2.3",
    learner: { name: "ML-01", role: "Assistant·e comptable", startedAt: "2026-08-01", hoursPerWeek: 6 },
    modules: { TC01: { status: "review_ready", quizPassed: true, artifactNote: "Travail v2.3 conservé." } },
    months: {},
    lastVisited: { type: "module", code: "TC01" }
  }));
  window.FiduApp.renderHome();
  const migrated = JSON.parse(window.localStorage.getItem(KEY));
  assert(migrated.version === "2.4", "La progression locale v2.3 n’a pas migré vers v2.4");
  assert(migrated.modules.TC01.status === "review_ready", "La migration compatible v2.3 a perdu le statut de travail");
  assert(migrated.migratedFrom === "2.3", "La provenance de migration v2.3 n’est pas tracée");

  console.log(JSON.stringify({
    version: window.FIDUCIAIRE_ROADMAP.version,
    homeMonths: 12,
    coreCompetencies: 25,
    publishedCoreModules: 1,
    blockedBlueprints: 24,
    tc01Questions: tc01.quiz.length,
    tc01CriticalQuestions: tc01.quiz.filter((question) => question.critical).length,
    answerDistribution,
    tc01EvidenceItems: tc01.evidenceItems.length,
    criticalReviewBlock: true,
    latestAttemptRevocation: true,
    monthDevelopmentGate: true,
    postReviewInvalidation: true,
    jsonRestore: true,
    strictJsonValidationReset: true,
    compatibleMigrationFrom23: true,
    sectorTracks: 11,
    browserErrors: errors.length
  }, null, 2));
}, 200);
