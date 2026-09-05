const { readFileSync } = require("node:fs");
const { JSDOM, VirtualConsole } = require("jsdom");

const html = readFileSync("index.html", "utf8");
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
const PUBLISHED = new Set(["core", "production", "pilot"]);
const feedback = "Revue QA documentée: faits, pièces, sources, contrôles, risques, inconnues, limites de délégation et escalades ont été revus; le dossier est traçable et reprenable par un autre collaborateur.";

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

function enhance() {
  if (window.FIDUCIAIRE_MATURITY) window.FIDUCIAIRE_MATURITY.enhanceRenderedPage();
}

function navigate(hash) {
  window.location.hash = hash;
  window.FiduApp.route();
  enhance();
}

function storedProgress() {
  const raw = window.localStorage.getItem(KEY);
  assert(raw, "Progression locale absente");
  return JSON.parse(raw);
}

function answerQuiz(module, answerForIndex = (question) => question.answer) {
  module.quiz.forEach((question, index) => {
    const answer = answerForIndex(question, index);
    const input = document.querySelector(`input[name="q${index}"][value="${answer}"]`);
    assert(input, `${module.code}: réponse q${index + 1} introuvable`);
    input.checked = true;
  });
}

function fillEvidence(module, version = "v1") {
  module.evidenceItems.forEach((item, index) => {
    const input = document.getElementById(`evidence-${item.id}`);
    assert(input, `${module.code}: champ de preuve absent ${item.id}`);
    input.value = `${module.code}/QA/${index + 1}-${item.id}-${version}`;
  });
}

function fillPractical(module) {
  module.practicalReview.scoreItems.forEach((item) => {
    const input = document.getElementById(`score-${item.id}`);
    assert(input, `${module.code}: score pratique absent ${item.id}`);
    input.value = String(item.max);
  });
  module.practicalReview.criticalChecks.forEach((item) => {
    const select = document.getElementById(`critical-${item.id}`);
    assert(select, `${module.code}: contrôle critique absent ${item.id}`);
    select.value = "no";
  });
  document.getElementById("practicalReviewer").value = "QA-RESP";
  document.getElementById("practicalDate").value = "2026-09-05";
  document.getElementById("practicalDecision").value = "passed";
  document.getElementById("practicalFeedback").value = feedback;
}

function completeModule(code, evidenceVersion = "v1") {
  navigate(`#module/${code}`);
  const module = window.FIDUCIAIRE_DATA.modules[code];
  answerQuiz(module);
  window.FiduApp.gradeQuiz(code);
  let stored = storedProgress();
  assert(stored.modules[code].quizPassed === true, `${code}: quiz correct non validé`);

  document.getElementById("artifactNotes").value = `Conclusion QA ${code}. Les faits, la période, les pièces, contrôles, sources, risques, inconnues et escalades ont été documentés de manière reproductible. Les décisions dépassant le périmètre du module restent explicitement soumises à la personne responsable et aucune donnée réelle n’est utilisée.`;
  fillEvidence(module, evidenceVersion);
  window.FiduApp.submitModule(code);
  stored = storedProgress();
  assert(stored.modules[code].status === "review_ready", `${code}: ne passe pas prêt pour revue`);
  assert(Object.keys(stored.modules[code].evidenceRefs || {}).length === module.evidenceItems.length, `${code}: preuves non stockées`);

  fillPractical(module);
  window.FiduApp.savePracticalReview(code);
  stored = storedProgress();
  assert(stored.modules[code].practicalReview?.passed === true, `${code}: revue pratique correcte non validée`);
  assert(stored.modules[code].practicalReview.score === 100, `${code}: score pratique non 100/100`);
  return module;
}

// Home / maturity.
enhance();
assert(document.querySelector("h1")?.textContent.includes("autonomie"), "Accueil non rendu");
assert(document.querySelectorAll(".month-card").length === 12, "La feuille de route ne contient pas 12 mois");
assert(window.FIDUCIAIRE_ROADMAP.coreModules.length === 25, "Le parcours ne contient pas 25 compétences cœur");
const coreModules = window.FIDUCIAIRE_ROADMAP.coreModules.map((code) => window.FIDUCIAIRE_DATA.modules[code]);
const publishedCore = coreModules.filter((module) => PUBLISHED.has(module.status));
const blueprints = coreModules.filter((module) => module.status === "blueprint");
assert(publishedCore.length === 4, "Le pilote doit contenir exactement TC01–TC04 publiés à ce stade");
assert(blueprints.length === 21, "Le pilote doit contenir 21 blueprints à ce stade");
assert(document.querySelector(".public-trust")?.textContent.includes("4 modules complets sur 25"), "Compteur public 4/25 incorrect");
assert(document.querySelector(".hero-lead")?.textContent.includes("21 compétences"), "Texte de maturité de l’accueil incorrect");

