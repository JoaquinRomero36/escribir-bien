export const CATEGORIES = [
  {
    id: 'general',
    name: 'General',
    description: 'Mezcla de todos los tipos de errores',
    icon: 'ShuffleIcon',
    color: '#aff33e',
    totalExercises: 0,
  },
  {
    id: 'h',
    name: 'La H',
    description: 'Palabras con H muda',
    icon: 'LetterHIcon',
    color: '#3b82f6',
    totalExercises: 0,
  },
  {
    id: 'bv',
    name: 'B / V',
    description: 'Diferencia entre B y V',
    icon: 'LetterBIcon',
    color: '#ef4444',
    totalExercises: 0,
  },
  {
    id: 'yll',
    name: 'Y / LL',
    description: 'Cuándo usar Y y cuándo LL',
    icon: 'LetterYIcon',
    color: '#f59e0b',
    totalExercises: 0,
  },
  {
    id: 'chx',
    name: 'CH / X',
    description: 'Palabras con CH y con X',
    icon: 'LetterCHIcon',
    color: '#8b5cf6',
    totalExercises: 0,
  },
  {
    id: 'cis',
    name: 'CI / SI',
    description: 'Suena /s/: ¿se escribe CI o SI?',
    icon: 'LetterCIcon',
    color: '#ec4899',
    totalExercises: 0,
  },
  {
    id: 'ces',
    name: 'CE / SE',
    description: 'Suena /s/: ¿se escribe CE o SE?',
    icon: 'LetterEIcon',
    color: '#06b6d4',
    totalExercises: 0,
  },
  {
    id: 'sz',
    name: 'S / Z',
    description: 'Sonido /s/: ¿se escribe S o Z?',
    icon: 'LetterSIcon',
    color: '#84cc16',
    totalExercises: 0,
  },
  {
    id: 'acentos',
    name: 'Acentos',
    description: 'Reglas de acentuación (aquí las tildes cuentan)',
    icon: 'AccentIcon',
    color: '#f97316',
    totalExercises: 0,
  },
  {
    id: 'ambiguas',
    name: 'Palabras ambiguas',
    description: 'Yendo/llendo, a ver/haber, hay/ahy',
    icon: 'QuestionIcon',
    color: '#6366f1',
    totalExercises: 0,
  },
];

export const EXERCISE_TYPES = {
  FILL_BLANK: 'fill_blank',
  MULTIPLE_CHOICE: 'multiple_choice',
  CORRECT_SENTENCE: 'correct_sentence',
};

function createExercise(id, category, type, question, answer, options = null, explanation = '') {
  return { id, category, type, question, answer, options, explanation };
}

/* ==================== LA H ==================== */
const hExercises = [
  createExercise('h1', 'h', EXERCISE_TYPES.FILL_BLANK, 'Tengo que ___ la tarea de español.', 'hacer', null, 'Infinitivo del verbo: hacer. La H es muda.'),
  createExercise('h2', 'h', EXERCISE_TYPES.FILL_BLANK, 'Aprendí a ___ guitarra el año pasado.', 'hablar', null, 'Verbo hablar: la H inicial no suena.'),
  createExercise('h3', 'h', EXERCISE_TYPES.FILL_BLANK, 'Mi ___ menor cumple años mañana.', 'hermano', null, 'Palabras con HI- inicial llevan H: hermano, hielo, hierba.'),
  createExercise('h4', 'h', EXERCISE_TYPES.FILL_BLANK, '___ vamos al cine juntos.', 'hoy', null, '"Hoy" es adverbio de tiempo y lleva H. "Oy" no existe.'),
  createExercise('h5', 'h', EXERCISE_TYPES.MULTIPLE_CHOICE, '¿Cómo se escribe el saludo?', 'hola', ['ola', 'hola'], 'El saludo es "hola", con H inicial.'),
  createExercise('h6', 'h', EXERCISE_TYPES.MULTIPLE_CHOICE, '¿Cómo se escribe el alimento?', 'huevo', ['uevo', 'huevo'], 'Alimento del desayuno: "huevo", con H.'),
  createExercise('h7', 'h', EXERCISE_TYPES.FILL_BLANK, 'Está ___ fumar dentro del edificio.', 'prohibido', null, 'Del verbo prohibir. H intercalada en -hibir/-ibir: prohibir, exhalar.'),
  createExercise('h8', 'h', EXERCISE_TYPES.FILL_BLANK, 'No puedo salir ___, tengo que terminar esto.', 'ahora', null, '"Ahora" lleva H intercalada: a + hora.'),
  createExercise('h9', 'h', EXERCISE_TYPES.CORRECT_SENTENCE, 'Corrige: "oy voy a ir a la playa"', 'Hoy voy a ir a la playa', null, '"Hoy" (adverbio de tiempo) lleva H; "oy" no existe.'),
  createExercise('h10', 'h', EXERCISE_TYPES.CORRECT_SENTENCE, 'Corrige: "el hombre abla mucho"', 'El hombre habla mucho', null, '"Habla" viene del verbo hablar, con H.'),
];

