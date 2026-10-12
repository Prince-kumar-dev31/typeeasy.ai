import React from 'react';
import { X, SlidersHorizontal, Volume2, Eye, Keyboard as KeyboardIcon } from 'lucide-react';

export default function SettingsModal({
  onClose,
  sound,
  setSound,
  showHands,
  setShowHands,
  showKeyboard,
  setShowKeyboard
}) {
  return (
    <div className="modal-backdrop" onClick={onClose} data-testid="settings-modal-backdrop">
      <div className="settings-modal" onClick={(e) => e.stopPropagation()}>
        <button
          className="icon-button modal-close"
          onClick={onClose}
          data-testid="settings-close-button"
        >
          <X size={18} />
        </button>

        <div className="eyebrow">PREFERENCES</div>
        <h2>Typing Settings</h2>
        <p className="muted" style={{ marginBottom: 20 }}>
          Customize audio feedback, 3D hand visualizers, and on-screen keyboard components.
        </p>

        <div className="settings-row">
          <div>
            <div className="settings-label">Keystroke Switch Audio</div>
            <div className="settings-desc">Crisp mechanical switch click on each keypress</div>
          </div>
          <div
            className={`toggle-switch ${sound ? 'on' : ''}`}
            onClick={() => setSound(!sound)}
            data-testid="setting-toggle-sound"
          >
            <i />
          </div>
        </div>

        <div className="settings-row">
          <div>
            <div className="settings-label">3D Hands Guide</div>
            <div className="settings-desc">Interactive Three.js low-poly hands with active finger glow</div>
          </div>
          <div
            className={`toggle-switch ${showHands ? 'on' : ''}`}
            onClick={() => setShowHands(!showHands)}
            data-testid="setting-toggle-hands"
          >
            <i />
          </div>
        </div>

        <div className="settings-row">
          <div>
            <div className="settings-label">On-Screen Keyboard</div>
            <div className="settings-desc">Color-coded QWERTY keys with glowing finger boundaries</div>
          </div>
          <div
            className={`toggle-switch ${showKeyboard ? 'on' : ''}`}
            onClick={() => setShowKeyboard(!showKeyboard)}
            data-testid="setting-toggle-keyboard"
          >
            <i />
          </div>
        </div>

        <div style={{ marginTop: 24, textAlign: 'right' }}>
          <button className="primary-button" onClick={onClose}>
            Done
          </button>
        </div>
      </div>
    </div>
  );
}
