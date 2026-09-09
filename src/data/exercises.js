import { lote2Exercises, getSmartOptions, shuffle } from './exercises2';

export const CATEGORIES = [
  {
    id: 'general',
    name: 'General',
    description: 'Mezcla de todos los tipos de errores',
    icon: 'ShuffleIcon',
    color: '#aff33e',
    
  },
  {
    id: 'h',
    name: 'La H',
    description: 'Palabras con H muda',
    icon: 'LetterHIcon',
    color: '#3b82f6',
    
  },
  {
    id: 'bv',
    name: 'B / V',
    description: 'Diferencia entre B y V',
    icon: 'LetterBIcon',
    color: '#ef4444',
    
  },
  {
    id: 'yll',
    name: 'Y / LL',
    description: 'Cuándo usar Y y cuándo LL',
    icon: 'LetterYIcon',
    color: '#f59e0b',
    
  },
  {
    id: 'chx',
    name: 'CH / X',
    description: 'Palabras con CH y con X',
    icon: 'LetterCHIcon',
    color: '#8b5cf6',
    
  },
  {
    id: 'cis',
    name: 'CI / SI',
    description: 'Suena /s/: ¿se escribe CI o SI?',
    icon: 'LetterCIcon',
    color: '#ec4899',
    
  },
  {
    id: 'ces',
    name: 'CE / SE',
    description: 'Suena /s/: ¿se escribe CE o SE?',
    icon: 'LetterEIcon',
    color: '#06b6d4',
    
  },
  {
    id: 'sz',
    name: 'S / Z',
    description: 'Sonido /s/: ¿se escribe S o Z?',
    icon: 'LetterSIcon',
    color: '#84cc16',
    
  },
  {
    id: 'acentos',
    name: 'Acentos',
    description: 'Reglas de acentuación (aquí las tildes cuentan)',
    icon: 'AccentIcon',
    color: '#f97316',
    
  },
  {
    id: 'ambiguas',
    name: 'Palabras ambiguas',
    description: 'Yendo/llendo, a ver/haber, hay/ahy',
    icon: 'QuestionIcon',
    color: '#6366f1',
    
  },
  {
    id: 'textos',
    name: 'Revisión',
    description: 'Textos con errores para corregir de punta a punta',
    icon: 'PenIcon',
    color: '#14b8a6',
    
  },
];

/* ==================== PROCESAMIENTO: TODO → MULTIPLE_CHOICE ====================
   Las opciones se generan con getSmartOptions(): SIEMPRE la palabra correcta + malas
   escrituras de ESA misma palabra según la categoría. Nunca otra palabra. */

function processCategory(exercises) {
  return exercises.flatMap(ex => {
    if (ex.type === 'multiple_choice') {
      if (!ex.options || ex.options.length < 3) {
        return [{ ...ex, options: getSmartOptions(ex.answer, ex.category) }];
      }
      return [ex];
    }

    if (ex.type === 'fill_blank') {
      return [{
        ...ex,
        type: 'multiple_choice',
        options: getSmartOptions(ex.answer, ex.category),
      }];
    }

    if (ex.type === 'correct_sentence') {
      const wrong = ex.question.replace(/^Corrige:\s*"?/, '').replace(/"?\s*$/, '');
      const wrongTokens = wrong.split(/\s+/);
      const correctTokens = ex.answer.split(/\s+/);

      const errors = [];
      for (let i = 0; i < Math.min(wrongTokens.length, correctTokens.length); i++) {
        if (wrongTokens[i] === correctTokens[i]) continue;
        if (i === 0 && wrongTokens[i].toLowerCase() === correctTokens[i].toLowerCase()) continue;
        errors.push({ idx: i, wrong: wrongTokens[i], correct: correctTokens[i] });
      }

      if (errors.length === 0) {
        return [{ ...ex, type: 'multiple_choice', options: getSmartOptions(ex.answer, ex.category) }];
      }

      return errors.map(err => {
        const qTokens = [...wrongTokens];
        qTokens[err.idx] = '___';
        return {
          id: `${ex.id}_w${err.idx}`,
          category: ex.category,
          type: 'multiple_choice',
          question: qTokens.join(' '),
          answer: err.correct,
          options: getSmartOptions(err.correct, ex.category, err.wrong),
          explanation: ex.explanation,
        };
      });
    }

    return [ex];
  });
}

