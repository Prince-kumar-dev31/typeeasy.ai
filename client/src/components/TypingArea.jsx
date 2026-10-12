import React, { useRef, useEffect } from 'react';
import { Timer, Play, Smartphone } from 'lucide-react';

export default function TypingArea({
  text,
  typed,
  onKey,
  paused,
  resume,
  started,
  isInputFocused,
  setIsInputFocused
}) {
  const inputRef = useRef(null);

  useEffect(() => {
    if (!paused) {
      inputRef.current?.focus();
    }
  }, [paused, text]);

  const handleShellClick = () => {
    if (paused) {
      resume();
    } else {
      inputRef.current?.focus();
    }
  };

  return (
    <div
      className="typing-shell"
      onClick={handleShellClick}
      data-testid="typing-area"
    >
      <div className="mobile-tap-hint" onClick={handleShellClick}>
        <Smartphone size={13} style={{ display: 'inline', marginRight: 5, verticalAlign: 'middle' }} />
        Tap anywhere to open mobile keyboard & start typing
      </div>

      <div className="typing-copy">
        {text.split('').map((char, i) => {
          let charClass = 'pending-char';
          if (i < typed.length) {
            charClass = typed[i] === char ? 'correct-char' : 'wrong-char';
          } else if (i === typed.length) {
            charClass = 'current-char';
          }

          let displayChar = char;
          if (char === ' ') {
            displayChar = '·';
          } else if (char === '\n') {
            displayChar = '↵\n';
          }

          return (
            <span key={`${char}-${i}`} className={charClass}>
              {displayChar}
            </span>
          );
        })}

        <input
          ref={inputRef}
          className="typing-input"
          value={typed}
          onChange={onKey}
          onKeyDown={onKey}
          onFocus={() => setIsInputFocused && setIsInputFocused(true)}
          onBlur={() => setIsInputFocused && setIsInputFocused(false)}
          aria-label="Typing practice input"
          data-testid="typing-input"
          inputMode="text"
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          spellCheck="false"
          enterKeyHint="go"
          autoFocus
        />
      </div>

      <div className="typing-footer">
        <span>Telemetry: live per-minute calculation.</span>
        <span>Active length: {text.length} chars</span>
      </div>

      {paused && (
        <div className="pause-overlay" data-testid="pause-overlay" onClick={resume}>
          <div className="pause-card" onClick={(e) => e.stopPropagation()}>
            <Timer size={26} style={{ color: '#818cf8', margin: '0 auto 6px' }} />
            <div className="eyebrow">SESSION PAUSED</div>
            <h3 style={{ margin: '6px 0' }}>Practice Paused</h3>
            <p style={{ margin: '0 0 14px', fontSize: 11 }}>You have been inactive. Tap anywhere to resume typing.</p>
            <button
              className="primary-button"
              onClick={resume}
              data-testid="resume-button"
              style={{ margin: '0 auto', padding: '10px 18px' }}
            >
              <Play size={15} /> Resume
            </button>
          </div>
        </div>
      )}

      {!started && !paused && (
        <div className="start-hint">
          <kbd>Enter</kbd> or type
        </div>
      )}
    </div>
  );
}
