# TC03 — Protection des données, accès et gestion des incidents

## 1. Pourquoi ce module existe

Une fiduciaire traite quotidiennement des informations qui peuvent exposer fortement un client ou ses collaborateurs: identité, salaires, comptes bancaires, dettes, contrats, données familiales, absences, parfois données de santé. La majorité des incidents ne commence pas par une attaque informatique spectaculaire. Elle commence par un geste banal: mauvais destinataire, accès oublié, lien public, export local, compte partagé ou dossier trop largement accessible.

Le rôle d’un assistant comptable n’est pas de devenir juriste spécialisé en protection des données. En revanche, il doit être capable de répondre correctement à des questions opérationnelles:

- Pourquoi avons-nous cette donnée?
- Est-elle nécessaire à la tâche?
- Qui doit réellement y accéder?
- Quel niveau d’accès est nécessaire?
- Quel canal peut être utilisé?
- Combien de temps faut-il la conserver?
- Que faire si elle a été exposée par erreur?

La méthode TC03 est:

**finalité → nécessité → destinataire → accès → canal → trace**.

En cas d’incident:

**contenir → préserver → alerter → documenter → laisser la décision au bon niveau**.

---

## 2. Finalité et proportionnalité avant la collecte

La première erreur consiste à collecter tout ce que le client peut envoyer. Un cabinet ne doit pas construire ses dossiers selon le principe «cela pourrait servir un jour».

Avant de demander ou conserver une donnée, décrire sa finalité. Exemple:

| Donnée | Finalité possible | Question de contrôle |
|---|---|---|
| Facture fournisseur | Comptabilisation et contrôle | La pièce contient-elle des données inutiles à diffuser au-delà du dossier? |
| IBAN salarié | Paiement du salaire | Qui a besoin de voir ou modifier cette information? |
| Adresse privée salarié | Payroll / obligations administratives | Est-elle nécessaire pour la tâche concernée? |
| Certificat médical | Gestion d’une absence selon procédure | Le dossier comptable général doit-il vraiment contenir le diagnostic ou le document complet? |
| Journal des salaires | Réconciliation payroll | Le destinataire a-t-il besoin du journal complet ou seulement d’un total? |

La bonne question n’est pas «avons-nous le droit d’avoir un fichier?», mais «quel traitement est nécessaire à la finalité réellement poursuivie?».

### 2.1 Minimiser n’est pas supprimer aveuglément

La minimisation ne signifie pas effacer une pièce que le cabinet doit légalement ou contractuellement conserver. Elle signifie éviter les copies, les destinataires et les catégories de données qui n’ont pas de fonction défendable.

Une donnée peut donc être nécessaire dans un dossier restreint et inutile dans un export local ou un e-mail collectif.

---

## 3. La matrice des accès

Un accès professionnel se définit par quatre éléments:

1. **personne ou rôle**;
2. **ressource**;
3. **niveau de droit**;
4. **durée ou événement de revue**.

### 3.1 Niveaux de droit

Éviter le simple choix «accès oui/non». Selon le système, distinguer:

- lecture;
- création/saisie;
- modification;
- export;
- approbation;
- administration;
- gestion des droits.

Un assistant qui saisit des factures n’a pas automatiquement besoin de gérer les utilisateurs ou d’exporter tout le payroll.

### 3.2 Accès nominatif

Un accès partagé rend difficile la réponse à une question simple: «qui a effectué cette action?». Les comptes nominatifs améliorent la révocation, la journalisation et la responsabilité opérationnelle.

Un mot de passe commun transmis par e-mail ou messagerie ne devient pas acceptable parce que «toute l’équipe travaille sur le dossier».

### 3.3 Moindre privilège

Le moindre privilège consiste à donner les droits nécessaires à la tâche et pas davantage. Il ne s’agit pas de compliquer le travail, mais de limiter la conséquence d’une erreur ou d’un compte compromis.

Exemple:

