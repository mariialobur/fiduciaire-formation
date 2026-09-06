(function(){
  const DATA=window.FIDUCIAIRE_DATA;
  if(!DATA||!DATA.modules||!DATA.modules.TC01)return;
  const module=DATA.modules.TC01;
  const missionPath='ressources/tc01-apprenant-v1.6/00_Mission_TC01_v1.6.html';
  const coursePath='ressources/tc01-apprenant-v1.5/01_Cours_TC01_v1.5.html';
  const zefixPath='ressources/tc01-apprenant-v1.6/01_Zefix_MicroMission_RC.html';
  const ideTvaPath='ressources/tc01-apprenant-v1.6/02_IDE_TVA_MicroMission.html';
  const mandatPath='ressources/tc01-apprenant-v1.6/03_Mandat_MicroMission.html';

  module.contentVersion='1.6';
  module.lessonRevision='1.6-mission';
  module.pedagogicalStatus='TC01 · Mission guidée · RC/IDE/mandat approfondis au bon moment · autonomie-first';
  module.duration='35–45 min mission + pratique réelle + autocontrôle';
  module.beginnerLearningPath=[
    'Recevoir une demande et décider quoi vérifier avant de produire',
    'Identifier une entité réelle dans Zefix et comprendre les champs RC',
    'Comparer statut RC, IDE et TVA à la période traitée',
    'Lire le mandat et classer les demandes',
    'Prendre une décision provisoire sur Remise 1',
    'Mettre à jour le raisonnement avec Remise 2',
    'Produire une note de dossier et un e-mail client',
    'Faire un autocontrôle court puis le challenge final'
  ];

  const baseFiles=module.learnerPackage&&Array.isArray(module.learnerPackage.files)?module.learnerPackage.files:[];
  const keep=baseFiles.filter(file=>![
    'ressources/tc01-apprenant-v1.4/07_Fiche_ouverture_TC01.xlsx',
    'ressources/tc01-apprenant-v1.4/08_Calendrier_TC01.xlsx',
    'ressources/tc01-apprenant-v1.4/09_Registre_hors_mandat_TC01.xlsx',
    'ressources/tc01-apprenant-v1.4/10_Note_decision_TC01.txt',
    'ressources/tc01-apprenant-v1.4/15_Guide_des_livrables_TC01.html',
    'ressources/tc01-apprenant-v1.4/01_Exercice_Zefix_reel_Nestle.html',
    'ressources/tc01-apprenant-v1.4/13_Exercice_IDE_TVA_reel.html'
  ].includes(file.path));
  const priority=[
    {label:'▶ Mission 01 — Pouvez-vous prendre ce dossier?',path:missionPath},
    {label:'Micro-mission RC / Zefix — Nestlé S.A.',path:zefixPath},
    {label:'Micro-mission IDE / TVA — vérifier la période',path:ideTvaPath},
    {label:'Micro-mission Mandat — inclus / à confirmer / hors mandat',path:mandatPath},
    {label:'Cours de référence TC01',path:coursePath},
    {label:'Glossaire fiduciaire débutant',path:'ressources/Glossaire_fiduciaire_debutant.html'}
  ];
  const seen=new Set();
  module.learnerPackage={files:[...priority,...keep].filter(file=>{if(seen.has(file.path))return false;seen.add(file.path);return true;})};

  module.sections=[
    {
      title:'Mission 01 — Pouvez-vous prendre ce dossier?',
      type:'case-study',
      bodyHtml:`<p>Le module commence désormais par une <strong>situation de travail</strong>, pas par une longue lecture. Une demande TVA urgente arrive avec une demande de paie et une proposition de partager un mot de passe ePortal. Vous devez découvrir vous-même ce qu’il faut vérifier, puis les explications apparaissent au moment où elles deviennent utiles.</p><div class="callout"><strong>Objectif</strong><p>Décider jusqu’où le dossier peut avancer en vérifiant l’entité, le RC, l’IDE/TVA, le mandat, les pouvoirs et l’échéance — sans tout escalader et sans inventer ce qui manque.</p></div><p><a class="btn btn-primary" href="${missionPath}" target="_blank" rel="noopener noreferrer">▶ Commencer la Mission 01</a></p>`
    },
    {
      title:'Trois briques à vraiment comprendre: RC, IDE / TVA et mandat',
      type:'decision',
      bodyHtml:`<p>Ces blocs restent volontairement approfondis parce qu’ils sont souvent montrés au travail sans être expliqués. La mission vous y envoie seulement lorsque le besoin apparaît.</p><div class="dimension-grid"><div><strong>RC / Zefix</strong><span>Raison sociale, forme juridique, siège, statut, IDE/UID, fonctions et modes de signature.</span></div><div><strong>IDE / TVA</strong><span>Identité IDE, statut TVA, début/fin d’assujettissement et lecture par rapport à la période réellement traitée.</span></div><div><strong>Mandat</strong><span>Déterminer ce qui est inclus, à confirmer ou hors mandat sans tout bloquer ni accepter silencieusement une nouvelle tâche.</span></div></div><p><a href="${zefixPath}" target="_blank" rel="noopener noreferrer">Micro-mission Zefix / RC →</a> · <a href="${ideTvaPath}" target="_blank" rel="noopener noreferrer">Micro-mission IDE / TVA →</a> · <a href="${mandatPath}" target="_blank" rel="noopener noreferrer">Micro-mission Mandat →</a></p>`
    },
    {
      title:'Référence — seulement si vous voulez revenir sur une notion',
      type:'decision',
      bodyHtml:`<p>Le cours détaillé et le glossaire deviennent des <strong>ressources de référence</strong>, pas des prérequis à lire intégralement avant de commencer.</p><p><a href="${coursePath}" target="_blank" rel="noopener noreferrer">Cours TC01 détaillé →</a> · <a href="ressources/Glossaire_fiduciaire_debutant.html" target="_blank" rel="noopener noreferrer">Glossaire →</a></p>`
    }
  ];

  module.evidenceItems=[
    {id:'dossier_opening',label:'Mission + note de dossier finalisée',help:'Votre synthèse de l’entité, du statut TVA, du mandat, des points ouverts et de la décision. La Mission peut générer cette note en .txt.',templatePath:missionPath},
    {id:'client_email',label:'E-mail client finalisé',help:'Un message court qui demande uniquement les éléments nécessaires pour continuer, sans transmettre toute l’analyse interne.',templatePath:'ressources/tc01-apprenant-v1.4/11_Email_client_TC01.txt'}
  ];
  module.artifactHtml=`<div class="artifact-template"><strong>2 résultats utiles</strong><p>1. Une note de dossier structurée issue de la Mission. 2. Un e-mail client clair. Les contrôles RC, IDE/TVA, mandat et échéances sont intégrés dans la note au lieu d’être recopiés dans plusieurs formulaires.</p></div>`;

  module.quizThresholdCount=7;
  module.quizThreshold=87.5;
  module.criticalQuestionIds=['Q01','Q03','Q05'];
  module.quiz=[
    {id:'Q01',critical:true,domain:'Premier réflexe',q:'Une demande TVA urgente arrive avec une demande de paie supplémentaire. Quelle est la meilleure première action?',choices:['Commencer la TVA pour gagner du temps','Confirmer toutes les demandes au client','Vérifier l’entité, le mandat et les pouvoirs avant de promettre ou transmettre','Tout envoyer immédiatement au responsable'],answer:2,explain:'Le bon réflexe est de faire d’abord les contrôles accessibles. L’autonomie ne signifie ni agir sans cadre ni escalader chaque dossier.'},
    {id:'Q02',domain:'RC / Zefix',q:'Pourquoi une marque ou une adresse e-mail ne suffit-elle pas pour identifier le dossier?',choices:['Parce que seule l’adresse postale compte','Parce qu’il faut identifier l’entité juridique exacte dans une source appropriée','Parce que les marques sont interdites en comptabilité','Parce que Zefix remplace le mandat'],answer:1,explain:'Une marque peut correspondre à plusieurs entités. Le travail comptable et les pouvoirs doivent être rattachés à l’entité juridique exacte.'},
    {id:'Q03',critical:true,domain:'IDE / TVA',q:'Le RC est actif mais la fin d’assujettissement TVA affichée est antérieure à la facture traitée. Que faites-vous?',choices:['Je traite la TVA car la société existe','Je retire moi-même la TVA','Je vérifie l’incohérence avant traitement et je n’invente pas la correction','Je considère automatiquement la facture comme privée'],answer:2,explain:'RC actif et TVA active sont deux informations différentes. La période d’assujettissement doit être cohérente avec la période traitée.'},
    {id:'Q04',domain:'Mandat',q:'Le client demande la paie alors que le mandat signé l’exclut. Quelle qualification est correcte à ce stade?',choices:['Incluse parce que le client vient de la demander','Hors mandat / à clarifier avant de l’accepter','Automatiquement refusée pour toujours','Incluse si le junior sait faire la paie'],answer:1,explain:'Une nouvelle demande n’étend pas silencieusement le mandat. Elle doit être clarifiée ou formalisée selon le fonctionnement du cabinet.'},
    {id:'Q05',critical:true,domain:'Accès',q:'Le client propose de vous envoyer son mot de passe personnel ePortal. Quel réflexe?',choices:['Accepter si c’est urgent','Accepter puis le changer','Refuser ce mode d’accès et utiliser le circuit autorisé','Le transmettre à un collègue'],answer:2,explain:'Un mot de passe personnel partagé n’est pas une solution normale. Il faut utiliser un accès approprié, nominatif et conforme au circuit prévu.'},
    {id:'Q06',domain:'Pièces',q:'Vous disposez d’un extrait RC ancien. Que faut-il en conclure?',choices:['Il suffit tant que le nom est identique','Il prouve la situation actuelle','Il peut servir de pièce historique mais un contrôle actuel reste nécessaire','Il faut supprimer l’ancien extrait'],answer:2,explain:'Un document ancien peut être utile comme historique, mais il ne confirme pas les faits actuels.'},
    {id:'Q07',domain:'Remise 2',q:'Une nouvelle délégation confirme seulement un pouvoir limité. Que faites-vous de votre première analyse?',choices:['Je la supprime et réécris tout','Je conserve la première analyse et documente précisément ce que la nouvelle pièce change','Je considère tous les pouvoirs comme confirmés','Je cesse toute analyse'],answer:1,explain:'La traçabilité consiste à montrer comment de nouveaux faits modifient une décision, pas à faire disparaître le raisonnement précédent.'},
    {id:'Q08',domain:'Décision',q:'Les pièces permettent de préparer la TVA mais l’autorisation de transmission finale reste à confirmer. Quelle décision décrit le mieux la situation?',choices:['GO sans réserve','GO sous conditions','NO-GO définitif','Aucune décision possible'],answer:1,explain:'GO sous conditions permet d’avancer sur les étapes sûres tout en gardant visible la condition qui bloque l’action finale.'}
  ];

  if(module.practicalReview){
    module.practicalReview.scoreItems=[
      {id:'identity_scope',label:'Entité, RC/IDE et pouvoirs correctement compris',max:25},
      {id:'mandate',label:'Mandat et demandes classés sans extension silencieuse',max:25},
      {id:'vat_timing',label:'Statut TVA, période et échéance contrôlés',max:25},
      {id:'decision_comms',label:'Décision et communication client claires et reprenables',max:25}
    ];
    module.practicalReview.threshold=80;
  }
})();