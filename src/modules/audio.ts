import { assetPath } from "./assets";
import { getSettings, saveSettings } from "./storage";

export class AudioController {
  private readonly backgroundAudio = new Audio(assetPath("assets/audio/background-music.mp3"));
  private currentSentenceAudio?: HTMLAudioElement;
  private pendingUnlockCleanup?: () => void;

  constructor() {
    this.backgroundAudio.loop = true;
    this.backgroundAudio.preload = "auto";
    this.backgroundAudio.volume = 0.38;
  }

  isMusicEnabled(): boolean {
    return getSettings().musicEnabled;
  }

  async syncMusic(): Promise<boolean> {
    if (!this.isMusicEnabled()) {
      this.stopBackgroundMusic();
      return false;
    }

    return this.playBackgroundMusic();
  }

  private async playBackgroundMusic(): Promise<boolean> {
    try {
      await this.backgroundAudio.play();
      this.clearUnlockRetry();
      return true;
    } catch {
      this.installUnlockRetry();
      return false;
    }
  }

  async toggleMusic(): Promise<boolean> {
    const nextEnabled = !this.isMusicEnabled();
    saveSettings({
      ...getSettings(),
      musicEnabled: nextEnabled,
    });

    if (!nextEnabled) {
      this.stopBackgroundMusic();
      return false;
    }

    await this.playBackgroundMusic();
    return true;
  }

  private stopBackgroundMusic(): void {
    this.clearUnlockRetry();
    this.backgroundAudio.pause();
  }

  private installUnlockRetry(): void {
    if (this.pendingUnlockCleanup) {
      return;
    }

    const retry = (): void => {
      this.clearUnlockRetry();
      void this.syncMusic();
    };
    const options: AddEventListenerOptions = { capture: true };

    window.addEventListener("pointerdown", retry, options);
    window.addEventListener("keydown", retry, options);
    window.addEventListener("touchstart", retry, options);

    this.pendingUnlockCleanup = () => {
      window.removeEventListener("pointerdown", retry, options);
      window.removeEventListener("keydown", retry, options);
      window.removeEventListener("touchstart", retry, options);
    };
  }

  private clearUnlockRetry(): void {
    this.pendingUnlockCleanup?.();
    this.pendingUnlockCleanup = undefined;
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
