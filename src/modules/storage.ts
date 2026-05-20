import { sentences } from "../data/sentences";
import type { LearningState, ReviewRecord, SettingsState } from "../types/review";
import type { LocalProgressSnapshot, SyncMeta } from "../types/sync";

const REVIEW_KEY = "shikoku-japanese.reviewState";
const SETTINGS_KEY = "shikoku-japanese.settings";
const LEARNING_KEY = "shikoku-japanese.learningState";
const SYNC_META_KEY = "shikoku-japanese.syncMeta";

const unitId = "n5-n4-0001-0100";
const epochIso = "1970-01-01T00:00:00.000Z";

const defaultSettings: SettingsState = {
  musicEnabled: false,
  autoPlayAudio: false,
  revealTranslationByDefault: false,
  dailyGoal: 10,
  updatedAt: epochIso,
};

const defaultSyncMeta: SyncMeta = {
  pendingSync: false,
};

function createDefaultLearningState(): LearningState {
  return {
    currentUnit: unitId,
    dailyGoal: defaultSettings.dailyGoal,
    totalLearned: 0,
    totalMastered: 0,
    updatedAt: epochIso,
  };
}

function nowIso(): string {
  return new Date().toISOString();
}

function dispatchLocalChange(): void {
  window.dispatchEvent(new CustomEvent("jkjp:local-progress-change"));
}

export function createDefaultRecord(sentenceId: string): ReviewRecord {
  return {
    sentenceId,
    consecutiveKnownCount: 0,
    totalWrongCount: 0,
    fuzzyCount: 0,
    currentStatus: "new",
    isHighRisk: false,
    updatedAt: epochIso,
    ratingHistory: [],
  };
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

export function getReviewRecords(): Record<string, ReviewRecord> {
  const records = parseJson<Record<string, ReviewRecord>>(localStorage.getItem(REVIEW_KEY), {});
  return Object.fromEntries(
    Object.entries(records).map(([sentenceId, record]) => [
      sentenceId,
      {
        ...createDefaultRecord(sentenceId),
        ...record,
        updatedAt: record.updatedAt ?? record.ratingHistory?.[0]?.reviewedAt ?? record.lastReviewedAt ?? epochIso,
      },
    ]),
  );
}

export function saveReviewRecords(records: Record<string, ReviewRecord>, silent = false): void {
  localStorage.setItem(REVIEW_KEY, JSON.stringify(records));
  if (!silent) {
    markPendingSync();
    dispatchLocalChange();
  }
}

export function getReviewRecord(sentenceId: string): ReviewRecord {
  const records = getReviewRecords();
  return records[sentenceId] ?? createDefaultRecord(sentenceId);
}

export function saveReviewRecord(record: ReviewRecord): void {
  const records = getReviewRecords();
  records[record.sentenceId] = {
    ...record,
    updatedAt: record.updatedAt || nowIso(),
  };
  saveReviewRecords(records);
}

export function getSettings(): SettingsState {
  return {
    ...defaultSettings,
    ...parseJson<Partial<SettingsState>>(localStorage.getItem(SETTINGS_KEY), {}),
  };
}

export function saveSettings(settings: SettingsState, silent = false): void {
  localStorage.setItem(
    SETTINGS_KEY,
    JSON.stringify({
      ...settings,
      updatedAt: silent ? settings.updatedAt || epochIso : nowIso(),
    }),
  );
  if (!silent) {
    markPendingSync();
    dispatchLocalChange();
  }
}

export function getDueSentenceIds(now = new Date()): string[] {
  const records = getReviewRecords();
  const nowTime = now.getTime();

  return sentences
    .filter((sentence) => {
      const record = records[sentence.id];
      if (!record?.nextReviewAt) {
        return false;
      }

      return new Date(record.nextReviewAt).getTime() <= nowTime;
    })
    .map((sentence) => sentence.id);
}

export function getDueCount(now = new Date()): number {
  return getDueSentenceIds(now).length;
}

export function getLearnedCount(): number {
  const records = getReviewRecords();
  return Object.values(records).filter((record) => Boolean(record.lastReviewedAt)).length;
}

export function getMasteredCount(): number {
  const records = getReviewRecords();
  return Object.values(records).filter((record) => record.currentStatus === "known").length;
}

export function getLearningState(): LearningState {
  const state = parseJson<Partial<LearningState>>(localStorage.getItem(LEARNING_KEY), {});
  return {
    ...createDefaultLearningState(),
    ...state,
    dailyGoal: state.dailyGoal ?? getSettings().dailyGoal,
    totalLearned: getLearnedCount(),
    totalMastered: getMasteredCount(),
    updatedAt: state.updatedAt ?? epochIso,
  };
}

export function saveLearningState(state: LearningState, silent = false): void {
  localStorage.setItem(LEARNING_KEY, JSON.stringify(state));
  if (!silent) {
    markPendingSync();
    dispatchLocalChange();
  }
}

export function updateLearningStateAfterReview(sentenceId: string, reviewedAt: string): void {
  saveLearningState({
    ...getLearningState(),
    currentSentenceId: sentenceId,
    lastActiveAt: reviewedAt,
    updatedAt: reviewedAt,
    totalLearned: getLearnedCount(),
    totalMastered: getMasteredCount(),
  });
}

export function getSyncMeta(): SyncMeta {
  return {
    ...defaultSyncMeta,
    ...parseJson<Partial<SyncMeta>>(localStorage.getItem(SYNC_META_KEY), {}),
  };
}

export function saveSyncMeta(meta: SyncMeta): void {
  localStorage.setItem(SYNC_META_KEY, JSON.stringify(meta));
}

export function markPendingSync(error?: string): void {
  saveSyncMeta({
    ...getSyncMeta(),
    pendingSync: true,
    lastSyncError: error,
  });
}

export function markSynced(syncedAt = nowIso()): void {
  saveSyncMeta({
    ...getSyncMeta(),
    pendingSync: false,
    lastSyncedAt: syncedAt,
    lastSyncError: undefined,
  });
}

export function exportLocalProgress(): LocalProgressSnapshot {
  return {
    learningState: getLearningState(),
    reviewRecords: getReviewRecords(),
    settings: getSettings(),
    exportedAt: nowIso(),
  };
}

export function importLocalProgress(snapshot: LocalProgressSnapshot, markPending = false, notify = true): void {
  saveReviewRecords(snapshot.reviewRecords, true);
  saveSettings(snapshot.settings, true);
  saveLearningState(snapshot.learningState, true);
  saveSyncMeta({
    ...getSyncMeta(),
    pendingSync: markPending,
  });
  if (notify) {
    dispatchLocalChange();
  }
}

export function clearProgress(): void {
  localStorage.removeItem(REVIEW_KEY);
  localStorage.removeItem(LEARNING_KEY);
  markPendingSync();
  dispatchLocalChange();
}
