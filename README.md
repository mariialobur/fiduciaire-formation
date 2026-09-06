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

Fiduciaire Formation est conçu pour développer un comportement professionnel observable, pas seulement des connaissances. Le standard actif combine désormais **mission-first** et **autonomy-first**:

> **situation → tentative → contrôle → explication utile → décision → autocontrôle → escalade ciblée**

La plateforme n’exige plus qu’un responsable corrige systématiquement chaque module. Une intervention humaine reste ciblée sur les erreurs critiques, les incertitudes, les décisions réelles hors délégation et les contrôles qualité par échantillonnage.

---

## 🎯 Pourquoi ce projet

En fiduciaire, une personne réellement délégable doit savoir:

- identifier l’entité et la période correctes;
- comprendre ce qui manque avant de produire;
- lire le mandat et ses exclusions;
- vérifier une information dans une source officielle;
- produire un résultat reprenable par un autre collaborateur;
- détecter et corriger ses propres erreurs;
- distinguer fait, hypothèse et inconnue;
- reconnaître les situations où elle doit s’arrêter et escalader.

L’objectif n’est donc pas de créer une succession de cours, mais une **progression d’autonomie au travers de situations de travail**.

---

## 🧭 Workflow mission-first + autonomy-first

### 1. Commencer par une situation

Le learner reçoit d’abord une situation de travail et doit prendre une première décision. Les explications apparaissent lorsque le besoin devient concret.

### 2. Approfondir l’outil au bon moment

Les outils professionnels importants comme **RC / Zefix** et **IDE / TVA** restent expliqués en profondeur. Ils ne sont simplement plus imposés comme longue lecture préalable.

### 3. Produire peu, mais utile

Le nombre de résultats dépend du module. TC01, par exemple, se termine avec **deux résultats**: une note de dossier et un e-mail client. Les contrôles RC, IDE/TVA, mandat et échéances sont intégrés dans la note au lieu d’être recopiés dans plusieurs formulaires.

### 4. Aucun faux upload

La plateforme ne téléverse pas les fichiers de travail. Le bouton ambigu «Choisir un fichier» a été supprimé du workflow actif.

### 5. Challenge et correction

Le quiz teste des situations professionnelles. Les erreurs critiques restent bloquantes.

### 6. Autocontrôle guidé

L’ancienne zone «Réservé au responsable» devient un contrôle par l’apprenant:

- Conforme;
- Partiel;
- Insuffisant;
- contrôles critiques: Non / Oui / Je ne sais pas.

Le score est calculé automatiquement. Une réponse critique «Oui» ou «Je ne sais pas» empêche la progression et recommande une revue humaine ciblée.

### 7. Revue humaine seulement quand elle apporte de la valeur

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
- missions guidées lorsque le sujet s’y prête;
- autocontrôle des modules;
- bilan mensuel autonome;
- protocole de revue humaine ciblée et échantillonnage;
- QA GitHub Actions end-to-end.

---

## 🏁 Mois 1

| Module | Compétence observable | Standard |
|---|---|---|
| **TC01 v1.6** | Décider jusqu’où un dossier peut avancer avant production | `situation → contrôle → source → décision → trace` |
| **TC02 v1.0** | Identifier le sujet comptable et séparer les patrimoines | `sujet → date → nature → pièce → écriture → escalade` |
| **TC03 v1.0** | Limiter données/accès et gérer un incident sans masquer les faits | `finalité → nécessité → destinataire → accès → canal → trace` |
| **TC04 v1.0** | Construire un KYC factuel et cartographier le service réel | `identité → contrôle → activité → service → date → écart → escalade` |

### TC01 — Mission 01 «Pouvez-vous prendre ce dossier?»

TC01 ne commence plus par un long cours. Le learner reçoit une demande urgente et progresse en **8 étapes**:

1. premier réflexe sur la demande client;
2. identification de l’entité via RC / Zefix;
3. contrôle IDE / TVA par période;
4. lecture du mandat et classification des demandes;
5. décision provisoire sur la Remise 1;
6. mise à jour du raisonnement avec la Remise 2;
7. décision finale et éventuelle revue humaine ciblée;
8. production d’une note de dossier et d’un e-mail client.

