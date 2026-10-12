import React, { useRef, useEffect } from 'react';
import { Timer, Play } from 'lucide-react';

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
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          spellCheck="false"
          autoFocus
        />
      </div>

      <div className="typing-footer">
        <span>Telemetry: speed tracking is calculated per minute based on characters typed.</span>
        <span>Active key length: {text.length} chars</span>
      </div>

      {paused && (
        <div className="pause-overlay" data-testid="pause-overlay" onClick={resume}>
          <div className="pause-card" onClick={(e) => e.stopPropagation()}>
            <Timer size={28} style={{ color: '#818cf8', margin: '0 auto 8px' }} />
            <div className="eyebrow">SESSION PAUSED</div>
            <h3>Practice Paused</h3>
            <p>You have been inactive. Click or touch anywhere to resume typing.</p>
            <button
              className="primary-button"
              onClick={resume}
              data-testid="resume-button"
              style={{ margin: '0 auto' }}
            >
              <Play size={15} /> Resume
            </button>
          </div>
        </div>
      )}

      {!started && !paused && (
        <div className="start-hint">
          <kbd>Enter</kbd> or type to start session
        </div>
      )}
    </div>
  );
}
