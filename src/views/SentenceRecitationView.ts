import { redbook0101To0200 } from "../data/redbook0101To0200";
import type { AudioController } from "../modules/audio";
import { assetPath } from "../modules/assets";
import { requestIntroVideoOnNextStudy } from "../modules/companion";
import { navigate } from "../modules/router";
import { getDueCount, startActiveStudySession } from "../modules/storage";
import type { SentenceStudyItem } from "../types/sentence";
import type { StudySelectionMode } from "../types/review";

const randomStudySize = 25;

function shuffle<T>(items: T[]): T[] {
  const copy = [...items];
  for (let index = copy.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    [copy[index], copy[swapIndex]] = [copy[swapIndex], copy[index]];
  }

  return copy;
}

function takeRandomSentences(size = randomStudySize): SentenceStudyItem[] {
  return shuffle(redbook0101To0200).slice(0, size);
}

function rollDiceSelection(): { roll: number; items: SentenceStudyItem[] } {
  const roll = Math.floor(Math.random() * 6) + 1;
  const rotated = redbook0101To0200.slice(roll - 1).concat(redbook0101To0200.slice(0, roll - 1));
  return {
    roll,
    items: shuffle(rotated).slice(0, randomStudySize),
  };
}

function startSelection(items: SentenceStudyItem[], mode: StudySelectionMode, title: string): void {
  startActiveStudySession(
    items.map((item) => item.id),
    mode,
    title,
  );
  requestIntroVideoOnNextStudy();
  navigate("study");
}

export function createSentenceRecitationView(audio: AudioController): HTMLElement {
  const root = document.createElement("main");
  root.className = "screen study-screen sentence-hub-screen";

  const dueCount = getDueCount();

  root.innerHTML = `
    <header class="top-bar">
      <button class="icon-button" data-action="back" aria-label="返回首页">
        <img src="${assetPath("assets/icons/back.png")}" alt="" />
      </button>
      <div class="top-title">句子背诵</div>
      <button class="music-toggle sentence-music-toggle" data-action="music" aria-pressed="${audio.isMusicEnabled()}">
        <span class="music-dot"></span>
      </button>
    </header>

    <section class="sentence-hub-card">
      <p class="home-kicker">红宝书 N5·N4 · 0101–0200</p>
      <h1>句子背诵</h1>
      <p>红宝书 0101–0200 的主题句集中成一轮短练，先主动回忆，再进入复习节奏。</p>
      <div class="sentence-hub-stats" aria-label="句子统计">
        <span>100 句</span>
        <span>每轮 25 句</span>
        <span>${dueCount} 句待复习</span>
      </div>
    </section>

    <section class="selection-grid" aria-label="选择学习方式">
      <button class="selection-card selection-card--dice" data-action="dice" type="button">
        <span class="dice-face" data-dice-face>⚀</span>
        <strong>摇骰子</strong>
        <small>随机筛出 25 句</small>
      </button>
      <button class="selection-card" data-action="random" type="button">
        <span>25</span>
        <strong>随机 25 句</strong>
        <small>适合每天一轮</small>
      </button>
      <button class="selection-card" data-action="sequential" type="button">
        <span>100</span>
        <strong>顺序背诵</strong>
        <small>完整过一遍</small>
      </button>
      <button class="selection-card" data-action="review" type="button">
        <span>${dueCount}</span>
        <strong>强化复习</strong>
        <small>高风险优先</small>
      </button>
    </section>
  `;

  root.querySelector<HTMLButtonElement>('[data-action="back"]')?.addEventListener("click", () => {
    navigate("home");
  });

  root.querySelector<HTMLButtonElement>('[data-action="dice"]')?.addEventListener("click", () => {
    const selection = rollDiceSelection();
    const diceFace = root.querySelector<HTMLElement>("[data-dice-face]");
    if (diceFace) {
      diceFace.textContent = ["⚀", "⚁", "⚂", "⚃", "⚄", "⚅"][selection.roll - 1];
    }
    window.setTimeout(() => {
      startSelection(selection.items, "dice", `骰子 ${selection.roll} · 25句`);
    }, 180);
  });

  root.querySelector<HTMLButtonElement>('[data-action="random"]')?.addEventListener("click", () => {
    startSelection(takeRandomSentences(), "random", "随机 25句");
  });

  root.querySelector<HTMLButtonElement>('[data-action="sequential"]')?.addEventListener("click", () => {
    startSelection(redbook0101To0200, "sequential", "0101–0200 顺序");
  });

  root.querySelector<HTMLButtonElement>('[data-action="review"]')?.addEventListener("click", () => {
    navigate("review");
  });

  root.querySelector<HTMLButtonElement>('[data-action="music"]')?.addEventListener("click", async (event) => {
    const button = event.currentTarget;
    if (!(button instanceof HTMLButtonElement)) {
      return;
    }

    const enabled = await audio.toggleMusic();
    button.setAttribute("aria-pressed", String(enabled));
  });

  return root;
}
