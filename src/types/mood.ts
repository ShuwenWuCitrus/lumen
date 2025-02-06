export interface MoodData {
  mood: string;
  count: number;
}

export interface BilingualText {
  zh: string;
  en: string;
}

export interface MoodTrend {
  mood: string;
  trend: "上升" | "下降" | "稳定";
  confidence: number;
}

export interface Keyword {
  text: BilingualText;
  weight: number;
  trend: "增加" | "减少" | "稳定";
}

export interface AnalysisResult {
  summary: BilingualText;
  moodTrends: MoodTrend[];
  keywords: Keyword[];
  advice: BilingualText;
  moodData: MoodData[];
  date: string;
}

export type TimeRange = "7days" | "30days";
