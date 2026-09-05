(function () {
  const DATA = window.FIDUCIAIRE_DATA;
  const ROADMAP = window.FIDUCIAIRE_ROADMAP;
  const PROGRESS_KEY = "fiduciaire_formation_progress_v24";
  if (!DATA || !ROADMAP) return;

  // TC02 uses a transparent folder package rather than a binary ZIP.
  if (DATA.modules.TC02 && DATA.modules.TC02.contentVersion === "1.0") {
    DATA.modules.TC02.learnerPackage = {
      files: [
        { label: "Lire en premier", path: "ressources/tc02-apprenant-v1.0/00_LIRE_EN_PREMIER.md" },
        { label: "Cours TC02", path: "ressources/tc02-apprenant-v1.0/01_Cours_TC02.md" },
        { label: "Dossier simulé", path: "ressources/tc02-apprenant-v1.0/02_Dossier_simule_TC02.md" },
        { label: "Matrice des 12 flux", path: "ressources/tc02-apprenant-v1.0/03_Matrice_flux_TC02.csv" },
        { label: "Chronologie de reprise", path: "ressources/tc02-apprenant-v1.0/04_Chronologie_reprise_TC02.csv" },
        { label: "Journal de vérification", path: "ressources/tc02-apprenant-v1.0/05_Journal_verification_TC02.csv" },
        { label: "Fiche d’identité juridique", path: "ressources/tc02-apprenant-v1.0/06_Fiche_identite_juridique_TC02.csv" },
        { label: "Tableau de reprise", path: "ressources/tc02-apprenant-v1.0/07_Tableau_reprise_TC02.csv" },
        { label: "Note des points ouverts", path: "ressources/tc02-apprenant-v1.0/08_Note_points_ouverts_TC02.md" },
        { label: "Sources et version", path: "ressources/tc02-apprenant-v1.0/09_Sources_et_version.md" }
      ]
    };
  }

  const publishedStatuses = new Set(["core", "production", "pilot"]);
  const coreModules = () => ROADMAP.coreModules.map((code) => DATA.modules[code]).filter(Boolean);
  const maturity = () => {
    const modules = coreModules();
    const published = modules.filter((module) => publishedStatuses.has(module.status)).length;
    return { published, remaining: modules.length - published, total: modules.length };
  };

  function pluralModules(count) {
    return `${count} module${count > 1 ? "s" : ""} complet${count > 1 ? "s" : ""}`;
  }

  function currentModule() {
    const hashMatch = String(location.hash || "").match(/^#\/?module\/([^/]+)/);
    if (hashMatch && DATA.modules[hashMatch[1]]) return DATA.modules[hashMatch[1]];

    const kicker = document.querySelector(".article > .kicker")?.textContent || "";
    const domMatch = kicker.match(/\b(TC\d{2}|CAP12)\b/);
    if (domMatch && DATA.modules[domMatch[1]]) return DATA.modules[domMatch[1]];
    return null;
  }

  function setText(element, value) {
    if (element && element.textContent !== value) element.textContent = value;
  }

  function invalidatePersistedPracticalReview(code) {
    try {
      const raw = window.localStorage && localStorage.getItem(PROGRESS_KEY);
      if (!raw) return;
      const progress = JSON.parse(raw);
      const module = DATA.modules[code];
      const current = progress.modules && progress.modules[code];
      if (!module || !current) return;

      current.practicalReview = null;
      current.validatedAt = null;
      if (current.status === "validated") current.status = "review_ready";

      if (module.month && progress.months && progress.months[module.month]) {
        const monthProgress = progress.months[module.month];
        if (monthProgress.validatedAt) {
          monthProgress.validatedAt = null;
          monthProgress.validationSnapshot = null;
          monthProgress.reviewer = Object.assign({}, monthProgress.reviewer || {}, { decision: "" });
          const month = ROADMAP.months.find((item) => item.month === module.month);
          if (month) {
            month.modules.forEach((moduleCode) => {
              const item = progress.modules && progress.modules[moduleCode];
              if (!item) return;
              if (item.status === "validated") item.status = "review_ready";
              item.validatedAt = null;
            });
          }
        }
      }

      localStorage.setItem(PROGRESS_KEY, JSON.stringify(progress, null, 2));
    } catch (error) {
      // The core application will still reject the invalid review; this guard only removes stale trust.
    }
  }

  function installPracticalReviewTrustGuard() {
    if (!window.FiduApp || typeof window.FiduApp.savePracticalReview !== "function" || window.FiduApp.__practicalReviewTrustGuard) return;
    const original = window.FiduApp.savePracticalReview;

    window.FiduApp.savePracticalReview = function guardedSavePracticalReview(code) {
      const module = DATA.modules[code];
      if (module && module.practicalReview && document.getElementById("practicalDecision")?.value === "passed") {
        let score = 0;
        let completeScores = true;
        for (const item of module.practicalReview.scoreItems || []) {
          const rawValue = document.getElementById(`score-${item.id}`)?.value;
          const value = rawValue === "" || rawValue == null ? NaN : Number(rawValue);
          if (!Number.isFinite(value) || value < 0 || value > item.max) {
            completeScores = false;
            break;
          }
          score += value;
        }

        const criticalFailure = (module.practicalReview.criticalChecks || []).some(
          (item) => document.getElementById(`critical-${item.id}`)?.value === "yes"
        );

        if (completeScores && (score < module.practicalReview.threshold || criticalFailure)) {
          invalidatePersistedPracticalReview(code);
        }
      }
      return original(code);
    };

    window.FiduApp.__practicalReviewTrustGuard = true;
  }

  function enhanceRenderedPage() {
    const state = maturity();

    setText(
      document.querySelector(".public-trust span"),
      `${pluralModules(state.published)} sur ${state.total} · données stockées uniquement dans ce navigateur · validations locales non authentifiées`
    );

    setText(
      document.querySelector(".hero-home .hero-lead"),
      `Une architecture de douze mois en construction: ${pluralModules(state.published)} sont publiés; ${state.remaining} compétence${state.remaining > 1 ? "s" : ""} restent à développer au même standard avant que le parcours complet puisse être validé.`
    );

    const outcome = document.querySelectorAll(".outcome-strip > div");
    if (outcome.length >= 3) {
      setText(outcome[2].querySelector("strong"), String(state.published));
      setText(outcome[2].querySelector("span"), state.published === 1 ? "module cœur complet" : "modules cœur complets");
    }

    setText(
      document.querySelector(".footer p"),
      `${pluralModules(state.published)} sur ${state.total}. Outil pédagogique indépendant, sans authentification ni certification. Les sources officielles, le mandat, les procédures du cabinet et une revue conservée hors du site restent déterminants.`
    );

    const module = currentModule();
    if (module) {
      const packageActions = document.querySelector(".course-pack-actions");
      if (packageActions && module.learnerPackage && !module.learnerPackage.zip) {
        const zipButton = packageActions.querySelector("a.btn");
        if (zipButton) zipButton.remove();
        setText(
          document.querySelector(".course-pack > div > p:last-child"),
          "Les fichiers apprenant sont publiés séparément et restent téléchargeables individuellement. Aucun corrigé responsable n’est inclus."
        );
      }

      if (module.practicalReview) {
        setText(
          document.querySelector(".validation-panel button + p.fine-print"),
          `Quiz + preuves permettent la soumission. La revue pratique ${module.practicalReview.threshold}/100 sans erreur critique est ensuite obligatoire avant le jalon mensuel.`
        );
      }
    }

    const hash = String(location.hash || "#home").replace(/^#\/?/, "");
    const title = `Fiduciaire Formation · Pilote public ${state.published}/${state.total}`;
    if ((!hash || hash === "home") && !currentModule() && document.title !== title) document.title = title;
  }

  let scheduled = false;
  function scheduleEnhancement() {
    if (scheduled) return;
    scheduled = true;
    queueMicrotask(() => {
      scheduled = false;
      enhanceRenderedPage();
    });
  }

  installPracticalReviewTrustGuard();

  const app = document.getElementById("app");
  if (app && window.MutationObserver) {
    new MutationObserver(scheduleEnhancement).observe(app, { childList: true, subtree: true });
  }
  window.addEventListener("hashchange", scheduleEnhancement);
  window.addEventListener("load", scheduleEnhancement);
  scheduleEnhancement();

  window.FIDUCIAIRE_MATURITY = { maturity, enhanceRenderedPage };
})();
