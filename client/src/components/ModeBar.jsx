import React from 'react';

export default function ModeBar({ mode, setMode, reset, modeList }) {
  return (
    <div className="mode-bar" data-testid="mode-selector">
      <span className="eyebrow">MODE:</span>
      {modeList.map((name) => (
        <button
          key={name}
          className={mode === name ? 'mode-pill active' : 'mode-pill'}
          onClick={() => {
            setMode(name);
            reset(name);
          }}
          data-testid={`mode-${name.toLowerCase()}-button`}
        >
          {name}
        </button>
      ))}
    </div>
  );
}