/* ==================== B / V ==================== */
const bvExercises = [
  createExercise('bv1', 'bv', EXERCISE_TYPES.FILL_BLANK, 'La ___ da leche todas las mañanas.', 'vaca', null, 'Animal doméstico: vaca, con V.'),
  createExercise('bv2', 'bv', EXERCISE_TYPES.FILL_BLANK, 'En ___ hace mucho calor.', 'verano', null, 'Estación del año: verano, con V.'),
  createExercise('bv3', 'bv', EXERCISE_TYPES.FILL_BLANK, 'Es importante ___ estudiado para el examen.', 'haber', null, 'Verbo auxiliar: haber. Se escribe con B.'),
  createExercise('bv4', 'bv', EXERCISE_TYPES.FILL_BLANK, 'Voy a ___ la tarea ahora mismo.', 'hacer', null, 'Verbo hacer: con H y sin V.'),
  createExercise('bv5', 'bv', EXERCISE_TYPES.MULTIPLE_CHOICE, '¿Cómo se escribe el verbo de residir?', 'vivir', ['bivir', 'vivir'], 'Verbo vivir: siempre con V.'),
  createExercise('bv6', 'bv', EXERCISE_TYPES.MULTIPLE_CHOICE, '¿Cómo se escribe el verbo de tomar líquido?', 'beber', ['vever', 'beber'], 'Verbo beber: con B.'),
  createExercise('bv7', 'bv', EXERCISE_TYPES.FILL_BLANK, 'El pozo fue ___ por los trabajadores.', 'cavado', null, 'Participio de cavar: cavado, con V.'),
  createExercise('bv8', 'bv', EXERCISE_TYPES.FILL_BLANK, 'El bebé se limpió la ___ con el pañuelo.', 'baba', null, 'Sustantivo: baba, con B.'),
  createExercise('bv9', 'bv', EXERCISE_TYPES.CORRECT_SENTENCE, 'Corrige: "voy a bivir a Madrid"', 'Voy a vivir a Madrid', null, '"Vivir" se escribe siempre con V.'),
  createExercise('bv10', 'bv', EXERCISE_TYPES.CORRECT_SENTENCE, 'Corrige: "la baca come pasto"', 'La vaca come pasto', null, 'El animal es la vaca, con V.'),
];

/* ==================== Y / LL ==================== */
const yllExercises = [
  createExercise('yll1', 'yll', EXERCISE_TYPES.FILL_BLANK, 'Abrí la puerta con la ___.', 'llave', null, 'Objeto que abre candados: llave, con LL.'),
  createExercise('yll2', 'yll', EXERCISE_TYPES.FILL_BLANK, 'El ___ galopa por el campo.', 'caballo', null, 'Animal: caballo, con LL.'),
  createExercise('yll3', 'yll', EXERCISE_TYPES.FILL_BLANK, '___ nunca llego tarde.', 'yo', null, 'Pronombre personal: yo, con Y.'),
  createExercise('yll4', 'yll', EXERCISE_TYPES.FILL_BLANK, 'El tren ___ llegó a la estación.', 'ya', null, 'Adverbio de tiempo: ya, con Y.'),
  createExercise('yll5', 'yll', EXERCISE_TYPES.MULTIPLE_CHOICE, '¿Cómo se escribe el agua que cae del cielo?', 'lluvia', ['yuvia', 'lluvia'], 'Fenómeno meteorológico: lluvia, con LL.'),
  createExercise('yll6', 'yll', EXERCISE_TYPES.MULTIPLE_CHOICE, '¿Cómo se escribe la descarga eléctrica de la tormenta?', 'rayo', ['ralio', 'rayo'], 'Fenómeno de la tormenta: rayo, con Y.'),
  createExercise('yll7', 'yll', EXERCISE_TYPES.FILL_BLANK, 'Perdí las llaves y no las puedo ___.', 'hallar', null, 'Verbo hallar (encontrar): con LL. Ojo: hallar ≠ haber.'),
  createExercise('yll8', 'yll', EXERCISE_TYPES.FILL_BLANK, 'El avión va a ___ a las nueve.', 'llegar', null, 'Verbo llegar: con LL.'),
  createExercise('yll9', 'yll', EXERCISE_TYPES.CORRECT_SENTENCE, 'Corrige: "ella yega tarde"', 'Ella llega tarde', null, 'Verbo llegar: llega, con LL.'),
  createExercise('yll10', 'yll', EXERCISE_TYPES.CORRECT_SENTENCE, 'Corrige: "yo me yamo Ana"', 'Yo me llamo Ana', null, 'Del verbo llamarse: me llamo, con LL. "Yamo" no existe.'),
];

