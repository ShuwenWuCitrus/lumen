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
        <div className="sticky top-0 z-10 bg-white/80 backdrop-blur-sm py-4">
          <div className="relative w-full max-w-md mx-auto">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t.notes.searchPlaceholder}
              className="w-full py-2.5 px-5 rounded-full 
                bg-white border border-gray-200 
                focus:outline-none focus:border-primary/30 
                transition-all duration-200 text-gray-700
                shadow-sm hover:shadow-md"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2
                  text-gray-400 hover:text-gray-600 p-1"
              >
                ✕
              </button>
            )}
          </div>
        </div>
      )}

      {/* 笔记网格 */}
      <div className="mt-6">
        {filteredNotes.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 auto-rows-fr">
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
          <div className="text-center py-12 text-gray-500">
            <p className="text-xl mb-2">🔍</p>
            <p>没有找到匹配的笔记</p>
          </div>
        ) : null}
      </div>

      {/* 空状态提示 */}
      {notes.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          <p className="text-6xl mb-4">✨</p>
          <p>{t.notes.writeFirst}</p>
        </div>
      )}
    </>
  );
}
