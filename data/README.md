# Données de la plateforme

## Source active

L’application charge les données dans cet ordre:

1. `app-data.js`: catalogue historique et registre des sources;
2. `roadmap-data.js`: parcours v2.3, TC01 v1.3, autres fiches cœur, cas final et compléments de sources.

`roadmap-data.js` remplace les anciennes définitions des 24 modules du tronc commun et ajoute `CAP12`. Il constitue donc la source active pour le parcours obligatoire. Le quiz TC01 n’y existe qu’une fois; l’interface, le score et les contrôles critiques utilisent cette définition unique. Son seuil v1.3 est 14/16 avec Q01, Q04, Q10 et Q15 obligatoires.

## Fichiers historiques

`modules.json` et `tracks.json` conservent surtout l’état v1.3 de la bibliothèque sectorielle. `sources-registry.json` est synchronisé avec les références TC01 actives (CO, Olico, LPD, PFPDT, LTVA/AFC, PA, LBA, OBA, FINMA, Zefix et IDE), vérifiées le 06.08.2026. Ces fichiers ne doivent pas être utilisés seuls pour calculer la progression v2.3.

Après toute modification de l’application ou des données actives, exécuter `node build-standalone.mjs` à la racine afin de régénérer `index.html` et `LANCER_ICI.html`.