| Rôle | Comptabilité | Payroll | Banque | Admin utilisateurs |
|---|---|---|---|---|
| Assistant comptable | lecture/écriture selon dossier | non sauf mandat/tâche | lecture selon besoin | non |
| Payroll specialist | accès payroll nécessaire | oui | selon procédure | non |
| Responsable mandat | contrôle/approbation | selon mandat | selon responsabilités | éventuellement demande, pas forcément administration technique |
| IT/admin | droits techniques nécessaires | contenu uniquement si indispensable | selon architecture | oui |

La matrice réelle du cabinet peut être différente. Le principe est que chaque droit doit être explicable.

---

## 4. Cycle d’accès: arrivée, changement, départ

La sécurité ne se limite pas à la création du compte.

### Arrivée

- rôle défini;
- dossiers attribués;
- droits minimum nécessaires;
- MFA ou mécanisme d’authentification prévu;
- canal de transmission des identifiants conforme;
- règles du cabinet connues.

### Changement de fonction

Lorsqu’un collaborateur change de portefeuille ou de rôle, il faut retirer les anciens droits, pas seulement ajouter les nouveaux.

### Départ

Le départ est un événement de contrôle. Selon la procédure et les outils, vérifier notamment:

- comptes applicatifs;
- messagerie;
- cloud;
- VPN / accès distant;
- gestionnaire de mots de passe;
- appareils;
- sessions actives;
- clés ou tokens;
- dossiers partagés;
- délégations ou groupes;
- comptes clients externes.

Une checklist signée «compte principal désactivé» est insuffisante si trois accès secondaires restent actifs.

---

## 5. Destinataire autorisé ≠ adresse connue

Une adresse présente dans le carnet d’adresses ne prouve pas que son titulaire doit recevoir la donnée.

Avant un envoi sensible:

1. identifier le destinataire;
2. vérifier son rôle et son autorisation;
3. déterminer le minimum de données nécessaire;
4. utiliser le canal prévu;
5. vérifier les pièces jointes;
6. vérifier les destinataires visibles/cachés;
7. conserver la trace nécessaire.

### 5.1 Adresse personnelle

Une adresse personnelle peut créer plusieurs questions: contrôle de l’accès, rétention, transfert vers un service tiers, mélange privé/professionnel. Le junior ne décide pas que «Gmail est suffisamment sûr» parce que le client le demande. Il suit le canal validé par le cabinet ou escalade l’exception.

### 5.2 Le bon fichier au mauvais destinataire

Le contenu peut être parfaitement correct et tout de même constituer un incident si le destinataire n’est pas autorisé.

### 5.3 Le mauvais fichier au bon destinataire

Un client autorisé à recevoir ses comptes n’a pas forcément besoin de recevoir un export payroll contenant des données individuelles de salariés.

---

## 6. Données salariales et données sensibles

La paie concentre des données personnelles et peut contenir des données particulièrement sensibles. Le dossier doit donc être structuré par besoin d’en connaître.

### Bonnes pratiques opérationnelles

- séparer les zones comptabilité et payroll lorsque les rôles sont différents;
- éviter les exports complets pour répondre à une question partielle;
- limiter l’accès aux certificats médicaux et autres données sensibles;
- documenter les personnes ou rôles qui peuvent exporter;
- utiliser les canaux prévus pour les échanges avec le client;
- supprimer les copies locales temporaires lorsque leur finalité est terminée, selon la politique du cabinet;
- ne jamais copier un dossier salarial réel dans une application publique ou un outil non approuvé pour «tester» une fonction.

### Exemple

Le responsable du client demande: «Combien avons-nous de charges salariales en août?»

Répondre avec un export contenant nom, IBAN, adresse, salaire, absence et certificat médical de 18 salariés serait disproportionné si un total réconcilié suffit à la question.

---

## 7. Partage de fichiers et liens

Les services modernes permettent souvent plusieurs types de partage:

- personne nominative;
- groupe interne;
- domaine de l’entreprise;
- invité externe;
- toute personne avec le lien;
- lien public.

