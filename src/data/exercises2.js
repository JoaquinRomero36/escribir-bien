import rawData from './exercises2.json';

/* ==================== LOTE 2: ADAPTER — TODO MULTIPLE CHOICE ====================
   Todos los ejercicios se exportan como MULTIPLE_CHOICE con options[].
   - completar_oracion: oración con ___ + opciones del pool de la categoría
   - palabras_ambiguas: oración con ___ + opciones del pool de ambiguas
   - lista_confusiones: pregunta con definición + opciones del grupo (3+)
   - textos_con_errores: 1 MC por error → oración con ___ en la palabra fallada */

const CATEGORY_MAP = {
  b_v: 'bv',
  h: 'h',
  ll_y: 'yll',
  s_c_z: 'sz',
  x: 'chx',
};

const stripAccents = (s) =>
  s.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');

/* ==================== FICHAS DE MEMORIA (FLASHCARDS) ==================== */

const FLASHCARDS = {};
Object.entries(rawData.fichas_memoria_ampliadas).forEach(([jsonCat, fichas]) => {
  const appId = CATEGORY_MAP[jsonCat];
  if (!appId) return;
  const seen = new Set();
  FLASHCARDS[appId] = fichas
    .filter(f => f.regla && !f.regla.toLowerCase().startsWith('no aplica'))
    .filter(f => {
      const key = `${stripAccents(f.palabra)}|${f.regla}`;
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    })
    .map(f => ({ word: f.palabra, rule: f.regla }));
});

export function getFlashcardsByCategory(categoryId) {
  return FLASHCARDS[categoryId] || [];
}

export function hasFlashcards(categoryId) {
  return (FLASHCARDS[categoryId] || []).length > 0;
}

/* Lookup palabra -> regla para enriquecer explicaciones */
const ruleLookup = {};
Object.values(FLASHCARDS).forEach(cards => {
  cards.forEach(c => {
    const key = stripAccents(c.word);
    if (!ruleLookup[key]) ruleLookup[key] = c.rule;
  });
});

/* ==================== DETECCIÓN DE CATEGORÍA ==================== */

function detectConfusionCategory(words) {
  if (words.length !== 2) return 'ambiguas';
  const [a, b] = [words[0].toLowerCase(), words[1].toLowerCase()];
  if (a.includes('x') || b.includes('x')) return 'chx';
  let i = 0;
  while (i < Math.min(a.length, b.length) && a[i] === b[i]) i++;
  const pair = [a[i] || '', b[i] || ''].sort().join('');
  if (pair.includes('b') && pair.includes('v')) return 'bv';
  if (pair === 'hy') return 'yll';
  if (pair.includes('h')) return 'h';
  if (pair.includes('y') || pair.includes('l')) return 'yll';
  if (pair.includes('z') && pair.includes('s')) return 'sz';
  const ctxA = a.slice(Math.max(0, i - 1), i + 2);
  const ctxB = b.slice(Math.max(0, i - 1), i + 2);
  if ((ctxA.includes('ci') || ctxB.includes('ci')) && (ctxA.includes('si') || ctxB.includes('si'))) return 'cis';
  return 'ces';
}

/* ==================== LOOKUP: GRUPOS DE CONFUSIÓN ==================== */

const confusionGroups = {};
rawData.lista_confusiones.forEach(g => {
  g.grupo.forEach(w => {
    confusionGroups[w.toLowerCase()] = g.grupo;
  });
});

/* ==================== GENERACIÓN DE OPCIONES (malas escrituras de la misma palabra) ====================
   Regla: las opciones son SIEMPRE la palabra correcta + malas escrituras de ESA MISMA palabra.
   Nunca otra palabra. El error ortográfico depende de la categoría. */

function transposeNeighbors(w) {
  if (!w || w.length < 3 || w.includes(' ')) return '';
  return w.slice(0, w.length - 2) + w[w.length - 1] + w[w.length - 2];
}

