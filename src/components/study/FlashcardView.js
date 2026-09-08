import { useState, useEffect, useCallback } from 'react';
import { getFlashcardsByCategory } from '../../data/exercises2';
import { useSound } from '../../hooks/useSound';
import { ChevronRightIcon, VolumeIcon, VolumeXIcon } from '../icons';

function shuffled(arr) {
  const pool = [...arr];
  for (let i = pool.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [pool[i], pool[j]] = [pool[j], pool[i]];
  }
  return pool;
}

export function FlashcardView({ category, onBack }) {
  const total = getFlashcardsByCategory(category.id).length;
  const [queue, setQueue] = useState(() => shuffled(getFlashcardsByCategory(category.id)));
  const [pos, setPos] = useState(0);
  const [mastered, setMastered] = useState(() => new Set());
  const [flipped, setFlipped] = useState(false);
  const { playClick, playComplete, toggleSound, soundEnabled } = useSound();

  const card = queue[pos];
  const done = !card;
  const masteredCount = mastered.size;
  const progress = total ? ((masteredCount / total) * 100) : 0;

  const handleBack = useCallback(() => onBack?.(), [onBack]);

  const handleKeyDown = useCallback((e) => {
    if (e.key === 'Escape') handleBack();
  }, [handleBack]);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  const flip = useCallback(() => {
    if (!done) {
      playClick();
      setFlipped(f => !f);
    }
  }, [done, playClick]);

  const handleKnow = useCallback(() => {
    playClick();
    setMastered(prev => new Set(prev).add(card.word));
    setFlipped(false);
    const nextPos = pos + 1;
    setPos(nextPos);
    if (nextPos >= queue.length) playComplete();
  }, [playClick, card.word, pos, queue.length, playComplete]);

  const handleAgain = useCallback(() => {
    playClick();
    setQueue(q => [...q, q[pos]]);
    setPos(p => p + 1);
    setFlipped(false);
  }, [pos, playClick]);

  const handleRestart = useCallback(() => {
    playClick();
    setQueue(shuffled(getFlashcardsByCategory(category.id)));
    setPos(0);
    setMastered(new Set());
    setFlipped(false);
  }, [category.id, playClick]);

  return (
    <div className="flashcard-view">
      <header className="exercise-header">
        <button className="btn btn-ghost btn-sm" onClick={handleBack} aria-label="Volver a categorías">
          <ChevronRightIcon className="icon-rotate-180" />
        </button>
        <div className="exercise-progress">
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${progress}%` }} />
          </div>
          <span className="progress-text">{masteredCount} / {total} fichas</span>
        </div>
        <button className={`btn btn-ghost btn-sm ${soundEnabled ? '' : 'muted'}`} onClick={toggleSound}>
          {soundEnabled ? <VolumeIcon /> : <VolumeXIcon />}
        </button>
      </header>

      <main className="flashcard-main">
        {!done ? (
          <>
            <div className="flashcard-stage">
              <button
                className={`flashcard ${flipped ? 'flipped' : ''}`}
                onClick={flip}
                aria-label={flipped ? 'Ver palabra' : 'Ver regla'}
              >
                <div className="flashcard-inner" aria-live="polite">
                  <div className="flashcard-face flashcard-front">
                    <span className="flashcard-label">{category.name}</span>
                    <span className="flashcard-word">{card.word}</span>
                    <span className="flashcard-hint">Tocá para ver la regla</span>
                  </div>
                  <div className="flashcard-face flashcard-back" aria-hidden={!flipped}>
                    <span className="flashcard-rule">{card.rule}</span>
                    <span className="flashcard-word-small">{card.word}</span>
                  </div>
                </div>
              </button>
            </div>

            <div className="flashcard-actions">
              <button className="btn btn-ghost btn-lg" onClick={handleAgain} disabled={!flipped}>
                Repasar más
              </button>
              <button className="btn btn-primary btn-lg" onClick={handleKnow} disabled={!flipped}>
                La sé
              </button>
            </div>
            {!flipped && (
              <p className="flashcard-tip">Pensá cómo se escribe antes de girar la tarjeta</p>
            )}
          </>
        ) : (
          <div className="flashcard-done glass-card">
            <h2 className="results-title">¡Fichas completadas!</h2>
            <p className="flashcard-done-text">
              Repasaste las {total} palabras de <strong>{category.name}</strong>.
            </p>
            <div className="results-actions">
              <button className="btn btn-primary" onClick={handleRestart}>Otra vuelta</button>
              <button className="btn btn-secondary" onClick={handleBack}>Volver a categorías</button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
