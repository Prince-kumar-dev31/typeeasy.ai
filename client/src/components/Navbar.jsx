import React from 'react';
import {
  BrainCircuit,
  BookOpen,
  CodeXml,
  Volume2,
  VolumeX,
  LogOut,
  SlidersHorizontal
} from 'lucide-react';

export default function Navbar({
  page,
  setPage,
  user,
  setAuth,
  setShowAuth,
  sound,
  setSound,
  setShowSettings
}) {
  return (
    <header className="navbar">
      <div className="brand" onClick={() => setPage('practice')} data-testid="brand-mark">
        <div className="logo-mark">
          <BrainCircuit size={22} />
        </div>
        <div>
          <div className="brand-name">
            TypeEasy <span>AI</span>
          </div>
          <div className="brand-subtitle">ADAPTIVE TYPING COACH</div>
        </div>
      </div>

      <nav className="nav-links">
        <button
          className={page === 'academy' ? 'nav-item active' : 'nav-item'}
          onClick={() => setPage('academy')}
          data-testid="academy-nav"
        >
          <BookOpen size={15} /> Academy
        </button>

        <button
          className={page === 'practice' ? 'nav-item active' : 'nav-item'}
          onClick={() => setPage('practice')}
          data-testid="practice-nav"
        >
          <CodeXml size={15} /> Practice
        </button>

        <button
          className="nav-item settings-nav"
          onClick={() => setSound(!sound)}
          data-testid="sound-toggle-nav"
          title={sound ? 'Mute typing sound' : 'Enable typing sound'}
        >
          {sound ? <Volume2 size={15} /> : <VolumeX size={15} />}
          <span>Sound {sound ? 'On' : 'Off'}</span>
        </button>

        <button
          className="icon-button"
          onClick={() => setShowSettings(true)}
          data-testid="settings-nav-button"
          title="App Settings"
        >
          <SlidersHorizontal size={15} />
        </button>

        <div className="guest-chip" data-testid="user-chip">
          <span className="status-dot"></span>
          {user?.display_name || user?.email?.split('@')[0] || 'Guest'}
        </div>

        {user ? (
          <button
            className="icon-button"
            onClick={() => {
              localStorage.removeItem('typeeasy_token');
              setAuth(null);
            }}
            data-testid="logout-button"
            title="Sign out"
          >
            <LogOut size={16} />
          </button>
        ) : (
          <button
            className="outline-button"
            onClick={() => setShowAuth(true)}
            data-testid="login-button"
          >
            Sign in
          </button>
        )}
      </nav>
    </header>
  );
}
