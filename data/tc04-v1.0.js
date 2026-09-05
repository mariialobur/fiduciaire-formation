(function () {
  const DATA = window.FIDUCIAIRE_DATA;
  if (!DATA || !DATA.modules || !DATA.modules.TC04) {
    throw new Error("TC04 v1.0 doit être chargé après roadmap-data.js");
  }

  const module = DATA.modules.TC04;
  const sources = DATA.sourcesRegistry.sources;

  sources.TC04_SIF_2026 = {
    sourceName: "SFI — Entrée en vigueur des nouvelles règles LBA / LTPM au 1er octobre 2026",
    url: "https://www.sif.admin.ch/fr/newnsb/x3sKLxCJ6S3dQJtfvy0Tb",
    lastChecked: "2026-09-05",
    usedIn: ["TC04"],
    reviewFrequency: "before-use"
  };
  sources.TC04_SIF_MEASURES = {
    sourceName: "SFI — Mesures de renforcement de la lutte contre le blanchiment d’argent",
    url: "https://www.sif.admin.ch/fr/amelioration-lutte-blanchiment-argent-mesures",
    lastChecked: "2026-09-05",
    usedIn: ["TC04"],
    reviewFrequency: "before-use"
  };
  sources.TC04_LBA = {
    sourceName: "Fedlex — Loi sur le blanchiment d’argent (LBA; RS 955.0)",
    url: "https://www.fedlex.admin.ch/eli/cc/1998/892_892_892/fr",
    lastChecked: "2026-09-05",
    usedIn: ["TC04"],
    reviewFrequency: "before-use"
  };
  sources.TC04_LTPM = {
    sourceName: "TranspaReg / OFJ — Loi sur la transparence des personnes morales et registre suisse de transparence",
    url: "https://www.transpareg.admin.ch/fr/",
    lastChecked: "2026-09-05",
    usedIn: ["TC04"],
    reviewFrequency: "before-use"
  };
  sources.TC04_UBO = {
    sourceName: "TranspaReg / OFJ — Qui est l’ayant droit économique?",
    url: "https://www.transpareg.admin.ch/fr/qui-est-l-ayant-droit-economique",
    lastChecked: "2026-09-05",
    usedIn: ["TC04"],
    reviewFrequency: "before-use"
  };
  sources.TC04_OAR = {
    sourceName: "FINMA — Organismes d’autorégulation et assujettissement LBA",
    url: "https://www.finma.ch/fr/autorisation/organisme-d-autoregulation-oar/",
    lastChecked: "2026-09-05",
    usedIn: ["TC04"],
    reviewFrequency: "before-use"
  };
  sources.TC04_ZEFIX = {
    sourceName: "Zefix — Index central des raisons de commerce",
    url: "https://www.zefix.admin.ch",
    lastChecked: "2026-09-05",
    usedIn: ["TC04"],
    reviewFrequency: "per-file"
  };

  module.status = "core";
  module.contentVersion = "1.0";
  module.duration = "3 h 30 guidées + 3 h de pratique + revue";
  module.critical = true;
  module.quizThresholdCount = 11;
  module.criticalQuestionIds = ["Q03", "Q06", "Q09"];
  module.title = "KYC, ayant droit économique et périmètre LBA";
  module.objective = "Construire un dossier KYC factuel, identifier les personnes de contrôle, comprendre le service réellement fourni et escalader l’assujettissement ou les signaux d’alerte sans mener seul une enquête ni formuler d’accusation.";
  module.pedagogicalStatus = "Paquet pédagogique v1.0 · module cœur critique · transition LBA/LTPM au 01.10.2026";
  module.ruAid = "<strong>Réflexe cabinet:</strong> ne pas demander seulement «qui est le client?». Vérifier aussi qui contrôle, quelle activité est réelle, quel service le cabinet va effectivement fournir, à quelle date et quels faits rendent le dossier atypique.";

  module.sections = [
    {
      title: "Résultat professionnel attendu",
      type: "decision",
      bodyHtml: `<p>TC04 n’autorise pas le junior à qualifier seul une infraction, à décider d’une communication au MROS ou à déterminer définitivement l’assujettissement du cabinet. La compétence attendue est plus concrète: constituer un dossier d’entrée suffisamment fiable pour que la personne responsable puisse décider d’accepter, limiter, renforcer ou refuser un service.</p><ul class="check-list"><li>Identifier et dater le client à partir de sources cohérentes.</li><li>Remonter jusqu’aux personnes physiques qui exercent le contrôle économique pertinent.</li><li>Comprendre l’activité réelle et le but économique du mandat demandé.</li><li>Distinguer tenue comptable ordinaire, activité financière et activité de conseil à risque.</li><li>Repérer les incohérences sans transformer un signal en accusation.</li><li>Escalader les faits avec les pièces, les inconnues et la date juridique applicable.</li></ul>`
    },
    {
      title: "KYC interne et assujettissement LBA ne sont pas la même question",
      bodyHtml: `<div class="table-scroll"><table class="learning-table"><thead><tr><th>Question</th><th>Réflexe TC04</th></tr></thead><tbody><tr><td>Le cabinet doit-il savoir qui est son client?</td><td>Oui. L’identification, la gouvernance, le périmètre du mandat et la cohérence économique sont des contrôles de base du dossier, même lorsqu’une prestation n’est pas soumise à la LBA.</td></tr><tr><td>Toute comptabilité est-elle automatiquement une activité LBA?</td><td>Non. Le champ dépend de l’activité concrètement exercée. Il faut cartographier le service réel avant de conclure.</td></tr><tr><td>Le cabinet exécute-t-il des paiements ou dispose-t-il d’un pouvoir sur des valeurs patrimoniales?</td><td>Le signal doit être escaladé avant acceptation ou création d’accès; l’activité financière peut relever d’un régime spécifique.</td></tr><tr><td>Le cabinet crée, structure, opère ou domicilie une entité dans un contexte entrant dans les nouvelles activités de conseil à risque?</td><td>À partir du 01.10.2026, vérifier le nouveau périmètre LBA applicable aux «conseillers» et la procédure du cabinet.</td></tr></tbody></table></div>`
    },
    {
      title: "Point de bascule juridique — 30 septembre / 1er octobre 2026",
      type: "warning-box",
      bodyHtml: `<p>Le Conseil fédéral a fixé au <strong>1er octobre 2026</strong> l’entrée en vigueur de la révision de la LBA et de la nouvelle LTPM. Le module conserve donc la date comme donnée de contrôle.</p><div class="table-scroll"><table class="learning-table"><thead><tr><th>Jusqu’au 30.09.2026</th><th>Dès le 01.10.2026</th></tr></thead><tbody><tr><td>Appliquer le cadre alors en vigueur et la procédure interne applicable à l’activité réellement exercée.</td><td>Tenir compte de l’extension LBA à certaines activités de conseil à risque, notamment dans la création/structuration de personnes morales, et du nouveau dispositif de transparence.</td></tr><tr><td>Ne pas appliquer rétroactivement un devoir qui n’est pas encore entré en vigueur.</td><td>Ne pas continuer par automatisme avec une checklist antérieure si le service entre dans le nouveau champ.</td></tr></tbody></table></div><div class="callout callout-danger"><strong>Contrôle obligatoire</strong><p>Pour un dossier réel, ouvrir la source officielle valable à la date de l’acte. Une fiche de formation datée ne remplace jamais la vérification du texte et de la procédure du cabinet.</p></div>`
    },
    {
      title: "Ayant droit économique: remonter jusqu’à une personne physique",
      type: "decision",
      bodyHtml: `<p>Le nouveau registre suisse de transparence vise les personnes physiques qui contrôlent les entités soumises. La documentation officielle indique notamment un contrôle lorsqu’une personne détient en fin de compte au moins 25% du capital ou des droits de vote, ou exerce le contrôle par d’autres moyens.</p><ol class="check-list"><li>Partir de l’entité cliente et de ses détenteurs directs.</li><li>Si un détenteur est une autre société, remonter la chaîne.</li><li>Identifier les personnes physiques au sommet du contrôle.</li><li>Examiner également les accords ou autres moyens de contrôle lorsque la simple participation ne raconte pas toute l’histoire.</li><li>Documenter les sources et les zones d’incertitude.</li></ol><p class="small">Le registre de transparence ne doit pas devenir un raccourci remplaçant les autres diligences applicables. Son accès et son usage dépendent du statut de l’organisation et du cadre légal.</p>`
    },
    {
      title: "Profil économique: comprendre avant de comparer",
      bodyHtml: `<p>Un signal d’alerte n’existe qu’en comparaison avec quelque chose. Le dossier doit donc d’abord décrire le profil attendu:</p><ul class="check-list"><li>activité, produits/services et marchés;</li><li>pays habituels, types de clients/fournisseurs et devises;</li><li>ordre de grandeur du chiffre d’affaires et des flux;</li><li>banques et moyens de paiement annoncés;</li><li>personnes autorisées à instruire le cabinet;</li><li>services exacts demandés à la fiduciaire.</li></ul><p>Une opération étrangère, un montant élevé ou une structure holding ne constitue pas en soi une preuve de blanchiment. Le travail TC04 consiste à documenter la cohérence ou l’incohérence et à transmettre les faits.</p>`
    },
    {
      title: "Cas pratique — Northlake Trading Sàrl",
      type: "case-study",
      bodyHtml: `<p>Northlake Trading Sàrl est inscrite à Genève. Le dossier est présenté au cabinet le <strong>5 octobre 2026</strong>. L’activité annoncée est «conseil commercial et mise en relation». Le gérant visible au RC détient 20%. Les 80% restants appartiennent à Baltic Bridge Holdings Ltd. Un document ultérieur montre qu’une personne physique non mentionnée dans le premier e-mail exerce un contrôle indirect par la holding.</p><p>Le client demande d’abord comptabilité, TVA et payroll. Deux jours plus tard, il ajoute: création d’une nouvelle filiale, domiciliation, préparation des documents de structure et exécution régulière de paiements à des fournisseurs depuis un accès bancaire du cabinet. Les relevés disponibles montrent en outre des virements internationaux dont le libellé ne permet pas encore de les rapprocher clairement de l’activité décrite.</p><p>Le learner doit séparer <strong>identité · contrôle · activité · service demandé · flux observés · date · pièces · questions</strong>. Il ne doit ni accepter automatiquement l’extension du mandat, ni écrire «blanchiment» sur la base des seuls signaux.</p>`
    },
    {
      title: "Classer un signal sans accuser",
      type: "warning-box",
      bodyHtml: `<div class="table-scroll"><table class="learning-table"><thead><tr><th>Observation</th><th>Ce que le junior peut écrire</th><th>Ce qu’il ne doit pas conclure seul</th></tr></thead><tbody><tr><td>Contrôle économique différent du signataire présenté</td><td>«Structure de contrôle à clarifier; personne de contrôle indirect identifiée dans la remise 2.»</td><td>«Le signataire est un prête-nom criminel.»</td></tr><tr><td>Flux internationaux difficiles à rapprocher</td><td>«Justificatifs/contreparties insuffisants pour expliquer X mouvements.»</td><td>«Les fonds sont illicites.»</td></tr><tr><td>Demande de paiements par le cabinet</td><td>«Extension de service nécessitant analyse contractuelle et réglementaire avant acceptation.»</td><td>«Le service est forcément interdit.»</td></tr><tr><td>Création/structuration d’une filiale après le 01.10.2026</td><td>«Vérifier l’application du nouveau régime des activités de conseil à risque et la procédure OAR du cabinet.»</td><td>«Toute création de société est automatiquement soumise dans tous les cas.»</td></tr></tbody></table></div>`
    },
    {
      title: "Escalade: rendre la décision facile au responsable",
      bodyHtml: `<p>Une bonne note d’escalade tient sur une structure stable:</p><ol class="check-list"><li><strong>Faits confirmés</strong>: sources, dates, documents.</li><li><strong>Écarts</strong>: incohérences entre profil annoncé et éléments observés.</li><li><strong>Inconnues</strong>: pièces ou explications encore absentes.</li><li><strong>Service</strong>: ce que le client demande exactement au cabinet.</li><li><strong>Date juridique</strong>: règle applicable à la date concernée.</li><li><strong>Décision requise</strong>: accepter, limiter, demander une diligence renforcée, analyser l’assujettissement, ou refuser/suspendre selon la procédure.</li></ol><p>Le junior ne contacte pas spontanément un organisme externe et ne communique pas au client l’existence d’une analyse sensible hors du circuit défini par le cabinet.</p>`
    },
    {
      title: "Correction attendue du cas",
      type: "correction",
      bodyHtml: `<p>La comptabilité courante demandée initialement est distinguée des services ajoutés. L’identité de la Sàrl est confirmée par le RC; la chaîne de contrôle est reconstruite jusqu’à la personne physique pertinente; les 80% détenus via la holding ne sont pas attribués au gérant par défaut. L’activité et les flux restent partiellement inexpliqués: le dossier documente les mouvements concernés et les pièces manquantes.</p><p>La demande de création/structuration de filiale et la demande d’exécution de paiements, formulées après l’entrée en vigueur du nouveau cadre, sont suspendues avant acceptation et soumises au responsable AML/compliance ou à la personne compétente du cabinet. La note ne conclut ni à une infraction ni à une obligation de communication; elle fournit les faits nécessaires à cette décision.</p>`
    },
    {
      title: "Erreurs fréquentes",
      type: "warning-box",
      bodyHtml: `<ul class="check-list"><li>Confondre représentant inscrit au RC et ayant droit économique.</li><li>S’arrêter à une holding sans remonter jusqu’aux personnes physiques.</li><li>Considérer qu’un client étranger ou un virement international est automatiquement suspect.</li><li>Considérer inversement qu’un client suisse connu ne nécessite aucune compréhension économique.</li><li>Cocher «LBA oui/non» au niveau du client sans cartographier le service réellement fourni.</li><li>Appliquer le régime du 01.10.2026 à une opération antérieure sans base transitoire.</li><li>Accepter l’accès bancaire «pour aider» avant analyse du mandat et du périmètre réglementaire.</li><li>Écrire une accusation à la place d’une note factuelle.</li></ul>`
    },
    {
      title: "Repères de notation de la revue pratique",
      type: "decision",
      bodyHtml: `<div class="dimension-grid"><div><strong>0 · Insuffisant</strong><span>Contrôle économique absent, service mal qualifié ou accusation non étayée.</span></div><div><strong>1 · Partiel</strong><span>Identité correcte mais chaîne de contrôle, profil ou date juridique incomplets.</span></div><div><strong>2 · Attendu</strong><span>KYC reprenable, contrôle identifié, signaux factuels et service/date correctement escaladés.</span></div><div><strong>3 · Très bon</strong><span>Le responsable voit immédiatement faits, inconnues, risque, changement de régime et décision à prendre.</span></div></div>`
    }
  ];

  module.artifact = "Dossier KYC et note d’escalade réglementaire.";
  module.artifactHtml = `<div class="artifact-template"><strong>Six livrables obligatoires</strong><p>Fiche identité client · schéma de contrôle/ayant droit économique · profil activité/flux attendus · matrice des services et du périmètre LBA · note signaux/escalade · journal de vérification des sources.</p><p class="small">La note doit séparer faits confirmés, déclarations, hypothèses et inconnues. Aucun vrai nom de client ni donnée bancaire réelle dans l’édition publique.</p></div>`;
  module.artifactNoteMinimumCharacters = 220;
  module.evidenceItems = [
    { id: "client_identity", label: "Fiche identité client et sources datées" },
    { id: "ubo_chart", label: "Schéma de contrôle et ayant(s) droit économique(s)" },
    { id: "business_profile", label: "Profil activité, pays, flux et contreparties attendus" },
    { id: "service_scope", label: "Matrice services demandés / date / analyse de périmètre LBA" },
    { id: "escalation_note", label: "Note factuelle des signaux, inconnues et décision requise" },
    { id: "verification_log", label: "Journal de vérification LBA/LTPM/RC/TranspaReg" }
  ];
  module.reviewRubric = [
    "Identité et gouvernance du client vérifiées avec sources datées",
    "Chaîne de contrôle remontée jusqu’aux personnes physiques pertinentes",
    "Profil économique et flux attendus documentés avant analyse des écarts",
    "Services du cabinet cartographiés séparément avec la bonne date juridique",
    "Signaux décrits factuellement sans accusation ni faux automatisme géographique",
    "Escalade et sources rendent la décision du responsable immédiatement exploitable"
  ];
  module.sourceRefs = ["TC04_SIF_2026", "TC04_SIF_MEASURES", "TC04_LBA", "TC04_LTPM", "TC04_UBO", "TC04_OAR", "TC04_ZEFIX"];

  module.quiz = [
    {
      id: "Q01", domain: "KYC de base",
      q: "Une prestation de tenue comptable n’entre pas automatiquement dans le champ LBA. Quelle conséquence est correcte?",
      choices: ["Aucun contrôle client n’est nécessaire", "Le cabinet doit quand même comprendre identité, gouvernance, activité et mandat; l’assujettissement LBA est une question distincte liée au service concret", "Toute comptabilité est interdite sans affiliation OAR", "Le RC suffit à tout contrôler"],
      answer: 1,
      explain: "Un dossier client sérieux nécessite une compréhension de base même lorsqu’une prestation n’est pas automatiquement soumise à la LBA."
    },
    {
      id: "Q02", domain: "Ayant droit économique",
      q: "Une Sàrl est détenue à 80% par une société étrangère. Quel réflexe est le plus professionnel?",
      choices: ["Considérer la société étrangère comme l’ayant droit économique final", "Attribuer les 80% au gérant suisse", "Remonter la chaîne de propriété/contrôle jusqu’aux personnes physiques pertinentes et documenter les sources", "Ignorer la détention car elle est étrangère"],
      answer: 2,
      explain: "L’objectif est d’identifier les personnes physiques qui contrôlent réellement l’entité, pas de s’arrêter à une personne morale intermédiaire."
    },
    {
      id: "Q03", domain: "Date juridique", critical: true,
      q: "Une activité de conseil potentiellement concernée par le nouveau régime est réalisée le 25 septembre 2026. Quelle approche est correcte?",
      choices: ["Appliquer automatiquement les règles qui entrent en vigueur le 1er octobre 2026", "Vérifier le cadre en vigueur au 25 septembre et les dispositions transitoires; ne pas appliquer rétroactivement le nouveau régime", "Ignorer toute règle LBA avant 2027", "Utiliser la date de facturation si elle est postérieure"],
      answer: 1,
      explain: "La date d’entrée en vigueur est un fait juridique. Le nouveau régime ne doit pas être appliqué mécaniquement à une activité antérieure."
    },
    {
      id: "Q04", domain: "TranspaReg",
      q: "À partir du 1er octobre 2026, quelle affirmation décrit correctement le registre suisse de transparence?",
      choices: ["Il est un registre public librement consultable par tout le monde", "Il remplace le registre du commerce", "Il contient des informations sur les personnes physiques qui contrôlent les entités soumises et son accès est encadré", "Il concerne uniquement les entreprises individuelles"],
      answer: 2,
      explain: "La LTPM crée un registre central des ayants droit économiques des entités concernées; ce n’est pas un registre public général."
    },
    {
      id: "Q05", domain: "Profil économique",
      q: "Pourquoi documenter les pays, contreparties et ordres de grandeur habituels avant de qualifier un flux d’inhabituel?",
      choices: ["Pour disposer d’un profil de référence et comparer les faits observés à l’activité attendue", "Pour interdire les paiements étrangers", "Pour calculer automatiquement la TVA", "Pour remplacer les justificatifs"],
      answer: 0,
      explain: "Un signal d’alerte se comprend par rapport au profil et au contexte; l’internationalité seule ne prouve rien."
    },
    {
      id: "Q06", domain: "Périmètre de service", critical: true,
      q: "Après le 1er octobre 2026, un client de comptabilité demande en plus au cabinet de créer/structurer une nouvelle personne morale et d’organiser sa domiciliation. Quel réflexe vient avant l’acceptation?",
      choices: ["Accepter car le client est déjà connu", "Traiter la demande comme simple extension administrative", "Cartographier précisément l’activité demandée et faire vérifier l’application du nouveau régime LBA/procédure du cabinet avant exécution", "Attendre le bouclement annuel"],
      answer: 2,
      explain: "Le nouveau cadre vise certaines activités de conseil à risque. Le service concret, et non l’étiquette générale du mandat, doit être analysé."
    },
    {
      id: "Q07", domain: "Signaux d’alerte",
      q: "Plusieurs virements internationaux n’ont pas encore de justificatifs suffisants. Quelle formulation convient à une note junior?",
      choices: ["Fonds criminels probables", "Virements internationaux = blanchiment", "Aucun problème si la banque les a exécutés", "X mouvements ne sont pas encore rapprochés de l’activité annoncée; justificatifs et contreparties à clarifier"],
      answer: 3,
      explain: "La note décrit des faits et une lacune documentaire sans transformer un signal en accusation."
    },
    {
      id: "Q08", domain: "Paiements",
      q: "Le client propose de donner au cabinet un accès bancaire pour exécuter régulièrement ses paiements. Quelle première action est correcte?",
      choices: ["Créer l’accès puis analyser", "Suspendre l’extension et escalader mandat, pouvoirs, contrôles et qualification réglementaire avant toute exécution", "Accepter si le client signe un e-mail", "Limiter chaque paiement à CHF 10’000"],
      answer: 1,
      explain: "La possibilité technique d’exécuter un paiement ne remplace ni le mandat, ni les contrôles, ni l’analyse du périmètre LBA."
    },
    {
      id: "Q09", domain: "Escalade", critical: true,
      q: "Le junior observe une structure de contrôle mal expliquée et des flux atypiques. Quelle conduite est la plus défendable?",
      choices: ["Informer le client qu’une communication MROS sera probablement faite", "Publier un commentaire dans le dossier partagé client", "Documenter les faits, préserver les pièces et transmettre selon le circuit AML/compliance sans décider seul d’une accusation ou communication", "Clôturer immédiatement toutes les relations du client"],
      answer: 2,
      explain: "Le junior prépare une escalade factuelle. Les décisions sensibles restent au niveau compétent et suivent la procédure applicable."
    },
    {
      id: "Q10", domain: "Contrôle par d’autres moyens",
      q: "Une personne ne détient que 10% des parts mais un accord lui donne un pouvoir déterminant sur les décisions majeures. Que faut-il faire?",
      choices: ["L’ignorer car elle est sous 25%", "Examiner et documenter le contrôle par d’autres moyens au lieu de regarder uniquement le pourcentage", "La considérer automatiquement comme salariée", "Modifier le RC soi-même"],
      answer: 1,
      explain: "Le contrôle économique peut résulter d’autres moyens que le seul pourcentage de capital ou de votes."
    },
    {
      id: "Q11", domain: "Registre et diligence",
      q: "Une information figure au registre de transparence. Quelle attitude est correcte pour une personne soumise à des diligences?",
      choices: ["Considérer le registre comme une preuve absolue supprimant tout autre contrôle", "Ignorer le registre", "Utiliser l’information dans le cadre autorisé mais conserver les autres vérifications requises et traiter les divergences selon la procédure applicable", "Copier le registre dans un site public"],
      answer: 2,
      explain: "Le registre renforce la transparence mais ne transforme pas toutes les autres diligences en formalité inutile."
    },
    {
      id: "Q12", domain: "Limites professionnelles",
      q: "Quel est le résultat attendu d’un bon TC04?",
      choices: ["Le junior décide seul si le client blanchit de l’argent", "Le junior identifie le client, le contrôle, le profil, le service, les écarts et la date applicable puis escalade au bon niveau", "Le junior refuse tous les clients internationaux", "Le junior vérifie uniquement le passeport du gérant"],
      answer: 1,
      explain: "L’autonomie attendue consiste à préparer une décision fiable et traçable, pas à remplacer la fonction AML/compliance."
    }
  ];

  module.practicalReview = {
    threshold: 80,
    feedbackMinimumCharacters: 80,
    scoreItems: [
      { id: "identity", label: "Identité, RC et gouvernance", max: 15 },
      { id: "ubo", label: "Chaîne de contrôle / ayant droit économique", max: 20 },
      { id: "economic_profile", label: "Profil économique et flux attendus", max: 15 },
      { id: "service_scope", label: "Cartographie des services et date juridique", max: 20 },
      { id: "red_flags", label: "Signaux factuels et pièces manquantes", max: 10 },
      { id: "escalation", label: "Escalade et limites professionnelles", max: 10 },
      { id: "artifact_quality", label: "Qualité, sources et traçabilité", max: 10 }
    ],
    criticalChecks: [
      { id: "ubo_missing", label: "Chaîne de contrôle arrêtée à une personne morale sans justification" },
      { id: "retroactive_rule", label: "Nouveau régime du 01.10.2026 appliqué rétroactivement sans analyse" },
      { id: "service_accepted", label: "Service de paiement/structuration accepté avant analyse du périmètre et validation" },
      { id: "accusation", label: "Signal d’alerte transformé en accusation ou communication sensible décidée par le junior" }
    ],
    anchorGuidance: {
      insufficient: "Contrôle économique absent, service mal qualifié ou accusation non étayée.",
      partial: "Identité correcte mais chaîne de contrôle, profil ou date incomplètes.",
      expected: "KYC reprenable, UBO documenté, service/date qualifiés et escalade factuelle.",
      strong: "Le dossier permet au responsable de décider immédiatement du niveau de diligence et du périmètre accepté."
    }
  };

  module.learnerPackage = {
    files: [
      { label: "Lire en premier", path: "ressources/tc04-apprenant-v1.0/00_LIRE_EN_PREMIER.md" },
      { label: "Cours TC04", path: "ressources/tc04-apprenant-v1.0/01_Cours_TC04.md" },
      { label: "Dossier simulé", path: "ressources/tc04-apprenant-v1.0/02_Dossier_simule_TC04.md" },
      { label: "Fiche identité client", path: "ressources/tc04-apprenant-v1.0/03_Fiche_identite_TC04.csv" },
      { label: "Schéma de contrôle", path: "ressources/tc04-apprenant-v1.0/04_Controle_UBO_TC04.csv" },
      { label: "Profil économique", path: "ressources/tc04-apprenant-v1.0/05_Profil_economique_TC04.csv" },
      { label: "Matrice des services", path: "ressources/tc04-apprenant-v1.0/06_Matrice_services_LBA_TC04.csv" },
      { label: "Note d’escalade", path: "ressources/tc04-apprenant-v1.0/07_Note_escalade_TC04.md" },
      { label: "Journal de vérification", path: "ressources/tc04-apprenant-v1.0/08_Journal_verification_TC04.csv" },
      { label: "Sources et version", path: "ressources/tc04-apprenant-v1.0/09_Sources_et_version.md" }
    ]
  };

  module.masterStandard = {
    version: "1.0",
    basedOn: "TC01 v1.4",
    principle: "Identité → contrôle → activité → service → date → écart → escalade",
    requiredComponents: [
      "distinction KYC interne / champ LBA",
      "transition juridique 01.10.2026",
      "chaîne d’ayant droit économique",
      "profil économique",
      "cartographie du service réel",
      "six livrables",
      "quiz 12 questions / 3 critiques",
      "revue pratique sur 100",
      "quatre erreurs critiques",
      "journal de vérification"
    ]
  };
})();