/* ==================== EJERCICIOS POR CATEGORÍA ==================== */

/* ==================== LA H ==================== */
const hExercises = processCategory([
  { id: 'h1', category: 'h', type: 'fill_blank', question: 'Tengo que ___ la tarea de español.', answer: 'hacer', options: null, explanation: 'Infinitivo del verbo: hacer. La H es muda.' },
  { id: 'h2', category: 'h', type: 'fill_blank', question: 'Aprendí a ___ guitarra el año pasado.', answer: 'hablar', options: null, explanation: 'Verbo hablar: la H inicial no suena.' },
  { id: 'h3', category: 'h', type: 'fill_blank', question: 'Mi ___ menor cumple años mañana.', answer: 'hermano', options: null, explanation: 'Palabras con HI- inicial llevan H: hermano, hielo, hierba.' },
  { id: 'h4', category: 'h', type: 'fill_blank', question: '___ vamos al cine juntos.', answer: 'hoy', options: null, explanation: '"Hoy" es adverbio de tiempo y lleva H. "Oy" no existe.' },
  { id: 'h5', category: 'h', type: 'multiple_choice', question: '¿Cómo se escribe el saludo?', answer: 'hola', options: ['ola', 'hola'], explanation: 'El saludo es "hola", con H inicial.' },
  { id: 'h6', category: 'h', type: 'multiple_choice', question: '¿Cómo se escribe el alimento?', answer: 'huevo', options: ['uevo', 'huevo'], explanation: 'Alimento del desayuno: "huevo", con H.' },
  { id: 'h7', category: 'h', type: 'fill_blank', question: 'Está ___ fumar dentro del edificio.', answer: 'prohibido', options: null, explanation: 'Del verbo prohibir. H intercalada en -hibir/-ibir: prohibir, exhalar.' },
  { id: 'h8', category: 'h', type: 'fill_blank', question: 'No puedo salir ___, tengo que terminar esto.', answer: 'ahora', options: null, explanation: '"Ahora" lleva H intercalada: a + hora.' },
  { id: 'h9', category: 'h', type: 'correct_sentence', question: 'Corrige: "oy voy a ir a la playa"', answer: 'Hoy voy a ir a la playa', options: null, explanation: '"Hoy" (adverbio de tiempo) lleva H; "oy" no existe.' },
  { id: 'h10', category: 'h', type: 'correct_sentence', question: 'Corrige: "el hombre abla mucho"', answer: 'El hombre habla mucho', options: null, explanation: '"Habla" viene del verbo hablar, con H.' },
]);

