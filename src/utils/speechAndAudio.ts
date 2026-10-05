import { LanguageCode } from '../types';

class SoundEffectsManager {
  private ctx: AudioContext | null = null;
  public isMuted: boolean = false;

  private getContext(): AudioContext | null {
    if (typeof window === 'undefined') return null;
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
    return this.ctx;
  }

  playBeep(frequency: number = 880, durationMs: number = 150, type: OscillatorType = 'sine') {
    if (this.isMuted) return;
    try {
      const ctx = this.getContext();
      if (!ctx) return;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(frequency, ctx.currentTime);
      gain.gain.setValueAtTime(0.15, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + durationMs / 1000);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + durationMs / 1000);
    } catch {
      // Audio autoplay policy fallback
    }
  }

  playSuccessChime() {
    if (this.isMuted) return;
    this.playBeep(523.25, 100); // C5
    setTimeout(() => this.playBeep(659.25, 120), 100); // E5
    setTimeout(() => this.playBeep(783.99, 200), 220); // G5
  }

  playObstacleWarning() {
    if (this.isMuted) return;
    this.playBeep(440, 100, 'triangle');
    setTimeout(() => this.playBeep(440, 100, 'triangle'), 150);
  }

  playEmergencySiren() {
    if (this.isMuted) return;
    this.playBeep(950, 180, 'sawtooth');
    setTimeout(() => this.playBeep(650, 180, 'sawtooth'), 200);
    setTimeout(() => this.playBeep(950, 180, 'sawtooth'), 400);
  }
}

export const soundEffects = new SoundEffectsManager();

export const speakNotification = (text: string, language: LanguageCode = 'en') => {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
  if (soundEffects.isMuted) return;

  try {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    
    // Map language to BCP-47 tag
    const langMap: Record<LanguageCode, string> = {
      en: 'en-IN',
      te: 'te-IN',
      hi: 'hi-IN',
      ta: 'ta-IN',
      kn: 'kn-IN',
      ml: 'ml-IN',
      mr: 'mr-IN',
      bn: 'bn-IN',
    };
    utterance.lang = langMap[language] || 'en-IN';
    utterance.rate = 0.95;
    utterance.pitch = 1.0;

    // Pick best available voice if browser supports it
    const voices = window.speechSynthesis.getVoices();
    const preferredVoice = voices.find(v => v.lang.startsWith(langMap[language])) ||
                           voices.find(v => v.lang.includes('IN')) ||
                           voices[0];
    if (preferredVoice) {
      utterance.voice = preferredVoice;
    }

    window.speechSynthesis.speak(utterance);
  } catch {
    // Ignore speech synthesis failures
  }
};
