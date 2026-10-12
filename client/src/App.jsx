import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import axios from 'axios';
import Navbar from './components/Navbar';
import ModeBar from './components/ModeBar';
import Stats from './components/Stats';
import TypingArea from './components/TypingArea';
import FingerPanel from './components/FingerPanel';
import Keyboard from './components/Keyboard';
import CoachCard from './components/CoachCard';
import CameraCard from './components/CameraCard';
import Academy from './components/Academy';
import Result from './components/Result';
import AuthModal from './components/AuthModal';
import SettingsModal from './components/SettingsModal';
import { modeSnippets, academyLevels } from './data/lessons';
import { playKeySound } from './utils/sound';

export default function App() {
  const [page, setPage] = useState('practice');
  const [mode, setMode] = useState('English');
  const [snippetIndex, setSnippetIndex] = useState(0);
  const [activeAcademyLevel, setActiveAcademyLevel] = useState(null);

  const [text, setText] = useState(modeSnippets.English[0]);
  const [typed, setTyped] = useState('');
  const [started, setStarted] = useState(false);
  const [paused, setPaused] = useState(false);
  const [lastActivity, setLastActivity] = useState(Date.now());
  const [mistakes, setMistakes] = useState(0);
  const [startedAt, setStartedAt] = useState(null);
  const [pressed, setPressed] = useState('');
  const [mistakeKey, setMistakeKey] = useState('');

  const [zones, setZones] = useState(true);
  const [showHands, setShowHands] = useState(true);
  const [showKeyboard, setShowKeyboard] = useState(true);
  const [sound, setSound] = useState(true);
  const [resetCount, setResetCount] = useState(0);

  const [user, setUser] = useState(null);
  const [showAuth, setShowAuth] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  const [result, setResult] = useState(null);
  const [weakestKeys, setWeakestKeys] = useState([]);
  const [progress, setProgress] = useState(() => {
    return Number(localStorage.getItem('typeeasy_progress') || 3);
  });

  // Check user authentication on mount
  useEffect(() => {
    const token = localStorage.getItem('typeeasy_token');
    if (token) {
      axios
        .get('/api/auth/me', {
          headers: { Authorization: `Bearer ${token}` }
        })
        .then((res) => {
          if (res.data?.user) {
            setUser(res.data.user);
            if (res.data.user.progress > progress) {
              setProgress(res.data.user.progress);
              localStorage.setItem('typeeasy_progress', res.data.user.progress);
            }
          }
        })
        .catch(() => {
          localStorage.removeItem('typeeasy_token');
        });
    }
  }, []);

  // Inactivity detection: pause after 12s idle during active session
  useEffect(() => {
    const timer = setInterval(() => {
      if (started && !paused && Date.now() - lastActivity > 12000) {
        setPaused(true);
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [started, paused, lastActivity]);

  // Session reset
  const reset = useCallback(
    (newMode = mode, snippetIdx = null) => {
      setActiveAcademyLevel(null);
      setMode(newMode);

      const snippets = modeSnippets[newMode] || modeSnippets.English;
      const nextIdx =
        snippetIdx !== null ? snippetIdx : Math.floor(Math.random() * snippets.length);
      setSnippetIndex(nextIdx);
      setText(snippets[nextIdx]);

      setTyped('');
      setStarted(false);
      setPaused(false);
      setMistakes(0);
      setStartedAt(null);
      setResult(null);
      setMistakeKey('');
      setLastActivity(Date.now());
    },
    [mode]
  );

  // Stats calculation
  const stats = useMemo(() => {
    const elapsedMinutes = startedAt
      ? Math.max((Date.now() - startedAt) / 60000, 0.01)
      : 1;
    const correctChars = typed.split('').filter((c, i) => c === text[i]).length;
    return {
      wpm: started ? Math.round(correctChars / 5 / elapsedMinutes) : 0,
      accuracy: typed.length ? Math.round((correctChars / typed.length) * 100) : 100,
      mistakes,
      mode: activeAcademyLevel ? `L${activeAcademyLevel.id}` : mode
    };
  }, [typed, text, started, startedAt, mistakes, mode, activeAcademyLevel]);

  // Handle typing input
  const handleTyping = (e) => {
    if (paused) return;

    // Handle global Enter to start when not yet typing
    if (e.key === 'Enter' && !started) {
      setStarted(true);
      setStartedAt(Date.now());
      setLastActivity(Date.now());
      if (sound) playKeySound(false);
      return;
    }

    const value = e.target.value;
    const isNewChar = value.length > typed.length;
    const isBackspace = value.length < typed.length;

    if (!started && value.length > 0) {
      setStarted(true);
      setStartedAt(Date.now());
    }

    setLastActivity(Date.now());

    if (isNewChar) {
      const lastChar = value.slice(-1);
      const targetChar = text[value.length - 1];
      const isMismatch = lastChar !== targetChar;

      setPressed(lastChar);
      setTimeout(() => setPressed(''), 120);

      if (isMismatch) {
        setMistakes((m) => m + 1);
        setMistakeKey(lastChar);
        setTimeout(() => setMistakeKey(''), 220);
        if (sound) playKeySound(true);
      } else {
        if (sound) playKeySound(false);
      }
    } else if (isBackspace) {
      if (sound) playKeySound(false);
    }

    const nextTyped = value.slice(0, text.length);
    setTyped(nextTyped);

    // Session completion check
    if (nextTyped.length >= text.length) {
      const correct = nextTyped.split('').filter((c, i) => c === text[i]).length;
      const accuracy = Math.round((correct / text.length) * 100);
      const durationSeconds = Math.max(1, Math.round((Date.now() - (startedAt || Date.now())) / 1000));
      const finalWpm = Math.round(correct / 5 / (durationSeconds / 60));

      // Extract weakest keys (keys where mistakes occurred)
      const errorChars = nextTyped
        .split('')
        .filter((c, i) => c !== text[i])
        .map((c) => (c === ' ' ? 'SPACE' : c.toUpperCase()));
      const uniqueWeak = [...new Set(errorChars)].slice(0, 5);

      const sessionResult = {
        wpm: finalWpm,
        accuracy,
        mistakes,
        time: durationSeconds,
        weakestKeys: uniqueWeak
      };

      setResult(sessionResult);
      setWeakestKeys(uniqueWeak);
      setStarted(false);

      // Unlock next academy level if accuracy >= 90%
      if (accuracy >= 90) {
        let newProgress = progress;
        if (activeAcademyLevel && activeAcademyLevel.id >= progress) {
          newProgress = Math.min(30, activeAcademyLevel.id);
        } else if (!activeAcademyLevel && progress < 30) {
          newProgress = Math.min(30, progress + 1);
        }
        setProgress(newProgress);
        localStorage.setItem('typeeasy_progress', newProgress);

        // Sync with backend database if logged in
        if (user) {
          axios
            .post(
              '/api/progress',
              { progress: newProgress },
              { headers: { Authorization: `Bearer ${localStorage.getItem('typeeasy_token')}` } }
            )
            .catch(() => {});
        }
      }

      // Record session to database if logged in
      if (user) {
        axios
          .post(
            '/api/sessions',
            {
              mode: activeAcademyLevel ? `academy_${activeAcademyLevel.id}` : mode,
              ...sessionResult,
              weakest_keys: uniqueWeak
            },
            { headers: { Authorization: `Bearer ${localStorage.getItem('typeeasy_token')}` } }
          )
          .catch(() => {});
      }
    }
  };

  // Select level from Academy tab
  const handleSelectAcademyLevel = (level) => {
    setActiveAcademyLevel(level);
    setText(level.text);
    setTyped('');
    setStarted(false);
    setPaused(false);
    setMistakes(0);
    setStartedAt(null);
    setResult(null);
    setLastActivity(Date.now());
    setPage('practice');
  };

  // Next lesson flow
  const handleNextLesson = () => {
    if (activeAcademyLevel) {
      const nextId = activeAcademyLevel.id + 1;
      const nextLevel = academyLevels.find((l) => l.id === nextId);
      if (nextLevel && nextId <= progress + 1) {
        handleSelectAcademyLevel(nextLevel);
        return;
      }
    }

    // Default practice mode: advance to next snippet
    const snippets = modeSnippets[mode] || modeSnippets.English;
    const nextIdx = (snippetIndex + 1) % snippets.length;
    reset(mode, nextIdx);
  };

  // Generate targeted AI drill for weak keys
  const handleGenerateDrill = async () => {
    const weakList = weakestKeys.length > 0 ? weakestKeys : ['A', 'S', 'D', 'F'];
    try {
      const res = await axios.post('/api/coach/drill', {
        weakest_keys: weakList,
        mode
      });
      if (res.data?.drill_text) {
        setText(res.data.drill_text);
        setTyped('');
        setResult(null);
        setStarted(false);
        setMistakes(0);
        return;
      }
    } catch {
      // Offline smart drill generator fallback
    }

    const weakLower = weakList.map((k) => k.toLowerCase()).join(' ');
    const fallbackDrill = `Targeted Drill: ${weakLower} ${weakLower} ${weakLower}. Keep your wrists relaxed and eyes up.`;
    setText(fallbackDrill);
    setTyped('');
    setResult(null);
    setStarted(false);
    setMistakes(0);
  };

  const nextKey = text[typed.length] || ' ';
  const modeList = Object.keys(modeSnippets);

  return (
    <div className="app-shell">
      <Navbar
        page={page}
        setPage={setPage}
        user={user}
        setAuth={setUser}
        setShowAuth={setShowAuth}
        sound={sound}
        setSound={setSound}
        setShowSettings={setShowSettings}
      />

      {page === 'academy' ? (
        <Academy
          progress={progress}
          onSelectLevel={handleSelectAcademyLevel}
          setPage={setPage}
        />
      ) : result ? (
        <Result
          result={result}
          retry={() => {
            setTyped('');
            setStarted(false);
            setMistakes(0);
            setStartedAt(null);
            setResult(null);
            setLastActivity(Date.now());
          }}
          next={handleNextLesson}
        />
      ) : (
        <main className="content">
          <ModeBar
            mode={mode}
            setMode={(m) => {
              setActiveAcademyLevel(null);
              setMode(m);
            }}
            reset={reset}
            modeList={modeList}
          />

          <Stats
            wpm={stats.wpm}
            accuracy={stats.accuracy}
            mode={stats.mode}
            mistakes={stats.mistakes}
            reset={() => reset(mode)}
          />

          <TypingArea
            text={text}
            typed={typed}
            onKey={handleTyping}
            paused={paused}
            resume={() => {
              setPaused(false);
              setLastActivity(Date.now());
            }}
            started={started}
          />

          <FingerPanel
            nextKey={nextKey}
            zones={zones}
            setZones={setZones}
            showHands={showHands}
            setShowHands={setShowHands}
            onResetRest={() => setResetCount((c) => c + 1)}
            resetCount={resetCount}
          />

          {showKeyboard && (
            <Keyboard
              nextKey={nextKey}
              pressed={pressed}
              mistakeKey={mistakeKey}
            />
          )}

          <div className="feature-grid">
            <CoachCard
              stats={stats}
              weakestKeys={weakestKeys}
              onDrill={handleGenerateDrill}
              user={user}
            />
            <CameraCard />
          </div>
        </main>
      )}

      <footer className="footer">
        Privacy Policy <span>·</span> Terms of Service <span>·</span> © 2026 TypeEasy AI. All rights reserved.{' '}
        <em>Adaptive keystroke analytics model v1.0.0</em>
      </footer>

      {showAuth && (
        <AuthModal
          onClose={() => setShowAuth(false)}
          onAuth={(u) => {
            setUser(u);
            if (u.progress && u.progress > progress) {
              setProgress(u.progress);
              localStorage.setItem('typeeasy_progress', u.progress);
            }
          }}
        />
      )}

      {showSettings && (
        <SettingsModal
          onClose={() => setShowSettings(false)}
          sound={sound}
          setSound={setSound}
          showHands={showHands}
          setShowHands={setShowHands}
          showKeyboard={showKeyboard}
          setShowKeyboard={setShowKeyboard}
        />
      )}
    </div>
  );
}
