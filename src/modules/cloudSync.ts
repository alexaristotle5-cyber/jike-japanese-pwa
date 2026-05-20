import { sentences } from "../data/sentences";
import { getDisplayNameForEmail, resolveFixedAccount } from "./fixedAccounts";
import { getSupabaseClient, isSupabaseConfigured } from "./supabaseClient";
import {
  exportLocalProgress,
  getSyncMeta,
  importLocalProgress,
  markPendingSync,
  markSynced,
  saveSyncMeta,
} from "./storage";
import type { LearningState, ReviewRecord, ReviewStatus, SettingsState } from "../types/review";
import type {
  CloudLearningStateRow,
  CloudSentenceProgressRow,
  CloudSettingsRow,
  CloudSyncState,
  LocalProgressSnapshot,
} from "../types/sync";

const syncStateEvent = "jkjp:cloud-sync-state";
const unitId = "n5-n4-0001-0100";
const epochIso = "1970-01-01T00:00:00.000Z";

let currentState: CloudSyncState = createInitialState();
let syncTimer: number | undefined;
let initialized = false;

function createInitialState(): CloudSyncState {
  const meta = getSyncMeta();
  if (!isSupabaseConfigured()) {
    return {
      configured: false,
      status: "disabled",
      message: "尚未配置 Supabase",
      pendingSync: meta.pendingSync,
      lastSyncedAt: meta.lastSyncedAt,
      lastSyncError: meta.lastSyncError,
    };
  }

  return {
    configured: true,
    status: meta.pendingSync ? "pending" : "signed-out",
    message: "未登录",
    pendingSync: meta.pendingSync,
    lastSyncedAt: meta.lastSyncedAt,
    lastSyncError: meta.lastSyncError,
  };
}

function setState(patch: Partial<CloudSyncState>): void {
  currentState = {
    ...currentState,
    ...patch,
  };
  window.dispatchEvent(new CustomEvent(syncStateEvent, { detail: currentState }));
}

export function getCloudSyncState(): CloudSyncState {
  return currentState;
}

export function subscribeCloudSyncState(listener: (state: CloudSyncState) => void): () => void {
  const handler = (event: Event): void => {
    listener((event as CustomEvent<CloudSyncState>).detail);
  };
  window.addEventListener(syncStateEvent, handler);
  listener(currentState);
  return () => window.removeEventListener(syncStateEvent, handler);
}

function timeValue(value?: string): number {
  if (!value) {
    return 0;
  }

  const parsed = new Date(value).getTime();
  return Number.isFinite(parsed) ? parsed : 0;
}

function newer<T extends { updatedAt: string }>(local: T, cloud: T): T {
  return timeValue(cloud.updatedAt) > timeValue(local.updatedAt) ? cloud : local;
}

function uniqueRatingHistory(local: ReviewRecord, cloud: ReviewRecord): ReviewRecord["ratingHistory"] {
  const byKey = new Map<string, ReviewRecord["ratingHistory"][number]>();
  [...local.ratingHistory, ...cloud.ratingHistory].forEach((entry) => {
    byKey.set(`${entry.reviewedAt}:${entry.rating}`, entry);
  });

  return [...byKey.values()]
    .sort((a, b) => timeValue(b.reviewedAt) - timeValue(a.reviewedAt))
    .slice(0, 30);
}

function mergeReviewRecord(local: ReviewRecord, cloud: ReviewRecord): ReviewRecord {
  const base = newer(local, cloud);
  const merged: ReviewRecord = {
    ...base,
    consecutiveKnownCount: Math.max(local.consecutiveKnownCount, cloud.consecutiveKnownCount),
    totalWrongCount: Math.max(local.totalWrongCount, cloud.totalWrongCount),
    fuzzyCount: Math.max(local.fuzzyCount, cloud.fuzzyCount),
    isHighRisk: local.isHighRisk || cloud.isHighRisk,
    ratingHistory: uniqueRatingHistory(local, cloud),
    updatedAt: timeValue(cloud.updatedAt) > timeValue(local.updatedAt) ? cloud.updatedAt : local.updatedAt,
  };

  if (local.currentStatus === "known" || cloud.currentStatus === "known") {
    merged.currentStatus = "known";
  } else if (merged.isHighRisk) {
    merged.currentStatus = "high-risk";
  }

  return merged;
}

