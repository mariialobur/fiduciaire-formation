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

function answerQuiz(module, answerForIndex) {
  module.quiz.forEach((question, index) => {
    const answer = answerForIndex(question, index);
    const input = document.querySelector(`input[name="q${index}"][value="${answer}"]`);
    assert(input, `Réponse introuvable pour ${module.code || "module"} q${index + 1}`);
    input.checked = true;
  });
}

function fillEvidence(module, version) {
  module.evidenceItems.forEach((item, index) => {
    const input = document.getElementById(`evidence-${item.id}`);
    assert(input, `Champ de preuve absent: ${module.code}/${item.id}`);
    input.value = `${module.code}/QA/${index + 1}-${item.id}-${version}`;
  });
}

function fillMaxScores(module) {
  module.practicalReview.scoreItems.forEach((item) => {
    document.getElementById(`score-${item.id}`).value = String(item.max);
  });
}

function clearCriticalChecks(module) {
  module.practicalReview.criticalChecks.forEach((item) => {
    document.getElementById(`critical-${item.id}`).value = "no";
  });
}

const feedback = "Revue QA documentée: sujet, période, pièces, contrôles, risques et escalades ont été revus; les éléments sont traçables et le dossier est reprenable par un autre collaborateur.";

// Home and publication maturity.
enhance();
assert(document.querySelector("h1")?.textContent.includes("autonomie"), "Accueil non rendu");
assert(document.querySelectorAll(".month-card").length === 12, "La feuille de route ne contient pas 12 mois");
assert(window.FIDUCIAIRE_ROADMAP.coreModules.length === 25, "Le parcours ne contient pas 25 compétences cœur");

const coreModules = window.FIDUCIAIRE_ROADMAP.coreModules.map((code) => window.FIDUCIAIRE_DATA.modules[code]);
const publishedCore = coreModules.filter((module) => PUBLISHED.has(module.status));
const blueprints = coreModules.filter((module) => module.status === "blueprint");
assert(publishedCore.length + blueprints.length === 25, "Les statuts cœur ne couvrent pas les 25 compétences");
assert(PUBLISHED.has(window.FIDUCIAIRE_DATA.modules.TC01.status), "TC01 n’est pas publié");
assert(PUBLISHED.has(window.FIDUCIAIRE_DATA.modules.TC02.status), "TC02 n’est pas publié");
assert(window.FIDUCIAIRE_DATA.modules.TC03.status === "blueprint", "TC03 devrait encore être une fiche de cadrage");
assert(document.querySelector(".public-trust")?.textContent.includes(`${publishedCore.length} modules complets sur 25`), "Compteur public de maturité incorrect");
assert(document.querySelector(".hero-lead")?.textContent.includes(`${25 - publishedCore.length} compétences`), "Promesse de maturité de l’accueil incorrecte");

// Blueprint remains non-validable.
navigate("#module/TC03");
assert(document.querySelector(".blueprint-assessment"), "TC03 n’affiche pas le blocage de maturité");
assert(!document.querySelector("#quizForm"), "Un quiz est actif sur TC03 blueprint");
assert(!document.querySelector("#artifactNotes"), "Un artefact est validable sur TC03 blueprint");

// TC01 master invariants.
navigate("#module/TC01");
const tc01 = window.FIDUCIAIRE_DATA.modules.TC01;
assert(tc01.contentVersion === "1.4", "TC01 v1.4 absent");
assert(tc01.quiz.length === 16, "TC01 doit contenir 16 questions");
assert(tc01.quiz.filter((question) => question.critical).length === 4, "TC01 doit contenir 4 questions critiques");
assert(tc01.quizThresholdCount === 14, "TC01 doit exiger 14/16");
assert(tc01.evidenceItems.length === 6, "TC01 doit contenir 6 preuves");
assert(tc01.evidenceItems.some((item) => item.id === "verification_log"), "Le journal de vérification TC01 est absent");
assert(tc01.practicalReview.threshold === 80, "Seuil pratique TC01 incorrect");
assert(tc01.practicalReview.criticalChecks.length === 4, "Contrôles critiques TC01 incorrects");

