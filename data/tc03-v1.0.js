(function () {
  const DATA = window.FIDUCIAIRE_DATA;
  if (!DATA || !DATA.modules || !DATA.modules.TC03) {
    throw new Error("TC03 v1.0 doit être chargé après roadmap-data.js");
  }

  const module = DATA.modules.TC03;
  const sources = DATA.sourcesRegistry.sources;

  sources.TC03_LPD = {
    sourceName: "Loi fédérale sur la protection des données (LPD; RS 235.1)",
    url: "https://www.fedlex.admin.ch/eli/cc/2022/491/fr",
    lastChecked: "2026-09-05",
    usedIn: ["TC03"],
    reviewFrequency: "before-use",
    articles: "5 let. h; 6 à 9; 24"
  };
  sources.TC03_PFPDT_SECURITY = {
    sourceName: "PFPDT — Sécurité de l’information et mesures techniques et organisationnelles",
    url: "https://www.edoeb.admin.ch/fr/securite-de-linformation",
    lastChecked: "2026-09-05",
    usedIn: ["TC03"],
    reviewFrequency: "before-use"
  };
  sources.TC03_PFPDT_TOM = {
    sourceName: "PFPDT — Guide relatif aux mesures techniques et organisationnelles de la protection des données",
    url: "https://www.edoeb.admin.ch/dam/fr/sd-web/eVhrh8wY3QcR/leitfaden_tom.pdf",
    lastChecked: "2026-09-05",
    usedIn: ["TC03"],
    reviewFrequency: "before-use"
  };
  sources.TC03_PFPDT_CLOUD = {
    sourceName: "PFPDT — Traitement de données dans un nuage informatique",
    url: "https://www.edoeb.admin.ch/fr/traitement-de-donnees-dans-un-nuage-informatique",
    lastChecked: "2026-09-05",
    usedIn: ["TC03"],
    reviewFrequency: "before-use"
  };
  sources.TC03_PFPDT_BREACH = {
    sourceName: "PFPDT — Guide sur la notification des violations de la sécurité des données",
    url: "https://www.edoeb.admin.ch/fr/guide-data-breach",
    lastChecked: "2026-09-05",
    usedIn: ["TC03"],
    reviewFrequency: "before-use",
    articles: "art. 24 LPD; guide PFPDT mis à jour en 2025"
  };
  sources.TC03_PFPDT_EMPLOYER = {
    sourceName: "PFPDT — Traitement des données par l’employeur",
    url: "https://www.edoeb.admin.ch/fr/traitement-des-donnees-par-lemployeur",
    lastChecked: "2026-09-05",
    usedIn: ["TC03"],
    reviewFrequency: "before-use"
  };

  module.status = "core";
  module.contentVersion = "1.0";
  module.duration = "3 h guidées + 3 h de pratique + revue";
  module.critical = true;
  module.quizThresholdCount = 11;
  module.criticalQuestionIds = ["Q03", "Q07", "Q10"];
  module.title = "Protection des données, accès et gestion des incidents";
  module.objective = "Limiter les données et les accès au besoin réel, utiliser les canaux autorisés, détecter un incident et préserver une piste factuelle avant escalade.";
  module.pedagogicalStatus = "Paquet pédagogique v1.0 · module cœur critique · LPD, accès, cloud et incidents";
  module.ruAid = "<strong>Réflexe cabinet:</strong> avant d’ouvrir, partager ou exporter un fichier, vérifier finalité, données nécessaires, destinataire, droit d’accès, canal et trace. En cas d’incident: contenir, préserver les faits, escalader.";

  module.sections = [
    {
      title: "Résultat professionnel attendu",
      type: "decision",
      bodyHtml: `<p>TC03 ne demande pas au junior de devenir DPO ni de décider seul d’une notification au PFPDT. La compétence démontrée consiste à traiter les données de dossier selon le besoin réel, appliquer des droits d’accès défendables et réagir correctement lorsqu’une donnée est exposée, envoyée au mauvais destinataire ou rendue accessible sans autorisation.</p><ul class="check-list"><li>Identifier la finalité et les catégories de données avant collecte ou partage.</li><li>Appliquer des accès nominatifs et le moindre privilège.</li><li>Vérifier destinataire et canal avant tout envoi sensible.</li><li>Révoquer ou signaler sans délai les droits devenus inutiles.</li><li>Ne pas transférer un dossier vers un cloud ou un outil personnel par simple commodité.</li><li>En cas de violation: contenir, préserver les faits, alerter la personne compétente et laisser la qualification/notification au circuit prévu.</li></ul>`
    },
    {
      title: "La chaîne de décision avant un partage",
      bodyHtml: `<div class="dimension-grid"><div><strong>1 · Finalité</strong><span>Pourquoi cette donnée doit-elle être traitée ou transmise?</span></div><div><strong>2 · Nécessité</strong><span>Quelles données sont réellement nécessaires à cette finalité?</span></div><div><strong>3 · Destinataire</strong><span>Cette personne ou ce rôle est-il autorisé à les recevoir?</span></div><div><strong>4 · Accès</strong><span>Lecture, modification, export ou approbation: quel niveau est nécessaire?</span></div><div><strong>5 · Canal</strong><span>Le canal et le stockage sont-ils approuvés et suffisamment sécurisés?</span></div><div><strong>6 · Trace</strong><span>La décision, l’accès et l’éventuelle exception sont-ils documentés?</span></div></div><div class="callout"><strong>Règle</strong><p>La facilité technique n’est jamais une autorisation. Un lien partageable, une adresse privée ou un compte cloud disponible ne répondent pas à la question «cette personne doit-elle accéder à ces données?».</p></div>`
    },
    {
      title: "Accès: rôle, moindre privilège et départ d’un collaborateur",
      type: "warning-box",
      bodyHtml: `<p>Un bon système d’accès répond à trois questions: <strong>qui</strong> accède, <strong>à quoi</strong> et <strong>pour quelle tâche</strong>. Les droits doivent être nominatifs, proportionnés au rôle, révisables et révoqués lorsque le besoin disparaît.</p><div class="table-scroll"><table class="learning-table"><thead><tr><th>Situation</th><th>Décision attendue</th><th>Trace</th></tr></thead><tbody><tr><td>Assistant comptable sur dossier mensuel</td><td>Lecture/écriture sur le dossier nécessaire; pas d’administration globale sans besoin.</td><td>Rôle, périmètre, date d’attribution.</td></tr><tr><td>Responsable payroll</td><td>Accès aux données salariales nécessaires au traitement; limiter les exports et destinataires.</td><td>Autorisation et revue périodique.</td></tr><tr><td>Collaborateur quitte le cabinet</td><td>Révoquer comptes, sessions, clés, partages et accès distants selon procédure.</td><td>Checklist de départ datée.</td></tr><tr><td>Mot de passe partagé</td><td>Ne pas l’utiliser comme solution normale; demander un accès nominatif.</td><td>Demande/correction du droit d’accès.</td></tr></tbody></table></div>`
    },
    {
      title: "Données payroll et données sensibles",
      bodyHtml: `<p>Les dossiers de paie peuvent contenir coordonnées privées, données bancaires, informations familiales, absences et parfois données de santé. Le fait qu’une information existe chez le client ne signifie pas que chaque collaborateur de la fiduciaire doit la recevoir.</p><ul class="check-list"><li>Collecter uniquement ce qui est nécessaire à la prestation acceptée.</li><li>Éviter les copies locales ou exports «au cas où».</li><li>Limiter les dossiers médicaux ou données sensibles aux personnes qui en ont réellement besoin.</li><li>Ne pas envoyer un journal salarial complet si le destinataire n’a besoin que d’un total ou d’un sous-ensemble.</li><li>Prévoir la suppression ou l’archivage contrôlé lorsque la finalité disparaît, sous réserve des obligations de conservation applicables.</li></ul>`
    },
    {
      title: "Cloud et sous-traitance: cinq contrôles avant utilisation",
      type: "decision",
      bodyHtml: `<ol class="check-list"><li>Identifier les données concernées et leur sensibilité.</li><li>Comprendre le rôle du fournisseur et les instructions contractuelles.</li><li>Vérifier sécurité, authentification, droits et possibilités de restitution/suppression.</li><li>Examiner sous-traitants ultérieurs et lieux de traitement/transferts pertinents.</li><li>Obtenir la validation prévue par le cabinet avant de charger des données réelles.</li></ol><p>TC03 ne demande pas au junior de mener seul une analyse juridique complète d’un fournisseur cloud. Il doit reconnaître qu’un outil pratique devient un traitement de données et que la décision doit suivre la procédure du cabinet.</p>`
    },
    {
      title: "Cas pratique — Rivage Services SA",
      type: "case-study",
      bodyHtml: `<p>Rivage Services SA emploie 18 personnes. La fiduciaire traite comptabilité et paie. Le lundi matin, six anomalies apparaissent simultanément: un ancien collaborateur conserve un accès au logiciel; une responsable client demande le journal des salaires sur son adresse Gmail; un dossier cloud est partagé avec «toute personne disposant du lien»; un certificat médical est rangé dans le dossier comptable général; un assistant a exporté les salaires sur son ordinateur personnel; enfin, un tableau salarial a été envoyé par erreur à un fournisseur.</p><p>Le learner doit construire une matrice <strong>donnée → finalité → rôle → niveau d’accès → canal → action</strong>, traiter d’abord les risques immédiats et préparer une fiche d’incident séparant faits connus, mesures de confinement, personnes informées et décisions encore à prendre.</p>`
    },
    {
      title: "Incident: contenir avant de conclure",
      type: "warning-box",
      bodyHtml: `<p>Une violation de la sécurité peut notamment prendre la forme d’une perte, d’un effacement, d’une modification ou d’une divulgation/accessibilité non autorisée de données personnelles. Le premier travail du junior est opérationnel:</p><ol class="check-list"><li>Stopper ou limiter l’exposition si cela peut être fait sans détruire les preuves.</li><li>Alerter immédiatement la personne responsable selon la procédure.</li><li>Conserver les faits: quoi, quand, quelles données, quelles personnes, quel destinataire, quel accès, quelles actions déjà prises.</li><li>Préserver les journaux, messages et versions utiles; ne pas «nettoyer» l’incident pour le rendre moins visible.</li><li>Laisser au responsable la qualification du risque et la décision de notification/information selon la LPD.</li></ol><div class="callout callout-danger"><strong>Erreur critique</strong><p>Supprimer le message, modifier les logs ou attendre une plainte avant d’informer le cabinet détruit la qualité de la réponse et peut aggraver le risque.</p></div>`
    },
    {
      title: "Demande d’accès d’une personne concernée",
      bodyHtml: `<p>Une personne peut demander quelles données sont traitées à son sujet. Le junior ne doit ni ignorer la demande, ni envoyer immédiatement tout le dossier à une adresse non vérifiée. La réponse suit la procédure du responsable de traitement: identifier suffisamment la personne, protéger les données contre l’accès de tiers, retrouver le périmètre concerné et transmettre la demande à la personne compétente.</p><p>Dans une fiduciaire, il faut également clarifier le rôle du cabinet par rapport au client avant de répondre directement.</p>`
    },
    {
      title: "Correction attendue du cas",
      type: "correction",
      bodyHtml: `<p>Les priorités sont hiérarchisées. L’accès de l’ancien collaborateur est révoqué/traité sans délai; le partage public est fermé; aucune donnée salariale n’est envoyée vers Gmail sans canal approuvé; le certificat médical quitte le dossier général au profit d’un accès restreint; l’export personnel est supprimé ou sécurisé selon instruction après préservation des faits nécessaires; l’envoi au fournisseur est traité comme incident et immédiatement escaladé.</p><p>La fiche ne prétend pas décider seule si une notification au PFPDT ou une information aux personnes concernées est requise. Elle fournit au responsable les faits nécessaires à cette décision.</p>`
    },
    {
      title: "Erreurs fréquentes",
      type: "warning-box",
      bodyHtml: `<ul class="check-list"><li>Donner l’accès «au cas où» à toute l’équipe.</li><li>Confondre adresse connue et destinataire autorisé.</li><li>Utiliser une adresse personnelle ou un cloud privé parce que le canal interne est moins pratique.</li><li>Partager un dossier par lien public puis compter sur le secret du destinataire.</li><li>Conserver les accès d’un ancien collaborateur pour «les archives».</li><li>Envoyer tout le dossier pour répondre à une demande d’accès sans vérifier l’identité et le périmètre.</li><li>Effacer une erreur d’envoi avant d’avoir préservé les faits.</li><li>Décider seul qu’un incident est «trop petit» pour être signalé au responsable.</li></ul>`
    },
    {
      title: "Repères de notation de la revue pratique",
      type: "decision",
      bodyHtml: `<div class="dimension-grid"><div><strong>0 · Insuffisant</strong><span>Accès excessif, partage non autorisé ou incident masqué.</span></div><div><strong>1 · Partiel</strong><span>Les risques sont vus mais les droits, canaux ou faits d’incident restent incomplets.</span></div><div><strong>2 · Attendu</strong><span>Données minimisées, droits cohérents, incident contenu et escalade correctement documentée.</span></div><div><strong>3 · Très bon</strong><span>Priorités claires, matrice d’accès exploitable, preuves préservées et décisions laissées au bon niveau.</span></div></div>`
    }
  ];

  module.artifact = "Dossier de gouvernance des accès et fiche d’incident LPD.";
  module.artifactHtml = `<div class="artifact-template"><strong>Six livrables obligatoires</strong><p>Inventaire des données · matrice des accès · registre des partages/canaux · checklist arrivée/départ · fiche d’incident · journal de vérification.</p><p class="small">Aucune donnée réelle de client ou de salarié ne doit être saisie dans l’édition publique.</p></div>`;
  module.artifactNoteMinimumCharacters = 200;
  module.evidenceItems = [
    { id: "data_inventory", label: "Inventaire des catégories de données et finalités" },
    { id: "access_matrix", label: "Matrice rôles / droits / dossiers" },
    { id: "sharing_register", label: "Registre des partages, canaux et exceptions" },
    { id: "joiner_leaver", label: "Checklist d’arrivée / changement / départ" },
    { id: "incident_sheet", label: "Fiche factuelle de l’incident simulé" },
    { id: "verification_log", label: "Journal de vérification des contrôles et sources" }
  ];
  module.reviewRubric = [
    "Finalité et nécessité des données identifiées avant partage",
    "Accès nominatifs et moindre privilège appliqués par rôle",
    "Canaux et partages externes qualifiés sans solution de commodité",
    "Données payroll/sensibles séparées selon le besoin d’en connaître",
    "Incident contenu, faits préservés et décision de notification correctement escaladée",
    "Livrables, sources et décisions reprenables par un autre collaborateur"
  ];
  module.sourceRefs = ["TC03_LPD", "TC03_PFPDT_SECURITY", "TC03_PFPDT_TOM", "TC03_PFPDT_CLOUD", "TC03_PFPDT_BREACH", "TC03_PFPDT_EMPLOYER"];

  module.quiz = [
    {
      id: "Q01", domain: "Finalité et minimisation",
      q: "La paie fait partie du mandat, mais un manager demande aussi les certificats médicaux complets de tous les salariés «pour avoir le dossier au même endroit». Quel réflexe vient en premier?",
      choices: ["Collecter tout car la paie est incluse", "Vérifier la finalité et limiter les données à ce qui est réellement nécessaire au traitement autorisé", "Envoyer les certificats au dossier comptable général", "Demander aux salariés de renoncer à la LPD"],
      answer: 1,
      explain: "Le périmètre du mandat ne justifie pas une collecte illimitée. Finalité et proportionnalité imposent de traiter uniquement les données nécessaires."
    },
    {
      id: "Q02", domain: "Destinataire",
      q: "Une responsable client demande le journal salarial complet sur son adresse Gmail personnelle. Quelle réponse est la plus défendable?",
      choices: ["Envoyer car elle est connue du cabinet", "Envoyer si le PDF est renommé", "Vérifier son autorisation, le besoin réel et utiliser le canal approuvé; sinon suspendre l’envoi", "Envoyer uniquement les salaires les plus élevés"],
      answer: 2,
      explain: "Identité connue, droit d’accès et canal autorisé sont trois contrôles différents."
    },
    {
      id: "Q03", domain: "Accès", critical: true,
      q: "Un ancien collaborateur peut encore ouvrir le logiciel comptable après son départ. Quelle action est prioritaire?",
      choices: ["Traiter immédiatement la révocation selon la procédure, vérifier les accès liés et conserver la trace du contrôle", "Attendre la prochaine revue trimestrielle", "Changer seulement le nom affiché du compte", "Laisser l’accès en lecture pour les archives"],
      answer: 0,
      explain: "Un droit devenu inutile doit être révoqué. Le départ est un événement de sécurité, pas une simple question administrative."
    },
    {
      id: "Q04", domain: "Moindre privilège",
      q: "Un assistant comptable doit saisir les factures d’un client mais ne traite pas la paie. Quel accès correspond le mieux au moindre privilège?",
      choices: ["Administrateur de tout le client", "Accès à tous les exports pour gagner du temps", "Même profil que le responsable de mandat", "Accès aux fonctions et dossiers nécessaires à la comptabilité, sans payroll ni administration non requise"],
      answer: 3,
      explain: "Le niveau d’accès doit correspondre à la tâche réelle et être révisable."
    },
    {
      id: "Q05", domain: "Cloud",
      q: "Avant de déposer des dossiers clients dans un nouveau service cloud, quel ensemble de contrôles est le plus complet?",
      choices: ["Prix et capacité de stockage", "Données/sensibilité, rôle contractuel, sécurité, sous-traitants, lieux de traitement, accès et restitution/suppression", "Logo du fournisseur et avis clients", "Seulement l’existence d’un mot de passe"],
      answer: 1,
      explain: "Le cloud implique un traitement de données; la décision doit intégrer les garanties, rôles et flux pertinents, pas uniquement la commodité technique."
    },
    {
      id: "Q06", domain: "Lien de partage",
      q: "Un dossier payroll est partagé avec l’option «toute personne disposant du lien». Que faire?",
      choices: ["Fermer ou restreindre le partage selon les droits autorisés et vérifier l’historique d’accès si disponible", "Conserver le lien s’il est difficile à deviner", "Envoyer le lien uniquement par SMS", "Ajouter le mot «confidentiel» au nom du dossier"],
      answer: 0,
      explain: "Un lien public ou largement partageable ne remplace pas un contrôle d’accès nominatif adapté aux données sensibles."
    },
    {
      id: "Q07", domain: "Incident", critical: true,
      q: "Un tableau contenant noms, salaires et IBAN est envoyé par erreur à un fournisseur. Quelle première séquence est correcte?",
      choices: ["Supprimer l’e-mail du dossier et attendre", "Informer immédiatement tous les salariés sans analyse", "Demander au fournisseur de garder le secret puis clore le sujet", "Contenir l’exposition si possible, alerter le responsable, préserver les faits et lancer l’évaluation prévue par la procédure"],
      answer: 3,
      explain: "La première réponse doit réduire l’exposition sans détruire les faits, puis permettre au responsable d’évaluer le risque et les obligations."
    },
    {
      id: "Q08", domain: "Données de santé",
      q: "Un certificat médical est rangé dans le dossier comptable général accessible à toute l’équipe. Quel traitement est le plus approprié?",
      choices: ["Le laisser car il concerne une absence", "Limiter l’accès au besoin réel et déplacer/organiser la donnée dans l’espace prévu par la procédure", "L’imprimer pour éviter la LPD", "L’envoyer à tous les collaborateurs pour transparence"],
      answer: 1,
      explain: "Les données sensibles exigent une gestion adaptée au besoin d’en connaître et à la finalité du traitement."
    },
    {
      id: "Q09", domain: "Demande d’accès",
      q: "Un ancien salarié écrit depuis une nouvelle adresse: «Envoyez-moi immédiatement toutes les données que vous avez sur moi». Quel réflexe est correct?",
      choices: ["Envoyer tout le dossier sans autre contrôle", "Ignorer car il n’est plus salarié", "Transmettre la demande au circuit compétent, vérifier suffisamment l’identité et protéger les données contre l’accès d’un tiers", "Demander son mot de passe de l’ancien portail"],
      answer: 2,
      explain: "Une demande d’accès doit être traitée, mais l’identité et le canal de réponse doivent eux-mêmes protéger les données."
    },
    {
      id: "Q10", domain: "Préservation des faits", critical: true,
      q: "Après une erreur d’envoi, un collègue propose d’effacer immédiatement l’e-mail, les logs et le fichier local «pour éviter le problème». Quelle réponse est correcte?",
      choices: ["Refuser de détruire la piste: contenir l’incident, préserver les faits utiles et escalader immédiatement", "Tout effacer si le destinataire promet de supprimer", "Modifier les logs pour indiquer le bon destinataire", "Attendre une plainte avant d’en parler"],
      answer: 0,
      explain: "La gestion d’un incident nécessite une piste factuelle. Contenir ne signifie pas effacer les preuves nécessaires à l’évaluation."
    },
    {
      id: "Q11", domain: "Notification",
      q: "Qui doit décider, dans le cadre de TC03, si une violation doit être annoncée au PFPDT?",
      choices: ["Le junior seul selon le montant du salaire", "Le destinataire erroné", "Le client automatiquement", "La personne compétente dans le circuit du responsable de traitement, à partir des faits et de l’évaluation du risque"],
      answer: 3,
      explain: "L’art. 24 LPD lie l’obligation de notification au niveau de risque. Le junior fournit les faits et escalade; il ne remplace pas la décision du responsable."
    },
    {
      id: "Q12", domain: "Conservation",
      q: "Que faire d’un export salarial local devenu inutile après la finalisation du traitement?",
      choices: ["Le conserver indéfiniment par prudence", "Le copier sur un cloud personnel", "Appliquer la règle de conservation/suppression du cabinet et supprimer ou archiver de manière contrôlée lorsqu’il n’est plus nécessaire", "Le renommer pour qu’il ne soit plus personnel"],
      answer: 2,
      explain: "La proportionnalité et la finalité impliquent de ne pas conserver inutilement des copies personnelles ou locales hors du dispositif prévu."
    }
  ];

  module.practicalReview = {
    threshold: 80,
    feedbackMinimumCharacters: 80,
    scoreItems: [
      { id: "data_purpose", label: "Finalités, catégories et minimisation", max: 15 },
      { id: "access_design", label: "Matrice des accès et moindre privilège", max: 20 },
      { id: "channels", label: "Canaux, partages et exports", max: 15 },
      { id: "sensitive_data", label: "Traitement des données sensibles / payroll", max: 10 },
      { id: "incident_response", label: "Confinement et fiche d’incident", max: 20 },
      { id: "escalation", label: "Qualification des escalades et limites", max: 10 },
      { id: "artifact_quality", label: "Qualité, sources et traçabilité", max: 10 }
    ],
    criticalChecks: [
      { id: "shared_credentials", label: "Mot de passe partagé ou accès non nominatif accepté comme solution normale" },
      { id: "former_access", label: "Accès d’un ancien collaborateur laissé actif sans traitement immédiat" },
      { id: "unauthorized_share", label: "Données salariales/sensibles partagées vers un destinataire ou canal non autorisé" },
      { id: "incident_hidden", label: "Incident effacé, minimisé ou non escaladé au responsable" }
    ],
    anchorGuidance: {
      insufficient: "Accès excessif, partage non autorisé ou incident masqué.",
      partial: "Risques identifiés mais droits, canal ou faits incomplets.",
      expected: "Accès proportionnés, partage contrôlé, incident contenu et escalade traçable.",
      strong: "Priorités claires, données minimisées, preuves préservées et dossier immédiatement exploitable par le responsable."
    }
  };

  module.learnerPackage = {
    files: [
      { label: "Lire en premier", path: "ressources/tc03-apprenant-v1.0/00_LIRE_EN_PREMIER.md" },
      { label: "Cours TC03", path: "ressources/tc03-apprenant-v1.0/01_Cours_TC03.md" },
      { label: "Dossier simulé", path: "ressources/tc03-apprenant-v1.0/02_Dossier_simule_TC03.md" },
      { label: "Inventaire des données", path: "ressources/tc03-apprenant-v1.0/03_Inventaire_donnees_TC03.csv" },
      { label: "Matrice des accès", path: "ressources/tc03-apprenant-v1.0/04_Matrice_acces_TC03.csv" },
      { label: "Registre des partages", path: "ressources/tc03-apprenant-v1.0/05_Registre_partages_TC03.csv" },
      { label: "Checklist arrivée-départ", path: "ressources/tc03-apprenant-v1.0/06_Checklist_acces_TC03.csv" },
      { label: "Fiche d’incident", path: "ressources/tc03-apprenant-v1.0/07_Fiche_incident_TC03.md" },
      { label: "Journal de vérification", path: "ressources/tc03-apprenant-v1.0/08_Journal_verification_TC03.csv" },
      { label: "Sources et version", path: "ressources/tc03-apprenant-v1.0/09_Sources_et_version.md" }
    ]
  };

  module.masterStandard = {
    version: "1.0",
    basedOn: "TC01 v1.4",
    principle: "Finalité → nécessité → destinataire → accès → canal → trace; incident → contenir → préserver → escalader",
    requiredComponents: [
      "résultat professionnel observable",
      "cas métier avec incidents et accès concurrents",
      "sources LPD/PFPDT datées",
      "six livrables",
      "quiz 12 questions / 3 critiques",
      "revue pratique sur 100",
      "quatre erreurs critiques",
      "invalidation après modification"
    ]
  };
})();
