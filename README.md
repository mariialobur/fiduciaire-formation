<div align="center">

# Fiduciaire Formation

### Parcours suisse de 12 mois pour passer de l’assistance comptable à l’autonomie supervisée sur des dossiers PME courants

[![Live](https://img.shields.io/badge/demo-GitHub%20Pages-0d7b75?style=flat-square)](https://mariialobur.github.io/fiduciaire-formation/)
[![Maturité](https://img.shields.io/badge/modules%20complets-4%20%2F%2025-d86d50?style=flat-square)](#-où-en-est-le-projet)
[![Mois 1](https://img.shields.io/badge/mois%201-4%20%2F%204-2e7957?style=flat-square)](#-premier-mois-entièrement-publié)
[![Programme](https://img.shields.io/badge/parcours-12%20mois-102f3c?style=flat-square)](./PROGRAMME_12_MOIS.md)
[![QA](https://img.shields.io/badge/QA-GitHub%20Actions-6b7280?style=flat-square)](./.github/workflows/qa.yml)

**[Ouvrir la démo](https://mariialobur.github.io/fiduciaire-formation/)** · **[Voir le programme](./PROGRAMME_12_MOIS.md)** · **[TC01](https://mariialobur.github.io/fiduciaire-formation/#module/TC01)** · **[TC02](https://mariialobur.github.io/fiduciaire-formation/#module/TC02)** · **[TC03](https://mariialobur.github.io/fiduciaire-formation/#module/TC03)** · **[TC04](https://mariialobur.github.io/fiduciaire-formation/#module/TC04)**

</div>

> [!IMPORTANT]
> **Édition publique de démonstration.** Le parcours comporte 25 compétences cœur. **TC01 à TC04 sont publiés au standard pédagogique complet: le Mois 1 est désormais entièrement produit.** Les 21 compétences suivantes restent des fiches de cadrage non validables tant qu’elles ne sont pas développées au même niveau.

Fiduciaire Formation est un prototype de parcours interne destiné à accompagner un·e assistant·e comptable dans une fiduciaire suisse. L’objectif n’est pas d’accumuler des cours, mais de développer progressivement une capacité observable à **produire, contrôler, documenter, escalader puis intégrer une revue**.

Le programme couvre l’ouverture d’un mandat, les formes juridiques, la protection des données, le KYC, la comptabilité mensuelle, les réconciliations, la TVA, la paie simple, la clôture, la fiscalité de base et le reporting.

---

## 🎯 Pourquoi ce projet

Une bonne note de quiz ne suffit pas à rendre un dossier délégable. En cabinet, un collaborateur doit aussi savoir:

- identifier ce qui manque avant de commencer;
- déterminer qui est juridiquement et économiquement concerné par une opération;
- vérifier le périmètre réel du mandat et du service demandé;
- limiter données et accès au besoin réel;
- relier une décision à une pièce, une source et une date;
- distinguer fait, déclaration, hypothèse et inconnue;
- reconnaître les situations où l’autonomie s’arrête;
- intégrer une correction sans effacer l’historique de la première analyse;
- laisser une piste qu’un autre collaborateur peut reprendre.

Le parcours est donc construit comme une **progression de délégation**, pas comme une collection de chapitres.

## 🧭 Les 4 niveaux de délégation

| Période | Niveau visé | Résultat attendu |
|---|---|---|
| Mois 1–3 | Observation guidée → exécution avec checklist | Sécuriser le dossier, comprendre les comptes et produire un mois reprenable |
| Mois 4–6 | Préparation pour revue | Qualifier et préparer la TVA avec sources et concordances |
| Mois 7–9 | Préparation pour revue → autonomie sur travaux courants | Produire la paie simple et préparer les travaux de clôture |
| Mois 10–12 | Autonomie avec revue ciblée | Clôturer, préparer fiscalité/reporting et gérer un dossier PME courant de bout en bout |

Le résultat final recherché n’est pas «savoir tout faire seul». C’est gérer un périmètre courant défini, avec des contrôles ciblés et une escalade pertinente.

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
- QA reproductible et GitHub Actions.

Le compteur de maturité affiché dans l’application est calculé à partir du statut réel des 25 compétences.

---

## 🏁 Premier mois entièrement publié

Le Mois 1 constitue maintenant un premier cycle cohérent:

| Module | Compétence observable | Standard |
|---|---|---|
| **TC01 v1.4** | Cadrer mandat, pouvoirs, accès et échéances avant production | `fait → contrôle → source → décision → trace` |
| **TC02 v1.0** | Identifier le sujet comptable et séparer les patrimoines | `sujet → date → nature → pièce → écriture → escalade` |
| **TC03 v1.0** | Limiter données/accès et gérer un incident sans masquer les faits | `finalité → nécessité → destinataire → accès → canal → trace` |
| **TC04 v1.0** | Construire un KYC factuel, comprendre le contrôle économique et cartographier le service réel | `identité → contrôle → activité → service → date → écart → escalade` |

Le mois ne devient pas automatiquement «validé» parce que ses quatre contenus sont publiés. L’apprenant doit encore réussir chaque module, produire ses preuves, passer les revues pratiques, réaliser les travaux supervisés et obtenir la revue mensuelle.

### TC01 — Mandat, périmètre et responsabilités

Module MASTER critique. Cas Léman Atelier Sàrl en deux remises, 16 questions dont 4 critiques, seuil 14/16, six livrables et revue pratique ≥80/100 sans erreur critique.

### TC02 — Formes juridiques et séparation des patrimoines

Cas Atelier Horizon: passage entreprise individuelle → Sàrl et 12 flux autour de la date de constitution. Le learner doit dater la coupure, qualifier les mouvements propriétaire/associé et conserver les incertitudes documentaires visibles. Quiz 12 questions, 2 critiques, seuil 10/12.

### TC03 — Protection des données, accès et incidents

Cas Rivage Services SA: droits d’un ancien collaborateur, payroll, lien cloud public, données de santé, export local et mauvais destinataire. Le learner sépare fait technique, déclaration de tiers et information inconnue. Quiz 12 questions, 3 critiques, seuil 11/12.

### TC04 — KYC, ayant droit économique et périmètre LBA

Cas Northlake Trading Sàrl situé en octobre 2026. Le learner remonte une chaîne de contrôle, construit le profil économique, distingue tenue comptable et nouveaux services sensibles, et tient compte du changement de cadre au **1er octobre 2026** sans appliquer la règle rétroactivement.

Le module ne demande jamais au junior de décider seul d’une communication MROS ou de qualifier une infraction. Il exige une note factuelle, une analyse du service réel et une escalade au bon niveau. Quiz 12 questions, 3 critiques, seuil 11/12.

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

## ✅ Comment fonctionne la validation

Une fiche de cadrage (`blueprint`) ne peut produire ni score ni validation.

Un module publié combine:

1. raisonnement / quiz;
2. livrables réels;
3. note de travail;
4. revue pratique;
5. contrôles critiques;
6. dépendance vers la revue mensuelle.

Une modification d’un artefact après revue invalide la confiance dépendante. Une nouvelle tentative complète du quiz peut retirer une réussite antérieure si une question critique est manquée. Une nouvelle practical review déclarée «conforme» mais contenant une erreur critique invalide également la précédente revue réussie.

Le jalon mensuel ne devient validable qu’une fois tous les modules prêts, les travaux et livrables réalisés, la note mensuelle renseignée et la revue du responsable enregistrée.

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
│   ├── tc04-v1.0.js
│   └── runtime-enhancements.js
├── ressources/
│   ├── tc01-apprenant-v1.3/
│   ├── tc01-v1.4-complement/
│   ├── tc02-apprenant-v1.0/
│   ├── tc03-apprenant-v1.0/
│   └── tc04-apprenant-v1.0/
├── tronc-commun/
├── PROGRAMME_12_MOIS.md
├── qa-links.mjs
├── qa-public.mjs
├── qa-smoke.cjs
└── .github/workflows/qa.yml
```

Les pages directes des modules publiés redirigent vers le SPA canonique `index.html#module/...`, afin qu’il n’existe qu’une seule version de l’interface par module.

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
- la maturité réelle des 25 compétences;
- les seuils et questions critiques de TC01–TC04;
- les six preuves de chaque module;
- les revues pratiques et leurs erreurs bloquantes;
- l’invalidation d’une confiance antérieure après nouvel échec;
- le cycle complet de validation du Mois 1;
- l’invalidation du jalon mensuel après modification d’une preuve;
- les erreurs JavaScript essentielles.

GitHub Actions exécute la même chaîne sur les pull requests et sur `main`.

---

## ⚖️ Sources et limites professionnelles

Les contenus utilisent des sources officielles suisses: Fedlex, AFC/ESTV, SECO/SFI, Zefix, PFPDT, FINMA, TranspaReg et autres autorités selon le thème.

La date affichée correspond à une **revue éditoriale**, pas à une garantie de validité permanente. Pour toute décision engageante, la source applicable à la période doit être rouverte et la procédure interne du cabinet reste déterminante.

Le parcours ne délivre pas de titre fédéral et ne qualifie pas automatiquement pour le conseil fiscal complexe, les restructurations, l’audit, la consolidation, les décisions AML/LBA réservées aux personnes compétentes, le payroll transfrontalier complexe ou tout acte non autorisé par le mandat.

---

## 🗺 Prochaines étapes

- [x] **TC01 v1.4** — mandat, périmètre et responsabilités
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