/* ==================== CH / X ==================== */
const chxExercises = [
  createExercise('chx1', 'chx', EXERCISE_TYPES.FILL_BLANK, 'Se lavó el pelo con ___ de coco.', 'champú', null, 'Préstamo adaptado con CH: champú (nunca "shampú").'),
  createExercise('chx2', 'chx', EXERCISE_TYPES.FILL_BLANK, 'En invierno tomo ___ caliente.', 'chocolate', null, 'Dulce: chocolate, con CH.'),
  createExercise('chx3', 'chx', EXERCISE_TYPES.FILL_BLANK, 'Mi primo estudia en la universidad de ___.', 'México', null, 'País: México, con X. Suena como /j/ o /s/.'),
  createExercise('chx4', 'chx', EXERCISE_TYPES.FILL_BLANK, 'Mañana tengo un ___ de matemáticas.', 'examen', null, 'Prueba académica: examen, con X (/ks/).'),
  createExercise('chx5', 'chx', EXERCISE_TYPES.MULTIPLE_CHOICE, '¿Cómo se escribe el dulce hecho con cacao?', 'chocolate', ['shocolate', 'chocolate'], 'Con CH: chocolate. La SH no existe en español.'),
  createExercise('chx6', 'chx', EXERCISE_TYPES.MULTIPLE_CHOICE, '¿Cómo se escribe el adjetivo de muy bueno?', 'excelente', ['escelente', 'excelente'], 'Con X: excelente.'),
  createExercise('chx7', 'chx', EXERCISE_TYPES.FILL_BLANK, 'Compré un ___ nuevo para la boda.', 'traje', null, 'Prenda: traje. Suena /j/ pero se escribe con J, no con X.'),
  createExercise('chx8', 'chx', EXERCISE_TYPES.FILL_BLANK, 'El ___ es un deporte con guantes.', 'boxeo', null, 'Deporte de combate con guantes: boxeo, con X.'),
  createExercise('chx9', 'chx', EXERCISE_TYPES.CORRECT_SENTENCE, 'Corrige: "el axidente fue grave"', 'El accidente fue grave', null, '"Accidente" lleva CC: accion, accidente.'),
  createExercise('chx10', 'chx', EXERCISE_TYPES.CORRECT_SENTENCE, 'Corrige: "el exito es tuyo"', 'El éxito es tuyo', null, '"Éxito" se escribe con X y lleva tilde (esdrújula).'),
];