function generateMisspellings(word, category) {
  const w = word.replace(/\(incorrecto\)/gi, '').trim().toLowerCase();
  const seen = new Set([w]);
  const out = [];
  const push = (v) => {
    if (!v) return;
    const c = v.replace(/\(incorrecto\)/gi, '').trim().toLowerCase();
    if (!c || c === w || seen.has(c)) return;
    seen.add(c);
    out.push(c);
  };

  switch (category) {
    case 'h':
      push(w.replace(/h/g, ''));
      push(w.replace(/ci/g, 'si').replace(/ce/g, 'se'));
      push(w.replace(/h/g, '').replace(/ci/g, 'si').replace(/ce/g, 'se'));
      break;
    case 'bv':
      push(w.replace(/b/g, 'v'));
      push(w.replace(/v/g, 'b'));
      break;
    case 'yll':
      push(w.replace(/ll/g, 'y'));
      push(w.replace(/y/g, 'll'));
      break;
    case 'chx':
      push(w.replace(/ch/g, 'x'));
      push(w.replace(/ch/g, 'sh'));
      push(w.replace(/x/g, 's'));
      break;
    case 'sz':
      push(w.replace(/s/g, 'z'));
      push(w.replace(/z/g, 's'));
      break;
    case 'cis':
      push(w.replace(/ci/g, 'si'));
      push(w.replace(/si/g, 'ci'));
      break;
    case 'ces':
      push(w.replace(/ce/g, 'se'));
      push(w.replace(/se/g, 'ce'));
      break;
    case 'acentos':
      push(w.normalize('NFD').replace(/[\u0300-\u036f]/g, ''));
      break;
    case 'ambiguas':
      push(w.replace(/y/g, 'll'));
      push(w.replace(/ll/g, 'y'));
      push(w.replace(/\s+/g, ''));
      push(w.replace(/h/g, ''));
      break;
    case 'textos':
      push(w.replace(/h/g, ''));
      push(w.normalize('NFD').replace(/[\u0300-\u036f]/g, ''));
      push(w.replace(/ll/g, 'y'));
      push(w.replace(/b/g, 'v').replace(/v/g, 'b'));
      push(w.replace(/z/g, 's').replace(/s/g, 'z'));
      push(w.replace(/ci/g, 'si').replace(/ce/g, 'se'));
      break;
    default:
      break;
  }

  /* Respaldo genérico para garantizar al menos 1 mala escritura */
  if (out.length === 0) {
    push(transposeNeighbors(w));
    if (w.length > 2) push(w.slice(0, Math.floor(w.length / 2)) + w.slice(Math.floor(w.length / 2) + 1));
  }
  return out;
}

export function getSmartOptions(word, category, preferred) {
  const w = word.replace(/\(incorrecto\)/gi, '').trim();
  const key = w.toLowerCase();
  const distractors = [];

  if (preferred) {
    const p = preferred.replace(/\(incorrecto\)/gi, '').trim();
    if (p && p.toLowerCase() !== key && !distractors.includes(p)) distractors.push(p);
  }

  const group = confusionGroups[key];
  if (group) {
    group.forEach(o => {
      const clean = o.replace(/\(incorrecto\)/gi, '').trim();
      if (clean && clean.toLowerCase() !== key && !distractors.includes(clean)) distractors.push(clean);
    });
  }

  generateMisspellings(w, category).forEach(m => {
    if (!distractors.includes(m)) distractors.push(m);
  });

  return [w, ...distractors.slice(0, 2)].sort(() => Math.random() - 0.5);
}

/* ==================== COMPLETAR ORACION → MC ==================== */

const fillFromOraciones = rawData.completar_oracion.map(item => {
  const cat = CATEGORY_MAP[item.categoria];
  return {
    id: `l2co${item.id}`,
    category: cat,
    type: 'multiple_choice',
    question: item.oracion,
    answer: item.respuesta,
    options: getSmartOptions(item.respuesta, cat),
    explanation: ruleLookup[stripAccents(item.respuesta)] || '',
  };
});

