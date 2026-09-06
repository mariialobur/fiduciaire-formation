(function () {
  const DATA = window.FIDUCIAIRE_DATA;
  if (!DATA || !DATA.modules || !DATA.modules.TC01) return;

  const module = DATA.modules.TC01;
  module.contentVersion = "1.5";
  module.pedagogicalStatus = "TC01 v1.5 · parcours débutant clarifié · exemples métier · autonomie-first";

  const oldCourse = "ressources/tc01-apprenant-v1.4/05_Cours_TC01_v1.4.html";
  const newCourse = "ressources/tc01-apprenant-v1.5/01_Cours_TC01_v1.5.html";
  if (module.learnerPackage && Array.isArray(module.learnerPackage.files)) {
    module.learnerPackage.files = module.learnerPackage.files.map((file) => {
      if (file.path !== oldCourse) return file;
      return { label: "Cours TC01 v1.5 — commencer ici", path: newCourse };
    });
    if (!module.learnerPackage.files.some((file) => file.path === newCourse)) {
      module.learnerPackage.files.unshift({ label: "Cours TC01 v1.5 — commencer ici", path: newCourse });
    }
  }

  module.beginnerLearningPath = [
    "Comprendre le rôle du module et les mots indispensables",
    "Apprendre Zefix sur une entreprise réelle",
    "Vérifier séparément IDE, RC et statut TVA",
    "Ouvrir le cas simulé et conserver la première analyse",
    "Intégrer la deuxième remise sans réécrire l’historique",
    "Produire les cinq livrables utiles",
    "Faire l’autocontrôle puis le quiz"
  ];
})();