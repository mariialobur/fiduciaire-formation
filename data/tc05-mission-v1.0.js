(function(){
  const DATA=window.FIDUCIAIRE_DATA;
  if(!DATA||!DATA.modules||!DATA.modules.TC05)return;
  const module=DATA.modules.TC05;
  const missionPath='ressources/tc05-apprenant-v1.0/00_Mission_TC05_v1.0.html';
  module.status='core';
  module.contentVersion='1.0-mission';
  module.duration='45–60 min de pratique';
  module.pedagogicalStatus='Mission comptable · logique économique → débit/crédit → impact bilan/résultat';
  module.sections=[
    {title:'Mission 05 — Une écriture équilibrée peut quand même être fausse',type:'case-study',bodyHtml:`<p>Vous traitez sept opérations d’une petite Sàrl: facture fournisseur, paiement, acompte client, achat privé, échéance d’emprunt, facture client et mouvement bancaire sans pièce.</p><p>Le but n’est pas de mémoriser des numéros de comptes. Vous devez expliquer <strong>ce qui s’est passé économiquement</strong>, puis construire l’écriture et lire son effet sur le bilan et le résultat.</p><p><a class="btn btn-primary" href="${missionPath}" target="_blank" rel="noopener noreferrer">▶ Commencer Mission 05</a></p>`},
    {title:'Les quatre erreurs que TC05 doit éliminer',type:'warning-box',bodyHtml:'<ul class="check-list"><li>Comptabiliser une charge une deuxième fois lors du paiement fournisseur.</li><li>Passer tout remboursement d’emprunt en charge au lieu de séparer principal et intérêts.</li><li>Reconnaître automatiquement un acompte client comme produit.</li><li>Masquer une dépense privée payée par la société dans les frais généraux.</li></ul>'},
    {title:'Réflexe métier',type:'decision',bodyHtml:'<div class="callout"><strong>Événement → éléments touchés → augmentation/diminution → débit/crédit → contrôle bilan/résultat.</strong><p>Le numéro de compte vient après. TC06 traitera la construction du plan comptable.</p></div>'}
  ];
  const old=module.learnerPackage&&Array.isArray(module.learnerPackage.files)?module.learnerPackage.files:[];
  module.learnerPackage={files:[{label:'▶ Mission 05 — Double écriture',path:missionPath},...old.filter(f=>f.path!==missionPath)]};
  module.evidenceItems=[{id:'journal_commente',label:'Journal commenté des écritures',help:'Pour chaque opération: événement, débit, crédit, montant et impact bilan/résultat.',templatePath:missionPath}];
  module.artifact='Journal commenté des écritures et impacts bilan/résultat.';
  module.artifactHtml='<div class="artifact-template"><strong>1 résultat professionnel</strong><p>Un journal où chaque écriture est reliée à l’événement économique et où l’impact bilan/résultat peut être expliqué.</p></div>';
  module.quizThresholdCount=5;
  module.quizThreshold=83;
  module.quiz=[
    {id:'Q01',q:'Une facture fournisseur a déjà été comptabilisée en charge et créancier. Au paiement, quelle logique est correcte?',choices:['Nouvelle charge / banque','Créancier / banque','TVA / banque','Produit / banque'],answer:1,explain:'Le paiement solde la dette; il ne recrée pas la charge.'},
    {id:'Q02',q:'Une échéance bancaire de CHF 2’500 contient CHF 2’000 de principal et CHF 500 d’intérêts. Quel montant affecte le résultat?',choices:['CHF 2’500','CHF 2’000','CHF 500','CHF 0'],answer:2,explain:'Le principal réduit la dette; les intérêts sont une charge.'},
    {id:'Q03',q:'La société paie CHF 486 de restaurant familial privé de l’associée. Quel premier réflexe?',choices:['Frais de représentation','Relation/compte courant avec associée, pas charge automatique','Salaire','TVA déductible'],answer:1,explain:'Le moyen de paiement ne transforme pas une dépense privée en charge.'},
    {id:'Q04',q:'Un acompte client est reçu avant que la prestation soit gagnée. Quel impact économique de base?',choices:['Banque augmente et produit augmente automatiquement','Banque augmente et une obligation/acompte envers client augmente','Charge augmente','Débiteur augmente'],answer:1,explain:'Avant reconnaissance du produit, l’encaissement représente une obligation envers le client; la TVA est traitée séparément selon les règles applicables.'},
    {id:'Q05',q:'Un débit bancaire n’a aucune pièce ni libellé fiable. Que faire?',choices:['Frais divers définitifs','Le supprimer','L’isoler temporairement en attente avec propriétaire, action et échéance','Le passer en salaire'],answer:2,explain:'L’incertitude doit rester visible jusqu’à identification.'},
    {id:'Q06',q:'Pourquoi vérifier l’impact bilan/résultat après une écriture?',choices:['Pour remplacer la pièce','Pour détecter une écriture équilibrée mais économiquement incohérente','Pour éviter le débit/crédit','Pour choisir le numéro de compte au hasard'],answer:1,explain:'Débit = crédit ne garantit pas que la qualification est correcte.'}
  ];
})();