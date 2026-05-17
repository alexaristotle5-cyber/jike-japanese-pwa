import {
  getCloudSyncState,
  signInWithEmail,
  signOut,
  subscribeCloudSyncState,
  syncNow,
} from "../modules/cloudSync";
import { assetPath } from "../modules/assets";
import { navigate } from "../modules/router";
import { getSyncMeta } from "../modules/storage";
import type { CloudSyncState } from "../types/sync";

function formatTime(value?: string): string {
  if (!value) {
    return "尚未同步";
  }

  return new Intl.DateTimeFormat("zh-CN", {
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(value));
}

function statusText(state: CloudSyncState): string {
  if (!state.configured) {
    return "未配置";
  }

  if (state.status === "signed-out") {
    return "未登录";
  }

  if (state.status === "syncing") {
    return "同步中";
  }

  if (state.status === "synced") {
    return "已同步";
  }

  if (state.status === "pending") {
    return "待同步";
  }

  return "同步异常";
}

export function createAccountView(): HTMLElement {
  const root = document.createElement("main");
  root.className = "screen settings-screen account-screen";

  function renderState(state: CloudSyncState = getCloudSyncState()): void {
    const meta = getSyncMeta();
    root.innerHTML = `
      <header class="top-bar">
        <button class="icon-button" data-action="back" aria-label="返回设置">
          <img src="${assetPath("assets/icons/back.png")}" alt="" />
        </button>
        <div class="top-title">账号同步</div>
        <span class="top-spacer"></span>
      </header>
      <section class="settings-panel account-panel">
        <div class="account-card">
          <h1>${statusText(state)}</h1>
          <p>${state.message}</p>
          <dl>
            <div><dt>账号</dt><dd>${state.userEmail ?? "未登录"}</dd></div>
            <div><dt>本地状态</dt><dd>${state.pendingSync || meta.pendingSync ? "有待同步进度" : "无待同步进度"}</dd></div>
            <div><dt>上次同步</dt><dd>${formatTime(state.lastSyncedAt ?? meta.lastSyncedAt)}</dd></div>
          </dl>
          ${
            state.configured
              ? `
                <form class="account-form" data-action="login">
                  <input name="email" type="email" inputmode="email" autocomplete="email" placeholder="邮箱地址" />
                  <button class="settings-row" type="submit">
                    <span>发送登录链接</span>
                    <strong>登录</strong>
                  </button>
                </form>
                <button class="settings-row" data-action="sync">
                  <span>立即同步</span>
                  <strong>同步</strong>
                </button>
                <button class="settings-row" data-action="signout">
                  <span>退出账号</span>
                  <strong>退出</strong>
                </button>
              `
              : `
                <p class="account-note">请先在环境变量中配置 VITE_SUPABASE_URL 与 VITE_SUPABASE_ANON_KEY。</p>
              `
          }
        </div>
      </section>
    `;

    root.querySelector<HTMLButtonElement>('[data-action="back"]')?.addEventListener("click", () => {
      navigate("settings");
    });

    root.querySelector<HTMLFormElement>('[data-action="login"]')?.addEventListener("submit", async (event) => {
      event.preventDefault();
      const form = event.currentTarget;
      if (!(form instanceof HTMLFormElement)) {
        return;
      }

      const formData = new FormData(form);
      const email = String(formData.get("email") ?? "").trim();
      if (!email) {
        return;
      }

      try {
        await signInWithEmail(email);
        renderState({
          ...getCloudSyncState(),
          message: "登录邮件已发送，请在邮箱中确认",
        });
      } catch (error) {
        renderState({
          ...getCloudSyncState(),
          status: "error",
          message: error instanceof Error ? error.message : "发送失败",
        });
      }
    });

    root.querySelector<HTMLButtonElement>('[data-action="sync"]')?.addEventListener("click", () => {
      void syncNow();
    });

    root.querySelector<HTMLButtonElement>('[data-action="signout"]')?.addEventListener("click", () => {
      void signOut();
    });
  }

  const unsubscribe = subscribeCloudSyncState(renderState);
  const observer = new MutationObserver(() => {
    if (document.body.contains(root)) {
      return;
    }

    unsubscribe();
    observer.disconnect();
  });
  observer.observe(document.body, { childList: true, subtree: true });
  renderState();
  return root;
}
