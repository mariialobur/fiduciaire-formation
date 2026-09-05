# Rapport d'assemblage — v2.3

Date: 6 août 2026

## Base et versions

- Base conservée: v2.2, non écrasée.
- Application livrée: v2.3.
- Module publié: TC01 v1.3.
- Paquet apprenant embarqué: `ressources/tc01-apprenant-v1.3/` et son ZIP.
- Paquet responsable/corrigé: livré séparément du ZIP apprenant.

## Changements techniques

- seuil TC01 porté à 14/16 avec quatre questions critiques obligatoires;
- clé de progression v2.3 et migration contrôlée depuis v2.2/v2.1/v2.0;
- import JSON passé à une restauration conservatrice: les états de validation dérivés sont rejetés et recalculés/reconfirmés;
- registre des sources resynchronisé avec ajout de `TC01_OBA`;
- ressources TC01 régénérées en v1.3 dans Word, Excel, JSON et paquet apprenant;
- dépendance `jsdom` verrouillée et scripts QA documentés;
- anciennes ressources actives TC01 v1.2 retirées du paquet v2.3; l'historique documentaire reste conservé dans `historique/`.

## Modèle de confiance de la sauvegarde

Un JSON exporté localement est modifiable par l'utilisateur. Par conséquent, l'import v2.3 restaure le travail mais ne fait confiance ni à `validatedAt`, ni à `quizPassed`, ni à une revue pratique, ni à une décision de responsable importée. Toute validation doit être obtenue de nouveau dans l'état courant de l'application.

## QA de gel

La validation complète est détaillée dans `VALIDATION_V2.3.txt`. Le test depuis une copie propre avec installation par `npm ci` puis `npm test` passe sans erreur applicative.