/* ==================== B / V ==================== */
const bvExercises = processCategory([
  { id: 'bv1', category: 'bv', type: 'fill_blank', question: 'La ___ da leche todas las mañanas.', answer: 'vaca', options: null, explanation: 'Animal doméstico: vaca, con V.' },
  { id: 'bv2', category: 'bv', type: 'fill_blank', question: 'En ___ hace mucho calor.', answer: 'verano', options: null, explanation: 'Estación del año: verano, con V.' },
  { id: 'bv3', category: 'bv', type: 'fill_blank', question: 'Es importante ___ estudiado para el examen.', answer: 'haber', options: null, explanation: 'Verbo auxiliar: haber. Se escribe con B.' },
  { id: 'bv4', category: 'bv', type: 'fill_blank', question: 'Voy a ___ la tarea ahora mismo.', answer: 'hacer', options: null, explanation: 'Verbo hacer: con H y sin V.' },
  { id: 'bv5', category: 'bv', type: 'multiple_choice', question: '¿Cómo se escribe el verbo de residir?', answer: 'vivir', options: ['bivir', 'vivir'], explanation: 'Verbo vivir: siempre con V.' },
  { id: 'bv6', category: 'bv', type: 'multiple_choice', question: '¿Cómo se escribe el verbo de tomar líquido?', answer: 'beber', options: ['vever', 'beber'], explanation: 'Verbo beber: con B.' },
  { id: 'bv7', category: 'bv', type: 'fill_blank', question: 'El pozo fue ___ por los trabajadores.', answer: 'cavado', options: null, explanation: 'Participio de cavar: cavado, con V.' },
  { id: 'bv8', category: 'bv', type: 'fill_blank', question: 'El bebé se limpió la ___ con el pañuelo.', answer: 'baba', options: null, explanation: 'Sustantivo: baba, con B.' },
  { id: 'bv9', category: 'bv', type: 'correct_sentence', question: 'Corrige: "voy a bivir a Madrid"', answer: 'Voy a vivir a Madrid', options: null, explanation: '"Vivir" se escribe siempre con V.' },
  { id: 'bv10', category: 'bv', type: 'correct_sentence', question: 'Corrige: "la baca come pasto"', answer: 'La vaca come pasto', options: null, explanation: 'El animal es la vaca, con V.' },
]);

/* ==================== Y / LL ==================== */
const yllExercises = processCategory([
  { id: 'yll1', category: 'yll', type: 'fill_blank', question: 'Abrí la puerta con la ___.', answer: 'llave', options: null, explanation: 'Objeto que abre candados: llave, con LL.' },
  { id: 'yll2', category: 'yll', type: 'fill_blank', question: 'El ___ galopa por el campo.', answer: 'caballo', options: null, explanation: 'Animal: caballo, con LL.' },
  { id: 'yll3', category: 'yll', type: 'fill_blank', question: '___ nunca llego tarde.', answer: 'yo', options: null, explanation: 'Pronombre personal: yo, con Y.' },
  { id: 'yll4', category: 'yll', type: 'fill_blank', question: 'El tren ___ llegó a la estación.', answer: 'ya', options: null, explanation: 'Adverbio de tiempo: ya, con Y.' },
  { id: 'yll5', category: 'yll', type: 'multiple_choice', question: '¿Cómo se escribe el agua que cae del cielo?', answer: 'lluvia', options: ['yuvia', 'lluvia'], explanation: 'Fenómeno meteorológico: lluvia, con LL.' },
  { id: 'yll6', category: 'yll', type: 'multiple_choice', question: '¿Cómo se escribe la descarga eléctrica de la tormenta?', answer: 'rayo', options: ['ralio', 'rayo'], explanation: 'Fenómeno de la tormenta: rayo, con Y.' },
  { id: 'yll7', category: 'yll', type: 'fill_blank', question: 'Perdí las llaves y no las puedo ___.', answer: 'hallar', options: null, explanation: 'Verbo hallar (encontrar): con LL. Ojo: hallar ≠ haber.' },
  { id: 'yll8', category: 'yll', type: 'fill_blank', question: 'El avión va a ___ a las nueve.', answer: 'llegar', options: null, explanation: 'Verbo llegar: con LL.' },
  { id: 'yll9', category: 'yll', type: 'correct_sentence', question: 'Corrige: "ella yega tarde"', answer: 'Ella llega tarde', options: null, explanation: 'Verbo llegar: llega, con LL.' },
  { id: 'yll10', category: 'yll', type: 'correct_sentence', question: 'Corrige: "yo me yamo Ana"', answer: 'Yo me llamo Ana', options: null, explanation: 'Del verbo llamarse: me llamo, con LL. "Yamo" no existe.' },
]);

