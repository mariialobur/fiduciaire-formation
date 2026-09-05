<div align="center">

# Fiduciaire Formation

### Parcours suisse de 12 mois pour passer de l’assistance comptable à l’autonomie supervisée sur des dossiers PME courants

[![Live](https://img.shields.io/badge/demo-GitHub%20Pages-0d7b75?style=flat-square)](https://mariialobur.github.io/fiduciaire-formation/)
[![Maturité](https://img.shields.io/badge/modules%20complets-3%20%2F%2025-d86d50?style=flat-square)](#-où-en-est-le-projet)
[![TC01](https://img.shields.io/badge/TC01-v1.4-2e7957?style=flat-square)](https://mariialobur.github.io/fiduciaire-formation/#module/TC01)
[![TC02](https://img.shields.io/badge/TC02-v1.0-2e7957?style=flat-square)](https://mariialobur.github.io/fiduciaire-formation/#module/TC02)
[![TC03](https://img.shields.io/badge/TC03-v1.0-2e7957?style=flat-square)](https://mariialobur.github.io/fiduciaire-formation/#module/TC03)
[![Programme](https://img.shields.io/badge/parcours-12%20mois-102f3c?style=flat-square)](./PROGRAMME_12_MOIS.md)
[![QA](https://img.shields.io/badge/QA-GitHub%20Actions-6b7280?style=flat-square)](./.github/workflows/qa.yml)

**[Ouvrir la démo](https://mariialobur.github.io/fiduciaire-formation/)** · **[Voir le programme](./PROGRAMME_12_MOIS.md)** · **[TC01](https://mariialobur.github.io/fiduciaire-formation/#module/TC01)** · **[TC02](https://mariialobur.github.io/fiduciaire-formation/#module/TC02)** · **[TC03](https://mariialobur.github.io/fiduciaire-formation/#module/TC03)**

</div>

> [!IMPORTANT]
> **Édition publique de démonstration.** Le parcours contient 25 compétences cœur. **TC01 v1.4, TC02 v1.0 et TC03 v1.0 sont publiés au standard pédagogique complet.** Les 22 autres compétences restent des fiches de cadrage non validables. Le mois 1 est à **3/4**: TC04 reste le seul bloqueur éditorial.

Fiduciaire Formation est un prototype de parcours interne destiné à accompagner un·e assistant·e comptable dans une fiduciaire suisse. L’objectif n’est pas d’accumuler des cours, mais de développer progressivement une capacité observable à **produire, contrôler, documenter, escalader puis intégrer une revue**.

La progression couvre les dossiers PME courants: ouverture de mandat, forme juridique, protection des données, KYC, comptabilité mensuelle, réconciliations, TVA, paie simple, clôture, fiscalité de base et reporting.

---

## 🎯 Pourquoi ce projet

Les formations classiques évaluent souvent la connaissance d’une règle ou la réussite d’un quiz. En cabinet, cela ne suffit pas.

Un collaborateur doit aussi savoir:

- identifier ce qui manque avant de commencer;
- déterminer **qui est réellement concerné par une opération** avant de choisir un compte;
- limiter les données et les accès au besoin réel;
- distinguer ce qui est inclus, à confirmer, hors mandat ou à escalader;
- relier une écriture, une date ou une décision à une pièce et à une source;
- laisser une piste qu’un autre collaborateur peut reprendre;
- reconnaître les situations où l’autonomie s’arrête;
- intégrer les corrections du responsable sans effacer la première analyse.

Le parcours est donc construit comme une **progression de délégation**, pas comme une collection de chapitres.

## 🧭 Les 4 niveaux de délégation

| Période | Niveau visé | Résultat attendu |
|---|---|---|
| Mois 1–3 | Observation guidée → exécution avec checklist | Sécuriser le dossier, comprendre le sujet comptable et produire un mois reprenable |
| Mois 4–6 | Préparation pour revue | Qualifier et préparer la TVA avec sources et concordances |
| Mois 7–9 | Préparation pour revue → autonomie sur travaux courants | Produire la paie simple et préparer les travaux de clôture |
| Mois 10–12 | Autonomie avec revue ciblée | Clôturer, préparer fiscalité/reporting et gérer un dossier PME courant de bout en bout |

Le résultat final recherché n’est pas «savoir tout faire seul». C’est pouvoir gérer un périmètre courant défini, avec des contrôles ciblés et une escalade pertinente.

---

## 🧩 Où en est le projet

- **12 mois** structurés;
- **25 compétences cœur** positionnées;
- **3 modules complets**: TC01, TC02, TC03;
- **22 fiches de cadrage** encore à développer;
- **Mois 1: 3/4 modules publiés**;
- **12 jalons mensuels** avec pratique, livrables, note de preuve et revue humaine;
- **2 simulateurs TVA** externes intégrés;
- **1 cas final** de bout en bout;
- progression locale avec export/import JSON contrôlé;
- GitHub Actions pour QA, liens et sécurité publique.

Le compteur de maturité est calculé automatiquement à partir du statut réel des 25 compétences.

---

## 🧱 TC01 — mandat, périmètre et responsabilités

**Version 1.4 · module MASTER critique**

TC01 entraîne le premier réflexe: ne pas commencer une production engageante avant d’avoir suffisamment cadré entité, mandat, pouvoirs, accès et échéances.

> **fait → contrôle → source → décision → trace**

Le cas Léman Atelier Sàrl est traité en deux remises. TC01 impose six livrables, 16 questions dont 4 critiques, un seuil de 14/16, une revue pratique à 80/100 et zéro erreur sur quatre contrôles critiques.

---

## 🧱 TC02 — formes juridiques et séparation des patrimoines

**Version 1.0 · module cœur**

TC02 part d’une erreur classique: choisir un compte sans avoir identifié **à qui appartient l’opération**.

> **sujet → date → nature → pièce → écriture → escalade**

Le dossier Atelier Horizon suit le passage d’une entreprise individuelle à une Sàrl avec 12 mouvements qui traversent la date de constitution. Le learner conserve sa première analyse, reçoit ensuite une convention de reprise et d’autres pièces, puis explique chaque changement de décision.

TC02 impose six livrables, 12 questions dont 2 critiques, un seuil de 10/12 et une revue pratique à 80/100 avec quatre erreurs bloquantes.

---

## 🧱 TC03 — protection des données, accès et incidents

**Version 1.0 · module cœur critique**

TC03 transforme la LPD en réflexes de production. Le learner ne doit pas réciter une loi: il doit savoir pourquoi une donnée est nécessaire, qui peut y accéder, par quel canal et comment réagir si ce contrôle échoue.

> **finalité → nécessité → destinataire → accès → canal → trace**
>
> Incident: **contenir → préserver → alerter → documenter → escalader**

Le dossier Rivage Services SA présente six anomalies simultanées:

- ancien collaborateur encore actif;
- demande d’envoi payroll vers Gmail personnel;
- partage cloud «toute personne avec le lien»;
- certificat médical dans un dossier comptable trop large;
- export salarial sur laptop personnel;
- fichier salaires/IBAN envoyé au mauvais fournisseur.

Une seconde remise ajoute logs, confirmations et mesures de confinement. Le learner doit distinguer **fait technique, déclaration d’un tiers et information encore inconnue**.

TC03 comprend:

- inventaire données/finalités;
- matrice des accès et moindre privilège;
- registre des partages et canaux;
- checklist arrivée/changement/départ;
- fiche factuelle d’incident;
- journal de vérification;
- 12 questions dont 3 critiques;
- seuil **11/12**;
- revue pratique **80/100**;
- 4 erreurs critiques bloquantes.

La décision d’une éventuelle notification au PFPDT n’est jamais attribuée au junior: il prépare les faits et transmet au responsable compétent.

---

## 📚 Les 12 mois

| Mois | Axe principal | État éditorial |
|---|---|---|
| 1 | Mandat · formes juridiques · données · KYC | **3/4 publiés** |
| 2 | Double écriture · plan comptable · lecture des comptes | À produire |
| 3 | Achats · ventes · banque · caisse · réconciliations | À produire |
| 4 | Qualification TVA | À produire |
| 5 | Décompte TVA — méthode effective | À produire |
| 6 | TDFN et concordance | À produire |
| 7 | Paie mensuelle simple | À produire |
| 8 | Bouclement payroll | À produire |
| 9 | Immobilisations · amortissements · cut-off | À produire |
| 10 | Clôture PME | À produire |
| 11 | Fiscalité de base · reporting | À produire |
| 12 | Cas final dossier PME | À produire |

Le référentiel détaillé est dans [`PROGRAMME_12_MOIS.md`](./PROGRAMME_12_MOIS.md).

---

## ✅ Comment fonctionne la validation

Une fiche de cadrage (`blueprint`) ne peut produire ni score ni validation.

Un module publié combine:

1. raisonnement / quiz;
2. livrables de travail;
3. note de dossier;
4. revue pratique;
5. contrôles critiques;
6. revue mensuelle du responsable.

Une modification d’un artefact après revue invalide la trace dépendante. Une nouvelle tentative complète du quiz peut retirer une réussite antérieure lorsqu’une question critique est manquée.

Le but n’est pas de fabriquer un score élevé, mais de rendre le niveau de délégation **observable et révisable**.

---

## 🧪 Simulateurs TVA

- **méthode effective:** <https://mariialobur.github.io/tva-debutant/>
- **méthode TDFN:** <https://mariialobur.github.io/tva-tdfn/>

Ils deviennent obligatoires aux mois 5 et 6 avec preuve de progression et reprise documentée des erreurs.

---

## 🔐 Données et confidentialité de la plateforme

L’application est statique et fonctionne côté navigateur. Elle stocke localement profil, notes, scores, références de livrables, check-lists et traces locales de revue. Elle **ne téléverse pas les fichiers de preuve**.

> [!WARNING]
> Ne jamais saisir de données client réelles dans l’édition publique. L’export JSON est une sauvegarde modifiable, pas un certificat. L’identité du responsable n’est pas authentifiée sur GitHub Pages.

Les pièces, décisions et signatures réelles doivent rester dans le système interne du cabinet avec les accès appropriés.

---

## 🏗 Architecture

```text
fiduciaire-formation/
├── index.html
├── index-multifile.html
├── LANCER_ICI.html
├── app.js
├── style.css
├── data/
│   ├── app-data.js
│   ├── roadmap-data.js
│   ├── tc01-v1.4.js
│   ├── tc02-v1.0.js
│   ├── tc03-v1.0.js
│   └── runtime-enhancements.js
├── ressources/
│   ├── tc01-apprenant-v1.3/
│   ├── tc01-v1.4-complement/
│   ├── tc02-apprenant-v1.0/
│   └── tc03-apprenant-v1.0/
├── tronc-commun/
├── PROGRAMME_12_MOIS.md
├── qa-links.mjs
├── qa-public.mjs
├── qa-smoke.cjs
└── .github/workflows/qa.yml
```

Les pages directes des modules déjà publiés redirigent vers le SPA canonique `index.html#module/...`. Cela évite que plusieurs rendus d’un même module divergent au fil des versions.

---

## 🚀 Lancer le projet

### Démo publique

<https://mariialobur.github.io/fiduciaire-formation/>

### Version locale

```bash
git clone https://github.com/mariialobur/fiduciaire-formation.git
cd fiduciaire-formation
npm ci
npm run build
```

Puis ouvrir `LANCER_ICI.html` dans un navigateur récent.

### Développement multi-fichiers

```bash
python -m http.server 8000
```

Puis ouvrir `http://localhost:8000/index-multifile.html`.

---

## 🧪 QA reproductible

```bash
npm ci
npm run build
npm test
```

La chaîne contrôle notamment:

- les liens et références locales;
- l’absence de matériel formateur/corrigés dans l’édition publique;
- les fichiers apprenant requis;
- les 25 compétences et leur maturité;
- le blocage des blueprints;
- TC01, TC02 et TC03, y compris leurs questions critiques;
- les preuves et revues pratiques;
- l’invalidation après modification d’un artefact ou nouvel échec critique;
- le blocage du mois 1 tant que TC04 n’est pas publié;
- les erreurs JavaScript essentielles.

GitHub Actions exécute la même chaîne sur les pull requests et sur `main`.

---

## ⚖️ Sources et limites professionnelles

Les contenus s’appuient sur des sources officielles suisses: Fedlex, AFC/ESTV, SECO, Zefix, PFPDT et autres autorités selon le thème.

La date affichée correspond à une **revue éditoriale**. Pour toute décision engageante, la source applicable à la période doit être rouverte et la procédure interne du cabinet reste prioritaire.

Le parcours ne délivre pas de titre fédéral et ne qualifie pas automatiquement pour le conseil fiscal complexe, les restructurations, l’audit, la consolidation, les décisions LBA réservées aux personnes compétentes, le payroll transfrontalier complexe ou tout acte non autorisé par le mandat.

---

## 🗺 Prochaines étapes

- [x] **TC01 v1.4** — mandat, périmètre et responsabilités
- [x] **TC02 v1.0** — formes juridiques et séparation des patrimoines
- [x] **TC03 v1.0** — protection des données, accès et incidents
- [ ] **TC04** — KYC et signaux d’alerte LBA
- [ ] **Pilotage réel du mois 1**
- [ ] Mois 2 — double écriture, plan comptable, lecture des comptes

L’objectif immédiat est de rendre **le mois 1 entièrement utilisable de bout en bout** avant d’accélérer sur les mois suivants.

---

## 📌 Positionnement exact

> **Plateforme publique de démonstration d’un parcours interne de formation fiduciaire suisse sur 12 mois, avec 3 modules cœur complets sur 25 et une progression professionnelle fondée sur des preuves et une revue humaine.**