/* ==================== CI / SI ==================== */
const cisExercises = [
  createExercise('cis1', 'cis', EXERCISE_TYPES.FILL_BLANK, 'Este ejercicio es muy ___ de resolver.', 'fácil', null, 'Adjetivo: fácil, con C antes de I.'),
  createExercise('cis2', 'cis', EXERCISE_TYPES.FILL_BLANK, 'Muchas ___ por tu ayuda.', 'gracias', null, 'Expresión de cortesía: gracias, con CI.'),
  createExercise('cis3', 'cis', EXERCISE_TYPES.FILL_BLANK, 'La ___ estudia los planetas.', 'ciencia', null, 'Sustantivo: ciencia, con CI.'),
  createExercise('cis4', 'cis', EXERCISE_TYPES.FILL_BLANK, 'Necesito una ___ nueva para la mesa.', 'silla', null, 'Mueble: silla, con SI. Suena igual que "siya"... pero se escribe con SI.'),
  createExercise('cis5', 'cis', EXERCISE_TYPES.MULTIPLE_CHOICE, 'Tengo ___ pesos en la cartera. ¿Cómo se escribe el número?', 'cien', ['sien', 'cien'], 'Número: cien, con C. "Sien" es la parte de la cabeza.'),
  createExercise('cis6', 'cis', EXERCISE_TYPES.MULTIPLE_CHOICE, '¿Cómo se escribe la fruta de hueso?', 'ciruela', ['siruela', 'ciruela'], 'Fruta: ciruela, con CI.'),
  createExercise('cis7', 'cis', EXERCISE_TYPES.FILL_BLANK, 'El ___ de la renta subió este año.', 'precio', null, 'Valor monetario: precio, con CI.'),
  createExercise('cis8', 'cis', EXERCISE_TYPES.FILL_BLANK, 'El juez resolvió el caso con buen ___.', 'juicio', null, 'Sustantivo: juicio, con CI.'),
  createExercise('cis9', 'cis', EXERCISE_TYPES.CORRECT_SENTENCE, 'Corrige: "tengo sinco pesos"', 'Tengo cinco pesos', null, 'Número: cinco, con C.'),
  createExercise('cis10', 'cis', EXERCISE_TYPES.CORRECT_SENTENCE, 'Corrige: "la sencia es importante"', 'La ciencia es importante', null, 'Sustantivo: ciencia, con CI.'),
];

/* ==================== CE / SE ==================== */
const cesExercises = [
  createExercise('ces1', 'ces', EXERCISE_TYPES.FILL_BLANK, 'Esta receta es muy ___ de preparar.', 'sencilla', null, 'Adjetivo: sencilla, con CE inicial.'),
  createExercise('ces2', 'ces', EXERCISE_TYPES.FILL_BLANK, 'Con esfuerzo vas a ___ tus metas.', 'vencer', null, 'Verbo vencer: con CE.'),
  createExercise('ces3', 'ces', EXERCISE_TYPES.FILL_BLANK, 'Las plantas ___ rápido con agua y sol.', 'crecen', null, 'Verbo crecer (ellos): crecen, con CE.'),
  createExercise('ces4', 'ces', EXERCISE_TYPES.FILL_BLANK, 'Me encanta ___ gente nueva.', 'conocer', null, 'Verbo conocer: con CE.'),
  createExercise('ces5', 'ces', EXERCISE_TYPES.MULTIPLE_CHOICE, 'La familia se reúne a la hora de la ___. ¿Cómo se escribe?', 'cena', ['sena', 'cena'], 'Última comida del día: cena, con CE.'),
  createExercise('ces6', 'ces', EXERCISE_TYPES.MULTIPLE_CHOICE, 'La temperatura bajó a ___ grados. ¿Cómo se escribe el número?', 'cero', ['sero', 'cero'], 'Número: cero, con CE.'),
  createExercise('ces7', 'ces', EXERCISE_TYPES.FILL_BLANK, 'Hoy voy a ___ la cena en casa.', 'hacer', null, 'Verbo hacer: suena /s/ pero se escribe con H + C.'),
  createExercise('ces8', 'ces', EXERCISE_TYPES.FILL_BLANK, 'La abuela ___ al bebé en la silla mecánica.', 'mece', null, 'Verbo mecer (él/ella): mece, con CE.'),
  createExercise('ces9', 'ces', EXERCISE_TYPES.CORRECT_SENTENCE, 'Corrige: "voy a senar temprano"', 'Voy a cenar temprano', null, 'Verbo cenar: con CE. "Senar" no existe.'),
  createExercise('ces10', 'ces', EXERCISE_TYPES.CORRECT_SENTENCE, 'Corrige: "el sielo es azul"', 'El cielo es azul', null, 'Sustantivo: cielo, con CE.'),
];

