import { MoodData, AISummaryData, Keyword } from "@/types/mood";

export const mockMoodData: MoodData[] = [
  { mood: "procrastination", count: 5 },
  { mood: "distracted", count: 8 },
  { mood: "hyperfocus", count: 3 },
  { mood: "anxious", count: 4 },
  { mood: "energetic", count: 6 },
  { mood: "neutral", count: 2 },
].sort((a, b) => b.count - a.count);

export const mockAISummary: AISummaryData = {
  summary:
    "最近一周，你的情绪状态总体平稳。虽然有时会感到分心和焦虑，但也经常进入专注状态。建议在感到分心时适当休息，调整工作节奏。",
  date: "2024-03-20",
};

export const mockKeywords: Keyword[] = [
  { text: "专注", weight: 0.8, sentiment: "positive" },
  { text: "分心", weight: 0.6, sentiment: "negative" },
  { text: "焦虑", weight: 0.4, sentiment: "negative" },
  { text: "高效", weight: 0.7, sentiment: "positive" },
  { text: "拖延", weight: 0.5, sentiment: "negative" },
  { text: "充满活力", weight: 0.9, sentiment: "positive" },
  { text: "平静", weight: 0.3, sentiment: "neutral" },
  { text: "压力", weight: 0.4, sentiment: "negative" },
];
