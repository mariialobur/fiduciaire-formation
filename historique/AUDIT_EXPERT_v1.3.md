# Audit historique — Fiduciaire Universelle v1.2 → v1.3

> Document conservé pour traçabilité. L’audit actif est `AUDIT_V2.md`.

Date: 2026-06-20  
Périmètre: plateforme offline, tronc commun, tracks sectoriels hors Agriculture, TC10.

## Diagnostic sévère

La version v1.2 avait une bonne direction produit, mais pas encore une vraie profondeur de programme. Le point fort était TC10, construit comme module de production: situation métier, règles opérationnelles, table, arbre de décision, mini-cas, correction, erreurs fréquentes, signaux senior, artefact et quiz. Le problème était l’écart de maturité: un module fort, quelques modules pilotes courts et beaucoup de modules vides.

## Forces

1. Vision juste: tronc commun obligatoire puis spécialisation sectorielle.
2. Format offline pertinent pour une école ou un cabinet.
3. LocalStorage simple et exportable.
4. TC10 donne une vraie référence pédagogique.
5. Exclusion Agriculture respectée.

## Faiblesses critiques observées

1. Les tracks hors Construction étaient visibles mais sans axes ni modules réels.
2. 34 modules du tronc commun/construction étaient au statut `planned`, sans objectif, sections, quiz ni artefact.
3. Les modules pilotes étaient trop courts pour former un réflexe professionnel autonome.
4. Le bouton “Marquer comme complété” permettait une validation sans quiz suffisant.
5. Le registre des sources ne couvrait pas encore les domaines nécessaires: CO, LIFD, nLPD, LBA, douane, CCNT, fiscalité cantonale.
6. L’UX de progression annonçait une plateforme complète alors que le contenu réel ne le permettait pas encore.
7. Les modules sectoriels ne véhiculaient pas encore la logique cabinet: pièces → qualification → écriture/calcul → source → note senior.

## Corrections v1.3 apportées

1. Ajout d’une architecture complète de 174 modules.
2. Ajout d’axes pédagogiques pour chaque track sectoriel.
3. Transformation des modules vides en blueprints exploitables.
4. Génération de pages HTML pour tous les modules.
5. Ajout d’un statut pédagogique clair: production, pilote, blueprint.
6. Renforcement de l’UX: statistiques dynamiques, badges, seuils, rubriques de revue.
7. Sécurisation de la validation: un module avec quiz non réussi passe en `review_ready`, pas en `completed`.
8. Registre des sources élargi et politique de relecture ajoutée.

## Recommandation de production

Ne pas essayer de produire les 174 modules complets d’un coup. La bonne méthode est une chaîne industrielle:

1. Finaliser 6 modules étalons du tronc commun: TC01, TC05, TC10, TC13, TC16, TC23.
2. Finaliser 3 modules étalons par track P1: Construction, Hôtellerie, Commerce, Immobilier.
3. Transformer progressivement chaque blueprint en module complet selon le format TC10.
4. Ajouter des cas “bruyants”: pièces manquantes, erreurs client, comptes d’attente, TVA douteuse, salaires incomplets, vieux soldes.
5. Ajouter une revue senior simulée avec grille de notation.

## Verdict

La version v1.2 était un MVP prometteur. La version v1.3 devient une vraie base de plateforme complète. Elle n’est pas encore un cours fini sur 174 modules, mais elle donne une architecture solide, vendable comme prototype avancé, avec une méthode de production claire.
