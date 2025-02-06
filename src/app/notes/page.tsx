"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import { useNotes } from "@/hooks/useNotes";
import { NoteInput } from "@/components/features/notes/NoteInput";
import { NoteList } from "@/components/features/notes/NoteList";

export default function NotesPage() {
  const { t } = useLanguage();
  const { notes, isSubmitting, addNote, deleteNote, editNote } = useNotes();

  const handleSubmit = async (content: string, mood: string | null) => {
    await addNote(content, mood);
  };

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      <div className="flex-1 overflow-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-primary-dark mb-8">
            {t.notes.title}
          </h1>

          <NoteInput onSubmit={handleSubmit} isSubmitting={isSubmitting} />
          <NoteList notes={notes} onDelete={deleteNote} onEdit={editNote} />
        </div>
      </div>
    </div>
  );
}
