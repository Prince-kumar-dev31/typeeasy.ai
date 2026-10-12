import { Router } from 'express';
import jwt from 'jsonwebtoken';
import { db } from '../db.js';

const router = Router();
const JWT_SECRET = process.env.JWT_SECRET || 'typeeasy_jwt_super_secret_2026';

function getUserId(req) {
  try {
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.split(' ')[1];
      const decoded = jwt.verify(token, JWT_SECRET);
      return decoded.id;
    }
  } catch {}
  return null;
}

router.post('/sessions', (req, res) => {
  try {
    const userId = getUserId(req);
    const { mode, wpm, accuracy, mistakes, time, weakest_keys } = req.body;

    const session = db.saveSession({
      userId,
      mode: mode || 'English',
      wpm: Number(wpm) || 0,
      accuracy: Number(accuracy) || 100,
      mistakes: Number(mistakes) || 0,
      time: Number(time) || 0,
      weakest_keys: Array.isArray(weakest_keys) ? weakest_keys : []
    });

    res.json({ session });
  } catch (err) {
    console.error('Save session error:', err);
    res.status(500).json({ error: 'Failed to record session' });
  }
});

router.get('/sessions', (req, res) => {
  try {
    const userId = getUserId(req);
    if (!userId) {
      return res.status(401).json({ error: 'Authentication required' });
    }

    const sessions = db.getUserSessions(userId);
    res.json({ sessions });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch sessions' });
  }
});

router.post('/progress', (req, res) => {
  try {
    const userId = getUserId(req);
    const { progress } = req.body;
    if (!userId) {
      return res.status(401).json({ error: 'Authentication required' });
    }

    const updated = db.updateUserProgress(userId, Number(progress) || 1);
    res.json({ progress: updated?.progress || 1 });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update progress' });
  }
});

export default router;
