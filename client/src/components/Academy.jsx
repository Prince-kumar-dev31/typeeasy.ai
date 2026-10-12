import React, { useState } from 'react';
import { Play, Check, BookOpen, Lock } from 'lucide-react';
import { academyLevels } from '../data/lessons';
import TutorialModal from './TutorialModal';

export default function Academy({ progress, onSelectLevel, setPage }) {
  const [showTutorials, setShowTutorials] = useState(false);

  return (
    <main className="content academy-page">
      <div className="page-intro">
        <div>
          <div className="eyebrow">THE TRAINING FLOOR</div>
          <h1>Build developer-grade muscle memory.</h1>
          <p className="muted">
            Thirty focused levels, unlocked by accuracy — not speed. Select any unlocked level to train.
          </p>
        </div>

        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
          <button
            className="secondary-button"
            onClick={() => setShowTutorials(true)}
            data-testid="tutorials-button"
          >
            <BookOpen size={15} /> Tutorials & Posture
          </button>

          <button
            className="primary-button"
            onClick={() => setPage('practice')}
            data-testid="academy-practice-button"
          >
            <Play size={15} /> Continue practice
          </button>
        </div>
      </div>

      <div className="academy-progress">
        <span>PROGRESS</span>
        <strong>{progress}/30 levels</strong>
        <div className="progress-track">
          <i style={{ width: `${Math.min(100, (progress / 30) * 100)}%` }} />
        </div>
      </div>

      <div className="level-grid">
        {academyLevels.map((lvl) => {
          const isComplete = lvl.id <= progress;
          const isCurrent = lvl.id === progress + 1;
          const isLocked = lvl.id > progress + 1;

          let statusClass = 'locked';
          if (isComplete) statusClass = 'complete';
          else if (isCurrent) statusClass = 'current';

          return (
            <div
              key={lvl.id}
              className={`level-card ${statusClass}`}
              onClick={() => {
                if (!isLocked) {
                  onSelectLevel(lvl);
                }
              }}
              data-testid={`academy-level-${lvl.id}`}
              title={isLocked ? `Complete Level ${lvl.id - 1} with ≥ 90% accuracy to unlock` : `Click to practice Level ${lvl.id}`}
            >
              <div className="level-number">
                {isComplete ? <Check size={16} /> : isLocked ? <Lock size={14} /> : lvl.id}
              </div>

              <div>
                <strong>
                  {lvl.id}. {lvl.name}
                </strong>
                <small>
                  {isComplete
                    ? 'Completed ✓'
                    : isCurrent
                    ? 'Ready to unlock'
                    : 'Accuracy ≥ 90% required'}
                </small>
              </div>

              {isLocked && <span>LOCKED</span>}
            </div>
          );
        })}
      </div>

      {showTutorials && <TutorialModal onClose={() => setShowTutorials(false)} />}
    </main>
  );
}
