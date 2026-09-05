# Contre-audit expert — Fiduciaire Formation v2.4

Date de revue: 5 septembre 2026  
Périmètre: dépôt public GitHub, GitHub Pages, application autonome, paquet apprenant TC01 et chaîne QA.

## Verdict exécutif

La publication v2.3 était techniquement saine et pédagogiquement cohérente pour TC01, mais sa première impression restait trop proche d’un programme achevé. Elle permettait aussi d’enregistrer une «validation du responsable» sans authentifier cette personne. Ce n’était pas une faille de calcul, mais un risque de confiance et de mauvaise utilisation.

La v2.4 traite ce risque comme un sujet de produit, pas comme une note de bas de page. Chaque écran indique désormais qu’il s’agit d’une édition publique de démonstration, avec 1 module complet sur 25, stockage local et validations non authentifiées. Le projet reste adapté à un pilote supervisé et à une démonstration publique. Il n’est ni un LMS sécurisé, ni un dispositif d’examen, ni une attestation professionnelle.

## Regards croisés

| Regard expert | Constat v2.3 | Correction v2.4 | Risque restant |
|---|---|---|---|
| Senior fiduciaire | TC01 développe de bons réflexes de mandat, pouvoirs, limites et escalade | Aucune dilution du contenu; les seuils et quatre erreurs critiques sont conservés | TC02–TC25 restent à produire |
| Responsable de formation | La grille et les preuves sont solides, mais le site pouvait sembler certifier la revue | Toute décision est qualifiée de trace locale; conservation hors site explicitement requise | Identité, signature et piste d’audit nécessitent un système interne |
| Compliance LPD/LBA | Les limites sont présentes, mais dispersées | Avertissement global, rappel de ne saisir aucune donnée client et prudence sur la date des sources | Revalidation juridique obligatoire avant chaque usage réel |
| UX et accessibilité | Navigation visuelle claire, mais mauvais état actif, pas de lien d’évitement et titre de page statique | `aria-current` exact, lien vers le contenu, focus après changement de route, titres contextualisés, libellés agrandis | Audit WCAG humain complet encore à réaliser |
| Sécurité applicative | Import JSON durci, mais statut de confiance de l’export non explicite | Export marqué `local-unauthenticated` et `certificate: false`; effacement local accessible | Le code et les réponses restent inspectables dans toute application statique |
| QA / publication | Tests métier solides, sans garde dédiée contre une fuite du paquet formateur | Nouveau `qa-public.mjs`: chemins interdits, ZIP apprenant, avertissements de confiance et fichiers requis | Le contrôle doit rester obligatoire dans GitHub Actions |

## Défauts corrigés pendant la contre-revue

1. Positionnement public ambigu: remplacé par un statut de pilote visible sur tous les écrans.
2. Validation locale présentée trop fortement: reformulée comme revue non authentifiée.
3. Indicateur pratique mathématiquement trompeur (`100/80`): corrigé en `100/100 · seuil 80`.
4. Navigation accessible incomplète: lien d’évitement, focus, titre et page active ajoutés.
5. Suppression des données locales cachée dans le code: action rendue accessible dans le profil.
6. Registre juridique daté pouvant être lu comme une garantie actuelle: distinction explicite entre revue éditoriale et validité au jour d’usage.
7. Paquet apprenant public renvoyant vers des chemins privés absents: ordre d’utilisation réécrit sans liens morts.
8. Absence de test anti-fuite spécifique: contrôle public ajouté à la chaîne `npm test`.

## Niveau de maturité après correction

- TC01 comme module pédagogique pilote: fort, utilisable sous supervision.
- Architecture de contrôle locale: cohérente pour l’apprentissage, impropre à la certification sécurisée.
- Transparence de la publication: satisfaisante.
- Programme de 12 mois: incomplet, car 1 compétence sur 25 seulement est publiée au standard complet.
- Dossier simulé public: acceptable après confirmation explicite de sa publication; aucune donnée client réelle ne doit être ajoutée.

## Priorités suivantes

1. Développer TC02, TC03 et TC04 au standard TC01 pour rendre le mois 1 réellement validable.
2. Tester TC01 avec un petit groupe et mesurer temps réel, erreurs récurrentes et qualité des livrables.
3. Si une attestation doit avoir une valeur interne, déplacer l’identité, les décisions et les preuves vers un système authentifié avec journal d’audit.
4. Planifier une revue périodique des références juridiques et conserver la preuve de cette revue.
5. Réaliser une session d’accessibilité humaine clavier/lecteur d’écran sur les navigateurs cibles.

## Preuves de QA

La livraison est reconstruite avec `npm run build`, puis contrôlée avec `npm test`. La chaîne vérifie les 190 pages HTML et 750 références locales, le contenu du ZIP apprenant, l’absence de chemins formateur/corrigé, les routes accessibles, les 24 fiches bloquées, le quiz TC01, les six preuves, les erreurs critiques, l’invalidation après modification et la restauration JSON sans confiance dans les validations importées.

La vérification de la page v2.3 publiée a confirmé 12 cartes mensuelles et aucune erreur JavaScript de l’application. Une erreur observée provenait de l’extension du navigateur de test, pas du site. La v2.4 a ensuite été vérifiée sur la version autonome reconstruite et dans le DOM simulé; la vérification finale de GitHub Pages doit être répétée après fusion.
