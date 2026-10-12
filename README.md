# TypeEasy.ai - Adaptive AI Typing Coach for Developers

TypeEasy.ai is an intelligent, developer-focused typing coach built with React, Tailwind CSS, Three.js, Web Audio API, and an Express.js backend.

## 🚀 Key Features

1. **Precision Typing Engine**
   - Live telemetry: WPM, accuracy, real-time mistakes counter.
   - Character feedback: bright white for correct, soft red highlight for mistakes, purple pulsing cursor on the current character.
   - Zero input lag with instant controlled character matching.
   - Synthetic mechanical switch sound effects synthesized via Web Audio API (with instant mute toggle).

2. **Global Enter-Key Workflow**
   - Press `Enter` to start practice immediately.
   - On the results screen: press `Enter` to advance to the next lesson (if accuracy $\ge 90\%$) or retry (if accuracy $< 90\%$).

3. **Inactivity Pause Detection**
   - Pauses session automatically after 12 seconds of idle time.
   - Displays a clean "Practice Paused" overlay with a Resume button or one-click resume.

4. **Glowing QWERTY On-Screen Keyboard**
   - Each key is bordered with its ergonomic finger zone color:
     - Left Pinky: Red (`#f43f5e`)
     - Left Ring: Orange (`#fb923c`)
     - Left Middle: Yellow (`#facc15`)
     - Left Index: Green (`#4ade80`)
     - Thumbs: Gray (`#64748b`)
     - Right Index: Blue (`#38bdf8`)
     - Right Middle: Indigo (`#818cf8`)
     - Right Ring: Purple (`#c084fc`)
     - Right Pinky: Magenta (`#f472b6`)
   - Tactile home-row bumps on `F` and `J`.
   - Next target key glows with a prominent purple pulse.
   - Wrong key flashes red on mistake.
   - Finger zone legend row below the keyboard.

5. **3D Finger Positioning Guide (Three.js)**
   - Low-poly skin-tone procedural hands with articulated fingers.
   - Target finger glows purple (`#d946ef`) in real time matching the next required keystroke.
   - Toggles: "3D Hands" (show/hide), "Zones" (color-code hand fingers), and "Home-Row Rest" (reset hands to `ASDF` and `JKL;` home row rest position).

6. **Language Modes & Multi-Snippet Library**
   - Practice modes for **English**, **Python**, **JavaScript**, **Java**, and **SQL**.
   - Multiple realistic code snippets per mode.

7. **Adaptive AI Coach ("Live Keystroke Diagnostics")**
   - Analyzes weak keys, mistake clusters, and speed.
   - "Generate Targeted Drill" button creates custom practice text targeting your weakest keys.
   - Powered by Gemini or OpenAI via `.env` with a smart local heuristic fallback.

8. **Privacy-Safe Posture Camera**
   - 100% in-browser posture check using canvas frame heuristics.
   - Detects slouching and head level without uploading any video or biometric data to any server.
   - Graceful fallback: works smoothly if camera is denied or absent.

9. **The Academy (30 Levels & Ergonomics Tutorials)**
   - 30 progressive levels across 6 tiers:
     - Levels 1–5: Home row anchor (`ASDF JKL;`)
     - Levels 6–10: Top row (`QWERTY UIOP`)
     - Levels 11–15: Bottom row (`ZXCVBNM ,./`)
     - Levels 16–20: Numbers & symbols (`!@#$%^&*()_+{}`)
     - Levels 21–25: Developer keywords & naming conventions
     - Levels 26–30: Grandmaster code fluency snippets
   - Level gating: unlocks at $\ge 90\%$ accuracy.
   - Interactive tutorials for touch-typing anchor and zero-tension wrist posture.

10. **Guest Mode & User Authentication**
    - Guest mode: persists unlocked levels and settings in `localStorage`.
    - Sign in / Register: JWT authentication, SQLite/file database persistence for session history and streak sync.

---

## 🛠️ How to Run Locally

### 1. Start the Backend Server (Port 5000)
```powershell
cd C:\Users\HP\.gemini\antigravity\scratch\typeeasy-ai\server
npm.cmd install
npm.cmd start
```

### 2. Start the Frontend Client (Port 3000)
```powershell
cd C:\Users\HP\.gemini\antigravity\scratch\typeeasy-ai\client
npm.cmd install
npm.cmd run dev
```

Open your browser at **[http://localhost:3000](http://localhost:3000)**.
