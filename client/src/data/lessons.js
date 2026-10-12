export const modeSnippets = {
  English: [
    "A focused developer writes clean code with calm, deliberate hands.",
    "Mastery in software comes from consistent deliberate practice and deep focus.",
    "Refactoring legacy code requires patience, test suites, and steady keystrokes.",
    "Clear variable names reduce cognitive load and enhance team velocity."
  ],
  Python: [
    "def optimize_input(buffer):\n    return [key for key in buffer if key.isprintable()]",
    "async def fetch_user_telemetry(session_id: str):\n    metrics = await db.sessions.find_one({'id': session_id})\n    return metrics or {}",
    "class KeystrokeAnalytics:\n    def __init__(self, sample_rate=60):\n        self.latency_buffer = []",
    "with open('config.json', 'r', encoding='utf-8') as stream:\n    settings = json.load(stream)"
  ],
  JavaScript: [
    "const focus = keys => keys.filter(key => key !== ' ');",
    "export const calculateWPM = (chars, seconds) => Math.round((chars / 5) / (seconds / 60));",
    "const [activeSession, setActiveSession] = useState({ wpm: 0, accuracy: 100 });",
    "useEffect(() => {\n  const handler = (e) => setKeyPressed(e.key);\n  window.addEventListener('keydown', handler);\n  return () => window.removeEventListener('keydown', handler);\n}, []);"
  ],
  Java: [
    "public static void main(String[] args) {\n    System.out.println(\"Keep shipping.\");\n}",
    "public class TelemetryFilter {\n    private final List<Double> latencies = new ArrayList<>();\n}",
    "public Optional<UserRecord> findByEmail(String email) {\n    return repository.findFirstByEmail(email);\n}",
    "IntStream.range(0, buffer.length()).filter(i -> buffer.charAt(i) != ' ').forEach(System.out::print);"
  ],
  SQL: [
    "SELECT focus, consistency\nFROM typing_sessions\nWHERE accuracy >= 90;",
    "SELECT user_id, AVG(wpm) AS average_wpm, MAX(accuracy) AS peak_accuracy\nFROM keystroke_logs\nGROUP BY user_id\nHAVING COUNT(*) > 10;",
    "UPDATE user_progress\nSET highest_unlocked_level = 15, updated_at = NOW()\nWHERE user_id = $1;",
    "CREATE INDEX idx_sessions_user_created ON sessions(user_id, created_at DESC);"
  ]
};