function mergeReviewRecords(
  local: Record<string, ReviewRecord>,
  cloud: Record<string, ReviewRecord>,
): Record<string, ReviewRecord> {
  const ids = new Set([...Object.keys(local), ...Object.keys(cloud)]);
  const merged: Record<string, ReviewRecord> = {};

  ids.forEach((id) => {
    if (local[id] && cloud[id]) {
      merged[id] = mergeReviewRecord(local[id], cloud[id]);
    } else {
      merged[id] = local[id] ?? cloud[id];
    }
  });

  return merged;
}

function mergeLearningState(
  local: LearningState,
  cloud: LearningState,
  records: Record<string, ReviewRecord>,
): LearningState {
  const base = newer(local, cloud);
  return {
    ...base,
    totalLearned: Object.values(records).filter((record) => Boolean(record.lastReviewedAt)).length,
    totalMastered: Object.values(records).filter((record) => record.currentStatus === "known").length,
    dailyGoal: newer(local, cloud).dailyGoal || local.dailyGoal || cloud.dailyGoal,
    updatedAt: timeValue(cloud.updatedAt) > timeValue(local.updatedAt) ? cloud.updatedAt : local.updatedAt,
  };
}

function mergeSettings(local: SettingsState, cloud: SettingsState): SettingsState {
  return newer(local, cloud);
}

function mergeSnapshots(local: LocalProgressSnapshot, cloud: LocalProgressSnapshot | null): LocalProgressSnapshot {
  if (!cloud) {
    return local;
  }

  const reviewRecords = mergeReviewRecords(local.reviewRecords, cloud.reviewRecords);
  return {
    exportedAt: new Date().toISOString(),
    reviewRecords,
    learningState: mergeLearningState(local.learningState, cloud.learningState, reviewRecords),
    settings: mergeSettings(local.settings, cloud.settings),
  };
}

function rowToLearningState(row: CloudLearningStateRow | null): LearningState {
  return {
    currentSentenceId: row?.current_sentence_id ?? undefined,
    currentUnit: row?.current_unit ?? unitId,
    dailyGoal: row?.daily_goal ?? 10,
    totalLearned: row?.total_learned ?? 0,
    totalMastered: row?.total_mastered ?? 0,
    lastActiveAt: row?.last_active_at ?? undefined,
    updatedAt: row?.updated_at ?? epochIso,
  };
}

function rowToReviewRecord(row: CloudSentenceProgressRow): ReviewRecord {
  const currentStatus = (row.payload?.currentStatus ?? row.learned_status) as ReviewStatus;
  return {
    sentenceId: row.sentence_id,
    lastReviewedAt: row.last_review_at ?? undefined,
    nextReviewAt: row.next_review_at ?? undefined,
    consecutiveKnownCount: row.consecutive_known_count,
    totalWrongCount: row.wrong_count,
    fuzzyCount: row.fuzzy_count,
    currentStatus,
    isHighRisk: row.is_high_risk,
    updatedAt: row.updated_at,
    ratingHistory: row.payload?.ratingHistory ?? [],
  };
}

function rowToSettings(row: CloudSettingsRow | null): SettingsState {
  return {
    musicEnabled: row?.music_enabled ?? false,
    autoPlayAudio: row?.auto_play_audio ?? false,
    revealTranslationByDefault: row?.reveal_translation_by_default ?? false,
    dailyGoal: row?.daily_goal ?? 10,
    updatedAt: row?.updated_at ?? epochIso,
  };
}

function learningStateToRow(userId: string, state: LearningState): CloudLearningStateRow {
  return {
    user_id: userId,
    current_sentence_id: state.currentSentenceId ?? null,
    current_unit: state.currentUnit,
    daily_goal: state.dailyGoal,
    total_learned: state.totalLearned,
    total_mastered: state.totalMastered,
    last_active_at: state.lastActiveAt ?? null,
    updated_at: state.updatedAt,
  };
}

