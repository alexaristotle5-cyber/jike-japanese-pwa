import { rewardVideos, type RewardVideo } from "../data/rewardVideos";

const COMPANION_KEY = "shikoku-japanese.companionState";
const INTRO_REQUEST_KEY = "shikoku-japanese.introRequested";

export type CompanionState = {
  introVideoSeen: boolean;
  introVideoPlayedAt?: string;
  learningActionCount: number;
  pendingRewardCount: number;
  playedRewardVideoIds: string[];
  lastRewardUnlockedAt?: string;
  lastRewardClaimedAt?: string;
  updatedAt: string;
};

type LearningActionResult = {
  state: CompanionState;
  rewardUnlocked: boolean;
};

const defaultCompanionState: CompanionState = {
  introVideoSeen: false,
  learningActionCount: 0,
  pendingRewardCount: 0,
  playedRewardVideoIds: [],
  updatedAt: "1970-01-01T00:00:00.000Z",
};

function nowIso(): string {
  return new Date().toISOString();
}

function parseJson<T>(raw: string | null, fallback: T): T {
  if (!raw) {
    return fallback;
  }

  try {
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

export function getCompanionState(): CompanionState {
  const stored = parseJson<Partial<CompanionState>>(localStorage.getItem(COMPANION_KEY), {});
  const introVideoSeen = Boolean(stored.introVideoSeen && stored.introVideoPlayedAt);
  const playedRewardVideoIds = Array.from(
    new Set(
      (stored.playedRewardVideoIds ?? []).filter((videoId) => rewardVideos.some((video) => video.id === videoId)),
    ),
  );
  const rewardCapacity = Math.max(0, rewardVideos.length - playedRewardVideoIds.length);

  return {
    ...defaultCompanionState,
    ...stored,
    introVideoSeen,
    playedRewardVideoIds,
    pendingRewardCount: Math.min(Math.max(0, stored.pendingRewardCount ?? 0), rewardCapacity),
  };
}

function saveCompanionState(state: CompanionState): CompanionState {
  const nextState = {
    ...state,
    learningActionCount: Math.max(0, state.learningActionCount),
    pendingRewardCount: Math.min(
      Math.max(0, state.pendingRewardCount),
      Math.max(0, rewardVideos.length - state.playedRewardVideoIds.length),
    ),
    playedRewardVideoIds: Array.from(new Set(state.playedRewardVideoIds)),
    updatedAt: nowIso(),
  };
  localStorage.setItem(COMPANION_KEY, JSON.stringify(nextState));
  return nextState;
}

export function markIntroVideoSeen(): CompanionState {
  return saveCompanionState({
    ...getCompanionState(),
    introVideoSeen: true,
    introVideoPlayedAt: nowIso(),
  });
}

export function recordLearningAction(): LearningActionResult {
  const state = getCompanionState();
  const learningActionCount = state.learningActionCount + 1;
  const rewardSlotCount = state.pendingRewardCount + state.playedRewardVideoIds.length;
  const rewardUnlocked = learningActionCount % 10 === 0 && rewardSlotCount < rewardVideos.length;

  return {
    state: saveCompanionState({
      ...state,
      learningActionCount,
      pendingRewardCount: state.pendingRewardCount + (rewardUnlocked ? 1 : 0),
      lastRewardUnlockedAt: rewardUnlocked ? nowIso() : state.lastRewardUnlockedAt,
    }),
    rewardUnlocked,
  };
}

export function consumePendingReward(): CompanionState {
  const state = getCompanionState();
  return saveCompanionState({
    ...state,
    pendingRewardCount: Math.max(0, state.pendingRewardCount - 1),
  });
}

export function getClaimableRewardCount(state = getCompanionState()): number {
  const unplayedCount = rewardVideos.length - state.playedRewardVideoIds.length;
  return Math.min(state.pendingRewardCount, Math.max(0, unplayedCount));
}

export function pickRandomRewardVideo(state = getCompanionState()): RewardVideo | null {
  if (getClaimableRewardCount(state) <= 0) {
    return null;
  }

  const played = new Set(state.playedRewardVideoIds);
  const availableVideos = rewardVideos.filter((video) => !played.has(video.id));
  if (availableVideos.length === 0) {
    return null;
  }

  return availableVideos[Math.floor(Math.random() * availableVideos.length)];
}

export function markRewardVideoPlayed(videoId: string): CompanionState {
  const state = getCompanionState();
  if (state.playedRewardVideoIds.includes(videoId)) {
    return state;
  }

  return saveCompanionState({
    ...state,
    pendingRewardCount: Math.max(0, state.pendingRewardCount - 1),
    playedRewardVideoIds: [...state.playedRewardVideoIds, videoId],
    lastRewardClaimedAt: nowIso(),
  });
}

export function requestIntroVideoOnNextStudy(): void {
  sessionStorage.setItem(INTRO_REQUEST_KEY, "1");
}

export function consumeIntroVideoRequest(): boolean {
  const requested = sessionStorage.getItem(INTRO_REQUEST_KEY) === "1";
  sessionStorage.removeItem(INTRO_REQUEST_KEY);
  return requested;
}