Pour un dossier sensible, la différence est essentielle.

Un lien difficile à deviner n’est pas un contrôle d’autorisation. Le partage doit refléter le destinataire autorisé et être révoqué lorsqu’il n’est plus nécessaire.

### Contrôles à documenter

- propriétaire du dossier;
- destinataires;
- droit lecture/modification;
- expiration éventuelle;
- possibilité de téléchargement;
- historique d’accès si disponible;
- révocation;
- justification de l’exception.

---

## 8. Cloud: comprendre avant de charger

Le cloud est courant et n’est pas en soi interdit. Le risque apparaît lorsque le cabinet charge des données sans comprendre le traitement.

Avant un nouveau fournisseur ou une nouvelle fonction cloud, la revue compétente doit notamment s’intéresser à:

- nature et sensibilité des données;
- rôle du fournisseur;
- traitement selon instructions;
- sécurité et authentification;
- sous-traitants ultérieurs;
- lieux de traitement et transferts internationaux pertinents;
- sauvegardes;
- disponibilité;
- restitution;
- suppression;
- gestion des incidents;
- droits d’accès internes.

Le junior doit savoir reconnaître le signal et ne pas transférer les données «pour essayer» avant validation.

### Exemple dangereux

Un collaborateur installe un outil de résumé automatique, dépose dix contrats de travail réels, puis demande après coup au responsable si l’outil est autorisé.

Le mauvais ordre est: **charger → tester → demander**.

Le bon ordre est: **qualifier les données → vérifier l’outil/circuit → obtenir l’autorisation → utiliser selon les limites**.

---

## 9. Qu’est-ce qu’un incident de sécurité des données?

Dans le cadre de TC03, considérer comme signal d’incident toute situation où des données personnelles peuvent avoir été:

- perdues;
- effacées ou détruites de manière accidentelle ou illicite;
- modifiées de manière non autorisée;
- divulguées;
- rendues accessibles à une personne non autorisée.

Le junior n’a pas besoin de savoir immédiatement si l’événement déclenche une notification réglementaire. Il doit reconnaître que l’événement mérite une réponse structurée.

---

## 10. Les cinq premières actions après un incident

### 1. Contenir

Limiter l’exposition lorsque cela est possible: fermer un lien public, révoquer un accès, rappeler un partage, demander au destinataire erroné de ne pas utiliser/transmettre et de suivre l’instruction du cabinet.

Le confinement ne doit pas détruire les éléments nécessaires à comprendre ce qui s’est passé.

### 2. Alerter

Informer immédiatement la personne désignée dans la procédure. Une erreur «petite» pour le collaborateur peut être matérielle en raison du type de données ou du nombre de personnes concernées.

### 3. Préserver les faits

Conserver:

- heure/date;
- système;
- fichier;
- catégories de données;
- personnes potentiellement concernées;
- destinataire ou accès;
- actions effectuées;
- journaux disponibles;
- captures ou messages utiles selon procédure.

### 4. Documenter sans spéculer

Séparer:

- **fait confirmé**;
- **hypothèse**;
- **information inconnue**;
- **action prise**;
- **décision à prendre**.

### 5. Escalader la qualification

La personne compétente évalue notamment le risque pour les personnes concernées et les obligations prévues par la LPD. Le junior ne transforme pas son intuition en conclusion réglementaire.

---

## 11. Ce qu’il ne faut pas faire après un incident

### Effacer les preuves

Supprimer l’e-mail envoyé, modifier le journal ou vider l’historique pour «faire disparaître l’erreur» empêche l’évaluation correcte.

### Attendre une plainte

Le fait que personne ne se soit plaint ne prouve pas qu’il n’y a pas de risque.

### Informer tout le monde sans circuit

L’information des personnes concernées peut être nécessaire dans certaines situations, mais elle doit être décidée et organisée par la personne compétente. Envoyer un message improvisé peut créer une seconde fuite ou des informations contradictoires.

