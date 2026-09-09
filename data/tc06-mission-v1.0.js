(function(){
  const DATA=window.FIDUCIAIRE_DATA;if(!DATA?.modules?.TC06)return;const module=DATA.modules.TC06;
  const missionPath='ressources/tc06-apprenant-v1.1/00_Mission_TC06_v1.1.html';
  module.status='core';module.contentVersion='1.1-mission';module.duration='45–55 min de pratique';
  module.pedagogicalStatus='Module cœur · Mois 2 · étape 2/3: coder de façon stable et écrire des libellés utiles';
  module.sections=[
    {title:'Mission 06 — Montis Digital Sàrl: coder sans recopier aveuglément',type:'case-study',bodyHtml:`<p>Vous reprenez le même dossier après TC05. Le plan contient doublons, anciennes habitudes et comptes créés par fournisseur.</p><p>Votre travail est de choisir selon la <strong>nature économique</strong>, utiliser l’historique comme indice plutôt que comme preuve et écrire un libellé que le prochain collaborateur comprendra.</p><p><a class="btn btn-primary" href="${missionPath}" target="_blank" rel="noopener noreferrer">▶ Commencer Mission 06</a></p>`},
    {title:'Ce que TC06 doit rendre automatique',type:'decision',bodyHtml:'<ul class="check-list"><li>Nature avant fournisseur.</li><li>Historique = accélérateur, pas autorité.</li><li>Nouveau compte seulement pour un besoin durable de reporting ou de contrôle.</li><li>Auxiliaire clients/fournisseurs avant écriture directe au collectif.</li><li>TVA préalable, TVA due et règlement restent distinguables.</li><li>Libellé court, précis et retrouvable.</li></ul>'},
    {title:'Chaîne Mois 2',type:'decision',bodyHtml:'<div class="callout"><strong>TC05 saisir → TC06 coder → TC08 relire.</strong><p>Une mauvaise codification peut rester équilibrée; TC08 montrera comment les soldes et variations révèlent ces erreurs.</p></div>'}
  ];
  const old=module.learnerPackage?.files||[];module.learnerPackage={files:[{label:'▶ Mission 06 v1.1 — Codification & libellés',path:missionPath},...old.filter(f=>!String(f.path||'').includes('tc06-apprenant-v1.0/00_Mission'))]};
  module.evidenceItems=[{id:'regle_codification',label:'Règle de codification + exemples de libellés',help:'Nature économique, usage de l’historique, critères de création de compte, auxiliaires, TVA, attente et format de libellé.',templatePath:missionPath}];
  module.artifact='Règle de codification et exemples de saisie reprenables.';module.artifactHtml='<div class="artifact-template"><strong>1 résultat professionnel</strong><p>Une règle courte que deux collaborateurs différents peuvent appliquer de la même manière.</p></div>';
  module.practicalReview={threshold:80,feedbackMinimumCharacters:80,scoreItems:[
    {id:'nature',label:'Compte choisi selon la nature économique et non le fournisseur',max:30},
    {id:'consistency',label:'Historique utilisé avec contrôle et cohérence inter-périodes',max:25},
    {id:'controls',label:'Auxiliaires, collectifs, TVA et comptes d’attente restent contrôlables',max:25},
    {id:'labels',label:'Libellés et migrations sont clairs et retrouvables',max:20}
  ],criticalChecks:[
    {id:'collective_break',label:'Écriture directe au collectif qui casse la concordance avec l’auxiliaire'},
    {id:'history_copy',label:'Ancienne codification recopiée malgré une nature économique différente'},
    {id:'vat_mix',label:'Fonctions TVA préalable, TVA due et règlement mélangées sans piste contrôlable'}
  ],anchorGuidance:{insufficient:'Codification guidée par fournisseur/habitude ou contrôle auxiliaire cassé.',partial:'Bonne logique mais règles de création, libellés ou migration encore flous.',expected:'Plan stable, codification reproductible et contrôles préservés.',strong:'Un nouveau collaborateur peut coder de façon cohérente sans inventer de comptes ni copier les anciennes erreurs.'}};
  module.quizThresholdCount=5;module.quizThreshold=83;
  module.quiz=[
    {id:'Q01',q:'Trois fournisseurs vendent la même papeterie. Aucun reporting par fournisseur n’est demandé. Quelle logique est la plus stable?',choices:['Un compte par fournisseur','Un compte d’attente','Un compte générique selon la nature «fournitures de bureau»','Le collectif fournisseurs comme charge'],answer:2,explain:'Le fournisseur est déjà traçable dans la pièce et l’auxiliaire.'},
    {id:'Q02',q:'L’an dernier une facture Apple a été codée en matériel informatique. Cette année la pièce est AppleCare annuel. Que faire?',choices:['Requalifier la nouvelle pièce selon sa nature; l’historique n’est qu’un indice','Copier le compte Apple précédent','Créer un compte AppleCare','Immobiliser automatiquement'],answer:0,explain:'Même fournisseur ne signifie pas même nature économique.'},
    {id:'Q03',q:'Quelle raison justifie le mieux la création d’un nouveau compte?',choices:['Un nouveau fournisseur','Une facture importante isolée','Un nouveau collaborateur','Un besoin durable de reporting, présentation ou contrôle non couvert par le plan'],answer:3,explain:'Le plan doit rester stable et utile, pas reproduire la liste des fournisseurs.'},
    {id:'Q04',q:'Pourquoi une écriture directe dans le collectif fournisseurs est-elle risquée?',choices:['Parce qu’un collectif ne peut jamais être débité','Elle peut casser la concordance avec l’auxiliaire si aucun poste fournisseur correspondant n’existe','Elle crée toujours de la TVA','Elle augmente le chiffre d’affaires'],answer:1,explain:'Collectif et auxiliaire doivent rester réconciliables.'},
    {id:'Q05',q:'Quel libellé est le plus reprenable?',choices:['OfficeWorld – fournitures bureau – F-2406-118','Facture','Paiement juin','Divers'],answer:0,explain:'Il reste court tout en donnant contrepartie, nature et référence.'},
    {id:'Q06',q:'Un ancien compte est fusionné vers un compte générique. Quelle trace faut-il conserver?',choices:['Aucune si le solde final est juste','Seulement le nom du collaborateur','Une table ancien → nouveau avec motif et date','Une capture d’écran sans explication'],answer:2,explain:'La migration doit rester compréhensible pour préserver comparabilité et audit trail.'}
  ];
})();