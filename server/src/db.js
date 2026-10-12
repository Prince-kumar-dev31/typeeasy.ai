import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_DIR = path.join(__dirname, '..', 'data');
const DATA_FILE = path.join(DATA_DIR, 'db.json');

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

// Initial structure
const initialData = {
  users: [],
  sessions: []
};

function readDb() {
  try {
    if (!fs.existsSync(DATA_FILE)) {
      fs.writeFileSync(DATA_FILE, JSON.stringify(initialData, null, 2), 'utf-8');
      return initialData;
    }
    const raw = fs.readFileSync(DATA_FILE, 'utf-8');
    return JSON.parse(raw);
  } catch (err) {
    console.error('Error reading db:', err);
    return initialData;
  }
}

function writeDb(data) {
  try {
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), 'utf-8');
  } catch (err) {
    console.error('Error writing db:', err);
  }
}

export const db = {
  // Users
  findUserByEmail(email) {
    const data = readDb();
    return data.users.find((u) => u.email.toLowerCase() === email.toLowerCase());
  },
  findUserById(id) {
    const data = readDb();
    return data.users.find((u) => u.id === id);
  },
  createUser({ email, passwordHash, display_name }) {
    const data = readDb();
    const newUser = {
      id: 'usr_' + Date.now() + '_' + Math.random().toString(36).substring(2, 7),
      email: email.toLowerCase(),
      passwordHash,
      display_name: display_name || email.split('@')[0],
      progress: 3,
      createdAt: new Date().toISOString()
    };
    data.users.push(newUser);
    writeDb(data);
    return newUser;
  },
  updateUserProgress(userId, progress) {
    const data = readDb();
    const user = data.users.find((u) => u.id === userId);
    if (user) {
      user.progress = Math.max(user.progress || 1, progress);
      writeDb(data);
    }
    return user;
  },

  // Sessions
  saveSession({ userId, mode, wpm, accuracy, mistakes, time, weakest_keys }) {
    const data = readDb();
    const newSession = {
      id: 'ses_' + Date.now(),
      userId: userId || null,
      mode,
      wpm,
      accuracy,
      mistakes,
      time,
      weakest_keys: weakest_keys || [],
      createdAt: new Date().toISOString()
    };
    data.sessions.push(newSession);
    writeDb(data);
    return newSession;
  },
  getUserSessions(userId) {
    const data = readDb();
    return data.sessions.filter((s) => s.userId === userId);
  }
};
