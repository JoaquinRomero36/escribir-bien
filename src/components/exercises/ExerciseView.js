import { useState, useEffect, useCallback, useRef } from 'react';
import { useSound } from '../../hooks/useSound';
import { CheckIcon, XIcon, ChevronRightIcon, VolumeIcon, VolumeXIcon } from '../icons';

export function ExerciseView({ category, exercises, onComplete, onBack }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answer, setAnswer] = useState('');
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [streak, setStreak] = useState(0);
  const [score, setScore] = useState({ correct: 0, total: 0 });
  const autoTimerRef = useRef(null);
  const completeTimerRef = useRef(null);
  const { playCorrect, playError, playComplete, playClick, toggleSound, soundEnabled } = useSound();

  const exercise = exercises[currentIndex];
  const progress = ((currentIndex) / exercises.length) * 100;
  const isLast = currentIndex === exercises.length - 1;

  useEffect(() => () => {
    if (autoTimerRef.current) clearTimeout(autoTimerRef.current);
    if (completeTimerRef.current) clearTimeout(completeTimerRef.current);
  }, []);

  const clearAutoAdvance = useCallback(() => {
    if (autoTimerRef.current) {
      clearTimeout(autoTimerRef.current);
      autoTimerRef.current = null;
    }
  }, []);

  const registerResult = useCallback((correct) => {
    setIsCorrect(correct);
    setShowResult(true);
    if (correct) {
      playCorrect();
      setStreak(s => s + 1);
      setScore(s => ({ correct: s.correct + 1, total: s.total + 1 }));
    } else {
      playError();
      setStreak(0);
      setScore(s => ({ correct: s.correct, total: s.total + 1 }));
    }
  }, [playCorrect, playError]);

  const handleNext = useCallback(() => {
    clearAutoAdvance();
    playClick();
    if (isLast) {
      playComplete();
      completeTimerRef.current = setTimeout(() => onComplete?.({ correct: score.correct, total: score.total, streak }), 500);
    } else {
      setCurrentIndex(i => i + 1);
      setAnswer('');
      setShowResult(false);
    }
  }, [isLast, score, streak, playClick, playComplete, onComplete, clearAutoAdvance]);

  const goNextRef = useRef(handleNext);
  useEffect(() => { goNextRef.current = handleNext; });

  const scheduleAutoAdvance = useCallback((correct) => {
    clearAutoAdvance();
    if (!correct) return;
    autoTimerRef.current = setTimeout(() => goNextRef.current(), 1200);
  }, [clearAutoAdvance]);

  const respondWith = useCallback((opt) => {
    if (showResult) return;
    setAnswer(opt);
    const strictAccents = category.id === 'acentos' || category.id === 'textos';
    const stripAccents = !strictAccents;
    let userVal = opt.trim().toLowerCase();
    let expectedVal = exercise.answer.trim().toLowerCase();
    if (stripAccents) {
      userVal = userVal.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
      expectedVal = expectedVal.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    }
    const correct = userVal === expectedVal;
    registerResult(correct);
    scheduleAutoAdvance(correct);
  }, [showResult, exercise, category, registerResult, scheduleAutoAdvance]);

  const handleKeyDown = useCallback((e) => {
    if (e.key === 'Enter' && showResult) {
      e.preventDefault();
      handleNext();
    }
    if (e.key === 'Escape') onBack?.();
  }, [showResult, handleNext, onBack]);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  return (
    <div className="exercise-view">
      <header className="exercise-header">
        <button className="btn btn-ghost btn-sm" onClick={onBack} aria-label="Volver a categorías">
          <ChevronRightIcon className="icon-rotate-180" />
        </button>
        <div className="exercise-progress">
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${progress}%` }} />
          </div>
          <span className="progress-text">{currentIndex + 1} / {exercises.length}</span>
        </div>
        <div className="header-stats" aria-label="Progreso de la sesión">
          <span className="stat-chip"><b>{score.correct}</b> aciertos</span>
          <span className={`stat-chip ${streak >= 3 ? 'hot' : ''}`}><b>{streak}</b> racha</span>
        </div>
        <button className={`btn btn-ghost btn-sm ${soundEnabled ? '' : 'muted'}`} onClick={toggleSound}>
          {soundEnabled ? <VolumeIcon /> : <VolumeXIcon />}
        </button>
      </header>

      <main className="exercise-main">
        <div className={`exercise-card ${showResult && isCorrect ? 'flash-correct' : ''}`}>
          <div className="exercise-category-badge">{category.name}</div>

          <div className="exercise-multiple-choice">
            <p className="exercise-question">{exercise.question}</p>
            <div className="options-grid">
              {exercise.options?.map((opt, i) => (
                <button
                  key={i}
                  className={`option-btn ${showResult ? (
                    opt === exercise.answer ? 'correct' : opt === answer ? 'incorrect' : ''
                  ) : ''} ${showResult && isCorrect ? 'auto-advancing' : ''}`}
                  onClick={() => respondWith(opt)}
                  disabled={showResult}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>

          {showResult && (
            <div className={`exercise-result ${showResult && isCorrect && !isLast ? 'auto-advancing' : ''}`} role="status" aria-live="polite">
              <div className={`result-icon ${isCorrect ? 'success' : 'error'}`}>
                {isCorrect ? <CheckIcon /> : <XIcon />}
              </div>
              <p className="result-text">
                {isCorrect ? '¡Correcto!' : 'Incorrecto'}
              </p>
              {!isCorrect && (
                <p className="correct-answer">
                  Respuesta: <strong>{exercise.answer}</strong>
                </p>
              )}
              {exercise.explanation && (
                <p className="explanation">{exercise.explanation}</p>
              )}
              {isCorrect && !isLast && <div className="auto-advance-bar" aria-hidden="true" />}
            </div>
          )}
        </div>
      </main>

      {showResult && !isCorrect && (
        <footer className="exercise-footer">
          <button
            className="btn btn-primary btn-lg"
            onClick={handleNext}
          >
            {isLast ? 'Ver resultados' : 'Siguiente'}
            <ChevronRightIcon />
          </button>
        </footer>
      )}
    </div>
  );
}
