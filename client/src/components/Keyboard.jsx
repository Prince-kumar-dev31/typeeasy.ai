import React from 'react';
import { fingerColors, fingerMap, keyRows } from '../data/keyMap';

export default function Keyboard({ nextKey, pressed, mistakeKey }) {
  const normalizedNextKey = nextKey === '\n' ? 'Enter' : nextKey.toLowerCase();

  const renderKey = (key, ri, i) => {
    const isSpace = key === ' ';
    const display = isSpace ? 'Space' : key;
    const lookupKey = isSpace ? ' ' : key.toLowerCase();
    const zone = fingerMap[lookupKey] || 'Thumbs';
    const fingerColor = fingerColors[zone] || '#64748b';

    let isActive = false;
    if (isSpace && nextKey === ' ') {
      isActive = true;
    } else if (key === 'Enter' && (nextKey === '\n' || nextKey === 'Enter')) {
      isActive = true;
    } else if (!isSpace && key.toLowerCase() === normalizedNextKey) {
      isActive = true;
    }

    const isPressed = pressed && (
      (isSpace && pressed === ' ') ||
      (!isSpace && pressed.toLowerCase() === key.toLowerCase())
    );

    const isMistake = mistakeKey && (
      (isSpace && mistakeKey === ' ') ||
      (!isSpace && mistakeKey.toLowerCase() === key.toLowerCase())
    );

    let keyClass = 'letter';
    if (isSpace) {
      keyClass = 'space';
    } else if (key.length > 1) {
      keyClass = key.toLowerCase();
    }

    const isHomeBump = key.toLowerCase() === 'f' || key.toLowerCase() === 'j';

    return (
      <button
        key={`${ri}-${i}-${key}`}
        className={`key key-${keyClass} ${isActive ? 'next-key' : ''} ${isPressed ? 'pressed-key' : ''} ${isMistake ? 'mistake-flash' : ''}`}
        style={{ '--finger': fingerColor }}
        data-testid={`keyboard-key-${display.toLowerCase().replace(/\s+/g, 'space')}`}
        tabIndex={-1}
      >
        {display}
        {isHomeBump && <i className="home-bump" />}
      </button>
    );
  };

  return (
    <div className="keyboard-wrap" data-testid="on-screen-keyboard">
      <div className="keyboard">
        {keyRows.map((row, ri) => (
          <div key={ri} className="key-row">
            {row.map((k, i) => renderKey(k, ri, i))}
          </div>
        ))}

        <div className="legend">
          {Object.entries(fingerColors).map(([name, color]) => (
            <span key={name}>
              <i style={{ background: color }} />
              {name}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