const tc01 = window.FIDUCIAIRE_DATA.modules.TC01;
const tc02 = window.FIDUCIAIRE_DATA.modules.TC02;
const tc03 = window.FIDUCIAIRE_DATA.modules.TC03;
const tc04 = window.FIDUCIAIRE_DATA.modules.TC04;

// Published module invariants.
assert(tc01.contentVersion === "1.4" && tc01.quiz.length === 16 && tc01.quizThresholdCount === 14, "Invariant TC01 cassé");
assert(tc01.quiz.filter((q) => q.critical).length === 4 && tc01.evidenceItems.length === 6, "Contrôles TC01 cassés");
assert(tc02.contentVersion === "1.0" && tc02.quiz.length === 12 && tc02.quizThresholdCount === 10, "Invariant TC02 cassé");
assert(tc02.quiz.filter((q) => q.critical).length === 2 && tc02.evidenceItems.length === 6, "Contrôles TC02 cassés");
assert(tc03.contentVersion === "1.0" && tc03.critical === true && tc03.quizThresholdCount === 11, "Invariant TC03 cassé");
assert(tc03.quiz.filter((q) => q.critical).length === 3 && tc03.evidenceItems.length === 6, "Contrôles TC03 cassés");
assert(tc04.contentVersion === "1.0" && tc04.status === "core" && tc04.critical === true, "TC04 v1.0 critique absent");
assert(tc04.quiz.length === 12 && tc04.quizThresholdCount === 11, "Seuil TC04 incorrect");
assert(tc04.quiz.filter((q) => q.critical).length === 3, "TC04 doit contenir 3 questions critiques");
assert(tc04.evidenceItems.length === 6, "TC04 doit contenir 6 preuves");
assert(tc04.practicalReview.scoreItems.reduce((sum, item) => sum + item.max, 0) === 100, "Grille TC04 ne totalise pas 100");
assert(tc04.practicalReview.criticalChecks.length === 4, "TC04 doit contenir 4 erreurs critiques pratiques");
assert(tc04.sourceRefs.length === 7, "TC04 doit contenir 7 sources principales");
tc04.sourceRefs.forEach((key) => assert(window.FIDUCIAIRE_DATA.sourcesRegistry.sources[key], `Source TC04 absente: ${key}`));
assert(tc04.sections.some((section) => String(section.bodyHtml || "").includes("1er octobre 2026")), "TC04 ne matérialise pas le changement de régime au 01.10.2026");

// Learner package is transparent and file-by-file.
navigate("#module/TC04");
assert(document.querySelectorAll(".course-pack-actions > a").length === 10, "Paquet TC04 n’expose pas 10 fichiers");
assert(!document.querySelector(".course-pack-actions > a.btn"), "TC04 affiche un faux bouton ZIP");
assert(document.querySelector(".validation-panel button + .fine-print")?.textContent.includes("revue pratique 80/100"), "Aide de validation TC04 incorrecte");

// Incomplete TC04 quiz must not reveal solutions.
document.querySelector('input[name="q0"][value="1"]').checked = true;
window.FiduApp.gradeQuiz("TC04");
assert(document.getElementById("explain-0").textContent === "", "TC04 révèle une solution avant remise complète");

// Critical date miss: numerical 11/12 is insufficient if Q03 is wrong.
navigate("#module/TC04");
answerQuiz(tc04, (question, index) => index === 2 ? (question.answer + 1) % question.choices.length : question.answer);
window.FiduApp.gradeQuiz("TC04");
let stored = storedProgress();
assert(stored.modules.TC04.lastQuizAttempt.correct === 11, "Scénario critique TC04 ne produit pas 11/12");
assert(stored.modules.TC04.quizPassed === false, "TC04 accepte 11/12 avec Q03 critique fausse");
assert(stored.modules.TC04.lastQuizAttempt.criticalMissed.includes("Q03"), "TC04 n’identifie pas Q03 critique");

// One non-critical miss is acceptable at 11/12 if all critical answers are correct.
navigate("#module/TC04");
const tc04NonCritical = tc04.quiz.findIndex((q) => !q.critical);
answerQuiz(tc04, (question, index) => index === tc04NonCritical ? (question.answer + 1) % question.choices.length : question.answer);
window.FiduApp.gradeQuiz("TC04");
stored = storedProgress();
assert(stored.modules.TC04.lastQuizAttempt.correct === 11, "Seuil TC04 ne produit pas 11/12");
assert(stored.modules.TC04.quizPassed === true, "TC04 refuse 11/12 avec critiques correctes");

// Complete the four published modules and their practical reviews.
completeModule("TC01");
completeModule("TC02");
completeModule("TC03");
completeModule("TC04");

