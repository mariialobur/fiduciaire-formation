(function () {
  const DATA = window.FIDUCIAIRE_DATA;
  const ROADMAP = window.FIDUCIAIRE_ROADMAP;
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
    const match = String(location.hash || "").match(/^#\/?module\/([^/]+)/);
    return match ? DATA.modules[match[1]] : null;
  }

  function setText(element, value) {
    if (element && element.textContent !== value) element.textContent = value;
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
    if ((!hash || hash === "home") && document.title !== title) document.title = title;
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

  const app = document.getElementById("app");
  if (app && window.MutationObserver) {
    new MutationObserver(scheduleEnhancement).observe(app, { childList: true, subtree: true });
  }
  window.addEventListener("hashchange", scheduleEnhancement);
  window.addEventListener("load", scheduleEnhancement);
  scheduleEnhancement();

  window.FIDUCIAIRE_MATURITY = { maturity, enhanceRenderedPage };
})();
