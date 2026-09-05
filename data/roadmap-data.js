(function () {
  const DATA = window.FIDUCIAIRE_DATA;
  if (!DATA) throw new Error("FIDUCIAIRE_DATA doit être chargé avant roadmap-data.js");

  const list = (items, ordered = false) => {
    const tag = ordered ? "ol" : "ul";
    return `<${tag} class="check-list">${items.map((item) => `<li>${item}</li>`).join("")}</${tag}>`;
  };

  const quiz = (q, choices, answer, explain, meta = {}) => Object.assign({ q, choices, answer, explain }, meta);

  const tc01Quiz = [
    quiz(
      "Le 8 juillet, Marc demande un dépôt TVA le lendemain. Le dossier ne contient qu’un ancien extrait RC et aucune délégation. Quelle est la première décision professionnelle?",
      ["Refuser définitivement toute collaboration avec Marc", "Préparer et déposer, puis régulariser les pouvoirs après coup", "Suspendre le dépôt, vérifier RC actuel, délégation et mandat, puis soumettre les faits au responsable", "Demander le login de Nadia afin de respecter le délai annoncé"],
      2,
      "La bonne séquence est vérifier, qualifier et escalader. L’urgence alléguée ne remplace ni les pouvoirs ni le circuit de validation.",
      { id: "Q01", critical: true, domain: "Scénario critique" }
    ),
    quiz(
      "Quelle disposition constitue le point de départ pour déterminer les services promis et les limites du mandat?",
      ["CO 394", "CO 958f", "LPD 24", "LTVA 86"],
      0,
      "L’art. 394 CO rattache l’activité du mandataire aux services convenus; les autres bases règlent d’autres obligations.",
      { id: "Q02", domain: "Application du droit" }
    ),
    quiz(
      "L’extrait RC actuel prévoit une signature collective à deux pour Marc; une délégation interne l’autorise à transmettre des pièces et approuver un projet TVA, mais exclut dépôt et paiements. Quelle lecture est exacte?",
      ["La délégation transforme sa signature collective en signature individuelle pour tous les actes", "Le RC rend la délégation interne sans effet pour toute tâche administrative", "Marc peut déposer la TVA mais pas demander de pièces", "Marc peut agir dans la délégation documentée; dépôt et paiements restent suspendus selon ses limites et le mandat"],
      3,
      "Il faut cumuler les sources et respecter la limite la plus restrictive pour l’acte concerné; aucun document ne donne ici un pouvoir général.",
      { id: "Q03", domain: "Lecture de documents" }
    ),
    quiz(
      "Un paiement est hors mandat, mais Marc transmet un fichier signé et le mot de passe e-banking de Nadia. Quelle réponse est correcte?",
      ["Exécuter si le montant total est inférieur à CHF 10’000", "Refuser le mot de passe, ne pas exécuter et escalader mandat, pouvoirs, double contrôle et périmètre réglementaire", "Importer le fichier sans l’envoyer afin de gagner du temps", "Demander une confirmation orale à un autre salarié"],
      1,
      "Le montant ou la signature du fichier ne corrigent ni l’exclusion contractuelle, ni l’accès non conforme, ni les contrôles requis.",
      { id: "Q04", critical: true, domain: "Scénario critique" }
    ),
    quiz(
      "La paie est hors mandat. Le client propose d’envoyer immédiatement contrats, certificats médicaux et coordonnées privées des salariés. Quel réflexe applique le mieux la LPD?",
      ["Tout collecter car ces données pourraient servir plus tard", "Conserver uniquement les certificats médicaux et refuser les contrats", "Transférer les fichiers vers un compte personnel jusqu’à la décision", "Limiter la collecte aux données nécessaires au périmètre accepté et différer le dossier payroll tant que l’extension n’est pas validée"],
      3,
      "Finalité et proportionnalité imposent de ne pas collecter par anticipation des données personnelles inutiles au mandat actuel.",
      { id: "Q05", domain: "Protection des données" }
    ),
    quiz(
      "Quelle organisation répond le mieux à CO 958f et à l’Olico pour les pièces comptables?",
      ["Conserver uniquement les PDF finaux tant que le logiciel reste actif", "Définir durée, formats, intégrité, lisibilité, accès, sauvegarde et restitution dans une piste documentée", "Imprimer toutes les pièces et supprimer les fichiers sources", "Laisser chaque collaborateur choisir son espace de stockage"],
      1,
      "La conservation doit rester organisée, disponible, lisible et contrôlable pendant la durée applicable.",
      { id: "Q06", domain: "Application du droit" }
    ),
    quiz(
      "Quel ensemble constitue la meilleure preuve des pouvoirs au 9 juillet 2026?",
      ["Extrait RC actuel daté, délégation applicable, mandat et journal de vérification", "Ancien extrait RC et signature figurant dans un e-mail", "Carte bancaire et organigramme commercial", "Déclaration orale du demandeur confirmée par un collègue"],
      0,
      "La preuve combine source publique actuelle, délégation documentée, limites contractuelles et trace de contrôle.",
      { id: "Q07", domain: "Lecture de documents" }
    ),
    quiz(
      "Quelle ligne de calendrier distingue correctement les trois niveaux de date?",
      ["Date client = date légale = date de revue, afin d’éviter les écarts", "Date de dépôt souhaitée par Marc, sans source, puis rappel automatique", "Échéance légale sourcée; remise des pièces au client; production et revue internes avec responsables et dépendances", "Échéance légale seule, car les dates internes n’ont aucune valeur"],
      2,
      "Un calendrier pilotable distingue obligation légale, engagement client et marge interne.",
      { id: "Q08", domain: "Calendrier" }
    ),
    quiz(
      "Pour le T2 2026 clos le 30 juin, le 60e jour tombe le samedi 29 août. Quelle échéance est retenue dans le cas selon LTVA 71/86 et PA 20 al. 3?",
      ["Lundi 31 août 2026", "Vendredi 28 août 2026", "Mardi 1er septembre 2026", "Jeudi 30 juillet 2026"],
      0,
      "Le délai de 60 jours aboutit au 29 août; un terme tombant le samedi est reporté au premier jour ouvrable, ici le 31 août.",
      { id: "Q09", domain: "Calcul de délai" }
    ),
    quiz(
      "Une prolongation de remise du décompte a été demandée dans ePortal. Quelle conclusion peut être inscrite sans autre vérification?",
      ["Le paiement est automatiquement prolongé de la même durée", "Aucune somme ne doit être estimée avant la nouvelle date", "Le mandat autorise désormais le dépôt sans approbation client", "Aucune: remise et paiement doivent être distingués et le statut exact confirmé dans ePortal avant décision"],
      3,
      "Une demande ou prolongation de remise ne permet pas de supposer le report du paiement ni de contourner le circuit contractuel.",
      { id: "Q10", critical: true, domain: "Scénario critique" }
    ),
    quiz(
      "Avant de déposer le dossier client dans un service cloud, quel contrôle est le plus complet?",
      ["Vérifier seulement que le prix du service est prévu au budget", "Vérifier finalité, rôles, contrat de sous-traitance, sécurité, sous-traitants ultérieurs, lieux de traitement et droits d’accès", "Demander au client de renoncer par avance à tous ses droits", "Chiffrer le nom du dossier sans examiner le fournisseur"],
      1,
      "La LPD et les recommandations du PFPDT exigent une analyse du traitement et des garanties, pas un simple choix d’outil.",
      { id: "Q11", domain: "Protection des données" }
    ),
    quiz(
      "Le cabinet envisage d’ajouter l’exécution régulière de paiements pour plusieurs clients. Quelle tâche appartient au junior TC01?",
      ["Décider seul que la LBA ne s’applique jamais aux fiduciaires", "Accepter le service si une procuration bancaire est disponible", "Documenter la demande et l’escalader pour analyse contractuelle, opérationnelle et réglementaire avant toute acceptation", "Créer d’abord les accès, puis demander un avis externe"],
      2,
      "Le junior identifie le signal de risque et transmet; la qualification réglementaire appartient aux personnes compétentes du cabinet.",
      { id: "Q12", domain: "Périmètre réglementaire" }
    ),
    quiz(
      "Une instruction client est claire, mais contredit une exclusion écrite du mandat. Quel traitement est le plus juste?",
      ["L’instruction récente remplace automatiquement le contrat", "Qualifier une extension, vérifier capacité et risques, obtenir validation et accord écrit avant exécution", "Exécuter la moitié de la tâche pour démontrer la faisabilité", "Archiver le message sans répondre afin d’éviter un engagement"],
      1,
      "Une demande peut conduire à une extension, mais pas à une modification silencieuse et rétroactive du périmètre.",
      { id: "Q13", domain: "Instruction ambiguë" }
    ),
    quiz(
      "Après la seconde remise de documents, quelle décision décrit le mieux Léman Atelier Sàrl?",
      ["NO-GO définitif pour l’ensemble du dossier", "GO complet, car le statut TVA et la délégation sont désormais disponibles", "GO sous conditions pour les travaux inclus; dépôt selon circuit, paiements et paie toujours exclus", "GO uniquement pour les paiements, car le risque est désormais documenté"],
      2,
      "Les nouveaux documents résolvent certaines incertitudes mais ne suppriment ni exclusions ni validations prévues au mandat.",
      { id: "Q14", domain: "Décision professionnelle" }
    ),
    quiz(
      "Un tableau contenant des données de salariés est envoyé par erreur au mauvais destinataire. Quelle première séquence est défendable?",
      ["Contenir l’incident, alerter immédiatement le responsable compétent, préserver les faits et lancer l’évaluation prévue par la procédure LPD", "Supprimer l’e-mail du dossier et attendre une éventuelle plainte", "Demander au destinataire de garder le secret sans informer le cabinet", "Informer tous les salariés avant même d’identifier les données concernées"],
      0,
      "L’incident doit être contenu, documenté et évalué rapidement; l’annonce éventuelle dépend ensuite notamment du risque vraisemblablement élevé.",
      { id: "Q15", critical: true, domain: "Scénario critique" }
    ),
    quiz(
      "Le projet TVA est terminé, revu et approuvé par la personne habilitée. Quelle dernière étape conserve une piste de preuve correcte?",
      ["Remplacer les versions intermédiaires par le PDF final", "Déposer depuis n’importe quel compte ePortal disponible", "Noter seulement la date de dépôt dans l’agenda personnel", "Faire déposer par la personne autorisée selon le mandat, puis archiver approbation, version déposée, accusé et date"],
      3,
      "Le dépôt reste un acte contrôlé; la piste relie autorisation, approbation, version effectivement remise et preuve de transmission.",
      { id: "Q16", domain: "Circuit de validation" }
    )
  ];

  const moduleSpecs = {
    TC01: {
      month: 1,
      title: "Mandat fiduciaire, périmètre et responsabilités",
      objective: "Ouvrir un dossier sans commencer une production non cadrée et relier chaque décision à une preuve datée.",
      reflex: "Aucune saisie sensible, déclaration, paie ou opération engageante sans entité, mandat, pouvoirs, accès et échéances suffisamment confirmés.",
      scenario: "Léman Atelier Sàrl demande un dépôt TVA urgent. Le premier lot contient un ancien extrait RC, un mandat qui exclut paie et paiements et un e-mail de Marc dont les pouvoirs ne sont pas établis. Le second lot apporte un RC actuel, une délégation limitée, un extrait IDE/TVA et une simulation ePortal.",
      method: [
        "Vérifier l’entité, les organes, les pouvoirs publiés et la délégation applicable; dater chaque contrôle.",
        "Lire le mandat en six dimensions: entité/période, prestations, fréquence/livrables, validations, données/accès et exclusions/changements.",
        "Constituer un dossier permanent minimal, un inventaire des pièces et un calendrier distinguant date légale, délai client et marge interne.",
        "Classer chaque demande comme incluse, à confirmer, hors mandat ou à escalader avant tout acte sensible.",
        "Limiter la collecte de données au périmètre accepté et appliquer des accès nominatifs, révocables et au moindre privilège.",
        "Préparer une décision GO, GO sous conditions ou NO-GO sans se substituer au responsable de mandat."
      ],
      application: "Traiter le cas en deux remises. Conserver la première analyse, intégrer ensuite les nouveaux documents et expliquer ce qui change ou ne change pas. La date de référence du cas est le 09.07.2026.",
      controls: ["Mandat signé et versionné", "RC, IDE/TVA et délégation recoupés", "Échéance TVA légale distincte des dates client et internes", "Paie et paiements laissés hors mandat", "Aucun mot de passe personnel utilisé", "Collecte de données limitée et incidents escaladés"],
      expected: "Décision attendue après le second lot: GO sous conditions pour les travaux inclus; préparation TVA possible selon le circuit, mais dépôt, paiements et paie restent soumis aux limites documentées. L’échéance légale du cas T2 2026 est le 31.08.2026; une prolongation de remise ne doit pas être assimilée sans preuve à un report du paiement.",
      artifact: "Fiche d’ouverture, calendrier, registre hors mandat, note de décision, e-mail client et feuille de réponses.",
      sources: ["TC01_CO_MANDATE", "TC01_OLICO", "TC01_LPD", "TC01_PFPDT_CLOUD", "TC01_LTVA", "TC01_AFC_PAY_TVA", "TC01_PA", "TC01_LBA", "TC01_OBA", "TC01_FINMA_PAYMENTS", "TC01_ZEFIX", "TC01_IDE"],
      critical: true,
      questions: tc01Quiz
    },
    TC02: {
      month: 1,
      title: "Formes juridiques et séparation patrimoine privé / entreprise",
      objective: "Identifier les conséquences comptables de l’entreprise individuelle, de la Sàrl, de la SA et des organismes sans but lucratif.",
      reflex: "La forme juridique détermine qui possède les actifs, qui supporte les dettes et comment traiter les flux du propriétaire.",
      scenario: "Un entrepreneur passe d’une entreprise individuelle à une Sàrl et continue d’utiliser le même compte bancaire. Des dépenses privées, un salaire de gérant et des factures antérieures à la constitution se mélangent.",
      method: [
        "Confirmer la forme, la date de constitution, l’inscription RC, le capital et les personnes autorisées.",
        "Distinguer fortune commerciale de l’indépendant et patrimoine de la personne morale.",
        "Pour une Sàrl/SA, suivre séparément salaire, remboursements de frais, dividendes et compte courant associé/actionnaire.",
        "Documenter les apports, reprises d’actifs et opérations proches de la date de transformation."
      ],
      application: "Classer douze mouvements entre charge d’entreprise, prélèvement privé, compte courant associé, salaire, apport ou point juridique/fiscal à escalader.",
      controls: ["Date de naissance de l’entité", "Compte bancaire au bon titulaire", "Capital et compte courant justifiés", "Aucun flux privé passé silencieusement en charge"],
      expected: "Un tableau de séparation des flux et une liste des écritures provisoires permettent une revue sans confondre l’entreprise et son propriétaire.",
      artifact: "Matrice forme juridique / traitement des flux du propriétaire.",
      sources: ["ZEFIX_RC", "CO_ACCOUNTING", "LIFD"],
      questions: [
        quiz("Dans une Sàrl, le compte bancaire personnel du gérant est-il un compte de la société?", ["Toujours", "Non, sauf justification d’un flux entre deux patrimoines", "Oui si le gérant détient 100%", "Seulement en fin d’année"], 1, "La personne morale et son associé sont deux sujets distincts."),
        quiz("Un paiement privé par la société doit d’abord être…", ["caché dans les frais généraux", "qualifié et documenté", "déduit fiscalement", "annulé sans trace"], 1, "La qualification précède l’écriture et l’analyse fiscale."),
        quiz("Quel document confirme l’existence et les organes d’une Sàrl?", ["L’extrait RC", "Le relevé de carte", "Le décompte AVS", "La facture fournisseur"], 0, "L’extrait du registre du commerce fait partie du dossier permanent."),
        quiz("Une dépense antérieure à la constitution doit être…", ["toujours ignorée", "toujours comptabilisée en charge", "analysée selon sa nature, son bénéficiaire et les documents de reprise", "automatiquement portée en capital"], 2, "La date et le contexte juridique doivent être examinés.")
      ]
    },
    TC03: {
      month: 1,
      title: "Confidentialité, nLPD et gestion des accès",
      objective: "Traiter les données comptables, fiscales et salariales selon le besoin d’en connaître et signaler un incident sans délai.",
      reflex: "Le fichier le plus pratique à partager n’est pas forcément le fichier que le destinataire est autorisé à recevoir.",
      scenario: "Un client demande d’envoyer le journal des salaires à une adresse privée. Un ancien collaborateur possède encore un accès au logiciel et un tableau contient des données de santé.",
      method: [
        "Identifier la finalité, le destinataire autorisé et les catégories de données avant tout partage.",
        "Appliquer le moindre privilège: accès nominatif, niveau adapté, révocation documentée.",
        "Utiliser le canal approuvé du cabinet et éviter les pièces sensibles dans des messages non sécurisés.",
        "En cas d’erreur d’envoi, perte ou accès indu, préserver les faits et alerter immédiatement la personne responsable."
      ],
      application: "Construire une matrice d’accès pour comptabilité, TVA, salaires, fiscalité et direction. Décider qui peut lire, modifier, exporter ou approuver.",
      controls: ["Destinataire vérifié", "Accès des départs révoqués", "Exports locaux limités", "Incident remonté sans suppression des traces"],
      expected: "La matrice indique le rôle, le besoin, le niveau d’accès, la date de revue et le propriétaire de l’autorisation.",
      artifact: "Matrice des accès et fiche de signalement d’incident.",
      sources: ["NLPD"],
      questions: [
        quiz("Quel principe guide l’attribution d’un accès?", ["Accès maximal par défaut", "Moindre privilège", "Partage par ancienneté", "Accès anonyme"], 1, "L’accès doit correspondre au besoin réel du rôle."),
        quiz("Une pièce salariale doit être envoyée…", ["à toute adresse fournie oralement", "par le canal approuvé à un destinataire autorisé", "dans un groupe de discussion", "sans vérifier le fichier"], 1, "Canal et destinataire doivent être contrôlés."),
        quiz("Après un envoi erroné, le premier réflexe est…", ["effacer toute trace", "attendre une plainte", "alerter selon la procédure d’incident", "renommer le fichier"], 2, "Un incident doit être traité rapidement et traçablement."),
        quiz("Un ancien collaborateur conserve un accès. Ce point est…", ["sans importance", "un risque à corriger immédiatement", "utile pour les archives", "autorisé si le mot de passe est complexe"], 1, "Les droits obsolètes doivent être révoqués.")
      ]
    },
    TC04: {
      month: 1,
      title: "KYC et signaux d’alerte LBA",
      objective: "Reconnaître les situations inhabituelles, comprendre que le champ LBA dépend de l’activité exercée et escalader sans mener seul une enquête.",
      reflex: "Un mandat comptable n’est pas automatiquement une activité d’intermédiaire financier; les flux et services réels doivent être compris.",
      scenario: "Une nouvelle société sans activité claire reçoit de nombreux virements étrangers puis demande au cabinet d’effectuer des paiements à des tiers. L’actionnaire effectif diffère du signataire annoncé.",
      method: [
        "Identifier le client, les personnes qui le contrôlent, l’activité économique et l’origine apparente des flux.",
        "Distinguer tenue de comptabilité et éventuels services relevant d’une activité financière soumise à des obligations supplémentaires.",
        "Comparer activité déclarée, contrats, pays, montants, contreparties et bénéficiaires.",
        "Ne pas alerter le client sur une analyse sensible; transmettre les faits au responsable désigné par le cabinet."
      ],
      application: "Rédiger une note factuelle: faits observés, documents disponibles, incohérences, pièces à demander et motif de l’escalade. Ne formuler ni accusation ni conclusion pénale.",
      controls: ["Ayant droit économique compris", "Activité réelle cohérente", "Flux inhabituels documentés", "Aucune décision sensible prise seul"],
      expected: "La note sépare faits, hypothèses et questions. Le responsable peut décider du niveau de diligence et de l’acceptation du mandat.",
      artifact: "Fiche KYC et note d’escalade factuelle.",
      sources: ["LBA"],
      questions: [
        quiz("Toute tenue de comptabilité est-elle automatiquement soumise à la LBA?", ["Oui", "Non, le champ dépend des activités effectivement exercées", "Seulement en décembre", "Seulement pour les SA"], 1, "La qualification dépend du service réel, pas du seul titre fiduciaire."),
        quiz("Quel élément est un signal d’alerte?", ["Activité documentée et cohérente", "Bénéficiaire effectif différent sans explication", "Facture conforme", "Mandat signé"], 1, "Une incohérence sur le contrôle de l’entité exige clarification."),
        quiz("Le junior doit-il décider seul d’une communication officielle?", ["Oui", "Non, il escalade selon la procédure du cabinet", "Oui si le montant est faible", "Oui si le client insiste"], 1, "Les décisions sensibles relèvent des personnes habilitées."),
        quiz("Une bonne note d’escalade distingue…", ["faits, hypothèses et questions", "rumeurs et opinions", "seulement le montant", "uniquement le nom du client"], 0, "La distinction protège la qualité de l’analyse.")
      ]
    },
    TC05: {
      month: 2,
      title: "Double écriture et lecture des impacts",
      objective: "Passer une écriture équilibrée et expliquer son impact sur actifs, passifs, charges, produits et résultat.",
      reflex: "Avant de choisir les comptes, décrire l’événement économique et ce qui augmente ou diminue.",
      scenario: "Le dossier contient une facture fournisseur, son paiement, un acompte client, un achat privé payé par la société et un remboursement d’emprunt mélangé avec ses intérêts.",
      method: [
        "Identifier les deux éléments affectés et leur catégorie comptable.",
        "Séparer la reconnaissance d’une facture de son règlement.",
        "Séparer capital remboursé, intérêt, frais et éventuelle TVA.",
        "Utiliser un compte d’attente uniquement avec propriétaire, motif et date de résolution."
      ],
      application: "Produire les écritures et une colonne d’impact bilan/résultat pour chaque événement. Expliquer pourquoi le remboursement du capital n’est pas une charge.",
      controls: ["Débit = crédit", "Pièce reliée à l’écriture", "Période correcte", "Compte d’attente suivi et apuré"],
      expected: "Le journal est équilibré et chaque écriture comporte libellé, date, pièce et justification compréhensible par un autre collaborateur.",
      artifact: "Journal d’écritures commenté avec analyse bilan/résultat.",
      sources: ["CO_ACCOUNTING"],
      questions: [
        quiz("Le paiement d’une dette fournisseur…", ["crée une nouvelle charge", "diminue la banque et la dette", "augmente le produit", "augmente le capital"], 1, "La charge a normalement été reconnue à la réception de la facture."),
        quiz("Le remboursement du principal d’un emprunt est…", ["une charge d’intérêt", "une diminution de dette", "un produit", "une immobilisation"], 1, "Seuls les intérêts et frais qualifiés affectent le résultat."),
        quiz("Un compte d’attente est acceptable…", ["sans limite", "avec suivi et résolution documentés", "pour cacher une différence", "uniquement si le solde augmente"], 1, "Un solde d’attente doit avoir un plan d’apurement."),
        quiz("Pourquoi commenter l’impact bilan/résultat?", ["Pour allonger le journal", "Pour vérifier la logique économique", "Pour remplacer la pièce", "Pour éviter l’équilibre"], 1, "La lecture de l’impact détecte de nombreuses erreurs de compte.")
      ]
    },
    TC06: {
      month: 2,
      title: "Plan comptable PME et règles de codification",
      objective: "Adapter un plan comptable au dossier sans créer de comptes redondants ni perdre la lisibilité TVA, salaires et clôture.",
      reflex: "Le numéro de compte sert le reporting et le contrôle; il ne remplace jamais la qualification de l’opération.",
      scenario: "Trois personnes ont créé 86 comptes de charges pour une petite PME. Les comptes TVA mélangent dette, impôt préalable et paiements, tandis que les comptes fournisseurs utilisent des logiques différentes.",
      method: [
        "Partir de la structure bilan/résultat et des besoins du mandat.",
        "Définir une convention écrite: comptes collectifs, sous-comptes, centres, TVA et comptes d’attente.",
        "Conserver la comparabilité d’une période à l’autre et documenter les changements.",
        "Éviter les doublons par fournisseur lorsque l’auxiliaire fournit déjà le détail."
      ],
      application: "Nettoyer un extrait de plan comptable: fusionner les doublons, isoler les comptes de contrôle et proposer une table ancien → nouveau compte.",
      controls: ["Aucun doublon sémantique", "Comptes collectifs non mouvementés manuellement sans motif", "TVA séparée par fonction", "Table de migration conservée"],
      expected: "Le plan est assez détaillé pour contrôler le dossier, mais assez stable pour produire des comparaisons utiles.",
      artifact: "Plan comptable commenté et table de migration.",
      sources: ["CO_ACCOUNTING"],
      questions: [
        quiz("Existe-t-il un numéro de compte unique imposé à toutes les PME suisses?", ["Oui", "Non, la structure doit être cohérente et adaptée", "Seulement pour les charges", "Seulement pour les banques"], 1, "Le plan doit respecter les exigences de présentation et la logique du dossier."),
        quiz("Pourquoi limiter les doublons?", ["Pour réduire la traçabilité", "Pour préserver comparabilité et contrôle", "Pour empêcher toute analyse", "Pour supprimer les pièces"], 1, "Les doublons fragmentent l’information."),
        quiz("Un changement de compte important doit être…", ["silencieux", "documenté dans une table de migration", "effacé", "appliqué seulement à une facture"], 1, "La continuité et l’audit trail doivent être préservés."),
        quiz("Les comptes collectifs clients/fournisseurs sont contrôlés avec…", ["les auxiliaires correspondants", "le capital-actions", "les salaires", "les statistiques web"], 0, "Le total auxiliaire doit concorder avec le grand livre.")
      ]
    },
    TC07: {
      month: 3,
      title: "Achats, ventes, banque et caisse",
      objective: "Traiter un mois courant complet avec pièces, échéances, TVA et séparation des anomalies.",
      reflex: "Une ligne bancaire prouve un paiement, pas automatiquement la nature de la charge ni le droit à la TVA préalable.",
      scenario: "Une PME remet 45 factures, 2 notes de crédit, un relevé bancaire, un export de carte et une caisse. Sept mouvements n’ont pas de pièce et deux factures appartiennent au mois suivant.",
      method: [
        "Contrôler date, fournisseur/client, contre-prestation, devise, TVA et période.",
        "Enregistrer factures et règlements sans doublon; lettrer les postes ouverts.",
        "Traiter notes de crédit et remboursements par référence au document d’origine.",
        "Mettre les anomalies dans une liste de questions avec montant, risque et action."
      ],
      application: "Produire le journal du mois, la liste des pièces manquantes, les postes non lettrés et un rapprochement de caisse. Aucun mouvement inconnu ne doit être forcé dans une charge définitive.",
      controls: ["Séquence des factures", "Doublons", "Dates et devises", "Pièces manquantes quantifiées", "Caisse non négative sans explication"],
      expected: "Le mois est saisissable par lot, réconciliable et accompagné d’un journal des anomalies envoyé au client.",
      artifact: "Dossier mensuel: journal, pièces manquantes et questions client.",
      sources: ["CO_ACCOUNTING", "TVA_RATES"],
      questions: [
        quiz("Un débit bancaire sans facture suffit-il pour déduire l’impôt préalable?", ["Toujours", "Non, le justificatif et les conditions doivent être contrôlés", "Oui si le montant est rond", "Oui pour les cartes"], 1, "Le paiement seul ne documente pas toutes les conditions."),
        quiz("Une note de crédit doit être…", ["ignorée", "reliée à l’opération d’origine", "enregistrée comme capital", "mise en salaire"], 1, "Le lien évite une correction incohérente de charge ou de TVA."),
        quiz("Que faire d’un mouvement matériel non identifié?", ["Choisir une charge au hasard", "Le documenter comme point ouvert et demander la pièce", "Le supprimer", "Le passer en produit"], 1, "L’incertitude doit rester visible."),
        quiz("Le lettrage sert à…", ["rapprocher factures et règlements", "calculer les salaires", "créer le capital", "modifier la devise"], 0, "Le lettrage fiabilise les postes ouverts.")
      ]
    },
    TC08: {
      month: 2,
      title: "Lire bilan, résultat et mouvements",
      objective: "Lire les états financiers avec le grand livre pour détecter incohérences, erreurs de classement et évolutions inhabituelles.",
      reflex: "Un solde plausible isolément peut être incohérent avec les flux, le contrat ou la période précédente.",
      scenario: "Le chiffre d’affaires augmente de 30%, mais la marge brute chute. La caisse devient négative, les débiteurs doublent et une dette TVA apparaît à l’actif.",
      method: [
        "Lire structure, signe et évolution de chaque rubrique significative.",
        "Relier bilan, résultat et flux: vente → débiteur/banque → marge → TVA.",
        "Comparer période, budget et année précédente sur une base homogène.",
        "Ouvrir le grand livre des variations inhabituelles avant de conclure."
      ],
      application: "Annoter dix anomalies dans un bilan comparatif et prioriser celles qui empêchent un décompte TVA ou une clôture fiable.",
      controls: ["Signes anormaux", "Soldes anciens", "Variations sans explication", "Comptes fiscaux/socials dans la bonne classe"],
      expected: "Une revue courte explique le constat, le montant, l’hypothèse, la pièce à obtenir et l’action proposée.",
      artifact: "Revue analytique de bilan et résultat.",
      sources: ["CO_ACCOUNTING"],
      questions: [
        quiz("Une caisse négative est généralement…", ["normale", "un signal à investiguer", "un produit", "une immobilisation"], 1, "La caisse physique ne devrait pas devenir négative sans erreur ou flux manquant."),
        quiz("Une marge qui chute exige d’abord…", ["de modifier le taux TVA", "d’analyser ventes, achats, stocks et classement", "de supprimer des factures", "d’augmenter le capital"], 1, "Plusieurs moteurs peuvent expliquer la variation."),
        quiz("Pourquoi ouvrir le grand livre?", ["Pour vérifier les mouvements derrière le solde", "Pour remplacer le bilan", "Pour calculer l’AVS", "Pour changer la forme juridique"], 0, "Le solde seul ne donne pas l’origine."),
        quiz("Une comparaison utile doit employer…", ["des périodes et périmètres cohérents", "des monnaies différentes sans conversion", "uniquement des pourcentages", "des comptes non rapprochés"], 0, "L’homogénéité est indispensable.")
      ]
    },
    TC09: {
      month: 3,
      title: "Réconciliations et postes ouverts",
      objective: "Réconcilier banque, caisse, clients, fournisseurs, TVA et comptes sociaux avant toute déclaration ou clôture.",
      reflex: "Une déclaration préparée sur des comptes non réconciliés transforme une différence inconnue en erreur déclarée.",
      scenario: "Le solde bancaire comptable diffère de CHF 8’420 du relevé. L’auxiliaire clients ne concorde pas avec le compte collectif et trois paiements sont non lettrés.",
      method: [
        "Fixer une date de réconciliation et obtenir les sources externes correspondantes.",
        "Comparer solde comptable, solde source et éléments de rapprochement identifiés.",
        "Corriger les erreurs confirmées; laisser séparés les éléments en transit légitimes.",
        "Faire signer la réconciliation et reporter les points ouverts avec échéance."
      ],
      application: "Construire un rapprochement bancaire et un contrôle auxiliaire/collectif. Expliquer chaque différence et proposer l’écriture uniquement si la cause est démontrée.",
      controls: ["Date identique", "Total auxiliaire = collectif", "Paiements en transit réels", "Anciennes différences escaladées"],
      expected: "Le solde réconcilié rejoint la source externe; les écarts restants sont identifiés, datés et attribués.",
      artifact: "Pack de réconciliations signé et liste des écarts.",
      sources: ["CO_ACCOUNTING"],
      questions: [
        quiz("Une réconciliation compare…", ["deux soldes sans date", "comptabilité, source externe et écarts identifiés à une même date", "uniquement les factures", "uniquement les paiements"], 1, "La date et la nature des écarts sont essentielles."),
        quiz("Un écart inexpliqué doit-il être forcé dans une charge?", ["Oui", "Non", "Seulement le vendredi", "Seulement sous CHF 1’000"], 1, "Sans cause démontrée, l’écriture serait arbitraire."),
        quiz("Le compte collectif clients concorde avec…", ["l’auxiliaire clients", "la caisse", "le capital", "le registre des salaires"], 0, "Les deux vues doivent aboutir au même total."),
        quiz("Avant une déclaration TVA, les comptes TVA doivent être…", ["ignorés", "réconciliés avec les décomptes et paiements", "soldés en produit", "transférés en capital"], 1, "La continuité entre comptabilité et déclarations doit être démontrée.")
      ]
    },
    TC11: {
      month: 4,
      title: "Qualification TVA: taux, exclusion, exonération et lieu",
      objective: "Qualifier une prestation avant de choisir le taux et documenter les cas où le lieu, l’exclusion ou l’exonération modifie le traitement.",
      reflex: "Le taux n’est que la dernière étape: prestation, lieu, qualité des parties et contre-prestation viennent d’abord.",
      scenario: "Une PME facture du conseil en Suisse, une licence à un client français, une formation, un hébergement et une vente de denrées à emporter.",
      method: [
        "Décrire la prestation et les parties sans reprendre mécaniquement le libellé commercial.",
        "Déterminer le lieu selon la règle applicable.",
        "Vérifier si la prestation est imposable, exclue, exonérée ou hors champ suisse.",
        "Appliquer le taux légal en vigueur et conserver la source datée."
      ],
      application: "Construire une matrice de qualification pour huit recettes avec conclusion, rubrique de décompte, taux éventuel, source et degré de confiance.",
      controls: ["Lieu analysé", "Exclu ≠ exonéré", "Preuve d’export conservée", "Taux vérifié à la période de prestation"],
      expected: "Chaque ligne explique pourquoi le traitement est retenu et quels faits changeraient la conclusion.",
      artifact: "Matrice de qualification TVA des recettes.",
      sources: ["TVA_RATES", "TVA_ASSUJETTISSEMENT"],
      questions: [
        quiz("Quelle étape précède le choix du taux?", ["Choisir 8,1%", "Qualifier la prestation et son lieu", "Calculer le salaire", "Fermer la période"], 1, "Le taux dépend de la qualification."),
        quiz("Exclu et exonéré signifient-ils la même chose?", ["Oui", "Non", "Seulement pour les exports", "Seulement pour les associations"], 1, "Les conséquences, notamment sur l’impôt préalable, diffèrent."),
        quiz("Une exportation exige notamment…", ["une preuve adaptée", "aucun document", "un salaire", "un compte privé"], 0, "L’exonération doit être documentée."),
        quiz("Le taux doit être vérifié…", ["dans une source datée et valable pour la période", "dans une ancienne facture quelconque", "selon l’intuition", "une fois pour toujours"], 0, "Les règles et taux peuvent évoluer.")
      ]
    },
    TC12: {
      month: 5,
      title: "Impôt préalable, affectation et corrections",
      objective: "Déterminer le droit à déduction par affectation directe avant d’utiliser une clé résiduelle et documenter les corrections.",
      reflex: "Le montant de TVA sur la facture n’est pas automatiquement déductible: il faut contrôler forme, destinataire et affectation.",
      scenario: "Une clinique fournit des soins exclus et des prestations esthétiques imposables. Le loyer, l’informatique et la publicité servent différemment les deux activités.",
      method: [
        "Contrôler la facture et l’identité du destinataire.",
        "Affecter directement les charges exclusivement imposables ou exclues.",
        "Appliquer une clé appropriée uniquement aux coûts réellement mixtes.",
        "Documenter consommation privée, subventions, changements d’affectation et autres corrections séparément."
      ],
      application: "Classer quinze factures: déduction intégrale, aucune déduction ou coût mixte. Justifier la clé des coûts mixtes et calculer la correction fournie dans le cas.",
      controls: ["Facture conforme", "Affectation directe prioritaire", "Clé causale et reproductible", "Corrections reliées au ch. du décompte"],
      expected: "Le tableau permet de reproduire le montant revendiqué et montre les hypothèses nécessitant une validation fiscale.",
      artifact: "Tableau d’affectation de l’impôt préalable.",
      sources: ["TVA_RATES", "PORTAIL_AFC_TVA"],
      questions: [
        quiz("Quelle méthode vient avant le prorata général?", ["Affectation directe", "Moyenne arbitraire", "Suppression des factures", "Taux salarial"], 0, "Les coûts directement attribuables sont traités d’abord."),
        quiz("Une charge exclusivement liée à une prestation exclue ouvre-t-elle automatiquement la déduction?", ["Oui", "Non", "Toujours à 50%", "Seulement si payée comptant"], 1, "L’affectation exclue limite en principe le droit."),
        quiz("Une clé de correction doit être…", ["causale, documentée et reproductible", "secrète", "changée chaque mois sans motif", "fondée sur le résultat souhaité"], 0, "La méthode doit refléter l’utilisation."),
        quiz("Le coût mixte doit être identifié…", ["après la déclaration", "avant le calcul de la correction", "uniquement au contrôle AFC", "jamais"], 1, "La qualification précède le calcul.")
      ]
    },
    TC13: {
      month: 5,
      title: "Décompte TVA — méthode effective",
      objective: "Préparer un décompte effectif à partir d’une balance réconciliée, expliquer chaque rubrique et produire une concordance contrôlable.",
      reflex: "Le décompte est la sortie d’une chaîne de qualification et de réconciliation, pas une saisie isolée dans le portail.",
      scenario: "Une PME combine ventes suisses, exportations, prestation B2B à l’étranger, licence SaaS étrangère, notes de crédit et impôt préalable sur investissements.",
      method: [
        "Réconcilier chiffre d’affaires, comptes TVA et période précédente.",
        "Construire le chiffre 200 puis les déductions jusqu’au chiffre 299.",
        "Ventiler les bases imposables par taux et traiter l’impôt sur les acquisitions dans ses rubriques propres.",
        "Réconcilier impôt préalable, corrections et solde à payer/recevoir avant saisie dans le portail."
      ],
      application: "Réaliser les cas du simulateur externe en mode apprentissage, entraînement puis évaluation. La licence étrangère est une charge: elle ne gonfle pas le chiffre d’affaires 200.",
      controls: ["CA mondial réconcilié", "Rubriques 220/221/230/235 documentées", "Acquisitions séparées du CA", "Aperçu type AFC contrôlé"],
      expected: "Un classeur de travail relie balance, matrice de qualification, rubriques, corrections, justificatifs et validation finale.",
      artifact: "Décompte effectif, concordance et capture/export de progression du simulateur.",
      sources: ["PORTAIL_AFC_TVA", "TVA_RATES"],
      questions: [
        quiz("Une licence SaaS étrangère achetée est-elle du chiffre d’affaires du client?", ["Oui", "Non, c’est une acquisition/charge à traiter dans les rubriques prévues", "Toujours une exportation", "Un don"], 1, "Elle n’entre pas au chiffre 200 comme recette."),
        quiz("Le chiffre 200 est construit à partir…", ["du chiffre d’affaires à déclarer selon les règles", "du bénéfice", "des salaires", "du capital"], 0, "Il faut ensuite expliquer les déductions jusqu’au chiffre 299."),
        quiz("Quand préparer l’aperçu du décompte?", ["Avant les réconciliations", "Après qualification et contrôles", "Sans balance", "Uniquement après paiement"], 1, "L’aperçu sert de contrôle final."),
        quiz("Une évaluation fiable dans le simulateur doit être…", ["réussie sans solution affichée", "validée après avoir copié le corrigé", "ignorée", "remplacée par une estimation"], 0, "Le mode évaluation mesure l’autonomie.")
      ]
    },
    TC14: {
      month: 6,
      title: "TDFN, concordance annuelle et contrôle AFC",
      objective: "Préparer un décompte TDFN, contrôler les deux limites cumulatives et constituer une concordance TVA annuelle.",
      reflex: "Le taux légal figure sur la facture; le TDFN confirmé s’applique au chiffre d’affaires brut TVA comprise dans le calcul de la dette.",
      scenario: "Une société exerce deux activités avec deux TDFN confirmés, reçoit une prestation étrangère et dépasse la limite d’impôt calculé sans dépasser la limite de chiffre d’affaires.",
      method: [
        "Vérifier l’autorisation, les activités déclarées et les TDFN confirmés par l’AFC.",
        "Ventiler le chiffre d’affaires brut TVA comprise par activité et appliquer chaque TDFN.",
        "Contrôler séparément chiffre d’affaires et impôt annuel calculé; documenter tout dépassement par période fiscale.",
        "Préparer la concordance annuelle entre comptes de produits, décomptes, corrections et comptes TVA."
      ],
      application: "Terminer les trois cas du simulateur TDFN, y compris le cas multi-activités et le contrôle des limites. Produire ensuite une concordance sur une balance fournie.",
      controls: ["TDFN confirmé", "CA brut TTC", "Deux limites testées", "Impôt préalable non déduit séparément dans le décompte courant", "Acquisitions traitées à part"],
      expected: "Le dossier explique la ventilation, les taux, les dépassements éventuels et les écarts de concordance sans inventer un taux moyen officiel.",
      artifact: "Décompte TDFN, test des limites et concordance annuelle.",
      sources: ["TDFN", "PORTAIL_AFC_TVA"],
      questions: [
        quiz("La base du calcul TDFN courant est généralement…", ["le CA brut TVA comprise par activité", "le bénéfice net", "les achats hors taxe", "la masse salariale"], 0, "Le TDFN confirmé s’applique au CA brut correspondant."),
        quiz("Faut-il contrôler une seule limite?", ["Oui, le CA", "Non, CA et impôt calculé sont cumulatifs", "Oui, le bénéfice", "Oui, les salaires"], 1, "Les deux conditions doivent être examinées."),
        quiz("Avec deux activités, peut-on utiliser un taux moyen comme taux officiel?", ["Oui", "Non, on calcule chaque activité au TDFN confirmé", "Toujours 6,2%", "Uniquement pour les achats"], 1, "Un indicateur moyen éventuel ne remplace pas les taux confirmés."),
        quiz("L’impôt préalable est-il déduit séparément dans le décompte TDFN courant?", ["Oui, toujours", "Non, il est pris en compte forfaitairement, sous réserve des cas spéciaux", "Seulement sur salaires", "Seulement sur banque"], 1, "C’est un principe central de la méthode.")
      ]
    },
    TC15: {
      month: 7,
      title: "Assurances sociales et contrôles payroll",
      objective: "Lire une fiche de taux valable pour la période et distinguer assiette, part employé, part employeur et plafonds/conditions.",
      reflex: "Ne jamais recopier les taux de l’année précédente sans vérifier la période, l’âge, le statut et les contrats d’assurance.",
      scenario: "Une PME engage trois personnes: une salariée à temps partiel, un gérant et une personne proche de la retraite. Les taux LAA et LPP diffèrent du dossier précédent.",
      method: [
        "Constituer le dossier permanent payroll: contrat, identité, domicile, permis, caisse, assurances, LPP et impôt source.",
        "Déterminer pour chaque composante si elle entre dans les salaires déterminants.",
        "Appliquer les taux et limites valables pour le mois, selon les confirmations des institutions.",
        "Séparer retenues employé, charges employeur, dettes envers institutions et net payé."
      ],
      application: "À partir d’une fiche de taux fournie et datée, construire la matrice de calcul de trois salariés. Signaler les données manquantes avant calcul.",
      controls: ["Période du taux", "Assiette par cotisation", "Âge/statut", "Part employé/employeur", "Concordance avec contrats"],
      expected: "La matrice rend chaque taux traçable et évite une fiche de salaire calculée sur des hypothèses silencieuses.",
      artifact: "Fiche de paramétrage payroll par employé.",
      sources: ["AVS_MEMENTOS", "SOCIAL_CHARGES_2026"],
      questions: [
        quiz("Pourquoi dater la fiche de taux?", ["Parce que taux et limites peuvent changer", "Pour décorer le dossier", "Pour remplacer le contrat", "Pour éviter les contrôles"], 0, "La validité temporelle est indispensable."),
        quiz("La part employeur est-elle déduite du net de l’employé?", ["Toujours", "Non, elle constitue une charge patronale distincte", "Seulement pour la banque", "Seulement pour la TVA"], 1, "Les deux parts doivent être séparées."),
        quiz("Avant le premier salaire, il faut notamment…", ["un dossier employé complet", "seulement un IBAN", "seulement le prénom", "aucun contrat"], 0, "Les paramètres dépendent de plusieurs données personnelles et contractuelles."),
        quiz("Un taux LAA d’un autre client peut-il être repris?", ["Oui", "Non, il faut la police/confirmation du client", "Toujours à 1%", "Seulement en janvier"], 1, "Les primes contractuelles peuvent varier.")
      ]
    },
    TC16: {
      month: 7,
      title: "Fiche de salaire, paiement et écritures",
      objective: "Préparer, contrôler et comptabiliser une paie mensuelle simple à partir de paramètres validés.",
      reflex: "Le net à payer, les dettes sociales et les charges patronales doivent être réconciliés ensemble.",
      scenario: "Une employée reçoit salaire mensuel, allocation, remboursement de frais et prime. Le logiciel calcule un net différent du tableau du cabinet.",
      method: [
        "Contrôler données fixes, variables, absences, allocations et frais.",
        "Recalculer brut soumis, retenues, net et charges patronales avec la fiche de taux du dossier.",
        "Comparer le journal de paie au paiement bancaire et aux dettes sociales.",
        "Passer les écritures en séparant salaires bruts, retenues, net et charges employeur."
      ],
      application: "Refaire une fiche simple et expliquer chaque différence avec le logiciel. Toute modification de paramètre doit avoir une pièce et un approbateur.",
      controls: ["Brut contractuel", "Variables approuvées", "Net = paiement", "Dettes sociales réconciliées", "Journal comptable équilibré"],
      expected: "Le pack comprend fiche, contrôle, preuve de paiement et écriture; un autre collaborateur peut reproduire le calcul.",
      artifact: "Pack mensuel de paie et écritures comptables.",
      sources: ["AVS_MEMENTOS", "SOCIAL_CHARGES_2026", "CO_ACCOUNTING"],
      questions: [
        quiz("Le net payé doit concorder avec…", ["le paiement bancaire approuvé", "le chiffre d’affaires", "le capital", "la TVA collectée"], 0, "La paie et le paiement doivent être reliés."),
        quiz("Une prime variable doit être…", ["ajoutée sans preuve", "approuvée et qualifiée", "passée en TVA", "ignorée"], 1, "La variable doit être autorisée et traitée selon sa nature."),
        quiz("Les retenues employé créent généralement…", ["une dette envers les institutions", "un produit", "une immobilisation", "un dividende"], 0, "Elles sont dues jusqu’au paiement aux institutions."),
        quiz("La différence avec le logiciel doit être…", ["effacée", "expliquée avant validation", "forcée dans la banque", "mise en chiffre d’affaires"], 1, "Le contrôle doit résoudre ou escalader l’écart.")
      ]
    },
    TC17: {
      month: 8,
      title: "Bouclement payroll, impôt à la source et certificat de salaire",
      objective: "Réconcilier l’année salariale et préparer les sorties annuelles pour revue, sans confondre certificat de salaire et décompte d’impôt source.",
      reflex: "Les documents annuels reprennent douze mois de paramètres et corrections; ils ne se fabriquent pas uniquement à partir du salaire de décembre.",
      scenario: "Un salarié change de canton, reçoit une voiture de fonction et une correction rétroactive. Les totaux du certificat diffèrent du grand livre et des déclarations sociales.",
      method: [
        "Réconcilier cumul des fiches, journal de paie, grand livre, paiements et déclarations aux institutions.",
        "Contrôler les changements personnels et contractuels à leur date d’effet.",
        "Préparer le certificat de salaire avec avantages et remboursements selon les instructions applicables.",
        "Traiter l’impôt source selon le canton et la situation; escalader les cas transfrontaliers ou atypiques."
      ],
      application: "Construire une table de concordance annuelle par employé et expliquer cinq écarts. Préparer une checklist de certificat sans transmettre le document.",
      controls: ["12 mois complets", "Corrections rétroactives", "Avantages en nature", "Canton/situation familiale", "Totaux = grand livre"],
      expected: "Les sorties annuelles sont préparées, réconciliées et prêtes pour validation par la personne responsable.",
      artifact: "Concordance payroll annuelle et checklist certificat de salaire.",
      sources: ["AVS_MEMENTOS", "SOCIAL_CHARGES_2026", "ACI_VD"],
      questions: [
        quiz("Le certificat de salaire est-il identique au décompte d’impôt source?", ["Oui", "Non", "Seulement pour une Sàrl", "Seulement en janvier"], 1, "Les objets et destinataires diffèrent."),
        quiz("La concordance annuelle compare notamment…", ["fiches, grand livre, paiements et déclarations", "uniquement décembre", "uniquement la banque", "le capital-actions"], 0, "Le contrôle doit couvrir toute la chaîne."),
        quiz("Une voiture de fonction peut-elle nécessiter un traitement sur le certificat?", ["Oui, selon les instructions applicables", "Jamais", "Seulement si rouge", "Uniquement pour la TVA"], 0, "Les avantages en nature doivent être analysés."),
        quiz("Un cas transfrontalier complexe doit être…", ["traité au hasard", "escaladé avec faits et documents", "ignoré", "copié sur un autre employé"], 1, "La compétence et la source appropriées doivent être mobilisées.")
      ]
    },
    TC18: {
      month: 9,
      title: "Immobilisations, acquisitions et cessions",
      objective: "Décider si une dépense est immobilisée, tenir le registre et traiter acquisition/cession avec TVA et résultat de sortie.",
      reflex: "Le seuil interne aide la cohérence, mais la nature, la durée d’utilisation et l’importance restent à analyser.",
      scenario: "Une PME achète une machine, du mobilier, une licence annuelle, des frais d’installation et revend un véhicule encore inscrit au registre.",
      method: [
        "Identifier l’actif contrôlé, l’usage durable et les coûts directement attribuables.",
        "Appliquer la politique de capitalisation validée de manière cohérente.",
        "Créer la fiche immobilisation: date, valeur, catégorie, TVA, durée, méthode, localisation.",
        "À la cession, sortir coût et amortissements, calculer résultat et qualifier la TVA."
      ],
      application: "Classer dix dépenses et construire le mouvement d’une immobilisation vendue. Justifier les frais inclus ou exclus de la valeur d’entrée.",
      controls: ["Facture et propriété", "Mise en service", "Registre = grand livre", "Cession complète", "TVA analysée"],
      expected: "Le registre explique la valeur comptable et permet une vérification physique et fiscale.",
      artifact: "Registre des immobilisations et fiche de cession.",
      sources: ["CO_ACCOUNTING", "TVA_RATES"],
      questions: [
        quiz("Une licence annuelle est-elle automatiquement une immobilisation?", ["Oui", "Non, la durée et la nature doivent être analysées", "Toujours un terrain", "Toujours du capital"], 1, "Toutes les dépenses IT ne créent pas un actif durable."),
        quiz("Le registre doit concorder avec…", ["le grand livre", "uniquement la banque", "les salaires", "le RC"], 0, "Le sous-registre justifie les comptes d’immobilisations."),
        quiz("À la cession, faut-il sortir les amortissements cumulés?", ["Oui", "Non", "Seulement si perte", "Seulement si export"], 0, "La sortie complète permet de calculer le résultat."),
        quiz("Les frais d’installation directement attribuables peuvent-ils faire partie du coût?", ["Potentiellement oui selon l’analyse", "Jamais", "Toujours en salaire", "Toujours en dividende"], 0, "Ils sont analysés avec la mise en état d’utilisation.")
      ]
    },
    TC19: {
      month: 9,
      title: "Amortissements comptables et fiscaux",
      objective: "Construire un tableau d’amortissement et distinguer estimation comptable, pratique fiscale et éventuelle différence à documenter.",
      reflex: "Une limite fiscale n’est pas automatiquement la meilleure estimation comptable de la consommation économique.",
      scenario: "Une machine est utilisée plus vite que prévu; le tableau fiscal applique un taux différent du plan comptable et une immobilisation n’a pas été amortie depuis sa mise en service.",
      method: [
        "Fixer valeur, date de mise en service, durée/méthode comptable et valeur résiduelle.",
        "Calculer l’amortissement comptable de manière systématique et revoir les estimations.",
        "Consulter la pratique fiscale cantonale/fédérale valable pour le dossier.",
        "Documenter les différences et les écritures sans modifier rétroactivement les faits."
      ],
      application: "Préparer un tableau sur trois actifs avec prorata temporis fourni, puis une colonne comptable/fiscale et une note sur les écarts.",
      controls: ["Date de mise en service", "Base correcte", "Méthode constante", "Taux fiscal sourcé", "Valeur nette non négative"],
      expected: "Le tableau permet de reprendre l’ouverture, les acquisitions, amortissements, sorties et clôture sans formule opaque.",
      artifact: "Tableau d’amortissements comptables/fiscaux.",
      sources: ["CO_ACCOUNTING", "ACI_VD", "LIFD"],
      questions: [
        quiz("L’amortissement commence généralement par rapport…", ["à la mise en service", "à la date de paiement uniquement", "au bénéfice souhaité", "au salaire du gérant"], 0, "La disponibilité à l’utilisation est un repère clé."),
        quiz("Le taux fiscal remplace-t-il toujours l’estimation comptable?", ["Oui", "Non", "Seulement pour la TVA", "Seulement pour la banque"], 1, "Les objectifs comptable et fiscal doivent être distingués."),
        quiz("Une méthode doit être appliquée…", ["de façon cohérente et documentée", "au hasard", "sans tableau", "uniquement l’année de l’achat"], 0, "La continuité est un principe de contrôle."),
        quiz("Une valeur nette négative est-elle normale?", ["Oui", "Non, la base et les formules doivent être revues", "Toujours pour les véhicules", "Seulement en perte"], 1, "Un actif ne s’amortit pas en dessous de sa base résiduelle prévue.")
      ]
    },
    TC20: {
      month: 9,
      title: "Transitoires, charges à payer et produits à recevoir",
      objective: "Rattacher charges et produits à la bonne période, documenter l’estimation et organiser la reprise l’année suivante.",
      reflex: "La date de facture n’est pas toujours la période économique de la prestation.",
      scenario: "Des loyers sont payés d’avance, l’électricité de décembre sera facturée en février, un projet livré n’est pas encore facturé et une assurance couvre deux exercices.",
      method: [
        "Identifier la période économique à partir du contrat, de la livraison ou de la consommation.",
        "Distinguer paiement d’avance, charge à payer, produit à recevoir et revenu différé.",
        "Calculer l’estimation avec une base explicite et joindre la pièce.",
        "Prévoir extourne/reprise et contrôle de la facture définitive."
      ],
      application: "Classer huit opérations de cut-off, passer les écritures au 31.12 et préparer le suivi des extournes au 01.01.",
      controls: ["Période économique", "Contrat ou calcul", "TVA traitée selon le fait générateur applicable", "Extourne suivie", "Pas de double charge"],
      expected: "Chaque transitoire comporte compte, montant, période, méthode, pièce, responsable et traitement futur.",
      artifact: "Tableau de cut-off et écritures de clôture/extourne.",
      sources: ["CO_ACCOUNTING"],
      questions: [
        quiz("Un loyer payé pour l’année suivante est généralement…", ["une charge entière de l’année courante", "un actif transitoire pour la part future", "un produit", "un capital"], 1, "La charge doit être rattachée à la période couverte."),
        quiz("Une charge consommée mais non facturée peut nécessiter…", ["une charge à payer", "un dividende", "un apport", "une vente"], 0, "L’absence de facture ne supprime pas le rattachement économique."),
        quiz("Pourquoi suivre l’extourne?", ["Pour éviter doublon ou oubli lors de la facture définitive", "Pour modifier le client", "Pour calculer le RC", "Pour fermer la banque"], 0, "Le cycle doit être contrôlé sur l’exercice suivant."),
        quiz("Une estimation doit être…", ["documentée et raisonnable", "choisie pour obtenir un bénéfice cible", "sans pièce", "identique pour tous les clients"], 0, "La base doit être vérifiable.")
      ]
    },
    TC21: {
      month: 10,
      title: "Provisions, débiteurs douteux et risques",
      objective: "Distinguer dette certaine, charge à payer, provision et correction de valeur sur la base de faits documentés.",
      reflex: "Une provision n’est ni une réserve libre ni un outil pour lisser le bénéfice.",
      scenario: "Un client conteste une facture, un procès est en cours, des garanties produits subsistent et plusieurs débiteurs sont échus depuis plus de 180 jours.",
      method: [
        "Identifier l’événement passé et l’obligation ou perte de valeur probable.",
        "Évaluer le montant avec contrats, correspondance, historique et avis compétent si nécessaire.",
        "Séparer provision pour risque et correction de valeur d’un actif.",
        "Revoir chaque estimation à la clôture et reprendre les montants devenus sans objet."
      ],
      application: "Construire une matrice risque/probabilité/montant/source/décision et proposer les écritures pour quatre situations.",
      controls: ["Événement passé", "Estimation étayée", "Nature correcte", "Revue annuelle", "Impact fiscal séparé"],
      expected: "La décision comptable et la déductibilité fiscale éventuelle sont présentées dans deux colonnes distinctes.",
      artifact: "Matrice de provisions et corrections de valeur.",
      sources: ["CO_ACCOUNTING", "LIFD", "ACI_VD"],
      questions: [
        quiz("Une provision peut-elle servir uniquement à réduire le bénéfice?", ["Oui", "Non", "Seulement une fois", "Seulement pour une SA"], 1, "Elle doit correspondre à un risque ou une obligation documentée."),
        quiz("Un débiteur douteux concerne d’abord…", ["la valeur d’un actif", "le capital-actions", "la TVA sur salaires", "une immobilisation corporelle"], 0, "La recouvrabilité de la créance doit être évaluée."),
        quiz("La décision comptable et fiscale doit-elle être distinguée?", ["Oui", "Non", "Seulement en perte", "Seulement pour la banque"], 0, "La comptabilisation et la déductibilité ne se confondent pas."),
        quiz("Une provision ancienne sans risque actuel doit être…", ["maintenue automatiquement", "réexaminée et reprise si devenue sans objet", "doublée", "transférée en salaire"], 1, "La revue annuelle évite les soldes sans fondement.")
      ]
    },
    TC22: {
      month: 11,
      title: "Fiscalité directe de base: indépendant, Sàrl et SA",
      objective: "Préparer le dossier fiscal et les rapprochements de base, tout en identifiant les sujets qui exigent l’analyse d’un fiscaliste ou d’un senior.",
      reflex: "Le bénéfice comptable est le point de départ, pas nécessairement le bénéfice imposable.",
      scenario: "Une Sàrl comptabilise amende, frais privés, provision non documentée, intérêt au compte courant associé et perte reportée. Un indépendant mélange véhicules privé et commercial.",
      method: [
        "Identifier le contribuable, la période et le canton compétent.",
        "Partir des comptes clôturés et construire les reprises/ajustements avec pièces.",
        "Séparer salaire, dividende, compte courant et prestations à l’actionnaire.",
        "Escalader prestations appréciables en argent, restructurations, international, immobilier et autres sujets sensibles."
      ],
      application: "Préparer une passerelle résultat comptable → résultat fiscal sur dix ajustements et une liste des annexes/pièces pour revue.",
      controls: ["Comptes clôturés", "Reprises sourcées", "Pertes justifiées", "Compte courant analysé", "Canton/période corrects"],
      expected: "Le dossier ne prétend pas trancher les cas complexes; il rend les faits, calculs et questions immédiatement révisables.",
      artifact: "Passerelle fiscale et index des pièces.",
      sources: ["LIFD", "ACI_VD", "CO_ACCOUNTING"],
      questions: [
        quiz("Le résultat comptable est-il toujours égal au résultat imposable?", ["Oui", "Non", "Seulement pour une Sàrl", "Seulement sans TVA"], 1, "Des ajustements fiscaux peuvent être nécessaires."),
        quiz("Un frais privé payé par la société doit être…", ["automatiquement déduit", "qualifié, comptabilisé correctement et analysé fiscalement", "ignoré", "mis en TVA collectée"], 1, "Le traitement actionnaire/associé doit être explicite."),
        quiz("Quel sujet doit être escaladé?", ["Une facture ordinaire", "Une prestation appréciable en argent potentielle", "Un relevé bancaire concordant", "Un lettrage exact"], 1, "Le risque fiscal et de responsabilité est élevé."),
        quiz("Une passerelle fiscale sert à…", ["expliquer les écarts entre résultat comptable et fiscal", "remplacer les comptes", "calculer la paie", "ouvrir le RC"], 0, "Elle assure la traçabilité des ajustements.")
      ]
    },
    TC23: {
      month: 10,
      title: "Clôture annuelle et dossier prêt pour revue",
      objective: "Ordonner et documenter une clôture PME afin que le senior puisse revoir les jugements plutôt que reconstruire le dossier.",
      reflex: "On ne clôture pas compte par compte au hasard: les dépendances imposent une séquence de travail.",
      scenario: "Le client veut ses comptes demain. Banque et auxiliaires ne sont pas réconciliés, la TVA annuelle n’est pas concordée et plusieurs comptes d’attente datent de deux ans.",
      method: [
        "Geler la période et établir la liste des pièces/points ouverts.",
        "Réconcilier liquidités, auxiliaires, TVA, salaires, immobilisations et dettes fiscales/sociales.",
        "Traiter cut-off, stocks/WIP, provisions, impôts et affectation du résultat selon le dossier.",
        "Effectuer revue analytique, contrôle des soldes inhabituels et indexation des feuilles de travail."
      ],
      application: "Piloter une clôture simulée avec 18 anomalies. Classer les anomalies en bloquantes, importantes ou améliorations, puis préparer la note senior.",
      controls: ["Réconciliations signées", "Points ouverts quantifiés", "Écritures de clôture référencées", "Revue analytique", "Version finale verrouillée"],
      expected: "Le dossier contient une checklist, les feuilles de travail, les écritures proposées et une note de synthèse avec décisions attendues.",
      artifact: "Dossier de clôture indexé et note senior.",
      sources: ["CO_ACCOUNTING", "PORTAIL_AFC_TVA", "AVS_MEMENTOS"],
      questions: [
        quiz("Quelle action précède les estimations de clôture?", ["Réconcilier les comptes de base", "Choisir le bénéfice", "Supprimer les écarts", "Fermer le logiciel"], 0, "Les bases doivent être fiables avant les jugements."),
        quiz("Un compte d’attente ancien doit être…", ["ignoré", "analysé, attribué et apuré ou escaladé", "transformé en capital", "doublé"], 1, "Les vieux soldes sont un signal de qualité."),
        quiz("La note senior doit contenir…", ["décisions, montants, risques et pièces", "seulement une phrase", "les mots de passe", "aucun point ouvert"], 0, "Elle doit concentrer la revue."),
        quiz("Pourquoi verrouiller la version finale?", ["Pour éviter des changements non contrôlés après revue", "Pour empêcher l’export", "Pour supprimer l’historique", "Pour modifier les taux"], 0, "La version approuvée doit rester identifiable.")
      ]
    },
    TC24: {
      month: 11,
      title: "Reporting, note client et revue qualité",
      objective: "Transformer les comptes en constats utiles, expliquer les limites de l’analyse et formuler des actions compréhensibles par le client.",
      reflex: "Un bon reporting distingue fait, explication, risque, recommandation et décision attendue.",
      scenario: "Le bénéfice augmente mais la trésorerie baisse, les délais clients se dégradent et la marge varie. Le client demande seulement: «Est-ce que tout va bien?»",
      method: [
        "Valider la qualité des données et définir la période de comparaison.",
        "Choisir peu d’indicateurs reliés au modèle économique: marge, trésorerie, BFR, délais, charges fixes.",
        "Expliquer les moteurs et non seulement les variations.",
        "Formuler actions, propriétaire, échéance et incertitude; soumettre les sujets fiscaux/juridiques au spécialiste."
      ],
      application: "Préparer une note d’une page et un entretien de 10 minutes à partir d’états comparatifs. Chaque message doit être rattaché à un chiffre vérifiable.",
      controls: ["Données réconciliées", "Comparaison homogène", "Causes distinguées des corrélations", "Actions concrètes", "Limites explicites"],
      expected: "Le client comprend ce qui a changé, pourquoi cela compte, ce qu’il doit décider et ce qui reste à confirmer.",
      artifact: "Reporting mensuel et note client d’une page.",
      sources: ["CO_ACCOUNTING"],
      questions: [
        quiz("Une hausse du bénéfice garantit-elle une hausse de trésorerie?", ["Oui", "Non", "Toujours pour une SA", "Seulement avec TVA"], 1, "BFR, investissements et financements peuvent diverger du résultat."),
        quiz("Un indicateur utile doit être…", ["relié à une décision ou un moteur", "choisi pour être joli", "sans source", "différent chaque mois"], 0, "Le reporting doit soutenir l’action."),
        quiz("Une note claire distingue…", ["fait, explication, risque et action", "opinion et rumeur", "uniquement le chiffre", "uniquement le logo"], 0, "Cette structure réduit les malentendus."),
        quiz("Une conclusion fiscale complexe doit être…", ["présentée comme certaine", "soumise à la compétence appropriée", "cachée", "remplacée par un graphique"], 1, "Les limites professionnelles doivent être respectées.")
      ]
    },
    CAP12: {
      month: 12,
      title: "Cas final: gérer un dossier PME courant de bout en bout",
      objective: "Prendre en charge un dossier PME de complexité courante, du contrôle des pièces au reporting, avec une revue senior ciblée et traçable.",
      reflex: "L’autonomie signifie préparer une décision fiable et savoir exactement quand demander une validation.",
      scenario: "Alpina Services Sàrl compte 8 salariés, applique la méthode effective, facture en Suisse et à l’étranger, possède des immobilisations et clôture au 31 décembre. Le dossier contient pièces manquantes, erreurs TVA, ancien compte d’attente, paie corrigée et marge en baisse.",
      method: [
        "Planifier le mandat, les échéances, les accès et les demandes au client.",
        "Traiter et réconcilier un mois complet, puis préparer le décompte TVA et la paie pour revue.",
        "Construire le dossier de clôture: immobilisations, transitoires, provisions, fiscalité de base et revue analytique.",
        "Présenter au senior les décisions, risques et sujets hors compétence, puis intégrer les commentaires."
      ],
      application: "Mission chronométrée en quatre livraisons sur le mois: production mensuelle, TVA/paie, clôture, entretien client. Une seconde version corrigée est obligatoire après revue.",
      controls: ["Aucune pièce silencieusement inventée", "Réconciliations complètes", "Sources datées", "Escalades pertinentes", "Corrections de revue intégrées"],
      expected: "Le responsable peut confier au participant un portefeuille courant avec contrôles ciblés, sans conclure à une qualification professionnelle réglementée ou à l’aptitude aux dossiers complexes.",
      artifact: "Dossier final complet, note senior, reporting client et plan de développement à 90 jours.",
      sources: ["CO_ACCOUNTING", "PORTAIL_AFC_TVA", "AVS_MEMENTOS", "LIFD", "ACI_VD"],
      critical: true,
      questions: [
        quiz("L’autonomie professionnelle consiste notamment à…", ["ne jamais demander d’aide", "produire, contrôler et escalader au bon moment", "décider hors mandat", "ignorer les points ouverts"], 1, "L’escalade ciblée fait partie de l’autonomie."),
        quiz("Une pièce manquante peut-elle être remplacée par une hypothèse silencieuse?", ["Oui", "Non", "Seulement sous CHF 500", "Seulement en TVA"], 1, "L’hypothèse doit rester explicite et validée."),
        quiz("La première version du cas final suffit-elle?", ["Oui", "Non, la version corrigée après revue est obligatoire", "Seulement si le score est bas", "Seulement pour la paie"], 1, "La capacité à intégrer une revue est une compétence clé."),
        quiz("Le parcours donne-t-il automatiquement un titre fédéral?", ["Oui", "Non", "Seulement dans le canton de Vaud", "Seulement avec TDFN"], 1, "Il s’agit d’un parcours interne de compétences, pas d’un diplôme fédéral.")
      ]
    }
  };

  function buildModule(code, spec) {
    const critical = spec.critical !== undefined ? spec.critical : ["TC04", "TC11", "TC12", "TC13", "TC14", "TC15", "TC16", "TC17", "TC20", "TC21", "TC22", "TC23"].includes(code);
    return {
      code,
      track: "tronc-commun",
      title: spec.title,
      status: "blueprint",
      duration: code === "CAP12" ? "4 livraisons · 12–16 h" : "60–90 min + pratique",
      month: spec.month,
      critical,
      objective: spec.objective,
      pedagogicalStatus: `Fiche de cadrage · mois ${spec.month} · contenu à développer au standard TC01`,
      ruAid: `<strong>Réflexe cabinet:</strong> ${spec.reflex}`,
      sections: [
        { title: "Dossier métier", type: "case-study", bodyHtml: `<p>${spec.scenario}</p>` },
        { title: "Méthode de travail", type: "decision", bodyHtml: list(spec.method, true) },
        { title: "Mise en pratique", bodyHtml: `<div class="callout"><p>${spec.application}</p></div>` },
        { title: "Contrôles et seuil d’escalade", type: "warning-box", bodyHtml: list(spec.controls) },
        { title: "Correction attendue", type: "correction", bodyHtml: `<p>${spec.expected}</p>` }
      ],
      artifact: spec.artifact,
      artifactHtml: `<div class="artifact-template"><strong>Livrable à déposer dans le dossier</strong><p>${spec.artifact}</p><p class="small">La note ci-dessous doit contenir au minimum: conclusion, contrôles effectués, montants clés, pièces manquantes et points à valider.</p></div>`,
      reviewRubric: [
        "Traitement fondé sur les pièces et la période correctes",
        "Calculs ou écritures reproductibles",
        "Point incertain explicitement signalé",
        "Source officielle ou procédure interne datée",
        "Livrable exploitable par un autre collaborateur"
      ],
      sourceRefs: spec.sources,
      quiz: spec.questions
    };
  }

  Object.entries(moduleSpecs).forEach(([code, spec]) => {
    if (code === "TC10") return;
    DATA.modules[code] = buildModule(code, spec);
  });

  DATA.modules.TC01 = Object.assign({}, DATA.modules.TC01, {
    status: "core",
    contentVersion: "1.3",
    duration: "3 h guidées + 3 h de pratique + revue",
    pedagogicalStatus: "Paquet pédagogique v1.3 · prêt pour pilote interne · droit et sources revus le 06.08.2026",
    sections: [
      {
        title: "Résultat professionnel attendu",
        type: "decision",
        bodyHtml: `<p>À l’issue du module, l’assistant·e ne devient pas responsable de mandat. La compétence démontrée consiste à préparer l’ouverture d’un dossier PME courant, rendre visibles les informations manquantes, distinguer travaux inclus et hors mandat, puis remettre une décision exploitable à la personne responsable.</p>${list([
          "Identifier l’entité et les personnes habilitées à donner des instructions.",
          "Lire le mandat comme un document opérationnel et non comme une formalité commerciale.",
          "Distinguer échéance officielle, délai client et délai interne.",
          "Classer chaque demande et proposer GO, GO sous conditions ou NO-GO.",
          "Préserver une piste datée des sources, hypothèses, versions et validations."
        ])}`
      },
      {
        title: "Cadre juridique utile au junior",
        bodyHtml: `<div class="table-scroll"><table class="learning-table"><thead><tr><th>Base</th><th>Idée à retenir</th><th>Conséquence dans le dossier</th></tr></thead><tbody>
          <tr><td>CO 394 / 397 / 398 / 400</td><td>Le service promis, les instructions, la diligence et la reddition de compte structurent l’exécution.</td><td>Rapprocher la demande du mandat, documenter les écarts et conserver une piste de décision.</td></tr>
          <tr><td>CO 716a / 810</td><td>Les responsabilités d’organisation comptable et financière des organes ne disparaissent pas par externalisation.</td><td>Séparer clairement ce qui relève du client, du cabinet et du responsable de mandat.</td></tr>
          <tr><td>CO 957 / 957a / 958f et Olico</td><td>La comptabilité et les pièces doivent être complètes, vérifiables, lisibles et conservées selon une organisation maîtrisée.</td><td>Définir source, format, accès, intégrité, restitution et durée de conservation.</td></tr>
          <tr><td>LPD 6–9 / 24</td><td>Finalité, proportionnalité, sécurité, sous-traitance et gestion des incidents s’appliquent dès l’ouverture.</td><td>Ne collecter que les données nécessaires; contenir et escalader tout incident.</td></tr>
          <tr><td>LBA 2 al. 3 let. b · OBA 4 et 7 · pratique FINMA</td><td>Des services de paiement ou de fiducie peuvent nécessiter une qualification réglementaire selon l’activité concrète et son caractère professionnel.</td><td>Le junior suspend l’acceptation du service et transmet les faits à la personne compétente; il ne conclut pas seul à l’assujettissement ou à l’absence d’assujettissement.</td></tr>
        </tbody></table></div>`
      },
      {
        title: "Lire un mandat en six dimensions",
        bodyHtml: `<div class="dimension-grid">
          <div><strong>1 · Entité et période</strong><span>Raison sociale, siège, IDE, exercice, date de début, reprise d’historique.</span></div>
          <div><strong>2 · Prestations incluses</strong><span>Tenue, rapprochements, TVA, paie, clôture, fiscalité, reporting, paiements.</span></div>
          <div><strong>3 · Fréquence et livrables</strong><span>Mensuel, trimestriel, annuel; balance, décompte, fiches, dossier de clôture.</span></div>
          <div><strong>4 · Responsabilités</strong><span>Qui collecte, contrôle, approuve, signe, dépose, paie et conserve.</span></div>
          <div><strong>5 · Données et accès</strong><span>Logiciel, banque, ePortal, stockage, canaux et moindre privilège.</span></div>
          <div><strong>6 · Exclusions et changements</strong><span>Prestations exclues, urgences, extensions, travaux antérieurs et avenants.</span></div>
        </div>`
      },
      {
        title: "Processus d’ouverture en huit étapes",
        type: "decision",
        bodyHtml: list([
          "Vérifier l’existence de l’entité, son siège, ses organes et les pouvoirs publiés; conserver date et source.",
          "Identifier le contact, son rôle et les instructions qu’il peut réellement donner.",
          "Lire la dernière version signée du mandat et relever inclusions, exclusions, fréquence, livrables et validations.",
          "Créer le dossier permanent avec données durables, accès et historique des changements.",
          "Dresser l’inventaire reçu/manquant; attribuer impact, propriétaire et date requise à chaque absence.",
          "Construire un calendrier sourcé avec dépendances et plan d’alerte.",
          "Classer risques et demandes hors mandat; suspendre tout acte sensible insuffisamment autorisé.",
          "Émettre une fiche d’ouverture d’une page et obtenir une validation réelle, datée et traçable."
        ], true)
      },
      {
        title: "Protection des données dès l’ouverture",
        type: "warning-box",
        bodyHtml: `<p>Le périmètre accepté détermine les données nécessaires. Si la paie est exclue, contrats, certificats médicaux ou coordonnées privées des salariés ne sont pas collectés «au cas où». Les accès sont nominatifs, limités au rôle, révisables et révoqués lorsque le besoin disparaît.</p>${list([
          "Cloud: vérifier rôles, contrat, sécurité, sous-traitants ultérieurs et lieux de traitement.",
          "Incident: contenir, alerter, préserver les faits et appliquer la procédure LPD; le junior ne décide pas seul d’une annonce.",
          "Conservation: prévoir intégrité, lisibilité, disponibilité, sauvegarde, retour et suppression contrôlée."
        ])}`
      },
      {
        title: "Instructions, hors mandat et paiements",
        bodyHtml: `<div class="table-scroll"><table class="learning-table"><thead><tr><th>Statut</th><th>Qualification</th><th>Action</th></tr></thead><tbody>
          <tr><td>Inclus</td><td>Prévu clairement et compatible avec les pouvoirs.</td><td>Planifier et exécuter selon le contrôle prévu.</td></tr>
          <tr><td>À confirmer</td><td>Périmètre probable, mais période, livrable ou validation ambiguë.</td><td>Obtenir une confirmation écrite avant l’acte engageant.</td></tr>
          <tr><td>Hors mandat</td><td>Absent ou explicitement exclu.</td><td>Vérifier compétence, capacité, risques, tarification et avenant.</td></tr>
          <tr><td>À escalader</td><td>Risque juridique, fiscal, données sensibles, délai critique ou conflit d’instructions.</td><td>Suspendre l’acte et transmettre les faits au responsable.</td></tr>
        </tbody></table></div><div class="callout callout-danger"><strong>Paiements pour des tiers</strong><p>Une procuration bancaire ne suffit pas. Avant toute acceptation: mandat, pouvoirs, séparation des tâches, double validation, sécurité des accès, politique du cabinet et éventuel régime réglementaire doivent être analysés par la personne compétente.</p></div>`
      },
      {
        title: "Calendrier du cas TVA",
        type: "case-study",
        bodyHtml: `<p>Pour le T2 2026 clos le 30 juin, les art. 71 al. 1 et 86 al. 1 LTVA prévoient en principe remise et paiement dans les 60 jours. Le 60e jour tombe le samedi 29 août; l’art. 20 al. 3 PA reporte le terme au lundi <strong>31 août 2026</strong>.</p><p>Cette échéance légale doit rester séparée de la date souhaitée par le client, de la date limite de remise des pièces, de la revue interne et du dépôt. Une prolongation de remise n’est jamais présentée comme un report automatique du paiement sans confirmation distincte.</p>`
      },
      {
        title: "Cas pratique en deux remises",
        type: "case-study",
        bodyHtml: `<p><strong>Remise 1.</strong> Traiter la fiche client, l’ancien extrait RC, le mandat signé, l’e-mail de Marc et l’inventaire. Produire une première analyse sans consulter la remise 2.</p><p><strong>Remise 2.</strong> Après la relance, intégrer le RC actuel, l’extrait IDE/TVA, la délégation, la simulation ePortal et le calendrier source. Conserver la version initiale et expliquer chaque changement de décision.</p><p><strong>Date de référence fixe:</strong> 09.07.2026. Les alertes du cas ne dépendent jamais de la date réelle d’ouverture de l’application.</p>`
      },
      {
        title: "Correction attendue",
        type: "correction",
        bodyHtml: `<p><strong>GO sous conditions</strong> pour la préparation des travaux inclus. Le projet TVA peut être préparé selon le mandat, mais le dépôt reste soumis au circuit d’approbation et à la personne autorisée. Paie et paiements demeurent exclus. Les données payroll ne sont pas collectées avant une extension acceptée.</p><p>La fiche doit montrer les vérifications RC/IDE, les limites de la délégation, l’échéance TVA du 31.08.2026, les pièces encore manquantes, les dépendances internes et une communication client claire. Aucun mot de passe personnel ni acte engageant ne peut servir à «gagner du temps».</p>`
      },
      {
        title: "Erreurs fréquentes",
        type: "warning-box",
        bodyHtml: list([
          "Commencer parce que le client est pressé, sans conditions de démarrage documentées.",
          "Confondre contact opérationnel, organe inscrit et signataire autorisé.",
          "Supposer que la fiduciaire devient responsable de tout ce que le client externalise.",
          "Utiliser un mot de passe partagé ou un accès non nominatif.",
          "Écrire seulement «pièces manquantes» sans période, impact, propriétaire ni date.",
          "Remplacer silencieusement la première version par la correction du senior."
        ])
      }
    ],
    artifactHtml: `<div class="artifact-template"><strong>Six livrables obligatoires</strong><p>Fiche d’ouverture · calendrier · registre hors mandat · note de décision · e-mail client · feuille de réponses.</p><p class="small">Déposer les fichiers dans le dossier de preuve, puis enregistrer ci-dessous une référence contrôlable pour chaque livrable. Le fichier n’est pas téléversé dans l’application hors ligne.</p></div>`,
    evidenceItems: [
      { id: "opening", label: "Fiche d’ouverture complétée" },
      { id: "calendar", label: "Calendrier des obligations et dépendances" },
      { id: "outscope", label: "Registre des demandes hors mandat" },
      { id: "decision", label: "Note GO / GO sous conditions / NO-GO" },
      { id: "client_email", label: "E-mail client de demande et clarification" },
      { id: "answer_sheet", label: "Feuille de réponses au quiz" }
    ],
    artifactNoteMinimumCharacters: 200,
    reviewRubric: [
      "Entité, pouvoirs, mandat et délégation recoupés avec source et date",
      "Périmètre et exclusions qualifiés sans extension silencieuse",
      "Calendrier TVA exact et dates légale/client/interne séparées",
      "Données, accès et paiements traités selon les seuils d’escalade",
      "Première version, correction et communication client traçables"
    ],
    practicalReview: {
      threshold: 80,
      feedbackMinimumCharacters: 80,
      scoreItems: [
        { id: "entity_authority", label: "Entité, organes et pouvoirs", max: 15 },
        { id: "mandate_scope", label: "Lecture du mandat et périmètre", max: 20 },
        { id: "documents_access", label: "Pièces, accès et dossier permanent", max: 15 },
        { id: "calendar", label: "Calendrier, TVA et dépendances", max: 10 },
        { id: "risk_escalation", label: "Risques, hors mandat et escalade", max: 15 },
        { id: "client_communication", label: "Communication client", max: 10 },
        { id: "artefact_quality", label: "Qualité et traçabilité des livrables", max: 10 },
        { id: "professional_posture", label: "Posture professionnelle", max: 5 }
      ],
      criticalChecks: [
        { id: "credentials", label: "Partage d’un mot de passe ou accès personnel accepté" },
        { id: "payments", label: "Paiement exécuté ou préparé hors mandat sans contrôle" },
        { id: "authority", label: "TVA déposée sans revue, approbation ou déposant autorisé" },
        { id: "payroll", label: "Paie traitée comme incluse ou données payroll collectées inutilement" }
      ]
    },
    quizThresholdCount: 14,
    criticalQuestionIds: ["Q01", "Q04", "Q10", "Q15"],
    learnerPackage: {
      zip: "ressources/tc01-apprenant-v1.3.zip",
      files: [
        { label: "Cours de référence", path: "ressources/tc01-apprenant-v1.3/01_Cours_TC01.docx" },
        { label: "Dossier apprenant", path: "ressources/tc01-apprenant-v1.3/02_Dossier_apprenant_TC01.docx" },
        { label: "Outils Excel", path: "ressources/tc01-apprenant-v1.3/04_Outils_TC01_apprenant.xlsx" },
        { label: "Protocole des deux remises", path: "ressources/tc01-apprenant-v1.3/Dossier_simule/00_Protocole_de_remise.md" }
      ]
    }
  });

  DATA.modules.TC10 = Object.assign({}, DATA.modules.TC10, {
    status: "blueprint",
    month: 4,
    pedagogicalStatus: "Fiche de cadrage · mois 4 · contenu à développer au standard TC01",
    duration: "75–90 min + pratique"
  });

  DATA.modules.CAP12 = buildModule("CAP12", moduleSpecs.CAP12);
  DATA.settings.programVersion = "2.4-public-pilot-tc01";
  DATA.settings.standardPassScore = 80;
  DATA.settings.criticalPassScore = 85;
  DATA.settings.artifactMinimumCharacters = 120;
  DATA.settings.monthEvidenceMinimumCharacters = 120;
  DATA.settings.reviewerFeedbackMinimumCharacters = 80;

  const sources = DATA.sourcesRegistry.sources;
  sources.TVA_EFFECTIVE_TRAINER = {
    sourceName: "Entraînement TVA — méthode effective (ressource externe)",
    url: "https://mariialobur.github.io/tva-debutant/",
    lastChecked: "2026-08-04",
    usedIn: ["TC13"],
    reviewFrequency: "before-use"
  };
  sources.TDFN_TRAINER = {
    sourceName: "Entraînement TVA — méthode TDFN (ressource externe)",
    url: "https://mariialobur.github.io/tva-tdfn/",
    lastChecked: "2026-08-04",
    usedIn: ["TC14"],
    reviewFrequency: "before-use"
  };
  sources.TC01_CO_MANDATE = {
    sourceName: "Code des obligations (CO; RS 220) — mandat, organes et comptabilité",
    url: "https://www.fedlex.admin.ch/eli/cc/27/317_321_377/fr",
    lastChecked: "2026-08-06",
    usedIn: ["TC01"],
    reviewFrequency: "before-use",
    articles: "394, 397, 398, 400, 716a al. 1 ch. 3, 810 al. 2 ch. 3, 957, 957a, 958f"
  };
  sources.TC01_OLICO = {
    sourceName: "Olico (RS 221.431) — tenue et conservation des livres de comptes",
    url: "https://www.fedlex.admin.ch/eli/cc/2002/216/fr",
    lastChecked: "2026-08-06",
    usedIn: ["TC01"],
    reviewFrequency: "before-use",
    articles: "2 à 10"
  };
  sources.TC01_LPD = {
    sourceName: "Loi fédérale sur la protection des données (LPD; RS 235.1)",
    url: "https://www.fedlex.admin.ch/eli/cc/2022/491/fr",
    lastChecked: "2026-08-06",
    usedIn: ["TC01"],
    reviewFrequency: "before-use",
    articles: "6 à 9 et 24"
  };
  sources.TC01_PFPDT_CLOUD = {
    sourceName: "PFPDT — traitement de données dans un nuage informatique",
    url: "https://www.edoeb.admin.ch/fr/traitement-de-donnees-dans-un-nuage-informatique",
    lastChecked: "2026-08-06",
    usedIn: ["TC01"],
    reviewFrequency: "before-use"
  };
  sources.TC01_LTVA = {
    sourceName: "Loi fédérale régissant la TVA (LTVA; RS 641.20)",
    url: "https://www.fedlex.admin.ch/eli/cc/2009/615/fr",
    lastChecked: "2026-08-06",
    usedIn: ["TC01"],
    reviewFrequency: "before-use",
    articles: "71 al. 1 et 86 al. 1"
  };
  sources.TC01_AFC_PAY_TVA = {
    sourceName: "AFC — payer la TVA: remise, paiement et délais",
    url: "https://www.estv.admin.ch/fr/payer-la-tva",
    lastChecked: "2026-08-06",
    usedIn: ["TC01"],
    reviewFrequency: "before-use"
  };
  sources.TC01_PA = {
    sourceName: "Loi fédérale sur la procédure administrative (PA; RS 172.021)",
    url: "https://www.fedlex.admin.ch/eli/cc/1969/737_757_755/fr",
    lastChecked: "2026-08-06",
    usedIn: ["TC01"],
    reviewFrequency: "before-use",
    articles: "20 al. 3"
  };
  sources.TC01_LBA = {
    sourceName: "Loi sur le blanchiment d’argent (LBA; RS 955.0)",
    url: "https://www.fedlex.admin.ch/eli/cc/1998/892_892_892/fr",
    lastChecked: "2026-08-06",
    usedIn: ["TC01"],
    reviewFrequency: "before-use",
    articles: "art. 2 al. 3 let. b; qualification à confirmer selon l’activité concrète"
  };
  sources.TC01_OBA = {
    sourceName: "Ordonnance sur le blanchiment d’argent (OBA; RS 955.01)",
    url: "https://www.fedlex.admin.ch/eli/cc/2015/791/fr",
    lastChecked: "2026-08-06",
    usedIn: ["TC01"],
    reviewFrequency: "before-use",
    articles: "art. 4 et 7; trafic des paiements et critères généraux de professionnalité"
  };
  sources.TC01_FINMA_PAYMENTS = {
    sourceName: "FINMA — FinTech: services fiduciaires et trafic des paiements",
    url: "https://www.finma.ch/fr/autorisation/fintech/",
    lastChecked: "2026-08-06",
    usedIn: ["TC01"],
    reviewFrequency: "before-use",
    articles: "orientation actuelle FINMA; Circulaire 2011/1 référencée par FINMA"
  };
  sources.TC01_ZEFIX = {
    sourceName: "Zefix — Index central des raisons de commerce",
    url: "https://www.zefix.admin.ch",
    lastChecked: "2026-08-06",
    usedIn: ["TC01"],
    reviewFrequency: "per-file"
  };
  sources.TC01_IDE = {
    sourceName: "Registre IDE — Office fédéral de la statistique",
    url: "https://www.uid.admin.ch",
    lastChecked: "2026-08-06",
    usedIn: ["TC01"],
    reviewFrequency: "per-file"
  };
  Object.values(sources).forEach((source) => {
    if (String(source.lastChecked || "").startsWith("à vérifier")) {
      source.lastChecked = "Vérification juridique requise avant utilisation";
    }
  });

  const months = [
    {
      month: 1,
      phase: "Phase 1 · Sécuriser",
      title: "Entrer dans un dossier fiduciaire",
      level: "Observation guidée",
      modules: ["TC01", "TC02", "TC03", "TC04"],
      promise: "Ouvrir un mandat, comprendre l’entité et reconnaître ce qui ne doit pas être traité seul.",
      practice: [
        "Ouvrir un dossier permanent anonymisé avec checklist complète",
        "Préparer une matrice d’accès et faire corriger les droits obsolètes",
        "Rédiger une demande de pièces claire et priorisée"
      ],
      deliverables: ["Fiche d’ouverture", "Matrice d’accès", "Note KYC/escalade"],
      gate: "Le responsable confirme que le participant peut préparer l’ouverture d’un mandat sans exposer le cabinet à un risque évitable."
    },
    {
      month: 2,
      phase: "Phase 1 · Sécuriser",
      title: "Comprendre les comptes avant de saisir",
      level: "Exécution avec checklist",
      modules: ["TC05", "TC06", "TC08"],
      promise: "Passer des écritures équilibrées, lire leur impact et utiliser un plan comptable cohérent.",
      practice: ["Corriger 20 écritures mal classées", "Nettoyer un plan comptable test", "Présenter cinq anomalies de bilan au senior"],
      deliverables: ["Journal commenté", "Table de migration", "Revue analytique initiale"],
      gate: "Au moins 90% des écritures courantes sont correctement qualifiées; aucune correction silencieuse de point matériel."
    },
    {
      month: 3,
      phase: "Phase 1 · Sécuriser",
      title: "Produire un mois comptable fiable",
      level: "Exécution avec checklist",
      modules: ["TC07", "TC09"],
      promise: "Traiter achats, ventes, banque et caisse puis réconcilier les postes clés.",
      practice: ["Traiter un mois complet sur dossier anonymisé", "Réconcilier banque, caisse, clients et fournisseurs", "Envoyer une liste de questions client révisée"],
      deliverables: ["Pack mensuel", "Réconciliations", "Liste des points ouverts"],
      gate: "Le mois peut être repris par un autre collaborateur sans reconstruire les rapprochements."
    },
    {
      month: 4,
      phase: "Phase 2 · Déclarer",
      title: "Qualifier la TVA",
      level: "Préparation pour revue",
      modules: ["TC10", "TC11"],
      promise: "Déterminer assujettissement, lieu, exclusion/exonération et taux sans automatisme dangereux.",
      practice: ["Qualifier 15 recettes de trois secteurs", "Préparer une note d’assujettissement", "Faire valider deux cas limites"],
      deliverables: ["Matrice TVA", "Note d’assujettissement", "Journal des décisions"],
      gate: "Toutes les conclusions sont reliées à des faits, une période et une source officielle."
    },
    {
      month: 5,
      phase: "Phase 2 · Déclarer",
      title: "Préparer un décompte TVA effectif",
      level: "Préparation pour revue",
      modules: ["TC12", "TC13"],
      promise: "Produire le décompte à partir d’une balance réconciliée et documenter l’impôt préalable.",
      practice: ["Terminer les 12 cas du simulateur en mode évaluation", "Préparer une concordance CA → décompte", "Présenter un dossier TVA complet au senior"],
      deliverables: ["Décompte effectif", "Tableau d’impôt préalable", "Preuve de progression du simulateur"],
      external: [{
        title: "Entraînement TVA — méthode effective",
        url: "https://mariialobur.github.io/tva-debutant/",
        requirement: "12 cas tentés en évaluation; objectif 100% sans solution affichée, avec reprise documentée de chaque erreur."
      }],
      gate: "Le senior confirme rubriques, concordance, acquisitions, corrections et justification de l’impôt préalable."
    },
    {
      month: 6,
      phase: "Phase 2 · Déclarer",
      title: "Maîtriser la méthode TDFN et la concordance",
      level: "Préparation pour revue",
      modules: ["TC14"],
      promise: "Calculer par activité, contrôler les limites et préparer une concordance annuelle.",
      practice: ["Terminer les trois cas TDFN", "Tester les deux limites sur trois scénarios", "Réconcilier une année TVA simulée"],
      deliverables: ["Décompte TDFN", "Test d’admissibilité", "Concordance annuelle"],
      external: [{
        title: "Entraînement TVA — méthode TDFN",
        url: "https://mariialobur.github.io/tva-tdfn/",
        requirement: "3 cas terminés, cas multi-activités expliqué et contrôle des deux limites validé."
      }],
      gate: "Aucun taux moyen présenté comme officiel; les activités, acquisitions et dépassements sont traités séparément."
    },
    {
      month: 7,
      phase: "Phase 3 · Contrôler",
      title: "Produire une paie mensuelle simple",
      level: "Préparation pour revue",
      modules: ["TC15", "TC16"],
      promise: "Paramétrer, calculer, payer et comptabiliser une paie simple avec taux datés.",
      practice: ["Préparer trois fiches sur une fiche de taux fournie", "Réconcilier journal de paie et banque", "Corriger un paramétrage erroné avec trace"],
      deliverables: ["Fiche de paramétrage", "Pack paie", "Écritures sociales"],
      gate: "Le responsable confirme le calcul et la traçabilité; les cas hors standard sont correctement escaladés."
    },
    {
      month: 8,
      phase: "Phase 3 · Contrôler",
      title: "Boucler l’année salariale",
      level: "Préparation pour revue",
      modules: ["TC17"],
      promise: "Réconcilier les cumuls et préparer certificat de salaire et impôt source pour validation.",
      practice: ["Réconcilier douze mois pour deux employés", "Contrôler un avantage en nature", "Préparer une checklist de changement cantonal"],
      deliverables: ["Concordance annuelle", "Checklist certificat", "Note d’escalade payroll"],
      gate: "Les sorties annuelles concordent avec fiches, grand livre, paiements et déclarations."
    },
    {
      month: 9,
      phase: "Phase 3 · Contrôler",
      title: "Préparer les écritures de clôture",
      level: "Autonomie sur travaux courants",
      modules: ["TC18", "TC19", "TC20"],
      promise: "Tenir les immobilisations, amortissements et cut-off avec feuilles de travail reproductibles.",
      practice: ["Mettre à jour un registre d’immobilisations", "Préparer un tableau d’amortissement", "Passer et extourner dix transitoires"],
      deliverables: ["Registre", "Tableau d’amortissement", "Tableau de cut-off"],
      gate: "Les soldes de clôture rejoignent le grand livre et chaque estimation comporte une base contrôlable."
    },
    {
      month: 10,
      phase: "Phase 4 · Piloter",
      title: "Clôturer un dossier PME courant",
      level: "Autonomie avec revue ciblée",
      modules: ["TC21", "TC23"],
      promise: "Piloter la checklist, documenter les jugements et livrer un dossier prêt pour senior.",
      practice: ["Traiter un dossier avec 18 anomalies", "Préparer la matrice des provisions", "Organiser une revue senior de 30 minutes"],
      deliverables: ["Dossier de clôture", "Matrice de risques", "Note senior"],
      gate: "La revue porte sur les jugements et non sur la reconstruction du dossier."
    },
    {
      month: 11,
      phase: "Phase 4 · Piloter",
      title: "Préparer fiscalité et reporting client",
      level: "Autonomie avec revue ciblée",
      modules: ["TC22", "TC24"],
      promise: "Construire la passerelle fiscale de base et expliquer les comptes sans dépasser son champ de compétence.",
      practice: ["Préparer dix ajustements fiscaux", "Créer un reporting d’une page", "Conduire une simulation d’entretien client"],
      deliverables: ["Passerelle fiscale", "Index des pièces", "Reporting et note client"],
      gate: "Le responsable valide les reprises et la communication; les sujets complexes sont orientés vers le bon spécialiste."
    },
    {
      month: 12,
      phase: "Phase 4 · Piloter",
      title: "Démontrer l’autonomie sur un dossier complet",
      level: "Comptable sur dossiers courants",
      modules: ["CAP12"],
      promise: "Gérer un dossier courant de bout en bout, intégrer la revue et définir les limites de délégation.",
      practice: ["Livrer les quatre étapes du cas final", "Intégrer une seconde version après revue", "Présenter un plan de portefeuille et de contrôle à 90 jours"],
      deliverables: ["Dossier final", "Version corrigée", "Entretien client", "Plan de développement"],
      gate: "Décision écrite du responsable: autonome, autonome avec limites, ou prolongation ciblée. Aucun titre fédéral n’est délivré."
    }
  ];

  window.FIDUCIAIRE_ROADMAP = {
    version: "2.4",
    updatedAt: "2026-09-05",
    title: "Parcours 12 mois · assistant·e comptable vers comptable",
    target: "Autonomie sur dossiers PME courants, sous revue ciblée",
    coreModules: months.flatMap((month) => month.modules),
    months,
    levels: [
      { range: "Mois 1–3", title: "Assistant·e encadré·e", description: "Exécute avec checklist, documente les anomalies et réconcilie les bases." },
      { range: "Mois 4–6", title: "Préparateur·rice TVA", description: "Qualifie et prépare les décomptes pour revue, sans valider seul les cas sensibles." },
      { range: "Mois 7–9", title: "Collaborateur·rice comptable", description: "Prépare paie courante et écritures de clôture avec feuilles de travail." },
      { range: "Mois 10–12", title: "Comptable dossiers courants", description: "Pilote la clôture, le reporting et la relation de production avec revue ciblée." }
    ],
    exclusions: [
      "Conseil fiscal complexe, restructurations et planification internationale",
      "Consolidation, audit, expertise et évaluations d’entreprise",
      "Décisions LBA réservées aux personnes compétentes du cabinet",
      "Dossiers payroll transfrontaliers ou contentieux sans validation spécialisée",
      "Signature ou dépôt lorsque le mandat ou la délégation ne l’autorise pas"
    ]
  };
})();