/* ==================== CH / X ==================== */
const chxExercises = processCategory([
  { id: 'chx1', category: 'chx', type: 'fill_blank', question: 'Se lavó el pelo con ___ de coco.', answer: 'champú', options: null, explanation: 'Préstamo adaptado con CH: champú (nunca "shampú").' },
  { id: 'chx2', category: 'chx', type: 'fill_blank', question: 'En invierno tomo ___ caliente.', answer: 'chocolate', options: null, explanation: 'Dulce: chocolate, con CH.' },
  { id: 'chx3', category: 'chx', type: 'fill_blank', question: 'Mi primo estudia en la universidad de ___.', answer: 'México', options: null, explanation: 'País: México, con X. Suena como /j/ o /s/.' },
  { id: 'chx4', category: 'chx', type: 'fill_blank', question: 'Mañana tengo un ___ de matemáticas.', answer: 'examen', options: null, explanation: 'Prueba académica: examen, con X (/ks/).' },
  { id: 'chx5', category: 'chx', type: 'multiple_choice', question: '¿Cómo se escribe el dulce hecho con cacao?', answer: 'chocolate', options: ['shocolate', 'chocolate'], explanation: 'Con CH: chocolate. La SH no existe en español.' },
  { id: 'chx6', category: 'chx', type: 'multiple_choice', question: '¿Cómo se escribe el adjetivo de muy bueno?', answer: 'excelente', options: ['escelente', 'excelente'], explanation: 'Con X: excelente.' },
  { id: 'chx7', category: 'chx', type: 'fill_blank', question: 'Compré un ___ nuevo para la boda.', answer: 'traje', options: null, explanation: 'Prenda: traje. Suena /j/ pero se escribe con J, no con X.' },
  { id: 'chx8', category: 'chx', type: 'fill_blank', question: 'El ___ es un deporte con guantes.', answer: 'boxeo', options: null, explanation: 'Deporte de combate con guantes: boxeo, con X.' },
  { id: 'chx9', category: 'chx', type: 'correct_sentence', question: 'Corrige: "el axidente fue grave"', answer: 'El accidente fue grave', options: null, explanation: '"Accidente" lleva CC: accion, accidente.' },
  { id: 'chx10', category: 'chx', type: 'correct_sentence', question: 'Corrige: "el exito es tuyo"', answer: 'El éxito es tuyo', options: null, explanation: '"Éxito" se escribe con X y lleva tilde (esdrújula).' },
]);

/* ==================== CI / SI ==================== */
const cisExercises = processCategory([
  { id: 'cis1', category: 'cis', type: 'fill_blank', question: 'Este ejercicio es muy ___ de resolver.', answer: 'fácil', options: null, explanation: 'Adjetivo: fácil, con C antes de I.' },
  { id: 'cis2', category: 'cis', type: 'fill_blank', question: 'Muchas ___ por tu ayuda.', answer: 'gracias', options: null, explanation: 'Expresión de cortesía: gracias, con CI.' },
  { id: 'cis3', category: 'cis', type: 'fill_blank', question: 'La ___ estudia los planetas.', answer: 'ciencia', options: null, explanation: 'Sustantivo: ciencia, con CI.' },
  { id: 'cis4', category: 'cis', type: 'fill_blank', question: 'Necesito una ___ nueva para la mesa.', answer: 'silla', options: null, explanation: 'Mueble: silla, con SI. Suena igual que "siya"... pero se escribe con SI.' },
  { id: 'cis5', category: 'cis', type: 'multiple_choice', question: 'Tengo ___ pesos en la cartera. ¿Cómo se escribe el número?', answer: 'cien', options: ['sien', 'cien'], explanation: 'Número: cien, con C. "Sien" es la parte de la cabeza.' },
  { id: 'cis6', category: 'cis', type: 'multiple_choice', question: '¿Cómo se escribe la fruta de hueso?', answer: 'ciruela', options: ['siruela', 'ciruela'], explanation: 'Fruta: ciruela, con CI.' },
  { id: 'cis7', category: 'cis', type: 'fill_blank', question: 'El ___ de la renta subió este año.', answer: 'precio', options: null, explanation: 'Valor monetario: precio, con CI.' },
  { id: 'cis8', category: 'cis', type: 'fill_blank', question: 'El juez resolvió el caso con buen ___.', answer: 'juicio', options: null, explanation: 'Sustantivo: juicio, con CI.' },
  { id: 'cis9', category: 'cis', type: 'correct_sentence', question: 'Corrige: "tengo sinco pesos"', answer: 'Tengo cinco pesos', options: null, explanation: 'Número: cinco, con C.' },
  { id: 'cis10', category: 'cis', type: 'correct_sentence', question: 'Corrige: "la sencia es importante"', answer: 'La ciencia es importante', options: null, explanation: 'Sustantivo: ciencia, con CI.' },
]);

