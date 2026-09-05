(function () {
  const DATA = window.FIDUCIAIRE_DATA;
  if (!DATA || !DATA.modules || !DATA.modules.TC02) {
    throw new Error("TC02 v1.0 doit être chargé après roadmap-data.js");
  }

  const module = DATA.modules.TC02;
  const sources = DATA.sourcesRegistry.sources;

  sources.TC02_SECO_FORMS = {
    sourceName: "SECO / Portail PME — comparaison des formes juridiques",
    url: "https://www.kmu.admin.ch/fr/choisir-une-forme-juridique-adapter-la-structure-juridique-a-ses-besoins",
    lastChecked: "2026-09-05",
    usedIn: ["TC02"],
    reviewFrequency: "before-use"
  };
  sources.TC02_SECO_EI = {
    sourceName: "SECO / Portail PME — forme juridique: entreprise individuelle",
    url: "https://www.kmu.admin.ch/fr/forme-juridique-lentreprise-individuelle",
    lastChecked: "2026-09-05",
    usedIn: ["TC02"],
    reviewFrequency: "before-use"
  };
  sources.TC02_SECO_SARL = {
    sourceName: "SECO / Portail PME — forme juridique: Sàrl",
    url: "https://www.kmu.admin.ch/fr/forme-juridique-societe-a-responsabilite-limitee-sarl",
    lastChecked: "2026-09-05",
    usedIn: ["TC02"],
    reviewFrequency: "before-use"
  };
  sources.TC02_SECO_SA = {
    sourceName: "SECO / Portail PME — forme juridique: SA",
    url: "https://www.kmu.admin.ch/fr/forme-juridique-la-societe-anonyme-sa-bases-legales",
    lastChecked: "2026-09-05",
    usedIn: ["TC02"],
    reviewFrequency: "before-use"
  };
  sources.TC02_CO = {
    sourceName: "Code des obligations suisse — sociétés et comptabilité",
    url: "https://www.fedlex.admin.ch/eli/cc/27/317_321_377/fr",
    lastChecked: "2026-09-05",
    usedIn: ["TC02"],
    reviewFrequency: "before-use",
    articles: "620 ss, 643, 772 ss, 779, 957 ss"
  };
  sources.TC02_ZEFIX = {
    sourceName: "Zefix — Index central des raisons de commerce",
    url: "https://www.zefix.admin.ch",
    lastChecked: "2026-09-05",
    usedIn: ["TC02"],
    reviewFrequency: "per-file"
  };

  module.status = "core";
  module.contentVersion = "1.0";
  module.duration = "3 h guidées + 3 h de pratique + revue";
  module.critical = false;
  module.quizThresholdCount = 10;
  module.criticalQuestionIds = ["Q03", "Q08"];
  module.pedagogicalStatus = "Paquet pédagogique v1.0 · module cœur publié · formes juridiques et séparation des patrimoines";
  module.objective = "Identifier le bon sujet comptable, séparer les patrimoines et qualifier les flux du propriétaire avant toute écriture lors d’une activité individuelle, d’une Sàrl ou d’une transition entre les deux.";
  module.ruAid = "<strong>Réflexe cabinet:</strong> avant de choisir un compte, répondre à trois questions: qui est juridiquement concerné, à quelle date, et quelle pièce prouve le transfert ou la nature du flux?";

  module.sections = [
    {
      title: "Résultat professionnel attendu",
      type: "decision",
      bodyHtml: `<p>À l’issue de TC02, l’assistant·e ne tranche pas seul les conséquences fiscales complexes d’une restructuration. La compétence démontrée consiste à identifier le sujet comptable correct, dater la rupture entre deux patrimoines, classer les flux du propriétaire et rendre visibles les opérations qui nécessitent une reprise, une pièce ou une validation spécialisée.</p><ul class="check-list"><li>Distinguer entreprise individuelle et personne morale avant toute saisie.</li><li>Identifier la date à partir de laquelle une Sàrl ou une SA existe comme sujet juridique distinct.</li><li>Ne jamais transformer silencieusement une dépense privée en charge de société.</li><li>Qualifier salaire, remboursement de frais, apport, prélèvement, prêt/compte courant et distribution selon les pièces disponibles.</li><li>Documenter les opérations antérieures à la constitution au lieu de les reprendre automatiquement.</li></ul>`
    },
    {
      title: "Le premier contrôle: qui est le sujet comptable?",
      bodyHtml: `<div class="table-scroll"><table class="learning-table"><thead><tr><th>Forme</th><th>Réflexe à retenir</th><th>Conséquence pratique</th></tr></thead><tbody>
        <tr><td>Entreprise individuelle</td><td>L’activité est directement liée à la personne physique propriétaire.</td><td>Un flux privé n’est pas une charge professionnelle par simple passage sur le compte utilisé pour l’activité; il faut distinguer charge, apport et prélèvement privé.</td></tr>
        <tr><td>Sàrl</td><td>La société est une personne morale distincte, créée avec son inscription au registre du commerce.</td><td>Le patrimoine de la société et celui de l’associé sont séparés; les flux entre eux doivent être qualifiés et documentés.</td></tr>
        <tr><td>SA</td><td>La société est une personne morale distincte, créée avec son inscription au registre du commerce.</td><td>Les fonds de la société ne sont pas les fonds privés de l’actionnaire; salaire, frais, prêt et distribution suivent des circuits distincts.</td></tr>
        <tr><td>Association / fondation</td><td>Le but, les organes et les règles propres de l’entité déterminent l’utilisation des fonds.</td><td>Ne jamais raisonner comme s’il existait un «compte privé du propriétaire»; les sorties doivent avoir un fondement dans l’activité et la gouvernance.</td></tr>
      </tbody></table></div><div class="callout"><strong>Question avant l’écriture</strong><p>«À qui appartient économiquement et juridiquement cette opération à cette date?» Le numéro de compte vient après cette réponse.</p></div>`
    },
    {
      title: "Passage entreprise individuelle → Sàrl: construire une date de coupure",
      type: "case-study",
      bodyHtml: `<p>Le dossier simulé concerne <strong>Atelier Horizon</strong>. Jusqu’au 30 avril, Léa exploite une entreprise individuelle. <strong>Atelier Horizon Sàrl</strong> est inscrite au registre du commerce le 1er mai. Pendant six semaines, les mêmes cartes et le même compte bancaire sont encore utilisés, certaines factures portent l’ancien nom et plusieurs achats ont été effectués avant l’inscription.</p><p>Le travail n’est pas de «tout mettre dans la Sàrl». Il faut créer une chronologie: date de l’opération, titulaire du compte, destinataire de la facture, bénéficiaire réel, document de reprise ou de remboursement et décision attendue.</p><ol class="check-list"><li>Confirmer date d’existence et identité de la nouvelle personne morale.</li><li>Identifier les soldes, actifs, dettes et contrats qui existaient avant la coupure.</li><li>Repérer les encaissements/paiements postérieurs provenant encore de l’ancien compte.</li><li>Distinguer opération ancienne réglée tardivement et opération réellement née dans la Sàrl.</li><li>Créer une liste des éléments à transférer, rembourser, laisser hors société ou escalader.</li></ol>`
    },
    {
      title: "Flux du propriétaire: ne pas utiliser un seul compte fourre-tout",
      bodyHtml: `<div class="table-scroll"><table class="learning-table"><thead><tr><th>Flux observé</th><th>Entreprise individuelle</th><th>Sàrl / SA</th></tr></thead><tbody>
        <tr><td>Le propriétaire injecte de l’argent</td><td>Apport privé / mouvement de capital propre, à documenter.</td><td>Capital, prêt ou compte courant selon la pièce et le contexte; ne pas choisir automatiquement.</td></tr>
        <tr><td>L’entité paie une dépense privée</td><td>Prélèvement privé, pas charge professionnelle par défaut.</td><td>Flux avec associé/actionnaire à qualifier; jamais charge déductible supposée. Risque fiscal à escalader si nécessaire.</td></tr>
        <tr><td>Le dirigeant reçoit un montant mensuel</td><td>Pas de «salaire du propriétaire» au sens d’une charge salariale de sa propre EI.</td><td>Peut relever d’un salaire si relation de travail et payroll documentés; ne pas le traiter comme simple prélèvement privé.</td></tr>
        <tr><td>Remboursement d’une dépense professionnelle avancée personnellement</td><td>Remboursement/documentation de la charge professionnelle.</td><td>Dette envers associé/employé puis remboursement, avec justificatif et politique de frais applicables.</td></tr>
        <tr><td>Distribution de bénéfice</td><td>Prélèvement du propriétaire après résultat; pas une charge.</td><td>Une distribution/dividende ne naît pas d’un simple virement; elle nécessite le fondement sociétaire et la documentation correspondante.</td></tr>
      </tbody></table></div>`
    },
    {
      title: "Opérations antérieures à la constitution",
      type: "warning-box",
      bodyHtml: `<p>Une facture datée avant l’inscription de la Sàrl n’est ni automatiquement «perdue», ni automatiquement une charge de la nouvelle société. L’assistant·e doit conserver l’incertitude visible et vérifier au minimum:</p><ul class="check-list"><li>qui a commandé et qui figure comme destinataire;</li><li>qui a payé et depuis quel compte;</li><li>quel actif, service ou droit la dépense concerne;</li><li>si l’élément a été repris ou transféré à la société et avec quelle pièce;</li><li>si une correction TVA, fiscale ou juridique nécessite une validation spécialisée.</li></ul><p>Le rôle TC02 est de préparer un traitement reproductible et les questions correctes, pas de fabriquer rétroactivement une preuve de reprise.</p>`
    },
    {
      title: "Cas pratique — 12 mouvements à qualifier",
      type: "case-study",
      bodyHtml: `<p>Le lot de travail contient douze mouvements: apport initial de Léa, facture d’ordinateur avant constitution, encaissement d’une ancienne créance après le 1er mai, loyer du nouveau bureau, restaurant familial payé par la Sàrl, salaire de gérante, frais kilométriques, prêt de l’associée, facture client émise au mauvais nom, abonnement repris, remboursement d’un fournisseur et projet de dividende.</p><p>Pour chacun, compléter: <strong>sujet concerné · date/période · nature du flux · pièce disponible · écriture provisoire ou absence d’écriture · point à confirmer</strong>. Une opération incertaine reste dans le registre des points ouverts; elle n’est jamais «forcée» dans une charge pour équilibrer le dossier.</p>`
    },
    {
      title: "Correction attendue",
      type: "correction",
      bodyHtml: `<p>La correction ne dépend pas d’un compte unique. Elle montre surtout que la séparation juridique et temporelle a été respectée. Les mouvements privés de Léa ne deviennent pas des charges de la Sàrl. Les encaissements d’anciennes créances restent reliés à leur origine. Les éléments préconstitution sont repris uniquement lorsqu’une base documentaire permet de le défendre. Le compte courant associé n’est pas utilisé comme poubelle: chaque mouvement porte une nature, une pièce et une question résiduelle.</p><p>Le dossier final permet au responsable de voir immédiatement ce qui appartient à l’ancienne activité, à la nouvelle société et ce qui doit encore être validé sur le plan fiscal, TVA ou juridique.</p>`
    },
    {
      title: "Erreurs fréquentes",
      type: "warning-box",
      bodyHtml: `<ul class="check-list"><li>Considérer que l’ancien compte bancaire devient automatiquement un compte de la Sàrl le jour de l’inscription.</li><li>Passer une dépense privée du gérant en frais généraux parce que «c’est son entreprise».</li><li>Traiter tout versement de l’associé comme capital social.</li><li>Traiter tout versement au dirigeant comme salaire ou comme dividende sans document.</li><li>Importer toutes les factures antérieures à la constitution dans la nouvelle société sans analyser la reprise.</li><li>Corriger une facture au mauvais nom uniquement dans le logiciel sans demander la pièce adéquate.</li><li>Mélanger conclusion comptable provisoire et conclusion fiscale définitive.</li></ul>`
    },
    {
      title: "Repères de notation de la revue pratique",
      type: "decision",
      bodyHtml: `<div class="dimension-grid"><div><strong>0 · Insuffisant</strong><span>Le sujet comptable ou la période sont faux; un flux privé est masqué ou une reprise est inventée.</span></div><div><strong>1 · Partiel</strong><span>La logique générale est comprise mais plusieurs mouvements restent mal sourcés ou mal séparés.</span></div><div><strong>2 · Attendu</strong><span>La chronologie, les patrimoines et les flux sont correctement séparés; les incertitudes sont explicites.</span></div><div><strong>3 · Très bon</strong><span>Le dossier est immédiatement reprenable: causes, pièces, écritures provisoires et escalades sont hiérarchisées.</span></div></div>`
    }
  ];

  module.artifact = "Dossier de séparation des patrimoines et de transition EI → Sàrl.";
  module.artifactHtml = `<div class="artifact-template"><strong>Six livrables obligatoires</strong><p>Fiche d’identité juridique · chronologie de coupure · matrice des 12 flux · tableau de reprise actifs/passifs · note des points ouverts · journal de vérification.</p><p class="small">Chaque mouvement doit montrer le sujet concerné, la période, la pièce, le traitement proposé et ce qui reste à confirmer.</p></div>`;
  module.artifactNoteMinimumCharacters = 200;
  module.evidenceItems = [
    { id: "legal_identity", label: "Fiche d’identité juridique des deux activités" },
    { id: "cutover_timeline", label: "Chronologie de coupure EI → Sàrl" },
    { id: "flow_matrix", label: "Matrice de qualification des 12 flux" },
    { id: "takeover_table", label: "Tableau de reprise actifs / passifs / contrats" },
    { id: "open_points", label: "Note des pièces manquantes et points à valider" },
    { id: "verification_log", label: "Journal de vérification des sources et contrôles" }
  ];
  module.reviewRubric = [
    "Sujet comptable et date de coupure correctement identifiés",
    "Patrimoine privé et patrimoine de la personne morale séparés sans raccourci",
    "Flux propriétaire/associé qualifiés selon leur nature et les pièces",
    "Opérations préconstitution traitées sans reprise automatique ni preuve inventée",
    "Écritures provisoires et points fiscaux/juridiques clairement séparés",
    "Dossier, sources et décisions immédiatement reprenables par un autre collaborateur"
  ];
  module.sourceRefs = ["TC02_SECO_FORMS", "TC02_SECO_EI", "TC02_SECO_SARL", "TC02_SECO_SA", "TC02_CO", "TC02_ZEFIX"];

  module.quiz = [
    {
      id: "Q01", domain: "Entreprise individuelle",
      q: "Léa paie ses vacances familiales depuis le compte bancaire utilisé pour son entreprise individuelle. Quel traitement de départ est le plus juste?",
      choices: ["Une charge de voyage professionnelle", "Un flux privé à distinguer des charges de l’activité", "Un salaire de l’exploitante", "Une immobilisation"],
      answer: 1,
      explain: "Le passage par le compte bancaire de l’activité ne transforme pas une dépense privée en charge professionnelle. Le flux doit rester identifié comme privé."
    },
    {
      id: "Q02", domain: "Sàrl et patrimoines",
      q: "Après la constitution, le gérant propose de continuer à utiliser son compte bancaire personnel comme banque principale de la Sàrl. Quel constat vient en premier?",
      choices: ["Le compte devient automatiquement celui de la société", "La banque personnelle peut être inscrite comme capital", "Le titulaire du compte et la séparation des patrimoines doivent être respectés; les flux doivent être documentés entre le gérant et la société", "Le problème existe uniquement au bouclement"],
      answer: 2,
      explain: "La Sàrl est une personne morale distincte. Un compte personnel ne devient pas un actif bancaire de la société par simple usage opérationnel."
    },
    {
      id: "Q03", domain: "Transition", critical: true,
      q: "La Sàrl est inscrite le 1er mai, mais l’ancien compte de l’entreprise individuelle reçoit et paie encore des mouvements en mai. Quelle est la première démarche professionnelle?",
      choices: ["Construire une coupure datée, identifier le titulaire et rattacher chaque mouvement à son opération d’origine avant toute régularisation", "Transférer toutes les lignes de mai dans la Sàrl", "Passer la différence en compte courant associé sans analyse", "Supprimer les mouvements privés du relevé"],
      answer: 0,
      explain: "La date d’inscription ne requalifie pas mécaniquement chaque mouvement bancaire. Il faut reconstruire sujet, origine, période et pièce."
    },
    {
      id: "Q04", domain: "Préconstitution",
      q: "Un ordinateur a été acheté par Léa deux semaines avant l’inscription de la Sàrl et sert ensuite à la société. Que faire?",
      choices: ["Toujours l’ignorer", "Toujours le passer en charge de la Sàrl", "Toujours le comptabiliser en capital social", "Analyser destinataire, paiement, propriété/reprise et pièces avant de proposer le traitement"],
      answer: 3,
      explain: "La date antérieure à la constitution impose une analyse de reprise; elle ne donne pas à elle seule le traitement comptable final."
    },
    {
      id: "Q05", domain: "Apport privé",
      q: "Dans l’entreprise individuelle, Léa verse CHF 10’000 de son compte privé sur le compte utilisé pour l’activité. Quelle qualification est la plus cohérente?",
      choices: ["Un produit d’exploitation", "Un apport du propriétaire, à distinguer du chiffre d’affaires", "Un salaire négatif", "Une dette fournisseur"],
      answer: 1,
      explain: "Un apport personnel finance l’activité mais ne constitue pas une vente ou un produit d’exploitation."
    },
    {
      id: "Q06", domain: "Rémunération du dirigeant",
      q: "La Sàrl verse chaque mois un montant au gérant et le dossier contient contrat, fiche de salaire et décompte payroll. Quelle qualification de départ est la plus plausible?",
      choices: ["Prélèvement privé de l’entreprise individuelle", "Dividende automatique", "Salaire à traiter dans le circuit payroll, sous réserve des paramètres validés", "Remboursement de capital social"],
      answer: 2,
      explain: "Dans une personne morale, une rémunération documentée dans le payroll ne se traite pas comme un simple prélèvement privé."
    },
    {
      id: "Q07", domain: "Créances de transition",
      q: "Une facture client a été émise par l’entreprise individuelle le 20 avril mais payée le 10 mai après la création de la Sàrl. Quel réflexe est correct?",
      choices: ["Rattacher l’encaissement à la créance et au sujet qui l’a générée, puis documenter tout transfert éventuel", "Reconnaître automatiquement un produit de mai dans la Sàrl", "Annuler la facture d’avril", "Classer le paiement comme apport de l’associée"],
      answer: 0,
      explain: "La date d’encaissement ne change pas automatiquement l’origine juridique et comptable de la créance."
    },
    {
      id: "Q08", domain: "Dépense privée", critical: true,
      q: "La Sàrl paie directement un séjour familial du gérant. Quelle réponse protège le mieux le dossier?",
      choices: ["Le comptabiliser en représentation car le gérant dirige la société", "Le laisser en charge si le montant est faible", "Le passer en frais de personnel sans pièce", "Ne pas le masquer en charge: qualifier le flux avec l’associé, documenter et escalader les conséquences fiscales si nécessaire"],
      answer: 3,
      explain: "Les fonds de la société sont distincts des fonds privés. Une dépense privée payée par la société doit rester visible comme flux avec la personne concernée."
    },
    {
      id: "Q09", domain: "Distribution",
      q: "Un associé demande de virer CHF 15’000 en indiquant simplement «dividende» dans son e-mail. Quel contrôle vient avant l’écriture?",
      choices: ["Le taux TVA", "Le fondement sociétaire et la décision/documentation autorisant une distribution", "Le nombre d’employés", "Le solde de caisse"],
      answer: 1,
      explain: "Un libellé bancaire ou un e-mail ne suffit pas à créer une distribution régulière. Il faut la décision et le contexte appropriés."
    },
    {
      id: "Q10", domain: "Organismes sans but lucratif",
      q: "Dans une association, quelle logique remplace l’idée de «prélèvement privé du propriétaire»?",
      choices: ["Chaque membre peut prendre sa part", "Tous les paiements sont des salaires", "Les sorties doivent être reliées au but, aux organes compétents et aux règles de l’entité", "Le compte bancaire appartient au président"],
      answer: 2,
      explain: "Une association n’est pas le patrimoine privé de ses membres ou de son président; l’utilisation des fonds suit son but et sa gouvernance."
    },
    {
      id: "Q11", domain: "Piste de reprise",
      q: "Quelle preuve rend le mieux une transition EI → Sàrl reprenable par un autre collaborateur?",
      choices: ["Une chronologie avec date de coupure, sujets, soldes, pièces de reprise et traitement des flux de transition", "Un solde unique en compte courant", "Une note disant «tout repris»", "La seule copie de la nouvelle carte bancaire"],
      answer: 0,
      explain: "La reprise doit permettre de comprendre ce qui a changé, quand, sur quelle pièce et avec quelle écriture."
    },
    {
      id: "Q12", domain: "Limites professionnelles",
      q: "Pourquoi TC02 distingue-t-il traitement comptable provisoire et conclusion fiscale?",
      choices: ["Pour éviter toute comptabilisation", "Parce que la fiscalité ne concerne jamais les flux privés", "Pour supprimer les pièces difficiles", "Parce que le junior peut préparer une qualification et une piste de preuve sans trancher seul une déductibilité ou une prestation appréciable en argent complexe"],
      answer: 3,
      explain: "Une bonne autonomie inclut la capacité à produire un traitement préparatoire fiable et à escalader la conclusion fiscale lorsque le risque dépasse le périmètre."
    }
  ];

  module.practicalReview = {
    threshold: 80,
    feedbackMinimumCharacters: 80,
    scoreItems: [
      { id: "entity_identity", label: "Identification des sujets et formes juridiques", max: 15 },
      { id: "cutover", label: "Chronologie et date de coupure", max: 15 },
      { id: "owner_flows", label: "Qualification des flux propriétaire / associé", max: 20 },
      { id: "preincorporation", label: "Traitement des opérations préconstitution", max: 15 },
      { id: "entries", label: "Écritures provisoires et logique comptable", max: 15 },
      { id: "escalation", label: "Points ouverts et escalades", max: 10 },
      { id: "artifact_quality", label: "Qualité, sources et traçabilité du dossier", max: 10 }
    ],
    criticalChecks: [
      { id: "private_charge", label: "Dépense privée de la Sàrl passée silencieusement en charge" },
      { id: "bank_owner", label: "Compte bancaire personnel traité comme banque de la Sàrl sans contrôle du titulaire" },
      { id: "preincorp_auto", label: "Opération préconstitution reprise automatiquement sans base documentaire" },
      { id: "owner_flow_guess", label: "Salaire, dividende, apport ou compte courant déterminé sans pièce ni qualification" }
    ],
    anchorGuidance: {
      insufficient: "Sujet ou période faux; flux privé masqué ou reprise inventée.",
      partial: "Bonne logique mais séparation, pièces ou chronologie incomplètes.",
      expected: "Patrimoines, dates et flux séparés; incertitudes documentées et escaladées.",
      strong: "Dossier immédiatement reprenable, avec causes, preuves, écritures provisoires et décisions hiérarchisées."
    }
  };

  module.learnerPackage = {
    files: [
      { label: "Lire en premier", path: "ressources/tc02-apprenant-v1.0/00_LIRE_EN_PREMIER.md" },
      { label: "Cours TC02", path: "ressources/tc02-apprenant-v1.0/01_Cours_TC02.md" },
      { label: "Dossier simulé", path: "ressources/tc02-apprenant-v1.0/02_Dossier_simule_TC02.md" },
      { label: "Matrice des flux", path: "ressources/tc02-apprenant-v1.0/03_Matrice_flux_TC02.csv" },
      { label: "Chronologie de reprise", path: "ressources/tc02-apprenant-v1.0/04_Chronologie_reprise_TC02.csv" },
      { label: "Journal de vérification", path: "ressources/tc02-apprenant-v1.0/05_Journal_verification_TC02.csv" },
      { label: "Sources et version", path: "ressources/tc02-apprenant-v1.0/06_Sources_et_version.md" }
    ]
  };

  module.masterStandard = {
    version: "1.0",
    basedOn: "TC01 v1.4",
    principle: "Identifier le sujet et la période avant le compte comptable",
    requiredComponents: [
      "résultat professionnel observable",
      "dossier de transition réaliste",
      "méthode et contrôles",
      "sources officielles datées",
      "six livrables",
      "quiz décisionnel",
      "deux questions critiques",
      "revue pratique sur 100",
      "quatre erreurs critiques",
      "journal de vérification"
    ]
  };
})();
