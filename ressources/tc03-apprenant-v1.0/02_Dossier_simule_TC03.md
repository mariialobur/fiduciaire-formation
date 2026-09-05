# TC03 — Dossier simulé apprenant

## Rivage Services SA — accès, partage et incident payroll

**Date de référence:** 5 septembre 2026  
**Données:** entièrement fictives  
**Mandat simulé:** comptabilité mensuelle + paie de 18 salariés

> Traiter la remise 1 avant d’ouvrir la remise 2. Conserver la première analyse et documenter les changements.

---

# Remise 1 — lundi 08:20

Vous reprenez le dossier Rivage Services SA après les vacances d’un collègue. Six situations sont visibles.

## A01 — Ancien collaborateur encore actif

Thomas R., ancien assistant du cabinet, a quitté l’entreprise le 31 août. Son compte `thomas.r` apparaît encore actif dans le logiciel comptable. Le journal montre une connexion le 2 septembre à 18:43 depuis une adresse IP externe. Aucun élément ne permet encore de savoir si Thomas s’est réellement connecté ou si une ancienne session/token est resté actif.

Droits du compte:

- lecture/écriture comptabilité;
- lecture payroll;
- export des rapports;
- accès au dossier cloud Rivage.

## A02 — Demande Gmail

Claire D., responsable RH chez Rivage, écrit depuis son adresse professionnelle:

> «Je suis en déplacement. Envoyez-moi le journal des salaires d’août sur claire.rivage@gmail.com, c’est plus simple sur mon téléphone.»

Le dossier contient son adresse Gmail dans une ancienne fiche contact, mais aucune règle ne confirme l’usage de cette adresse pour le payroll.

## A03 — Lien cloud trop large

Le dossier `Rivage/Payroll/2026` est configuré avec l’option «Toute personne disposant du lien peut consulter». Le lien figure dans un ancien e-mail envoyé à trois personnes du client. L’interface indique 27 consultations, mais ne permet pas immédiatement d’identifier toutes les personnes.

## A04 — Certificat médical mal classé

Un certificat médical PDF concernant une salariée est classé dans `Rivage/Comptabilité/2026/Août/Pièces à saisir`, dossier accessible aux assistants comptables du portefeuille. La fiche payroll correspondante se trouve dans la zone restreinte RH/Payroll.

## A05 — Export sur ordinateur personnel

Un collègue note dans Teams simulé:

> «J’ai exporté `salaires-aout.csv` sur mon laptop perso dimanche pour finir la réconciliation à la maison. Je le supprimerai ce soir.»

Le fichier contient nom, adresse, IBAN, salaire brut, net, allocations et retenues.

## A06 — Mauvais destinataire

À 08:05, un assistant a envoyé `controle_salaires_aout.xlsx` à `factures@fournisseur-example.ch` au lieu de `finance@rivage-example.ch` à cause de l’autocomplétion.

Le tableau contient:

- nom et prénom des 18 salariés;
- salaire brut et net;
- IBAN;
- absence oui/non;
- numéro interne employé.

À 08:17, le fournisseur répond: «Je pense que ce fichier ne nous était pas destiné. Je ne l’ai pas transféré.»

Aucune autre action n’a encore été prise.

---

# Travail remise 1

## 1. Prioriser

Classer A01–A06 en:

- exposition active à contenir;
- incident déjà survenu;
- demande future à bloquer/clarifier;
- problème d’organisation à corriger.

Justifier l’ordre de traitement.

## 2. Matrice d’accès

Compléter les rôles suivants:

- assistant comptable;
- payroll specialist;
- responsable de mandat;
- responsable RH client;
- ancien collaborateur;
- fournisseur externe.

Pour chaque rôle: comptabilité, payroll, export, cloud, administration et durée/revue du droit.

## 3. Fiche d’incident A06

Documenter uniquement les faits connus. Ne conclure ni «aucun risque» ni «notification obligatoire» sans décision du responsable.

## 4. Demandes immédiates

Préparer une liste d’actions à transmettre au responsable avec propriétaire et heure cible.

**Arrêtez-vous avant la remise 2.**

---

# Remise 2 — lundi 10:15

## B01 — Thomas / accès

L’IT confirme:

- le compte Thomas n’avait pas été désactivé;
- la connexion du 2 septembre provient d’un ordinateur du cabinet resté connecté avec une session ancienne;
- aucun téléchargement n’apparaît dans les logs disponibles;
- le compte est désormais désactivé et toutes les sessions ont été révoquées à 09:02;
- trois autres partages cloud liés au compte ont été trouvés et supprimés.

## B02 — Lien cloud

Le partage «toute personne avec le lien» est fermé à 08:47. Les trois contacts client autorisés ont reçu un accès nominatif. L’historique confirme 27 ouvertures, mais seulement 22 peuvent être rattachées avec certitude aux utilisateurs autorisés. Cinq ouvertures restent non attribuées.

## B03 — Gmail

Le responsable de mandat confirme que le canal autorisé est le portail client et qu’aucun journal salarial ne doit être envoyé à une adresse personnelle. Claire dispose déjà d’un compte portail actif. Le responsable demande de répondre par son adresse professionnelle en lui indiquant que le document est disponible sur le portail.

## B04 — Certificat médical

Le responsable payroll confirme que le certificat était nécessaire à une vérification d’absence, mais ne devait pas être rangé dans le dossier comptable général. Il est déplacé vers l’espace payroll restreint à 09:15. L’historique d’accès montre que deux assistants comptables ont ouvert le dossier général pendant la période où le PDF s’y trouvait; les logs ne permettent pas de confirmer s’ils ont ouvert le certificat lui-même.

## B05 — Laptop personnel

Le collaborateur confirme que le fichier existe toujours sur son laptop privé et dans le dossier «Téléchargements». L’IT et le responsable sécurité prennent en charge la procédure. Le learner ne doit pas demander au collègue de tout effacer avant que les faits nécessaires soient documentés.

## B06 — Mauvais destinataire

Le fournisseur confirme par écrit à 09:10:

- avoir ouvert l’e-mail;
- ne pas avoir ouvert la pièce jointe selon sa déclaration;
- avoir supprimé l’e-mail et la pièce jointe sur demande du responsable;
- ne pas avoir transmis le message.

Le responsable interne demande une fiche complète pour évaluer l’art. 24 LPD et décider des suites. Aucune décision de notification ou d’information des salariés n’est encore prise.

---

# Travail final

Mettre à jour chaque livrable et conserver les décisions de la remise 1.

Le dossier final doit montrer:

- révocation et contrôle étendu des accès de Thomas;
- fermeture du lien public et traitement des cinq ouvertures non attribuées comme inconnue factuelle;
- refus du canal Gmail au profit du portail autorisé;
- restriction du certificat médical;
- escalade de l’export personnel sans destruction prématurée de la piste;
- fiche A06 séparant déclaration du fournisseur et fait techniquement prouvé;
- aucune conclusion autonome sur notification PFPDT;
- responsabilités et heures des actions;
- journal de vérification des sources et contrôles.

## Question de synthèse

Rédiger 8 à 12 lignes pour le responsable:

1. que s’est-il passé;
2. quelles expositions sont désormais contenues;
3. quels faits restent inconnus;
4. quelles décisions doivent encore être prises;
5. quelles corrections de contrôle interne éviteront une répétition.
