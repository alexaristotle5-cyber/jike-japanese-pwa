import { getReviewRecord, saveReviewRecord, updateLearningStateAfterReview } from "./storage";
import type { Rating, ReviewRecord } from "../types/review";

const ebbinghausIntervals = [
  { minutes: 5, label: "5 分钟" },
  { minutes: 30, label: "30 分钟" },
  { minutes: 12 * 60, label: "12 小时" },
  { minutes: 24 * 60, label: "1 天" },
  { minutes: 2 * 24 * 60, label: "2 天" },
  { minutes: 4 * 24 * 60, label: "4 天" },
  { minutes: 7 * 24 * 60, label: "7 天" },
  { minutes: 15 * 24 * 60, label: "15 天" },
  { minutes: 30 * 24 * 60, label: "30 天" },
  { minutes: 60 * 24 * 60, label: "60 天" },
] as const;
const minuteMs = 60 * 1000;

function addMinutes(date: Date, minutes: number): Date {
  return new Date(date.getTime() + minutes * minuteMs);
}

function nextKnownReviewDate(date: Date, consecutiveKnownCount: number): Date {
  const interval = ebbinghausIntervals[Math.min(consecutiveKnownCount - 1, ebbinghausIntervals.length - 1)];
  return addMinutes(date, interval.minutes);
}

function classifyRecord(record: ReviewRecord): ReviewRecord {
  const recentAgainCount = record.ratingHistory.slice(0, 5).filter((entry) => entry.rating === "again").length;
  const isHighRisk = record.totalWrongCount >= 2 || record.fuzzyCount >= 3 || recentAgainCount >= 2;

  if (isHighRisk) {
    return {
      ...record,
      isHighRisk,
      currentStatus: "high-risk",
    };
  }

  if (record.consecutiveKnownCount >= 3) {
    return {
      ...record,
      isHighRisk,
      currentStatus: "known",
    };
  }

  return {
    ...record,
    isHighRisk,
  };
}

export function rateSentence(sentenceId: string, rating: Rating, now = new Date()): ReviewRecord {
  const record = getReviewRecord(sentenceId);
  let nextReviewAt: Date;

  if (rating === "again") {
    nextReviewAt = addMinutes(now, 5);
    record.consecutiveKnownCount = 0;
    record.totalWrongCount += 1;
    record.currentStatus = "learning";
  } else if (rating === "fuzzy") {
    nextReviewAt = addMinutes(now, 30);
    record.consecutiveKnownCount = 0;
    record.fuzzyCount += 1;
    record.currentStatus = "reviewing";
  } else {
    record.consecutiveKnownCount += 1;
    nextReviewAt = nextKnownReviewDate(now, record.consecutiveKnownCount);
    record.currentStatus = "reviewing";
  }

  record.lastReviewedAt = now.toISOString();
  record.nextReviewAt = nextReviewAt.toISOString();
  record.updatedAt = now.toISOString();
  record.ratingHistory = [
    {
      rating,
      reviewedAt: now.toISOString(),
      nextReviewAt: nextReviewAt.toISOString(),
    },
    ...record.ratingHistory,
  ].slice(0, 30);

  const classified = classifyRecord(record);
  saveReviewRecord(classified);
  updateLearningStateAfterReview(sentenceId, now.toISOString());
  return classified;
}

export function formatNextReview(record: ReviewRecord): string {
  if (!record.nextReviewAt) {
    return "尚未进入复习队列";
  }

  return new Intl.DateTimeFormat("zh-CN", {
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(record.nextReviewAt));
}

export function getEbbinghausPlanText(record: ReviewRecord): string {
  const nextIndex = Math.min(record.consecutiveKnownCount, ebbinghausIntervals.length - 1);
  return ebbinghausIntervals[nextIndex].label;
}
