(function () {
  const DATA = window.FIDUCIAIRE_DATA;
  if (!DATA || !DATA.modules || !DATA.modules.TC01) {
    throw new Error("TC01 v1.4 doit être chargé après roadmap-data.js");
  }

  const module = DATA.modules.TC01;

  module.contentVersion = "1.4";
  module.pedagogicalStatus = "Paquet pédagogique v1.4 · module étalon · exercice Zefix réel séparé du cas fictif · approche action d’abord, source ensuite";

  // Le paquet actif TC01 v1.4 ne renvoie plus vers l'ancien ZIP v1.3.
  // Les documents binaires historiques restent accessibles individuellement lorsqu'ils sont encore utiles,
  // mais les consignes corrigées et l'exercice Zefix réel sont versionnés ici.
  module.learnerPackage = {
    files: [
      { label: "Lire en premier — TC01 v1.4", path: "ressources/tc01-apprenant-v1.4/00_LIRE_EN_PREMIER.txt" },
      { label: "Exercice réel Zefix — Nestlé S.A.", path: "ressources/tc01-apprenant-v1.4/01_Exercice_Zefix_reel_Nestle.html" },
      { label: "Fiche à compléter — Zefix réel", path: "ressources/tc01-apprenant-v1.4/04_Fiche_Zefix_reel_Nestle.csv" },
      { label: "Mode d’emploi du cas simulé", path: "ressources/tc01-apprenant-v1.4/02_Mode_emploi_cas_simule.html" },
      { label: "B — Extrait RC ancien corrigé v1.4", path: "ressources/tc01-apprenant-v1.4/03_B_Extrait_RC_ancien_corrige.html" },
      { label: "Cours TC01 historique", path: "ressources/tc01-apprenant-v1.3/01_Cours_TC01.docx" },
      { label: "Dossier apprenant historique", path: "ressources/tc01-apprenant-v1.3/02_Dossier_apprenant_TC01.docx" },
      { label: "Outils TC01 apprenant", path: "ressources/tc01-apprenant-v1.3/04_Outils_TC01_apprenant.xlsx" },
      { label: "A — Fiche client simulée", path: "ressources/tc01-apprenant-v1.3/Dossier_simule/01_Remise_initiale/A_Fiche_client.pdf" },
      { label: "C — Mandat signé simulé", path: "ressources/tc01-apprenant-v1.3/Dossier_simule/01_Remise_initiale/C_Mandat_signe.pdf" },
      { label: "D — E-mail de Marc simulé", path: "ressources/tc01-apprenant-v1.3/Dossier_simule/01_Remise_initiale/D_Email_Marc.pdf" },
      { label: "E — Inventaire des pièces", path: "ressources/tc01-apprenant-v1.3/Dossier_simule/01_Remise_initiale/E_Inventaire_pieces.xlsx" },
      { label: "F — Extrait RC actuel simulé", path: "ressources/tc01-apprenant-v1.3/Dossier_simule/02_Remise_apres_relance/F_Extrait_RC_actuel.pdf" },
      { label: "G — Extrait IDE / TVA simulé", path: "ressources/tc01-apprenant-v1.3/Dossier_simule/02_Remise_apres_relance/G_Extrait_IDE_TVA.pdf" },
      { label: "H — Délégation interne simulée", path: "ressources/tc01-apprenant-v1.3/Dossier_simule/02_Remise_apres_relance/H_Delegation_interne.pdf" },
      { label: "I — Simulation ePortal TVA", path: "ressources/tc01-apprenant-v1.3/Dossier_simule/02_Remise_apres_relance/I_Simulation_ePortal_TVA.pdf" },
      { label: "J — Calendrier source", path: "ressources/tc01-apprenant-v1.3/Dossier_simule/02_Remise_apres_relance/J_Calendrier_source.xlsx" },
      { label: "Journal de vérification v1.4", path: "ressources/tc01-v1.4-complement/Journal_verification_TC01_v1.4.csv" }
    ]
  };

  module.sections.splice(1, 0, {
    title: "Zefix: apprendre sur une entreprise réelle, décider sur le cas simulé",
    type: "decision",
    bodyHtml: `<p>TC01 sépare désormais explicitement deux exercices. Pour apprendre l’outil public <strong>Zefix</strong>, l’apprenant effectue une vraie recherche sur <strong>Nestlé S.A.</strong> et relève les informations visibles le jour de la consultation. Pour le dossier métier, <strong>Léman Atelier Sàrl reste entièrement fictive</strong>: elle ne doit jamais être recherchée dans Zefix, IDE ou ePortal réel.</p><div class="callout"><strong>Pourquoi cette séparation?</strong><p>Un exercice de registre doit apprendre à naviguer dans un vrai outil et à reconnaître une entité juridique réelle. Un cas pédagogique doit au contraire rester stable et contrôlé. Mélanger les deux produit de fausses contradictions avec des entreprises réellement inscrites.</p></div><p><a href="ressources/tc01-apprenant-v1.4/01_Exercice_Zefix_reel_Nestle.html" target="_blank" rel="noopener noreferrer">Ouvrir l’exercice réel Zefix — Nestlé S.A. →</a></p>`
  });

  // Le quiz doit mesurer la décision professionnelle, pas la mémorisation d'un numéro d'article.
  module.quiz[1] = {
    q: "Marc demande d’ajouter la paie au travail prévu. Où faut-il vérifier en premier si cette prestation fait partie de l’intervention du cabinet?",
    choices: [
      "Dans la dernière version signée du mandat et ses éventuels avenants",
      "Dans l’extrait du registre du commerce",
      "Dans le dernier relevé bancaire",
      "Dans le décompte AVS de l’année précédente"
    ],
    answer: 0,
    explain: "Le premier contrôle est opérationnel: confronter la demande au mandat signé et à ses modifications. Le CO fournit le cadre juridique, mais le junior doit d’abord savoir où trouver la règle applicable au dossier.",
    id: "Q02",
    domain: "Lecture du mandat"
  };

  module.quiz[5] = {
    q: "Quelle organisation permet de conserver des pièces comptables de manière défendable et reprenable par un autre collaborateur?",
    choices: [
      "Conserver uniquement les PDF finaux tant que le logiciel reste actif",
      "Définir durée, formats, intégrité, lisibilité, accès, sauvegarde et restitution dans une piste documentée",
      "Imprimer toutes les pièces et supprimer les fichiers sources",
      "Laisser chaque collaborateur choisir son espace de stockage"
    ],
    answer: 1,
    explain: "Le réflexe attendu est une conservation organisée, lisible, disponible et contrôlable. Les bases CO/Olico servent ensuite à justifier et vérifier ce dispositif.",
    id: "Q06",
    domain: "Organisation du dossier"
  };

  module.quiz[8] = {
    q: "Un collègue a inscrit le 31 août 2026 comme échéance TVA du cas. Quel contrôle est le plus professionnel avant de reprendre cette date dans le dossier?",
    choices: [
      "Vérifier la période concernée, la règle de délai et la source officielle, puis conserver la trace du contrôle",
      "La recopier car elle figure déjà dans le calendrier",
      "Demander uniquement au client si la date lui convient",
      "Remplacer l’échéance légale par la date interne de revue"
    ],
    answer: 0,
    explain: "TC01 ne demande pas de mémoriser un calcul isolé. Le réflexe est de vérifier la période, la règle applicable et la source, puis de distinguer échéance légale, engagement client et marge interne.",
    id: "Q09",
    domain: "Calendrier et source"
  };

  module.evidenceItems = [
    { id: "opening", label: "Fiche d’ouverture complétée" },
    { id: "calendar", label: "Calendrier des obligations et dépendances" },
    { id: "outscope", label: "Registre des demandes hors mandat" },
    { id: "decision", label: "Note GO / GO sous conditions / NO-GO" },
    { id: "client_email", label: "E-mail client de demande et clarification" },
    { id: "verification_log", label: "Journal de vérification des sources et contrôles" }
  ];

  module.artifactHtml = `<div class="artifact-template"><strong>Six livrables obligatoires</strong><p>Fiche d’ouverture · calendrier · registre hors mandat · note de décision · e-mail client · journal de vérification.</p><p class="small">Le journal de vérification remplace la feuille de réponses au quiz. Il indique au minimum: contrôle effectué, source consultée, date, résultat et point à escalader. L’exercice réel Zefix sur Nestlé S.A. peut être consigné comme exercice outil, mais ses données ne doivent jamais être utilisées comme preuve du cas Léman Atelier Sàrl.</p></div>`;

  module.reviewRubric = [
    "Entité, pouvoirs, mandat et délégation recoupés avec source et date",
    "Périmètre et exclusions qualifiés sans extension silencieuse",
    "Calendrier professionnel: échéance légale, engagement client et marge interne distingués",
    "Données, accès et paiements traités selon les seuils d’escalade",
    "Première version, correction, communication client et journal de vérification traçables"
  ];

  const legalIndex = module.sections.findIndex((section) => section.title === "Cadre juridique utile au junior");
  if (legalIndex >= 0) {
    module.sections[legalIndex] = {
      title: "Réflexes professionnels et sources utiles",
      type: "decision",
      bodyHtml: `<p>Le junior n’a pas à réciter le droit. Il doit reconnaître le contrôle à effectuer, agir dans son périmètre et savoir quelle source officielle permet de confirmer une règle avant une décision engageante.</p><div class="table-scroll"><table class="learning-table"><thead><tr><th>Situation</th><th>Réflexe opérationnel</th><th>Source à consulter si nécessaire</th></tr></thead><tbody>
        <tr><td>Le client demande une prestation</td><td>Vérifier mandat, version, exclusions, approbations et éventuel avenant.</td><td>Mandat; CO 394 ss pour le cadre du mandat.</td></tr>
        <tr><td>Il faut identifier qui peut instruire ou signer</td><td>Recouper RC actuel, délégation et règles internes; ne jamais déduire un pouvoir général d’un simple e-mail.</td><td>Zefix; CO 716a/810 selon la forme; documents de délégation.</td></tr>
        <tr><td>Des pièces doivent être conservées ou partagées</td><td>Définir accès, intégrité, lisibilité, durée, restitution et canal autorisé.</td><td>CO 957 ss; Olico; LPD.</td></tr>
        <tr><td>Une donnée personnelle ou un accès cloud est en jeu</td><td>Limiter la collecte au besoin réel, vérifier destinataire, rôles, sous-traitance et sécurité.</td><td>LPD; recommandations PFPDT.</td></tr>
        <tr><td>Le cabinet envisage d’exécuter des paiements pour des tiers</td><td>Suspendre l’acceptation et transmettre les faits à la personne compétente avant toute création d’accès ou exécution.</td><td>Mandat, politique interne, LBA/OBA et pratique FINMA selon l’activité concrète.</td></tr>
        <tr><td>Une échéance TVA doit être planifiée</td><td>Vérifier période et source, puis séparer date légale, engagement client et marge interne.</td><td>LTVA, AFC/ePortal et règles de calcul de délai applicables.</td></tr>
      </tbody></table></div><div class="callout"><strong>Règle de travail</strong><p>Action d’abord, source ensuite: identifier le bon contrôle, documenter le résultat, puis ouvrir la base légale lorsque la décision, la période ou le risque l’exige.</p></div>`
    };
  }

  const calendarIndex = module.sections.findIndex((section) => section.title === "Calendrier du cas TVA");
  if (calendarIndex >= 0) {
    module.sections[calendarIndex] = {
      title: "Calendrier du cas TVA — exemple guidé",
      type: "case-study",
      bodyHtml: `<p>Dans le dossier simulé, la date de référence est le 09.07.2026. Pour le T2 2026 clos le 30 juin, le calendrier source du cas retient le <strong>31 août 2026</strong> comme échéance légale après contrôle de la règle applicable.</p><p>L’objectif de TC01 n’est pas de mémoriser ce calcul. Le résultat professionnel attendu est de savoir vérifier une date dans une source valable pour la période et de la distinguer de la date souhaitée par le client, de la remise des pièces, de la revue interne et du dépôt effectif.</p>`
    };
  }

  const frequentErrors = module.sections.find((section) => section.title === "Erreurs fréquentes");
  if (frequentErrors && !String(frequentErrors.bodyHtml).includes("numéro d’article")) {
    frequentErrors.bodyHtml += `<div class="callout"><strong>À éviter en formation</strong><p>Réciter un numéro d’article sans savoir quel contrôle effectuer n’est pas une compétence. Une réponse professionnelle doit relier fait, action, source et décision.</p></div>`;
  }
  if (frequentErrors && !String(frequentErrors.bodyHtml).includes("société fictive")) {
    frequentErrors.bodyHtml += `<div class="callout"><strong>Registre réel ≠ cas fictif</strong><p>Ne jamais forcer une société fictive dans un registre réel. Utiliser un exercice outil séparé sur une entité réelle connue, puis revenir aux extraits simulés du cas pédagogique.</p></div>`;
  }

  module.sections.push({
    title: "Repères de notation de la revue pratique",
    type: "decision",
    bodyHtml: `<p>Le score pratique doit rester comparable d’un responsable à l’autre. Pour chaque critère, utiliser les repères suivants avant d’attribuer les points prévus dans la grille.</p><div class="dimension-grid">
      <div><strong>0 · Insuffisant</strong><span>Contrôle absent, conclusion non défendable ou erreur qui expose le dossier.</span></div>
      <div><strong>1 · Partiel</strong><span>Bonne direction mais contrôle incomplet, preuve faible ou dépendance importante au responsable.</span></div>
      <div><strong>2 · Attendu</strong><span>Travail correct, documenté, reproductible et escalade au bon moment.</span></div>
      <div><strong>3 · Très bon</strong><span>Travail clair et efficient, risques hiérarchisés, communication exploitable et piste de preuve immédiatement révisable.</span></div>
    </div><p class="small">Les points maximum de chaque critère restent inchangés. Ces quatre niveaux servent d’ancrage qualitatif; ils ne remplacent ni les quatre contrôles critiques ni le seuil global de 80/100.</p>`
  });

  module.practicalReview = Object.assign({}, module.practicalReview, {
    anchorGuidance: {
      insufficient: "Contrôle absent, conclusion non défendable ou erreur exposant le dossier.",
      partial: "Bonne direction mais contrôle incomplet, preuve faible ou dépendance importante au responsable.",
      expected: "Travail correct, documenté, reproductible et escalade au bon moment.",
      strong: "Travail clair et efficient, risques hiérarchisés, communication exploitable et piste de preuve immédiatement révisable."
    }
  });

  module.masterStandard = {
    version: "1.4",
    principle: "Décision professionnelle observable avant mémorisation juridique",
    reusableFor: ["TC02", "TC03", "TC04"],
    requiredComponents: [
      "résultat professionnel attendu",
      "dossier métier progressif",
      "méthode de travail",
      "sources datées",
      "livrable réel",
      "quiz décisionnel",
      "revue pratique ancrée",
      "contrôles critiques",
      "trace de correction"
    ]
  };
})();
