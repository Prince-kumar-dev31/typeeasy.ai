export const fingerColors = {
  'L-Pinky': '#f43f5e',
  'L-Ring': '#fb923c',
  'L-Middle': '#facc15',
  'L-Index': '#4ade80',
  'Thumbs': '#64748b',
  'R-Index': '#38bdf8',
  'R-Middle': '#818cf8',
  'R-Ring': '#c084fc',
  'R-Pinky': '#f472b6'
};

export const fingerMap = {
  // Left Pinky
  '`': 'L-Pinky', '~': 'L-Pinky', '1': 'L-Pinky', '!': 'L-Pinky',
  'q': 'L-Pinky', 'Q': 'L-Pinky', 'a': 'L-Pinky', 'A': 'L-Pinky',
  'z': 'L-Pinky', 'Z': 'L-Pinky', 'Tab': 'L-Pinky', 'Caps': 'L-Pinky',
  'Shift_L': 'L-Pinky', 'Ctrl_L': 'L-Pinky',

  // Left Ring
  '2': 'L-Ring', '@': 'L-Ring', 'w': 'L-Ring', 'W': 'L-Ring',
  's': 'L-Ring', 'S': 'L-Ring', 'x': 'L-Ring', 'X': 'L-Ring',

  // Left Middle
  '3': 'L-Middle', '#': 'L-Middle', 'e': 'L-Middle', 'E': 'L-Middle',
  'd': 'L-Middle', 'D': 'L-Middle', 'c': 'L-Middle', 'C': 'L-Middle',

  // Left Index
  '4': 'L-Index', '$': 'L-Index', '5': 'L-Index', '%': 'L-Index',
  'r': 'L-Index', 'R': 'L-Index', 't': 'L-Index', 'T': 'L-Index',
  'f': 'L-Index', 'F': 'L-Index', 'g': 'L-Index', 'G': 'L-Index',
  'v': 'L-Index', 'V': 'L-Index', 'b': 'L-Index', 'B': 'L-Index',

  // Thumbs
  ' ': 'Thumbs', 'Space': 'Thumbs', 'Alt': 'Thumbs',

  // Right Index
  '6': 'R-Index', '^': 'R-Index', '7': 'R-Index', '&': 'R-Index',
  'y': 'R-Index', 'Y': 'R-Index', 'u': 'R-Index', 'U': 'R-Index',
  'h': 'R-Index', 'H': 'R-Index', 'j': 'R-Index', 'J': 'R-Index',
  'n': 'R-Index', 'N': 'R-Index', 'm': 'R-Index', 'M': 'R-Index',

  // Right Middle
  '8': 'R-Middle', '*': 'R-Middle', 'i': 'R-Middle', 'I': 'R-Middle',
  'k': 'R-Middle', 'K': 'R-Middle', ',': 'R-Middle', '<': 'R-Middle',

  // Right Ring
  '9': 'R-Ring', '(': 'R-Ring', 'o': 'R-Ring', 'O': 'R-Ring',
  'l': 'R-Ring', 'L': 'R-Ring', '.': 'R-Ring', '>': 'R-Ring',

  // Right Pinky
  '0': 'R-Pinky', ')': 'R-Pinky', '-': 'R-Pinky', '_': 'R-Pinky',
  '=': 'R-Pinky', '+': 'R-Pinky', 'Backspace': 'R-Pinky',
  'p': 'R-Pinky', 'P': 'R-Pinky', '[': 'R-Pinky', '{': 'R-Pinky',
  ']': 'R-Pinky', '}': 'R-Pinky', '\\': 'R-Pinky', '|': 'R-Pinky',
  ';': 'R-Pinky', ':': 'R-Pinky', "'": 'R-Pinky', '"': 'R-Pinky',
  'Enter': 'R-Pinky', '/': 'R-Pinky', '?': 'R-Pinky',
  'Shift_R': 'R-Pinky', 'Ctrl_R': 'R-Pinky'
};

export const keyRows = [
  ['`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'Backspace'],
  ['Tab', 'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']', '\\'],
  ['Caps', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', "'", 'Enter'],
  ['Shift', 'z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '/', 'Shift'],
  ['Ctrl', 'Alt', ' ', ' ', ' ', ' ', ' ', ' ', 'Alt', 'Ctrl']
];
