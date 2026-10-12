import React, { useState } from 'react';
import axios from 'axios';
import { X, ArrowRight, UserPlus, LogIn } from 'lucide-react';

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

  return (
    <div className="modal-backdrop" onClick={onClose} data-testid="auth-modal">
      <form className="auth-modal" onSubmit={submit} onClick={(e) => e.stopPropagation()}>
        <button
          className="icon-button modal-close"
          onClick={onClose}
          type="button"
          data-testid="auth-close-button"
        >
          <X size={18} />
        </button>

        <div className="eyebrow">ACCOUNT SYNC</div>
        <h2>{register ? 'Create your workspace' : 'Welcome back'}</h2>
        <p className="muted">
          Save your practice telemetry, sync unlocked levels across devices, and keep your streak moving.
        </p>

        {register && (
          <label>
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

        <label>
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

        <label>
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
          className="primary-button"
          type="submit"
          disabled={loading}
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
              Sign in <LogIn size={16} />
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
            : 'New here? Create a free developer account'}
        </button>
      </form>
    </div>
  );
}
