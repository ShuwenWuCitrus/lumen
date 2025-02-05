"use client";

import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import NoteCard from "@/components/features/notes/NoteCard";
import { Button } from "@/components/common/Button";
import { cn } from "@/lib/utils";
import { formatDate } from "@/utils/formatDate";

interface Note {
  id: string;
  content: string;
  mood: string;
  createdAt: string;
}

const moodColors = {
  procrastination: "bg-orange-50 text-orange-600 border-orange-100",
  distracted: "bg-purple-50 text-purple-600 border-purple-100",
  hyperfocus: "bg-blue-50 text-blue-600 border-blue-100",
  anxious: "bg-red-50 text-red-600 border-red-100",
  energetic: "bg-green-50 text-green-600 border-green-100",
} as const;

const moodActiveColors = {
  procrastination: "bg-orange-100 text-orange-700 border-orange-200",
  distracted: "bg-purple-100 text-purple-700 border-purple-200",
  hyperfocus: "bg-blue-100 text-blue-700 border-blue-200",
  anxious: "bg-red-100 text-red-700 border-red-200",
  energetic: "bg-green-100 text-green-700 border-green-200",
} as const;

export default function NotesPage() {
  const { t } = useLanguage();
  const [notes, setNotes] = useState<Note[]>([]);
  const [content, setContent] = useState("");
  const [selectedMood, setSelectedMood] = useState(
    Object.keys(t.notes.moods)[0]
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [filterMood, setFilterMood] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // 过滤笔记
  const filteredNotes = notes.filter((note) => {
    const matchesSearch = note.content
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesMood = !filterMood || note.mood === filterMood;
    return matchesSearch && matchesMood;
  });

  const addNote = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim() || isSubmitting) return;

    setIsSubmitting(true);

    const note: Note = {
      id: crypto.randomUUID(),
      content: content.trim(),
      mood: selectedMood,
      createdAt: formatDate(new Date()),
    };

    setNotes([note, ...notes]);
    setContent("");
    setIsSubmitting(false);
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

  const getMoodIcon = (mood: string) => {
    const icons = {
      procrastination: "🐌", // 蜗牛表示拖延
      distracted: "🦋", // 蝴蝶表示分心
      hyperfocus: "🎯", // 靶心表示专注
      anxious: "😰", // 担忧表示焦虑
      energetic: "⚡️", // 闪电表示充满能量
    } as const;
    return icons[mood as keyof typeof icons];
  };

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      <div className="flex-1 overflow-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-primary-dark mb-8">
            {t.notes.title}
          </h1>

          {/* 添加笔记表单 */}
          <form
            onSubmit={addNote}
            className="mb-8 bg-white rounded-xl p-6 shadow-sm border border-gray-100 mt-6"
          >
            {/* 心情选择 */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t.notes.selectMood}
              </label>
              <div className="flex flex-wrap gap-2">
                {Object.entries(t.notes.moods).map(([key, value]) => (
                  <button
                    key={key}
                    type="button"
                    onClick={() => setSelectedMood(key)}
                    className={cn(
                      "px-4 py-2 rounded-full text-sm transition-all duration-200",
                      "flex items-center gap-2",
                      selectedMood === key
                        ? moodActiveColors[key as keyof typeof moodActiveColors]
                        : moodColors[key as keyof typeof moodColors]
                    )}
                  >
                    {getMoodIcon(key)} {value}
                  </button>
                ))}
              </div>
            </div>

            {/* 内容输入 */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t.notes.content}
              </label>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder={t.notes.addPlaceholder}
                className="w-full min-h-[120px] p-4 rounded-lg
                  border border-gray-200 focus:border-primary
                  text-gray-700 focus:outline-none resize-none
                  shadow-sm focus:shadow-md transition-shadow"
              />
            </div>

            <Button
              type="submit"
              disabled={isSubmitting}
              className={cn(
                "w-full bg-primary text-white font-medium py-3 rounded-lg",
                "transition-all duration-200 hover:scale-[1.02]",
                "hover:bg-primary-dark disabled:opacity-50 disabled:hover:scale-100"
              )}
            >
              {isSubmitting ? t.notes.saving : t.notes.addButton}
            </Button>
          </form>

          {/* 搜索和过滤 */}
          <div className="mb-8 space-y-4">
            {/* 搜索框 */}
            <div className="relative w-full">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t.notes.searchPlaceholder}
                className="w-full input-field pl-10"
              />
              <svg
                className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>

            {/* 心情过滤器 */}
            <div className="flex flex-wrap gap-2">
              <Button
                variant="secondary"
                onClick={() => setFilterMood(null)}
                className={cn(
                  "!py-1.5 !px-4 text-sm",
                  !filterMood
                    ? "bg-gray-200 text-gray-800 border-gray-300 hover:bg-gray-300"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200 border-gray-200"
                )}
              >
                {t.notes.allMoods}
              </Button>
              {Object.entries(t.notes.moods).map(([key, value]) => (
                <Button
                  key={key}
                  variant="secondary"
                  onClick={() => setFilterMood(key)}
                  className={cn(
                    "!py-1.5 !px-4 text-sm",
                    filterMood === key
                      ? moodActiveColors[key as keyof typeof moodActiveColors]
                      : moodColors[key as keyof typeof moodColors]
                  )}
                >
                  {value}
                </Button>
              ))}
            </div>
          </div>

          {/* 笔记网格 */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredNotes.map((note) => (
              <NoteCard
                key={note.id}
                {...note}
                onDelete={deleteNote}
                onEdit={editNote}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
