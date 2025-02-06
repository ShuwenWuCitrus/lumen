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
      {/* 搜索框 */}
      {notes.length > 0 && (
        <div className="relative w-full max-w-md mx-auto mb-8 group">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t.notes.searchPlaceholder}
            className="w-full py-2 px-4 rounded-full 
              bg-white/80 backdrop-blur-sm border border-gray-200 
              focus:outline-none focus:border-primary/30 
              transition-all duration-200 text-gray-700"
          />
        </div>
      )}

      {/* 笔记瀑布流 */}
      <div className="columns-1 md:columns-2 lg:columns-3 gap-4">
        {filteredNotes.map((note) => (
          <div key={note.id} className="break-inside-avoid mb-4">
            <NoteCard
              {...note}
              onDelete={onDelete}
              onEdit={onEdit}
              getMoodIcon={getMoodIcon}
            />
          </div>
        ))}
      </div>

      {/* 空状态提示 */}
      {notes.length === 0 && (
        <div className="text-center text-gray-500 mt-8">
          <p className="text-6xl mb-4">✨</p>
          <p>{t.notes.writeFirst}</p>
        </div>
      )}
    </>
  );
}
