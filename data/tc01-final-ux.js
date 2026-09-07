(function(){
  const APP=window.FiduApp;
  if(!APP||APP.__tc01FinalUx)return;
  APP.__tc01FinalUx=true;
  window.FIDUCIAIRE_TC01_FINAL_UX={version:'1.0'};

  const declarationText='J’ai relu ma note de dossier, comparé mon travail aux critères du module et laissé visibles les points que je ne peux pas trancher seul.';
  const quizTitle='Challenge final · 8 situations de travail';
  const introHtml='Comparez votre <strong>note de dossier</strong> aux 4 critères ci-dessous. Le score est calculé automatiquement. Seuil: <strong>80/100</strong>; aucune erreur critique ni réponse «je ne sais pas» n’est admise.';

  function isTc01(){return /^#\/?module\/TC01(?:$|[/?#])/.test(String(location.hash||''));}
  function patch(){
    if(!isTc01())return;
    const declaration=document.querySelector('.autonomy-declaration span');
    if(declaration&&declaration.textContent!==declarationText)declaration.textContent=declarationText;

    const practical=document.querySelector('.practical-review');
    if(practical){
      const intro=[...practical.querySelectorAll('p')].find(p=>p.textContent.includes('comparez vos livrables'));
      if(intro&&intro.innerHTML!==introHtml)intro.innerHTML=introHtml;
    }

    const toast=document.getElementById('appToast');
    if(toast&&toast.textContent.includes('six livrables'))toast.textContent=toast.textContent.replace('les six livrables','le livrable');

    const headings=[...document.querySelectorAll('h2,h3')];
    const quizHeading=headings.find(h=>/^Quiz\b/i.test(h.textContent.trim()));
    if(quizHeading&&quizHeading.textContent!==quizTitle)quizHeading.textContent=quizTitle;
  }

  const baseRoute=APP.route;
  APP.route=function(){const result=baseRoute.apply(this,arguments);setTimeout(patch,0);return result;};
  const observer=new MutationObserver(()=>setTimeout(patch,0));
  observer.observe(document.documentElement,{childList:true,subtree:true});
  setTimeout(patch,0);
})();