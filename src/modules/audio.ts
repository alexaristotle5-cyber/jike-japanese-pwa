import { assetPath } from "./assets";
import { getSettings, saveSettings } from "./storage";

export class AudioController {
  private readonly backgroundAudio = new Audio(assetPath("assets/audio/background-music.mp3"));
  private currentSentenceAudio?: HTMLAudioElement;

  constructor() {
    this.backgroundAudio.loop = true;
    this.backgroundAudio.volume = 0.38;
  }

  isMusicEnabled(): boolean {
    return getSettings().musicEnabled;
  }

  async syncMusic(): Promise<void> {
    if (!this.isMusicEnabled()) {
      this.backgroundAudio.pause();
      return;
    }

    try {
      await this.backgroundAudio.play();
    } catch {
      const settings = getSettings();
      saveSettings({
        ...settings,
        musicEnabled: false,
      });
    }
  }

  async toggleMusic(): Promise<boolean> {
    const nextEnabled = !this.isMusicEnabled();
    saveSettings({
      ...getSettings(),
      musicEnabled: nextEnabled,
    });

    await this.syncMusic();
    return this.isMusicEnabled();
  }

  async playSentence(src: string): Promise<void> {
    if (this.currentSentenceAudio) {
      this.currentSentenceAudio.pause();
      this.currentSentenceAudio.currentTime = 0;
    }

    this.currentSentenceAudio = new Audio(src.startsWith("/") ? assetPath(src) : src);
    this.currentSentenceAudio.volume = 0.95;
    await this.currentSentenceAudio.play();
  }
}
