import { useState, useEffect, useCallback, useMemo } from "react";
import { TimeRange, AnalysisResult } from "@/types/mood";
import { Note } from "@/types/note";

const MIN_NOTES_FOR_ANALYSIS = 3;
const STORAGE_KEY = "lumen_notes";

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

  // Save notes to localStorage - 使用防抖优化
  useEffect(() => {
    const saveHandler = () => {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
    };

    // 使用requestAnimationFrame优化写入性能
    const rafId = requestAnimationFrame(saveHandler);
    return () => cancelAnimationFrame(rafId);
  }, [notes]);

  const addNote = useCallback(
    async (content: string, mood: string | null) => {
      if (!content.trim() || isSubmitting) return;

      setIsSubmitting(true);
      const note: Note = {
        id: crypto.randomUUID(),
        content: content.trim(),
        mood: mood || "neutral",
        createdAt: new Date().toISOString(),
      };

      setNotes((prevNotes) => [note, ...prevNotes]);
      setIsSubmitting(false);
      return note;
    },
    [isSubmitting]
  );

  const deleteNote = useCallback((id: string) => {
    setNotes((prevNotes) => prevNotes.filter((note) => note.id !== id));
  }, []);

  const editNote = useCallback((id: string, newContent: string) => {
    setNotes((prevNotes) =>
      prevNotes.map((note) =>
        note.id === id ? { ...note, content: newContent } : note
      )
    );
  }, []);

  const analyzeNotes = useCallback(
    async (timeRange: TimeRange, language: string) => {
      if (notes.length === 0 || isAnalyzing) return;

      setIsAnalyzing(true);
      setAnalysisError(null);

      // 检查笔记数量是否足够
      if (notes.length < MIN_NOTES_FOR_ANALYSIS) {
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
        const response = await fetch("/api/notes/analyze", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ notes, timeRange, language }),
        });

        if (!response.ok) {
          throw new Error("Analysis failed");
        }

        const result = await response.json();
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
    },
    [notes, isAnalyzing]
  );

  // 使用useMemo避免不必要的对象重建
  const returnValue = useMemo(
    () => ({
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
    }),
    [
      notes,
      isSubmitting,
      isAnalyzing,
      analysis,
      analysisError,
      addNote,
      deleteNote,
      editNote,
      analyzeNotes,
    ]
  );

  return returnValue;
};
