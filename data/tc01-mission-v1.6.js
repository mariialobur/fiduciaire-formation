(function(){
  const DATA=window.FIDUCIAIRE_DATA;
  if(!DATA||!DATA.modules||!DATA.modules.TC01)return;
  const module=DATA.modules.TC01;
  const missionPath='ressources/tc01-apprenant-v1.7/00_Mission_TC01_v1.7.html';
  const finalPath='ressources/tc01-apprenant-v1.8/06_Finalisation_Note_Autocontrole.html';
  const coursePath='ressources/tc01-apprenant-v1.5/01_Cours_TC01_v1.5.html';
  const zefixPath='ressources/tc01-apprenant-v1.6/01_Zefix_MicroMission_RC.html';
  const ideTvaPath='ressources/tc01-apprenant-v1.6/02_IDE_TVA_MicroMission.html';
  const mandatPath='ressources/tc01-apprenant-v1.6/03_Mandat_MicroMission.html';
  const remise1Path='ressources/tc01-apprenant-v1.6/04_Remise1_PremiereDecision.html';
  const remise2Path='ressources/tc01-apprenant-v1.6/05_Remise2_MiseAJourDecision.html';

  module.contentVersion='1.8';
  module.lessonRevision='1.8-final';
  module.pedagogicalStatus='TC01 · Mission de travail finalisée · 1 note de dossier · autocontrôle court · challenge situationnel';
  module.duration='45–60 min au total, pratique réelle comprise';
  module.beginnerLearningPath=[
    'Recevoir une demande et décider quoi vérifier avant de produire',
    'Identifier une entité réelle dans Zefix et comprendre les champs RC',
    'Comparer statut RC, IDE et TVA à la période traitée',
    'Lire le mandat et classer les demandes sans extension silencieuse',
    'Prendre une décision provisoire sur Remise 1',
    'Mettre à jour le raisonnement avec Remise 2 sans effacer l’historique',
    'Produire une seule note de dossier courte et reprenable',
    'Se relire sur 4 critères et passer un challenge de 8 situations'
  ];

  const baseFiles=module.learnerPackage&&Array.isArray(module.learnerPackage.files)?module.learnerPackage.files:[];
  const obsolete=new Set([
    'ressources/tc01-apprenant-v1.4/07_Fiche_ouverture_TC01.xlsx',
    'ressources/tc01-apprenant-v1.4/08_Calendrier_TC01.xlsx',
    'ressources/tc01-apprenant-v1.4/09_Registre_hors_mandat_TC01.xlsx',
    'ressources/tc01-apprenant-v1.4/10_Note_decision_TC01.txt',
    'ressources/tc01-apprenant-v1.4/11_Email_client_TC01.txt',
    'ressources/tc01-apprenant-v1.4/15_Guide_des_livrables_TC01.html',
    'ressources/tc01-apprenant-v1.4/01_Exercice_Zefix_reel_Nestle.html',
    'ressources/tc01-apprenant-v1.4/13_Exercice_IDE_TVA_reel.html',
    'ressources/tc01-apprenant-v1.6/00_Mission_TC01_v1.6.html'
  ]);
  const keep=baseFiles.filter(file=>!obsolete.has(file.path));
  const priority=[
    {label:'▶ Mission 01 — Pouvez-vous prendre ce dossier?',path:missionPath},
    {label:'Micro-mission RC / Zefix — Nestlé S.A.',path:zefixPath},
    {label:'Micro-mission IDE / TVA — vérifier la période',path:ideTvaPath},
    {label:'Micro-mission Mandat — inclus / à confirmer / hors mandat',path:mandatPath},
    {label:'Micro-mission Remise 1 — première décision',path:remise1Path},
    {label:'Micro-mission Remise 2 — mettre à jour la décision',path:remise2Path},
    {label:'Finalisation — note de dossier + autocontrôle',path:finalPath},
    {label:'Cours de référence TC01',path:coursePath},
    {label:'Glossaire fiduciaire débutant',path:'ressources/Glossaire_fiduciaire_debutant.html'}
  ];
  const seen=new Set();
  module.learnerPackage={files:[...priority,...keep].filter(file=>{if(seen.has(file.path))return false;seen.add(file.path);return true;})};

  module.sections=[
    {
      title:'Mission 01 — Pouvez-vous prendre ce dossier?',
      type:'case-study',
      bodyHtml:`<p>Vous commencez par une <strong>situation de travail</strong>, pas par une longue lecture. Une demande TVA urgente arrive avec une demande de paie et une proposition de partager un mot de passe ePortal. Votre travail est de vérifier les faits accessibles, garder les limites visibles et décider jusqu’où le dossier peut avancer.</p><div class="callout"><strong>Objectif</strong><p>Vérifier l’entité, le RC, l’IDE/TVA, le mandat, les pouvoirs et l’échéance — sans tout escalader et sans inventer ce qui manque.</p></div><p><a class="btn btn-primary" href="${missionPath}" target="_blank" rel="noopener noreferrer">▶ Commencer la Mission 01</a></p>`
    },
    {
      title:'Les 5 contrôles métier qui construisent votre décision',
      type:'decision',
      bodyHtml:`<div class="dimension-grid"><div><strong>RC / Zefix</strong><span>Identifier l’entité juridique actuelle et lire les pouvoirs publiés.</span></div><div><strong>IDE / TVA</strong><span>Distinguer identité, RC et statut TVA; comparer l’assujettissement à la période traitée.</span></div><div><strong>Mandat</strong><span>Classer inclus / à confirmer / hors mandat et distinguer préparation, approbation, transmission et paiement.</span></div><div><strong>Remise 1</strong><span>Prendre une décision provisoire défendable avec un dossier incomplet.</span></div><div><strong>Remise 2</strong><span>Lire le delta: confirmé / limité / inchangé, sans réécrire l’histoire.</span></div></div><p><a href="${zefixPath}" target="_blank" rel="noopener noreferrer">RC / Zefix →</a> · <a href="${ideTvaPath}" target="_blank" rel="noopener noreferrer">IDE / TVA →</a> · <a href="${mandatPath}" target="_blank" rel="noopener noreferrer">Mandat →</a> · <a href="${remise1Path}" target="_blank" rel="noopener noreferrer">Remise 1 →</a> · <a href="${remise2Path}" target="_blank" rel="noopener noreferrer">Remise 2 →</a></p>`
    },
    {
      title:'Finalisation — une note qu’un collègue peut reprendre en 2 minutes',
      type:'case-study',
      bodyHtml:`<p>Le module ne demande plus plusieurs formulaires. Vous produisez <strong>une seule note de dossier</strong>: datée, courte, reliée aux sources utiles, avec les limites et la prochaine action. L’exemple de niveau attendu n’apparaît qu’après votre propre tentative.</p><div class="callout"><strong>Autocontrôle</strong><p>4 critères: identité/période · périmètre · évolution Remise 1 → Remise 2 · décision/prochaine action. Les erreurs critiques restent à zéro tolérance.</p></div><p><a class="btn btn-primary" href="${finalPath}" target="_blank" rel="noopener noreferrer">Finaliser ma note de dossier →</a></p>`
    },
    {
      title:'Référence — seulement si une notion doit être revue',
      type:'decision',
      bodyHtml:`<p>Le cours détaillé et le glossaire sont des <strong>ressources de référence</strong>, pas des prérequis à lire intégralement avant la Mission.</p><p><a href="${coursePath}" target="_blank" rel="noopener noreferrer">Cours TC01 détaillé →</a> · <a href="ressources/Glossaire_fiduciaire_debutant.html" target="_blank" rel="noopener noreferrer">Glossaire →</a></p>`
    }
  ];

  module.evidenceItems=[
    {id:'dossier_opening',label:'Note de dossier finalisée',help:'Un seul livrable: entité/RC, IDE-TVA/période, mandat-délégation, évolution des remises, décision et prochaine action.',templatePath:finalPath}
  ];
  module.artifactHtml=`<div class="artifact-template"><strong>1 résultat professionnel</strong><p>Une note de dossier courte et reprenable. Elle ne doit pas recopier tous les documents: elle doit rendre visibles les contrôles décisifs, leurs limites et la prochaine action autorisée.</p></div>`;

  module.quizThresholdCount=7;
  module.quizThreshold=87.5;
  module.criticalQuestionIds=['Q01','Q03','Q05','Q07'];
  module.quiz=[
    {id:'Q01',critical:true,domain:'Séquence de contrôle',q:'Vous recevez une demande TVA urgente. Le dossier contient un ancien RC, un mandat qui inclut la TVA mais exclut la paie, et aucune preuve claire du pouvoir de transmission. Quelle séquence est la plus professionnelle?',choices:['Préparer et transmettre la TVA, puis vérifier le dossier après','Vérifier l’entité actuelle, le statut TVA pour la période, le mandat et les pouvoirs avant l’action finale','Demander au responsable de refaire tous les contrôles','Refuser immédiatement le dossier parce qu’il est incomplet'],answer:1,explain:'Un dossier incomplet n’impose ni action aveugle ni blocage total. Vous réalisez d’abord les contrôles accessibles et gardez visible ce qui limite l’action finale.'},
    {id:'Q02',domain:'RC / pouvoirs',q:'Zefix affiche une signature collective à deux. Marc n’y figure pas, mais une délégation interne lui permet de préparer certaines informations. Que pouvez-vous conclure?',choices:['Marc peut engager seul la société puisque sa délégation est écrite','La délégation doit être lue selon son objet; elle ne transforme pas automatiquement Marc en signataire RC','La signature collective à deux ne concerne que les banques','Marc ne peut jamais intervenir dans le dossier'],answer:1,explain:'Le RC et la délégation répondent à des questions différentes. Il faut respecter la portée exacte de chaque pouvoir.'},
    {id:'Q03',critical:true,domain:'IDE / TVA',q:'Aujourd’hui le registre TVA est actif, mais le début d’assujettissement indiqué est le 01.07.2026. Vous traitez une facture de mai 2026 avec TVA. Quel réflexe?',choices:['Accepter la TVA car le statut est actif aujourd’hui','Considérer la TVA automatiquement fausse','Vérifier la situation applicable en mai avant de traiter; le statut actuel ne prouve pas la période passée','Ignorer la date d’assujettissement si l’IDE est actif'],answer:2,explain:'Le statut TVA doit toujours être relié à la période réellement traitée.'},
    {id:'Q04',domain:'Mandat',q:'Le client demande par e-mail de faire la paie «juste ce mois-ci», alors que le mandat signé l’exclut. Que faites-vous?',choices:['La paie devient incluse puisque la demande est écrite','Vous classez la demande hors mandat / à clarifier et vous pouvez continuer séparément les travaux TVA autorisés','Vous refusez définitivement toute paie future','Vous faites la paie si vous savez techniquement la préparer'],answer:1,explain:'Une nouvelle demande ne modifie pas silencieusement le mandat. Elle n’oblige pas non plus à bloquer les autres tâches correctement couvertes.'},
    {id:'Q05',critical:true,domain:'Accès',q:'Le client propose son mot de passe personnel ePortal pour gagner du temps. Quelle réponse opérationnelle est correcte?',choices:['L’utiliser une fois puis le supprimer','Le stocker dans le dossier sécurisé du cabinet','Refuser ce mode d’accès et utiliser le circuit autorisé / nominatif prévu','Le demander uniquement au responsable'],answer:2,explain:'L’urgence ne justifie pas le partage d’un mot de passe personnel comme solution normale d’accès.'},
    {id:'Q06',domain:'Remise 2',q:'Votre première analyse concluait «GO sous conditions». Remise 2 apporte un RC actuel et une délégation limitée. Quelle trace est la meilleure?',choices:['Supprimer la première analyse pour ne garder que la version finale','Conserver la première décision et noter précisément ce que les nouvelles pièces ont confirmé ou laissé limité','Passer automatiquement à GO parce que de nouvelles pièces sont arrivées','Recommencer tout le dossier depuis zéro'],answer:1,explain:'Une bonne trace montre l’évolution du raisonnement. Elle ne fait pas disparaître une décision prudente qui était correcte avec les informations disponibles à ce moment-là.'},
    {id:'Q07',critical:true,domain:'Transmission',q:'Le statut TVA est cohérent et vous avez accès à ePortal. La délégation reçue vous autorise à préparer le décompte mais ne mentionne pas sa transmission. Jusqu’où pouvez-vous aller?',choices:['Préparer et transmettre car l’accès technique suffit','Préparer le travail; garder la transmission comme condition non levée','Ne rien préparer tant qu’un signataire RC n’est pas présent','Transmettre si le client a écrit «urgent»'],answer:1,explain:'Accès technique, préparation et autorisation de transmission sont trois choses différentes. Ici la bonne décision reste GO sous conditions.'},
    {id:'Q08',domain:'Note de dossier',q:'Quelle note est la plus utile à un collègue qui reprend le dossier?',choices:['Une longue copie des pièces et des articles de loi','Une phrase «tout est OK» sans source ni limite','Une synthèse datée: faits contrôlés, source utile, période, périmètre, delta, limite restante et prochaine action','Uniquement la liste des documents reçus'],answer:2,explain:'La note doit permettre une reprise rapide et défendable; elle documente ce qui change la décision, pas tout ce qui existe dans le dossier.'}
  ];

  if(module.practicalReview){
    module.practicalReview.scoreItems=[
      {id:'identity_period',label:'Entité / RC et période TVA correctement établis',max:25},
      {id:'scope_authority',label:'Mandat, délégation et pouvoirs clairement distingués',max:25},
      {id:'delta_trace',label:'Évolution Remise 1 → Remise 2 visible sans réécriture',max:25},
      {id:'decision_next',label:'Décision et prochaine action courtes, précises et reprenables',max:25}
    ];
    module.practicalReview.criticalChecks=[
      {id:'shared_credentials',label:'Ai-je accepté ou conservé un mot de passe personnel du client comme mode normal d’accès?'},
      {id:'scope_extension',label:'Ai-je traité une demande hors mandat, notamment la paie, comme incluse sans clarification?'},
      {id:'vat_period_confusion',label:'Ai-je conclu sur la TVA à partir du seul statut RC/IDE ou du seul statut actuel, sans vérifier la période?'},
      {id:'transmission_assumption',label:'Ai-je assimilé accès ePortal ou préparation du décompte à une autorisation automatique de transmission?'}
    ];
    module.practicalReview.threshold=80;
  }
})();