### Négocier seul avec le destinataire

Demander au destinataire de supprimer peut faire partie du confinement, mais cela ne remplace pas l’alerte interne ni la documentation.

---

## 12. Fiche d’incident: structure minimale

Une fiche utile au responsable contient:

### Identification

- date/heure découverte;
- personne ayant découvert;
- système/dossier;
- client ou processus anonymisé dans l’exercice.

### Faits

- ce qui s’est passé;
- données concernées;
- volume connu ou estimé;
- destinataires ou accès non autorisés;
- durée d’exposition;
- accès/téléchargement connu si l’outil permet de le vérifier.

### Confinement

- action;
- heure;
- auteur;
- résultat.

### Inconnues

- faits restant à confirmer;
- journaux ou sources à consulter.

### Escalade

- personne informée;
- heure;
- décisions demandées.

La fiche ne contient pas une conclusion inventée «aucun risque» si l’évaluation n’a pas encore été faite.

---

## 13. Demande d’accès d’une personne concernée

Une demande d’accès crée également un risque de divulgation si l’identité est mal vérifiée.

La bonne séquence est:

1. reconnaître la demande;
2. transmettre au circuit compétent;
3. vérifier l’identité de manière appropriée;
4. déterminer le rôle du cabinet et du client;
5. identifier les données/périmètre;
6. préparer une réponse sécurisée selon instruction;
7. conserver la trace.

Le junior ne doit pas envoyer immédiatement «tout ce que nous avons» à une nouvelle adresse e-mail sans contrôle.

---

## 14. Conservation, copies et exports

Les obligations de conservation comptables peuvent imposer de conserver certaines pièces pendant une durée déterminée. Cela ne justifie pas toutes les copies.

Il faut distinguer:

- original/record officiel à conserver;
- archive contrôlée;
- copie de travail;
- export temporaire;
- téléchargement sur poste personnel;
- pièce jointe e-mail;
- sauvegarde.

Un export temporaire devenu inutile doit suivre la politique de suppression/archivage du cabinet. Laisser des CSV payroll sur les postes pendant des années «parce qu’on pourrait en avoir besoin» augmente le risque sans améliorer la comptabilité.

---

## 15. Cas Rivage Services SA: ordre de priorité

Le cas du module présente six problèmes simultanés. Le learner doit éviter de les traiter dans l’ordre où ils apparaissent à l’écran.

Une hiérarchisation défendable commence par les expositions actives:

1. ancien collaborateur encore connecté;
2. lien accessible à toute personne disposant de l’URL;
3. envoi salarial au mauvais fournisseur;
4. export local personnel;
5. données sensibles trop largement rangées;
6. demande d’envoi Gmail à traiter avant transmission.

La hiérarchie exacte peut varier selon les faits. Ce qui compte est de distinguer **exposition actuelle**, **incident déjà survenu** et **demande future que l’on peut encore empêcher**.

---

## 16. Ce que le responsable doit voir en deux minutes

À la fin de TC03, le responsable doit pouvoir répondre immédiatement:

- Quelles catégories de données sont traitées et pourquoi?
- Qui a accès à quoi?
- Quels droits sont trop larges?
- Quels partages externes existent?
- Quels accès doivent être supprimés?
- Quel incident s’est produit?
- Quelles mesures de confinement ont été prises?
- Quels faits sont encore inconnus?
- Quelle décision doit être prise par le responsable?

Si la revue nécessite de reconstruire les accès à partir de captures dispersées, le dossier n’est pas prêt.

---

## 17. Règle finale

La protection des données n’est pas un bloc juridique posé à côté de la comptabilité. C’est une propriété du processus de production.

Un dossier de qualité doit permettre de démontrer:

**bonne donnée · bonne finalité · bonne personne · bon accès · bon canal · bonne trace**.

Et lorsqu’un contrôle échoue:

**contenir · préserver · alerter · documenter · escalader**.
