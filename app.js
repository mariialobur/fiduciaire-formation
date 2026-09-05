(function () {
  const DATA = window.FIDUCIAIRE_DATA;
  const ROADMAP = window.FIDUCIAIRE_ROADMAP;
  const KEY = "fiduciaire_formation_progress_v23";
  const PREVIOUS_KEY = "fiduciaire_formation_progress_v22";
  const LEGACY_KEY = "fiduciaire_formation_progress_v21";
  const OLDER_KEY = "fiduciaire_formation_progress_v20";
  const OLD_KEY = "fiduciaire_formation_progress_v13";
  const MEMORY_STORE = {};

  function storageGet(key) {
    try { return window.localStorage ? localStorage.getItem(key) : (MEMORY_STORE[key] || null); }
    catch (error) { return MEMORY_STORE[key] || null; }
  }

  function storageSet(key, value) {
    try { if (window.localStorage) localStorage.setItem(key, value); else MEMORY_STORE[key] = value; }
    catch (error) { MEMORY_STORE[key] = value; }
  }

  function storageRemove(key) {
    try { if (window.localStorage) localStorage.removeItem(key); }
    catch (error) { /* no-op */ }
    delete MEMORY_STORE[key];
  }

  function today() { return new Date().toISOString().slice(0, 10); }
  function escapeHtml(value) {
    return String(value == null ? "" : value).replace(/[&<>'"]/g, (char) => ({
      "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;"
    })[char]);
  }

  function defaultProgress() {
    return {
      version: ROADMAP.version,
      learner: { name: "", role: "Assistant·e comptable", startedAt: today(), hoursPerWeek: 6 },
      modules: {},
      months: {},
      lastVisited: null
    };
  }

  function migrateProgress(progress) {
    const modernSources = [[PREVIOUS_KEY, "2.2"], [LEGACY_KEY, "2.1"], [OLDER_KEY, "2.0"]];
    for (const [sourceKey, sourceVersion] of modernSources) {
      const modernRaw = storageGet(sourceKey);
      if (!modernRaw) continue;
      try {
        const previous = JSON.parse(modernRaw);
        progress.learner = Object.assign(progress.learner, previous.learner || {});
        Object.entries(previous.modules || {}).forEach(([code, item]) => {
          progress.modules[code] = {
            status: "in_progress",
            quizBest: item.quizBest || 0,
            quizBestCorrect: item.quizBestCorrect || 0,
            artifactNote: item.artifactNote || "",
            evidenceRefs: item.evidenceRefs || {},
            legacyStatus: item.status || "not_started",
            migratedFrom: sourceVersion,
            migrationNote: "Les validations quiz/pratique ont été réinitialisées car TC01 v1.3 relève le seuil du quiz et la version 2.3 renforce les règles de restauration.",
            updatedAt: today()
          };
        });
        Object.entries(previous.months || {}).forEach(([number, item]) => {
          progress.months[number] = {
            practice: item.practice || [],
            deliverables: item.deliverables || [],
            external: item.external || [],
            evidence: item.evidence || "",
            reviewer: Object.assign({ name: "", date: today(), decision: "", feedback: "" }, item.reviewer || {}, { decision: "" }),
            validatedAt: null,
            validationSnapshot: null,
            migratedFrom: sourceVersion
          };
        });
        storageSet(KEY, JSON.stringify(progress));
        return progress;
      } catch (error) { /* try the next legacy source */ }
    }

    const raw = storageGet(OLD_KEY);
    if (!raw) return progress;
    try {
      const old = JSON.parse(raw);
      const merged = Object.assign({}, old.troncCommun || {});
      Object.values(old.tracks || {}).forEach((track) => Object.assign(merged, track || {}));
      Object.entries(merged).forEach(([code, item]) => {
        progress.modules[code] = {
          status: "in_progress",
          quizBest: item.quizBest || 0,
          artifactNote: item.artifactNote || "",
          updatedAt: item.updatedAt || today(),
          migratedFrom: "1.3",
          legacyStatus: item.status || "not_started"
        };
      });
      if (old.learner) progress.learner = Object.assign(progress.learner, old.learner);
      storageSet(KEY, JSON.stringify(progress));
    } catch (error) { /* invalid legacy data remains untouched */ }
    return progress;
  }

  function getProgress() {
    const empty = defaultProgress();
    const raw = storageGet(KEY);
    if (!raw) return migrateProgress(empty);
    try {
      const parsed = JSON.parse(raw);
      return {
        version: ROADMAP.version,
        learner: Object.assign(empty.learner, parsed.learner || {}),
        modules: parsed.modules || {},
        months: parsed.months || {},
        lastVisited: parsed.lastVisited || null
      };
    } catch (error) { return empty; }
  }

  function saveProgress(progress) { storageSet(KEY, JSON.stringify(progress, null, 2)); }
  function moduleProgress(code) { return getProgress().modules[code] || {}; }
  function monthProgress(number) { return getProgress().months[number] || {}; }

  function setModuleProgress(code, patch) {
    const progress = getProgress();
    progress.modules[code] = Object.assign({}, progress.modules[code] || {}, patch, { updatedAt: today() });
    progress.lastVisited = { type: "module", code };
    saveProgress(progress);
  }

  function moduleThreshold(module) {
    return module.critical ? DATA.settings.criticalPassScore : DATA.settings.standardPassScore;
  }

  function moduleQuizThresholdCount(module) {
    if (Number.isInteger(module.quizThresholdCount)) return module.quizThresholdCount;
    return Math.ceil(((module.quiz || []).length * moduleThreshold(module)) / 100);
  }

  function requiredArtifactLength(module) {
    return module.artifactNoteMinimumCharacters || DATA.settings.artifactMinimumCharacters;
  }

  function quizPassed(module, progress) {
    if (module.contentVersion && progress.quizVersion !== module.contentVersion) return false;
    if (typeof progress.quizPassed === "boolean") return progress.quizPassed;
    return (progress.quizBest || 0) >= moduleThreshold(module);
  }

  function evidenceRefs(module, progress) {
    const refs = progress.evidenceRefs || {};
    return (module.evidenceItems || []).map((item) => String(refs[item.id] || "").trim());
  }

  function evidenceComplete(module, progress) {
    return !module.evidenceItems || evidenceRefs(module, progress).every((value) => value.length >= 3);
  }

  function artifactSignature(module, progress) {
    return JSON.stringify({
      contentVersion: module.contentVersion || ROADMAP.version,
      note: progress.artifactNote || "",
      evidenceRefs: progress.evidenceRefs || {}
    });
  }

  function practicalReviewPassed(module, progress) {
    if (!module.practicalReview) return true;
    const review = progress.practicalReview || {};
    return Boolean(review.passed && review.artifactSignature === artifactSignature(module, progress));
  }

  function assetPath(path) {
    return document.body && document.body.dataset.level === "sub" ? `../${path}` : path;
  }

  function statusLabel(status) {
    return ({
      not_started: "À commencer",
      in_progress: "En cours",
      quiz_passed: "Quiz réussi",
      review_ready: "Prêt pour revue",
      validated: "Validé par le responsable"
    })[status || "not_started"] || status;
  }

  function contentLabel(module) {
    if (module.status === "core") return "Module cœur";
    if (module.status === "production") return "Module approfondi";
    if (module.status === "pilot") return "Module pilote";
    if (module.status === "blueprint") return "Fiche de cadrage";
    return "À produire";
  }

  function monthByNumber(number) { return ROADMAP.months.find((item) => item.month === Number(number)); }
  function isModulePublished(module) {
    return Boolean(module && ["core", "production", "pilot"].includes(module.status));
  }

  function isModuleReady(code) {
    const module = DATA.modules[code];
    if (!isModulePublished(module)) return false;
    const progress = moduleProgress(code);
    return ["review_ready", "validated"].includes(progress.status) && practicalReviewPassed(module, progress);
  }

  function monthContentReadiness(month) {
    const published = month.modules.filter((code) => isModulePublished(DATA.modules[code]));
    const blockers = month.modules.filter((code) => !isModulePublished(DATA.modules[code]));
    return { published, blockers, total: month.modules.length, complete: blockers.length === 0 };
  }

  function normalizedMonthProgress(month) {
    const current = monthProgress(month.month);
    return {
      practice: month.practice.map((_, index) => Boolean(current.practice && current.practice[index])),
      deliverables: month.deliverables.map((_, index) => Boolean(current.deliverables && current.deliverables[index])),
      external: (month.external || []).map((_, index) => Boolean(current.external && current.external[index])),
      evidence: current.evidence || "",
      reviewer: Object.assign({ name: "", date: today(), decision: "", feedback: "" }, current.reviewer || {}),
      validatedAt: current.validatedAt || null,
      validationSnapshot: current.validationSnapshot || null
    };
  }

  function monthEvidenceComplete(progress) {
    return progress.evidence.trim().length >= DATA.settings.monthEvidenceMinimumCharacters;
  }

  function monthReadiness(month) {
    const progress = normalizedMonthProgress(month);
    const content = monthContentReadiness(month);
    const checks = [
      ...month.modules.map((code) => isModuleReady(code)),
      ...progress.practice,
      ...progress.deliverables,
      ...progress.external,
      monthEvidenceComplete(progress)
    ];
    const done = checks.filter(Boolean).length;
    const total = checks.length;
    return {
      done,
      total,
      percent: total ? Math.round((done / total) * 100) : 0,
      readyForReview: content.complete && total > 0 && done === total,
      validated: content.complete && Boolean(progress.validatedAt),
      developmentBlocked: !content.complete,
      publishedModules: content.published.length,
      totalModules: content.total,
      blockers: content.blockers
    };
  }

  function monthsValidated() { return ROADMAP.months.filter((month) => monthReadiness(month).validated).length; }
  function currentMonth() { return ROADMAP.months.find((month) => !monthReadiness(month).validated) || ROADMAP.months[ROADMAP.months.length - 1]; }

  function invalidateMonth(number, progress) {
    const month = monthByNumber(number);
    if (!month) return;
    const current = Object.assign({}, progress.months[number] || {});
    if (!current.validatedAt) return;
    current.validatedAt = null;
    current.validationSnapshot = null;
    current.reviewer = Object.assign({}, current.reviewer || {}, { decision: "" });
    progress.months[number] = current;
    month.modules.forEach((code) => {
      const item = progress.modules[code] || {};
      if (item.status === "validated") item.status = "review_ready";
      item.validatedAt = null;
      progress.modules[code] = item;
    });
  }

  function invalidateModuleDependencies(code, progress) {
    const module = DATA.modules[code];
    if (!module) return;
    const item = progress.modules[code] || {};
    item.practicalReview = null;
    item.status = quizPassed(module, item) ? "quiz_passed" : "in_progress";
    item.submittedAt = null;
    item.validatedAt = null;
    progress.modules[code] = item;
    if (module.month) invalidateMonth(module.month, progress);
  }

  function addMonths(dateString, amount) {
    const date = new Date(`${dateString}T12:00:00`);
    if (Number.isNaN(date.getTime())) return null;
    date.setMonth(date.getMonth() + amount);
    return date;
  }

  function monthDates(number) {
    const start = getProgress().learner.startedAt || today();
    const from = addMonths(start, Number(number) - 1);
    const to = addMonths(start, Number(number));
    if (!from || !to) return "Dates à définir";
    to.setDate(to.getDate() - 1);
    const format = new Intl.DateTimeFormat("fr-CH", { day: "2-digit", month: "short", year: "numeric" });
    return `${format.format(from)} – ${format.format(to)}`;
  }

  function phaseClass(month) { return `phase-${Math.ceil(month.month / 3)}`; }
  function coreProgress() {
    const codes = ROADMAP.coreModules;
    const ready = codes.filter((code) => isModuleReady(code)).length;
    return { ready, total: codes.length, percent: Math.round((ready / codes.length) * 100) };
  }

  function header(context) {
    const current = currentMonth();
    return `<header class="topbar">
      <a class="brand" href="#home" aria-label="Accueil Fiduciaire Universelle">
        <span class="logo-stamp" aria-hidden="true">FU</span>
        <span class="brand-text"><strong>Fiduciaire Universelle</strong><span>${escapeHtml(context || "Parcours 12 mois")}</span></span>
      </a>
      <nav class="nav-actions" aria-label="Navigation principale">
        <a class="nav-link" href="#home">Parcours</a>
        <a class="nav-link nav-link-current" href="#month/${current.month}">Mois actuel</a>
        <a class="nav-link" href="#library">Bibliothèque</a>
        <button class="nav-link" type="button" onclick="document.getElementById('progressImport').click()">Importer</button>
        <input id="progressImport" class="visually-hidden" type="file" accept="application/json,.json" onchange="FiduApp.importProgress(this.files[0]); this.value=''">
        <button class="nav-link" type="button" onclick="FiduApp.exportProgress()">Exporter</button>
      </nav>
    </header>`;
  }

  function progressBar(percent, label) {
    return `<div class="progress-wrap" aria-label="${escapeHtml(label || "Progression")}: ${percent}%">
      <div class="progress-line"><span style="width:${percent}%"></span></div>
      <div class="progress-meta"><span>${escapeHtml(label || "Progression")}</span><strong>${percent}%</strong></div>
    </div>`;
  }

  function renderHome() {
    const progress = coreProgress();
    const current = currentMonth();
    const currentReadiness = monthReadiness(current);
    const contentPercent = currentReadiness.totalModules ? Math.round((currentReadiness.publishedModules / currentReadiness.totalModules) * 100) : 0;
    const done = monthsValidated();
    const learner = getProgress().learner;
    document.getElementById("app").innerHTML = header() + `<main>
      <section class="hero hero-home">
        <div class="container hero-grid">
          <div>
            <p class="kicker kicker-light">Programme interne suisse · version ${ROADMAP.version}</p>
            <h1>De l’assistance comptable à l’autonomie sur les dossiers PME courants.</h1>
            <p class="hero-lead">Douze mois de pratique supervisée, un premier module étalon complet, 24 compétences cœur à développer au même standard et une validation documentée du responsable.</p>
            <div class="hero-actions">
              <a class="btn btn-accent" href="#month/${current.month}">Continuer au mois ${current.month}</a>
              <a class="btn btn-ghost-light" href="#profile">Régler mon parcours</a>
            </div>
          </div>
          <aside class="hero-status" aria-label="État du parcours">
            <span class="eyebrow">Étape actuelle</span>
            <strong class="hero-month">M${String(current.month).padStart(2, "0")}</strong>
            <h2>${current.title}</h2>
            <p>${monthDates(current.month)}</p>
            ${currentReadiness.developmentBlocked ? progressBar(contentPercent, `Contenu livré ${currentReadiness.publishedModules}/${currentReadiness.totalModules}`) : progressBar(currentReadiness.percent, "Mois prêt")}
          </aside>
        </div>
      </section>

      <section class="container outcome-strip" aria-label="Indicateurs du parcours">
        <div><strong>12</strong><span>mois structurés</span></div>
        <div><strong>${ROADMAP.coreModules.length}</strong><span>compétences planifiées</span></div>
        <div><strong>1</strong><span>module étalon complet</span></div>
        <div><strong>${done}/12</strong><span>jalons validés</span></div>
      </section>

      <section class="container section-block">
        <div class="section-heading"><div><p class="kicker">Progression professionnelle</p><h2>Quatre niveaux de délégation, pas une simple collection de cours</h2></div></div>
        <div class="level-grid">${ROADMAP.levels.map((level, index) => `<article class="level-card phase-${index + 1}"><span>${level.range}</span><h3>${level.title}</h3><p>${level.description}</p></article>`).join("")}</div>
      </section>

      <section class="container section-block" id="roadmap">
        <div class="section-heading"><div><p class="kicker">Feuille de route</p><h2>Les 12 mois</h2></div><p class="section-intro">Chaque mois combine cours, travail en dossier, livrables et revue humaine.</p></div>
        <div class="timeline">${ROADMAP.months.map(renderMonthCard).join("")}</div>
      </section>

      <section class="container section-block profile-card" id="profile">
        <div><p class="kicker">Paramètres</p><h2>Mon parcours</h2><p>La date de début calcule les périodes mensuelles. Les données restent dans ce navigateur et peuvent être exportées.</p></div>
        <form class="profile-form" onsubmit="FiduApp.saveProfile(event)">
          <label>Nom ou identifiant<input id="profileName" value="${escapeHtml(learner.name)}" placeholder="Ex. ML-01"></label>
          <label>Rôle actuel<input id="profileRole" value="${escapeHtml(learner.role)}"></label>
          <label>Date de début<input id="profileStart" type="date" value="${escapeHtml(learner.startedAt)}"></label>
          <label>Formation par semaine<select id="profileHours">${[4, 6, 8, 10].map((hours) => `<option value="${hours}" ${Number(learner.hoursPerWeek) === hours ? "selected" : ""}>${hours} heures</option>`).join("")}</select></label>
          <button class="btn btn-primary" type="submit">Enregistrer</button>
        </form>
      </section>

      <section class="container scope-grid section-block">
        <article class="panel scope-positive"><p class="kicker">Objectif réaliste</p><h2>Ce que le parcours permet de démontrer</h2><p>${ROADMAP.target}: production mensuelle, TVA, paie simple, travaux de clôture, reporting et escalade pertinente.</p></article>
        <article class="panel"><p class="kicker">Limites obligatoires</p><h2>Ce qu’il ne certifie pas</h2><ul>${ROADMAP.exclusions.map((item) => `<li>${item}</li>`).join("")}</ul></article>
      </section>

      <section class="container library-callout section-block">
        <div><p class="kicker">Après le socle</p><h2>Bibliothèque sectorielle</h2><p>Les 11 secteurs existants restent disponibles comme fiches de cadrage. Ils ne comptent plus dans la progression tant que leur contenu n’a pas été validé comme module complet.</p></div>
        <a class="btn btn-secondary" href="#library">Explorer les secteurs</a>
      </section>
    </main>${footer()}`;
  }

  function renderMonthCard(month) {
    const readiness = monthReadiness(month);
    const state = readiness.validated ? "Validé" : (readiness.developmentBlocked ? "En construction" : (month.month === currentMonth().month ? "En cours" : "À planifier"));
    const contentPercent = readiness.totalModules ? Math.round((readiness.publishedModules / readiness.totalModules) * 100) : 0;
    return `<article class="month-card ${phaseClass(month)} ${readiness.validated ? "is-validated" : ""} ${readiness.developmentBlocked ? "is-development-blocked" : ""}">
      <div class="month-marker"><span>${String(month.month).padStart(2, "0")}</span></div>
      <div class="month-card-body">
        <div class="month-card-top"><div><span class="eyebrow">${month.phase}</span><h3>${month.title}</h3></div><span class="status-pill">${state}</span></div>
        <p>${month.promise}</p>
        <div class="month-meta"><span>${monthDates(month.month)}</span><span>${month.modules.length} module${month.modules.length > 1 ? "s" : ""}</span><span>${month.level}</span></div>
        ${readiness.developmentBlocked ? progressBar(contentPercent, `Contenu livré ${readiness.publishedModules}/${readiness.totalModules}`) : progressBar(readiness.percent, `${readiness.done}/${readiness.total} éléments`)}
        <a class="stretched-link" href="#month/${month.month}" aria-label="Ouvrir le mois ${month.month}: ${escapeHtml(month.title)}">Ouvrir le mois <span>→</span></a>
      </div>
    </article>`;
  }

  function renderMonth(number) {
    const month = monthByNumber(number);
    if (!month) { routeToHome(); return; }
    const readiness = monthReadiness(month);
    const progress = normalizedMonthProgress(month);
    const previous = month.month > 1 ? month.month - 1 : null;
    const next = month.month < 12 ? month.month + 1 : null;
    const monthScore = readiness.developmentBlocked
      ? `<strong>${readiness.publishedModules}/${readiness.totalModules}</strong><span>modules livrés</span>`
      : `<strong>${readiness.percent}%</strong><span>prêt pour revue</span>`;
    document.getElementById("app").innerHTML = header(`Mois ${month.month}`) + `<main>
      <section class="month-hero ${phaseClass(month)}">
        <div class="container">
          <div class="month-hero-nav"><a href="#home">← Feuille de route</a><span>${monthDates(month.month)}</span></div>
          <p class="kicker kicker-light">${month.phase} · ${month.level}</p>
          <div class="month-title-row"><div><span class="month-big">M${String(month.month).padStart(2, "0")}</span><h1>${month.title}</h1><p>${month.promise}</p></div><div class="month-score">${monthScore}</div></div>
        </div>
      </section>
      <div class="container month-layout">
        <div class="month-main">
          ${readiness.developmentBlocked ? `<section class="content-warning development-warning" role="status"><strong>Mois non validable — contenu en construction</strong><p>${readiness.publishedModules}/${readiness.totalModules} modules sont publiés. Fiches encore à développer: <strong>${readiness.blockers.map(escapeHtml).join(", ")}</strong>. Elles restent consultables pour planifier le parcours, mais ne génèrent aucune validation.</p></section>` : ""}
          ${previous && !monthReadiness(monthByNumber(previous)).validated ? `<section class="content-warning prerequisite-warning"><strong>Prérequis non validé</strong><p>Le mois ${previous} doit être validé avant de pouvoir valider ce jalon. Les contenus restent consultables pour planifier la suite.</p></section>` : ""}
          <section class="section-block compact"><p class="kicker">Modules du mois</p><h2>Comprendre et produire</h2><div class="modules-grid">${month.modules.map((code) => renderModuleCard(code, true)).join("")}</div></section>
          <section class="section-block compact"><p class="kicker">Pratique cabinet</p><h2>Travaux supervisés</h2><div class="task-list">${renderTaskChecks(month, "practice", month.practice, progress.practice)}</div></section>
          <section class="section-block compact"><p class="kicker">Preuves</p><h2>Livrables attendus</h2><div class="task-list">${renderTaskChecks(month, "deliverables", month.deliverables, progress.deliverables)}</div></section>
          ${(month.external || []).length ? `<section class="external-section section-block compact"><p class="kicker">Ressource externe</p><h2>Simulateur obligatoire</h2>${month.external.map((resource, index) => renderExternalResource(month, resource, index, progress.external[index])).join("")}</section>` : ""}
          <section class="section-block compact"><p class="kicker">Dossier de preuve</p><h2>Note mensuelle</h2><label class="field-label" for="monthEvidence">Décrivez les dossiers traités, erreurs corrigées, limites rencontrées et pièces disponibles (${DATA.settings.monthEvidenceMinimumCharacters} caractères minimum).</label><textarea id="monthEvidence" rows="7" placeholder="Aucune donnée personnelle de client. Utilisez des références anonymisées.">${escapeHtml(progress.evidence)}</textarea><div class="inline-actions"><button class="btn btn-secondary" type="button" onclick="FiduApp.saveMonthEvidence(${month.month})">Sauvegarder la note</button><span class="char-counter">${progress.evidence.length}/${DATA.settings.monthEvidenceMinimumCharacters}</span></div></section>
        </div>
        <aside class="month-aside">
          <section class="panel review-panel">
            <p class="kicker">Jalon mensuel</p><h2>Revue du responsable</h2>
            <div class="readiness-list">
              <span class="${!readiness.developmentBlocked && month.modules.every(isModuleReady) ? "ok" : ""}">Modules prêts <strong>${month.modules.filter(isModuleReady).length}/${month.modules.length}</strong></span>
              ${readiness.developmentBlocked ? `<span class="development-row">Contenu publié <strong>${readiness.publishedModules}/${readiness.totalModules}</strong></span>` : ""}
              <span class="${progress.practice.every(Boolean) ? "ok" : ""}">Pratique <strong>${progress.practice.filter(Boolean).length}/${progress.practice.length}</strong></span>
              <span class="${progress.deliverables.every(Boolean) ? "ok" : ""}">Livrables <strong>${progress.deliverables.filter(Boolean).length}/${progress.deliverables.length}</strong></span>
              ${(month.external || []).length ? `<span class="${progress.external.every(Boolean) ? "ok" : ""}">Simulateur <strong>${progress.external.filter(Boolean).length}/${progress.external.length}</strong></span>` : ""}
              <span class="${monthEvidenceComplete(progress) ? "ok" : ""}">Note mensuelle <strong>${progress.evidence.length}/${DATA.settings.monthEvidenceMinimumCharacters}</strong></span>
            </div>
            <p class="gate-copy"><strong>Critère:</strong> ${month.gate}</p>
            <label>Responsable<input id="reviewerName" value="${escapeHtml(progress.reviewer.name)}" placeholder="Nom ou initiales"></label>
            <label>Date<input id="reviewerDate" type="date" value="${escapeHtml(progress.reviewer.date)}"></label>
            <label>Décision<select id="reviewerDecision"><option value="">Choisir</option><option value="validated" ${progress.reviewer.decision === "validated" ? "selected" : ""}>Jalon validé</option><option value="extension" ${progress.reviewer.decision === "extension" ? "selected" : ""}>Prolongation ciblée</option></select></label>
            <label>Retour du responsable<textarea id="reviewerFeedback" rows="5" placeholder="Forces, erreurs à corriger, limites de délégation…">${escapeHtml(progress.reviewer.feedback)}</textarea></label>
            <button class="btn btn-primary btn-block" type="button" onclick="FiduApp.saveMonthReview(${month.month})" ${readiness.developmentBlocked ? "disabled aria-disabled=\"true\"" : ""}>Enregistrer la revue</button>
            ${readiness.developmentBlocked ? `<p class="fine-print"><strong>Validation bloquée:</strong> tous les modules du mois doivent être publiés au standard pédagogique avant la revue mensuelle.</p>` : ""}
            ${progress.validatedAt ? `<div class="validation-stamp"><strong>Jalon validé</strong><span>${escapeHtml(progress.validatedAt)} · trace interne locale</span></div>` : `<p class="fine-print">La validation est une trace interne déclarative. Elle ne remplace ni un diplôme ni une autorisation professionnelle. Toute modification d’une preuve invalide le jalon.</p>`}
          </section>
          <nav class="month-pager" aria-label="Navigation entre mois">${previous ? `<a href="#month/${previous}">← Mois ${previous}</a>` : "<span></span>"}${next ? `<a href="#month/${next}">Mois ${next} →</a>` : `<a href="#home">Accueil →</a>`}</nav>
        </aside>
      </div>
    </main>${footer()}`;
  }

  function renderTaskChecks(month, group, items, values) {
    return items.map((item, index) => `<label class="task-check ${values[index] ? "is-done" : ""}"><input type="checkbox" ${values[index] ? "checked" : ""} onchange="FiduApp.toggleMonthTask(${month.month}, '${group}', ${index}, this.checked)"><span class="check-ui" aria-hidden="true">✓</span><span>${item}</span></label>`).join("");
  }

  function renderExternalResource(month, resource, index, checked) {
    return `<article class="external-card"><div><span class="external-badge">Externe</span><h3>${resource.title}</h3><p>${resource.requirement}</p></div><div class="external-actions"><a class="btn btn-accent" href="${resource.url}" target="_blank" rel="noopener noreferrer">Ouvrir le simulateur ↗</a><label class="resource-check"><input type="checkbox" ${checked ? "checked" : ""} onchange="FiduApp.toggleMonthTask(${month.month}, 'external', ${index}, this.checked)"><span class="resource-ui" aria-hidden="true">✓</span><span>Preuve contrôlée et déposée</span></label></div></article>`;
  }

  function renderModuleCard(code, coreContext) {
    const module = DATA.modules[code];
    const published = isModulePublished(module);
    const progress = moduleProgress(code);
    const status = published ? (progress.status || "not_started") : "not_started";
    const score = typeof progress.quizBest === "number" ? `${progress.quizBest}%` : "—";
    const monthTag = module.month ? `M${String(module.month).padStart(2, "0")}` : contentLabel(module);
    return `<article class="module-card ${status === "validated" ? "is-validated" : ""} ${!published ? "is-blueprint" : ""}">
      <div class="module-card-head"><span class="module-code">${module.code}</span><span class="status-dot ${published ? `status-${status}` : "status-blueprint"}"></span></div>
      <div><span class="eyebrow">${monthTag} · ${module.duration}</span><h3>${module.title}</h3><p>${module.objective || "Objectif à définir."}</p></div>
      <div class="module-card-foot"><div><span>${published ? statusLabel(status) : "À développer"}</span><strong>${published ? `Quiz ${score}` : "Cadrage uniquement"}</strong></div><a class="btn btn-small ${published && coreContext ? "btn-primary" : "btn-secondary"}" href="#module/${module.code}">${published ? "Ouvrir" : "Consulter le cadrage"}</a></div>
    </article>`;
  }

  function renderModule(code) {
    const module = DATA.modules[code];
    if (!module) { routeToHome(); return; }
    const published = isModulePublished(module);
    const progress = moduleProgress(code);
    if (published && !progress.status) setModuleProgress(code, { status: "in_progress" });
    const refreshed = published ? moduleProgress(code) : progress;
    const threshold = moduleThreshold(module);
    const thresholdCount = moduleQuizThresholdCount(module);
    const artifactMinimum = requiredArtifactLength(module);
    const returnLink = module.month ? `#month/${module.month}` : `#track/${module.track}`;
    const assessment = published ? `
        <section id="artifact"><p class="kicker">Preuve de travail</p><h2>Artefact à produire</h2>${module.artifactHtml || `<p>${module.artifact || "Livrable à définir."}</p>`}${renderRubric(module)}
          ${renderEvidenceFields(module, refreshed)}
          <label class="field-label" for="artifactNotes">Note de travail (${artifactMinimum} caractères minimum pour soumettre)</label>
          <textarea id="artifactNotes" rows="9" placeholder="Conclusion, contrôles, montants, pièces manquantes, points à valider…">${escapeHtml(refreshed.artifactNote || "")}</textarea>
          <div class="inline-actions"><button class="btn btn-secondary" type="button" onclick="FiduApp.saveArtifact('${code}')">Sauvegarder</button><span id="artifactCounter" class="char-counter">${(refreshed.artifactNote || "").length} caractères</span></div>
        </section>
        <section id="quiz"><p class="kicker">Contrôle de connaissances</p><h2>Quiz</h2><p>Seuil: <strong>${thresholdCount}/${(module.quiz || []).length}</strong>${module.criticalQuestionIds ? ` et réussite des ${module.criticalQuestionIds.length} questions critiques` : ` (${threshold}%)`}. Toutes les questions doivent être répondues avant l’affichage de la correction.</p><form id="quizForm">${(module.quiz || []).map(renderQuizQuestion).join("")}</form><button class="btn btn-primary" type="button" onclick="FiduApp.gradeQuiz('${code}')">Terminer et corriger le quiz</button><div id="quizResult" class="result-box" aria-live="polite"></div></section>
        ${renderPracticalReview(module, refreshed)}` : `
        <section class="content-warning blueprint-assessment" role="status"><strong>Évaluation volontairement désactivée</strong><p>Cette fiche décrit le résultat métier, le cas et les contrôles à développer. Elle ne contient pas encore un cours, un dossier apprenant, un quiz et une grille de revue au niveau exigé par TC01. Aucun statut, score ou jalon ne peut donc être généré.</p></section>`;
    const validationAside = published
      ? `<section class="panel validation-panel"><p class="kicker">État du module</p><h2>${statusLabel(refreshed.status)}</h2>${renderModuleStatus(module, refreshed)}<button class="btn btn-primary btn-block" type="button" onclick="FiduApp.submitModule('${code}')">Soumettre pour revue</button><p class="fine-print">Quiz + preuves permettent la soumission. Pour TC01, la revue pratique 80/100 sans erreur critique est ensuite obligatoire avant le jalon mensuel.</p></section>`
      : `<section class="panel validation-panel blueprint-panel"><p class="kicker">Maturité du contenu</p><h2>Fiche de cadrage</h2><p>Non validable tant que le paquet pédagogique complet n’est pas publié et contrôlé.</p></section>`;
    document.getElementById("app").innerHTML = header(module.code) + `<main class="container module-layout">
      <article class="article panel">
        <div class="module-breadcrumb"><a href="${returnLink}">← Retour</a><span>${contentLabel(module)}</span></div>
        ${!published ? `<div class="content-warning"><strong>Fiche de cadrage — non validable</strong><p>Ce contenu reste consultable pour préparer le programme, mais il ne compte pas dans la progression et ne doit pas être présenté comme un module pédagogique complet.</p></div>` : ""}
        <p class="kicker">${DATA.tracks[module.track] ? DATA.tracks[module.track].title : "Parcours cœur"} · ${module.code}</p>
        <h1>${module.title}</h1>
        <p class="module-objective"><strong>Objectif opérationnel</strong>${module.objective || "À définir"}</p>
        ${module.pedagogicalStatus ? `<p class="pedagogical-status">${module.pedagogicalStatus}</p>` : ""}
        ${module.ruAid ? `<div class="reflex-box">${module.ruAid}</div>` : ""}
        ${renderLearnerPackage(module)}
        ${(module.sections || []).map(renderSection).join("")}
        ${assessment}
      </article>
      <aside class="module-aside">
        ${validationAside}
        <section class="panel sources-panel"><p class="kicker">Traçabilité</p><h2>Sources</h2>${renderSources(module)}</section>
      </aside>
    </main>${footer()}`;
    const textarea = document.getElementById("artifactNotes");
    if (textarea) textarea.addEventListener("input", () => {
      document.getElementById("artifactCounter").textContent = `${textarea.value.length} caractères`;
    });
  }

  function renderLearnerPackage(module) {
    if (!module.learnerPackage) return "";
    return `<section class="course-pack"><div><p class="kicker">Matériel hors ligne</p><h2>Paquet apprenant ${escapeHtml(module.contentVersion || "")}</h2><p>Le corrigé responsable n’est pas inclus dans l’application apprenant.</p></div><div class="course-pack-actions"><a class="btn btn-accent" href="${assetPath(module.learnerPackage.zip)}" download>Télécharger le paquet ZIP</a>${module.learnerPackage.files.map((file) => `<a href="${assetPath(file.path)}">${escapeHtml(file.label)}</a>`).join("")}</div></section>`;
  }

  function renderEvidenceFields(module, progress) {
    if (!module.evidenceItems || !module.evidenceItems.length) return "";
    const refs = progress.evidenceRefs || {};
    return `<div class="evidence-grid"><p class="evidence-help">Indiquez le nom de fichier, le chemin du dossier de preuve ou un lien contrôlable. Le sélecteur peut préremplir la référence; les octets du fichier ne sont pas stockés.</p>${module.evidenceItems.map((item) => `<div class="evidence-row"><label for="evidence-${item.id}">${escapeHtml(item.label)}<input id="evidence-${item.id}" data-evidence-id="${item.id}" value="${escapeHtml(refs[item.id] || "")}" placeholder="Ex. TC01/ML-01/fiche-ouverture-v2.xlsx"></label><label class="file-pick">Choisir un fichier<input type="file" onchange="FiduApp.captureEvidenceFile('${module.code}', '${item.id}', this.files[0])"></label></div>`).join("")}</div>`;
  }

  function renderSection(section) {
    const className = section.type ? ` ${section.type}` : "";
    return `<section class="course-section${className}"><h2>${section.title}</h2>${section.bodyHtml || `<p>${section.body || ""}</p>`}</section>`;
  }

  function renderRubric(module) {
    if (!module.reviewRubric || !module.reviewRubric.length) return "";
    return `<div class="rubric"><strong>Grille de revue</strong><ul>${module.reviewRubric.map((item) => `<li>${item}</li>`).join("")}</ul></div>`;
  }

  function renderPracticalReview(module, progress) {
    if (!module.practicalReview) return "";
    const review = progress.practicalReview || {};
    const scores = review.scores || {};
    const checks = review.criticalChecks || {};
    const passed = practicalReviewPassed(module, progress);
    return `<section id="practicalReview" class="practical-review"><p class="kicker">Réservé au responsable</p><h2>Évaluation pratique spécifique</h2><p>Seuil: <strong>${module.practicalReview.threshold}/100</strong>. Les quatre contrôles critiques doivent être conformes. La moindre modification d’une preuve annule cette revue.</p>
      <div class="review-score-grid">${module.practicalReview.scoreItems.map((item) => `<label>${escapeHtml(item.label)}<span>Maximum ${item.max}</span><input id="score-${item.id}" type="number" min="0" max="${item.max}" step="1" value="${scores[item.id] ?? ""}"></label>`).join("")}</div>
      <div class="critical-review"><strong>Contrôles critiques — répondre Oui si l’erreur apparaît</strong>${module.practicalReview.criticalChecks.map((item) => `<label>${escapeHtml(item.label)}<select id="critical-${item.id}"><option value="">Choisir</option><option value="no" ${checks[item.id] === false ? "selected" : ""}>Non — aucune erreur</option><option value="yes" ${checks[item.id] === true ? "selected" : ""}>Oui — erreur critique</option></select></label>`).join("")}</div>
      <div class="review-meta-grid"><label>Responsable<input id="practicalReviewer" value="${escapeHtml(review.reviewer || "")}" placeholder="Nom ou identifiant"></label><label>Date<input id="practicalDate" type="date" value="${escapeHtml(review.date || today())}"></label><label>Décision<select id="practicalDecision"><option value="">Choisir</option><option value="passed" ${review.decision === "passed" ? "selected" : ""}>Pratique validée</option><option value="extension" ${review.decision === "extension" ? "selected" : ""}>À reprendre</option></select></label></div>
      <label>Feedback du responsable (${module.practicalReview.feedbackMinimumCharacters} caractères minimum)<textarea id="practicalFeedback" rows="6" placeholder="Forces, écarts observés, corrections demandées et limite de délégation…">${escapeHtml(review.feedback || "")}</textarea></label>
      <div class="inline-actions"><button class="btn btn-primary" type="button" onclick="FiduApp.savePracticalReview('${module.code}')">Enregistrer l’évaluation</button>${passed ? `<span class="review-pass">Pratique validée · ${review.score}/100</span>` : review.decision ? `<span class="review-pending">Revue non validante · ${review.score || 0}/100</span>` : ""}</div>
    </section>`;
  }

  function renderQuizQuestion(question, index) {
    return `<fieldset class="quiz-card ${question.critical ? "quiz-critical" : ""}"><legend>${question.id || `Question ${index + 1}`} · ${escapeHtml(question.domain || "Connaissances")}${question.critical ? " · critique" : ""}</legend><p>${question.q}</p><div class="quiz-options">${question.choices.map((choice, choiceIndex) => `<label><input type="radio" name="q${index}" value="${choiceIndex}"><span>${choice}</span></label>`).join("")}</div><p class="quiz-explanation" id="explain-${index}"></p></fieldset>`;
  }

  function renderModuleStatus(module, progress) {
    const threshold = moduleThreshold(module);
    const thresholdCount = moduleQuizThresholdCount(module);
    const noteLength = (progress.artifactNote || "").length;
    const artifactMinimum = requiredArtifactLength(module);
    const refs = evidenceRefs(module, progress);
    const refsDone = refs.filter((value) => value.length >= 3).length;
    return `<div class="readiness-list"><span class="${quizPassed(module, progress) ? "ok" : ""}">Quiz <strong>${progress.quizBestCorrect || Math.round(((progress.quizBest || 0) * (module.quiz || []).length) / 100)}/${(module.quiz || []).length} · seuil ${thresholdCount}</strong></span><span class="${noteLength >= artifactMinimum ? "ok" : ""}">Note <strong>${noteLength}/${artifactMinimum}</strong></span>${module.evidenceItems ? `<span class="${evidenceComplete(module, progress) ? "ok" : ""}">Livrables <strong>${refsDone}/${module.evidenceItems.length}</strong></span>` : ""}${module.practicalReview ? `<span class="${practicalReviewPassed(module, progress) ? "ok" : ""}">Pratique <strong>${progress.practicalReview?.score || 0}/${module.practicalReview.threshold}</strong></span>` : ""}</div>`;
  }

  function renderSources(module) {
    const registry = DATA.sourcesRegistry && DATA.sourcesRegistry.sources ? DATA.sourcesRegistry.sources : {};
    const refs = module.sourceRefs || [];
    if (!refs.length) return `<p class="fine-print">Aucune source rattachée: le contenu ne peut pas être validé comme module de production.</p>`;
    return `<div class="source-list">${refs.map((key) => {
      const source = registry[key];
      if (!source) return `<span class="source-item source-missing">Source manquante: ${key}</span>`;
      const pending = String(source.lastChecked || "").startsWith("Vérification juridique");
      return `<a class="source-item ${pending ? "source-pending" : ""}" href="${source.url}" target="_blank" rel="noopener noreferrer"><strong>${source.sourceName}</strong>${source.articles ? `<span>Référence: ${escapeHtml(source.articles)}</span>` : ""}<span>${pending ? escapeHtml(source.lastChecked) : `Vérifié le ${escapeHtml(source.lastChecked)}`} · revue: ${escapeHtml(source.reviewFrequency)}</span></a>`;
    }).join("")}</div>`;
  }

  function renderLibrary() {
    const trackIds = Object.keys(DATA.tracks).filter((id) => id !== "tronc-commun");
    const sectorModules = Object.values(DATA.modules).filter((module) => module.track !== "tronc-commun");
    const blueprints = sectorModules.filter((module) => module.status === "blueprint").length;
    document.getElementById("app").innerHTML = header("Bibliothèque") + `<main class="container">
      <section class="library-hero"><p class="kicker kicker-light">Approfondissement facultatif</p><h1>Bibliothèque sectorielle</h1><p>${sectorModules.length} contenus sont conservés pour orienter la spécialisation. ${blueprints} sont encore des fiches de cadrage: utiles pour cartographier un sujet, insuffisantes pour certifier une compétence.</p></section>
      <section class="content-warning library-warning"><strong>Règle de qualité</strong><p>Seuls les modules explicitement marqués «module approfondi» ou validés par le cabinet peuvent être affectés à un apprenant. Les fiches de cadrage ne comptent pas dans la progression 12 mois.</p></section>
      <div class="track-grid">${trackIds.map((id) => renderTrackCard(id)).join("")}</div>
    </main>${footer()}`;
  }

  function renderTrackCard(id) {
    const track = DATA.tracks[id];
    const modules = Object.values(DATA.modules).filter((module) => module.track === id);
    const completed = modules.filter((module) => isModulePublished(module) && moduleProgress(module.code).status === "validated").length;
    const substantial = modules.filter((module) => ["production", "pilot"].includes(module.status)).length;
    return `<article class="track-card" style="--track-color:${track.color}"><span class="eyebrow">${track.priority} · ${modules.length} contenus</span><h2>${track.title}</h2><p>${track.subtitle}</p><div class="track-stats"><span>${substantial} approfondi${substantial > 1 ? "s" : ""}/pilote${substantial > 1 ? "s" : ""}</span><span>${completed} validé${completed > 1 ? "s" : ""}</span></div><a class="btn btn-secondary" href="#track/${id}">Explorer</a></article>`;
  }

  function renderTrack(id) {
    const track = DATA.tracks[id];
    if (!track || id === "tronc-commun") { renderLibrary(); return; }
    const modules = Object.values(DATA.modules).filter((module) => module.track === id);
    const axes = track.axes && track.axes.length ? track.axes : [{ id: "all", title: "Contenus", modules: modules.map((module) => module.code) }];
    document.getElementById("app").innerHTML = header(track.title) + `<main class="container"><div class="track-head" style="--track-color:${track.color}"><a href="#library">← Bibliothèque</a><p class="kicker">${track.priority} · approfondissement facultatif</p><h1>${track.title}</h1><p>${track.subtitle}</p></div><div class="track-axes">${axes.map((axis) => `<section><p class="kicker">${axis.id}</p><h2>${axis.title}</h2><div class="modules-grid">${axis.modules.map((code) => renderModuleCard(code, false)).join("")}</div></section>`).join("")}</div></main>${footer()}`;
  }

  function footer() {
    return `<footer class="footer"><div class="container"><div><strong>Fiduciaire Universelle</strong><span>Parcours interne · mise à jour ${ROADMAP.updatedAt}</span></div><p>Outil pédagogique indépendant. Les sources officielles, le mandat, les procédures du cabinet et la revue d’une personne compétente restent déterminants.</p></div></footer>`;
  }

  function saveProfile(event) {
    event.preventDefault();
    const progress = getProgress();
    progress.learner = {
      name: document.getElementById("profileName").value.trim(),
      role: document.getElementById("profileRole").value.trim() || "Assistant·e comptable",
      startedAt: document.getElementById("profileStart").value || today(),
      hoursPerWeek: Number(document.getElementById("profileHours").value) || 6
    };
    saveProgress(progress);
    renderHome();
    showToast("Parcours mis à jour.");
  }

  function toggleMonthTask(number, group, index, checked) {
    const month = monthByNumber(number);
    if (!month || !["practice", "deliverables", "external"].includes(group)) return;
    const progress = getProgress();
    const current = normalizedMonthProgress(month);
    const changed = current[group][index] !== Boolean(checked);
    current[group][index] = Boolean(checked);
    progress.months[number] = current;
    if (changed) invalidateMonth(number, progress);
    progress.lastVisited = { type: "month", number };
    saveProgress(progress);
    renderMonth(number);
  }

  function saveMonthEvidence(number) {
    const month = monthByNumber(number);
    if (!month) return;
    const progress = getProgress();
    const current = normalizedMonthProgress(month);
    const nextEvidence = document.getElementById("monthEvidence").value.trim();
    const changed = current.evidence !== nextEvidence;
    current.evidence = nextEvidence;
    progress.months[number] = current;
    if (changed) invalidateMonth(number, progress);
    saveProgress(progress);
    renderMonth(number);
    showToast("Note mensuelle sauvegardée.");
  }

  function saveMonthReview(number) {
    const month = monthByNumber(number);
    if (!month) return;
    const content = monthContentReadiness(month);
    if (!content.complete) {
      showToast(`Validation impossible: ${content.blockers.length} module${content.blockers.length > 1 ? "s" : ""} du mois ${content.blockers.length > 1 ? "ne sont" : "n’est"} pas encore publié${content.blockers.length > 1 ? "s" : ""}.`, true);
      return;
    }
    const progress = getProgress();
    const current = normalizedMonthProgress(month);
    current.evidence = document.getElementById("monthEvidence").value.trim();
    current.reviewer = {
      name: document.getElementById("reviewerName").value.trim(),
      date: document.getElementById("reviewerDate").value || today(),
      decision: document.getElementById("reviewerDecision").value,
      feedback: document.getElementById("reviewerFeedback").value.trim()
    };
    progress.months[number] = current;
    saveProgress(progress);
    const readiness = monthReadiness(month);
    if (current.reviewer.decision === "validated") {
      if (number > 1 && !monthReadiness(monthByNumber(number - 1)).validated) { showToast(`Le mois ${number - 1} doit être validé avant ce jalon.`, true); return; }
      if (!readiness.readyForReview) { showToast("Terminez les modules, travaux, livrables et ressources avant la validation.", true); return; }
      if (!monthEvidenceComplete(current)) { showToast(`La note mensuelle doit contenir au moins ${DATA.settings.monthEvidenceMinimumCharacters} caractères.`, true); return; }
      if (current.reviewer.name.length < 3 || current.reviewer.feedback.length < DATA.settings.reviewerFeedbackMinimumCharacters) { showToast(`Ajoutez un responsable identifiable et un retour d’au moins ${DATA.settings.reviewerFeedbackMinimumCharacters} caractères.`, true); return; }
      if (!current.reviewer.date || current.reviewer.date > today()) { showToast("La date de revue doit être renseignée et ne peut pas être future.", true); return; }
      current.validatedAt = current.reviewer.date;
      current.validationSnapshot = JSON.stringify({
        modules: month.modules.map((code) => ({ code, signature: artifactSignature(DATA.modules[code], progress.modules[code] || {}) })),
        practice: current.practice,
        deliverables: current.deliverables,
        external: current.external,
        evidence: current.evidence
      });
      month.modules.forEach((code) => {
        progress.modules[code] = Object.assign({}, progress.modules[code] || {}, {
          status: "validated",
          validatedAt: current.reviewer.date,
          reviewer: current.reviewer.name,
          updatedAt: today()
        });
      });
    } else {
      invalidateMonth(number, progress);
      current.validatedAt = null;
      current.validationSnapshot = null;
    }
    progress.months[number] = current;
    saveProgress(progress);
    renderMonth(number);
    showToast(current.validatedAt ? "Jalon mensuel validé." : "Revue enregistrée avec prolongation ciblée.");
  }

  function collectEvidenceRefs(module) {
    const refs = {};
    (module.evidenceItems || []).forEach((item) => {
      const input = document.getElementById(`evidence-${item.id}`);
      refs[item.id] = input ? input.value.trim() : "";
    });
    return refs;
  }

  function saveArtifact(code) {
    const module = DATA.modules[code];
    const textarea = document.getElementById("artifactNotes");
    if (!module || !textarea) return;
    if (!isModulePublished(module)) { showToast("Cette fiche de cadrage n’est pas validable.", true); return; }
    const progress = getProgress();
    const current = Object.assign({}, progress.modules[code] || {});
    const nextNote = textarea.value.trim();
    const nextRefs = module.evidenceItems ? collectEvidenceRefs(module) : (current.evidenceRefs || {});
    const changed = current.artifactNote !== nextNote || JSON.stringify(current.evidenceRefs || {}) !== JSON.stringify(nextRefs);
    current.artifactNote = nextNote;
    current.evidenceRefs = nextRefs;
    progress.modules[code] = current;
    if (changed) invalidateModuleDependencies(code, progress);
    progress.modules[code].artifactNote = nextNote;
    progress.modules[code].evidenceRefs = nextRefs;
    progress.modules[code].updatedAt = today();
    progress.lastVisited = { type: "module", code };
    saveProgress(progress);
    showToast(changed ? "Preuves sauvegardées; toute validation antérieure a été annulée." : "Preuves sauvegardées.");
    renderModule(code);
  }

  function captureEvidenceFile(code, evidenceId, file) {
    if (!file) return;
    if (!isModulePublished(DATA.modules[code])) { showToast("Cette fiche de cadrage n’est pas validable.", true); return; }
    const input = document.getElementById(`evidence-${evidenceId}`);
    if (!input) return;
    const kilobytes = Math.max(1, Math.round(file.size / 1024));
    const modified = file.lastModified ? new Date(file.lastModified).toISOString().slice(0, 10) : "date inconnue";
    input.value = `${file.name} · ${kilobytes} Ko · modifié ${modified}`;
    showToast("Référence préremplie. Utilisez «Sauvegarder» pour l’enregistrer.");
  }

  function gradeQuiz(code) {
    const module = DATA.modules[code];
    if (!isModulePublished(module)) { showToast("Le quiz est désactivé tant que le module n’est pas publié.", true); return; }
    if (!module || !module.quiz || !module.quiz.length) { showToast("Quiz non disponible.", true); return; }
    const selectedAnswers = module.quiz.map((_, index) => document.querySelector(`input[name="q${index}"]:checked`));
    if (selectedAnswers.some((selected) => !selected)) {
      showToast(`Répondez aux ${module.quiz.length} questions avant d’afficher la correction.`, true);
      return;
    }
    let correct = 0;
    const criticalMissed = [];
    module.quiz.forEach((question, index) => {
      const selected = selectedAnswers[index];
      const explanation = document.getElementById(`explain-${index}`);
      const ok = selected && Number(selected.value) === question.answer;
      if (ok) correct += 1;
      if (question.critical && !ok) criticalMissed.push(question.id || `Q${index + 1}`);
      explanation.className = `quiz-explanation ${ok ? "good" : "bad"}`;
      explanation.textContent = `${ok ? "✓" : "✕"} ${question.explain}`;
    });
    const score = Math.round((correct / module.quiz.length) * 100);
    const thresholdCount = moduleQuizThresholdCount(module);
    const passedAttempt = correct >= thresholdCount && criticalMissed.length === 0;
    const allProgress = getProgress();
    const previous = Object.assign({}, allProgress.modules[code] || {});
    const preserveReady = passedAttempt && ["review_ready", "validated"].includes(previous.status);
    const nextStatus = preserveReady ? previous.status : (passedAttempt ? "quiz_passed" : "in_progress");
    const bestCorrect = Math.max(correct, previous.quizBestCorrect || 0);
    const current = Object.assign({}, previous, {
      quizBest: Math.max(score, previous.quizBest || 0),
      quizBestCorrect: bestCorrect,
      quizTotal: module.quiz.length,
      quizPassed: passedAttempt,
      quizVersion: module.contentVersion || ROADMAP.version,
      lastQuizAttempt: { date: today(), correct, criticalMissed },
      status: nextStatus,
      updatedAt: today()
    });
    if (!passedAttempt) {
      current.practicalReview = null;
      current.submittedAt = null;
      current.validatedAt = null;
      if (module.month) invalidateMonth(module.month, allProgress);
    }
    allProgress.modules[code] = current;
    allProgress.lastVisited = { type: "module", code };
    saveProgress(allProgress);
    const result = document.getElementById("quizResult");
    result.className = `result-box ${passedAttempt ? "good" : "bad"}`;
    result.innerHTML = `<strong>${correct}/${module.quiz.length} · ${score}%</strong><span>${passedAttempt ? "Quiz réussi. Complétez les preuves puis soumettez le module." : `Quiz non réussi: seuil ${thresholdCount}/${module.quiz.length}${criticalMissed.length ? `; questions critiques à reprendre: ${criticalMissed.join(", ")}` : ""}.`}</span>`;
  }

  function submitModule(code) {
    const module = DATA.modules[code];
    if (!isModulePublished(module)) { showToast("Cette fiche de cadrage n’est pas validable.", true); return; }
    const textarea = document.getElementById("artifactNotes");
    const artifactNote = textarea ? textarea.value.trim() : (moduleProgress(code).artifactNote || "");
    const refs = module.evidenceItems ? collectEvidenceRefs(module) : (moduleProgress(code).evidenceRefs || {});
    const stored = moduleProgress(code);
    if (!quizPassed(module, stored)) { showToast(`Le quiz doit atteindre ${moduleQuizThresholdCount(module)}/${module.quiz.length} sans erreur critique.`, true); return; }
    if (artifactNote.length < requiredArtifactLength(module)) { showToast(`La note doit contenir au moins ${requiredArtifactLength(module)} caractères.`, true); return; }
    if (module.evidenceItems && module.evidenceItems.some((item) => String(refs[item.id] || "").trim().length < 3)) { showToast("Ajoutez une référence contrôlable pour chacun des six livrables.", true); return; }
    const allProgress = getProgress();
    const current = Object.assign({}, allProgress.modules[code] || {}, { artifactNote, evidenceRefs: refs });
    const changed = artifactSignature(module, current) !== artifactSignature(module, allProgress.modules[code] || {});
    allProgress.modules[code] = current;
    if (changed) invalidateModuleDependencies(code, allProgress);
    allProgress.modules[code] = Object.assign({}, allProgress.modules[code], { artifactNote, evidenceRefs: refs, status: "review_ready", submittedAt: today(), updatedAt: today() });
    allProgress.lastVisited = { type: "module", code };
    saveProgress(allProgress);
    renderModule(code);
    showToast(module.practicalReview ? "Module soumis. La revue pratique du responsable est maintenant requise." : "Module prêt pour la revue mensuelle.");
  }

  function savePracticalReview(code) {
    const module = DATA.modules[code];
    if (!isModulePublished(module)) { showToast("Cette fiche de cadrage n’est pas validable.", true); return; }
    if (!module || !module.practicalReview) return;
    const progress = getProgress();
    const current = Object.assign({}, progress.modules[code] || {});
    if (current.status !== "review_ready") { showToast("Soumettez d’abord le quiz et les six livrables.", true); return; }

    const scores = {};
    let score = 0;
    for (const item of module.practicalReview.scoreItems) {
      const input = document.getElementById(`score-${item.id}`);
      const value = input && input.value !== "" ? Number(input.value) : NaN;
      if (!Number.isFinite(value) || value < 0 || value > item.max) {
        showToast(`Renseignez ${item.label} entre 0 et ${item.max}.`, true);
        return;
      }
      scores[item.id] = value;
      score += value;
    }

    const criticalChecks = {};
    let criticalFailure = false;
    for (const item of module.practicalReview.criticalChecks) {
      const value = document.getElementById(`critical-${item.id}`).value;
      if (!value) { showToast("Renseignez les quatre contrôles critiques.", true); return; }
      criticalChecks[item.id] = value === "yes";
      if (value === "yes") criticalFailure = true;
    }

    const reviewer = document.getElementById("practicalReviewer").value.trim();
    const date = document.getElementById("practicalDate").value;
    const decision = document.getElementById("practicalDecision").value;
    const feedback = document.getElementById("practicalFeedback").value.trim();
    if (reviewer.length < 3) { showToast("Identifiez le responsable de la revue.", true); return; }
    if (!date || date > today()) { showToast("La date de revue est obligatoire et ne peut pas être future.", true); return; }
    if (!decision) { showToast("Choisissez une décision de revue.", true); return; }
    if (feedback.length < module.practicalReview.feedbackMinimumCharacters) { showToast(`Le feedback doit contenir au moins ${module.practicalReview.feedbackMinimumCharacters} caractères.`, true); return; }

    const passed = decision === "passed" && score >= module.practicalReview.threshold && !criticalFailure;
    if (decision === "passed" && !passed) {
      showToast(criticalFailure ? "Une erreur critique bloque la validation pratique." : `Le score pratique doit atteindre ${module.practicalReview.threshold}/100.`, true);
      return;
    }

    current.practicalReview = {
      scores,
      score,
      criticalChecks,
      reviewer,
      date,
      decision,
      feedback,
      passed,
      artifactSignature: artifactSignature(module, current),
      reviewedAt: new Date().toISOString()
    };
    current.updatedAt = today();
    progress.modules[code] = current;
    if (module.month) invalidateMonth(module.month, progress);
    saveProgress(progress);
    renderModule(code);
    showToast(passed ? `Pratique validée: ${score}/100.` : "Revue enregistrée avec reprise ciblée.");
  }

  function exportProgress() {
    const payload = {
      exportedAt: new Date().toISOString(),
      program: { version: ROADMAP.version, updatedAt: ROADMAP.updatedAt, title: ROADMAP.title },
      progress: getProgress()
    };
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
    const anchor = document.createElement("a");
    anchor.href = URL.createObjectURL(blob);
    anchor.download = `progression-fiduciaire-12-mois-${today()}.json`;
    anchor.click();
    URL.revokeObjectURL(anchor.href);
  }

  function safeImportedText(value, maximum = 4000) {
    return typeof value === "string" ? value.slice(0, maximum) : "";
  }

  function sanitizeImportedProgress(imported) {
    const safe = defaultProgress();
    const learner = imported.learner || {};
    const hours = Number(learner.hoursPerWeek);
    safe.learner = {
      name: safeImportedText(learner.name, 120),
      role: safeImportedText(learner.role, 120) || "Assistant·e comptable",
      startedAt: /^\d{4}-\d{2}-\d{2}$/.test(String(learner.startedAt || "")) ? learner.startedAt : today(),
      hoursPerWeek: Number.isFinite(hours) && hours > 0 && hours <= 80 ? hours : 6
    };

    Object.entries(imported.modules || {}).forEach(([code, source]) => {
      const module = DATA.modules[code];
      if (!module || !source || typeof source !== "object") return;
      const evidenceRefs = {};
      (module.evidenceItems || []).forEach((item) => {
        evidenceRefs[item.id] = safeImportedText(source.evidenceRefs && source.evidenceRefs[item.id], 1000);
      });
      const quizTotal = (module.quiz || []).length;
      const bestCorrect = Math.max(0, Math.min(quizTotal, Number(source.quizBestCorrect) || 0));
      safe.modules[code] = {
        status: "in_progress",
        quizBest: Math.max(0, Math.min(100, Number(source.quizBest) || 0)),
        quizBestCorrect: bestCorrect,
        quizPassed: false,
        quizVersion: null,
        artifactNote: safeImportedText(source.artifactNote, 12000),
        evidenceRefs,
        practicalReview: null,
        submittedAt: null,
        validatedAt: null,
        importedAt: today(),
        importReviewRequired: true,
        migrationNote: "Travail restauré depuis une sauvegarde v2.3; quiz et validations doivent être reconfirmés dans l’application."
      };
    });

    ROADMAP.months.forEach((month) => {
      const source = imported.months && imported.months[month.month];
      if (!source || typeof source !== "object") return;
      const reviewer = source.reviewer && typeof source.reviewer === "object" ? source.reviewer : {};
      safe.months[month.month] = {
        practice: month.practice.map((_, index) => Boolean(source.practice && source.practice[index])),
        deliverables: month.deliverables.map((_, index) => Boolean(source.deliverables && source.deliverables[index])),
        external: (month.external || []).map((_, index) => Boolean(source.external && source.external[index])),
        evidence: safeImportedText(source.evidence, 12000),
        reviewer: {
          name: safeImportedText(reviewer.name, 120),
          date: today(),
          decision: "",
          feedback: safeImportedText(reviewer.feedback, 8000)
        },
        validatedAt: null,
        validationSnapshot: null,
        importedAt: today(),
        importReviewRequired: true
      };
    });

    const last = imported.lastVisited;
    if (last && last.type === "module" && DATA.modules[last.code]) safe.lastVisited = { type: "module", code: last.code };
    if (last && last.type === "month" && monthByNumber(last.number)) safe.lastVisited = { type: "month", number: Number(last.number) };
    return safe;
  }

  function importProgress(file) {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const payload = JSON.parse(String(reader.result || ""));
        if (!payload || !payload.program || payload.program.version !== ROADMAP.version || !payload.progress || typeof payload.progress !== "object") {
          showToast(`Sauvegarde incompatible. Importez un export de la version ${ROADMAP.version}.`, true);
          return;
        }
        const imported = payload.progress;
        if (!imported.learner || typeof imported.learner !== "object" || !imported.modules || typeof imported.modules !== "object" || !imported.months || typeof imported.months !== "object") {
          showToast("Sauvegarde invalide: structure de progression incomplète.", true);
          return;
        }
        if (!confirm("Restaurer cette sauvegarde v2.3? Les travaux seront conservés, mais les quiz et validations devront être reconfirmés.")) return;
        const safeProgress = sanitizeImportedProgress(imported);
        storageSet(KEY, JSON.stringify(safeProgress, null, 2));
        location.hash = "#home";
        renderHome();
        showToast("Sauvegarde restaurée. Travaux conservés; quiz et validations à reconfirmer.");
      } catch (error) {
        showToast("Impossible de lire ce fichier JSON de progression.", true);
      }
    };
    reader.onerror = () => showToast("Impossible de lire ce fichier.", true);
    reader.readAsText(file);
  }

  function resetProgress() {
    if (confirm("Effacer toute la progression locale de la version 2.3?")) {
      storageRemove(KEY);
      location.hash = "#home";
      renderHome();
    }
  }

  function showToast(message, isError) {
    let toast = document.getElementById("appToast");
    if (!toast) {
      toast = document.createElement("div");
      toast.id = "appToast";
      toast.className = "app-toast";
      document.body.appendChild(toast);
    }
    toast.setAttribute("role", isError ? "alert" : "status");
    toast.setAttribute("aria-live", isError ? "assertive" : "polite");
    toast.textContent = message;
    toast.className = `app-toast is-visible ${isError ? "is-error" : ""}`;
    window.clearTimeout(showToast.timer);
    showToast.timer = window.setTimeout(() => { toast.className = "app-toast"; }, 3200);
  }

  function routeToHome() { location.hash = "#home"; renderHome(); }
  function route() {
    const hash = (location.hash || "#home").replace(/^#\/?/, "");
    const [view, id] = hash.split("/");
    if (!view || view === "home") renderHome();
    else if (view === "month") renderMonth(id);
    else if (view === "module") renderModule(id);
    else if (view === "library") renderLibrary();
    else if (view === "track") renderTrack(id);
    else if (view === "profile") { renderHome(); setTimeout(() => document.getElementById("profile")?.scrollIntoView(), 0); }
    else renderHome();
    window.scrollTo({ top: 0, behavior: "auto" });
  }

  window.addEventListener("hashchange", route);
  window.FiduApp = {
    route,
    renderHome,
    renderMonth,
    renderModule,
    renderLibrary,
    renderTrack,
    saveProfile,
    toggleMonthTask,
    saveMonthEvidence,
    saveMonthReview,
    saveArtifact,
    captureEvidenceFile,
    gradeQuiz,
    submitModule,
    savePracticalReview,
    exportProgress,
    importProgress,
    resetProgress
  };
})();
