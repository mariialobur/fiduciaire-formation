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
const feedback = "Revue QA documentée: finalité, sujet, période, pièces, droits, contrôles, risques et escalades ont été revus; le dossier est traçable et reprenable par un autre collaborateur.";

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
  return JSON.parse(window.localStorage.getItem(KEY));
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
    document.getElementById(`score-${item.id}`).value = String(item.max);
  });
  module.practicalReview.criticalChecks.forEach((item) => {
    document.getElementById(`critical-${item.id}`).value = "no";
  });
  document.getElementById("practicalReviewer").value = "QA-RESP";
  document.getElementById("practicalDate").value = "2026-09-05";
  document.getElementById("practicalDecision").value = "passed";
  document.getElementById("practicalFeedback").value = feedback;
}

function completeModule(code) {
  navigate(`#module/${code}`);
  const module = window.FIDUCIAIRE_DATA.modules[code];
  answerQuiz(module);
  window.FiduApp.gradeQuiz(code);
  let stored = storedProgress();
  assert(stored.modules[code].quizPassed === true, `${code}: quiz correct non validé`);

  document.getElementById("artifactNotes").value = `Conclusion QA ${code}. Les faits, la période, les pièces, contrôles, sources, risques, inconnues et escalades ont été documentés de manière reproductible. Les décisions dépassant le périmètre du module restent explicitement soumises à la personne responsable.`;
  fillEvidence(module);
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
assert(publishedCore.length === 3, "Le pilote doit contenir exactement TC01–TC03 publiés à ce stade");
assert(blueprints.length === 22, "Le pilote doit contenir 22 blueprints à ce stade");
assert(document.querySelector(".public-trust")?.textContent.includes("3 modules complets sur 25"), "Compteur public 3/25 incorrect");
assert(document.querySelector(".hero-lead")?.textContent.includes("22 compétences"), "Texte de maturité de l’accueil incorrect");

// TC04 remains the only Month 1 blueprint blocker.
navigate("#module/TC04");
assert(document.querySelector(".blueprint-assessment"), "TC04 n’affiche pas son blocage de maturité");
assert(!document.querySelector("#quizForm"), "TC04 blueprint expose un quiz actif");
assert(!document.querySelector("#artifactNotes"), "TC04 blueprint expose un artefact validable");

// Published module invariants.
const tc01 = window.FIDUCIAIRE_DATA.modules.TC01;
const tc02 = window.FIDUCIAIRE_DATA.modules.TC02;
const tc03 = window.FIDUCIAIRE_DATA.modules.TC03;
assert(tc01.contentVersion === "1.4" && tc01.quiz.length === 16 && tc01.quizThresholdCount === 14, "Invariant TC01 cassé");
assert(tc01.quiz.filter((q) => q.critical).length === 4 && tc01.evidenceItems.length === 6, "Contrôles TC01 cassés");
assert(tc02.contentVersion === "1.0" && tc02.quiz.length === 12 && tc02.quizThresholdCount === 10, "Invariant TC02 cassé");
assert(tc02.quiz.filter((q) => q.critical).length === 2 && tc02.evidenceItems.length === 6, "Contrôles TC02 cassés");
assert(tc03.contentVersion === "1.0" && tc03.status === "core" && tc03.critical === true, "TC03 v1.0 critique absent");
assert(tc03.quiz.length === 12 && tc03.quizThresholdCount === 11, "Seuil TC03 incorrect");
assert(tc03.quiz.filter((q) => q.critical).length === 3, "TC03 doit contenir 3 questions critiques");
assert(tc03.evidenceItems.length === 6, "TC03 doit contenir 6 preuves");
assert(tc03.practicalReview.scoreItems.reduce((sum, item) => sum + item.max, 0) === 100, "Grille TC03 ne totalise pas 100");
assert(tc03.practicalReview.criticalChecks.length === 4, "TC03 doit contenir 4 erreurs critiques pratiques");
assert(tc03.sourceRefs.length === 6, "TC03 doit contenir 6 sources principales");
tc03.sourceRefs.forEach((key) => assert(window.FIDUCIAIRE_DATA.sourcesRegistry.sources[key], `Source TC03 absente: ${key}`));

// Learner package is transparent, file-by-file, no fake ZIP.
navigate("#module/TC03");
assert(document.querySelectorAll(".course-pack-actions > a").length === 10, "Paquet TC03 n’expose pas 10 fichiers");
assert(!document.querySelector(".course-pack-actions > a.btn"), "TC03 affiche un faux bouton ZIP");
assert(document.querySelector(".validation-panel button + .fine-print")?.textContent.includes("revue pratique 80/100"), "Aide de validation TC03 incorrecte");

// Incomplete TC03 quiz must not reveal solutions.
document.querySelector('input[name="q0"][value="1"]').checked = true;
window.FiduApp.gradeQuiz("TC03");
assert(document.getElementById("explain-0").textContent === "", "TC03 révèle une solution avant remise complète");

// Critical miss: 11/12 is numerically enough but Q03 critical must block.
navigate("#module/TC03");
answerQuiz(tc03, (question, index) => index === 2 ? (question.answer + 1) % question.choices.length : question.answer);
window.FiduApp.gradeQuiz("TC03");
let stored = storedProgress();
assert(stored.modules.TC03.lastQuizAttempt.correct === 11, "Scénario critique TC03 ne produit pas 11/12");
assert(stored.modules.TC03.quizPassed === false, "TC03 accepte 11/12 avec Q03 critique fausse");
assert(stored.modules.TC03.lastQuizAttempt.criticalMissed.includes("Q03"), "TC03 n’identifie pas Q03 critique");

// Non-critical miss: 11/12 with all critical answers correct must pass.
navigate("#module/TC03");
const firstNonCritical = tc03.quiz.findIndex((q) => !q.critical);
answerQuiz(tc03, (question, index) => index === firstNonCritical ? (question.answer + 1) % question.choices.length : question.answer);
window.FiduApp.gradeQuiz("TC03");
stored = storedProgress();
assert(stored.modules.TC03.lastQuizAttempt.correct === 11, "Seuil TC03 ne produit pas 11/12");
assert(stored.modules.TC03.quizPassed === true, "TC03 refuse 11/12 avec critiques correctes");

// Complete all three published modules and practical reviews.
completeModule("TC01");
completeModule("TC02");
completeModule("TC03");

// One practical critical error must block TC03 even at 100 points.
navigate("#module/TC03");
fillPractical(tc03);
document.getElementById("critical-incident_hidden").value = "yes";
window.FiduApp.savePracticalReview("TC03");
stored = storedProgress();
assert(!stored.modules.TC03.practicalReview, "TC03 accepte une erreur pratique critique");
document.getElementById("critical-incident_hidden").value = "no";
window.FiduApp.savePracticalReview("TC03");
stored = storedProgress();
assert(stored.modules.TC03.practicalReview?.passed === true, "TC03 ne revalide pas après correction critique");

// Editing evidence after review invalidates the dependent review.
navigate("#module/TC03");
document.getElementById("artifactNotes").value += " Modification post-revue.";
window.FiduApp.saveArtifact("TC03");
stored = storedProgress();
assert(stored.modules.TC03.status === "quiz_passed", "TC03 ne revient pas à l’étape artefact après modification");
assert(!stored.modules.TC03.practicalReview, "TC03 conserve une revue après modification de preuve");

// A new failed critical quiz attempt also removes prior trust.
navigate("#module/TC03");
answerQuiz(tc03, (question, index) => index === 6 ? (question.answer + 1) % question.choices.length : question.answer);
window.FiduApp.gradeQuiz("TC03");
stored = storedProgress();
assert(stored.modules.TC03.quizPassed === false, "TC03 conserve la réussite après nouvelle erreur critique Q07");
assert(stored.modules.TC03.status === "in_progress", "TC03 ne revient pas en cours après échec critique");

// Month 1 must now be blocked only by TC04.
navigate("#month/1");
const warning = document.querySelector(".development-warning")?.textContent || "";
assert(warning.includes("TC04"), "Mois 1 n’identifie pas TC04 comme bloqueur");
assert(!warning.includes("TC02") && !warning.includes("TC03"), "Mois 1 marque encore TC02/TC03 comme blueprints");
assert(document.querySelector('button[onclick="FiduApp.saveMonthReview(1)"]')?.disabled, "Revue mois 1 active avant TC04");

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
  publishedCore: 3,
  blueprints: 22,
  tc01: { version: tc01.contentVersion, quiz: 16, critical: 4, evidence: 6 },
  tc02: { version: tc02.contentVersion, quiz: 12, critical: 2, evidence: 6 },
  tc03: { version: tc03.contentVersion, quiz: 12, critical: 3, evidence: 6, practicalMax: 100 },
  month1BlockedBy: ["TC04"],
  browserErrors: errors.length
}, null, 2));
