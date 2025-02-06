"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import { useNotes } from "@/hooks/useNotes";
import { NoteInput } from "@/components/features/notes/NoteInput";
import { NoteList } from "@/components/features/notes/NoteList";
import {
  AISummary,
  KeywordAnalysis,
} from "@/components/features/notes/MoodAnalysis";
import { ClientMoodChart } from "@/components/features/notes/MoodAnalysis/ClientMoodChart";
import { useState, useEffect, useCallback } from "react";
import { TimeRange } from "@/types/mood";

const MIN_NOTES_FOR_ANALYSIS = 3;

export default function NotesPage() {
  const { t, language } = useLanguage();
  const {
    notes,
    isSubmitting,
    isAnalyzing,
    analysis,
    needMoreNotes,
    addNote,
    deleteNote,
    editNote,
    analyzeNotes,
  } = useNotes();
  const [timeRange, setTimeRange] = useState<TimeRange>("7days");

  const handleSubmit = async (content: string, mood: string | null) => {
    const newNote = await addNote(content, mood);
    if (newNote && notes.length + 1 >= MIN_NOTES_FOR_ANALYSIS) {
      analyzeNotes(timeRange, language);
    }
  };

  const handleReanalyze = useCallback(() => {
    analyzeNotes(timeRange, language);
  }, [analyzeNotes, timeRange, language]);

  const handleTimeRangeChange = useCallback(
    (newRange: TimeRange) => {
      setTimeRange(newRange);
      if (notes.length >= MIN_NOTES_FOR_ANALYSIS) {
        analyzeNotes(newRange, language);
      }
    },
    [analyzeNotes, language, notes.length]
  );

  // 初始加载时进行分析
  useEffect(() => {
    if (notes.length >= MIN_NOTES_FOR_ANALYSIS) {
      analyzeNotes(timeRange, language);
    }
  }, [notes.length, language, timeRange]);

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      <div className="flex-1 overflow-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-primary-dark mb-8">
            {t.notes.title}
          </h1>

          <NoteInput onSubmit={handleSubmit} isSubmitting={isSubmitting} />

          {/* 心情分析区域 */}
          <div className="mb-12 space-y-6">
            {notes.length === 0 ? (
              <div className="text-center py-12 text-gray-500">
                <p className="text-xl mb-2">✨</p>
                <p className="text-lg mb-2">{t.notes.writeFirst}</p>
                <p className="text-sm text-gray-400">
                  {t.notes.analysis.initialHint.replace(
                    "{count}",
                    String(MIN_NOTES_FOR_ANALYSIS)
                  )}
                </p>
              </div>
            ) : needMoreNotes ? (
              <div className="text-center py-8 text-gray-500">
                <p className="text-xl mb-2">✍️</p>
                <p>
                  {t.notes.analysis.needMore
                    .replace("{current}", String(notes.length))
                    .replace(
                      "{required}",
                      String(MIN_NOTES_FOR_ANALYSIS - notes.length)
                    )}
                </p>
              </div>
            ) : (
              analysis && (
                <>
                  <AISummary
                    summary={analysis.summary}
                    advice={analysis.advice}
                    date={analysis.date}
                  />
                  <ClientMoodChart
                    data={analysis.moodData}
                    timeRange={timeRange}
                    onTimeRangeChange={handleTimeRangeChange}
                  />
                  <KeywordAnalysis
                    keywords={analysis.keywords}
                    onReanalyze={handleReanalyze}
                  />
                </>
              )
            )}
            {isAnalyzing && (
              <div className="text-center py-8 text-gray-500">
                <p className="text-xl mb-2">✨</p>
                <p>{t.notes.analysis.analyzing}</p>
              </div>
            )}
          </div>

          <NoteList notes={notes} onDelete={deleteNote} onEdit={editNote} />
        </div>
      </div>
    </div>
  );
}
