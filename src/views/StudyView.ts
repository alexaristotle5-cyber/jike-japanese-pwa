import { sentences } from "../data/sentences";
import type { RewardVideo } from "../data/rewardVideos";
import type { AudioController } from "../modules/audio";
import { assetPath } from "../modules/assets";
import {
  consumeIntroVideoRequest,
  getClaimableRewardCount,
  getCompanionState,
  markIntroVideoSeen,
  markRewardVideoPlayed,
  pickRandomRewardVideo,
  recordLearningAction,
  type CompanionState,
} from "../modules/companion";
import { navigate } from "../modules/router";
import { rateSentence } from "../modules/reviewScheduler";
import { clearActiveStudySession, getActiveStudySession, getDueSentenceIds } from "../modules/storage";
import type { SentenceStudyItem, StudyMode } from "../types/sentence";
import type { Rating, StudySessionKind } from "../types/review";

function shuffle<T>(items: T[]): T[] {
  const copy = [...items];
  for (let index = copy.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    [copy[index], copy[swapIndex]] = [copy[swapIndex], copy[index]];
  }

  return copy;
}

function pickMode(): StudyMode {
  return Math.random() > 0.5 ? "visual-recall" : "listening-reverse";
}

function getQueue(kind: StudySessionKind): { items: SentenceStudyItem[]; title: string; completionCopy: string } {
  if (kind === "review") {
    const dueIds = new Set(getDueSentenceIds());
    const dueItems = sentences.filter((sentence) => dueIds.has(sentence.id));
    return {
      items: dueItems,
      title: "复习",
      completionCopy: "今天到期的句子已经处理完。",
    };
  }

  const activeSession = getActiveStudySession();
  if (activeSession) {
    const selected = activeSession.sentenceIds
      .map((id) => sentences.find((sentence) => sentence.id === id))
      .filter((sentence): sentence is SentenceStudyItem => Boolean(sentence));
    if (selected.length > 0) {
      return {
        items: selected,
        title: activeSession.title,
        completionCopy: `${selected.length} 条句子已经完成一轮主动回忆。`,
      };
    }
  }

  const shuffled = shuffle(sentences);
  return {
    items: shuffled,
    title: "学习",
    completionCopy: `${shuffled.length} 条句子已经完成一轮主动回忆。`,
  };
}

function renderList(items: string[]): string {
  return items.map((item) => `<li>${item}</li>`).join("");
}

function getRatingText(rating: Rating): string {
  if (rating === "again") {
    return "完全不会";
  }

  if (rating === "fuzzy") {
    return "模糊";
  }

  return "会";
}

type CompanionVideoKind = "intro" | "reward";

type CompanionDialog = {
  kind: CompanionVideoKind;
  mode: "gift" | "player";
  autoplay: boolean;
  message?: string;
  rewardVideo?: RewardVideo;
  rewardConsumed?: boolean;
};

const introVideo = {
  title: "老师介绍",
  src: assetPath("assets/videos/teacher-intro.mp4"),
  playLabel: "播放介绍",
};

