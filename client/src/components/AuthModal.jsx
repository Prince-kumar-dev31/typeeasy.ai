import React, { useState } from 'react';
import axios from 'axios';
import { X, ArrowRight, UserPlus, LogIn, Zap } from 'lucide-react';

export default function AuthModal({ onClose, onAuth }) {
  const [register, setRegister] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const endpoint = register ? '/api/auth/register' : '/api/auth/login';
      const payload = register
        ? { email, password, display_name: displayName || email.split('@')[0] }
        : { email, password };

      const res = await axios.post(endpoint, payload);
      localStorage.setItem('typeeasy_token', res.data.token);
      onAuth(res.data.user);
      onClose();
    } catch (err) {
      setError(
        err.response?.data?.error ||
        err.response?.data?.detail ||
        'Could not complete request. Please verify details.'
      );
    } finally {
      setLoading(false);
    }
  };

  const quickLogin = async () => {
    setError('');
    setLoading(true);
    try {
      const randomSuffix = Math.random().toString(36).substring(2, 6);
      const name = displayName.trim() || `Dev_${randomSuffix}`;
      const demoEmail = `dev_${randomSuffix}_${Date.now().toString().slice(-4)}@typeeasy.local`;
      const res = await axios.post('/api/auth/register', {
        email: demoEmail,
        password: 'quick_password_123',
        display_name: name
      });
      localStorage.setItem('typeeasy_token', res.data.token);
      onAuth(res.data.user);
      onClose();
    } catch {
      const localGuest = {
        id: 'guest_' + Date.now(),
        display_name: displayName.trim() || 'Developer',
        progress: 3
      };
      onAuth(localGuest);
      onClose();
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-backdrop" onClick={onClose} data-testid="auth-modal">
      <div className="auth-modal" onClick={(e) => e.stopPropagation()}>
        <button
          className="icon-button modal-close"
          onClick={onClose}
          type="button"
          data-testid="auth-close-button"
        >
          <X size={18} />
        </button>

        <div className="eyebrow">FAST ACCESS</div>
        <h2>{register ? 'Create your workspace' : 'Sign in to TypeEasy'}</h2>
        <p className="muted" style={{ fontSize: 11, marginBottom: 14 }}>
          Save your practice history, streak, and unlocked Academy levels.
        </p>

        {/* 1-Click Fast Login for mobile and quick trials */}
        <div style={{ background: 'rgba(99, 102, 241, 0.08)', border: '1px solid rgba(99, 102, 241, 0.25)', borderRadius: 12, padding: 12, marginBottom: 16 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 11, color: '#c4b5fd', fontWeight: 700, marginBottom: 8 }}>
            <Zap size={14} /> 1-CLICK INSTANT DEVELOPER LOGIN
          </div>
          <button
            type="button"
            className="primary-button"
            style={{ width: '100%', background: 'linear-gradient(90deg, #6366f1, #8b5cf6)', padding: '10px 14px' }}
            onClick={quickLogin}
            disabled={loading}
            data-testid="quick-login-button"
          >
            <Zap size={14} /> Instant Access (No Password Required)
          </button>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 8, margin: '14px 0 10px', color: '#566783', fontSize: 10 }}>
          <div style={{ flex: 1, height: 1, background: 'var(--line)' }} />
          <span>OR SIGN IN WITH EMAIL</span>
          <div style={{ flex: 1, height: 1, background: 'var(--line)' }} />
        </div>

        <form onSubmit={submit}>
          {register && (
            <label style={{ margin: '10px 0' }}>
              Developer Name
              <input
                type="text"
                placeholder="e.g. Linus"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                data-testid="auth-name-input"
              />
            </label>
          )}

          <label style={{ margin: '10px 0' }}>
            Email
            <input
              type="email"
              placeholder="developer@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              data-testid="auth-email-input"
            />
          </label>

          <label style={{ margin: '10px 0' }}>
            Password
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              minLength={6}
              required
              data-testid="auth-password-input"
            />
          </label>

          {error && (
            <div className="error-line" data-testid="auth-error">
              {error}
            </div>
          )}

          <button
            className="secondary-button"
            type="submit"
            disabled={loading}
            style={{ width: '100%', marginTop: 8 }}
            data-testid="auth-submit-button"
          >
            {loading ? (
              'Processing...'
            ) : register ? (
              <>
                Create account <UserPlus size={16} />
              </>
            ) : (
              <>
                Sign in with email <LogIn size={16} />
              </>
            )}
          </button>

          <button
            className="text-button"
            type="button"
            onClick={() => {
              setRegister(!register);
              setError('');
            }}
            data-testid="auth-toggle-button"
          >
            {register
              ? 'Already have an account? Sign in'
              : 'New here? Register email account'}
          </button>
        </form>
      </div>
    </div>
  );
}
