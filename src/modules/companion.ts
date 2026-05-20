const COMPANION_KEY = "shikoku-japanese.companionState";
const INTRO_REQUEST_KEY = "shikoku-japanese.introRequested";

export type CompanionState = {
  introVideoSeen: boolean;
  introVideoPlayedAt?: string;
  learningActionCount: number;
  pendingRewardCount: number;
  lastRewardUnlockedAt?: string;
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

  return {
    ...defaultCompanionState,
    ...stored,
    introVideoSeen,
  };
}

function saveCompanionState(state: CompanionState): CompanionState {
  const nextState = {
    ...state,
    learningActionCount: Math.max(0, state.learningActionCount),
    pendingRewardCount: Math.max(0, state.pendingRewardCount),
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
  const rewardUnlocked = learningActionCount % 10 === 0;

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

export function requestIntroVideoOnNextStudy(): void {
  sessionStorage.setItem(INTRO_REQUEST_KEY, "1");
}

export function consumeIntroVideoRequest(): boolean {
  const requested = sessionStorage.getItem(INTRO_REQUEST_KEY) === "1";
  sessionStorage.removeItem(INTRO_REQUEST_KEY);
  return requested;
}
