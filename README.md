# Escribir Bien

Entrenamiento de ortografía para español de LATAM: ejercicios de opción múltiple,
flashcards y feedback instantáneo. Corrección por categoría (H, B/V, Y/LL, S/Z, CH/X,
ci/si, ce/se, tildes, palabras ambiguas y textos).

## Comandos

- `npm start` — servidor de desarrollo en `http://localhost:3000`
- `npm run build` — build de producción en `build/`
- `npm test` — tests (jest + react-testing-library)
- `npm run lint` — ESLint

## Deploy

Publicado con GitHub Pages (branch `master`) vía el workflow
`.github/workflows/deploy.yml`. Si lo cambiás, ajustá `"homepage"` en `package.json`.

## Estructura

```
src/
├── App.js                       # Landing, state machine y vistas
├── styles/globals.css           # Design tokens (colores, radius, spacing, motion)
├── context/ThemeContext.js      # Tema claro/oscuro + localStorage
├── data/                        # ejercicios por categoría (MC + flashcards)
├── components/
│   ├── Logo.js                  # Logo (pluma + check) usado en header y hero
│   ├── icons/index.js           # Iconos SVG inline
│   ├── exercises/               # ExerciseView, CategorySelector
│   └── study/                   # FlashcardView
└── hooks/useSound.js            # Feedback sonoro (Web Audio + localStorage)
```

## Convenciones

- Estilos solo con tokens de `globals.css`; agregar tokens siempre en `:root` y `.dark`.
- Sin librerías externas de UI. Iconos SVG inline en `components/icons/index.js`.
- Las opciones de cada ejercicio son SIEMPRE malas escrituras de la misma palabra.