// A second practical review with a critical error must invalidate stale trust.
navigate("#module/TC04");
fillPractical(tc04);
document.getElementById("critical-service_accepted").value = "yes";
window.FiduApp.savePracticalReview("TC04");
stored = storedProgress();
assert(!stored.modules.TC04.practicalReview, "TC04 conserve une ancienne revue malgré une nouvelle erreur critique");
assert(stored.modules.TC04.status === "review_ready", "TC04 ne reste pas prêt à revoir après échec pratique critique");

// Re-review correctly after the failed attempt.
navigate("#module/TC04");
fillPractical(tc04);
window.FiduApp.savePracticalReview("TC04");
stored = storedProgress();
assert(stored.modules.TC04.practicalReview?.passed === true, "TC04 ne revalide pas après correction de la revue pratique");

// Month 1 is now content-complete and must no longer show a development blocker.
navigate("#month/1");
assert(!document.querySelector(".development-warning"), "Mois 1 reste bloqué alors que TC01–TC04 sont publiés");
assert(!document.querySelector('button[onclick="FiduApp.saveMonthReview(1)"]')?.disabled, "Bouton de revue du mois 1 reste désactivé après publication TC04");

const month1 = window.FIDUCIAIRE_ROADMAP.months.find((month) => month.month === 1);
assert(month1 && month1.modules.length === 4, "Mois 1 doit contenir quatre modules");
month1.practice.forEach((_, index) => window.FiduApp.toggleMonthTask(1, "practice", index, true));
month1.deliverables.forEach((_, index) => window.FiduApp.toggleMonthTask(1, "deliverables", index, true));

navigate("#month/1");
const monthEvidence = "Pilotage QA du Mois 1: ouverture du dossier, séparation juridique et patrimoniale, droits d’accès, KYC, chaîne de contrôle, services demandés, pièces manquantes, erreurs corrigées et limites de délégation ont été documentés sur un cas simulé puis revus.";
document.getElementById("monthEvidence").value = monthEvidence;
window.FiduApp.saveMonthEvidence(1);

navigate("#month/1");
document.getElementById("reviewerName").value = "QA-RESP";
document.getElementById("reviewerDate").value = "2026-09-05";
document.getElementById("reviewerDecision").value = "validated";
document.getElementById("reviewerFeedback").value = feedback;
window.FiduApp.saveMonthReview(1);
stored = storedProgress();
assert(stored.months[1]?.validatedAt === "2026-09-05", "Jalon Mois 1 complet n’est pas validé");
assert(month1.modules.every((code) => stored.modules[code]?.status === "validated"), "Les quatre modules du Mois 1 ne passent pas validés avec le jalon");
assert(stored.months[1]?.validationSnapshot, "Snapshot de validation du Mois 1 absent");

// Any material evidence change after monthly validation must invalidate the month.
navigate("#module/TC04");
document.getElementById("artifactNotes").value += " Modification post-validation mensuelle.";
window.FiduApp.saveArtifact("TC04");
stored = storedProgress();
assert(!stored.months[1]?.validatedAt, "Mois 1 reste validé après modification d’une preuve TC04");
assert(!stored.months[1]?.validationSnapshot, "Snapshot Mois 1 subsiste après modification d’une preuve");
assert(stored.modules.TC04.status === "quiz_passed", "TC04 ne revient pas à l’étape artefact après modification post-validation");
assert(!stored.modules.TC04.practicalReview, "Revue pratique TC04 subsiste après modification de preuve");
assert(["review_ready", "quiz_passed"].includes(stored.modules.TC01.status), "Dépendances du Mois 1 non réinitialisées correctement");

// Library and core utilities remain intact.
navigate("#library");
assert(document.querySelectorAll(".track-card").length === 11, "Bibliothèque ne contient pas 11 secteurs");
assert(document.querySelector(".library-warning"), "Avertissement bibliothèque absent");
assert(typeof window.FiduApp.exportProgress === "function", "Export progression absent");
assert(typeof window.FiduApp.importProgress === "function", "Import progression absent");
assert(typeof window.FiduApp.resetProgress === "function", "Effacement local absent");
assert(errors.length === 0, `Erreurs navigateur: ${errors.join(" | ")}`);

console.log(JSON.stringify({
  smoke: true,
  coreModules: 25,
  publishedCore: 4,
  blueprints: 21,
  month1: { content: "4/4", validationLifecycle: true, invalidationAfterEvidenceChange: true },
  tc01: { version: tc01.contentVersion, quiz: 16, critical: 4, evidence: 6 },
  tc02: { version: tc02.contentVersion, quiz: 12, critical: 2, evidence: 6 },
  tc03: { version: tc03.contentVersion, quiz: 12, critical: 3, evidence: 6 },
  tc04: { version: tc04.contentVersion, quiz: 12, critical: 3, evidence: 6, practicalMax: 100 },
  browserErrors: errors.length
}, null, 2));
