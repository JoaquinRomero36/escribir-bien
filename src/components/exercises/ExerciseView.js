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
  const inputRef = useRef(null);
  const { playCorrect, playError, playComplete, playClick, toggleSound, soundEnabled } = useSound();
  
  const exercise = exercises[currentIndex];
  const progress = ((currentIndex) / exercises.length) * 100;
  const isLast = currentIndex === exercises.length - 1;
  
  useEffect(() => {
    inputRef.current?.focus();
  }, [currentIndex, showResult]);
  
  const normalizeText = useCallback((text, { stripAccents, isSentence }) => {
    let t = text.trim().toLowerCase();
    if (stripAccents) {
      t = t.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    }
    t = t.replace(/\s+/g, ' ');
    if (isSentence) {
      t = t.replace(/[.,;:!?¡¿"']+$/g, '');
    }
    return t;
  }, []);

  const handleSubmit = useCallback((e) => {
    e?.preventDefault();
    if (showResult || !answer.trim()) return;

    const strictAccents = category.id === 'acentos';
    const isSentence = exercise.type === 'correct_sentence';
    const userAnswer = normalizeText(answer, { stripAccents: !strictAccents, isSentence });
    const correctAnswer = normalizeText(exercise.answer, { stripAccents: !strictAccents, isSentence });
    const correct = userAnswer === correctAnswer;
    
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
  }, [answer, exercise, category, showResult, normalizeText, playCorrect, playError]);
  
  const handleNext = useCallback(() => {
    playClick();
    if (isLast) {
      playComplete();
      setTimeout(() => onComplete?.({ correct: score.correct, total: score.total, streak }), 500);
    } else {
      setCurrentIndex(i => i + 1);
      setAnswer('');
      setShowResult(false);
    }
  }, [isLast, score, streak, playClick, playComplete, onComplete]);
  
  const handleKeyDown = useCallback((e) => {
    if (e.key === 'Enter' && !showResult) handleSubmit(e);
    if (e.key === 'Enter' && showResult) handleNext();
    if (e.key === 'Escape') onBack?.();
  }, [showResult, handleSubmit, handleNext, onBack]);
  
  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);
  
  const renderFillBlank = () => (
    <div className="exercise-fill-blank">
      <p className="exercise-sentence">
        {exercise.question.split('___').map((part, i) => (
          <span key={i}>
            {part}
            {i < exercise.question.split('___').length - 1 && (
              <input
                ref={inputRef}
                type="text"
                className={`exercise-input ${showResult ? (isCorrect ? 'correct' : 'incorrect') : ''}`}
                value={answer}
                onChange={e => setAnswer(e.target.value)}
                disabled={showResult}
                autoComplete="off"
                spellCheck="false"
                placeholder="..."
                aria-label="Completa la palabra"
              />
            )}
          </span>
        ))}
      </p>
    </div>
  );
  
  const renderMultipleChoice = () => (
    <div className="exercise-multiple-choice">
      <p className="exercise-question">{exercise.question}</p>
      <div className="options-grid">
        {exercise.options?.map((opt, i) => (
          <button
            key={i}
            className={`option-btn ${showResult ? (
              opt === exercise.answer ? 'correct' : opt === answer ? 'incorrect' : ''
            ) : ''}`}
            onClick={() => !showResult && setAnswer(opt)}
            disabled={showResult}
          >
            {opt}
          </button>
        ))}
      </div>
    </div>
  );
  
  const renderCorrectSentence = () => (
    <div className="exercise-correct-sentence">
      <p className="exercise-question">{exercise.question}</p>
      <textarea
        ref={inputRef}
        className={`exercise-textarea ${showResult ? (isCorrect ? 'correct' : 'incorrect') : ''}`}
        value={answer}
        onChange={e => setAnswer(e.target.value)}
        disabled={showResult}
        placeholder="Escribe la frase corregida..."
        rows={3}
        spellCheck="false"
      />
    </div>
  );
  
  const renderExercise = () => {
    switch (exercise.type) {
      case 'multiple_choice': return renderMultipleChoice();
      case 'correct_sentence': return renderCorrectSentence();
      default: return renderFillBlank();
    }
  };
  
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
        <button className={`btn btn-ghost btn-sm ${soundEnabled ? '' : 'muted'}`} onClick={toggleSound}>
          {soundEnabled ? <VolumeIcon /> : <VolumeXIcon />}
        </button>
      </header>
      
      <main className="exercise-main">
        <div className="exercise-card">
          <div className="exercise-category-badge">{category.name}</div>
          {renderExercise()}
          
          {showResult && (
            <div className="exercise-result">
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
            </div>
          )}
        </div>
        
        <div className="exercise-stats">
          <div className="stat-item">
            <span className="stat-value">{score.correct}</span>
            <span className="stat-label">Aciertos</span>
          </div>
          <div className="stat-item">
            <span className="stat-value">{streak}</span>
            <span className="stat-label">Racha</span>
          </div>
          <div className="stat-item">
            <span className="stat-value">{exercises.length - currentIndex - 1}</span>
            <span className="stat-label">Restantes</span>
          </div>
        </div>
      </main>
      
      <footer className="exercise-footer">
        <button 
          className={`btn btn-primary btn-lg ${!showResult && !answer.trim() ? 'disabled' : ''}`}
          onClick={showResult ? handleNext : handleSubmit}
          disabled={!showResult && !answer.trim()}
        >
          {showResult ? (isLast ? 'Ver resultados' : 'Siguiente') : 'Comprobar'}
          <ChevronRightIcon />
        </button>
      </footer>
    </div>
  );
}