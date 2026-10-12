import React, { useEffect } from 'react';
import { Flame, RotateCcw, ArrowRight, CheckCircle2, AlertTriangle } from 'lucide-react';

export default function Result({ result, retry, next }) {
  const isPassed = result.accuracy >= 90;

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        if (isPassed) {
          next();
        } else {
          retry();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isPassed, next, retry]);

  return (
    <div className="result-screen" data-testid="result-screen">
      <div className="result-kicker">
        <Flame size={16} /> SESSION COMPLETE
      </div>

      <h1>
        {isPassed ? 'Good work. Keep the signal.' : 'Accuracy needs focus. Try again.'}
      </h1>

      <p className="muted">
        {isPassed
          ? 'Accuracy ≥ 90% unlocked your next milestone. Solid muscle memory compounds.'
          : 'Aim for ≥ 90% accuracy before pushing for high raw speed.'}
      </p>

      <div className="result-metrics">
        <div>
          <strong>{result.wpm}</strong>
          <span>WPM</span>
        </div>
        <div>
          <strong style={{ color: isPassed ? '#6ee7b7' : '#fb7185' }}>
            {result.accuracy}%
          </strong>
          <span>ACCURACY</span>
        </div>
        <div>
          <strong style={{ color: result.mistakes > 0 ? '#fb7185' : '#6ee7b7' }}>
            {result.mistakes}
          </strong>
          <span>MISTAKES</span>
        </div>
        <div>
          <strong>{result.time}s</strong>
          <span>TIME</span>
        </div>
      </div>

      {result.weakestKeys && result.weakestKeys.length > 0 && (
        <div className="result-weak-keys">
          Keys that caused hesitation or slips:{' '}
          {result.weakestKeys.map((k) => (
            <b key={k}>{k === ' ' ? 'SPACE' : k}</b>
          ))}
        </div>
      )}

      <div className="result-actions">
        <button
          className="secondary-button"
          onClick={retry}
          data-testid="retry-session-button"
        >
          <RotateCcw size={15} /> Retry {!isPassed && <kbd style={{ marginLeft: 6, fontSize: 10, background: '#253450', padding: '1px 5px', borderRadius: 4 }}>Enter</kbd>}
        </button>

        <button
          className="primary-button"
          onClick={next}
          data-testid="next-session-button"
        >
          Next lesson <ArrowRight size={15} /> {isPassed && <kbd style={{ marginLeft: 6, fontSize: 10, background: '#4338ca', padding: '1px 5px', borderRadius: 4 }}>Enter</kbd>}
        </button>
      </div>
    </div>
  );
}
