/**
 * Dreamy Web Audio synthesizer for background birthday chimes / music-box
 * Used as a zero-dependency fallback whenever local audio file isn't present or fails.
 */
class DreamyAudioEngine {
  private ctx: AudioContext | null = null;
  private isPlaying: boolean = false;
  private timer: number | null = null;
  private noteIndex: number = 0;

  // Soft pentatonic dreamy notes (Hz)
  // C5, D5, E5, G5, A5, C6, B5, G5, E5, A5, G5, E5, D5, C5
  private melody = [
    { freq: 523.25, dur: 0.6 }, // C5
    { freq: 523.25, dur: 0.4 }, // C5
    { freq: 587.33, dur: 0.9 }, // D5
    { freq: 523.25, dur: 0.9 }, // C5
    { freq: 698.46, dur: 0.9 }, // F5
    { freq: 659.25, dur: 1.6 }, // E5
    
    { freq: 523.25, dur: 0.6 }, // C5
    { freq: 523.25, dur: 0.4 }, // C5
    { freq: 587.33, dur: 0.9 }, // D5
    { freq: 523.25, dur: 0.9 }, // C5
    { freq: 783.99, dur: 0.9 }, // G5
    { freq: 698.46, dur: 1.6 }, // F5

    { freq: 523.25, dur: 0.6 }, // C5
    { freq: 523.25, dur: 0.4 }, // C5
    { freq: 1046.50, dur: 0.9 }, // C6
    { freq: 880.00, dur: 0.9 }, // A5
    { freq: 698.46, dur: 0.9 }, // F5
    { freq: 659.25, dur: 0.9 }, // E5
    { freq: 587.33, dur: 1.6 }, // D5

    { freq: 932.33, dur: 0.6 }, // Bb5
    { freq: 932.33, dur: 0.4 }, // Bb5
    { freq: 880.00, dur: 0.9 }, // A5
    { freq: 698.46, dur: 0.9 }, // F5
    { freq: 783.99, dur: 0.9 }, // G5
    { freq: 698.46, dur: 2.2 }, // F5
  ];

  private initContext() {
    if (!this.ctx) {
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioContextClass();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  private playTone(freq: number, duration: number) {
    if (!this.ctx || !this.isPlaying) return;

    try {
      const now = this.ctx.currentTime;

      // Primary gentle sine wave (music box / celesta)
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      // Harmonic chime
      const osc2 = this.ctx.createOscillator();
      const gain2 = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now);

      osc2.type = 'triangle';
      osc2.frequency.setValueAtTime(freq * 2, now);

      // Soft envelope (gentle attack, dreamy decay)
      gain.gain.setValueAtTime(0.0001, now);
      gain.gain.exponentialRampToValueAtTime(0.12, now + 0.08);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + duration * 1.5);

      gain2.gain.setValueAtTime(0.0001, now);
      gain2.gain.exponentialRampToValueAtTime(0.03, now + 0.05);
      gain2.gain.exponentialRampToValueAtTime(0.0001, now + duration * 0.9);

      osc.connect(gain);
      osc2.connect(gain2);

      gain.connect(this.ctx.destination);
      gain2.connect(this.ctx.destination);

      osc.start(now);
      osc2.start(now);

      osc.stop(now + duration * 1.6);
      osc2.stop(now + duration * 1.6);
    } catch {
      // Audio fallback safe
    }
  }

  private step = () => {
    if (!this.isPlaying) return;
    const note = this.melody[this.noteIndex];
    this.playTone(note.freq, note.dur);

    this.noteIndex = (this.noteIndex + 1) % this.melody.length;
    const delay = (note.dur * 850) + (this.noteIndex === 0 ? 1200 : 0);
    this.timer = window.setTimeout(this.step, delay);
  };

  public start() {
    if (this.isPlaying) return;
    this.initContext();
    this.isPlaying = true;
    this.noteIndex = 0;
    this.step();
  }

  public stop() {
    this.isPlaying = false;
    if (this.timer) {
      clearTimeout(this.timer);
      this.timer = null;
    }
  }

  public getActive(): boolean {
    return this.isPlaying;
  }
}

export const dreamyAudio = new DreamyAudioEngine();