/* ==================== S / Z ==================== */
const szExercises = [
  createExercise('sz1', 'sz', EXERCISE_TYPES.FILL_BLANK, 'Mi ___ tiene un jardín grande.', 'casa', null, 'Vivienda: casa, con S.'),
  createExercise('sz2', 'sz', EXERCISE_TYPES.FILL_BLANK, 'El color favorito de mi mamá es ___.', 'rosa', null, 'Color y flor: rosa, con S.'),
  createExercise('sz3', 'sz', EXERCISE_TYPES.FILL_BLANK, 'Ató el paquete con un ___.', 'lazo', null, 'Cinta para amarrar: lazo, con Z.'),
  createExercise('sz4', 'sz', EXERCISE_TYPES.FILL_BLANK, 'Me duele el ___ de tanto escribir.', 'brazo', null, 'Parte del cuerpo: brazo, con Z.'),
  createExercise('sz5', 'sz', EXERCISE_TYPES.MULTIPLE_CHOICE, 'En el río vive un ___. ¿Cómo se escribe el animal?', 'pez', ['pes', 'pez'], 'Animal acuático: pez, con Z.'),
  createExercise('sz6', 'sz', EXERCISE_TYPES.MULTIPLE_CHOICE, 'Después de la tormenta llegó la ___. ¿Cómo se escribe?', 'paz', ['pas', 'paz'], 'Ausencia de conflicto: paz, con Z.'),
  createExercise('sz7', 'sz', EXERCISE_TYPES.FILL_BLANK, 'Sin tu ayuda no ___ nada, amigo.', 'vales', null, 'Verbo valer (tú): vales, con S final.'),
  createExercise('sz8', 'sz', EXERCISE_TYPES.FILL_BLANK, '¿Qué ___ los fines de semana?', 'haces', null, 'Verbo hacer (tú): haces, con S final.'),
  createExercise('sz9', 'sz', EXERCISE_TYPES.CORRECT_SENTENCE, 'Corrige: "me duele el braco"', 'Me duele el brazo', null, 'Parte del cuerpo: brazo, con Z.'),
  createExercise('sz10', 'sz', EXERCISE_TYPES.CORRECT_SENTENCE, 'Corrige: "tengo mucha pas"', 'Tengo mucha paz', null, 'Sustantivo: paz, con Z.'),
];

/* ==================== ACENTOS ==================== */
const acentosExercises = [
  createExercise('ac1', 'acentos', EXERCISE_TYPES.FILL_BLANK, 'Pido un ___ con leche, por favor.', 'café', null, 'Aguda terminada en vocal: café lleva tilde. Escríbelo con la tilde: é.'),
  createExercise('ac2', 'acentos', EXERCISE_TYPES.FILL_BLANK, 'El ___ maúlla todas las noches.', 'ratón', null, 'Aguda terminada en N: ratón lleva tilde. Escríbelo con ó.'),
  createExercise('ac3', 'acentos', EXERCISE_TYPES.FILL_BLANK, 'Escribí tu nombre con un ___.', 'lápiz', null, 'Aguda terminada en Z: lápiz lleva tilde. Escríbelo con á.'),
  createExercise('ac4', 'acentos', EXERCISE_TYPES.FILL_BLANK, 'Bajo el ___ del parque hace fresco.', 'árbol', null, 'Llana terminada en L: árbol lleva tilde. Escríbelo con á.'),
  createExercise('ac5', 'acentos', EXERCISE_TYPES.MULTIPLE_CHOICE, 'Llana terminada en L, ¿cuál lleva tilde?', 'fácil', ['facil', 'fácil'], 'Las llanas terminadas en L llevan tilde: fácil.'),
  createExercise('ac6', 'acentos', EXERCISE_TYPES.MULTIPLE_CHOICE, 'Las esdrújulas siempre llevan tilde. ¿Cuál está bien escrita?', 'música', ['musica', 'música'], 'Esdrújula: música. Todas las esdrújulas llevan tilde.'),
  createExercise('ac7', 'acentos', EXERCISE_TYPES.FILL_BLANK, 'Apunta mi número de ___ nuevo.', 'teléfono', null, 'Esdrújula: teléfono siempre lleva tilde. Escríbelo con é.'),
  createExercise('ac8', 'acentos', EXERCISE_TYPES.FILL_BLANK, 'Sin riego, la planta se queda ___.', 'frágil', null, 'Llana terminada en L: frágil lleva tilde. Escríbelo con á.'),
  createExercise('ac9', 'acentos', EXERCISE_TYPES.CORRECT_SENTENCE, 'Corrige: "el examen fue facil"', 'El examen fue fácil', null, '"Fácil" es llana terminada en L: lleva tilde.'),
  createExercise('ac10', 'acentos', EXERCISE_TYPES.CORRECT_SENTENCE, 'Corrige: "compre un cafe ayer"', 'Compré un café ayer', null, '"Compré" (pretérito) y "café" (aguda en vocal) llevan tilde.'),
];

