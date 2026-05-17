export type StudyMode = "visual-recall" | "listening-reverse";

export type SentenceHint = {
  firstKana: string;
  difficultWordReading: string;
  cnKeyword: string;
};

export type SentenceStudyItem = {
  id: string;
  targetWord: string;
  jpSentence: string;
  kanaSentence: string;
  cnTranslation: string;
  work: string;
  audioSrc: string;
  hint: SentenceHint;
  wordNotes: string[];
  grammarNotes: string[];
};
