import { useState, useEffect } from "react";

interface Note {
  id: string;
  content: string;
  mood: string;
  createdAt: string;
}

const STORAGE_KEY = "lumen_notes";

export const useNotes = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  return {
    notes,
    isSubmitting,
    addNote,
    deleteNote,
    editNote,
  };
};