/* ==================== CE / SE ==================== */
const cesExercises = processCategory([
  { id: 'ces1', category: 'ces', type: 'fill_blank', question: 'Esta receta es muy ___ de preparar.', answer: 'sencilla', options: null, explanation: 'Adjetivo: sencilla, con CE inicial.' },
  { id: 'ces2', category: 'ces', type: 'fill_blank', question: 'Con esfuerzo vas a ___ tus metas.', answer: 'vencer', options: null, explanation: 'Verbo vencer: con CE.' },
  { id: 'ces3', category: 'ces', type: 'fill_blank', question: 'Las plantas ___ rápido con agua y sol.', answer: 'crecen', options: null, explanation: 'Verbo crecer (ellos): crecen, con CE.' },
  { id: 'ces4', category: 'ces', type: 'fill_blank', question: 'Me encanta ___ gente nueva.', answer: 'conocer', options: null, explanation: 'Verbo conocer: con CE.' },
  { id: 'ces5', category: 'ces', type: 'multiple_choice', question: 'La familia se reúne a la hora de la ___. ¿Cómo se escribe?', answer: 'cena', options: ['sena', 'cena'], explanation: 'Última comida del día: cena, con CE.' },
  { id: 'ces6', category: 'ces', type: 'multiple_choice', question: 'La temperatura bajó a ___ grados. ¿Cómo se escribe el número?', answer: 'cero', options: ['sero', 'cero'], explanation: 'Número: cero, con CE.' },
  { id: 'ces7', category: 'ces', type: 'fill_blank', question: 'Hoy voy a ___ la cena en casa.', answer: 'hacer', options: null, explanation: 'Verbo hacer: suena /s/ pero se escribe con H + C.' },
  { id: 'ces8', category: 'ces', type: 'fill_blank', question: 'La abuela ___ al bebé en la silla mecánica.', answer: 'mece', options: null, explanation: 'Verbo mecer (él/ella): mece, con CE.' },
  { id: 'ces9', category: 'ces', type: 'correct_sentence', question: 'Corrige: "voy a senar temprano"', answer: 'Voy a cenar temprano', options: null, explanation: 'Verbo cenar: con CE. "Senar" no existe.' },
  { id: 'ces10', category: 'ces', type: 'correct_sentence', question: 'Corrige: "el sielo es azul"', answer: 'El cielo es azul', options: null, explanation: 'Sustantivo: cielo, con CE.' },
]);