answerQuiz(tc01, (question) => question.answer);
document.querySelector('input[name="q0"][value="0"]').checked = true;
window.FiduApp.gradeQuiz("TC01");
let stored = storedProgress();
assert(stored.modules.TC01.quizPassed === false, "TC01 accepte une erreur sur Q01 critique");

navigate("#module/TC01");
answerQuiz(tc01, (question) => question.answer);
window.FiduApp.gradeQuiz("TC01");
stored = storedProgress();
assert(stored.modules.TC01.quizPassed === true, "TC01 correct n’est pas validé");
assert(stored.modules.TC01.quizBestCorrect === 16, "TC01 n’enregistre pas 16/16");

// TC02 complete module.
navigate("#module/TC02");
const tc02 = window.FIDUCIAIRE_DATA.modules.TC02;
assert(tc02.contentVersion === "1.0", "TC02 v1.0 absent");
assert(tc02.status === "core", "TC02 n’est pas publié comme module cœur");
assert(tc02.quiz.length === 12, "TC02 doit contenir 12 questions");
assert(tc02.quiz.filter((question) => question.critical).length === 2, "TC02 doit contenir 2 questions critiques");
assert(tc02.quizThresholdCount === 10, "TC02 doit exiger 10/12");
assert(tc02.evidenceItems.length === 6, "TC02 doit contenir 6 preuves");
assert(tc02.practicalReview.threshold === 80, "Seuil pratique TC02 incorrect");
assert(tc02.practicalReview.scoreItems.reduce((sum, item) => sum + item.max, 0) === 100, "La grille TC02 ne totalise pas 100 points");
assert(tc02.practicalReview.criticalChecks.length === 4, "TC02 doit avoir 4 contrôles critiques");
assert(tc02.sourceRefs.length >= 6, "TC02 manque de sources");
tc02.sourceRefs.forEach((key) => assert(window.FIDUCIAIRE_DATA.sourcesRegistry.sources[key], `Source TC02 absente: ${key}`));
assert(document.querySelectorAll(".course-pack-actions > a").length === 10, "Le paquet apprenant TC02 n’expose pas ses 10 fichiers");
assert(!document.querySelector(".course-pack-actions > a.btn"), "TC02 affiche un faux bouton ZIP");
assert(document.querySelector(".validation-panel button + .fine-print")?.textContent.includes("revue pratique 80/100"), "Le texte de validation TC02 reste spécifique à TC01");

// Incomplete quiz cannot reveal corrections.
document.querySelector('input[name="q0"][value="1"]').checked = true;
window.FiduApp.gradeQuiz("TC02");
assert(document.getElementById("explain-0").textContent === "", "TC02 révèle une solution avant la fin du quiz");

// Critical failure despite otherwise correct answers.
answerQuiz(tc02, (question, index) => index === 2 ? 1 : question.answer);
window.FiduApp.gradeQuiz("TC02");
stored = storedProgress();
assert(stored.modules.TC02.quizPassed === false, "TC02 accepte une erreur sur Q03 critique");
assert(stored.modules.TC02.lastQuizAttempt.criticalMissed.includes("Q03"), "TC02 n’identifie pas Q03 critique");

// Exact threshold 10/12 with critical answers correct.
navigate("#module/TC02");
const nonCritical = tc02.quiz.map((question, index) => question.critical ? null : index).filter((index) => index !== null);
answerQuiz(tc02, (question, index) => nonCritical.slice(0, 2).includes(index) ? (question.answer + 1) % question.choices.length : question.answer);
window.FiduApp.gradeQuiz("TC02");
stored = storedProgress();
assert(stored.modules.TC02.lastQuizAttempt.correct === 10, "Le scénario TC02 ne produit pas 10/12");
assert(stored.modules.TC02.quizPassed === true, "TC02 refuse 10/12 avec les critiques correctes");