function reviewRecordToRow(userId: string, record: ReviewRecord): CloudSentenceProgressRow {
  const correctCount = record.ratingHistory.filter((entry) => entry.rating === "known").length;
  return {
    user_id: userId,
    sentence_id: record.sentenceId,
    learned_status: record.currentStatus,
    mastery_level: record.consecutiveKnownCount,
    review_count: record.ratingHistory.length,
    correct_count: correctCount,
    wrong_count: record.totalWrongCount,
    fuzzy_count: record.fuzzyCount,
    consecutive_known_count: record.consecutiveKnownCount,
    last_review_at: record.lastReviewedAt ?? null,
    next_review_at: record.nextReviewAt ?? null,
    is_high_risk: record.isHighRisk,
    payload: {
      ratingHistory: record.ratingHistory,
      currentStatus: record.currentStatus,
    },
    updated_at: record.updatedAt,
  };
}

function settingsToRow(userId: string, settings: SettingsState): CloudSettingsRow {
  return {
    user_id: userId,
    music_enabled: settings.musicEnabled,
    auto_play_audio: settings.autoPlayAudio,
    reveal_translation_by_default: settings.revealTranslationByDefault,
    daily_goal: settings.dailyGoal,
    updated_at: settings.updatedAt,
  };
}

async function loadCloudSnapshot(userId: string): Promise<LocalProgressSnapshot | null> {
  const client = getSupabaseClient();
  if (!client) {
    return null;
  }

  const [learningResult, progressResult, settingsResult] = await Promise.all([
    client.from("user_learning_state").select("*").eq("user_id", userId).maybeSingle(),
    client.from("sentence_progress").select("*").eq("user_id", userId),
    client.from("user_app_settings").select("*").eq("user_id", userId).maybeSingle(),
  ]);

  if (learningResult.error || progressResult.error || settingsResult.error) {
    throw learningResult.error ?? progressResult.error ?? settingsResult.error;
  }

  if (!learningResult.data && !settingsResult.data && (!progressResult.data || progressResult.data.length === 0)) {
    return null;
  }

  return {
    exportedAt: new Date().toISOString(),
    learningState: rowToLearningState(learningResult.data as CloudLearningStateRow | null),
    reviewRecords: Object.fromEntries(
      ((progressResult.data as CloudSentenceProgressRow[]) ?? []).map((row) => [row.sentence_id, rowToReviewRecord(row)]),
    ),
    settings: rowToSettings(settingsResult.data as CloudSettingsRow | null),
  };
}

async function saveCloudSnapshot(userId: string, snapshot: LocalProgressSnapshot): Promise<void> {
  const client = getSupabaseClient();
  if (!client) {
    return;
  }

  const progressRows = Object.values(snapshot.reviewRecords)
    .filter((record) => sentences.some((sentence) => sentence.id === record.sentenceId))
    .map((record) => reviewRecordToRow(userId, record));

  const learningResult = await client.from("user_learning_state").upsert(learningStateToRow(userId, snapshot.learningState));
  if (learningResult.error) {
    throw learningResult.error;
  }

  const settingsResult = await client.from("user_app_settings").upsert(settingsToRow(userId, snapshot.settings));
  if (settingsResult.error) {
    throw settingsResult.error;
  }

  if (progressRows.length > 0) {
    const progressResult = await client.from("sentence_progress").upsert(progressRows);
    if (progressResult.error) {
      throw progressResult.error;
    }
  }
}

export function scheduleCloudSync(delayMs = 1200): void {
  if (syncTimer !== undefined) {
    window.clearTimeout(syncTimer);
  }

  syncTimer = window.setTimeout(() => {
    void syncNow();
  }, delayMs);
}

