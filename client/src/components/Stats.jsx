import React from 'react';
import { RotateCcw } from 'lucide-react';

export default function Stats({ wpm, accuracy, mode, mistakes, reset }) {
  const items = [
    ['WPM', wpm, 'indigo'],
    ['ACCURACY', `${accuracy}%`, 'green'],
    ['MODE', mode.toUpperCase(), 'white'],
    ['MISTAKES', mistakes, 'red']
  ];

  return (
    <div className="stats-grid">
      {items.map(([label, value, color]) => (
        <div key={label} className="stat-card" data-testid={`stat-${label.toLowerCase()}`}>
          <span className="stat-label">{label}</span>
          <strong className={`stat-value ${color}`}>{value}</strong>
        </div>
      ))}

      <button
        className="stat-card reset-card"
        onClick={() => reset()}
        data-testid="reset-session-button"
        title="Reset practice text"
      >
        <RotateCcw size={18} />
        <span>RESET</span>
      </button>
    </div>
  );
}
