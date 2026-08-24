import { useState, useCallback, useEffect } from 'react';
import './styles/globals.css';
import './App.css';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import { ExerciseView } from './components/exercises/ExerciseView';
import { CategorySelector } from './components/exercises/CategorySelector';
import { InteractiveLetters } from './components/InteractiveLetters';
import {
  TargetIcon,
  CardsIcon,
  PenIcon,
  VolumeIcon,
  SlidersIcon,
  ChartIcon,
  CheckIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  SunIcon,
  MoonIcon,
} from './components/icons';

/* ==================== ICON COMPONENTS ==================== */

function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      className="theme-toggle"
      onClick={toggleTheme}
      aria-label={theme === 'light' ? 'Cambiar a modo oscuro' : 'Cambiar a modo claro'}
      title={theme === 'light' ? 'Modo oscuro' : 'Modo claro'}
    >
      {theme === 'light' ? <MoonIcon /> : <SunIcon />}
    </button>
  );
}

/* ==================== HEADER ==================== */

function Header() {
  return (
    <header className="header">
      <div className="container header-content">
        <h1 className="logo">Escribir Bien</h1>
        <ThemeToggle />
      </div>
    </header>
  );
}

/* ==================== HERO VISUAL: DEMO INTERACTIVO ==================== */

const DEMO_EXERCISES = [
  {
    id: 1,
    before: 'Voy a ',
    error: 'hacer',
    after: ' el trabajo',
    correction: 'hacer',
    tip: 'Infinitivo, no gerundio',
  },
  {
    id: 2,
    before: 'Te ',
    error: 'llame',
    after: ' mañana',
    correction: 'llamaré',
    tip: 'Futuro simple: llamaré',
  },
  {
    id: 3,
    before: 'A ',
    error: 'ver',
    after: ' si vienes',
    correction: 'a ver',
    tip: 'Expresión fija: "a ver"',
  },
];

function HeroVisual() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showCorrection, setShowCorrection] = useState(false);

  const exercise = DEMO_EXERCISES[currentIndex];

  const goNext = useCallback(() => {
    setShowCorrection(false);
    setCurrentIndex((prev) => (prev + 1) % DEMO_EXERCISES.length);
  }, []);

  const goPrev = useCallback(() => {
    setShowCorrection(false);
    setCurrentIndex((prev) => (prev - 1 + DEMO_EXERCISES.length) % DEMO_EXERCISES.length);
  }, []);

  const handleErrorClick = useCallback(() => {
    setShowCorrection(true);
  }, []);

  useEffect(() => {
    const timer = setInterval(goNext, 4000);
    return () => clearInterval(timer);
  }, [goNext]);

  return (
    <div className="demo-card" role="region" aria-label="Ejemplo interactivo de corrección">
      <div className="demo-header">
        <span>Ejercicio en vivo</span>
        <div className="demo-dots" aria-hidden="true">
          {DEMO_EXERCISES.map((_, i) => (
            <span
              key={i}
              className={`demo-dot ${i === currentIndex ? 'active' : ''}`}
            />
          ))}
        </div>
      </div>

      <div className="demo-screen">
        <div className="demo-line">
          <span className="demo-text">{exercise.before}</span>
          <span
            className="demo-error"
            data-tip={exercise.tip}
            onClick={handleErrorClick}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === 'Enter' && handleErrorClick()}
            aria-label={`Error: ${exercise.error}. Pista: ${exercise.tip}`}
          >
            {exercise.error}
          </span>
          <span className="demo-text">{exercise.after}</span>
        </div>

        {showCorrection && (
          <div className="demo-line" style={{ animationDelay: '0ms' }}>
            <span className="demo-correction">
              <CheckIcon className="check-icon" aria-hidden="true" />
              <span>{exercise.correction}</span>
              <span style={{ fontSize: '0.75rem', opacity: 0.7, fontWeight: 400 }}>
                — {exercise.tip}
              </span>
            </span>
          </div>
        )}
      </div>

      <div className="demo-controls">
        <button
          className="demo-btn"
          onClick={goPrev}
          aria-label="Ejercicio anterior"
          disabled={false}
        >
          <ChevronLeftIcon />
        </button>
        <span className="demo-counter">
          {currentIndex + 1} / {DEMO_EXERCISES.length}
        </span>
        <button
          className="demo-btn"
          onClick={goNext}
          aria-label="Siguiente ejercicio"
          disabled={false}
        >
          <ChevronRightIcon />
        </button>
      </div>
    </div>
  );
}

/* ==================== FEATURE CARD COMPONENT ==================== */

