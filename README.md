<div align="center">

# Fiduciaire Formation

### Parcours suisse de 12 mois pour passer de l’assistance comptable à l’autonomie supervisée sur des dossiers PME courants

[![Live](https://img.shields.io/badge/demo-GitHub%20Pages-0d7b75?style=flat-square)](https://mariialobur.github.io/fiduciaire-formation/)
[![Maturité](https://img.shields.io/badge/modules%20complets-2%20%2F%2025-d86d50?style=flat-square)](#-où-en-est-le-projet)
[![TC01](https://img.shields.io/badge/TC01-v1.4-2e7957?style=flat-square)](#-tc01--mandat-périmètre-et-responsabilités)
[![TC02](https://img.shields.io/badge/TC02-v1.0-2e7957?style=flat-square)](#-tc02--formes-juridiques-et-séparation-des-patrimoines)
[![Programme](https://img.shields.io/badge/parcours-12%20mois-102f3c?style=flat-square)](./PROGRAMME_12_MOIS.md)
[![QA](https://img.shields.io/badge/QA-GitHub%20Actions-6b7280?style=flat-square)](./.github/workflows/qa.yml)

**[Ouvrir la démo](https://mariialobur.github.io/fiduciaire-formation/)** · **[Voir le programme](./PROGRAMME_12_MOIS.md)** · **[TC01](https://mariialobur.github.io/fiduciaire-formation/#module/TC01)** · **[TC02](https://mariialobur.github.io/fiduciaire-formation/#module/TC02)**

</div>

> [!IMPORTANT]
> **Édition publique de démonstration.** Le parcours contient 25 compétences cœur. **TC01 v1.4 et TC02 v1.0 sont actuellement publiés au standard pédagogique complet.** Les 23 autres compétences restent des fiches de cadrage non validables tant qu’elles n’ont pas été développées au même niveau.

Fiduciaire Formation est un prototype de parcours interne destiné à accompagner un·e assistant·e comptable dans une fiduciaire suisse. L’objectif n’est pas d’accumuler des cours, mais de développer progressivement une capacité observable à **produire, contrôler, documenter, escalader puis intégrer une revue**.

La progression est organisée sur 12 mois autour de dossiers PME courants: ouverture de mandat, formes juridiques, comptabilité mensuelle, réconciliations, TVA, paie simple, clôture, fiscalité de base et reporting.

---

## 🎯 Pourquoi ce projet

Les formations comptables classiques évaluent souvent la connaissance d’une règle ou la réussite d’un quiz. En cabinet, cela ne suffit pas.

Un collaborateur doit aussi savoir:

- identifier ce qui manque avant de commencer;
- déterminer **qui est réellement concerné par une opération** avant de choisir un compte;
- distinguer ce qui est inclus, à confirmer, hors mandat ou à escalader;
- relier une écriture, une date ou une décision à une pièce et à une source;
- laisser une piste de travail qu’un autre collaborateur peut reprendre;
- reconnaître les situations où l’autonomie s’arrête;
- intégrer les corrections du responsable sans effacer l’historique de la première analyse.

Le parcours est donc construit comme une **progression de délégation**, pas comme une collection de chapitres.

## 🧭 Les 4 niveaux de délégation

| Période | Niveau visé | Résultat attendu |
|---|---|---|
| Mois 1–3 | Observation guidée → exécution avec checklist | Sécuriser le mandat, comprendre le sujet comptable et produire un mois reprenable |
| Mois 4–6 | Préparation pour revue | Qualifier et préparer la TVA avec sources et concordances |
| Mois 7–9 | Préparation pour revue → autonomie sur travaux courants | Produire la paie simple et préparer les travaux de clôture |
| Mois 10–12 | Autonomie avec revue ciblée | Clôturer, préparer fiscalité/reporting et gérer un dossier PME courant de bout en bout |

Le résultat final recherché n’est pas «savoir tout faire seul». C’est pouvoir gérer un périmètre courant défini, avec des contrôles ciblés et une escalade pertinente.

---

## 🧩 Où en est le projet

**État actuel: architecture complète, production pédagogique séquentielle.**

- **12 mois** structurés;
- **25 compétences cœur** positionnées;
- **2 modules complets**: TC01 v1.4 et TC02 v1.0;
- **23 fiches de cadrage** encore à développer;
- **Mois 1: 2/4 modules publiés** — TC03 et TC04 restent les bloqueurs;
- **12 jalons mensuels** avec pratique, livrables, note de preuve et revue humaine;
- **2 simulateurs TVA** externes intégrés au parcours;
- **1 cas final** de bout en bout au mois 12;
- progression locale dans le navigateur avec export/import JSON contrôlé;
- GitHub Actions pour la QA, les liens et la sécurité de l’édition publique.

Le compteur public n’est plus codé en dur: l’interface calcule automatiquement le nombre de modules cœur réellement publiés.

---

## 🧱 TC01 — mandat, périmètre et responsabilités

**Version 1.4 · module MASTER**

TC01 entraîne le premier réflexe professionnel: ne pas commencer une production engageante avant d’avoir suffisamment cadré l’entité, le mandat, les pouvoirs, les accès et les échéances.

Le cas simulé **Léman Atelier Sàrl** arrive en deux remises. La première est volontairement incomplète; la seconde apporte les éléments qui permettent de faire évoluer la décision sans effacer la première analyse.

Principe de travail:

> **fait → contrôle → source → décision → trace**

TC01 comprend notamment:

- mandat lu comme document opérationnel;
- RC, IDE, délégation et pouvoirs;
- demandes incluses / à confirmer / hors mandat / à escalader;
- protection des données et accès;
- calendrier TVA et dépendances;
- six livrables;
- 16 questions dont 4 critiques;
- seuil 14/16;
- revue pratique 80/100;
- 4 erreurs critiques qui bloquent la validation.

Le **journal de vérification** remplace une simple feuille de réponses: le learner doit montrer quel contrôle a été effectué, dans quelle source, à quelle date et avec quelle conséquence.

---

## 🧱 TC02 — formes juridiques et séparation des patrimoines

**Version 1.0 · module cœur**

TC02 part d’une erreur classique de débutant: choisir trop vite un compte sans avoir identifié **à qui appartient l’opération**.

Le dossier simulé **Atelier Horizon** suit le passage d’une entreprise individuelle à une Sàrl. La nouvelle société est inscrite le 1er mai, mais l’ancien compte bancaire, des créances d’avril, des achats antérieurs, une dépense privée et plusieurs flux avec l’associée traversent la date de coupure.

Principe de travail:

> **sujet → date → nature → pièce → écriture → escalade**

Le learner traite 12 mouvements, puis reçoit une seconde remise avec convention de reprise, confirmations bancaires, payroll et pièces corrigées. La première analyse doit être conservée et comparée à la décision finale.

TC02 comprend:

- distinction entreprise individuelle / Sàrl / SA / organisme sans but lucratif;
- séparation des patrimoines;
- date de coupure EI → Sàrl;
- actifs, passifs et contrats repris;
- apport, prélèvement privé, salaire, remboursement de frais, prêt/compte courant et distribution;
- opérations antérieures à la constitution;
- factures émises au mauvais nom;
- six livrables de travail;
- 12 questions dont 2 critiques;
- seuil 10/12;
- revue pratique 80/100;
- 4 erreurs critiques qui bloquent la validation.

### Paquet apprenant TC02

Le matériel est publié sous forme de fichiers transparents, téléchargeables séparément:

- cours complet;
- dossier simulé en deux remises;
- matrice de qualification des 12 flux;
- chronologie de reprise;
- fiche d’identité juridique;
- tableau de reprise actifs/passifs/contrats;
- note des points ouverts;
- journal de vérification;
- sources et historique de version.

Aucun corrigé responsable n’est inclus dans l’édition publique.

---

## 📚 Les 12 mois

| Mois | Axe principal | État éditorial |
|---|---|---|
| 1 | Mandat · formes juridiques · données · KYC | **2/4 publiés** |
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

Un module publié combine plusieurs preuves:

1. **raisonnement / quiz**;
2. **livrables de travail**;
3. **note de dossier**;
4. **revue pratique**, lorsqu’elle est prévue;
5. **contrôles critiques**;
6. **revue mensuelle** d’une personne responsable.

Une modification d’un artefact après revue invalide la trace dépendante. Une nouvelle tentative complète du quiz peut également retirer une réussite antérieure lorsqu’une question critique est manquée.

Le but n’est pas de fabriquer un score élevé. Le but est de rendre le niveau de délégation **observable et révisable**.

---

## 🧪 Simulateurs TVA

Le parcours prévoit deux ressources indépendantes:

- **méthode effective:** <https://mariialobur.github.io/tva-debutant/>
- **méthode TDFN:** <https://mariialobur.github.io/tva-tdfn/>

Elles deviennent obligatoires aux mois 5 et 6, avec preuve de progression et reprise documentée des erreurs.

---

## 🔐 Ce que la plateforme stocke

L’application est statique et fonctionne côté navigateur.

Elle stocke localement:

- profil/identifiant apprenant;
- notes;
- scores;
- références de livrables;
- check-lists;
- traces locales de revue.

Elle **ne téléverse pas les fichiers de preuve**.

> [!WARNING]
> Ne jamais saisir de données client réelles dans l’édition publique. L’export JSON est une sauvegarde modifiable, pas un certificat. L’identité du responsable n’est pas authentifiée sur GitHub Pages.

Si le parcours est utilisé réellement en cabinet, les pièces, décisions et signatures doivent rester dans un système interne avec des accès appropriés.

---

## 🏗 Architecture

```text
fiduciaire-formation/
├── index.html                     # entrée GitHub Pages
├── index-multifile.html           # entrée développement
├── LANCER_ICI.html                # build autonome généré
├── app.js                         # progression, quiz, revues, navigation
├── style.css                      # interface
├── data/
│   ├── app-data.js                # bibliothèque historique
│   ├── roadmap-data.js            # programme 12 mois + blueprints
│   ├── tc01-v1.4.js               # module MASTER TC01
│   ├── tc02-v1.0.js               # module cœur TC02
│   └── runtime-enhancements.js    # maturité dynamique et améliorations runtime
├── ressources/
│   ├── tc01-apprenant-v1.3/       # paquet binaire historique TC01
│   ├── tc01-v1.4-complement/      # complément MASTER TC01
│   └── tc02-apprenant-v1.0/       # paquet transparent TC02
├── tronc-commun/
├── PROGRAMME_12_MOIS.md
├── qa-links.mjs
├── qa-public.mjs
├── qa-smoke.cjs
└── .github/workflows/qa.yml
```

Les couches `tc01-v1.4.js` et `tc02-v1.0.js` permettent de faire évoluer les modules publiés sans transformer le gros fichier historique en point de conflit permanent.

---

## 🚀 Lancer le projet

### Démo publique

<https://mariialobur.github.io/fiduciaire-formation/>

Aucun compte n’est nécessaire.

### Version locale

Le projet ne nécessite pas de serveur applicatif.

```bash
git clone https://github.com/mariialobur/fiduciaire-formation.git
cd fiduciaire-formation
npm ci
npm run build
```

Puis ouvrir `LANCER_ICI.html` dans un navigateur récent.

### Développement multi-fichiers

Servir le dossier avec un serveur statique local, par exemple:

```bash
python -m http.server 8000
```

Puis ouvrir:

```text
http://localhost:8000/index-multifile.html
```

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
- la présence des fichiers apprenant requis;
- les 25 compétences cœur et leur maturité;
- le blocage des blueprints;
- TC01 v1.4 et ses quatre questions critiques;
- TC02 v1.0, ses deux questions critiques, ses six preuves et sa revue sur 100;
- l’invalidation après modification d’une preuve;
- le blocage du mois 1 tant que TC03 et TC04 ne sont pas publiés;
- les erreurs JavaScript essentielles de l’application.

GitHub Actions exécute la même chaîne sur les pull requests et sur `main`.

---

## ⚖️ Sources et limites professionnelles

Les contenus s’appuient sur des sources officielles suisses: Fedlex, AFC/ESTV, SECO, Zefix, PFPDT et autres autorités selon le thème.

La date affichée correspond à une **revue éditoriale**. Elle ne garantit jamais qu’une règle soit encore valable au jour d’un dossier réel. Avant toute décision engageante, la source applicable à la période doit être rouverte et la procédure interne du cabinet reste prioritaire.

Le parcours ne délivre pas de titre fédéral et ne qualifie pas automatiquement pour:

- conseil fiscal complexe;
- restructurations;
- planification internationale;
- audit ou consolidation;
- décisions LBA réservées aux personnes compétentes;
- payroll transfrontalier complexe;
- signature ou dépôt non autorisé par le mandat ou la délégation.

---

## 🗺 Prochaines étapes

Le développement suit l’ordre du métier, pas la quantité de pages:

- [x] **TC01 v1.4** — mandat, périmètre et responsabilités
- [x] **TC02 v1.0** — formes juridiques et séparation des patrimoines
- [ ] **TC03** — protection des données et gestion des accès
- [ ] **TC04** — KYC et signaux d’alerte LBA
- [ ] **Pilotage réel du mois 1**
- [ ] Mois 2 — double écriture, plan comptable, lecture des comptes

L’objectif immédiat est de rendre **le mois 1 entièrement utilisable de bout en bout** avant d’accélérer la production des mois suivants.

---

## 📌 Positionnement exact

> **Plateforme publique de démonstration d’un parcours interne de formation fiduciaire suisse sur 12 mois, avec 2 modules cœur complets sur 25 et une progression professionnelle fondée sur des preuves et une revue humaine.**
