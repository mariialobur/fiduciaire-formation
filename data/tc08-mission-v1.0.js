(function(){
  const DATA=window.FIDUCIAIRE_DATA;
  if(!DATA||!DATA.modules||!DATA.modules.TC08)return;
  const module=DATA.modules.TC08;
  const missionPath='ressources/tc08-apprenant-v1.0/00_Mission_TC08_v1.0.html';
  module.status='blueprint';
  module.contentVersion='1.0-mission';
  module.duration='40–50 min de pratique';
  module.pedagogicalStatus='Mission TC08 disponible · promotion en module cœur avec le bloc complet Mois 2';
  module.sections=[
    {title:'Mission 08 — Le bilan équilibre, mais plusieurs soldes sont suspects',type:'case-study',bodyHtml:`<p>Vous recevez un bilan comparatif où le chiffre d’affaires progresse de 30%, les achats de 69%, les débiteurs doublent, la caisse devient négative et un solde TVA change de côté.</p><p>Votre travail est de repérer les signaux, ouvrir le bon grand livre et construire une revue <strong>constat → hypothèse → contrôle → action</strong>.</p><p><a class="btn btn-primary" href="${missionPath}" target="_blank" rel="noopener noreferrer">▶ Commencer Mission 08</a></p>`},
    {title:'Ce que TC08 doit rendre automatique',type:'decision',bodyHtml:'<ul class="check-list"><li>Un solde plausible peut cacher des mouvements incohérents.</li><li>Une variation est un signal, pas une conclusion.</li><li>Caisse négative, vieux soldes et comptes fiscaux au mauvais signe sont prioritaires.</li><li>Le grand livre et les auxiliaires expliquent le bilan; ils ne sont pas accessoires.</li><li>Une correction n’est passée qu’après identification de la cause.</li></ul>'},
    {title:'Réflexe métier',type:'decision',bodyHtml:'<div class="callout"><strong>Solde → variation → mouvement → pièce → explication.</strong><p>La revue analytique doit produire des questions précises, pas des écritures de confort.</p></div>'}
  ];
  const old=module.learnerPackage&&Array.isArray(module.learnerPackage.files)?module.learnerPackage.files:[];
  module.learnerPackage={files:[{label:'▶ Mission 08 — Revue bilan / résultat',path:missionPath},...old.filter(f=>f.path!==missionPath)]};
  module.evidenceItems=[{id:'revue_analytique',label:'Revue analytique des anomalies',help:'Pour chaque point: constat, montant, hypothèse, contrôle/pièce et action.',templatePath:missionPath}];
  module.artifact='Revue analytique de bilan et résultat.';
  module.artifactHtml='<div class="artifact-template"><strong>1 résultat professionnel</strong><p>Une revue courte qui transforme les variations significatives en contrôles précis et traçables.</p></div>';
  module.quizThresholdCount=5;
  module.quizThreshold=83;
  module.quiz=[
    {id:'Q01',q:'Une caisse comptable est négative de CHF 2’350. Quel premier contrôle?',choices:['Passer CHF 2’350 en produit','Ouvrir le grand livre caisse et rechercher mouvement/pièce manquante','Transférer le solde en banque','Ignorer si le bilan équilibre'],answer:1,explain:'La cause doit être trouvée dans les mouvements avant correction.'},
    {id:'Q02',q:'Les débiteurs clients augmentent de 124%. Que faut-il regarder en priorité?',choices:['Uniquement le chiffre d’affaires','Auxiliaire clients, balance âgée, lettrage et encaissements','Les salaires','Le registre du commerce'],answer:1,explain:'Ces sources permettent de distinguer croissance, retards, défauts de lettrage et erreurs.'},
    {id:'Q03',q:'Le CA augmente de 30% mais les achats directs de 69%. Quelle conclusion est correcte?',choices:['La marge est définitivement mauvaise','C’est un signal: vérifier achats, stocks/cut-off et reclassements avant de conclure','Il faut changer le taux TVA','Il faut diminuer les ventes'],answer:1,explain:'Une variation de ratio exige une analyse des mouvements et du périmètre.'},
    {id:'Q04',q:'Un compte «TVA à payer» apparaît à l’actif alors qu’il était au passif l’année précédente. Que faire?',choices:['Le supprimer','Réconcilier les comptes TVA avec décomptes/paiements et vérifier signe/reclassement','Le mettre en produit','Le laisser sans contrôle'],answer:1,explain:'Le changement peut être légitime ou erroné; il doit être expliqué.'},
    {id:'Q05',q:'Un créancier de CHF 12’400 n’a pas bougé depuis plus d’un an. Quel réflexe?',choices:['Le solder automatiquement en produit','Vérifier origine, paiement, avoir et documentation avant décision','Le transférer en banque','L’ignorer'],answer:1,explain:'Un vieux solde dormant doit avoir une cause documentée.'},
    {id:'Q06',q:'Pourquoi ouvrir le grand livre si le bilan équilibre?',choices:['Parce que l’équilibre ne prouve ni bonne période ni bonne classification','Pour recalculer les salaires','Pour changer le capital','Ce n’est pas nécessaire'],answer:0,explain:'Les mouvements, dates et contreparties expliquent la qualité du solde.'}
  ];
})();