/* ==================== PALABRAS AMBIGUAS → MC ==================== */

const explicacionPorPrimeraPalabra = {};
rawData.lista_confusiones.forEach(g => {
  if (!explicacionPorPrimeraPalabra[stripAccents(g.grupo[0])]) {
    explicacionPorPrimeraPalabra[stripAccents(g.grupo[0])] = g.explicacion;
  }
});

const ambiguoExtra = rawData.palabras_ambiguas_ampliado.flatMap((par, pi) =>
  par.oraciones.map((o, oi) => ({
    id: `l2am${pi}_${oi}`,
    category: 'ambiguas',
    type: 'multiple_choice',
    question: o.oracion,
    answer: o.respuesta,
    options: getSmartOptions(o.respuesta, 'ambiguas'),
    explanation: explicacionPorPrimeraPalabra[stripAccents(par.par.split('/')[0].trim())] || '',
  }))
);

/* ==================== LISTA CONFUSIONES → MC ==================== */

const SKIP_EXPLICACIONES = ['ver arriba'];

const mcFromConfusiones = [];
const seenMcQuestions = new Set();
rawData.lista_confusiones.forEach((g, gi) => {
  if (g.grupo.some(w => w.includes('(') && w.includes('incorrecto'))) return;
  if (SKIP_EXPLICACIONES.some(s => g.explicacion.toLowerCase().includes(s))) return;

  const parts = g.explicacion.split('|').map(part => {
    const eq = part.indexOf('=');
    return eq === -1 ? null : { word: part.slice(0, eq).trim(), meaning: part.slice(eq + 1).trim() };
  });
  if (parts.length !== g.grupo.length || parts.some(p => !p)) return;
  const aligned = parts.every((p, i) => stripAccents(p.word) === stripAccents(g.grupo[i]));
  if (!aligned) return;

  const category = detectConfusionCategory(g.grupo);

  parts.forEach(({ word, meaning }, wi) => {
    const cleanedMeaning = meaning.split('(')[0].trim();
    if (stripAccents(cleanedMeaning).includes(stripAccents(word))) return;

    const qKey = stripAccents(`¿Qué palabra significa: ${meaning}?`);
    if (seenMcQuestions.has(qKey)) return;
    seenMcQuestions.add(qKey);

    mcFromConfusiones.push({
      id: `l2mc${gi}_${wi}`,
      category,
      type: 'multiple_choice',
      question: `¿Qué palabra significa: ${meaning}?`,
      answer: g.grupo[wi],
      options: getSmartOptions(g.grupo[wi], category),
      explanation: g.explicacion,
    });
  });
});

/* ==================== TEXTOS CON ERRORES → MC POR ERROR ==================== */

const textosMC = rawData.textos_con_errores.flatMap(t => {
  const textTokens = t.texto.split(/\s+/);
  return t.errores.map(e => {
    const idx = textTokens.findIndex(token => {
      const bare = token.replace(/[.,;:!?"']+$/g, '').replace(/^[¿¡"']+/, '');
      return bare.toLowerCase() === e.incorrecta.toLowerCase();
    });
    const qTokens = [...textTokens];
    if (idx !== -1) qTokens[idx] = '___';
    return {
      id: `l2tx${t.id}_${e.incorrecta}`,
      category: 'textos',
      type: 'multiple_choice',
      question: qTokens.join(' '),
      answer: e.correcta,
      options: getSmartOptions(e.correcta, 'textos', e.incorrecta),
      explanation: `${e.incorrecta} → ${e.correcta}`,
    };
  });
});

/* ==================== EXPORTS ==================== */

export const lote2Exercises = [
  ...fillFromOraciones,
  ...ambiguoExtra,
  ...mcFromConfusiones,
  ...textosMC,
];