function FeatureCard({ icon: Icon, title, description, highlight = false }) {
  return (
    <article className={`feature-card ${highlight ? 'highlight' : ''}`}>
      <div className="feature-icon">
        <Icon aria-hidden="true" />
      </div>
      <h4>{title}</h4>
      <p>{description}</p>
    </article>
  );
}

/* ==================== LANDING PAGE ==================== */

function LandingPage({ onStart }) {
  const { theme } = useTheme();

  const letterColors =
    theme === 'dark'
      ? [
          'rgba(148, 163, 184, 0.16)',
          'rgba(148, 163, 184, 0.22)',
          'rgba(148, 163, 184, 0.14)',
          'rgba(175, 243, 62, 0.75)',
          'rgba(175, 243, 62, 0.45)',
        ]
      : [
          'rgba(100, 116, 139, 0.15)',
          'rgba(100, 116, 139, 0.22)',
          'rgba(100, 116, 139, 0.12)',
          'rgba(101, 163, 13, 0.65)',
          'rgba(101, 163, 13, 0.4)',
        ];

  return (
    <div className="app">
      <InteractiveLetters colors={letterColors} />
      <Header />

      <main className="main">
        {/* HERO */}
        <section className="hero" aria-labelledby="hero-title">
          <div className="container hero-content">
            <div className="hero-text">
              <span className="badge">Tu ortografía habla por ti</span>
              <h2 id="hero-title" className="hero-title">
                Escribe sin dudar. Gana el respeto que mereces.
              </h2>
              <p className="hero-subtitle">
                El 73% de profesionales latinos duda al escribir. Tú no tienes
                por qué ser uno de ellos. Según OCC Mundial 2024, 7 de 10
                reclutadores rechazan CVs con faltas de ortografía.
              </p>
              <div className="hero-stats">
                <div className="stat">
                  <span className="stat-number">7 de 10</span>
                  <span className="stat-label">CVs rechazados por faltas</span>
                </div>
                <div className="stat">
                  <span className="stat-number">5 min</span>
                  <span className="stat-label">Al día para mejorar</span>
                </div>
              </div>
            </div>

            <div className="hero-visual">
              <HeroVisual />
            </div>
          </div>
        </section>

        {/* SOLUTION / FEATURES */}
        <section className="solution" aria-labelledby="solution-title">
          <div className="container">
            <div className="section-header">
              <span className="section-badge">Cómo funciona</span>
              <h3 id="solution-title" className="section-title">
                Entrenamiento que se adapta a ti, no al revés
              </h3>
            </div>

            <div className="features-grid">
              <FeatureCard
                icon={TargetIcon}
                title="Empiezas donde estás"
                description="Avanzas cuando estás listo. Sin frustración, sin saltos vacíos."
              />
              <FeatureCard
                icon={CardsIcon}
                title="Las palabras que se te escapan, vuelven"
                description="Repetición espaciada: solo practicas lo que aún no dominas."
              />
              <FeatureCard
                icon={PenIcon}
                title="Frases reales. Errores reales. Corrección que entiendes."
                description="Completa oraciones con contexto. Tu cerebro aprende el patrón, no la regla abstracta."
              />
              <FeatureCard
                icon={VolumeIcon}
                title="Un sonido al acertar. Una vibración al fallar."
                description="Tu cerebro asocia: escribir bien = satisfacción inmediata. Dopamina real, no trucos."
              />
              <FeatureCard
                icon={SlidersIcon}
                title="Solo lo que necesitas hoy"
                description="Solo tildes. Solo B/V. Solo lo que necesitas. Configuras tú, no el algoritmo."
                highlight
              />
              <FeatureCard
                icon={ChartIcon}
                title="Tu racha de 14 días. Tu 94% en tildes. Tu progreso, visible."
                description="Rachas diarias, precisión por categoría, evolución semanal. Lo que se ve, mejora."
              />
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="cta" aria-labelledby="cta-title">
          <div className="container cta-content">
            <h3 id="cta-title">5 minutos hoy. Escribir mejor mañana.</h3>
            <p>Gratis. Sin cuentas. Sin ruido. Solo práctica.</p>
            <button className="btn btn-primary btn-lg" id="start-btn" onClick={onStart}>
              Empezar mi racha
            </button>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="container">
          <p>Escribir Bien — Ortografía para LATAM.</p>
        </div>
      </footer>
    </div>
  );
}

/* ==================== RESULTS VIEW ==================== */

