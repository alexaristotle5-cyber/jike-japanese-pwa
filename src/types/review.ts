export type Rating = "again" | "fuzzy" | "known";

export type ReviewStatus = "new" | "learning" | "reviewing" | "high-risk" | "known";

export type ReviewRecord = {
  sentenceId: string;
  lastReviewedAt?: string;
  nextReviewAt?: string;
  consecutiveKnownCount: number;
  totalWrongCount: number;
  fuzzyCount: number;
  currentStatus: ReviewStatus;
  isHighRisk: boolean;
  updatedAt: string;
  ratingHistory: {
    rating: Rating;
    reviewedAt: string;
    nextReviewAt: string;
  }[];
};

export type SettingsState = {
  musicEnabled: boolean;
  autoPlayAudio: boolean;
  revealTranslationByDefault: boolean;
  dailyGoal: number;
  updatedAt: string;
};

export type StudySessionKind = "learn" | "review";

export type LearningState = {
  currentSentenceId?: string;
  currentUnit: string;
  dailyGoal: number;
  totalLearned: number;
  totalMastered: number;
  lastActiveAt?: string;
  updatedAt: string;
};
