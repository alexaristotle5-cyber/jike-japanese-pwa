import { sentences } from "../data/sentences";
import type { AudioController } from "../modules/audio";
import { assetPath } from "../modules/assets";
import { navigate } from "../modules/router";
import { getDueCount, getLearnedCount } from "../modules/storage";

function setupSoftLoopVideo(root: HTMLElement): void {
  const videos = Array.from(root.querySelectorAll<HTMLVideoElement>(".home-bg-video"));
  if (videos.length < 2) {
    return;
  }

  const fadeSeconds = 0.65;
  let activeIndex = 0;
  let switching = false;

  videos.forEach((video, index) => {
    video.muted = true;
    video.loop = false;
    video.playsInline = true;
    video.preload = "auto";
    video.classList.toggle("is-active", index === activeIndex);
  });

  function handleTimeUpdate(): void {
    const current = videos[activeIndex];
    if (switching || !Number.isFinite(current.duration) || current.duration <= 0) {
      return;
    }

    if (current.currentTime < current.duration - fadeSeconds) {
      return;
    }

    switching = true;
    const nextIndex = activeIndex === 0 ? 1 : 0;
    const next = videos[nextIndex];
    next.currentTime = 0;
    next.classList.add("is-active");
    next.play().catch(() => undefined);

    window.setTimeout(() => {
      current.pause();
      current.currentTime = 0;
      current.classList.remove("is-active");
      activeIndex = nextIndex;
      switching = false;
    }, fadeSeconds * 1000);
  }

  videos.forEach((video) => {
    video.addEventListener("timeupdate", handleTimeUpdate);
  });

  videos[activeIndex].play().catch(() => {
    // Muted autoplay can still be paused by a browser policy; the poster frame remains as fallback.
  });
}

export function createHomeView(audio: AudioController): HTMLElement {
  const root = document.createElement("main");
  root.className = "screen home-screen";

  const dueCount = getDueCount();
  const learnedCount = getLearnedCount();

  root.innerHTML = `
    <section class="home-panel" aria-label="即刻日语首页">
      <video class="home-bg-video is-active" src="${assetPath("assets/backgrounds/home-bg-loop.mp4")}" muted playsinline preload="auto" aria-hidden="true"></video>
      <video class="home-bg-video" src="${assetPath("assets/backgrounds/home-bg-loop.mp4")}" muted playsinline preload="auto" aria-hidden="true"></video>
      <div class="home-copy">
        <p class="home-kicker">主动回忆 · 听力反推</p>
        <h1>即刻日语</h1>
        <p>已学习 ${learnedCount} / ${sentences.length} 句</p>
      </div>
      <div class="home-actions">
        <button class="image-button image-button--large" data-action="study">
          <span>游戏开始</span>
        </button>
        <button class="image-button image-button--large review-entry" data-action="review">
          <span>复习</span>
          <small>${dueCount} 句</small>
        </button>
        <button class="image-button image-button--large" data-action="settings">
          <span>设置</span>
        </button>
        <button class="music-toggle" data-action="music" aria-pressed="${audio.isMusicEnabled()}">
          <span class="music-dot"></span>
          <span>${audio.isMusicEnabled() ? "音乐开" : "音乐关"}</span>
        </button>
      </div>
    </section>
  `;

  setupSoftLoopVideo(root);

  root.querySelector<HTMLButtonElement>('[data-action="study"]')?.addEventListener("click", () => {
    navigate("sentences");
  });

  root.querySelector<HTMLButtonElement>('[data-action="review"]')?.addEventListener("click", () => {
    navigate("review");
  });

  root.querySelector<HTMLButtonElement>('[data-action="settings"]')?.addEventListener("click", () => {
    navigate("settings");
  });

  root.querySelector<HTMLButtonElement>('[data-action="music"]')?.addEventListener("click", async (event) => {
    const button = event.currentTarget;
    if (!(button instanceof HTMLButtonElement)) {
      return;
    }

    const enabled = await audio.toggleMusic();
    button.setAttribute("aria-pressed", String(enabled));
    const label = button.querySelector("span:last-child");
    if (label) {
      label.textContent = enabled ? "音乐开" : "音乐关";
    }
  });

  return root;
}