function ResultsView({ result, onRetry, onHome }) {
  const percentage = result.total > 0 ? Math.round((result.correct / result.total) * 100) : 0;
  
  return (
    <div className="app">
      <Header />

      <main className="main" style={{ paddingTop: '120px', paddingBottom: 'var(--space-9)' }}>
        <div className="container" style={{ maxWidth: '520px', textAlign: 'center' }}>
          <div className="result-card" style={{
            background: 'var(--card)',
            border: '1px solid var(--border)',
            borderRadius: 'var(--radius-xl)',
            padding: 'var(--space-8)',
            boxShadow: 'var(--shadow-level-3)',
            animation: 'popIn 0.5s var(--motion-bounce)'
          }}>
            <div className="result-icon success" style={{
              width: '80px', height: '80px', margin: '0 auto var(--space-4)',
              background: 'linear-gradient(135deg, var(--chart-3), var(--primary))'
            }}>
              <CheckIcon className="icon-lg" />
            </div>
            
            <h2 style={{ fontSize: 'clamp(1.75rem, 4vw, 2.5rem)', fontWeight: '800', margin: '0 0 var(--space-2)', color: 'var(--foreground)' }}>
              ¡Sesión completada!
            </h2>
            
            <p style={{ fontSize: '1.125rem', color: 'var(--muted-foreground)', margin: '0 0 var(--space-6)' }}>
              Has terminado {result.total} ejercicios
            </p>
            
            <div style={{
              display: 'flex', justifyContent: 'center', gap: 'var(--space-6)',
              marginBottom: 'var(--space-6)', flexWrap: 'wrap'
            }}>
              <div className="stat-item">
                <span className="stat-value" style={{ fontSize: '2.5rem', color: 'var(--primary)' }}>{result.correct}</span>
                <span className="stat-label">Aciertos</span>
              </div>
              <div className="stat-item">
                <span className="stat-value" style={{ fontSize: '2.5rem', color: 'var(--chart-3)' }}>{percentage}%</span>
                <span className="stat-label">Precisión</span>
              </div>
              <div className="stat-item">
                <span className="stat-value" style={{ fontSize: '2.5rem', color: 'var(--accent-foreground)' }}>{result.streak}</span>
                <span className="stat-label">Mejor racha</span>
              </div>
            </div>
            
            <div style={{ display: 'flex', gap: 'var(--space-3)', justifyContent: 'center', flexWrap: 'wrap' }}>
              <button className="btn btn-primary btn-lg" onClick={onRetry}>
                Repetir categoría
              </button>
              <button className="btn btn-ghost btn-lg" onClick={onHome}>
                Elegir otra
              </button>
            </div>
          </div>
        </div>
      </main>

      <footer className="footer">
        <div className="container">
          <p>Escribir Bien — Ortografía para LATAM.</p>
        </div>
      </footer>
    </div>
  );
}

/* ==================== MAIN APP WITH STATE MACHINE ==================== */

function AppContent() {
  const [view, setView] = useState('landing'); // 'landing' | 'categories' | 'exercise' | 'results'
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [exercises, setExercises] = useState([]);
  const [exerciseResult, setExerciseResult] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [view]);

  const handleStart = useCallback(() => {
    setView('categories');
  }, []);

  const handleCategorySelect = useCallback((category, categoryExercises) => {
    setSelectedCategory(category);
    setExercises(categoryExercises);
    setView('exercise');
  }, []);

  const handleExerciseComplete = useCallback((result) => {
    setExerciseResult(result);
    setView('results');
  }, []);

  const handleRetry = useCallback(() => {
    setView('exercise');
    setExerciseResult(null);
  }, []);

  const handleHome = useCallback(() => {
    setView('categories');
    setSelectedCategory(null);
    setExercises([]);
    setExerciseResult(null);
  }, []);

  const handleBackFromCategories = useCallback(() => {
    setView('landing');
  }, []);

  const handleBackFromExercise = useCallback(() => {
    setView('categories');
    setSelectedCategory(null);
    setExercises([]);
  }, []);

  switch (view) {
    case 'categories':
      return (
        <CategorySelector
          onSelect={handleCategorySelect}
          onBack={handleBackFromCategories}
        />
      );
    case 'exercise':
      return (
        <ExerciseView
          category={selectedCategory}
          exercises={exercises}
          onComplete={handleExerciseComplete}
          onBack={handleBackFromExercise}
        />
      );
    case 'results':
      return (
        <ResultsView
          result={exerciseResult}
          onRetry={handleRetry}
          onHome={handleHome}
        />
      );
    default:
      return <LandingPage onStart={handleStart} />;
  }
}

/* ==================== APP WRAPPER ==================== */

function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

export default App;