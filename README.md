<div align="center">

# Fiduciaire Formation

### Parcours suisse de 12 mois pour passer de l’assistance comptable à l’autonomie supervisée sur des dossiers PME courants

[![Live](https://img.shields.io/badge/demo-GitHub%20Pages-0d7b75?style=flat-square)](https://mariialobur.github.io/fiduciaire-formation/)
[![Maturité](https://img.shields.io/badge/modules%20complets-4%20%2F%2025-d86d50?style=flat-square)](#-où-en-est-le-projet)
[![Mois 1](https://img.shields.io/badge/mois%201-4%20%2F%204-2e7957?style=flat-square)](#-premier-mois-entièrement-publié)
[![Programme](https://img.shields.io/badge/parcours-12%20mois-102f3c?style=flat-square)](./PROGRAMME_12_MOIS.md)
[![QA](https://img.shields.io/badge/QA-GitHub%20Actions-6b7280?style=flat-square)](./.github/workflows/qa.yml)

**[Ouvrir la démo](https://mariialobur.github.io/fiduciaire-formation/)** · **[Programme](./PROGRAMME_12_MOIS.md)** · **[TC01](https://mariialobur.github.io/fiduciaire-formation/#module/TC01)** · **[TC02](https://mariialobur.github.io/fiduciaire-formation/#module/TC02)** · **[TC03](https://mariialobur.github.io/fiduciaire-formation/#module/TC03)** · **[TC04](https://mariialobur.github.io/fiduciaire-formation/#module/TC04)**

</div>

> [!IMPORTANT]
> **Édition publique de démonstration.** Le parcours comporte 25 compétences cœur. **TC01 à TC04 sont publiés au standard pédagogique complet: le Mois 1 est entièrement produit.** Les 21 compétences suivantes restent des fiches de cadrage non validables tant qu’elles ne sont pas développées au même niveau.

Fiduciaire Formation est un prototype de parcours interne destiné à accompagner un·e assistant·e comptable dans une fiduciaire suisse. L’objectif n’est pas d’accumuler des cours mais de développer une capacité observable à **produire, contrôler, documenter, escalader puis intégrer une revue**.

Le programme couvre l’ouverture d’un mandat, les formes juridiques, la protection des données, le KYC, la comptabilité mensuelle, les réconciliations, la TVA, la paie simple, la clôture, la fiscalité de base et le reporting.

---

## 🎯 Pourquoi ce projet

Une bonne note de quiz ne rend pas à elle seule un dossier délégable. En cabinet, un collaborateur doit aussi savoir identifier ce qui manque, reconnaître l’entité concernée, vérifier le périmètre réel du mandat, limiter données et accès, relier une décision à une pièce et à une source, distinguer fait/hypothèse/inconnue et savoir quand l’autonomie s’arrête.

Le parcours est donc construit comme une **progression de délégation**, pas comme une collection de chapitres.

## 🧭 Les 4 niveaux de délégation

| Période | Niveau visé | Résultat attendu |
|---|---|---|
| Mois 1–3 | Observation guidée → exécution avec checklist | Sécuriser le dossier, comprendre les comptes et produire un mois reprenable |
| Mois 4–6 | Préparation pour revue | Qualifier et préparer la TVA avec sources et concordances |
| Mois 7–9 | Préparation pour revue → autonomie sur travaux courants | Produire la paie simple et préparer les travaux de clôture |
| Mois 10–12 | Autonomie avec revue ciblée | Clôturer, préparer fiscalité/reporting et gérer un dossier PME courant de bout en bout |

---

## 🧩 Où en est le projet

- **12 mois** structurés;
- **25 compétences cœur** planifiées;
- **4 modules complets**: TC01, TC02, TC03, TC04;
- **21 fiches de cadrage** encore à produire;
- **Mois 1: 4/4 modules publiés**;
- **12 jalons mensuels** avec pratique, livrables, note de preuve et revue humaine;
- **2 simulateurs TVA** externes prévus aux mois 5 et 6;
- **1 cas final** de bout en bout;
- progression locale avec export/import JSON contrôlé;
- QA reproductible et GitHub Actions;
- protocole de pilotage réel du Mois 1 avec mesure des temps, erreurs, reprises et interventions du responsable.

Le compteur de maturité affiché dans l’application est calculé à partir du statut réel des 25 compétences.

---

## 🏁 Premier mois entièrement publié

| Module | Compétence observable | Standard |
|---|---|---|
| **TC01 v1.4** | Cadrer mandat, pouvoirs, accès et échéances avant production | `fait → contrôle → source → décision → trace` |
| **TC02 v1.0** | Identifier le sujet comptable et séparer les patrimoines | `sujet → date → nature → pièce → écriture → escalade` |
| **TC03 v1.0** | Limiter données/accès et gérer un incident sans masquer les faits | `finalité → nécessité → destinataire → accès → canal → trace` |
| **TC04 v1.0** | Construire un KYC factuel, comprendre le contrôle économique et cartographier le service réel | `identité → contrôle → activité → service → date → écart → escalade` |

Le mois ne devient pas automatiquement validé parce que ses quatre contenus sont publiés. L’apprenant doit réussir chaque module, produire ses preuves, passer les revues pratiques, réaliser les travaux supervisés et obtenir la revue mensuelle.

### TC01 — Mandat, périmètre et responsabilités

**Version 1.4 · module MASTER critique.** Le module sépare désormais strictement l’apprentissage d’un outil public et le dossier fictif:

- **Zefix réel:** exercice sur **Nestlé S.A.**. L’apprenant recherche l’entité réelle, ouvre la fiche/l’extrait disponible et relève les données affichées le jour de la consultation. Les valeurs ne sont volontairement pas figées dans le cours.
- **Cas métier fictif:** **Léman Atelier Sàrl** en deux remises. Cette société ne doit jamais être recherchée dans Zefix, IDE ou ePortal réel; seules les pièces simulées fournies constituent les faits du dossier.

Cette séparation évite qu’une société fictive entre en collision avec une raison sociale réellement inscrite. Le premier extrait RC du cas est volontairement ancien: l’apprenant doit conclure qu’un contrôle actuel manque. L’extrait simulé actualisé est ensuite fourni dans la Remise 2.

TC01 comprend 16 questions dont 4 critiques, un seuil de 14/16, six livrables et une revue pratique ≥80/100 sans erreur critique.

### TC02 — Formes juridiques et séparation des patrimoines

Cas Atelier Horizon: passage entreprise individuelle → Sàrl et 12 flux autour de la date de constitution. Le learner date la coupure, qualifie les mouvements propriétaire/associé et conserve les incertitudes documentaires visibles. Quiz 12 questions, 2 critiques, seuil 10/12.

### TC03 — Protection des données, accès et incidents

Cas Rivage Services SA: droits d’un ancien collaborateur, payroll, lien cloud public, données de santé, export local et mauvais destinataire. Le learner sépare fait technique, déclaration de tiers et information inconnue. Quiz 12 questions, 3 critiques, seuil 11/12.

### TC04 — KYC, ayant droit économique et périmètre LBA

Cas Northlake Trading Sàrl situé en octobre 2026. Le learner remonte une chaîne de contrôle, construit le profil économique, distingue tenue comptable et nouveaux services sensibles et tient compte du changement de cadre au **1er octobre 2026** sans appliquer la règle rétroactivement. Quiz 12 questions, 3 critiques, seuil 11/12.

---

## 📚 Les 12 mois

| Mois | Axe principal | État éditorial |
|---|---|---|
| 1 | Mandat · formes juridiques · données · KYC | **4/4 publiés** |
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

## ✅ Validation

Une fiche de cadrage (`blueprint`) ne produit ni score ni validation. Un module publié combine raisonnement/quiz, livrables réels, note de travail, revue pratique, contrôles critiques et dépendance vers la revue mensuelle.

Une modification d’un artefact après revue invalide la confiance dépendante. Une nouvelle tentative complète du quiz peut retirer une réussite antérieure si une question critique est manquée. Une nouvelle practical review comportant une erreur critique invalide également la précédente revue réussie.

---

## 🧪 Simulateurs TVA

- **méthode effective:** <https://mariialobur.github.io/tva-debutant/>
- **méthode TDFN:** <https://mariialobur.github.io/tva-tdfn/>

Ils deviennent obligatoires aux mois 5 et 6 avec preuve de progression et reprise documentée des erreurs.

---

## 🔐 Données et confidentialité

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
│   ├── tc04-v1.0.js
│   └── runtime-enhancements.js
├── ressources/
│   ├── tc01-apprenant-v1.4/      # paquet actif TC01
│   ├── tc01-apprenant-v1.3/      # archive + pièces binaires simulées encore utilisées
│   ├── tc02-apprenant-v1.0/
│   ├── tc03-apprenant-v1.0/
│   ├── tc04-apprenant-v1.0/
│   └── pilote-m1/
├── PILOTE_MOIS_1.md
├── PROGRAMME_12_MOIS.md
├── qa-links.mjs
├── qa-public.mjs
├── qa-smoke.cjs
└── .github/workflows/qa.yml
```

L’ancien ZIP `tc01-apprenant-v1.3.zip` a été retiré du parcours actif. Le fichier `00_Protocole_de_remise.md`, qui était destiné au responsable et pouvait apparaître comme un fichier média sur des postes Windows ayant une mauvaise association `.md`, a également été retiré des learner materials.

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

Puis ouvrir `LANCER_ICI.html`.

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
npm run test:links
npm run test:public
npm run test:smoke
```

La chaîne vérifie notamment:

- les références locales;
- l’absence de corrigés ou matériel formateur dans l’édition publique;
- les learner-packs requis;
- pour TC01, la présence du vrai exercice Zefix sur Nestlé S.A., la séparation stricte réel/fictif et l’absence de l’ancien ZIP/protocole ambigu;
- la maturité réelle des 25 compétences;
- les seuils et questions critiques de TC01–TC04;
- les six preuves de chaque module;
- les revues pratiques et leurs erreurs bloquantes;
- le cycle complet de validation du Mois 1 puis son invalidation après modification d’une preuve;
- les erreurs JavaScript essentielles.

GitHub Actions exécute la même chaîne sur les pull requests et sur `main`.

---

## ⚖️ Sources et limites professionnelles

Les contenus utilisent des sources officielles suisses: Fedlex, AFC/ESTV, SECO/SFI, Zefix, PFPDT, FINMA, TranspaReg et autres autorités selon le thème.

La date affichée correspond à une **revue éditoriale**, pas à une garantie de validité permanente. Pour tout contrôle réel, y compris Zefix, l’apprenant relève les informations disponibles au jour de la consultation et conserve la date/source. Pour toute décision engageante, la source applicable à la période et la procédure interne du cabinet restent déterminantes.

Le parcours ne délivre pas de titre fédéral et ne qualifie pas automatiquement pour le conseil fiscal complexe, les restructurations, l’audit, la consolidation, les décisions AML/LBA réservées aux personnes compétentes, le payroll transfrontalier complexe ou tout acte non autorisé par le mandat.

---

## 🗺 Prochaines étapes

- [x] **TC01 v1.4** — mandat, périmètre et responsabilités, paquet apprenant actif et exercice Zefix réel séparé
- [x] **TC02 v1.0** — formes juridiques et séparation des patrimoines
- [x] **TC03 v1.0** — protection des données, accès et incidents
- [x] **TC04 v1.0** — KYC, ayant droit économique et périmètre LBA
- [ ] **Pilotage réel du Mois 1** — apprenant + responsable + mesure des temps/erreurs/reprises
- [ ] Stabiliser le standard à partir du retour du pilote
- [ ] Produire le Mois 2 — double écriture, plan comptable et lecture des comptes

> La priorité n’est pas de publier 25 pages vite. Chaque module doit devenir un bloc de travail réellement délégable et vérifiable.

---

## 📄 Statut du projet

Prototype pédagogique public et évolutif. Les contenus sectoriels historiques restent une bibliothèque de cadrage tant qu’ils n’ont pas été développés selon le standard du parcours cœur.

Les contributions qui modifient une règle légale, fiscale ou réglementaire doivent citer la source officielle et la date de vérification.
