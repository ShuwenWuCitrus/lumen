"use client";

import { useState } from "react";
import NoteCard from "@/components/NoteCard";
import { useLanguage } from "@/contexts/LanguageContext";
import { formatDate } from "@/utils/formatDate";

interface Note {
  id: string;
  content: string;
  mood: string;
  createdAt: string;
}

export default function NotesPage() {
  const { t } = useLanguage();
  const [notes, setNotes] = useState<Note[]>([]);
  const [content, setContent] = useState("");
  const [selectedMood, setSelectedMood] = useState(
    Object.keys(t.notes.moods)[0]
  );

  const addNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;

    const note: Note = {
      id: crypto.randomUUID(),
      content: content.trim(),
      mood: selectedMood,
      createdAt: formatDate(new Date()),
    };

    setNotes([note, ...notes]);
    setContent("");
  };

  const deleteNote = (id: string) => {
    setNotes(notes.filter((note) => note.id !== id));
  };

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      <div className="flex-1 overflow-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold text-primary-dark mb-8">
            {t.notes.title}
          </h1>

          <form onSubmit={addNote} className="mb-8">
            <div className="mb-4">
              <select
                value={selectedMood}
                onChange={(e) => setSelectedMood(e.target.value)}
                className="mood-select"
              >
                {Object.entries(t.notes.moods).map(([key, value]) => (
                  <option
                    key={key}
                    value={key}
                    className="mood-option"
                    data-mood={key}
                  >
                    {value}
                  </option>
                ))}
              </select>

              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder={t.notes.addPlaceholder}
                className="input-field mt-4 min-h-[120px]"
              />
            </div>

            <button type="submit" className="btn-primary w-full">
              {t.notes.addButton}
            </button>
          </form>

          <div className="space-y-4">
            {notes.map((note) => (
              <NoteCard key={note.id} {...note} onDelete={deleteNote} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