/* ==================== S / Z ==================== */
const szExercises = processCategory([
  { id: 'sz1', category: 'sz', type: 'fill_blank', question: 'Mi ___ tiene un jardín grande.', answer: 'casa', options: null, explanation: 'Vivienda: casa, con S.' },
  { id: 'sz2', category: 'sz', type: 'fill_blank', question: 'El color favorito de mi mamá es ___.', answer: 'rosa', options: null, explanation: 'Color y flor: rosa, con S.' },
  { id: 'sz3', category: 'sz', type: 'fill_blank', question: 'Ató el paquete con un ___.', answer: 'lazo', options: null, explanation: 'Cinta para amarrar: lazo, con Z.' },
  { id: 'sz4', category: 'sz', type: 'fill_blank', question: 'Me duele el ___ de tanto escribir.', answer: 'brazo', options: null, explanation: 'Parte del cuerpo: brazo, con Z.' },
  { id: 'sz5', category: 'sz', type: 'multiple_choice', question: 'En el río vive un ___. ¿Cómo se escribe el animal?', answer: 'pez', options: ['pes', 'pez'], explanation: 'Animal acuático: pez, con Z.' },
  { id: 'sz6', category: 'sz', type: 'multiple_choice', question: 'Después de la tormenta llegó la ___. ¿Cómo se escribe?', answer: 'paz', options: ['pas', 'paz'], explanation: 'Ausencia de conflicto: paz, con Z.' },
  { id: 'sz7', category: 'sz', type: 'fill_blank', question: 'Sin tu ayuda no ___ nada, amigo.', answer: 'vales', options: null, explanation: 'Verbo valer (tú): vales, con S final.' },
  { id: 'sz8', category: 'sz', type: 'fill_blank', question: '¿Qué ___ los fines de semana?', answer: 'haces', options: null, explanation: 'Verbo hacer (tú): haces, con S final.' },
  { id: 'sz9', category: 'sz', type: 'correct_sentence', question: 'Corrige: "me duele el braco"', answer: 'Me duele el brazo', options: null, explanation: 'Parte del cuerpo: brazo, con Z.' },
  { id: 'sz10', category: 'sz', type: 'correct_sentence', question: 'Corrige: "tengo mucha pas"', answer: 'Tengo mucha paz', options: null, explanation: 'Sustantivo: paz, con Z.' },
]);

/* ==================== ACENTOS ==================== */
const acentosExercises = processCategory([
  { id: 'ac1', category: 'acentos', type: 'fill_blank', question: 'Pido un ___ con leche, por favor.', answer: 'café', options: null, explanation: 'Aguda terminada en vocal: café lleva tilde. Escríbelo con la tilde: é.' },
  { id: 'ac2', category: 'acentos', type: 'fill_blank', question: 'El ___ maúlla todas las noches.', answer: 'ratón', options: null, explanation: 'Aguda terminada en N: ratón lleva tilde. Escríbelo con ó.' },
  { id: 'ac3', category: 'acentos', type: 'fill_blank', question: 'Escribí tu nombre con un ___.', answer: 'lápiz', options: null, explanation: 'Aguda terminada en Z: lápiz lleva tilde. Escríbelo con á.' },
  { id: 'ac4', category: 'acentos', type: 'fill_blank', question: 'Bajo el ___ del parque hace fresco.', answer: 'árbol', options: null, explanation: 'Llana terminada en L: árbol lleva tilde. Escríbelo con á.' },
  { id: 'ac5', category: 'acentos', type: 'multiple_choice', question: 'Llana terminada en L, ¿cuál lleva tilde?', answer: 'fácil', options: ['facil', 'fácil'], explanation: 'Las llanas terminadas en L llevan tilde: fácil.' },
  { id: 'ac6', category: 'acentos', type: 'multiple_choice', question: 'Las esdrújulas siempre llevan tilde. ¿Cuál está bien escrita?', answer: 'música', options: ['musica', 'música'], explanation: 'Esdrújula: música. Todas las esdrújulas llevan tilde.' },
  { id: 'ac7', category: 'acentos', type: 'fill_blank', question: 'Apunta mi número de ___ nuevo.', answer: 'teléfono', options: null, explanation: 'Esdrújula: teléfono siempre lleva tilde. Escríbelo con é.' },
  { id: 'ac8', category: 'acentos', type: 'fill_blank', question: 'Sin riego, la planta se queda ___.', answer: 'frágil', options: null, explanation: 'Llana terminada en L: frágil lleva tilde. Escríbelo con á.' },
  { id: 'ac9', category: 'acentos', type: 'correct_sentence', question: 'Corrige: "el examen fue facil"', answer: 'El examen fue fácil', options: null, explanation: '"Fácil" es llana terminada en L: lleva tilde.' },
  { id: 'ac10', category: 'acentos', type: 'correct_sentence', question: 'Corrige: "compre un cafe ayer"', answer: 'Compré un café ayer', options: null, explanation: '"Compré" (pretérito) y "café" (aguda en vocal) llevan tilde.' },
]);