export function createStudyView(kind: StudySessionKind, audio: AudioController): HTMLElement {
  const root = document.createElement("main");
  root.className = "screen study-screen";

  const sessionQueue = getQueue(kind);
  const queue = sessionQueue.items;
  let companionState: CompanionState = getCompanionState();
  let companionDialog: CompanionDialog | null = null;
  let index = 0;
  let mode = pickMode();
  let sentenceVisible = mode === "visual-recall";
  let analysisOpen = false;
  let hintOpen = false;
  let audioMessage = "";

  function resetCardState(): void {
    mode = pickMode();
    sentenceVisible = mode === "visual-recall";
    analysisOpen = false;
    hintOpen = false;
    audioMessage = "";
  }

  function openIntroVideo(autoplay = false): void {
    companionDialog = {
      kind: "intro",
      mode: "player",
      autoplay,
    };
    renderCard();
  }

  function openRewardGift(): void {
    if (getClaimableRewardCount(companionState) <= 0) {
      return;
    }

    companionDialog = {
      kind: "reward",
      mode: "gift",
      autoplay: false,
    };
    renderCard();
  }

  function openRewardVideo(): void {
    const rewardVideo = pickRandomRewardVideo(companionState);
    if (!rewardVideo) {
      companionDialog = {
        kind: "reward",
        mode: "gift",
        autoplay: false,
        message: "现在没有可播放的新视频奖励。",
      };
      renderCard();
      return;
    }

    companionDialog = {
      kind: "reward",
      mode: "player",
      autoplay: true,
      rewardVideo,
      rewardConsumed: false,
    };
    renderCard();
  }

  function closeCompanionDialog(): void {
    companionDialog = null;
    audio.resumeBackgroundAfterMedia();
    renderCard();
  }

  function playCompanionVideo(): void {
    const video = root.querySelector<HTMLVideoElement>("[data-companion-video]");
    if (!video || !companionDialog) {
      return;
    }

    audio.pauseBackgroundForMedia();
    video
      .play()
      .then(() => {
        if (companionDialog) {
          companionDialog.message = "";
        }
      })
      .catch(() => {
        if (companionDialog) {
          companionDialog.message = "如果视频没有自动播放，请点视频控件或下方按钮。";
          renderCard();
        }
      });
  }

  function scheduleCompanionAutoplay(): void {
    if (!companionDialog || companionDialog.mode !== "player" || !companionDialog.autoplay) {
      return;
    }

    companionDialog.autoplay = false;
    window.setTimeout(() => {
      playCompanionVideo();
    }, 0);
  }

  function renderCompanionControls(): string {
    if (kind !== "learn") {
      return "";
    }

    const claimableRewardCount = getClaimableRewardCount(companionState);
    return `
      <section class="companion-actions" aria-label="老师陪伴">
        <button class="teacher-video-button" data-action="teacher-video">老师介绍</button>
        ${
          claimableRewardCount > 0
            ? `<button class="reward-chip" data-action="open-reward">领取奖励${
                claimableRewardCount > 1 ? ` ${claimableRewardCount}` : ""
              }</button>`
            : ""
        }
      </section>
    `;
  }

  function renderCompanionDialog(): string {
    if (!companionDialog) {
      return "";
    }

    if (companionDialog.mode === "gift") {
      const claimableRewardCount = getClaimableRewardCount(companionState);
      return `
        <section class="companion-overlay" data-action="video-backdrop" role="dialog" aria-modal="true" aria-label="陪伴奖励">
          <div class="gift-dialog">
            <button class="video-close-button" data-action="close-video" aria-label="关闭">×</button>
            <div class="gift-box" aria-hidden="true">
              <span class="gift-box__lid"></span>
              <span class="gift-box__body"></span>
              <span class="gift-box__ribbon"></span>
            </div>
            <p class="gift-eyebrow">老师奖励</p>
            <h2>${claimableRewardCount > 1 ? `新的陪伴礼盒 × ${claimableRewardCount}` : "新的陪伴礼盒"}</h2>
            <p>${companionDialog.message ?? "每完成 10 次学习，就会多一个随机视频奖励。"}</p>
            <button class="gift-play-button" data-action="open-reward-video">立即播放</button>
            <button class="video-secondary-button" data-action="close-video">稍后领取</button>
          </div>
        </section>
      `;
    }

    const video =
      companionDialog.kind === "intro"
        ? introVideo
        : companionDialog.rewardVideo
          ? {
              title: companionDialog.rewardVideo.title,
              src: assetPath(companionDialog.rewardVideo.src),
              playLabel: "播放奖励",
            }
          : null;
    if (!video) {
      return "";
    }

    return `
      <section class="companion-overlay" data-action="video-backdrop" role="dialog" aria-modal="true" aria-label="${video.title}">
        <div class="video-dialog">
          <button class="video-close-button" data-action="close-video" aria-label="关闭">×</button>
          <div class="video-dialog__title">
            <span>${companionDialog.kind === "intro" ? "老师陪伴" : "视频奖励"}</span>
            <strong>${video.title}</strong>
          </div>
          <video data-companion-video src="${video.src}" playsinline controls preload="metadata"></video>
          ${companionDialog.message ? `<p class="video-message">${companionDialog.message}</p>` : ""}
          <button class="video-play-button" data-action="video-play">${video.playLabel}</button>
        </div>
      </section>
    `;
  }

  function bindCompanionEvents(): void {
    root.querySelector<HTMLButtonElement>('[data-action="teacher-video"]')?.addEventListener("click", () => {
      openIntroVideo(false);
    });

    root.querySelector<HTMLButtonElement>('[data-action="open-reward"]')?.addEventListener("click", () => {
      openRewardGift();
    });

    root.querySelector<HTMLButtonElement>('[data-action="open-reward-video"]')?.addEventListener("click", () => {
      openRewardVideo();
    });

    root.querySelector<HTMLButtonElement>('[data-action="video-play"]')?.addEventListener("click", () => {
      playCompanionVideo();
    });

    root.querySelectorAll<HTMLButtonElement>('[data-action="close-video"]').forEach((button) => {
      button.addEventListener("click", () => {
        closeCompanionDialog();
      });
    });

    root.querySelector<HTMLElement>('[data-action="video-backdrop"]')?.addEventListener("click", (event) => {
      if (event.target === event.currentTarget) {
        closeCompanionDialog();
      }
    });

    const video = root.querySelector<HTMLVideoElement>("[data-companion-video]");
    video?.addEventListener("play", () => {
      audio.pauseBackgroundForMedia();
      if (companionDialog?.kind === "intro" && !companionState.introVideoSeen) {
        companionState = markIntroVideoSeen();
      }
      if (
        companionDialog?.kind === "reward" &&
        companionDialog.rewardVideo &&
        !companionDialog.rewardConsumed
      ) {
        companionState = markRewardVideoPlayed(companionDialog.rewardVideo.id);
        companionDialog.rewardConsumed = true;
      }
    });
    video?.addEventListener("ended", () => {
      companionDialog = null;
      audio.resumeBackgroundAfterMedia();
      renderCard();
    });

    scheduleCompanionAutoplay();
  }

  function renderEmpty(): void {
    root.innerHTML = `
      <header class="top-bar">
        <button class="icon-button" data-action="back" aria-label="返回首页">
          <img src="${assetPath("assets/icons/back.png")}" alt="" />
        </button>
        <div class="top-title">复习</div>
        <span class="top-spacer"></span>
      </header>
      <section class="empty-state">
        <img src="${assetPath("assets/logo/app-logo.png")}" alt="即刻日语" />
        <h1>今日没有到期复习</h1>
        <p>可以继续学习新句子，新的复习会按评分自动排队。</p>
        <button class="image-button image-button--large" data-action="study">
          <span>开始学习</span>
        </button>
      </section>
    `;

    root.querySelector<HTMLButtonElement>('[data-action="back"]')?.addEventListener("click", () => {
      navigate("home");
    });

    root.querySelector<HTMLButtonElement>('[data-action="study"]')?.addEventListener("click", () => {
      navigate("study");
    });
  }

  function renderComplete(): void {
    const title = kind === "review" ? "复习完成" : "本轮学习完成";
    const copy = sessionQueue.completionCopy;
    if (kind === "learn") {
      clearActiveStudySession();
    }

    root.innerHTML = `
      <header class="top-bar">
        <button class="icon-button" data-action="back" aria-label="返回首页">
          <img src="${assetPath("assets/icons/back.png")}" alt="" />
        </button>
        <div class="top-title">${title}</div>
        <span class="top-spacer"></span>
      </header>
      <section class="empty-state">
        <img src="${assetPath("assets/logo/app-logo.png")}" alt="即刻日语" />
        <h1>${title}</h1>
        <p>${copy}</p>
        <button class="image-button image-button--large" data-action="home">
          <span>回到首页</span>
        </button>
      </section>
    `;

    root.querySelector<HTMLButtonElement>('[data-action="back"]')?.addEventListener("click", () => {
      navigate("home");
    });

    root.querySelector<HTMLButtonElement>('[data-action="home"]')?.addEventListener("click", () => {
      navigate("home");
    });
  }

  function renderCard(): void {
    const item = queue[index];
    const isListening = mode === "listening-reverse";
    const progressLabel = `${index + 1} / ${queue.length}`;
    const title = kind === "review" ? "复习" : sessionQueue.title;
    const sentenceContent = sentenceVisible
      ? `
          <p class="sentence-jp">${item.jpSentence}</p>
        `
      : `
          <div class="listening-placeholder">
            <img src="${assetPath("assets/icons/listening-center.png")}" alt="" />
            <p>先听音频，反推这句话</p>
          </div>
        `;

    root.innerHTML = `
      <header class="top-bar">
        <button class="icon-button" data-action="back" aria-label="返回首页">
          <img src="${assetPath("assets/icons/back.png")}" alt="" />
        </button>
        <div class="top-title">
          <span>${title}</span>
          <strong>${progressLabel}</strong>
        </div>
        <button class="icon-button" data-action="hint" aria-label="轻提示">
          <img src="${assetPath("assets/icons/hint.png")}" alt="" />
        </button>
      </header>

      ${renderCompanionControls()}

      <section class="training-card ${isListening ? "training-card--listening" : ""}">
        <div class="mode-badge">${isListening ? "听力反向" : "句子回忆"}</div>
        ${sentenceContent}
        ${audioMessage ? `<p class="audio-message">${audioMessage}</p>` : ""}
      </section>

      <section class="function-row ${isListening ? "function-row--triple" : ""}" aria-label="学习操作">
        <button class="function-button" data-action="play">
          <img src="${assetPath("assets/icons/play.png")}" alt="" />
          <span>播放音频</span>
        </button>
        ${
          isListening
            ? `
              <button class="function-button" data-action="show-sentence">
                <img src="${assetPath("assets/icons/show-sentence.png")}" alt="" />
                <span>显示句子</span>
              </button>
            `
            : ""
        }
        <button class="function-button" data-action="meaning">
          <img src="${assetPath("assets/icons/show-meaning.png")}" alt="" />
          <span>显示含义</span>
        </button>
      </section>

      <section class="rating-row" aria-label="评分">
        <button class="rating-button rating-button--again" data-rating="again">${getRatingText("again")}</button>
        <button class="rating-button rating-button--fuzzy" data-rating="fuzzy">${getRatingText("fuzzy")}</button>
        <button class="rating-button rating-button--known" data-rating="known">${getRatingText("known")}</button>
      </section>

      <section class="analysis-sheet ${analysisOpen ? "is-open" : ""}" aria-hidden="${!analysisOpen}">
        <div class="sheet-handle"></div>
        <div class="analysis-scroll">
          <h2>句子解析</h2>
          <p class="kana-line">${item.kanaSentence}</p>
          <p class="translation-line">${item.cnTranslation}</p>
          <h3>重点单词</h3>
          <ul>${renderList(item.wordNotes)}</ul>
          <h3>语法解析</h3>
          <ul>${renderList(item.grammarNotes)}</ul>
        </div>
      </section>

      ${
        hintOpen
          ? `
            <section class="hint-popover" role="dialog" aria-label="轻提示">
              <button class="hint-close" data-action="close-hint" aria-label="关闭提示">×</button>
              <h2>轻提示</h2>
              <dl>
                <div><dt>第一个假名</dt><dd>${item.hint.firstKana}</dd></div>
                <div><dt>重点词读音</dt><dd>${item.hint.difficultWordReading}</dd></div>
                <div><dt>中文关键词</dt><dd>${item.hint.cnKeyword}</dd></div>
              </dl>
            </section>
          `
          : ""
      }

      ${renderCompanionDialog()}
    `;

    root.querySelector<HTMLButtonElement>('[data-action="back"]')?.addEventListener("click", () => {
      navigate("home");
    });

    root.addEventListener("click", (event) => {
      if (!analysisOpen) {
        return;
      }

      const target = event.target;
      if (!(target instanceof HTMLElement)) {
        return;
      }

      if (target.closest(".analysis-sheet") || target.closest('[data-action="meaning"]')) {
        return;
      }

      if (target.closest(".companion-overlay") || target.closest(".companion-actions")) {
        return;
      }

      analysisOpen = false;
      renderCard();
    });

    root.querySelector<HTMLButtonElement>('[data-action="hint"]')?.addEventListener("click", () => {
      hintOpen = true;
      analysisOpen = false;
      renderCard();
    });

    root.querySelector<HTMLButtonElement>('[data-action="close-hint"]')?.addEventListener("click", () => {
      hintOpen = false;
      renderCard();
    });

    root.querySelector<HTMLButtonElement>('[data-action="play"]')?.addEventListener("click", () => {
      audio
        .playSentence(item.audioSrc)
        .then(() => {
          audioMessage = "";
        })
        .catch(() => {
          audioMessage = "音频暂时无法播放，请稍后再试。";
          renderCard();
        });
    });

    root.querySelector<HTMLButtonElement>('[data-action="show-sentence"]')?.addEventListener("click", () => {
      sentenceVisible = true;
      renderCard();
    });

    root.querySelector<HTMLButtonElement>('[data-action="meaning"]')?.addEventListener("click", () => {
      analysisOpen = true;
      renderCard();
    });

    root.querySelectorAll<HTMLButtonElement>("[data-rating]").forEach((button) => {
      button.addEventListener("click", () => {
        const rating = button.dataset.rating as Rating;
        rateSentence(item.id, rating);
        const rewardUnlocked = kind === "learn" ? recordLearningAction().rewardUnlocked : false;
        companionState = getCompanionState();
        index += 1;

        if (index >= queue.length) {
          renderComplete();
          return;
        }

        resetCardState();
        if (rewardUnlocked) {
          companionDialog = {
            kind: "reward",
            mode: "gift",
            autoplay: false,
          };
        }
        renderCard();
      });
    });

    bindCompanionEvents();
  }

  if (queue.length === 0) {
    renderEmpty();
    return root;
  }

  renderCard();
  const introRequested = consumeIntroVideoRequest();
  if (kind === "learn" && (introRequested || !companionState.introVideoSeen) && !companionState.introVideoSeen) {
    openIntroVideo(true);
  }
  return root;
}
