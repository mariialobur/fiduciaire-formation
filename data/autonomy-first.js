(function () {
  const DATA = window.FIDUCIAIRE_DATA;
  const ROADMAP = window.FIDUCIAIRE_ROADMAP;
  const APP = window.FiduApp;
  if (!DATA || !ROADMAP || !APP) return;

  const KEY = "fiduciaire_formation_progress_v24";
  const VERSION = "2.5-autonomy-first";
  window.FIDUCIAIRE_AUTONOMY = { version: VERSION, mode: "autonomy-first" };

  const templateMap = {
    TC01: {
      opening: "ressources/tc01-apprenant-v1.4/07_Fiche_ouverture_TC01.csv",
      calendar: "ressources/tc01-apprenant-v1.4/08_Calendrier_TC01.csv",
      outscope: "ressources/tc01-apprenant-v1.4/09_Registre_hors_mandat_TC01.csv",
      decision: "ressources/tc01-apprenant-v1.4/10_Note_decision_TC01.txt",
      client_email: "ressources/tc01-apprenant-v1.4/11_Email_client_TC01.txt",
      verification_log: "ressources/tc01-apprenant-v1.4/12_Journal_verification_TC01.csv"
    },
    TC02: {
      legal_identity: "ressources/tc02-apprenant-v1.0/06_Fiche_identite_juridique_TC02.csv",
      cutover_timeline: "ressources/tc02-apprenant-v1.0/04_Chronologie_reprise_TC02.csv",
      flow_matrix: "ressources/tc02-apprenant-v1.0/03_Matrice_flux_TC02.csv",
      takeover_table: "ressources/tc02-apprenant-v1.0/07_Tableau_reprise_TC02.csv",
      open_points: "ressources/tc02-apprenant-v1.0/08_Note_points_ouverts_TC02.md",
      verification_log: "ressources/tc02-apprenant-v1.0/05_Journal_verification_TC02.csv"
    },
    TC03: {
      data_inventory: "ressources/tc03-apprenant-v1.0/03_Inventaire_donnees_TC03.csv",
      access_matrix: "ressources/tc03-apprenant-v1.0/04_Matrice_acces_TC03.csv",
      sharing_register: "ressources/tc03-apprenant-v1.0/05_Registre_partages_TC03.csv",
      joiner_leaver: "ressources/tc03-apprenant-v1.0/06_Checklist_acces_TC03.csv",
      incident_sheet: "ressources/tc03-apprenant-v1.0/07_Fiche_incident_TC03.md",
      verification_log: "ressources/tc03-apprenant-v1.0/08_Journal_verification_TC03.csv"
    },
    TC04: {
      client_identity: "ressources/tc04-apprenant-v1.0/03_Fiche_identite_TC04.csv",
      ubo_chart: "ressources/tc04-apprenant-v1.0/04_Controle_UBO_TC04.csv",
      business_profile: "ressources/tc04-apprenant-v1.0/05_Profil_economique_TC04.csv",
      service_scope: "ressources/tc04-apprenant-v1.0/06_Matrice_services_LBA_TC04.csv",
      escalation_note: "ressources/tc04-apprenant-v1.0/07_Note_escalade_TC04.md",
      verification_log: "ressources/tc04-apprenant-v1.0/08_Journal_verification_TC04.csv"
    }
  };

  Object.entries(templateMap).forEach(([code, mapping]) => {
    const module = DATA.modules[code];
    if (!module) return;
    module.validationMode = "autonomy-first";
    module.duration = String(module.duration || "").replace(/\s*\+\s*revue$/i, " + autocontrôle");
    (module.evidenceItems || []).forEach((item) => {
      if (mapping[item.id]) item.templatePath = mapping[item.id];
    });
  });

  const tc01 = DATA.modules.TC01;
  if (tc01) {
    const sources = DATA.sourcesRegistry && DATA.sourcesRegistry.sources ? DATA.sourcesRegistry.sources : {};
    sources.TC01_UID = {
      sourceName: "OFS — Registre IDE officiel: identité, RC et données TVA",
      url: "https://www.uid.admin.ch/",
      lastChecked: "2026-09-06",
      usedIn: ["TC01"],
      reviewFrequency: "per-use"
    };
    sources.TC01_ESTV_UID = {
      sourceName: "AFC/ESTV — Numéro d’identification des entreprises (IDE) et numéro TVA",
      url: "https://www.estv.admin.ch/fr/numero-identification-des-entreprises-ide",
      lastChecked: "2026-09-06",
      usedIn: ["TC01"],
      reviewFrequency: "before-use"
    };
    tc01.sourceRefs = Array.from(new Set([...(tc01.sourceRefs || []), "TC01_UID", "TC01_ESTV_UID"]));

    const packageFiles = tc01.learnerPackage && Array.isArray(tc01.learnerPackage.files) ? tc01.learnerPackage.files : [];
    const additions = [
      { label: "Exercice réel IDE / TVA — vérifier le statut", path: "ressources/tc01-apprenant-v1.4/13_Exercice_IDE_TVA_reel.html" },
      { label: "Fiche de contrôle IDE / TVA", path: "ressources/tc01-apprenant-v1.4/14_Fiche_IDE_TVA_reel.csv" }
    ];
    additions.forEach((item) => {
      if (!packageFiles.some((existing) => existing.path === item.path)) packageFiles.push(item);
    });
    tc01.learnerPackage = { files: packageFiles };

    if (!(tc01.sections || []).some((section) => section.title === "Contrôle IDE / TVA réel — ne pas se fier à un ancien numéro")) {
      const registryIndex = (tc01.sections || []).findIndex((section) => String(section.title || "").startsWith("Zefix:"));
      const position = registryIndex >= 0 ? registryIndex + 1 : 2;
      tc01.sections.splice(position, 0, {
        title: "Contrôle IDE / TVA réel — ne pas se fier à un ancien numéro",
        type: "decision",
        bodyHtml: `<p>Après l’identification RC, le junior doit savoir vérifier séparément le <strong>statut IDE</strong>, le <strong>statut RC</strong> et le <strong>statut Registre TVA</strong>. Une société peut être juridiquement active sans être actuellement assujettie à la TVA.</p><div class="table-scroll"><table class="learning-table"><thead><tr><th>Champ</th><th>Question à poser</th><th>Signal d’attention</th></tr></thead><tbody><tr><td>Statut IDE</td><td>L’entité IDE est-elle active?</td><td>Ne prouve pas à lui seul l’assujettissement TVA.</td></tr><tr><td>Statut RC</td><td>L’entité juridique est-elle toujours active?</td><td>Un RC actif ne signifie pas «TVA active».</td></tr><tr><td>Statut Registre TVA</td><td>L’inscription TVA est-elle active?</td><td>Statut vide/inactif = ne pas supposer l’assujettissement.</td></tr><tr><td>Début / fin d’assujettissement</td><td>La période du dossier est-elle couverte?</td><td>Une fin avant la facture ou un début après la facture exige une analyse.</td></tr><tr><td>Groupe TVA</td><td>Une IDE de groupe est-elle indiquée?</td><td>Ne pas traiter automatiquement chaque entité comme assujettie isolément.</td></tr></tbody></table></div><div class="callout"><strong>Exercice réel</strong><p>Utiliser Nestlé S.A. uniquement pour apprendre le registre IDE/TVA réel. Les valeurs doivent être relevées le jour de l’exercice; elles ne sont pas figées dans le cours.</p></div><p><a href="ressources/tc01-apprenant-v1.4/13_Exercice_IDE_TVA_reel.html" target="_blank" rel="noopener noreferrer">Ouvrir l’exercice IDE / TVA réel →</a></p>`
      });
    }
  }

  const css = document.createElement("style");
  css.textContent = `
    .autonomy-note{background:#edf7f1;border-left:4px solid #2e7957;border-radius:10px;padding:13px 15px;margin:12px 0;color:#183744}
    .autonomy-warning{background:#fff3ef;border-left:4px solid #d86d50;border-radius:10px;padding:12px 14px;margin-top:10px;color:#7a3727}
    .evidence-autonomy-actions{display:flex;flex-wrap:wrap;align-items:center;gap:10px;margin-top:9px}
    .evidence-autonomy-actions .btn{white-space:nowrap}
    .evidence-completion{display:inline-flex;align-items:center;gap:8px;font-weight:700;color:#0d6f69;cursor:pointer}
    .evidence-completion input{width:18px;height:18px}
    .autonomy-check-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:12px;margin:16px 0}
    .autonomy-check-card{border:1px solid #d9e0e2;border-radius:12px;padding:13px;background:#fff}
    .autonomy-check-card label{display:block;font-weight:700;margin-bottom:6px}
    .autonomy-check-card select{width:100%;padding:9px;border:1px solid #cbd6d9;border-radius:8px;background:#fff}
    .autonomy-critical{border:1px solid #ead4ce;border-radius:12px;padding:14px;background:#fff8f5;margin:14px 0}
    .autonomy-critical label{display:grid;grid-template-columns:1fr minmax(170px,240px);gap:12px;align-items:center;margin:10px 0}
    .autonomy-critical select{padding:9px;border:1px solid #d7c3bd;border-radius:8px;background:#fff}
    .autonomy-declaration{display:flex;gap:10px;align-items:flex-start;margin:16px 0;font-weight:700}
    .autonomy-declaration input{width:18px;height:18px;margin-top:2px}
    .autonomy-pass{background:#edf7f1;border:1px solid #b9d9c5;border-radius:12px;padding:13px;margin:12px 0}
    .autonomy-targeted-review{background:#f5f1e8;border-radius:12px;padding:13px;margin:12px 0;font-size:.95rem}
    .review-panel.autonomy-month .reviewer-trust{background:#edf7f1;border-left-color:#2e7957}
    @media(max-width:760px){.autonomy-check-grid{grid-template-columns:1fr}.autonomy-critical label{grid-template-columns:1fr}}
  `;
  document.head.appendChild(css);

  function today() { return new Date().toISOString().slice(0, 10); }
  function readProgress() {
    try { return JSON.parse(localStorage.getItem(KEY) || "{}"); }
    catch (error) { return {}; }
  }
  function saveProgress(progress) { localStorage.setItem(KEY, JSON.stringify(progress, null, 2)); }
  function moduleProgress(code) { return (readProgress().modules || {})[code] || {}; }
  function currentModuleCode() {
    const match = String(location.hash || "").match(/^#\/?module\/([^/]+)/);
    return match ? match[1] : null;
  }
  function assetPath(path) { return document.body && document.body.dataset.level === "sub" ? `../${path}` : path; }
  function escapeHtml(value) {
    return String(value == null ? "" : value).replace(/[&<>'"]/g, (char) => ({"&":"&amp;","<":"&lt;",">":"&gt;","'":"&#39;",'"':"&quot;"})[char]);
  }
  function artifactSignature(module, progress) {
    return JSON.stringify({
      contentVersion: module.contentVersion || ROADMAP.version,
      note: progress.artifactNote || "",
      evidenceRefs: progress.evidenceRefs || {}
    });
  }
  function showToast(message, isError) {
    let toast = document.getElementById("appToast");
    if (!toast) {
      toast = document.createElement("div");
      toast.id = "appToast";
      document.body.appendChild(toast);
    }
    toast.setAttribute("role", isError ? "alert" : "status");
    toast.textContent = message;
    toast.className = `app-toast is-visible ${isError ? "is-error" : ""}`;
    clearTimeout(showToast.timer);
    showToast.timer = setTimeout(() => { toast.className = "app-toast"; }, 3600);
  }

  const suspiciousTC01 = [
    "j_calendrier_source", "04_outils_tc01_apprenant", "a_fiche_client", "c_mandat_signe",
    "d_email_marc", "e_inventaire_pieces", "f_extrait_rc_actuel", "g_extrait_ide_tva",
    "h_delegation_interne", "i_simulation_eportal", "b_extrait_rc_ancien"
  ];
  function suspiciousEvidence(code, value) {
    const normalized = String(value || "").toLowerCase();
    if (!normalized) return false;
    if (code === "TC01" && suspiciousTC01.some((token) => normalized.includes(token))) return true;
    return false;
  }

  function enhanceEvidence(module) {
    const section = document.getElementById("artifact");
    if (!section || !module.evidenceItems || !module.evidenceItems.length) return;
    const help = section.querySelector(".evidence-help");
    if (help) help.innerHTML = `<strong>Aucun fichier n’est envoyé au site.</strong> Ouvrez le modèle correspondant, complétez-le sur votre ordinateur, puis cochez «Livrable terminé». Le nom de fichier ou l’emplacement local reste facultatif.`;

    section.querySelectorAll(".evidence-row").forEach((row) => {
      const input = row.querySelector("input[data-evidence-id]");
      if (!input) return;
      const id = input.dataset.evidenceId;
      const item = module.evidenceItems.find((candidate) => candidate.id === id);
      const oldPicker = row.querySelector(".file-pick");
      if (oldPicker) oldPicker.remove();
      input.placeholder = "Facultatif: nom du fichier ou dossier local";

      let actions = row.querySelector(".evidence-autonomy-actions");
      if (!actions) {
        actions = document.createElement("div");
        actions.className = "evidence-autonomy-actions";
        row.appendChild(actions);
      }
      actions.innerHTML = "";

      if (item && item.templatePath) {
        const link = document.createElement("a");
        link.className = "btn btn-small btn-secondary";
        link.href = assetPath(item.templatePath);
        link.textContent = "Ouvrir le modèle";
        if (/\.html$/i.test(item.templatePath)) {
          link.target = "_blank";
          link.rel = "noopener noreferrer";
        } else {
          link.setAttribute("download", "");
        }
        actions.appendChild(link);
      }

      const value = input.value.trim();
      const suspicious = suspiciousEvidence(module.code, value);
      const completion = document.createElement("label");
      completion.className = "evidence-completion";
      completion.innerHTML = `<input type="checkbox" ${value.length >= 3 && !suspicious ? "checked" : ""} onchange="FiduApp.toggleEvidenceCompletion('${module.code}','${id}',this.checked)"><span>Livrable terminé</span>`;
      actions.appendChild(completion);

      let warning = row.querySelector(".autonomy-warning");
      if (suspicious) {
        if (!warning) {
          warning = document.createElement("div");
          warning.className = "autonomy-warning";
          row.appendChild(warning);
        }
        warning.textContent = "Cette référence ressemble à une pièce source du dossier, pas au livrable à produire. Ouvrez le modèle correspondant et complétez votre propre document.";
      } else if (warning) warning.remove();
    });
  }

  APP.toggleEvidenceCompletion = function toggleEvidenceCompletion(code, evidenceId, checked) {
    const input = document.getElementById(`evidence-${evidenceId}`);
    if (!input) return;
    if (checked) {
      if (!input.value.trim() || suspiciousEvidence(code, input.value)) input.value = `Réalisé · ${today()}`;
    } else {
      input.value = "";
    }
    APP.saveArtifact(code);
  };

  function scoreFromLevel(level, maximum) {
    if (level === "expected") return maximum;
    if (level === "partial") return Math.round(maximum * 0.6);
    return 0;
  }

  function reviewRecommendation(module, progress) {
    const review = progress.practicalReview || {};
    const criticalAnswers = review.criticalAnswers || {};
    const criticalConcern = Object.values(criticalAnswers).some((value) => value === "yes" || value === "unsure");
    const weakLevel = Object.values(review.selfLevels || {}).some((value) => value === "missing");
    const quizConcern = Boolean(progress.lastQuizAttempt && (progress.lastQuizAttempt.criticalMissed || []).length);
    return criticalConcern || weakLevel || quizConcern || review.humanReviewRecommended === true;
  }

  function enhancePractical(module) {
    const section = document.querySelector(".practical-review");
    if (!section || !module.practicalReview) return;
    const progress = moduleProgress(module.code);
    const review = progress.practicalReview || {};
    const selfLevels = review.selfLevels || {};
    const criticalAnswers = review.criticalAnswers || {};
    const declaration = review.selfDeclaration === true;
    const passed = review.mode === "autonomy-self-check" && review.passed === true && review.artifactSignature === artifactSignature(module, progress);
    const humanReview = reviewRecommendation(module, progress);

    section.innerHTML = `<p class="kicker">Autocontrôle guidé</p><h2>Je vérifie mon propre dossier avant de continuer</h2>
      <div class="autonomy-note"><strong>Principe:</strong> la plateforme doit vous apprendre à vous relire. Une revue humaine n’est pas exigée à chaque module. Elle devient ciblée lorsqu’un point reste incertain, qu’une erreur critique apparaît ou qu’un vrai dossier engage une décision hors de votre périmètre.</div>
      <p>Pour chaque dimension, comparez vos livrables aux critères du cours. Le score est calculé automatiquement. Seuil: <strong>${module.practicalReview.threshold}/100</strong>; aucune erreur critique ni réponse «je ne sais pas» n’est admise.</p>
      <div class="autonomy-check-grid">${module.practicalReview.scoreItems.map((item) => `<div class="autonomy-check-card"><label for="auto-score-${item.id}">${escapeHtml(item.label)} · max ${item.max}</label><select id="auto-score-${item.id}"><option value="">Choisir</option><option value="expected" ${selfLevels[item.id] === "expected" ? "selected" : ""}>Conforme — le contrôle est complet</option><option value="partial" ${selfLevels[item.id] === "partial" ? "selected" : ""}>Partiel — à renforcer</option><option value="missing" ${selfLevels[item.id] === "missing" ? "selected" : ""}>Insuffisant — à reprendre</option></select></div>`).join("")}</div>
      <div class="autonomy-critical"><strong>Contrôles critiques</strong><p>Pour chacun, répondez honnêtement. «Je ne sais pas» est un signal de revue ciblée, pas un échec personnel.</p>${module.practicalReview.criticalChecks.map((item) => `<label><span>${escapeHtml(item.label)}</span><select id="auto-critical-${item.id}"><option value="">Choisir</option><option value="no" ${criticalAnswers[item.id] === "no" ? "selected" : ""}>Non — erreur absente</option><option value="yes" ${criticalAnswers[item.id] === "yes" ? "selected" : ""}>Oui — erreur présente</option><option value="unsure" ${criticalAnswers[item.id] === "unsure" ? "selected" : ""}>Je ne sais pas — vérifier</option></select></label>`).join("")}</div>
      <label class="autonomy-declaration"><input id="autoDeclaration" type="checkbox" ${declaration ? "checked" : ""}><span>J’ai relu les six livrables, comparé mes réponses aux critères du module et laissé visibles les points que je ne peux pas trancher seul.</span></label>
      <button class="btn btn-primary" type="button" onclick="FiduApp.saveAutonomyCheck('${module.code}')">Calculer et enregistrer mon autocontrôle</button>
      ${passed ? `<div class="autonomy-pass"><strong>Autocontrôle conforme · ${review.score}/100</strong><br>Le module est prêt pour la progression mensuelle sans revue humaine systématique.</div>` : ""}
      <div class="autonomy-targeted-review"><strong>Revue humaine ciblée: ${humanReview ? "recommandée" : "non requise à ce stade"}.</strong><br>À demander si une erreur critique subsiste, si une source officielle est ambiguë, si vous ne savez pas qualifier un fait, ou avant toute décision réelle qui dépasse le périmètre délégué.</div>`;
  }

  APP.saveAutonomyCheck = function saveAutonomyCheck(code) {
    const module = DATA.modules[code];
    if (!module || !module.practicalReview) return;
    const progress = readProgress();
    progress.modules = progress.modules || {};
    const current = Object.assign({}, progress.modules[code] || {});
    if (current.status !== "review_ready") {
      showToast("Validez d’abord le quiz, les six livrables et la note de travail.", true);
      return;
    }

    const selfLevels = {};
    const scores = {};
    let score = 0;
    for (const item of module.practicalReview.scoreItems) {
      const value = document.getElementById(`auto-score-${item.id}`)?.value || "";
      if (!value) { showToast("Renseignez toutes les dimensions de l’autocontrôle.", true); return; }
      selfLevels[item.id] = value;
      scores[item.id] = scoreFromLevel(value, item.max);
      score += scores[item.id];
    }

    const criticalAnswers = {};
    const criticalChecks = {};
    let criticalFailure = false;
    let unsure = false;
    for (const item of module.practicalReview.criticalChecks) {
      const value = document.getElementById(`auto-critical-${item.id}`)?.value || "";
      if (!value) { showToast("Renseignez tous les contrôles critiques.", true); return; }
      criticalAnswers[item.id] = value;
      criticalChecks[item.id] = value === "yes";
      if (value === "yes") criticalFailure = true;
      if (value === "unsure") unsure = true;
    }

    const declaration = Boolean(document.getElementById("autoDeclaration")?.checked);
    if (!declaration) { showToast("Confirmez la relecture de vos livrables avant de valider l’autocontrôle.", true); return; }

    const passed = score >= module.practicalReview.threshold && !criticalFailure && !unsure;
    const humanReviewRecommended = criticalFailure || unsure || score < module.practicalReview.threshold || Object.values(selfLevels).includes("missing");
    current.practicalReview = {
      scores,
      score,
      criticalChecks,
      criticalAnswers,
      selfLevels,
      selfDeclaration: declaration,
      reviewer: "Autocontrôle apprenant",
      date: today(),
      decision: passed ? "passed" : "extension",
      feedback: passed
        ? "Autocontrôle pédagogique effectué: critères comparés aux livrables, contrôles critiques vérifiés et points hors périmètre conservés visibles."
        : "Autocontrôle pédagogique à reprendre: au moins une dimension, une incertitude ou un contrôle critique nécessite une correction ou une vérification ciblée.",
      passed,
      mode: "autonomy-self-check",
      humanReviewRecommended,
      artifactSignature: artifactSignature(module, current),
      reviewedAt: new Date().toISOString()
    };
    current.updatedAt = today();
    progress.modules[code] = current;
    if (module.month && progress.months && progress.months[module.month] && progress.months[module.month].validatedAt) {
      progress.months[module.month].validatedAt = null;
      progress.months[module.month].validationSnapshot = null;
      progress.months[module.month].reviewer = Object.assign({}, progress.months[module.month].reviewer || {}, { decision: "" });
    }
    saveProgress(progress);
    APP.renderModule(code);
    scheduleEnhancement();
    showToast(passed ? `Autocontrôle conforme: ${score}/100. Revue humaine non requise à ce stade.` : `Autocontrôle ${score}/100: corrigez les points signalés avant de continuer.`, !passed);
  };

  const originalSubmitModule = APP.submitModule.bind(APP);
  APP.submitModule = function autonomySubmitModule(code) {
    const module = DATA.modules[code];
    const checkboxes = Array.from(document.querySelectorAll(".evidence-completion input[type='checkbox']"));
    if (module && module.evidenceItems && checkboxes.length === module.evidenceItems.length && checkboxes.some((box) => !box.checked)) {
      showToast("Terminez et cochez les six livrables. Il n’est plus nécessaire de choisir ou téléverser un fichier.", true);
      return;
    }
    originalSubmitModule(code);
    setTimeout(() => {
      scheduleEnhancement();
      const progress = moduleProgress(code);
      if (progress.status === "review_ready") showToast("Livrables enregistrés. Faites maintenant l’autocontrôle guidé; une revue humaine n’est requise qu’en cas de doute ou de point critique.");
    }, 0);
  };

  const originalMonthReview = APP.saveMonthReview.bind(APP);
  APP.saveMonthReview = function autonomyMonthReview(number) {
    const name = document.getElementById("reviewerName");
    const date = document.getElementById("reviewerDate");
    if (name) name.value = "AUTO";
    if (date && !date.value) date.value = today();
    originalMonthReview(number);
    setTimeout(scheduleEnhancement, 0);
  };

  function replaceLeadingText(label, text) {
    if (!label) return;
    const node = Array.from(label.childNodes).find((child) => child.nodeType === Node.TEXT_NODE && child.nodeValue.trim());
    if (node) node.nodeValue = text;
  }

  function enhanceValidationPanel(module) {
    const panel = document.querySelector(".validation-panel");
    if (!panel) return;
    const progress = moduleProgress(module.code);
    const review = progress.practicalReview || {};
    const selfPassed = review.mode === "autonomy-self-check" && review.passed === true && review.artifactSignature === artifactSignature(module, progress);
    const title = panel.querySelector("h2");
    if (selfPassed && title) title.textContent = "Validé en autonomie";
    const practiceRow = Array.from(panel.querySelectorAll(".readiness-list span")).find((row) => row.textContent.includes("Pratique"));
    if (practiceRow) practiceRow.firstChild.nodeValue = "Autocontrôle ";
    const button = panel.querySelector("button.btn-block");
    if (button) button.textContent = progress.status === "review_ready" ? "Mettre à jour mes livrables" : "Valider mes livrables";
    const fine = panel.querySelector("button + p.fine-print");
    if (fine) fine.textContent = "Progression autonome: quiz + six livrables + note de travail + autocontrôle guidé. La revue humaine devient ciblée, pas systématique.";
  }

  function enhanceMonth() {
    const panel = document.querySelector(".review-panel");
    if (!panel) return;
    panel.classList.add("autonomy-month");
    const h2 = panel.querySelector("h2");
    if (h2) h2.textContent = "Bilan d’autonomie mensuel";
    const kicker = panel.querySelector(".kicker");
    if (kicker) kicker.textContent = "Jalon mensuel";
    const trust = panel.querySelector(".reviewer-trust");
    if (trust) trust.innerHTML = "<strong>Validation pédagogique locale.</strong> Le responsable n’a pas à recontrôler chaque module. Une revue humaine est réservée aux points incertains, erreurs critiques, dossiers réels sensibles ou échantillonnages périodiques.";

    const name = document.getElementById("reviewerName");
    if (name) {
      name.value = "AUTO";
      const label = name.closest("label");
      if (label) label.style.display = "none";
    }
    const date = document.getElementById("reviewerDate");
    if (date) replaceLeadingText(date.closest("label"), "Date de clôture ");
    const decision = document.getElementById("reviewerDecision");
    if (decision) {
      const validated = decision.querySelector('option[value="validated"]');
      const extension = decision.querySelector('option[value="extension"]');
      if (validated) validated.textContent = "Mois terminé en autonomie";
      if (extension) extension.textContent = "Je prolonge ce mois";
      replaceLeadingText(decision.closest("label"), "Décision ");
    }
    const feedback = document.getElementById("reviewerFeedback");
    if (feedback) {
      replaceLeadingText(feedback.closest("label"), "Bilan personnel et points à escalader ");
      feedback.placeholder = "Ce que je maîtrise, erreurs corrigées, points encore incertains, situations qui nécessiteraient une revue humaine…";
    }
    const button = panel.querySelector("button.btn-block");
    if (button) button.textContent = "Clôturer le mois";

    if (!panel.querySelector(".autonomy-targeted-review")) {
      const info = document.createElement("div");
      info.className = "autonomy-targeted-review";
      info.innerHTML = "<strong>Quand demander une revue humaine?</strong><br>Erreur critique répétée · statut légal/TVA ambigu · pièce contradictoire · décision sur un vrai client hors périmètre · échantillonnage ponctuel décidé par le cabinet.";
      if (button) panel.insertBefore(info, button);
      else panel.appendChild(info);
    }

    document.querySelectorAll(".month-main h2").forEach((heading) => {
      if (heading.textContent.trim() === "Travaux supervisés") heading.textContent = "Mises en situation pratiques";
    });
    const monthScoreText = document.querySelector(".month-score span");
    if (monthScoreText && monthScoreText.textContent.includes("prêt pour revue")) monthScoreText.textContent = "progression du mois";
    panel.querySelectorAll(".fine-print").forEach((fine) => {
      if (fine.textContent.includes("validation est une trace locale") || fine.textContent.includes("Revue locale")) {
        fine.textContent = "Le jalon est une validation pédagogique locale. Une revue humaine peut être ajoutée par le cabinet, mais elle n’est pas un prérequis systématique à la progression.";
      }
    });
  }

  function enhanceHomeAndFooter() {
    const footer = document.querySelector(".footer p");
    if (footer) footer.textContent = "Outil pédagogique autonome: la plateforme guide la production, l’autocontrôle et l’escalade. Une revue humaine reste ciblée sur les incertitudes, risques critiques et décisions réelles hors périmètre.";
  }

  function enhanceCurrentPage() {
    const code = currentModuleCode();
    if (code && DATA.modules[code]) {
      enhanceEvidence(DATA.modules[code]);
      enhancePractical(DATA.modules[code]);
      enhanceValidationPanel(DATA.modules[code]);
    }
    enhanceMonth();
    enhanceHomeAndFooter();
  }

  let scheduled = false;
  function scheduleEnhancement() {
    if (scheduled) return;
    scheduled = true;
    queueMicrotask(() => {
      scheduled = false;
      enhanceCurrentPage();
    });
  }

  const appRoot = document.getElementById("app");
  if (appRoot && window.MutationObserver) new MutationObserver(scheduleEnhancement).observe(appRoot, { childList: true, subtree: true });
  window.addEventListener("hashchange", scheduleEnhancement);
  window.addEventListener("load", scheduleEnhancement);
  scheduleEnhancement();
})();
