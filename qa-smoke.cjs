const { readFileSync } = require("node:fs");
const { JSDOM, VirtualConsole } = require("jsdom");

(async () => {
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
  const feedback = "Bilan d’autonomie QA: contrôles, sources, erreurs corrigées, limites et points à escalader ont été relus; le dossier reste traçable et reprenable sans revue humaine systématique.";

  function assert(condition, message) { if (!condition) throw new Error(message); }
  function tick() { return new Promise((resolve) => window.setTimeout(resolve, 0)); }
  async function settle() { await tick(); await tick(); }
  async function navigate(hash) {
    window.location.hash = hash;
    window.FiduApp.route();
    if (window.FIDUCIAIRE_MATURITY) window.FIDUCIAIRE_MATURITY.enhanceRenderedPage();
    await settle();
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
  async function fillEvidence(module, version = "v1") {
    module.evidenceItems.forEach((item, index) => {
      const input = document.getElementById(`evidence-${item.id}`);
      assert(input, `${module.code}: champ de livrable absent ${item.id}`);
      input.value = `Réalisé · QA · ${module.code}-${index + 1}-${version}`;
    });
    document.getElementById("artifactNotes").value = `Conclusion QA ${module.code}. Les faits, la période, les pièces, contrôles, sources, risques, inconnues et escalades ont été documentés de manière reproductible. Les décisions réelles hors périmètre restent explicitement signalées et aucune donnée réelle n’est utilisée.`;
    window.FiduApp.saveArtifact(module.code);
    await settle();
  }
  async function fillAutonomyCheck(module) {
    module.practicalReview.scoreItems.forEach((item) => {
      const select = document.getElementById(`auto-score-${item.id}`);
      assert(select, `${module.code}: autocontrôle absent ${item.id}`);
      select.value = "expected";
    });
    module.practicalReview.criticalChecks.forEach((item) => {
      const select = document.getElementById(`auto-critical-${item.id}`);
      assert(select, `${module.code}: contrôle critique autonome absent ${item.id}`);
      select.value = "no";
    });
    const declaration = document.getElementById("autoDeclaration");
    assert(declaration, `${module.code}: déclaration d’autocontrôle absente`);
    declaration.checked = true;
    window.FiduApp.saveAutonomyCheck(module.code);
    await settle();
  }
  async function completeModule(code) {
    await navigate(`#module/${code}`);
    const module = window.FIDUCIAIRE_DATA.modules[code];
    answerQuiz(module);
    window.FiduApp.gradeQuiz(code);
    await settle();
    let stored = storedProgress();
    assert(stored.modules[code].quizPassed === true, `${code}: quiz correct non validé`);

    await navigate(`#module/${code}`);
    await fillEvidence(module);
    assert(document.querySelectorAll(".evidence-completion input:checked").length === module.evidenceItems.length, `${code}: livrables non reconnus comme terminés`);
    assert(!document.querySelector(".file-pick"), `${code}: faux sélecteur de fichier encore visible`);
    window.FiduApp.submitModule(code);
    await settle();
    stored = storedProgress();
    assert(stored.modules[code].status === "review_ready", `${code}: ne passe pas au contrôle final`);

    await navigate(`#module/${code}`);
    await fillAutonomyCheck(module);
    stored = storedProgress();
    assert(stored.modules[code].practicalReview?.mode === "autonomy-self-check", `${code}: mode autonomie non enregistré`);
    assert(stored.modules[code].practicalReview?.passed === true, `${code}: autocontrôle conforme non validé`);
    assert(stored.modules[code].practicalReview.score === 100, `${code}: autocontrôle non 100/100`);
    assert(document.querySelector(".validation-panel h2")?.textContent.includes("Validé en autonomie"), `${code}: statut autonomie absent de l’interface`);
    return module;
  }

  await settle();
  assert(window.FIDUCIAIRE_AUTONOMY?.mode === "autonomy-first", "Couche autonomy-first absente");
  assert(window.FIDUCIAIRE_BEGINNER_UX?.version === "1.0", "Couche beginner UX absente");
  assert(document.querySelector("h1")?.textContent.includes("autonomie"), "Accueil non rendu");
  assert(document.querySelectorAll(".month-card").length === 12, "La feuille de route ne contient pas 12 mois");
  assert(window.FIDUCIAIRE_ROADMAP.coreModules.length === 25, "Le parcours ne contient pas 25 compétences cœur");
  const coreModules = window.FIDUCIAIRE_ROADMAP.coreModules.map((code) => window.FIDUCIAIRE_DATA.modules[code]);
  const publishedCore = coreModules.filter((module) => PUBLISHED.has(module.status));
  const blueprints = coreModules.filter((module) => module.status === "blueprint");
  assert(publishedCore.length === 4 && blueprints.length === 21, "Maturité 4/25 incorrecte");

  const tc01 = window.FIDUCIAIRE_DATA.modules.TC01;
  const tc02 = window.FIDUCIAIRE_DATA.modules.TC02;
  const tc03 = window.FIDUCIAIRE_DATA.modules.TC03;
  const tc04 = window.FIDUCIAIRE_DATA.modules.TC04;
  assert(tc01.contentVersion === "1.6" && tc01.lessonRevision === "1.6-mission", "TC01 Mission 1.6 non active");
  assert(tc01.quiz.length === 8 && tc01.quizThresholdCount === 7, "Challenge TC01 doit contenir 8 situations avec seuil 7/8");
  assert(tc01.quiz.filter((q) => q.critical).length === 3, "TC01 Mission doit contenir 3 questions critiques");
  assert(tc01.evidenceItems.length === 2, "TC01 Mission doit contenir 2 résultats utiles");
  assert(tc01.evidenceItems.some((item) => item.id === "dossier_opening"), "Note de dossier TC01 absente");
  assert(tc01.evidenceItems.some((item) => item.id === "client_email"), "E-mail client TC01 absent");
  assert(tc01.evidenceItems.every((item) => item.templatePath), "TC01: modèles de résultats non reliés");
  assert(tc01.practicalReview.scoreItems.length === 4, "Autocontrôle TC01 non simplifié à 4 critères");
  assert(tc01.learnerPackage.files[0].path.endsWith("00_Mission_TC01_v1.6.html"), "Mission TC01 n’est pas le premier contenu apprenant");
  assert(tc01.sections.length === 3 && tc01.sections[0].title.includes("Mission 01"), "Page module TC01 non recentrée sur la Mission");
  assert(tc02.evidenceItems.every((item) => item.templatePath), "TC02: modèles de livrables non reliés");
  assert(tc03.evidenceItems.every((item) => item.templatePath), "TC03: modèles de livrables non reliés");
  assert(tc04.evidenceItems.every((item) => item.templatePath), "TC04: modèles de livrables non reliés");
  assert(tc01.sourceRefs.includes("TC01_UID") && tc01.sourceRefs.includes("TC01_ESTV_UID"), "Sources IDE/TVA TC01 absentes");

  await navigate("#module/TC01");
  assert(!document.querySelector(".file-pick"), "TC01 affiche encore Choisir un fichier");
  assert(document.querySelectorAll(".evidence-completion").length === 2, "TC01 n’affiche pas 2 résultats terminés");
  assert(document.querySelectorAll(".evidence-autonomy-actions a").length === 2, "TC01 n’affiche pas les 2 modèles correspondant aux résultats");
  assert(document.querySelectorAll(".evidence-purpose").length === 2, "TC01 n’explique pas la fonction des 2 résultats");
  assert(document.querySelectorAll(".term-help").length >= 2, "Aide contextuelle absente des résultats TC01");
  assert(Array.from(document.querySelectorAll("a")).some((a) => a.textContent.includes("Commencer la Mission 01")), "CTA Mission 01 absent du module");
  assert(document.querySelector(".practical-review h2")?.textContent.includes("Je vérifie mon propre dossier"), "Autocontrôle guidé non rendu");
  assert(document.querySelector(".validation-panel .fine-print")?.textContent.includes("revue humaine devient ciblée"), "Aide autonomie absente");
  assert(Array.from(document.querySelectorAll(".nav-actions .nav-link")).some((node) => node.textContent.trim() === "Glossaire"), "Glossaire absent de la navigation principale");
  assert(!Array.from(document.querySelectorAll(".nav-actions .nav-link")).some((node) => ["Importer", "Exporter"].includes(node.textContent.trim())), "Importer/Exporter encore visibles dans la navigation principale");

  const dossierInput = document.getElementById("evidence-dossier_opening");
  dossierInput.value = "J_Calendrier_source.xlsx";
  window.FiduApp.saveArtifact("TC01");
  await settle();
  assert(document.querySelector(".autonomy-warning"), "TC01 ne détecte pas une pièce source utilisée à la place du résultat");
  assert(!document.querySelector(".evidence-completion input")?.checked, "Pièce source marquée terminée à tort");

  await completeModule("TC01");
  await completeModule("TC02");
  await completeModule("TC03");
  await completeModule("TC04");

  await navigate("#month/1");
  assert(!document.querySelector(".development-warning"), "Mois 1 reste bloqué malgré 4/4 modules publiés");
  assert(document.querySelector(".review-panel h2")?.textContent.includes("Bilan d’autonomie mensuel"), "Jalon mensuel reste présenté comme revue du responsable");
  assert(document.getElementById("reviewerName")?.value === "AUTO", "Identité AUTO non préremplie");
  assert(document.getElementById("reviewerName")?.closest("label")?.style.display === "none", "Champ responsable encore exposé");
  assert(Array.from(document.querySelectorAll(".month-main h2")).some((h) => h.textContent.includes("Mises en situation")), "Travaux encore présentés comme systématiquement supervisés");

  const month1 = window.FIDUCIAIRE_ROADMAP.months.find((month) => month.month === 1);
  for (let i = 0; i < month1.practice.length; i += 1) { window.FiduApp.toggleMonthTask(1, "practice", i, true); await settle(); }
  for (let i = 0; i < month1.deliverables.length; i += 1) { window.FiduApp.toggleMonthTask(1, "deliverables", i, true); await settle(); }

  await navigate("#month/1");
  const monthEvidence = "Bilan QA du Mois 1: ouverture du dossier, séparation juridique et patrimoniale, accès, KYC, contrôles de registre, pièces manquantes, erreurs corrigées et limites de délégation ont été documentés de façon autonome.";
  document.getElementById("monthEvidence").value = monthEvidence;
  window.FiduApp.saveMonthEvidence(1);
  await settle();

  await navigate("#month/1");
  document.getElementById("reviewerDecision").value = "validated";
  document.getElementById("reviewerFeedback").value = feedback;
  window.FiduApp.saveMonthReview(1);
  await settle();
  let stored = storedProgress();
  assert(stored.months[1]?.validatedAt, "Jalon Mois 1 autonome non validé");
  assert(stored.months[1]?.reviewer?.name === "AUTO", "Jalon autonome exige encore un responsable nommé");
  assert(month1.modules.every((code) => stored.modules[code]?.status === "validated"), "Modules M1 non validés avec le jalon autonome");

  await navigate("#module/TC04");
  document.getElementById("artifactNotes").value += " Modification post-validation mensuelle.";
  window.FiduApp.saveArtifact("TC04");
  await settle();
  stored = storedProgress();
  assert(!stored.months[1]?.validatedAt, "Mois 1 reste validé après modification d’une preuve");
  assert(!stored.modules.TC04.practicalReview, "Autocontrôle TC04 subsiste après modification de preuve");
  assert(stored.modules.TC04.status === "quiz_passed", "TC04 ne revient pas à l’étape de production après modification");

  await navigate("#library");
  assert(document.querySelectorAll(".track-card").length === 11, "Bibliothèque ne contient pas 11 secteurs");
  assert(typeof window.FiduApp.exportProgress === "function" && typeof window.FiduApp.importProgress === "function", "Import/export progression absent en paramètres internes");
  assert(errors.length === 0, `Erreurs navigateur: ${errors.join(" | ")}`);

  console.log(JSON.stringify({
    smoke: true,
    coreModules: 25,
    publishedCore: 4,
    blueprints: 21,
    autonomyFirst: true,
    beginnerUx: true,
    tc01Mission: "1.6",
    tc01MissionResults: 2,
    tc01ChallengeQuestions: 8,
    tc01ShortSelfCheck: 4,
    falseUploadRemoved: true,
    contextualHelp: true,
    glossaryNav: true,
    targetedHumanReview: true,
    month1AutonomousValidation: true,
    invalidationAfterEvidenceChange: true
  }, null, 2));
})().catch((error) => {
  console.error(error.stack || error.message || String(error));
  process.exit(1);
});