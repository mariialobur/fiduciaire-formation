# Contribution au projet

## Flux de travail

1. Créer une branche courte depuis `main`, par exemple `module/tc02` ou `fix/import-validation`.
2. Modifier les sources multi-fichiers et les données; ne pas éditer uniquement la version autonome.
3. Exécuter `npm run build` pour régénérer `index.html` et `LANCER_ICI.html`.
4. Exécuter `npm test`.
5. Ouvrir une pull request décrivant le contenu, les sources officielles vérifiées, les risques et les contrôles effectués.

## Règles de contenu

- Une fiche `blueprint` ne devient `published` qu'après intégration du cours, du cas, du quiz, des livrables, de la grille et des contrôles critiques.
- Toute règle juridique, fiscale ou réglementaire doit citer une source officielle valable pour la période concernée et porter une date de vérification.
- Une modification des réponses, des critères, des poids ou des erreurs critiques doit être synchronisée dans l'application, les JSON, Word et Excel.
- Le corrigé formateur ne doit jamais être copié dans `ressources/` ni dans un paquet apprenant.
- Aucun dossier client réel, identifiant, mot de passe, export de progression ou donnée personnelle ne doit être commité.

## Versionnement

- Application: version sémantique dans `package.json`.
- Module: version propre dans ses documents, son manifeste et ses JSON d'intégration.
- Une version livrée reçoit un tag Git après réussite des tests et revue des documents générés.