export async function syncNow(): Promise<void> {
  const client = getSupabaseClient();
  if (!client) {
    setState({
      configured: false,
      status: "disabled",
      message: "尚未配置 Supabase",
      pendingSync: getSyncMeta().pendingSync,
    });
    return;
  }

  const sessionResult = await client.auth.getSession();
  const session = sessionResult.data.session;
  if (!session?.user) {
    setState({
      configured: true,
      status: getSyncMeta().pendingSync ? "pending" : "signed-out",
      message: getSyncMeta().pendingSync ? "本地有未同步进度，登录后同步" : "未登录",
      pendingSync: getSyncMeta().pendingSync,
    });
    return;
  }

  setState({
    configured: true,
    status: "syncing",
    userEmail: getDisplayNameForEmail(session.user.email),
    message: "正在同步",
  });

  try {
    const local = exportLocalProgress();
    const cloud = await loadCloudSnapshot(session.user.id);
    const merged = mergeSnapshots(local, cloud);
    importLocalProgress(merged, false, false);
    await saveCloudSnapshot(session.user.id, merged);
    const syncedAt = new Date().toISOString();
    markSynced(syncedAt);
    saveSyncMeta({
      ...getSyncMeta(),
      lastCloudPullAt: syncedAt,
    });
    setState({
      configured: true,
      status: "synced",
      userEmail: getDisplayNameForEmail(session.user.email),
      message: "已同步",
      pendingSync: false,
      lastSyncedAt: syncedAt,
      lastSyncError: undefined,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "同步失败";
    markPendingSync(message);
    setState({
      configured: true,
      status: "error",
      userEmail: getDisplayNameForEmail(session.user.email),
      message,
      pendingSync: true,
      lastSyncError: message,
    });
  }
}

export async function signInWithFixedAccount(accountId: string, password: string): Promise<void> {
  const client = getSupabaseClient();
  if (!client) {
    throw new Error("尚未配置 Supabase URL 和 anon key");
  }

  const account = resolveFixedAccount(accountId);
  if (!account) {
    throw new Error("账号不存在");
  }

  const result = await client.auth.signInWithPassword({
    email: account.email,
    password,
  });

  if (result.error) {
    throw new Error("账号或密码错误");
  }

  setState({
    configured: true,
    status: "pending",
    userEmail: account.label,
    message: "登录成功，准备同步",
    pendingSync: getSyncMeta().pendingSync,
  });
  scheduleCloudSync(100);
}

export async function signOut(): Promise<void> {
  const client = getSupabaseClient();
  if (!client) {
    return;
  }

  const result = await client.auth.signOut();
  if (result.error) {
    throw result.error;
  }

  setState({
    configured: true,
    status: getSyncMeta().pendingSync ? "pending" : "signed-out",
    userEmail: undefined,
    message: "已退出，继续使用本地进度",
    pendingSync: getSyncMeta().pendingSync,
  });
}

export function initializeCloudSync(): void {
  if (initialized) {
    return;
  }
  initialized = true;

  if (!isSupabaseConfigured()) {
    setState(createInitialState());
    return;
  }

  const client = getSupabaseClient();
  if (!client) {
    return;
  }

  window.addEventListener("online", () => scheduleCloudSync(100));
  window.addEventListener("jkjp:local-progress-change", () => {
    if (!navigator.onLine) {
      markPendingSync("当前离线，等待恢复联网后同步");
      setState({
        status: "pending",
        pendingSync: true,
        message: "离线保存中",
      });
      return;
    }
    scheduleCloudSync();
  });

  client.auth.getSession().then(({ data }) => {
    const user = data.session?.user;
    setState({
      configured: true,
      status: user ? "pending" : "signed-out",
      userEmail: getDisplayNameForEmail(user?.email),
      message: user ? "等待同步" : "未登录",
      pendingSync: getSyncMeta().pendingSync,
      lastSyncedAt: getSyncMeta().lastSyncedAt,
      lastSyncError: getSyncMeta().lastSyncError,
    });
    if (user) {
      scheduleCloudSync(100);
    }
  });

  client.auth.onAuthStateChange((_event, session) => {
    const user = session?.user;
    if (!user) {
      setState({
        configured: true,
        status: getSyncMeta().pendingSync ? "pending" : "signed-out",
        userEmail: undefined,
        message: "未登录",
        pendingSync: getSyncMeta().pendingSync,
      });
      return;
    }

    setState({
      configured: true,
      status: "pending",
      userEmail: getDisplayNameForEmail(user.email),
      message: "登录成功，准备同步",
    });
    scheduleCloudSync(100);
  });
}
