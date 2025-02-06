import { useState, useEffect } from "react";
import { TimeRange, AnalysisResult } from "@/types/mood";
import { Note } from "@/types/note";

const MIN_NOTES_FOR_ANALYSIS = 3;
const STORAGE_KEY = "lumen_notes";

interface BilingualText {
  zh: string;
  en: string;
}

interface AnalysisError {
  needMoreNotes: boolean;
  requiredCount: number;
  currentCount: number;
}

export const useNotes = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null);
  const [analysisError, setAnalysisError] = useState<AnalysisError | null>(
    null
  );

  // Load notes from localStorage
  useEffect(() => {
    const savedNotes = localStorage.getItem(STORAGE_KEY);
    if (savedNotes) {
      try {
        setNotes(JSON.parse(savedNotes));
      } catch (e) {
        console.error("Failed to load notes:", e);
      }
    }
  }, []);

  // Save notes to localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
  }, [notes]);

  const addNote = async (content: string, mood: string | null) => {
    if (!content.trim() || isSubmitting) return;

    setIsSubmitting(true);
    const note: Note = {
      id: crypto.randomUUID(),
      content: content.trim(),
      mood: mood || "neutral",
      createdAt: new Date().toISOString(),
    };

    setNotes([note, ...notes]);
    setIsSubmitting(false);
    return note;
  };

  const deleteNote = (id: string) => {
    setNotes(notes.filter((note) => note.id !== id));
  };

  const editNote = (id: string, newContent: string) => {
    setNotes(
      notes.map((note) =>
        note.id === id ? { ...note, content: newContent } : note
      )
    );
  };

  const analyzeNotes = async (timeRange: TimeRange, language: string) => {
    if (notes.length === 0 || isAnalyzing) return;

    setIsAnalyzing(true);
    setAnalysisError(null);

    // 检查笔记数量是否足够
    if (notes.length < MIN_NOTES_FOR_ANALYSIS) {
      console.log("Not enough notes for analysis:", notes.length);
      setAnalysisError({
        needMoreNotes: true,
        requiredCount: MIN_NOTES_FOR_ANALYSIS,
        currentCount: notes.length,
      });
      setAnalysis(null);
      setIsAnalyzing(false);
      return;
    }

    try {
      console.log("Attempting to analyze notes:", notes.length);
      const response = await fetch("/api/notes/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ notes, timeRange, language }),
      });

      if (!response.ok) {
        console.error("Analysis API error:", response.status);
        throw new Error("Analysis failed");
      }

      const result = await response.json();
      console.log("Analysis completed successfully");
      setAnalysis(result);
      setAnalysisError(null);
    } catch (error) {
      console.error("Failed to analyze notes:", error);
      setAnalysis(null);
      setAnalysisError({
        needMoreNotes: false,
        requiredCount: MIN_NOTES_FOR_ANALYSIS,
        currentCount: notes.length,
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  return {
    notes,
    isSubmitting,
    isAnalyzing,
    analysis,
    needMoreNotes: analysisError?.needMoreNotes || false,
    requiredCount: MIN_NOTES_FOR_ANALYSIS,
    currentCount: notes.length,
    addNote,
    deleteNote,
    editNote,
    analyzeNotes,
  };
};