export const academyLevels = [
  // 1-5: Home row
  { id: 1, tier: "Home Row", name: "Left Hand Anchor (ASDF)", text: "asdf asdf asdf fdsa fdsa fa fa da sa fa da sa" },
  { id: 2, tier: "Home Row", name: "Right Hand Anchor (JKL;)", text: "jkl; jkl; jkl; ;lkj ;lkj jk kl l; jl k; j; k;" },
  { id: 3, tier: "Home Row", name: "Full Home Row Rest", text: "asdf jkl; fdsa ;lkj asdf jkl; a; sl dk fj fj dk sl a;" },
  { id: 4, tier: "Home Row", name: "Home Row Real Words", text: "all falls sad flask salad flash slash lads fall glad" },
  { id: 5, tier: "Home Row", name: "Home Row Fluency Test", text: "a sad lad had a salad as a flash fall dad had a flask" },

  // 6-10: Top row
  { id: 6, tier: "Top Row", name: "Left Top Row (QWERT)", text: "qwert qwert trewq trewq qwert we we re te qe wt er" },
  { id: 7, tier: "Top Row", name: "Right Top Row (YUIOP)", text: "yuiop yuiop poiuy poiuy ui op yo up io yu oi py" },
  { id: 8, tier: "Top Row", name: "Full Top Row Blend", text: "qwert yuiop trewq poiuy quite write query power route" },
  { id: 9, tier: "Top Row", name: "Home + Top Row Words", text: "quiet priority repeat yield output update try pure" },
  { id: 10, tier: "Top Row", name: "Top Row Mastery Check", text: "write proper queries to update your yield report quickly" },

  // 11-15: Bottom row
  { id: 11, tier: "Bottom Row", name: "Left Bottom Row (ZXCVB)", text: "zxcvb zxcvb bvcxz bvcxz zx cv vb bz xc cb vz bx" },
  { id: 12, tier: "Bottom Row", name: "Right Bottom Row (NM,./)", text: "nm,./ nm,./ /.,mn /.,mn nm m, ,. ./ mn ,n ." },
  { id: 13, tier: "Bottom Row", name: "Full Bottom Row Blend", text: "zxcvb nm,./ zoom climb next blank move mix view" },
  { id: 14, tier: "Bottom Row", name: "Three-Row Mixed Words", text: "maximize flexible benchmark dynamic baseline verify" },
  { id: 15, tier: "Bottom Row", name: "All Alpha Keys Check", text: "the quick brown fox jumps over the lazy dog cleanly" },

  // 16-20: Numbers & symbols
  { id: 16, tier: "Numbers & Symbols", name: "Number Row (1-5)", text: "12345 12345 54321 54321 1 2 3 4 5 12 34 51 25" },
  { id: 17, tier: "Numbers & Symbols", name: "Number Row (6-0)", text: "67890 67890 09876 09876 6 7 8 9 0 67 89 06 70" },
  { id: 18, tier: "Numbers & Symbols", name: "Brackets & Delimiters", text: "[] {} () <> [] {} () (array[0]) {key: value} <Tag />" },
  { id: 19, tier: "Numbers & Symbols", name: "Math & Operators", text: "x = y + 1; a * b / c; count += 10; is_valid && !done;" },
  { id: 20, tier: "Numbers & Symbols", name: "Symbols Milestone", text: "const total = (base * 1.18) + (items[i]?.tax || 0);" },

  // 21-25: Words & developer syntax
  { id: 21, tier: "Code Syntax", name: "Control Flow Keywords", text: "if else for while switch case break return throw try catch" },
  { id: 22, tier: "Code Syntax", name: "Variable Declarations", text: "const let var final static public private readonly async await" },
  { id: 23, tier: "Code Syntax", name: "Common Data Types", text: "string number boolean object array promise map set bigint symbol" },
  { id: 24, tier: "Code Syntax", name: "Naming Conventions", text: "camelCase PascalCase snake_case UPPER_SNAKE kebab-case" },
  { id: 25, tier: "Code Syntax", name: "Arrow Functions & Lambdas", text: "const compute = (x, y) => Math.sqrt(x ** 2 + y ** 2);" },

  // 26-30: Real-world developer fluency
  { id: 26, tier: "Code Fluency", name: "TypeScript Interface", text: "interface SessionState {\n  wpm: number;\n  accuracy: number;\n  isDone: boolean;\n}" },
  { id: 27, tier: "Code Fluency", name: "Python List Comprehension", text: "clean_tokens = [tok.strip().lower() for tok in text.split(' ') if len(tok) > 2]" },
  { id: 28, tier: "Code Fluency", name: "SQL Aggregate Query", text: "SELECT mode, AVG(wpm) as speed, COUNT(*) as sessions FROM runs GROUP BY mode;" },
  { id: 29, tier: "Code Fluency", name: "React Custom Hook", text: "function useDebounce(value, delay) {\n  const [debounced, setDebounced] = useState(value);\n  return debounced;\n}" },
  { id: 30, tier: "Code Fluency", name: "Grandmaster Code Fluency", text: "export async function handleStream(req, res) {\n  const chunks = [];\n  for await (const chunk of req) {\n    chunks.push(chunk);\n  }\n  return Buffer.concat(chunks);\n}" }
];

export const tutorials = [
  {
    title: "1. Touch Typing Home Row Anchor",
    subtitle: "The foundation of developer speed",
    content: "Keep your left fingers gently rested on A-S-D-F and right fingers on J-K-L-;. Feel the raised tactile bumps under your index fingers on 'F' and 'J'. Never look down at the keyboard — your hands return to this home position after every keystroke."
  },
  {
    title: "2. Zero-Tension Wrist Posture",
    subtitle: "Prevent RSI and carpal tunnel fatigue",
    content: "Float your wrists slightly above the desk surface rather than planting them firmly against the edge. Keep forearms parallel to the floor at roughly 90 to 100 degrees. Move from the knuckles, not from the wrist joint."
  },
  {
    title: "3. Accuracy Trumps Speed Every Time",
    subtitle: "The cognitive law of muscle memory",
    content: "Typing fast with mistakes forces backspacing, destroying your rhythm and cognitive flow. Slow down to a pace where you hit 95%+ accuracy. Speed naturally compounds as your nervous system automates finger travel paths."
  }
];
