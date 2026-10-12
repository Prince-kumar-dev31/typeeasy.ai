import React from 'react';
import {
  BrainCircuit,
  BookOpen,
  CodeXml,
  Volume2,
  VolumeX,
  LogOut,
  SlidersHorizontal,
  User
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
          <BrainCircuit size={20} />
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
          <BookOpen size={14} /> <span>Academy</span>
        </button>

        <button
          className={page === 'practice' ? 'nav-item active' : 'nav-item'}
          onClick={() => setPage('practice')}
          data-testid="practice-nav"
        >
          <CodeXml size={14} /> <span>Practice</span>
        </button>

        <button
          className="icon-button"
          onClick={() => setSound(!sound)}
          data-testid="sound-toggle-nav"
          title={sound ? 'Mute typing sound' : 'Enable typing sound'}
        >
          {sound ? <Volume2 size={15} /> : <VolumeX size={15} />}
        </button>

        <button
          className="icon-button"
          onClick={() => setShowSettings(true)}
          data-testid="settings-nav-button"
          title="App Settings"
        >
          <SlidersHorizontal size={14} />
        </button>

        <div
          className="guest-chip"
          data-testid="user-chip"
          onClick={() => !user && setShowAuth(true)}
          style={{ cursor: user ? 'default' : 'pointer' }}
          title={user ? `Signed in as ${user.display_name}` : 'Click to Sign In or Quick Access'}
        >
          <span className="status-dot"></span>
          <span>{user?.display_name || user?.email?.split('@')[0] || 'Guest'}</span>
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
            <LogOut size={15} />
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
