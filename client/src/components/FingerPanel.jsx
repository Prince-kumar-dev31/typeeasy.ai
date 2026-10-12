import React from 'react';
import { Sparkles, Eye, Zap, RotateCcw } from 'lucide-react';
import HandsScene from './HandsScene';
import { fingerMap } from '../data/keyMap';

export default function FingerPanel({
  nextKey,
  zones,
  setZones,
  showHands,
  setShowHands,
  onResetRest,
  resetCount
}) {
  const normalizedKey = nextKey === '\n' ? 'Enter' : nextKey.toLowerCase();
  const finger = fingerMap[nextKey === ' ' ? ' ' : normalizedKey] || 'R-Index';

  return (
    <>
      <div className="guide-toolbar">
        <div>
          <div className="section-title">
            <Sparkles size={16} /> 3D Finger Positioning Guide
          </div>
          <div className="target-finger">
            Target Finger: <b data-testid="target-finger-badge">{finger}</b>
          </div>
        </div>

        <div className="guide-controls">
          <button
            className={showHands ? 'control-button active' : 'control-button'}
            onClick={() => setShowHands(!showHands)}
            data-testid="toggle-3d-hands"
            title="Toggle 3D hands display"
          >
            <Eye size={14} /> 3D Hands
          </button>

          <button
            className={zones ? 'control-button zone-active' : 'control-button'}
            onClick={() => setZones(!zones)}
            data-testid="toggle-zones"
            title="Color-code finger zones"
          >
            <Zap size={14} /> Zones
          </button>

          <button
            className="control-button"
            onClick={onResetRest}
            data-testid="home-row-rest"
            title="Reset hand posture to home row"
          >
            <RotateCcw size={14} /> Home-Row Rest
          </button>
        </div>
      </div>

      {showHands && (
        <div className={`hands-panel ${zones ? 'zones-on' : ''}`} data-testid="hands-panel">
          <span className="hand-label left">LEFT HAND</span>
          <span className="hand-label right">RIGHT HAND</span>

          <div className="active-finger">
            <b>{finger}</b>
            <span>ACTIVE</span>
          </div>

          <HandsScene finger={finger} zones={zones} resetCount={resetCount} />
        </div>
      )}
    </>
  );
}
