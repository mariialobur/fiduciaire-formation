(function () {
  const DATA = window.FIDUCIAIRE_DATA;
  const APP = window.FiduApp;
  if (!DATA || !APP) return;

  const tc01 = DATA.modules && DATA.modules.TC01;
  if (tc01) {
    const purpose = {
      opening: "Synthétiser les faits minimums avant de commencer: entité, pouvoirs, mandat, accès, délais et pièces manquantes.",
      calendar: "Séparer l’échéance légale, la date client et votre marge interne afin de ne pas travailler sur une date supposée.",
      outscope: "Garder une trace des demandes qui ne sont pas clairement prévues au mandat afin d’éviter une extension tacite du périmètre.",
      decision: "Résumer en une page ce qui est confirmé, ce qui manque et si le dossier peut avancer: GO, GO sous conditions ou NO-GO.",
      client_email: "Transformer les points manquants en une demande client claire sans exposer inutilement toute l’analyse interne."
    };
    const labels = {
      opening: "Fiche d’ouverture du dossier",
      calendar: "Calendrier des obligations et dépendances",
      outscope: "Registre des demandes hors mandat",
      decision: "Note de décision — GO / GO sous conditions / NO-GO",
      client_email: "E-mail client de demande et clarification"
    };
    const templates = {
      opening: "ressources/tc01-apprenant-v1.4/07_Fiche_ouverture_TC01.xlsx",
      calendar: "ressources/tc01-apprenant-v1.4/08_Calendrier_TC01.xlsx",
      outscope: "ressources/tc01-apprenant-v1.4/09_Registre_hors_mandat_TC01.xlsx",
      decision: "ressources/tc01-apprenant-v1.4/10_Note_decision_TC01.txt",
      client_email: "ressources/tc01-apprenant-v1.4/11_Email_client_TC01.txt"
    };

    tc01.evidenceItems = (tc01.evidenceItems || [])
      .filter((item) => item.id !== "verification_log")
      .map((item) => Object.assign({}, item, {
        label: labels[item.id] || item.label,
        help: purpose[item.id] || "",
        templatePath: templates[item.id] || item.templatePath
      }));

    tc01.artifactHtml = `<div class="artifact-template"><strong>5 livrables utiles — pas de double saisie</strong><p>Fiche d’ouverture · calendrier · registre hors mandat · note de décision · e-mail client.</p><p class="small">Chaque contrôle est documenté directement dans le livrable où il sert à la décision. Le journal de vérification séparé est supprimé: il ne faut pas recopier deux fois la même information.</p><p><a href="ressources/tc01-apprenant-v1.4/15_Guide_des_livrables_TC01.html" target="_blank" rel="noopener noreferrer">Pourquoi ces 5 documents? →</a></p></div>`;

    tc01.reviewRubric = (tc01.reviewRubric || []).map((item) =>
      String(item).replace("Première version, correction, communication client et journal de vérification traçables", "Première version, correction et communication client traçables sans double saisie")
    );

    const replacements = new Map([
      ["ressources/tc01-apprenant-v1.4/04_Fiche_Zefix_reel_Nestle.csv", { label: "Fiche Excel — Zefix réel", path: "ressources/tc01-apprenant-v1.4/04_Fiche_Zefix_reel_Nestle.xlsx" }],
      ["ressources/tc01-apprenant-v1.4/07_Fiche_ouverture_TC01.csv", { label: "Fiche d’ouverture Excel", path: "ressources/tc01-apprenant-v1.4/07_Fiche_ouverture_TC01.xlsx" }],
      ["ressources/tc01-apprenant-v1.4/08_Calendrier_TC01.csv", { label: "Calendrier Excel", path: "ressources/tc01-apprenant-v1.4/08_Calendrier_TC01.xlsx" }],
      ["ressources/tc01-apprenant-v1.4/09_Registre_hors_mandat_TC01.csv", { label: "Registre hors mandat Excel", path: "ressources/tc01-apprenant-v1.4/09_Registre_hors_mandat_TC01.xlsx" }],
      ["ressources/tc01-apprenant-v1.4/14_Fiche_IDE_TVA_reel.csv", { label: "Fiche Excel — contrôle IDE / TVA", path: "ressources/tc01-apprenant-v1.4/14_Fiche_IDE_TVA_reel.xlsx" }]
    ]);
    const activeFiles = [];
    for (const file of (tc01.learnerPackage?.files || [])) {
      if (file.path === "ressources/tc01-apprenant-v1.4/12_Journal_verification_TC01.csv") continue;
      activeFiles.push(replacements.get(file.path) || file);
    }
    const ensureFiles = [
      { label: "Guide des 5 livrables — à quoi ça sert?", path: "ressources/tc01-apprenant-v1.4/15_Guide_des_livrables_TC01.html" },
      { label: "Glossaire fiduciaire débutant", path: "ressources/Glossaire_fiduciaire_debutant.html" },
      { label: "Fiche Excel — contrôle IDE / TVA", path: "ressources/tc01-apprenant-v1.4/14_Fiche_IDE_TVA_reel.xlsx" }
    ];
    ensureFiles.forEach((file) => {
      if (!activeFiles.some((current) => current.path === file.path)) activeFiles.push(file);
    });
    tc01.learnerPackage = Object.assign({}, tc01.learnerPackage || {}, { files: activeFiles });
  }

  const css = document.createElement("style");
  css.textContent = `
    .term-help{position:relative;display:inline-flex;align-items:center;justify-content:center;width:19px;height:19px;margin-left:7px;border-radius:50%;background:#e5f3f1;color:#0d6f69;font-size:12px;font-weight:800;cursor:help;vertical-align:middle}
    .term-help:hover::after,.term-help:focus::after{content:attr(data-tip);position:absolute;z-index:50;left:0;bottom:calc(100% + 8px);width:min(360px,75vw);padding:11px 13px;border-radius:10px;background:#102f3c;color:#fff;font-size:.88rem;font-weight:400;line-height:1.42;box-shadow:0 10px 28px rgba(0,0,0,.2)}
    .term-help:focus{outline:2px solid #0d6f69;outline-offset:2px}
    .evidence-purpose{margin:7px 0 0;color:#60747b;font-size:.9rem;line-height:1.45}
    .beginner-glossary-link{font-weight:700}
    .beginner-pack-note{background:#edf7f1;border-left:4px solid #2e7957;border-radius:9px;padding:11px 13px;margin:10px 0 0;color:#183744;font-size:.92rem}
  `;
  document.head.appendChild(css);

  function assetPath(path) {
    return document.body && document.body.dataset.level === "sub" ? `../${path}` : path;
  }

  function toast(message, isError) {
    let node = document.getElementById("appToast");
    if (!node) {
      node = document.createElement("div");
      node.id = "appToast";
      document.body.appendChild(node);
    }
    node.setAttribute("role", isError ? "alert" : "status");
    node.textContent = message;
    node.className = `app-toast is-visible ${isError ? "is-error" : ""}`;
    clearTimeout(toast.timer);
    toast.timer = setTimeout(() => { node.className = "app-toast"; }, 3600);
  }

  function enhanceNavigation() {
    const nav = document.querySelector(".nav-actions");
    if (!nav) return;
    Array.from(nav.querySelectorAll("button.nav-link")).forEach((button) => {
      if (["Importer", "Exporter"].includes(button.textContent.trim())) button.remove();
    });
    const importInput = nav.querySelector("#progressImport");
    if (importInput) importInput.remove();
    if (!nav.querySelector(".beginner-glossary-link")) {
      const link = document.createElement("a");
      link.className = "nav-link beginner-glossary-link";
      link.href = assetPath("ressources/Glossaire_fiduciaire_debutant.html");
      link.target = "_blank";
      link.rel = "noopener noreferrer";
      link.textContent = "Glossaire";
      const library = Array.from(nav.querySelectorAll("a.nav-link")).find((item) => item.textContent.trim() === "Bibliothèque");
      nav.insertBefore(link, library || null);
    }
  }

  function enhanceEvidenceHelp() {
    const code = String(location.hash || "").match(/^#\/?module\/([^/]+)/)?.[1];
    const module = code && DATA.modules[code];
    if (!module || !module.evidenceItems) return;
    document.querySelectorAll(".evidence-row").forEach((row) => {
      const input = row.querySelector("input[data-evidence-id]");
      if (!input) return;
      const item = module.evidenceItems.find((entry) => entry.id === input.dataset.evidenceId);
      if (!item) return;
      const label = input.closest("label");
      if (label && item.help && !label.querySelector(".term-help")) {
        const help = document.createElement("span");
        help.className = "term-help";
        help.tabIndex = 0;
        help.textContent = "?";
        help.dataset.tip = item.help;
        label.insertBefore(help, input);
      }
      if (item.help && !row.querySelector(".evidence-purpose")) {
        const purpose = document.createElement("p");
        purpose.className = "evidence-purpose";
        purpose.innerHTML = `<strong>À quoi ça sert?</strong> ${item.help}`;
        const actions = row.querySelector(".evidence-autonomy-actions");
        row.insertBefore(purpose, actions || null);
      }
    });
  }

  function enhancePack() {
    const pack = document.querySelector(".course-pack");
    if (!pack) return;
    const intro = pack.querySelector(":scope > div:first-child");
    if (intro && !intro.querySelector(".beginner-pack-note")) {
      const note = document.createElement("p");
      note.className = "beginner-pack-note";
      note.textContent = "Débutant? Commencez par «Lire en premier», puis utilisez le guide des livrables et le glossaire dès qu’un terme ou un document n’est pas clair.";
      intro.appendChild(note);
    }
  }

  function replaceOldCounts() {
    document.querySelectorAll(".autonomy-declaration span, .validation-panel .fine-print, #practicalReview p, .autonomy-note").forEach((node) => {
      if (node.textContent.includes("six livrables")) node.textContent = node.textContent.replace(/six livrables/gi, "mes livrables");
      if (node.textContent.includes("6 livrables")) node.textContent = node.textContent.replace(/6 livrables/gi, "5 livrables");
    });
  }

  function enhanceCurrentPage() {
    enhanceNavigation();
    enhanceEvidenceHelp();
    enhancePack();
    replaceOldCounts();
  }

  const previousSubmit = APP.submitModule.bind(APP);
  APP.submitModule = function beginnerSubmitModule(code) {
    const module = DATA.modules[code];
    const boxes = Array.from(document.querySelectorAll(".evidence-completion input[type='checkbox']"));
    if (module?.evidenceItems && boxes.length === module.evidenceItems.length && boxes.some((box) => !box.checked)) {
      toast(`Terminez et cochez les ${module.evidenceItems.length} livrables. Aucun fichier n’est téléversé vers la plateforme.`, true);
      return;
    }
    return previousSubmit(code);
  };

  if (typeof APP.saveAutonomyCheck === "function") {
    const previousAutonomy = APP.saveAutonomyCheck.bind(APP);
    APP.saveAutonomyCheck = function beginnerAutonomyCheck(code) {
      const raw = localStorage.getItem("fiduciaire_formation_progress_v24");
      let progress = {};
      try { progress = raw ? JSON.parse(raw) : {}; } catch (error) { /* no-op */ }
      const module = DATA.modules[code];
      if (module && progress.modules?.[code]?.status !== "review_ready") {
        toast(`Validez d’abord le quiz, les ${module.evidenceItems?.length || ""} livrables et la note de travail.`, true);
        return;
      }
      return previousAutonomy(code);
    };
  }

  let scheduled = false;
  function schedule() {
    if (scheduled) return;
    scheduled = true;
    queueMicrotask(() => { scheduled = false; enhanceCurrentPage(); });
  }
  const root = document.getElementById("app");
  if (root && window.MutationObserver) new MutationObserver(schedule).observe(root, { childList: true, subtree: true });
  window.addEventListener("hashchange", schedule);
  window.addEventListener("load", schedule);
  schedule();

  window.FIDUCIAIRE_BEGINNER_UX = { version: "1.0", glossary: "ressources/Glossaire_fiduciaire_debutant.html" };
})();