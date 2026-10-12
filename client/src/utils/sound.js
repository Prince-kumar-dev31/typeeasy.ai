// Web Audio API mechanical switch click synthesizer
let audioCtx = null;

export function playKeySound(isMistake = false) {
  try {
    if (!audioCtx) {
      audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }

    const now = audioCtx.currentTime;

    if (isMistake) {
      // Lower pitched thud for wrong key
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(140, now);
      osc.frequency.exponentialRampToValueAtTime(50, now + 0.12);

      gain.gain.setValueAtTime(0.18, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);

      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start(now);
      osc.stop(now + 0.12);
      return;
    }

    // Mechanical switch click: subtle noise burst + snappy pitch drop
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();

    // Randomize pitch slightly (750Hz - 900Hz) for authentic mechanical switch feel
    const baseFreq = 750 + Math.random() * 150;
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(baseFreq, now);
    osc.frequency.exponentialRampToValueAtTime(180, now + 0.045);

    gain.gain.setValueAtTime(0.12, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.045);

    osc.connect(gain);
    gain.connect(audioCtx.destination);
    osc.start(now);
    osc.stop(now + 0.045);

    // High frequency pop
    const popOsc = audioCtx.createOscillator();
    const popGain = audioCtx.createGain();
    popOsc.type = 'sine';
    popOsc.frequency.setValueAtTime(2200, now);
    popOsc.frequency.exponentialRampToValueAtTime(600, now + 0.015);

    popGain.gain.setValueAtTime(0.06, now);
    popGain.gain.exponentialRampToValueAtTime(0.001, now + 0.015);

    popOsc.connect(popGain);
    popGain.connect(audioCtx.destination);
    popOsc.start(now);
    popOsc.stop(now + 0.015);
  } catch {
    // AudioContext blocked or unsupported, silently ignore
  }
}