// Full quiz + artifacts -> review ready.
navigate("#module/TC02");
answerQuiz(tc02, (question) => question.answer);
window.FiduApp.gradeQuiz("TC02");
document.getElementById("artifactNotes").value = "Conclusion TC02: la date de coupure, les titulaires bancaires, les flux privés, la convention de reprise et les opérations antérieures à la constitution ont été contrôlés. Les écritures provisoires sont séparées des questions fiscales et juridiques restant à valider par le responsable.";
fillEvidence(tc02, "v1");
window.FiduApp.submitModule("TC02");
stored = storedProgress();
assert(stored.modules.TC02.status === "review_ready", "TC02 ne passe pas prêt pour revue");
assert(Object.keys(stored.modules.TC02.evidenceRefs).length === 6, "Les 6 preuves TC02 ne sont pas stockées");

// Practical review must reject any critical error.
fillMaxScores(tc02);
clearCriticalChecks(tc02);
document.getElementById("critical-private_charge").value = "yes";
document.getElementById("practicalReviewer").value = "QA-RESP";
document.getElementById("practicalDate").value = "2026-09-05";
document.getElementById("practicalDecision").value = "passed";
document.getElementById("practicalFeedback").value = feedback;
window.FiduApp.savePracticalReview("TC02");
stored = storedProgress();
assert(!stored.modules.TC02.practicalReview, "TC02 accepte une erreur critique pratique");

// Clear critical error -> practical review passes.
document.getElementById("critical-private_charge").value = "no";
window.FiduApp.savePracticalReview("TC02");
stored = storedProgress();
assert(stored.modules.TC02.practicalReview?.passed === true, "La revue pratique TC02 correcte n’est pas validée");
assert(stored.modules.TC02.practicalReview.score === 100, "Le score pratique TC02 n’est pas 100/100");

// Editing an artifact invalidates practical review.
navigate("#module/TC02");
document.getElementById("artifactNotes").value += " Modification après revue.";
window.FiduApp.saveArtifact("TC02");
stored = storedProgress();
assert(stored.modules.TC02.status === "quiz_passed", "TC02 ne revient pas à l’étape artefact après modification");
assert(!stored.modules.TC02.practicalReview, "La revue pratique TC02 subsiste après modification de preuve");

// Month 1 remains blocked until TC03 and TC04 are published.
navigate("#month/1");
const warning = document.querySelector(".development-warning")?.textContent || "";
assert(warning.includes("TC03") && warning.includes("TC04"), "Le mois 1 n’identifie pas TC03 et TC04 comme bloqueurs");
assert(document.querySelector('button[onclick="FiduApp.saveMonthReview(1)"]')?.disabled, "La revue du mois 1 est active avant publication de TC03/TC04");

// Library and public safety basics.
navigate("#library");
assert(document.querySelectorAll(".track-card").length === 11, "La bibliothèque ne contient pas 11 secteurs");
assert(document.querySelector(".library-warning"), "Avertissement qualité bibliothèque absent");
assert(typeof window.FiduApp.exportProgress === "function", "Export progression absent");
assert(typeof window.FiduApp.importProgress === "function", "Import progression absent");
assert(typeof window.FiduApp.resetProgress === "function", "Effacement local absent");
assert(errors.length === 0, `Erreurs navigateur: ${errors.join(" | ")}`);

console.log(JSON.stringify({
  smoke: true,
  coreModules: 25,
  publishedCore: publishedCore.length,
  blueprints: blueprints.length,
  tc01: { version: tc01.contentVersion, quiz: tc01.quiz.length, critical: 4, evidence: 6 },
  tc02: { version: tc02.contentVersion, quiz: tc02.quiz.length, critical: 2, evidence: 6, practicalMax: 100 },
  month1BlockedBy: ["TC03", "TC04"],
  browserErrors: errors.length
}, null, 2));
