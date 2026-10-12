import React from 'react';
import { X, BookOpen, ShieldCheck, Sparkles } from 'lucide-react';
import { tutorials } from '../data/lessons';

export default function TutorialModal({ onClose }) {
  return (
    <div className="modal-backdrop" onClick={onClose} data-testid="tutorial-modal-backdrop">
      <div className="tutorial-modal" onClick={(e) => e.stopPropagation()}>
        <button
          className="icon-button modal-close"
          onClick={onClose}
          data-testid="tutorial-close-button"
        >
          <X size={18} />
        </button>

        <div className="eyebrow">DEVELOPER ERGONOMICS & TECHNIQUE</div>
        <h2>Interactive Typing Tutorials</h2>
        <p className="muted" style={{ marginBottom: 18 }}>
          Essential neuromuscular guidelines to type faster, eliminate strain, and write code effortlessly.
        </p>

        {tutorials.map((item, idx) => (
          <div key={idx} className="tutorial-card">
            <h4>{item.title}</h4>
            <div style={{ color: '#818cf8', fontSize: 11, marginBottom: 6, fontWeight: 600 }}>
              {item.subtitle}
            </div>
            <p>{item.content}</p>
          </div>
        ))}

        <div style={{ marginTop: 24, textAlign: 'right' }}>
          <button className="primary-button" onClick={onClose}>
            Got it, Back to Practice
          </button>
        </div>
      </div>
    </div>
  );
}
