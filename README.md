<div align="center">

# Fiduciaire Formation

### Parcours suisse de 12 mois pour passer de l’assistance comptable à l’autonomie contrôlée sur des dossiers PME courants

[![Live](https://img.shields.io/badge/demo-GitHub%20Pages-0d7b75?style=flat-square)](https://mariialobur.github.io/fiduciaire-formation/)
[![Maturité](https://img.shields.io/badge/modules%20complets-4%20%2F%2025-d86d50?style=flat-square)](#-état-du-projet)
[![Mois 1](https://img.shields.io/badge/mois%201-4%20%2F%204-2e7957?style=flat-square)](#-mois-1)
[![QA](https://img.shields.io/badge/QA-GitHub%20Actions-6b7280?style=flat-square)](./.github/workflows/qa.yml)

**[Ouvrir la démo](https://mariialobur.github.io/fiduciaire-formation/)** · **[Programme](./PROGRAMME_12_MOIS.md)** · **[TC01](https://mariialobur.github.io/fiduciaire-formation/#module/TC01)** · **[TC02](https://mariialobur.github.io/fiduciaire-formation/#module/TC02)** · **[TC03](https://mariialobur.github.io/fiduciaire-formation/#module/TC03)** · **[TC04](https://mariialobur.github.io/fiduciaire-formation/#module/TC04)**

</div>

> [!IMPORTANT]
> **Édition publique de démonstration.** Le parcours comporte 25 compétences cœur. TC01 à TC04 sont complets; les 21 suivantes restent des fiches de cadrage non validables.

Fiduciaire Formation est conçu pour développer un comportement professionnel observable, pas seulement des connaissances. Le standard actif est désormais **autonomy-first**:

> **comprendre → produire → se corriger → s’autocontrôler → continuer → escalader seulement ce qui dépasse le périmètre**

La plateforme n’exige plus qu’un responsable corrige systématiquement chaque module. Une intervention humaine reste ciblée sur les erreurs critiques, les incertitudes, les décisions réelles hors délégation et les contrôles qualité par échantillonnage.

---

## 🎯 Pourquoi ce projet

En fiduciaire, une personne réellement délégable doit savoir:

- identifier l’entité et la période correctes;
- comprendre ce qui manque avant de produire;
- lire le mandat et ses exclusions;
- vérifier une information dans une source officielle;
- produire un livrable reprenable par un autre collaborateur;
- détecter et corriger ses propres erreurs;
- distinguer fait, hypothèse et inconnue;
- reconnaître les situations où elle doit s’arrêter et escalader.

L’objectif n’est donc pas de créer une succession de cours, mais une **progression d’autonomie**.

---

## 🧭 Workflow autonomy-first

### 1. Apprendre

Cours, cas simulé, exemples guidés et exercices sur outils publics réels lorsque cela a un intérêt métier.

### 2. Produire

Chaque livrable est relié au **modèle exact** à compléter. Le learner ouvre le modèle, travaille localement et conserve son fichier dans son propre dossier.

### 3. Aucun faux upload

La plateforme ne téléverse pas les fichiers de travail. Le bouton ambigu «Choisir un fichier» a été supprimé du workflow actif.

Chaque livrable affiche désormais:

- **Ouvrir le modèle**;
- **Livrable terminé**;
- un champ facultatif pour noter le nom ou l’emplacement local du fichier.

Une pièce source du cas ne compte pas comme livrable produit.

### 4. Quiz et correction

Le quiz teste le raisonnement professionnel. Les erreurs critiques restent bloquantes.

### 5. Autocontrôle guidé

L’ancienne zone «Réservé au responsable» devient un contrôle par l’apprenant:

- Conforme;
- Partiel;
- Insuffisant;
- contrôles critiques: Non / Oui / Je ne sais pas.

Le score est calculé automatiquement. Une réponse critique «Oui» ou «Je ne sais pas» empêche la progression et recommande une revue humaine ciblée.

### 6. Revue humaine seulement quand elle apporte de la valeur

Elle est recommandée si:

- une erreur critique persiste;
- une règle ou une source reste ambiguë;
- des pièces se contredisent;
- une décision réelle dépasse le périmètre délégué;
- le cabinet souhaite effectuer un échantillonnage qualité.

> **Autonomie pédagogique ≠ pouvoir professionnel.** Pour un vrai client, mandat, délégation, signatures, dépôts, paiements et décisions réglementaires restent soumis aux procédures du cabinet.

---

## 🧩 État du projet

- **12 mois** structurés;
- **25 compétences cœur** planifiées;
- **4 modules complets**: TC01–TC04;
- **21 blueprints** encore à développer;
- **Mois 1: 4/4 publié**;
- progression locale avec sauvegarde JSON;
- autocontrôle des modules;
- bilan mensuel autonome;
- protocole de revue humaine ciblée et échantillonnage;
- QA GitHub Actions end-to-end.

---

## 🏁 Mois 1

| Module | Compétence observable | Standard |
|---|---|---|
| **TC01 v1.4** | Cadrer mandat, pouvoirs, accès, échéances et registres avant production | `fait → contrôle → source → décision → trace` |
| **TC02 v1.0** | Identifier le sujet comptable et séparer les patrimoines | `sujet → date → nature → pièce → écriture → escalade` |
| **TC03 v1.0** | Limiter données/accès et gérer un incident sans masquer les faits | `finalité → nécessité → destinataire → accès → canal → trace` |
| **TC04 v1.0** | Construire un KYC factuel et cartographier le service réel | `identité → contrôle → activité → service → date → écart → escalade` |

### TC01 — deux exercices réels, un cas fictif

TC01 distingue clairement apprentissage de l’outil et résolution du cas.

**1. Zefix réel — Nestlé S.A.**  
Le learner apprend à identifier la raison sociale exacte, la forme juridique, le siège, le statut et les informations de signature disponibles dans un registre réel.

**2. IDE / TVA réel — Nestlé S.A.**  
Le learner contrôle séparément:

- statut IDE;
- statut RC;
- statut Registre TVA;
- numéro TVA;
- début d’assujettissement;
- fin d’assujettissement;
- groupe d’imposition TVA éventuel;
- adéquation entre le statut et la période réellement traitée.

Le principe critique est:

> **Entreprise active ≠ TVA active pour la période traitée.**

Une ancienne facture ou un ancien numéro TVA ne suffit jamais à prouver la situation actuelle.

**3. Léman Atelier Sàrl — cas fictif contrôlé**  
Cette société n’est jamais recherchée dans Zefix, IDE ou ePortal réel. Seules les pièces simulées fournies constituent les faits du dossier.

---

## ✅ Validation pédagogique

Un module publié combine:

1. quiz;
2. six livrables, lorsque le module en prévoit six;
3. note de travail;
4. autocontrôle ≥ seuil du module;
5. zéro erreur critique;
6. trace d’escalade des points que le learner ne peut pas trancher.

Une modification d’un livrable après autocontrôle annule la validation dépendante. Une nouvelle tentative critique échouée retire également la réussite concernée.

Le jalon mensuel devient un **Bilan d’autonomie mensuel**. Aucun nom de responsable n’est requis pour terminer pédagogiquement le mois. Le learner consigne ce qu’il maîtrise, les erreurs corrigées et les points qui nécessiteraient une escalade dans un vrai dossier.

Pendant le pilote, une personne de référence vérifie seulement un petit échantillon final — au minimum deux livrables de modules différents, plus les points critiques/incertains. La métrique importante est le **temps humain réellement nécessaire**.

---

## 🔐 Données et confidentialité

L’application est statique et fonctionne dans le navigateur. Elle conserve localement scores, notes, cases de livrables et métadonnées de progression.

**Aucun fichier de preuve n’est téléversé.**

> [!WARNING]
> Ne jamais saisir de données client réelles dans l’édition publique. Une sauvegarde JSON est modifiable et ne constitue pas un certificat.

Les dossiers, signatures, approbations et décisions réelles doivent rester dans les systèmes internes du cabinet.

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
│   ├── runtime-enhancements.js
│   └── autonomy-first.js
├── ressources/
│   ├── tc01-apprenant-v1.4/
│   │   ├── 01_Exercice_Zefix_reel_Nestle.html
│   │   ├── 13_Exercice_IDE_TVA_reel.html
│   │   ├── 14_Fiche_IDE_TVA_reel.csv
│   │   └── ...
│   ├── tc02-apprenant-v1.0/
│   ├── tc03-apprenant-v1.0/
│   ├── tc04-apprenant-v1.0/
│   └── pilote-m1/
├── PILOTE_MOIS_1.md
├── PROGRAMME_12_MOIS.md
├── qa-links.mjs
├── qa-public.mjs
└── qa-smoke.cjs
```

---

## 🧪 QA

```bash
npm ci
npm run build
npm run test:links
npm run test:public
npm run test:smoke
```

Les tests vérifient notamment:

- absence de matériel formateur privé;
- 4/25 modules publiés et 21 blueprints;
- présence des modèles pour les six livrables de TC01–TC04;
- disparition du faux sélecteur de fichier;
- exercice réel Zefix;
- exercice réel IDE/TVA et vérification des statuts/dates;
- détection d’une pièce source utilisée à tort comme livrable;
- quiz et questions critiques;
- autocontrôle sans responsable;
- clôture autonome du Mois 1;
- invalidation automatique après modification d’une preuve;
- erreurs JavaScript essentielles.

---

## ⚖️ Sources et limites

Les contenus utilisent des sources officielles suisses: Fedlex, AFC/ESTV, Zefix, registre IDE, SECO/SFI, PFPDT, FINMA, TranspaReg et autres autorités selon le thème.

La date de revue éditoriale ne garantit pas la validité permanente d’une règle. Pour un vrai dossier, la source applicable à la période doit être vérifiée au moment de l’usage.

Le parcours ne délivre pas de titre fédéral et ne remplace pas les contrôles professionnels nécessaires pour les dossiers réels, la fiscalité complexe, les restructurations, l’audit, la consolidation, les décisions AML/LBA, le payroll transfrontalier complexe ou tout acte hors délégation.

---

## 🗺 Prochaines étapes

- [x] TC01–TC04 publiés;
- [x] séparation outils réels / cas fictifs dans TC01;
- [x] workflow des livrables sans faux upload;
- [x] autocontrôle guidé;
- [x] revue humaine ciblée au lieu d’une correction systématique;
- [x] exercice réel IDE / TVA;
- [ ] terminer le pilote réel du Mois 1;
- [ ] mesurer le temps humain résiduel et les erreurs que l’autocontrôle laisse éventuellement passer;
- [ ] corriger P0/P1;
- [ ] geler le standard autonomy-first;
- [ ] produire le Mois 2.

> Le critère de réussite n’est pas «le responsable a tout vérifié». C’est: **l’apprenant a produit, détecté, corrigé et documenté le maximum seul, puis a demandé de l’aide uniquement au bon moment.**