**RC / Zefix réel — Nestlé S.A.**  
Le learner apprend à identifier la raison sociale exacte, la forme juridique, le siège, le statut, l’IDE/UID et les informations de signature disponibles dans un registre réel.

**IDE / TVA réel — Nestlé S.A.**  
Le learner contrôle séparément statut IDE, statut RC, statut Registre TVA, début/fin d’assujettissement et éventuel groupe TVA.

Le principe critique est:

> **Entreprise active ≠ TVA active pour la période traitée.**

**Léman Atelier Sàrl — cas fictif contrôlé**  
Cette société n’est jamais recherchée dans Zefix, IDE ou ePortal réel. Seules les pièces simulées fournies constituent les faits du dossier.

Le cours détaillé et le glossaire restent disponibles, mais deviennent des **ressources de référence** et non des lectures obligatoires avant la mission.

---

## ✅ Validation pédagogique

Un module publié combine selon son besoin:

1. situation ou cas;
2. résultat(s) de travail utile(s);
3. note de travail;
4. challenge / quiz;
5. autocontrôle ≥ seuil du module;
6. zéro erreur critique;
7. trace d’escalade des points que le learner ne peut pas trancher.

Pour TC01 v1.6: **8 situations**, seuil **7/8**, **3 questions critiques**, **2 résultats** et **4 critères d’autocontrôle**.

Une modification d’un résultat après autocontrôle annule la validation dépendante. Une nouvelle tentative critique échouée retire également la réussite concernée.

Le jalon mensuel devient un **Bilan d’autonomie mensuel**. Aucun nom de responsable n’est requis pour terminer pédagogiquement le mois. Le learner consigne ce qu’il maîtrise, les erreurs corrigées et les points qui nécessiteraient une escalade dans un vrai dossier.

Pendant le pilote, une personne de référence vérifie seulement un petit échantillon final, plus les points critiques/incertains. La métrique importante est le **temps humain réellement nécessaire**.

---

## 🔐 Données et confidentialité

L’application est statique et fonctionne dans le navigateur. Elle conserve localement scores, notes, cases de résultats et métadonnées de progression.

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
│   ├── tc01-polish-v1.5.js
│   ├── tc01-mission-v1.6.js
│   ├── tc02-v1.0.js
│   ├── tc03-v1.0.js
│   ├── tc04-v1.0.js
│   ├── runtime-enhancements.js
│   └── autonomy-first.js
├── ressources/
│   ├── tc01-apprenant-v1.6/
│   │   └── 00_Mission_TC01_v1.6.html
│   ├── tc01-apprenant-v1.5/
│   │   └── 01_Cours_TC01_v1.5.html
│   ├── tc01-apprenant-v1.4/
│   │   ├── 01_Exercice_Zefix_reel_Nestle.html
│   │   ├── 13_Exercice_IDE_TVA_reel.html
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
- Mission TC01 en 8 étapes;
- RC / Zefix et IDE / TVA reliés à la Mission;
- TC01 réduit à 2 résultats utiles;
- challenge TC01 à 8 situations / 3 critiques;
- autocontrôle TC01 simplifié à 4 critères;
- disparition du faux sélecteur de fichier;
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
- [x] workflow autonomy-first;
- [x] TC01 transformé en Mission 01 guidée;
- [x] RC / Zefix et IDE / TVA conservés comme approfondissements métier;
- [x] TC01 réduit à deux résultats utiles;
- [ ] tester la Mission 01 avec un vrai débutant;
- [ ] corriger les frictions P0/P1 observées;
- [ ] appliquer le standard mission-first aux modules où il améliore réellement l’apprentissage;
- [ ] poursuivre le Mois 2.

> Le critère de réussite n’est pas «le responsable a tout vérifié». C’est: **l’apprenant a compris, produit, détecté, corrigé et documenté le maximum seul, puis a demandé de l’aide uniquement au bon moment.**
