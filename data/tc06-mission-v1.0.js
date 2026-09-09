(function(){
  const DATA=window.FIDUCIAIRE_DATA;
  if(!DATA||!DATA.modules||!DATA.modules.TC06)return;
  const module=DATA.modules.TC06;
  const missionPath='ressources/tc06-apprenant-v1.0/00_Mission_TC06_v1.0.html';
  module.status='blueprint';
  module.contentVersion='1.0-mission';
  module.duration='40–50 min de pratique';
  module.pedagogicalStatus='Mission TC06 disponible · promotion en module cœur avec le bloc complet Mois 2';
  module.sections=[
    {title:'Mission 06 — Le fournisseur ne choisit pas le compte',type:'case-study',bodyHtml:`<p>Vous reprenez un plan comptable où plusieurs collaborateurs ont créé des comptes par fournisseur et mélangé les fonctions TVA et auxiliaires.</p><p>Votre travail: choisir le compte selon la <strong>nature économique</strong>, réduire les doublons et écrire une règle de codification qu’un autre collaborateur peut suivre.</p><p><a class="btn btn-primary" href="${missionPath}" target="_blank" rel="noopener noreferrer">▶ Commencer Mission 06</a></p>`},
    {title:'Ce que TC06 doit rendre automatique',type:'decision',bodyHtml:'<ul class="check-list"><li>Nature avant fournisseur.</li><li>Nouveau compte seulement si le reporting ou le contrôle le justifie.</li><li>Auxiliaires clients/fournisseurs réconciliés avec leurs collectifs.</li><li>TVA préalable, TVA due et règlement séparés.</li><li>Compte d’attente avec propriétaire, action et date de résolution.</li></ul>'},
    {title:'Réflexe métier',type:'decision',bodyHtml:'<div class="callout"><strong>Un bon plan comptable réduit les décisions pendant la saisie.</strong><p>Le numéro précis dépend du dossier; la règle de classement doit rester stable d’une période à l’autre.</p></div>'}
  ];
  const old=module.learnerPackage&&Array.isArray(module.learnerPackage.files)?module.learnerPackage.files:[];
  module.learnerPackage={files:[{label:'▶ Mission 06 — Plan comptable & codification',path:missionPath},...old.filter(f=>f.path!==missionPath)]};
  module.evidenceItems=[{id:'regle_codification',label:'Règle de codification + table de migration',help:'Nature économique, critères de création de compte, auxiliaires, TVA, comptes d’attente et ancien → nouveau.',templatePath:missionPath}];
  module.artifact='Règle de codification et table de migration du plan comptable.';
  module.artifactHtml='<div class="artifact-template"><strong>1 résultat professionnel</strong><p>Une règle courte de codification et une table de migration qui évitent les doublons et préservent la comparabilité.</p></div>';
  module.quizThresholdCount=5;
  module.quizThreshold=83;
  module.quiz=[
    {id:'Q01',q:'Une PME achète du papier chez trois fournisseurs différents. Quelle logique est la plus stable?',choices:['Un compte de charge par fournisseur','Un compte selon la nature «fournitures de bureau», sauf besoin de reporting spécifique','Un compte d’attente permanent','Un compte collectif fournisseurs comme charge'],answer:1,explain:'Le fournisseur est suivi dans l’auxiliaire; le grand livre décrit la nature économique.'},
    {id:'Q02',q:'Pourquoi éviter les écritures directes dans un compte collectif fournisseurs?',choices:['Parce qu’un collectif ne peut jamais être débité','Parce qu’elles peuvent casser la concordance avec l’auxiliaire','Parce qu’elles créent toujours de la TVA','Parce qu’elles augmentent le chiffre d’affaires'],answer:1,explain:'Le collectif doit pouvoir être réconcilié avec les postes fournisseurs.'},
    {id:'Q03',q:'La meilleure raison de créer un nouveau compte est…',choices:['un nouveau fournisseur','un besoin durable de reporting, contrôle ou présentation','un montant élevé isolé','un nouveau collaborateur'],answer:1,explain:'La structure sert le reporting et le contrôle, pas la liste des fournisseurs.'},
    {id:'Q04',q:'Pourquoi séparer TVA préalable, TVA due et règlement?',choices:['Pour multiplier les comptes','Pour garder une piste contrôlable entre achats, ventes, déclaration et paiement','Parce que tous les clients utilisent les mêmes numéros','Pour éviter les auxiliaires'],answer:1,explain:'Les fonctions différentes doivent rester réconciliables.'},
    {id:'Q05',q:'Un compte d’attente est acceptable si…',choices:['on y laisse les différences indéfiniment','chaque solde a un propriétaire, une cause à rechercher et une date de résolution','il remplace les charges inconnues','son solde est nul seulement une fois par an'],answer:1,explain:'Le compte d’attente rend l’incertitude visible; il ne doit pas la cacher.'},
    {id:'Q06',q:'Pourquoi conserver une table ancien → nouveau lors d’une fusion de comptes?',choices:['Pour rallonger le dossier','Pour préserver la comparabilité et expliquer les changements','Pour supprimer les anciennes pièces','Pour recalculer les salaires'],answer:1,explain:'La migration doit rester compréhensible d’une période à l’autre.'}
  ];
})();