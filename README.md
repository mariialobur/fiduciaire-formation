<div align="center">

# Fiduciaire Formation

### Parcours suisse de 12 mois pour passer de l’assistance comptable à l’autonomie supervisée sur des dossiers PME courants

[![Live](https://img.shields.io/badge/demo-GitHub%20Pages-0d7b75?style=flat-square)](https://mariialobur.github.io/fiduciaire-formation/)
[![Programme](https://img.shields.io/badge/parcours-12%20mois-102f3c?style=flat-square)](./PROGRAMME_12_MOIS.md)
[![Core](https://img.shields.io/badge/compétences%20cœur-25-d86d50?style=flat-square)](#-où-en-est-le-projet)
[![TC01](https://img.shields.io/badge/TC01-v1.4-2e7957?style=flat-square)](#-tc01--le-module-étalon)
[![QA](https://img.shields.io/badge/QA-GitHub%20Actions-6b7280?style=flat-square)](./.github/workflows/qa.yml)

**[Ouvrir la démo](https://mariialobur.github.io/fiduciaire-formation/)** · **[Voir le programme](./PROGRAMME_12_MOIS.md)** · **[Audit expert](./AUDIT_EXPERT_V2.4.md)**

</div>

> [!IMPORTANT]
> **Édition publique de démonstration.** Le parcours compte 25 compétences cœur, mais **TC01 est actuellement le seul module publié au standard pédagogique complet**. Les 24 autres compétences restent des fiches de cadrage non validables tant qu’elles n’ont pas été développées au même niveau.

Fiduciaire Formation est un prototype de parcours interne destiné à accompagner un·e assistant·e comptable dans une fiduciaire suisse. L’objectif n’est pas d’accumuler des cours, mais de développer progressivement une capacité observable à **produire, contrôler, documenter, escalader puis intégrer une revue**.

La progression est organisée sur 12 mois autour de dossiers PME courants: ouverture de mandat, comptabilité mensuelle, réconciliations, TVA, paie simple, clôture, fiscalité de base et reporting.

---

## 🎯 Pourquoi ce projet

Les formations comptables classiques évaluent souvent la connaissance d’une règle ou la réussite d’un quiz. En cabinet, cela ne suffit pas.

Un collaborateur doit aussi savoir:

- identifier ce qui manque avant de commencer;
- distinguer ce qui est inclus, à confirmer, hors mandat ou à escalader;
- relier une écriture, une date ou une décision à une pièce et à une source;
- laisser une piste de travail qu’un autre collaborateur peut reprendre;
- reconnaître les situations où l’autonomie s’arrête;
- intégrer les corrections du responsable sans effacer l’historique de la première analyse.

Le parcours est donc construit comme une **progression de délégation**, pas comme une collection de chapitres.

## 🧭 Les 4 niveaux de délégation

| Période | Niveau visé | Résultat attendu |
|---|---|---|
| Mois 1–3 | Observation guidée → exécution avec checklist | Sécuriser le mandat, comprendre les comptes et produire un mois reprenable |
| Mois 4–6 | Préparation pour revue | Qualifier et préparer la TVA avec sources et concordances |
| Mois 7–9 | Préparation pour revue → autonomie sur travaux courants | Produire la paie simple et préparer les travaux de clôture |
| Mois 10–12 | Autonomie avec revue ciblée | Clôturer, préparer fiscalité/reporting et gérer un dossier PME courant de bout en bout |

Le résultat final recherché n’est pas «savoir tout faire seul». C’est pouvoir gérer un périmètre courant défini, avec des contrôles ciblés et une escalade pertinente.

---

## 🧩 Où en est le projet

**État actuel:** architecture de programme complète, contenu pédagogique encore en production.

- **12 mois** structurés;
- **25 compétences cœur** positionnées dans la feuille de route;
- **1 module étalon complet:** TC01 v1.4;
- **24 fiches de cadrage** encore à développer au standard TC01;
- **12 jalons mensuels** avec pratique, livrables, note de preuve et revue humaine;
- **2 simulateurs TVA** externes intégrés au parcours;
- **1 cas final** de bout en bout au mois 12;
- progression locale dans le navigateur avec export/import JSON contrôlé;
- GitHub Actions pour la QA, les liens et la sécurité de l’édition publique.

Les mois restent volontairement **non validables** tant qu’un module prévu pour le mois n’est encore qu’une fiche de cadrage.

---

## 🧱 TC01 — le module étalon

**Mandat fiduciaire, périmètre et responsabilités — v1.4**

TC01 sert de **MASTER standard** pour les prochains modules. Il ne cherche pas à transformer un junior en responsable de mandat. Il vérifie qu’il peut préparer l’ouverture d’un dossier PME courant sans engager le cabinet sur une base mal cadrée.

Le cas simulé met l’apprenant face à une demande TVA urgente avec:

- extrait RC ancien puis actualisé;
- pouvoirs et délégation limités;
- mandat avec exclusions;
- données personnelles et accès sensibles;
- échéance TVA à vérifier;
- demande de paiement hors périmètre;
- seconde remise de documents qui modifie partiellement la décision initiale.

### Ce que TC01 v1.4 change

La version 1.4 applique une règle simple:

> **fait → contrôle → source → décision → trace**

La mémorisation d’un numéro d’article n’est plus traitée comme une compétence en soi. Le quiz mesure d’abord la capacité à identifier **le bon contrôle professionnel** et à retrouver la source utile.

TC01 v1.4 comprend notamment:

- un dossier métier en deux remises;
- une logique **GO / GO sous conditions / NO-GO**;
- 16 questions dont 4 critiques;
- seuil de réussite: **14/16**, avec les 4 questions critiques obligatoirement correctes;
- 6 livrables distincts;
- une revue pratique sur **100 points**;
- 4 contrôles critiques à zéro erreur;
- des repères de notation communs: insuffisant / partiel / attendu / très bon;
- une invalidation automatique de la revue lorsque le travail ou une preuve est modifié après validation.

### Les 6 livrables TC01

1. fiche d’ouverture;
2. calendrier des obligations et dépendances;
3. registre des demandes hors mandat;
4. note GO / GO sous conditions / NO-GO;
5. e-mail client de clarification;
6. **journal de vérification des sources et contrôles**.

Le modèle du journal est disponible ici: [`ressources/tc01-v1.4-complement/Journal_verification_TC01.csv`](./ressources/tc01-v1.4-complement/Journal_verification_TC01.csv).

> [!NOTE]
> Le ZIP apprenant historique v1.3 reste disponible pendant la transition. Le complément v1.4 ajoute le nouveau journal de vérification et documente les changements d’évaluation. Une reconstruction complète du paquet binaire pourra être faite lors du gel définitif du standard.

---

## 🗓 Structure des 12 mois

| Mois | Thème principal | Production centrale |
|---:|---|---|
| 1 | Entrer dans un dossier fiduciaire | Mandat, pouvoirs, accès, KYC/escalade |
| 2 | Comprendre les comptes avant de saisir | Double écriture, plan comptable, lecture des impacts |
| 3 | Produire un mois comptable fiable | Achats, ventes, banque, caisse, réconciliations |
| 4 | Qualifier la TVA | Assujettissement, lieu, exclusions/exonérations, taux |
| 5 | Préparer un décompte effectif | TVA, impôt préalable, concordance |
| 6 | Maîtriser la méthode TDFN | Activités, limites, concordance annuelle |
| 7 | Produire une paie simple | Paramétrage, fiche, paiement, écritures |
| 8 | Boucler l’année salariale | Cumuls, certificat de salaire, impôt source |
| 9 | Préparer les écritures de clôture | Immobilisations, amortissements, cut-off |
| 10 | Clôturer un dossier PME | Dossier de clôture prêt pour senior |
| 11 | Préparer fiscalité et reporting | Passerelle fiscale, analyse et note client |
| 12 | Cas final de bout en bout | Dossier PME complet + revue + version corrigée |

Le référentiel détaillé se trouve dans [`PROGRAMME_12_MOIS.md`](./PROGRAMME_12_MOIS.md).

---

## 🧪 Validation et preuves

La plateforme distingue trois choses:

**Connaissance.** Quiz professionnel avec seuil standard de 80% et seuil renforcé pour les modules critiques.

**Production.** Livrables réalisés sur dossier simulé ou anonymisé, avec références de preuve et note de travail.

**Délégation.** Décision documentée d’un responsable sur le niveau de travail qui peut être confié au collaborateur.

Une validation enregistrée dans la version publique reste une **trace locale non authentifiée**. Elle ne remplace ni une signature interne, ni un LMS sécurisé, ni une décision RH, ni une attestation professionnelle.

---

## 🧾 Simulateurs TVA

Deux ressources externes complètent le parcours:

- **méthode effective:** https://mariialobur.github.io/tva-debutant/
- **méthode TDFN:** https://mariialobur.github.io/tva-tdfn/

Elles doivent être utilisées avec les consignes du mois concerné et revalidées avant usage si les règles, taux ou interfaces officielles ont évolué.

---

## 🔒 Données, sécurité et limites

L’application publique est statique et fonctionne entièrement dans le navigateur.

- aucune création de compte;
- aucune base de données distante;
- aucun fichier de preuve téléversé;
- progression stockée dans `localStorage`;
- export JSON disponible pour sauvegarde;
- les validations importées ne sont pas considérées comme fiables et doivent être reconfirmées;
- aucune donnée client réelle ne doit être saisie dans l’édition publique.

Le code côté client reste inspectable. Cette plateforme **n’est donc pas un dispositif d’examen sécurisé**.

Le parcours ne délivre pas de titre fédéral et ne qualifie pas automatiquement pour:

- conseil fiscal complexe;
- restructurations ou planification internationale;
- audit, consolidation ou expertise;
- décisions LBA réservées aux personnes compétentes;
- payroll transfrontalier sensible;
- signature ou dépôt hors mandat ou délégation.

---

## 🗂 Architecture du dépôt

```text
fiduciaire-formation/
├── index.html                  # entrée GitHub Pages
├── index-multifile.html        # entrée multi-fichiers de développement
├── LANCER_ICI.html             # lanceur / sortie standalone générée localement
├── app.js                      # navigation, progression, quiz, revue, import/export
├── style.css                   # interface responsive
├── data/
│   ├── app-data.js             # bibliothèque et données historiques
│   ├── roadmap-data.js         # programme 12 mois + TC01 base + blueprints
│   └── tc01-v1.4.js            # couche MASTER TC01 v1.4
├── ressources/
│   ├── tc01-apprenant-v1.3/    # paquet apprenant historique
│   └── tc01-v1.4-complement/   # journal de vérification + transition v1.4
├── tronc-commun/               # pages d’accès direct TC01–TC25
├── PROGRAMME_12_MOIS.md        # référentiel pédagogique
├── AUDIT_EXPERT_V2.4.md        # contre-audit expert
├── build-standalone.mjs        # génération single-file
├── qa-links.mjs                # contrôle des liens
├── qa-public.mjs               # garde-fous édition publique
└── qa-smoke.cjs                # scénarios fonctionnels
```

---

## ⌨️ Lancer en local

Aucune installation n’est nécessaire pour consulter l’interface multi-fichiers: servir le dossier avec un serveur HTTP statique suffit.

Pour reconstruire et tester la version standalone:

```bash
git clone https://github.com/mariialobur/fiduciaire-formation.git
cd fiduciaire-formation
npm ci
npm run build
npm test
```

`npm run build` génère une version autonome contenant CSS, données et JavaScript dans un seul fichier HTML.

---

## ✅ QA

Avant publication, la chaîne contrôle notamment:

- les routes et références locales;
- le rendu des 12 mois;
- le blocage technique des 24 blueprints;
- le quiz TC01 et ses 4 questions critiques;
- les 6 preuves obligatoires;
- la revue pratique et ses erreurs critiques;
- l’invalidation après modification du travail;
- la restauration JSON sans réinjecter une fausse validation;
- l’absence de fichiers formateur/corrigés dans l’édition publique;
- le contenu du ZIP apprenant public;
- les avertissements de confiance et d’authentification.

GitHub Actions exécute automatiquement la reconstruction et les tests sur les pull requests.

---

## 🚧 Roadmap immédiate

La priorité n’est pas d’ajouter des fonctions à la plateforme. Elle est de produire le contenu métier au standard TC01 v1.4.

- [x] Architecture 12 mois et 25 compétences cœur
- [x] TC01 v1.4 — module MASTER
- [ ] TC02 — formes juridiques et séparation des patrimoines
- [ ] TC03 — protection des données et gestion des accès
- [ ] TC04 — KYC et signaux d’alerte LBA
- [ ] Rendre le mois 1 entièrement validable
- [ ] Pilote réel learner + responsable
- [ ] Mesurer temps réel, erreurs récurrentes et besoin d’explications orales
- [ ] Geler le standard TC01–TC25 après retour du pilote

---

## 📚 Règle de mise à jour juridique

Toute donnée légale, fiscale, sociale, taux, limite ou procédure doit être vérifiée dans une **source officielle valable pour la période concernée** avant utilisation réelle.

Une date de revue éditoriale ne garantit pas qu’une règle reste valable au jour d’utilisation.

---

## 🤝 Contribuer

Le projet est encore en phase de construction pédagogique. Une modification utile doit idéalement préserver trois principes:

1. **réalisme cabinet** — le cas ressemble à une décision réelle de fiduciaire;
2. **preuve observable** — la compétence produit un livrable ou une décision révisable;
3. **limites professionnelles** — l’apprenant sait quand il doit escalader plutôt que deviner.

Avant une modification importante, ouvrir une issue ou une branche dédiée, reconstruire le standalone et exécuter la QA.

---

<div align="center">

**Fiduciaire Formation** · pilote public · Suisse

De la connaissance à la délégation professionnelle documentée.

</div>
