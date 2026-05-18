import type { AudioController } from "../modules/audio";
import { assetPath } from "../modules/assets";
import { navigate } from "../modules/router";
import { clearProgress } from "../modules/storage";

export function createSettingsView(audio: AudioController): HTMLElement {
  const root = document.createElement("main");
  root.className = "screen settings-screen";

  root.innerHTML = `
    <header class="top-bar">
      <button class="icon-button" data-action="back" aria-label="返回首页">
        <img src="${assetPath("assets/icons/back.png")}" alt="" />
      </button>
      <div class="top-title">设置</div>
      <span class="top-spacer"></span>
    </header>
    <section class="settings-panel">
      <img class="settings-logo" src="${assetPath("assets/logo/app-logo.png")}" alt="即刻日语" />
      <div class="settings-list">
        <button class="settings-row" data-action="music">
          <span>背景音乐</span>
          <strong>${audio.isMusicEnabled() ? "开" : "关"}</strong>
        </button>
        <button class="settings-row" data-action="account">
          <span>账号同步</span>
          <strong>登录</strong>
        </button>
        <button class="settings-row settings-row--danger" data-action="clear">
          <span>清空学习记录</span>
          <strong>重置</strong>
        </button>
      </div>
    </section>
  `;

  root.querySelector<HTMLButtonElement>('[data-action="back"]')?.addEventListener("click", () => {
    navigate("home");
  });

  root.querySelector<HTMLButtonElement>('[data-action="music"]')?.addEventListener("click", async (event) => {
    const target = event.currentTarget;
    if (!(target instanceof HTMLButtonElement)) {
      return;
    }

    const enabled = await audio.toggleMusic();
    const status = target.querySelector("strong");
    if (status) {
      status.textContent = enabled ? "开" : "关";
    }
  });

  root.querySelector<HTMLButtonElement>('[data-action="account"]')?.addEventListener("click", () => {
    navigate("account");
  });

  root.querySelector<HTMLButtonElement>('[data-action="clear"]')?.addEventListener("click", () => {
    const confirmed = window.confirm("确定清空所有学习和复习记录吗？");
    if (!confirmed) {
      return;
    }

    clearProgress();
    navigate("home");
  });

  return root;
}
