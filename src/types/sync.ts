import type { LearningState, ReviewRecord, SettingsState } from "./review";

export type LocalProgressSnapshot = {
  learningState: LearningState;
  reviewRecords: Record<string, ReviewRecord>;
  settings: SettingsState;
  exportedAt: string;
};

export type SyncMeta = {
  lastSyncedAt?: string;
  lastCloudPullAt?: string;
  lastSyncError?: string;
  pendingSync: boolean;
};

export type SyncStatus = "disabled" | "signed-out" | "syncing" | "synced" | "pending" | "error";

export type CloudSyncState = {
  configured: boolean;
  status: SyncStatus;
  userEmail?: string;
  message: string;
  pendingSync: boolean;
  lastSyncedAt?: string;
  lastSyncError?: string;
};

export type CloudLearningStateRow = {
  user_id: string;
  current_sentence_id: string | null;
  current_unit: string;
  daily_goal: number;
  total_learned: number;
  total_mastered: number;
  last_active_at: string | null;
  updated_at: string;
};

export type CloudSentenceProgressRow = {
  user_id: string;
  sentence_id: string;
  learned_status: string;
  mastery_level: number;
  review_count: number;
  correct_count: number;
  wrong_count: number;
  fuzzy_count: number;
  consecutive_known_count: number;
  last_review_at: string | null;
  next_review_at: string | null;
  is_high_risk: boolean;
  payload: {
    ratingHistory?: ReviewRecord["ratingHistory"];
    currentStatus?: ReviewRecord["currentStatus"];
  };
  updated_at: string;
};

export type CloudSettingsRow = {
  user_id: string;
  music_enabled: boolean;
  auto_play_audio: boolean;
  reveal_translation_by_default: boolean;
  daily_goal: number;
  updated_at: string;
};
