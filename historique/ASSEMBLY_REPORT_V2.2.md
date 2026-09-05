# Rapport d’assemblage — v2.2

Date: 6 août 2026

## Modifications principales

- TC01 régénéré en v1.2 et paquet apprenant remplacé dans l’application;
- 24 compétences non finalisées passées au statut non validable `blueprint`;
- blocage technique des jalons mensuels tant qu’un module du mois n’est pas publié;
- grille TC01 unifiée sur 8 critères et 4 erreurs critiques entre application et Excel;
- dernière tentative de quiz rendue déterminante, avec révocation d’une validation antérieure en cas d’échec;
- import d’une sauvegarde JSON v2.2 ajouté à l’export existant;
- migration v2.1 prudente: notes et références conservées, validations dépendantes réinitialisées;
- focus clavier visible sur cases à cocher et sélecteurs de fichiers; erreurs annoncées avec `role=alert`;
- registre de sources TC01 daté du 06.08.2026, avec LBA Fedlex et page FINMA FinTech actuelle séparées.

## Règle de livraison

Le paquet final ne contient aucun corrigé dans `ressources/tc01-apprenant-v1.2`. Le corrigé et la grille responsable restent uniquement dans le paquet TC01 formateur séparé.

## QA

Résultats finaux: 190 fichiers HTML, 750 références locales sans manque, 16 questions TC01 avec distribution 4/4/4/4, 1 module publié + 24 blueprints bloqués, zéro erreur JavaScript au smoke-test. Les 5 Word, 8 PDF simulés et 16 feuilles Excel TC01 v1.2 ont été rendus et inspectés; l’audit Word ne signale aucune anomalie a11y et la recherche d’erreurs de formule Excel retourne zéro erreur. Détails: `VALIDATION_V2.2.txt`.
