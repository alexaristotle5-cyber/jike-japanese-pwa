import { getReviewRecord, saveReviewRecord, updateLearningStateAfterReview } from "./storage";
import type { Rating, ReviewRecord } from "../types/review";

const knownIntervals = [1, 3, 7, 14, 30, 60];
const minuteMs = 60 * 1000;
const dayMs = 24 * 60 * minuteMs;

function addMinutes(date: Date, minutes: number): Date {
  return new Date(date.getTime() + minutes * minuteMs);
}

function addDays(date: Date, days: number): Date {
  return new Date(date.getTime() + days * dayMs);
}

function nextKnownReviewDate(date: Date, consecutiveKnownCount: number): Date {
  const interval = knownIntervals[Math.min(consecutiveKnownCount - 1, knownIntervals.length - 1)];
  return addDays(date, interval);
}

function classifyRecord(record: ReviewRecord): ReviewRecord {
  const isHighRisk = record.totalWrongCount >= 2 || record.fuzzyCount >= 3;

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
    nextReviewAt = addMinutes(now, 10);
    record.consecutiveKnownCount = 0;
    record.totalWrongCount += 1;
    record.currentStatus = "learning";
  } else if (rating === "fuzzy") {
    nextReviewAt = addDays(now, 1);
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
