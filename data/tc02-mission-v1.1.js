(function(){
  const DATA=window.FIDUCIAIRE_DATA;
  if(!DATA||!DATA.modules||!DATA.modules.TC02)return;
  const module=DATA.modules.TC02;
  const missionPath='ressources/tc02-apprenant-v1.1/00_Mission_TC02_v1.1.html';
  const dossierPath='ressources/tc02-apprenant-v1.0/02_Dossier_simule_TC02.md';
  const coursePath='ressources/tc02-apprenant-v1.0/01_Cours_TC02.md';

  module.lessonRevision='1.1-mission';
  module.pedagogicalStatus='TC02 · Mission professionnelle · transition EI → Sàrl · 12 mouvements à qualifier';
  module.duration='60–90 min de mission + pratique';
  module.objective='Reconstruire la frontière entre une entreprise individuelle et une Sàrl, qualifier les flux qui traversent la date de transition et documenter les reprises sans masquer les opérations privées ni inventer une base fiscale ou juridique.';

  const baseFiles=module.learnerPackage&&Array.isArray(module.learnerPackage.files)?module.learnerPackage.files:[];
  const priority=[
    {label:'▶ Mission 02 — Atelier Horizon: EI → Sàrl',path:missionPath},
    {label:'Dossier complet — Atelier Horizon',path:dossierPath},
    {label:'Cours de référence TC02',path:coursePath}
  ];
  const seen=new Set();
  module.learnerPackage={files:[...priority,...baseFiles].filter(file=>{if(seen.has(file.path))return false;seen.add(file.path);return true;})};

  module.sections=[
    {
      title:'Mission 02 — Atelier Horizon passe en Sàrl',
      type:'case-study',
      bodyHtml:`<p>On ne recommence pas par les définitions de base. Vous recevez directement un dossier de transition <strong>entreprise individuelle → Sàrl</strong> et douze mouvements dont plusieurs traversent la date du 1er mai.</p><div class="callout"><strong>Problème métier</strong><p>La cliente demande de «tout mettre dans la Sàrl dès mai». Votre travail est de déterminer ce qui appartient encore à l’EI, ce qui appartient à la Sàrl, ce qui relève de Léa à titre privé et ce qui nécessite une pièce de reprise ou une validation.</p></div><p><a class="btn btn-primary" href="${missionPath}" target="_blank" rel="noopener noreferrer">▶ Commencer la Mission 02</a></p>`
    },
    {
      title:'Le réflexe professionnel: le compte vient après la qualification',
      type:'decision',
      bodyHtml:`<div class="dimension-grid"><div><strong>Sujet</strong><span>EI, Sàrl, Léa à titre privé ou point à confirmer?</span></div><div><strong>Date</strong><span>Quand l’opération est-elle née, pas seulement quand a-t-elle été payée?</span></div><div><strong>Nature</strong><span>Charge, produit, apport, prêt, salaire, remboursement, distribution, transfert?</span></div><div><strong>Pièce</strong><span>Quelle preuve permet de défendre cette qualification?</span></div><div><strong>Écriture</strong><span>Seulement après les quatre contrôles précédents.</span></div><div><strong>Escalade</strong><span>Fiscalité, TVA, payroll ou droit: quel point reste réellement à trancher?</span></div></div>`
    },
    {
      title:'Ce qui rend TC02 utile même si vous connaissez déjà EI et Sàrl',
      type:'case-study',
      bodyHtml:`<p>La difficulté n’est pas de réciter les formes juridiques. Elle apparaît quand <strong>la date de facture, la date de paiement, le titulaire du compte bancaire, le nom sur la pièce et le bénéficiaire économique ne coïncident pas</strong>.</p><ul class="check-list"><li>ancienne créance encaissée après la constitution;</li><li>ordinateur acheté avant puis repris par la Sàrl;</li><li>compte bancaire EI encore utilisé en mai;</li><li>restaurant privé payé par la société;</li><li>avance de l’associée qui n’est pas automatiquement du capital;</li><li>facture de mai émise au mauvais nom;</li><li>«dividende» demandé sans base documentaire.</li></ul><p><a href="${dossierPath}" target="_blank" rel="noopener noreferrer">Ouvrir le dossier complet →</a></p>`
    },
    {
      title:'Référence — à ouvrir uniquement si vous avez besoin d’un rappel',
      type:'decision',
      bodyHtml:`<p>Le cours détaillé reste disponible, mais il n’est plus le point de départ obligatoire pour une personne qui maîtrise déjà les notions de base.</p><p><a href="${coursePath}" target="_blank" rel="noopener noreferrer">Cours TC02 détaillé →</a></p>`
    }
  ];
})();