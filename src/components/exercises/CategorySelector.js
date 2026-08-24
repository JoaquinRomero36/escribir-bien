import { useState } from 'react';
import { CATEGORIES, getExercisesByCategory } from '../../data/exercises';
import { ChevronRightIcon, LockIcon } from '../icons';

export function CategorySelector({ onSelect, onBack }) {
  const [hoveredId, setHoveredId] = useState(null);
  
  const handleCategoryClick = (category) => {
    const exercises = getExercisesByCategory(category.id);
    if (exercises.length > 0) {
      onSelect(category, exercises);
    }
  };
  
  return (
    <div className="category-selector-view">
      <header className="exercise-header">
        <button className="btn btn-ghost btn-sm" onClick={onBack} aria-label="Volver al inicio">
          <ChevronRightIcon className="icon-rotate-180" />
        </button>
        <h2 className="selector-title">Elige qué practicar</h2>
        <div style={{ width: '40px' }} />
      </header>
      
      <main className="selector-main">
        <div className="categories-grid">
          {CATEGORIES.map((category) => {
            const exercises = getExercisesByCategory(category.id);
            const available = exercises.length > 0;
            
            return (
              <article
                key={category.id}
                className={`category-card ${!available ? 'locked' : ''} ${hoveredId === category.id ? 'hovered' : ''}`}
                onMouseEnter={() => setHoveredId(category.id)}
                onMouseLeave={() => setHoveredId(null)}
                onClick={() => handleCategoryClick(category)}
                disabled={!available}
              >
                <div className="category-icon-wrapper" style={{ background: `${category.color}15`, borderColor: category.color }}>
                  <div className="category-icon" style={{ color: category.color }}>
                    {category.icon === 'ShuffleIcon' && (
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="16 3 21 3 21 8"></polyline>
                        <line x1="4" y1="20" x2="21" y2="3"></line>
                        <polyline points="21 16 21 21 16 21"></polyline>
                        <line x1="15" y1="15" x2="21" y2="21"></line>
                        <line x1="4" y1="4" x2="21" y2="21"></line>
                      </svg>
                    )}
                    {category.icon === 'LetterHIcon' && (
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="4" y1="12" x2="4" y2="20"></line>
                        <line x1="20" y1="12" x2="20" y2="20"></line>
                        <line x1="4" y1="4" x2="20" y2="4"></line>
                      </svg>
                    )}
                    {category.icon === 'LetterBIcon' && (
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="4" y1="4" x2="4" y2="20"></line>
                        <path d="M4 8c8 0 12-4 12-4v8c0 8-4 12-12 12"></path>
                      </svg>
                    )}
                    {category.icon === 'LetterYIcon' && (
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="8" y1="4" x2="12" y2="12"></line>
                        <line x1="16" y1="4" x2="12" y2="12"></line>
                        <line x1="12" y1="12" x2="12" y2="20"></line>
                      </svg>
                    )}
                    {category.icon === 'LetterCHIcon' && (
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M8 4a4 4 0 0 0-4 4v8a4 4 0 0 0 8 0V8a4 4 0 0 0-4-4z"></path>
                        <line x1="16" y1="4" x2="16" y2="20"></line>
                        <line x1="12" y1="12" x2="20" y2="12"></line>
                      </svg>
                    )}
                    {category.icon === 'LetterCIcon' && (
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M12 4a8 8 0 0 0-8 8v4a4 4 0 0 0 4 4h8"></path>
                      </svg>
                    )}
                    {category.icon === 'LetterEIcon' && (
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="4" y1="4" x2="20" y2="4"></line>
                        <line x1="4" y1="12" x2="16" y2="12"></line>
                        <line x1="4" y1="20" x2="20" y2="20"></line>
                      </svg>
                    )}
                    {category.icon === 'LetterSIcon' && (
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M4 12c0-4 4-8 8-8s8 4 8 8-4 8-8 8"></path>
                        <line x1="12" y1="4" x2="12" y2="20"></line>
                      </svg>
                    )}
                    {category.icon === 'AccentIcon' && (
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M18 4l-6 16-6-16"></path>
                        <line x1="8" y1="12" x2="16" y2="12"></line>
                      </svg>
                    )}
                    {category.icon === 'QuestionIcon' && (
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="10"></circle>
                        <line x1="12" y1="8" x2="12" y2="12"></line>
                        <line x1="12" y1="16" x2="12.01" y2="16"></line>
                      </svg>
                    )}
                  </div>
                  {!available && <LockIcon className="lock-icon" />}
                </div>
                <h3 className="category-name">{category.name}</h3>
                <p className="category-desc">{category.description}</p>
                <div className="category-meta">
                  <span className="exercise-count">{exercises.length} ejercicios</span>
                  {available && (
                    <ChevronRightIcon className="card-chevron" />
                  )}
                </div>
              </article>
            );
          })}
        </div>
      </main>
    </div>
  );
}