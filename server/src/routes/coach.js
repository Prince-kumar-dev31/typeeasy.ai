import { Router } from 'express';

const router = Router();

// Endpoint: /api/coach/analyze
router.post('/analyze', async (req, res) => {
  const { mode, wpm, accuracy, mistakes, weakest_keys } = req.body;
  const geminiKey = process.env.GEMINI_API_KEY;
  const openaiKey = process.env.OPENAI_API_KEY;

  const weakStr = Array.isArray(weakest_keys) && weakest_keys.length > 0
    ? weakest_keys.join(', ')
    : 'None';

  const prompt = `You are TypeEasy AI, an expert adaptive typing coach for software engineers.
Analyze this developer typing session telemetry:
- Programming/Language Mode: ${mode}
- Speed: ${wpm} WPM
- Accuracy: ${accuracy}%
- Mistakes: ${mistakes}
- Problematic/Weak keys: ${weakStr}

Provide 2-3 concise, actionable sentences of diagnostic feedback:
1. Identify the neuromuscular bottleneck or finger travel pattern causing hesitation.
2. Give one practical ergonomic or finger placement tip.
Keep tone sharp, encouraging, and developer-focused. Do not use generic filler.`;

  // 1. Try Gemini API
  if (geminiKey) {
    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${geminiKey}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }]
          })
        }
      );
      const data = await response.json();
      const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
      if (text) {
        return res.json({ analysis: text.trim() });
      }
    } catch (err) {
      console.warn('Gemini API call failed, falling back to smart heuristic:', err.message);
    }
  }

  // 2. Try OpenAI API
  if (openaiKey) {
    try {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${openaiKey}`
        },
        body: JSON.stringify({
          model: 'gpt-4o-mini',
          messages: [{ role: 'user', content: prompt }],
          max_tokens: 150
        })
      });
      const data = await response.json();
      const text = data?.choices?.[0]?.message?.content;
      if (text) {
        return res.json({ analysis: text.trim() });
      }
    } catch (err) {
      console.warn('OpenAI API call failed, falling back to smart heuristic:', err.message);
    }
  }

  // 3. Fallback smart heuristic diagnostics
  let fallback = '';
  if (accuracy >= 98 && wpm >= 65) {
    fallback = `Exceptional fluidity at ${wpm} WPM and ${accuracy}% accuracy. Your finger anchoring is consistent. Maintain light tactile pressure on the keycaps to sustain this pace without hand fatigue.`;
  } else if (accuracy >= 90) {
    fallback = `Solid pace (${wpm} WPM, ${accuracy}% accuracy). Keystroke telemetry indicates minor hesitation on [${weakStr}]. Float your wrists slightly above the desk surface to grant your ring and pinky fingers full range of motion.`;
  } else if (mistakes > 4) {
    fallback = `Stumbling detected on [${weakStr}]. Your finger travel is drifting away from the home row. Throttle your speed down by ~15% until your accuracy stabilizes above 92%, then let muscle memory compound.`;
  } else {
    fallback = `Steady rhythm. Pay attention to the home-row tactile bumps on 'F' and 'J' to keep both hands centered during rapid code input.`;
  }

  res.json({ analysis: fallback });
});

// Endpoint: /api/coach/drill
router.post('/drill', async (req, res) => {
  const { weakest_keys, mode } = req.body;
  const geminiKey = process.env.GEMINI_API_KEY;
  const openaiKey = process.env.OPENAI_API_KEY;

  const weakKeys = Array.isArray(weakest_keys) && weakest_keys.length > 0
    ? weakest_keys
    : ['A', 'S', 'D', 'F'];
  const weakStr = weakKeys.join(', ');

  const prompt = `Generate a single-sentence or 2-line code drill snippet in ${mode || 'JavaScript'} specifically designed to train these weak keys: [${weakStr}].
The drill should feel like realistic developer code, naturally repeating the weak keys multiple times without being meaningless gibberish.
Return ONLY the raw practice snippet text with no markdown backticks, no quotes, and no commentary.`;

  // 1. Try Gemini API
  if (geminiKey) {
    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${geminiKey}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }]
          })
        }
      );
      const data = await response.json();
      const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
      if (text) {
        return res.json({ drill_text: text.trim().replace(/^```[a-z]*\n?/i, '').replace(/\n?```$/i, '') });
      }
    } catch (err) {
      console.warn('Gemini drill generation failed:', err.message);
    }
  }

  // 2. Try OpenAI API
  if (openaiKey) {
    try {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${openaiKey}`
        },
        body: JSON.stringify({
          model: 'gpt-4o-mini',
          messages: [{ role: 'user', content: prompt }],
          max_tokens: 120
        })
      });
      const data = await response.json();
      const text = data?.choices?.[0]?.message?.content;
      if (text) {
        return res.json({ drill_text: text.trim().replace(/^```[a-z]*\n?/i, '').replace(/\n?```$/i, '') });
      }
    } catch (err) {
      console.warn('OpenAI drill generation failed:', err.message);
    }
  }

  // 3. Smart offline drill generator
  const tokens = weakKeys.map((k) => k.toLowerCase()).filter((k) => k.length === 1);
  const repeated = tokens.join('') + ' ' + tokens.reverse().join('') + ' ' + tokens.join('');
  const fallbackDrill = `const drillFocus = "${repeated}"; // Practice deliberate precision with quiet wrists.`;

  res.json({ drill_text: fallbackDrill });
});

export default router;
