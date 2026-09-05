# Fiduciaire Formation — parcours comptable 12 mois

> Version pilote active: application v2.3, module TC01 v1.3.

Plateforme interne et hors ligne pour accompagner un·e assistant·e comptable vers l’autonomie sur des dossiers PME courants, sous revue ciblée d’une personne responsable.

## État réel de la version

- 12 mois structurés en 4 niveaux de délégation.
- 25 compétences cœur positionnées dans la feuille de route.
- 1 module étalon complet: TC01 — Mandat fiduciaire, périmètre et responsabilités.
- 24 fiches de compétences encore à développer au standard TC01 avant de pouvoir être présentées comme cours complets.
- TC01 comprend le cours, un dossier en deux remises, des documents simulés, les outils apprenant, 16 questions, 6 preuves, une revue pratique sur 100 et 4 contrôles critiques.
- 2 ressources TVA externes obligatoires:
  - méthode effective: <https://mariialobur.github.io/tva-debutant/>
  - méthode TDFN: <https://mariialobur.github.io/tva-tdfn/>
- 12 jalons mensuels avec pratique, livrables, note de preuve, ordre obligatoire et revue déclarée du responsable. Un jalon reste techniquement non validable tant qu’un module du mois n’est encore qu’une fiche de cadrage.
- 1 cas final de bout en bout au mois 12.
- Progression locale, migration prudente des versions antérieures, export JSON et restauration contrôlée d’une sauvegarde v2.3. L’import conserve le travail mais exige une nouvelle confirmation des quiz et validations.

Positionnement exact:

> Plateforme de pilotage d’un parcours de formation de 12 mois, avec 1 module étalon intégré et 24 fiches de compétences à développer.

## Limites assumées

Les 11 parcours sectoriels historiques restent dans la bibliothèque. La majorité de ces contenus sont des fiches de cadrage et non des cours complets. Ils sont clairement séparés du parcours cœur et ne comptent pas dans la progression.

Le statut `validé` reste une trace interne locale. L’application hors ligne ne téléverse pas les fichiers et n’authentifie pas l’identité du responsable; elle conserve des références de preuve, les scores, les contrôles critiques, la date et le feedback. Le cabinet doit conserver les fichiers réels dans son espace documentaire et contrôler les accès.

Les fiches de cadrage sont consultables mais leur quiz, leur artefact et leur validation sont volontairement désactivés. TC01 reste utilisable comme module pilote autonome; le mois 1 ne pourra devenir un jalon validé qu’après publication de TC02, TC03 et TC04 au même standard.

Le programme ne délivre pas de titre fédéral et ne qualifie pas automatiquement pour les dossiers complexes, le conseil fiscal spécialisé, l’audit, la consolidation, les décisions LBA ou les situations transfrontalières sensibles.

## Lancement

Ouvrir `LANCER_ICI.html` ou `index.html` dans un navigateur récent. Aucune installation ni connexion n’est requise.

## Fichiers principaux

- `index.html` et `LANCER_ICI.html`: versions autonomes de l’interface.
- `index-multifile.html`: version de développement multi-fichiers.
- `data/app-data.js`: bibliothèque historique.
- `data/roadmap-data.js`: parcours 12 mois, TC01 v1.3 et 24 fiches cœur non validables.
- `app.js`: progression, jalons, quiz, revue et bibliothèque.
- `style.css`: interface responsive et imprimable.
- `build-standalone.mjs`: reconstruit les deux fichiers autonomes après une modification.
- `ressources/tc01-apprenant-v1.3.zip`: paquet apprenant sans corrigé responsable.
- Le paquet formateur, les corrigés et leurs générateurs sont volontairement exclus de ce dépôt public.
- `PROGRAMME_12_MOIS.md`: référentiel pédagogique.
- `AUDIT_EXPERT_V2.3.md`: audit contradictoire, risques v2.2 et corrections v2.3.
- `ASSEMBLY_REPORT_V2.3.md`: modifications et résultats de QA de la version active.
- `VALIDATION_V2.3.txt`: synthèse courte des contrôles de livraison.
- `QA_REPRODUCIBLE.md`: procédure permettant de relancer les contrôles depuis l’archive.
- `historique/`: audits et rapports des versions antérieures, conservés uniquement pour traçabilité.

## Règle de mise à jour

Toute donnée légale, taux, limite ou procédure doit être vérifiée dans la source officielle valable pour la période et relue avant utilisation en production. Une ressource externe reste indépendante de la plateforme et doit être contrôlée avant affectation.

## Développement sur GitHub

Créer une branche par modification, reconstruire les fichiers autonomes avec `npm run build`, puis exécuter `npm test` avant chaque pull request. Les fichiers de progression exportés par les utilisateurs, les dépendances installées et les rendus temporaires ne doivent jamais être commités.

Ce dépôt constitue l'édition publique destinée à la démonstration et à l'apprentissage. Comme toute application statique exécutée dans le navigateur, son code côté client ne constitue pas un dispositif d'examen sécurisé; la validation professionnelle doit rester supervisée et documentée hors du site public.