/* ==================== PALABRAS AMBIGUAS ==================== */
const ambiguasExercises = [
  createExercise('amb1', 'ambiguas', EXERCISE_TYPES.FILL_BLANK, 'Vamos ___ si está abierta la tienda.', 'a ver', null, '"A ver" (mirar, comprobar): preposición a + verbo ver. "Haber" es otro verbo.'),
  createExercise('amb2', 'ambiguas', EXERCISE_TYPES.FILL_BLANK, '¿___ algo de comer en la nevera?', 'hay', null, 'Existencia: hay (de haber impersonal). "Ahy" y "ahí" no sirven aquí.'),
  createExercise('amb3', 'ambiguas', EXERCISE_TYPES.FILL_BLANK, 'Él está ___ hacia la escuela.', 'yendo', null, 'Gerundio de ir: yendo. "Yendo" nunca se escribe con LL.'),
  createExercise('amb4', 'ambiguas', EXERCISE_TYPES.FILL_BLANK, 'Volví del viaje ___.', 'ayer', null, 'Adverbio de tiempo: ayer, con Y.'),
  createExercise('amb5', 'ambiguas', EXERCISE_TYPES.MULTIPLE_CHOICE, '"Vamos ___ qué pasa en la plaza." ¿Qué completa la frase?', 'a ver', ['haber', 'a ver'], '"A ver" = mirar/comprobar. "Haber" es el verbo auxiliar.'),
  createExercise('amb6', 'ambiguas', EXERCISE_TYPES.MULTIPLE_CHOICE, '"Está ___ caminando al trabajo." ¿Cuál es el gerundio correcto de ir?', 'yendo', ['llendo', 'yendo'], 'Gerundio de ir: yendo, con Y. "Llendo" no existe.'),
  createExercise('amb7', 'ambiguas', EXERCISE_TYPES.FILL_BLANK, '___ que estudiar para el examen.', 'hay', null, 'Obligación impersonal: hay que + infinitivo.'),
  createExercise('amb8', 'ambiguas', EXERCISE_TYPES.FILL_BLANK, '___ si viene tu prima hoy.', 'a ver', null, '"A ver si..." = expresión fija de expectativa.'),
  createExercise('amb9', 'ambiguas', EXERCISE_TYPES.CORRECT_SENTENCE, 'Corrige: "voy allendo a la escuela"', 'Voy yendo a la escuela', null, 'Gerundio de ir: yendo, con Y. "Allendo"/"llendo" no existen.'),
  createExercise('amb10', 'ambiguas', EXERCISE_TYPES.CORRECT_SENTENCE, 'Corrige: "a ber si hay suerte"', 'A ver si hay suerte', null, '"A ver": preposición a + verbo ver. "Ber" no existe.'),
];

/* ==================== GENERAL ==================== */
const generalExercises = [
  ...hExercises.slice(0, 3),
  ...bvExercises.slice(0, 3),
  ...yllExercises.slice(0, 2),
  ...chxExercises.slice(0, 2),
  ...cisExercises.slice(0, 2),
  ...cesExercises.slice(0, 2),
  ...szExercises.slice(0, 2),
  ...acentosExercises.slice(0, 3),
  ...ambiguasExercises.slice(0, 3),
].map((ex, i) => ({ ...ex, id: `gen${i + 1}`, category: 'general' }));

export const ALL_EXERCISES = [
  ...hExercises,
  ...bvExercises,
  ...yllExercises,
  ...chxExercises,
  ...cisExercises,
  ...cesExercises,
  ...szExercises,
  ...acentosExercises,
  ...ambiguasExercises,
  ...generalExercises,
];

CATEGORIES.forEach(cat => {
  const catExercises = ALL_EXERCISES.filter(e => e.category === cat.id);
  cat.totalExercises = catExercises.length;
});

export function getExercisesByCategory(categoryId) {
  if (categoryId === 'general') {
    return ALL_EXERCISES.filter(e => e.category !== 'general');
  }
  return ALL_EXERCISES.filter(e => e.category === categoryId);
}

export function getRandomExercises(categoryId, count = 10) {
  const pool = [...getExercisesByCategory(categoryId)];
  for (let i = pool.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [pool[i], pool[j]] = [pool[j], pool[i]];
  }
  return pool.slice(0, count);
}