/* ==================== PALABRAS AMBIGUAS ==================== */
const ambiguasExercises = processCategory([
  { id: 'amb1', category: 'ambiguas', type: 'fill_blank', question: 'Vamos ___ si está abierta la tienda.', answer: 'a ver', options: null, explanation: '"A ver" (mirar, comprobar): preposición a + verbo ver. "Haber" es otro verbo.' },
  { id: 'amb2', category: 'ambiguas', type: 'fill_blank', question: '¿___ algo de comer en la nevera?', answer: 'hay', options: null, explanation: 'Existencia: hay (de haber impersonal). "Ahy" y "ahí" no sirven aquí.' },
  { id: 'amb3', category: 'ambiguas', type: 'fill_blank', question: 'Él está ___ hacia la escuela.', answer: 'yendo', options: null, explanation: 'Gerundio de ir: yendo. "Yendo" nunca se escribe con LL.' },
  { id: 'amb4', category: 'ambiguas', type: 'fill_blank', question: 'Volví del viaje ___.', answer: 'ayer', options: null, explanation: 'Adverbio de tiempo: ayer, con Y.' },
  { id: 'amb5', category: 'ambiguas', type: 'multiple_choice', question: '"Vamos ___ qué pasa en la plaza." ¿Qué completa la frase?', answer: 'a ver', options: ['haber', 'a ver'], explanation: '"A ver" = mirar/comprobar. "Haber" es el verbo auxiliar.' },
  { id: 'amb6', category: 'ambiguas', type: 'multiple_choice', question: '"Está ___ caminando al trabajo." ¿Cuál es el gerundio correcto de ir?', answer: 'yendo', options: ['llendo', 'yendo'], explanation: 'Gerundio de ir: yendo, con Y. "Llendo" no existe.' },
  { id: 'amb7', category: 'ambiguas', type: 'fill_blank', question: '___ que estudiar para el examen.', answer: 'hay', options: null, explanation: 'Obligación impersonal: hay que + infinitivo.' },
  { id: 'amb8', category: 'ambiguas', type: 'fill_blank', question: '___ si viene tu prima hoy.', answer: 'a ver', options: null, explanation: '"A ver si..." = expresión fija de expectativa.' },
  { id: 'amb9', category: 'ambiguas', type: 'correct_sentence', question: 'Corrige: "voy allendo a la escuela"', answer: 'Voy yendo a la escuela', options: null, explanation: 'Gerundio de ir: yendo, con Y. "Allendo"/"llendo" no existen.' },
  { id: 'amb10', category: 'ambiguas', type: 'correct_sentence', question: 'Corrige: "a ber si hay suerte"', answer: 'A ver si hay suerte', options: null, explanation: '"A ver": preposición a + verbo ver. "Ber" no existe.' },
]);

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
  ...lote2Exercises,
];

export function getExercisesByCategory(categoryId) {
  if (categoryId === 'general') {
    return ALL_EXERCISES.filter(e => e.category !== 'general');
  }
  return ALL_EXERCISES.filter(e => e.category === categoryId);
}

export const SESSION_LENGTH = 10;

export function getRandomExercises(categoryId, count = SESSION_LENGTH) {
  const pool = [...getExercisesByCategory(categoryId)];
  for (let i = pool.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [pool[i], pool[j]] = [pool[j], pool[i]];
  }
  return pool.slice(0, count).map(ex => ({ ...ex, options: shuffle(ex.options) }));
}
