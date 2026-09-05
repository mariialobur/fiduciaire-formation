# QA reproductible — v2.3

Les contrôles peuvent être relancés depuis une copie propre de l’archive.

## Prérequis

- Node.js 18 ou plus récent;
- accès au registre npm uniquement lors de l’installation de la dépendance de test.

## Commandes

```bash
npm ci
npm test
```

`qa-links.mjs` contrôle les fichiers HTML et leurs références locales. `qa-smoke.cjs` exécute les scénarios fonctionnels dans un DOM simulé: maturité des modules, seuil TC01 14/16, questions critiques, six preuves, blocages de revue, annulation après modification et restauration JSON stricte.

Le dossier `node_modules` n’est pas livré dans l’archive. La version exacte de `jsdom` est verrouillée par `package-lock.json` afin que l’installation soit reproductible.
