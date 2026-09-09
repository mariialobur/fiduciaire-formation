const { readFileSync } = require('node:fs');
const { JSDOM, VirtualConsole } = require('jsdom');

function assert(condition, message) { if (!condition) throw new Error(message); }
function tick(window) { return new Promise((resolve) => window.setTimeout(resolve, 0)); }

async function load(path) {
  const errors = [];
  const vc = new VirtualConsole();
  vc.on('jsdomError', (e) => errors.push(e.message));
  vc.on('error', (e) => errors.push(String(e)));
  const dom = new JSDOM(readFileSync(path, 'utf8'), {
    url: `https://formation.test/${path}`,
    runScripts: 'dangerously',
    pretendToBeVisual: true,
    virtualConsole: vc
  });
  await tick(dom.window); await tick(dom.window);
  return { dom, document: dom.window.document, window: dom.window, errors };
}

function answer(document, answers) {
  answers.forEach((answer, n) => {
    const button = document.querySelector(`.choice[data-n="${n}"][data-i="${answer}"]`);
    assert(button, `Réponse ${n + 1} introuvable`);
    button.click();
  });
}

(async () => {
  {
    const { document, errors } = await load('ressources/tc05-apprenant-v1.1/00_Mission_TC05_v1.1.html');
    assert(document.querySelectorAll('#cases .case').length === 7, 'TC05 doit contenir 7 mouvements');
    answer(document, [0, 2, 1, 3, 2, 0, 3]);
    assert(document.getElementById('score').textContent.includes('7 / 7'), 'TC05 score 7/7 absent');
    assert(document.querySelectorAll('[data-k]').length === 16, 'TC05 journal de saisie incomplet');
    document.querySelector('[data-k="lib0"]').value = 'OfficeWorld – règlement F-2406-118';
    document.getElementById('saveEntries').click();
    assert(document.getElementById('saved').classList.contains('show'), 'TC05 sauvegarde locale non confirmée');
    document.getElementById('showCorrection').click();
    assert(document.getElementById('correction').style.display === 'block', 'TC05 correction non affichée');
    assert(Array.from(document.querySelectorAll('a')).some((a) => a.href.includes('tc06-apprenant-v1.1')), 'TC05 → TC06 absent');
    assert(errors.length === 0, `TC05 erreurs navigateur: ${errors.join(' | ')}`);
  }

  {
    const { document, errors } = await load('ressources/tc06-apprenant-v1.1/00_Mission_TC06_v1.1.html');
    assert(document.querySelectorAll('#cases .case').length === 8, 'TC06 doit contenir 8 décisions');
    answer(document, [2, 1, 0, 3, 1, 0, 1, 2]);
    assert(document.getElementById('score').textContent.includes('8 / 8'), 'TC06 score 8/8 absent');
    document.getElementById('note').value = 'Nature avant fournisseur; historique = indice; libellé retrouvable.';
    document.getElementById('save').click();
    assert(document.getElementById('saved').classList.contains('show'), 'TC06 sauvegarde locale non confirmée');
    assert(Array.from(document.querySelectorAll('a')).some((a) => a.href.includes('tc08-apprenant-v1.1')), 'TC06 → TC08 absent');
    assert(errors.length === 0, `TC06 erreurs navigateur: ${errors.join(' | ')}`);
  }

  {
    const { document, errors } = await load('ressources/tc08-apprenant-v1.1/00_Mission_TC08_v1.1.html');
    assert(document.querySelectorAll('#cases .case').length === 6, 'TC08 doit contenir 6 contrôles');
    answer(document, [2, 0, 3, 1, 2, 1]);
    assert(document.getElementById('score').textContent.includes('6 / 6'), 'TC08 score 6/6 absent');
    document.getElementById('m25').value = '50';
    document.getElementById('m26').value = '35';
    document.getElementById('checkMargin').click();
    assert(document.getElementById('marginOk').classList.contains('show'), 'TC08 contrôle de marge 50% → 35% absent');
    assert(document.body.textContent.includes('P1 · Bloquant') && document.body.textContent.includes('P2 · Prioritaire'), 'TC08 priorisation absente');
    assert(Array.from(document.querySelectorAll('a')).some((a) => a.href.includes('#month/2')), 'TC08 → Mois 2 absent');
    assert(errors.length === 0, `TC08 erreurs navigateur: ${errors.join(' | ')}`);
  }

  console.log(JSON.stringify({ month2MissionSmoke: true, tc05: '7/7', tc06: '8/8', tc08: '6/6', margin: '50%→35%', navigation: true }, null, 2));
})().catch((error) => { console.error(error.stack || error.message); process.exit(1); });
