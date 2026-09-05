# Audit expert — Fiduciaire Formation v2.3

Date de gel: 6 août 2026  
Périmètre: application hors ligne, TC01 v1.3, paquet apprenant, paquet responsable et mécanismes de validation.

## Verdict

La v2.3 ferme les six écarts systémiques identifiés lors de la contre-revue de la v2.2. Le TC01 et l'architecture de contrôle sont suffisamment cohérents pour un pilote interne supervisé. La plateforme complète ne doit toutefois pas être présentée comme une formation de 12 mois achevée: 1 module cœur sur 25 est publié et les 24 autres restent des `blueprint` non validables.

Cette application hors ligne n'est pas un LMS certifié, ne fournit pas d'authentification d'identité et ne transforme pas un fichier JSON local en preuve infalsifiable. La v2.3 traite donc la sauvegarde comme une restauration de travail, jamais comme un certificat de validation.

## Corrections structurantes de la v2.3

1. Le seuil TC01 est désormais cohérent avec la règle des modules critiques: 14/16 (87,5 %) et réussite obligatoire de Q01, Q04, Q10 et Q15.
2. Les métadonnées actives sont alignées sur plateforme v2.3 / TC01 v1.3; les mentions antérieures ne subsistent que dans `historique/` ou dans les tests négatifs de migration/seuil.
3. L'import JSON est durci: profil, artefacts et travail de l'apprenant peuvent être restaurés; quiz réussi, revue pratique, validations de module/mois et décision du responsable sont réinitialisés et doivent être reconfirmés.
4. `data/sources-registry.json` et le registre actif sont resynchronisés. TC01 référence explicitement LBA, OBA et pratique FINMA pour le trafic des paiements.
5. Le QA est reproductible depuis la livraison avec `package.json`, `package-lock.json`, `jsdom` et `npm test`; le mode opératoire est décrit dans `QA_REPRODUCIBLE.md`.
6. L'OBA (RS 955.01), notamment ses art. 4 et 7, a été ajoutée comme base normative autonome pour l'analyse des services de paiement et du caractère professionnel de l'activité.

La vérification visuelle finale a en outre détecté une occurrence textuelle isolée de l'ancien seuil «13 réponses» dans le cours Word. Elle a été corrigée avant gel; les documents finaux affichent tous 14/16.

## Position juridique et pédagogique

Les sources ont été revues au 6 août 2026 sur les sites officiels Fedlex, AFC, PFPDT et FINMA. Le cas TVA distingue l'échéance légale du 31.08.2026 des délais client et internes. Pour les paiements de tiers, le junior ne qualifie pas seul le régime LBA: il suspend l'acte sensible et transmet au responsable le mandat, les pouvoirs, les flux, les accès, les contrôles et les faits utiles à l'analyse.

La formation rappelle expressément qu'une source pédagogique datée doit être revalidée avant usage sur un dossier réel.

## Limite de maturité restante

Le principal risque restant n'est plus TC01 mais la couverture du programme: TC02 à TC25 ne sont pas encore produits au même niveau. Tant que ces modules restent des `blueprint`, la validation mensuelle correspondante demeure techniquement bloquée. C'est un choix volontaire de qualité et de transparence.

