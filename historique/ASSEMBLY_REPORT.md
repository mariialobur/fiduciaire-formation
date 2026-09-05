# RAPPORT HISTORIQUE — v1.2 TC10

> Conservé pour traçabilité. Ne décrit pas la version active v2.1.

Date: 2026-06-19  
Scope: amélioration du MVP v1.1 avec module TC10 complet.

## Modifié

- `app.js`
  - support des modules `production`
  - support des sections riches `bodyHtml`
  - rendu des sources officielles par module
  - conservation du quiz et de la progression localStorage

- `style.css`
  - composants pédagogiques production: tables, callouts, formula boxes, source list, artifact template

- `data/app-data.js`
  - TC10 enrichi
  - sourceRefs ajoutés
  - sources registry synchronisé

- `data/modules.json`
  - TC10 synchronisé

- `data/sources-registry.json`
  - contrôle global au 2026-06-19
  - ajout TVA_RADIATION
  - TC10 relié à TVA_ASSUJETTISSEMENT, TVA_RATES, TDFN, TVA_RADIATION

## TC10 contient maintenant

1. Situation métier multi-clients
2. Règle opérationnelle
3. Table d’assujettissement
4. Ce qui entre / n’entre pas dans le CA déterminant
5. Arbre de décision fiduciaire
6. Paramétrage comptable si inscription
7. Mini-cas Nova Conseil Sàrl
8. Correction détaillée
9. Erreurs fréquentes
10. Signaux d’alerte senior
11. Artefact final: note d’assujettissement TVA
12. Quiz critique 8 questions, validation à 85%

## Validation technique effectuée

- JSON valide
- `app-data.js` parsable
- fichiers HTML présents
- liens relatifs conservés
- ZIP reconstruit
