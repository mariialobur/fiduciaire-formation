(function(){
  const APP=window.FiduApp;
  const DATA=window.FIDUCIAIRE_DATA;
  if(!APP||!DATA||!DATA.modules||!DATA.modules.TC01||APP.__tc01FinalUx)return;
  APP.__tc01FinalUx=true;
  window.FIDUCIAIRE_TC01_FINAL_UX={version:'1.0',revision:'expert-audit'};

  const module=DATA.modules.TC01;
  const FINAL_KEY='tc01_final_note_v18';
  const PROGRESS_KEY='fiduciaire_formation_progress_v24';
  const systemNote='TC01 utilise la note de dossier finalisée comme note de travail.';

  module.artifactNoteMinimumCharacters=1;
  module.pedagogicalStatus='TC01 · Mission de travail · une note de dossier · autocontrôle zéro tolérance · challenge situationnel';

  module.quiz=[
    {id:'Q01',critical:true,domain:'Séquence de contrôle',q:'Vous recevez une demande TVA urgente. Le dossier contient un ancien RC, un mandat qui inclut la TVA mais exclut la paie, et aucune preuve claire du pouvoir de transmission. Quelle séquence est la plus professionnelle?',choices:['Préparer et transmettre la TVA, puis vérifier le dossier après','Vérifier l’entité actuelle, le statut TVA pour la période, le mandat et les pouvoirs avant l’action finale','Demander au responsable de refaire tous les contrôles','Refuser immédiatement le dossier parce qu’il est incomplet'],answer:1,explain:'Un dossier incomplet n’impose ni action aveugle ni blocage total. Vous réalisez d’abord les contrôles accessibles et gardez visible ce qui limite l’action finale.'},
    {id:'Q02',domain:'RC / pouvoirs',q:'Zefix affiche une signature collective à deux. Marc n’y figure pas, mais une délégation interne lui permet de préparer certaines informations. Que pouvez-vous conclure?',choices:['Marc peut engager seul la société puisque sa délégation est écrite','La signature collective à deux ne concerne que les banques','La délégation doit être lue selon son objet; elle ne transforme pas automatiquement Marc en signataire RC','Marc ne peut jamais intervenir dans le dossier'],answer:2,explain:'Le RC et la délégation répondent à des questions différentes. Il faut respecter la portée exacte de chaque pouvoir.'},
    {id:'Q03',critical:true,domain:'IDE / TVA',q:'Aujourd’hui le registre TVA est actif, mais le début d’assujettissement indiqué est le 01.07.2026. Vous traitez une facture de mai 2026 avec TVA. Quel réflexe?',choices:['Accepter la TVA car le statut est actif aujourd’hui','Considérer la TVA automatiquement fausse','Ignorer la date d’assujettissement si l’IDE est actif','Vérifier la situation applicable en mai avant de traiter; le statut actuel ne prouve pas la période passée'],answer:3,explain:'Le statut TVA doit toujours être relié à la période réellement traitée.'},
    {id:'Q04',domain:'Mandat',q:'Le client demande par e-mail de faire la paie «juste ce mois-ci», alors que le mandat signé l’exclut. Que faites-vous?',choices:['Vous classez la demande hors mandat / à clarifier et vous pouvez continuer séparément les travaux TVA autorisés','La paie devient incluse puisque la demande est écrite','Vous refusez définitivement toute paie future','Vous faites la paie si vous savez techniquement la préparer'],answer:0,explain:'Une nouvelle demande ne modifie pas silencieusement le mandat. Elle n’oblige pas non plus à bloquer les autres tâches correctement couvertes.'},
    {id:'Q05',critical:true,domain:'Accès',q:'Le client propose son mot de passe personnel ePortal pour gagner du temps. Quelle réponse opérationnelle est correcte?',choices:['L’utiliser une fois puis le supprimer','Le stocker dans le dossier sécurisé du cabinet','Refuser ce mode d’accès et utiliser le circuit autorisé / nominatif prévu','Le demander uniquement au responsable'],answer:2,explain:'L’urgence ne justifie pas le partage d’un mot de passe personnel comme solution normale d’accès.'},
    {id:'Q06',domain:'Remise 2',q:'Votre première analyse concluait «GO sous conditions». Remise 2 apporte un RC actuel et une délégation limitée. Quelle trace est la meilleure?',choices:['Recommencer tout le dossier depuis zéro','Supprimer la première analyse pour ne garder que la version finale','Passer automatiquement à GO parce que de nouvelles pièces sont arrivées','Conserver la première décision et noter précisément ce que les nouvelles pièces ont confirmé ou laissé limité'],answer:3,explain:'Une bonne trace montre l’évolution du raisonnement. Elle ne fait pas disparaître une décision prudente qui était correcte avec les informations disponibles à ce moment-là.'},
    {id:'Q07',critical:true,domain:'Transmission',q:'Le statut TVA est cohérent et vous avez accès à ePortal. La délégation reçue vous autorise à préparer le décompte mais ne mentionne pas sa transmission. Jusqu’où pouvez-vous aller?',choices:['Préparer et transmettre car l’accès technique suffit','Préparer le travail; garder la transmission comme condition non levée','Ne rien préparer tant qu’un signataire RC n’est pas présent','Transmettre si le client a écrit «urgent»'],answer:1,explain:'Accès technique, préparation et autorisation de transmission sont trois choses différentes. Ici la bonne décision reste GO sous conditions.'},
    {id:'Q08',domain:'Note de dossier',q:'Quelle note est la plus utile à un collègue qui reprend le dossier?',choices:['Une synthèse datée: faits contrôlés, source utile, période, périmètre, delta, limite restante et prochaine action','Une longue copie des pièces et des articles de loi','Une phrase «tout est OK» sans source ni limite','Uniquement la liste des documents reçus'],answer:0,explain:'La note doit permettre une reprise rapide et défendable; elle documente ce qui change la décision, pas tout ce qui existe dans le dossier.'}
  ];

  function isTc01(){return /^#\/?module\/TC01(?:$|[/?#])/.test(String(location.hash||''));}
  function finalState(){try{return JSON.parse(localStorage.getItem(FINAL_KEY)||'{}')}catch(e){return {}}}
  function progressState(){try{return JSON.parse(localStorage.getItem(PROGRESS_KEY)||'{}')}catch(e){return {}}}
  function today(){return new Date().toISOString().slice(0,10)}

  function hideDuplicateWorkNote(){
    const textarea=document.getElementById('artifactNotes');
    if(!textarea)return;
    if(!textarea.value.trim())textarea.value=systemNote;
    const label=document.querySelector('label[for="artifactNotes"]');
    const actions=textarea.nextElementSibling;
    if(label)label.style.display='none';
    textarea.style.display='none';
    if(actions&&actions.classList.contains('inline-actions'))actions.style.display='none';
    const artifact=document.getElementById('artifact');
    if(artifact&&!artifact.querySelector('.tc01-single-note-info')){
      const info=document.createElement('div');info.className='autonomy-note tc01-single-note-info';
      info.innerHTML='<strong>Une seule note.</strong> La «note de travail» générique est remplacée dans TC01 par votre <strong>note de dossier</strong>. Vous ne devez rien recopier une deuxième fois.';
      const evidence=artifact.querySelector('.evidence-help')||artifact.querySelector('.evidence-list');
      if(evidence)evidence.parentNode.insertBefore(info,evidence);else artifact.appendChild(info);
    }
  }

  function syncFinalNote(){
    const state=finalState();
    const input=document.getElementById('evidence-dossier_opening');
    if(!input||state.ready!==true)return;
    let changed=false;
    if(!input.value.trim()){input.value=`Note finalisée · ${String(state.completedAt||today()).slice(0,10)}`;changed=true;}
    const textarea=document.getElementById('artifactNotes');
    if(textarea&&!textarea.value.trim()){textarea.value=systemNote;changed=true;}
    if(changed&&typeof APP.saveArtifact==='function')APP.saveArtifact('TC01');
    const row=input.closest('.evidence-row');
    if(row&&!row.querySelector('.tc01-note-detected')){
      const badge=document.createElement('div');badge.className='autonomy-note tc01-note-detected';
      badge.innerHTML='<strong>Note finalisée détectée ✓</strong><br>La finalisation locale a été reconnue. Aucun nom de fichier n’est nécessaire.';
      row.appendChild(badge);
    }
  }

  function prefillAutocontrol(){
    const state=finalState();if(state.ready!==true)return;
    module.practicalReview.scoreItems.forEach(item=>{const s=document.getElementById(`auto-score-${item.id}`);if(s&&!s.value)s.value='expected';});
    module.practicalReview.criticalChecks.forEach(item=>{const s=document.getElementById(`auto-critical-${item.id}`);if(s&&!s.value)s.value='no';});
    const declaration=document.getElementById('autoDeclaration');if(declaration&&!declaration.checked)declaration.checked=true;
    const practical=document.querySelector('.practical-review');
    if(practical&&!practical.querySelector('.tc01-selfcheck-detected')){
      const note=document.createElement('div');note.className='autonomy-note tc01-selfcheck-detected';
      note.innerHTML='<strong>Autocontrôle repris depuis la finalisation.</strong> Les réponses ont été préremplies à partir des 4 critères et des 4 contrôles zéro tolérance que vous avez déjà confirmés. Relisez-les puis enregistrez l’autocontrôle.';
      const button=practical.querySelector('button');if(button)practical.insertBefore(note,button);else practical.appendChild(note);
    }
  }

  function patchLabels(){
    const artifact=document.getElementById('artifact');
    if(artifact){const kicker=artifact.querySelector('.kicker');if(kicker)kicker.textContent='Résultat de la mission';const h=artifact.querySelector('h2');if(h)h.textContent='Votre note de dossier';}
    const quiz=document.getElementById('quiz');
    if(quiz){const kicker=quiz.querySelector('.kicker');if(kicker)kicker.textContent='Mise en situation';const h=quiz.querySelector('h2');if(h)h.textContent='Challenge final · 8 situations de travail';}
    const declaration=document.querySelector('.autonomy-declaration span');if(declaration)declaration.textContent='J’ai relu ma note de dossier, vérifié les 4 critères et laissé visibles les points que je ne peux pas trancher seul.';
    const practical=document.querySelector('.practical-review');if(practical){const intro=[...practical.querySelectorAll('p')].find(p=>p.textContent.includes('comparez vos livrables'));if(intro)intro.innerHTML='Comparez votre <strong>note de dossier</strong> aux 4 critères ci-dessous. Seuil: <strong>80/100</strong>; aucune erreur critique ni réponse «je ne sais pas» n’est admise.';}
  }

  function patch(){if(!isTc01())return;hideDuplicateWorkNote();syncFinalNote();patchLabels();prefillAutocontrol();}

  const baseRoute=APP.route;
  APP.route=function(){const result=baseRoute.apply(this,arguments);setTimeout(patch,0);return result;};
  const observer=new MutationObserver(()=>patch());observer.observe(document.documentElement,{childList:true,subtree:true});setTimeout(patch,0);
})();