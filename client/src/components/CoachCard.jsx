import React, { useState } from 'react';
import axios from 'axios';
import { Activity, Sparkles, BrainCircuit, RefreshCw, ArrowRight } from 'lucide-react';

export default function CoachCard({ stats, weakestKeys, onDrill, user }) {
  const [analysis, setAnalysis] = useState('');
  const [loading, setLoading] = useState(false);

  const analyze = async () => {
    setLoading(true);
    try {
      const res = await axios.post('/api/coach/analyze', {
        mode: stats.mode,
        wpm: stats.wpm,
        accuracy: stats.accuracy,
        mistakes: stats.mistakes,
        weakest_keys: weakestKeys
      });
      if (res.data?.analysis) {
        setAnalysis(res.data.analysis);
        return;
      }
    } catch {
      // Fallback offline dynamic coach diagnostics
    }

    // Dynamic heuristic coach feedback when backend LLM is starting up or offline
    const weakList = weakestKeys.length > 0 ? weakestKeys.join(', ') : 'None';
    let feedback = '';

    if (stats.accuracy >= 98 && stats.wpm >= 60) {
      feedback = `Excellent fluidity at ${stats.wpm} WPM. Your keystroke rhythm is steady. Try ramping up finger independence on punctuation and number transitions.`;
    } else if (stats.accuracy >= 90) {
      feedback = `Solid accuracy (${stats.accuracy}%). You had minor friction around [${weakList}]. Keep your palms floating above the keyboard to reduce finger strain.`;
    } else if (stats.mistakes > 3) {
      feedback = `Hesitations detected on [${weakList}]. Slow your cadence down by ~10% to lock in accurate spatial memory before pushing for raw speed.`;
    } else {
      feedback = `Keep practicing home-row stability. Every clean session automates your neuromuscular typing pathways.`;
    }

    setAnalysis(feedback);
    setLoading(false);
  };

  return (
    <section className="feature-card coach-card" data-testid="coach-card">
      <div className="card-heading">
        <div>
          <div className="eyebrow">LIVE KEYSTROKE DIAGNOSTICS</div>
          <h2>
            <Activity size={19} /> Adaptive AI Coach
          </h2>
        </div>

        <button
          className="icon-button"
          onClick={analyze}
          data-testid="refresh-coach-button"
          title="Run fresh keystroke analysis"
        >
          <RefreshCw size={16} className={loading ? 'animate-spin' : ''} />
        </button>
      </div>

      <div className="coach-message">
        <div className="coach-avatar">
          <BrainCircuit size={17} />
        </div>
        <div>
          <p>
            {analysis ||
              "Start a typing session and I'll analyze your keystrokes and weak keys in real time."}
          </p>
          <small>
            {analysis
              ? 'Personalized coaching from your latest keystroke telemetry.'
              : 'Complete a session or click refresh to generate diagnostics.'}
          </small>
        </div>
      </div>

      {loading && (
        <div className="loading-line" data-testid="coach-loading">
          Generating diagnostics <span className="animate-pulse">• • •</span>
        </div>
      )}

      <button
        className="primary-button full"
        onClick={onDrill}
        data-testid="generate-drill-button"
      >
        <Sparkles size={15} /> Generate Targeted Drill <ArrowRight size={15} />
      </button>
    </section>
  );
}
