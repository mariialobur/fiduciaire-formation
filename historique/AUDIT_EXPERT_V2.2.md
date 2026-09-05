# Audit expert contradictoire — version 2.2

Date: 6 août 2026

## Méthode

Audit simulé avec cinq angles complémentaires: pratique fiduciaire suisse, ingénierie pédagogique pour adultes, contrôle interne/qualité, cadre juridique et protection des données, UX/accessibilité d’un outil hors ligne. L’objectif n’est pas de «valider par prestige», mais de rechercher les façons dont le dispositif pourrait donner une fausse impression de compétence ou produire deux décisions différentes selon le support utilisé.

## Verdict avant correction

La v2.1 était déjà nettement supérieure au MVP, mais elle ne devait pas encore être utilisée comme système d’attestation des 12 mois. Trois défauts étaient bloquants:

1. les 24 fiches annoncées «à développer» portaient techniquement le statut `core` et pouvaient être validées comme de vrais modules;
2. la grille pratique TC01 de l’application utilisait 5 critères différents des 8 critères Word/Excel;
3. le Word livré et le quiz intégré n’étaient pas issus de la même génération finale, ce qui créait deux versions de l’évaluation.

Autres risques importants: une nouvelle tentative de quiz échouée pouvait conserver un ancien succès, l’application savait exporter la progression mais pas la restaurer, et les contrôles critiques de l’interface n’avaient pas la même sémantique que la grille Excel.

### Évaluation synthétique

| Axe | v2.1 auditée | v2.2 corrigée |
|---|---:|---:|
| Honnêteté sur la maturité du contenu | 5/10 | 9.5/10 |
| Cohérence application / Word / Excel | 5/10 | 9.5/10 |
| Qualité pédagogique de TC01 | 8/10 | 9/10 |
| Robustesse de l’évaluation TC01 | 6/10 | 9/10 |
| Traçabilité juridique TC01 | 7.5/10 | 9/10 |
| Résilience du suivi hors ligne | 6/10 | 8.5/10 |
| Accessibilité et clarté UX | 7/10 | 8.5/10 |
| Complétude réelle des 12 mois | 2/10 | 2/10 |

La dernière ligne est volontairement sévère: la v2.2 améliore fortement le système et TC01, mais ne fabrique pas artificiellement les 24 modules encore absents. C’est précisément ce verrou qui évite une fausse promesse de cursus terminé.

## Corrections structurelles v2.2

- TC01 v1.2 est le seul module cœur publié; les 24 autres compétences sont des `blueprint` consultables mais non validables.
- Chaque mois affiche le nombre de modules réellement livrés. La revue mensuelle est techniquement bloquée tant que le contenu du mois n’est pas entièrement publié.
- Le quiz TC01 est synchronisé dans l’application, le dossier apprenant, le corrigé et la source JSON unique: 16 questions, seuil 13/16, Q01/Q04/Q10/Q15 critiques, réponses A/B/C/D distribuées 4/4/4/4.
- La grille pratique est identique dans l’application et Excel: 8 critères pondérés 15/20/15/10/15/10/10/5, seuil 80/100, feedback global d’au moins 80 caractères.
- Les quatre erreurs critiques sont identiques sur les supports. `Oui` signifie explicitement que l’erreur est présente et bloque la validation.
- La dernière tentative complète du quiz fait foi. Un nouvel échec critique retire la réussite et annule les validations dépendantes.
- La progression peut être exportée et réimportée en JSON dans la même version; les anciennes validations v2.1 sont réinitialisées lors de la migration car les règles de preuve ont changé.
- Navigation clavier renforcée sur les contrôles personnalisés et messages d’erreur annoncés comme alertes.
- Sources TC01 actualisées et contrôlées au 06.08.2026; LBA Fedlex et orientation FINMA actuelle sont séparées au lieu de reposer sur un lien PDF ancien comme source unique.

## Ce que la v2.2 ne prétend toujours pas faire

La plateforme ne transforme pas les 24 fiches restantes en cours. Elle ne vérifie pas cryptographiquement l’identité du responsable, ne téléverse pas les preuves, ne remplace pas le dossier documentaire du cabinet et ne délivre aucun titre fédéral. Le dispositif complet de 12 mois ne doit pas être présenté comme achevé avant développement et pilote des 24 compétences restantes.

## Décision d’usage

TC01 v1.2: prêt pour pilote interne supervisé.

Programme 12 mois: architecture de production crédible, mais pas encore cursus intégralement livrable. La bonne suite est de piloter TC01 sur quelques dossiers fictifs/anonymisés, enregistrer les erreurs et temps réels, puis développer TC02–TC04 avant d’autoriser la validation du mois 1.
