(function(){
  const DATA=window.FIDUCIAIRE_DATA;if(!DATA?.modules?.TC08)return;const module=DATA.modules.TC08;
  const missionPath='ressources/tc08-apprenant-v1.1/00_Mission_TC08_v1.1.html';
  module.status='core';module.contentVersion='1.1-mission';module.duration='50–60 min de pratique';
  module.pedagogicalStatus='Module cœur · Mois 2 · étape 3/3: relire bilan/résultat, calculer et prioriser';
  module.sections=[
    {title:'Mission 08 — Montis Digital Sàrl: le bilan équilibre, mais est-il cohérent?',type:'case-study',bodyHtml:`<p>Après TC05 et TC06, vous relisez le même dossier au 30.06.2026. La balance est équilibrée, mais caisse, TVA, débiteurs et marge racontent une histoire à vérifier.</p><p>Vous devez <strong>calculer, prioriser puis ouvrir le bon grand livre</strong> avant toute correction.</p><p><a class="btn btn-primary" href="${missionPath}" target="_blank" rel="noopener noreferrer">▶ Commencer Mission 08</a></p>`},
    {title:'Ce que TC08 doit rendre automatique',type:'decision',bodyHtml:'<ul class="check-list"><li>Calculer un ratio avant de commenter sa variation.</li><li>Distinguer signal, hypothèse et fait confirmé.</li><li>Prioriser les anomalies selon risque et échéance.</li><li>Ouvrir GL/auxiliaire avant de corriger un solde.</li><li>Un équilibre débit/crédit ne prouve ni la période ni la classification.</li><li>Une correction exige une cause démontrée et une pièce.</li></ul>'},
    {title:'Fin du Mois 2',type:'decision',bodyHtml:'<div class="callout"><strong>Saisir → coder → relire.</strong><p>TC05, TC06 et TC08 forment désormais une seule chaîne sur Montis Digital Sàrl.</p></div>'}
  ];
  const old=module.learnerPackage?.files||[];module.learnerPackage={files:[{label:'▶ Mission 08 v1.1 — Revue analytique',path:missionPath},...old.filter(f=>!String(f.path||'').includes('tc08-apprenant-v1.0/00_Mission'))]};
  module.evidenceItems=[{id:'revue_analytique',label:'Revue analytique priorisée',help:'Priorité, constat, montant/variation, hypothèse, contrôle/pièce et action.',templatePath:missionPath}];
  module.artifact='Revue analytique priorisée du bilan et du résultat.';module.artifactHtml='<div class="artifact-template"><strong>1 résultat professionnel</strong><p>Une revue qui calcule les variations, sépare faits/hypothèses et transforme chaque signal en contrôle précis.</p></div>';
  module.practicalReview={threshold:80,feedbackMinimumCharacters:80,scoreItems:[
    {id:'calculations',label:'Ratios et variations significatives correctement calculés',max:20},
    {id:'diagnosis',label:'Signaux, hypothèses et faits clairement séparés',max:30},
    {id:'evidence',label:'Grand livre, auxiliaires et pièces choisis pour démontrer la cause',max:30},
    {id:'priority',label:'Priorités et actions cohérentes avec risque et échéance',max:20}
  ],criticalChecks:[
    {id:'arbitrary_fix',label:'Écriture de correction passée uniquement pour rendre le solde plausible'},
    {id:'negative_cash',label:'Caisse négative acceptée sans investigation'},
    {id:'vat_unreconciled',label:'Conclusion TVA tirée sans réconciliation comptes/décomptes/paiements'}
  ],anchorGuidance:{insufficient:'Conclusions tirées du solde seul ou correction arbitraire.',partial:'Anomalies repérées mais calcul, preuve ou priorisation incomplets.',expected:'Variations calculées, causes recherchées dans les bons sous-registres et actions priorisées.',strong:'Revue concise qui sépare fait/hypothèse, démontre les causes et bloque uniquement ce qui doit l’être.'}};
  module.quizThresholdCount=5;module.quizThreshold=83;
  module.quiz=[
    {id:'Q01',q:'La caisse comptable est négative de CHF 2’350. Quel premier geste est le plus défendable?',choices:['Passer CHF 2’350 en produit','Transférer le solde en banque','Ouvrir le GL caisse, vérifier mouvements, pièces et contrepartie banque','Ignorer si la balance équilibre'],answer:2,explain:'La cause doit être démontrée dans les mouvements avant correction.'},
    {id:'Q02',q:'Les débiteurs augmentent de 124%. Quel ensemble donne le meilleur diagnostic?',choices:['Auxiliaire clients, balance âgée, lettrage et encaissements','Seulement le chiffre d’affaires','Seulement les factures de juin','Le registre du commerce'],answer:0,explain:'Ces sources distinguent croissance, retards, paiements non affectés et cut-off.'},
    {id:'Q03',q:'La position TVA passe de «à payer» à «à récupérer». Quelle conclusion est correcte?',choices:['C’est forcément une erreur','C’est forcément favorable','Il faut la mettre en produit','Le changement peut être légitime ou faux; il faut réconcilier comptes TVA, décomptes et paiements'],answer:3,explain:'Un changement de signe est un signal, pas une conclusion.'},
    {id:'Q04',q:'La marge brute simplifiée passe de 50% à 35%. Quel commentaire est professionnel?',choices:['La société est définitivement moins rentable','La baisse de 15 points est significative; vérifier achats, stocks/cut-off, sous-traitance et reclassements avant de conclure','Il faut changer le taux TVA','Il faut réduire le chiffre d’affaires'],answer:1,explain:'Un ratio doit déclencher une analyse causale, pas une conclusion prématurée.'},
    {id:'Q05',q:'Un créancier de CHF 12’400 est inchangé depuis plus d’un an. Que faire?',choices:['Le solder automatiquement en produit','L’ignorer','Vérifier origine, paiement, avoir, litige et documentation avant décision','Le transférer en banque'],answer:2,explain:'Un solde ancien doit être expliqué avant reprise ou extourne.'},
    {id:'Q06',q:'Pourquoi ouvrir le grand livre alors que la balance est équilibrée?',choices:['Pour recalculer le capital','Parce que l’équilibre ne prouve ni bonne période, ni bonne classification, ni bonne contrepartie','Pour remplacer les pièces','Ce n’est pas nécessaire'],answer:1,explain:'Les mouvements expliquent la qualité du solde.'}
  ];
})();