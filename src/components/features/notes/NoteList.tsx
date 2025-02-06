import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import NoteCard from "./NoteCard";
import { getMoodIcon } from "@/utils/getMoodIcon";

interface Note {
  id: string;
  content: string;
  mood: string;
  createdAt: string;
}

interface NoteListProps {
  notes: Note[];
  onDelete: (id: string) => void;
  onEdit: (id: string, content: string) => void;
}

export function NoteList({ notes, onDelete, onEdit }: NoteListProps) {
  const { t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState("");

  const filteredNotes = notes.filter((note) =>
    note.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      {/* Search Bar */}
      {notes.length > 0 && (
        <div className="sticky top-0 z-10 bg-transparent backdrop-blur-lg py-md">
          <div className="relative w-full max-w-md mx-auto">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t.notes.searchPlaceholder}
              className="input-field"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-sm top-1/2 -translate-y-1/2
                  text-gray-400 hover:text-gray-600 p-xs"
                aria-label={t.common.clear}
              >
                ✕
              </button>
            )}
          </div>
        </div>
      )}

      {/* Note Grid */}
      <div className="mt-md">
        {filteredNotes.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-md auto-rows-fr">
            {filteredNotes.map((note) => (
              <div key={note.id} className="h-full">
                <NoteCard
                  {...note}
                  onDelete={onDelete}
                  onEdit={onEdit}
                  getMoodIcon={getMoodIcon}
                />
              </div>
            ))}
          </div>
        ) : searchQuery ? (
          <div className="text-center py-xl text-gray-500">
            <p className="text-xl mb-sm">🔍</p>
            <p>{t.notes.noSearchResults}</p>
          </div>
        ) : null}
      </div>
    </>
  );
}
