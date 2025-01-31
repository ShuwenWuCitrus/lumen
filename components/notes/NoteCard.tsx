import { useState } from "react";
import { Card } from "@/components/common/Card";
import { Button } from "@/components/common/Button";
import { cn } from "@/utils/cn";
import { useLanguage } from "@/contexts/LanguageContext";
import { formatDate } from "@/utils/formatDate";

interface NoteCardProps {
  id: string;
  content: string;
  mood: string;
  createdAt: string;
  onDelete: (id: string) => void;
  onEdit: (id: string, content: string) => void;
}

const moodColors = {
  procrastination: "bg-orange-100 text-orange-700 border-orange-200",
  distracted: "bg-purple-100 text-purple-700 border-purple-200",
  hyperfocus: "bg-blue-100 text-blue-700 border-blue-200",
  anxious: "bg-red-100 text-red-700 border-red-200",
  energetic: "bg-green-100 text-green-700 border-green-200",
} as const;

export default function NoteCard({
  id,
  content,
  mood,
  createdAt,
  onDelete,
  onEdit,
}: NoteCardProps) {
  const { t, language } = useLanguage();
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(content);
  const formattedDate = formatDate(createdAt, language);

  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editedContent.trim() === "") return;
    onEdit(id, editedContent.trim());
    setIsEditing(false);
  };

  return (
    <Card className="group h-full flex flex-col hover:shadow-md transition-all duration-200">
      <div className="p-4 flex flex-col flex-1">
        {/* Header */}
        <div className="flex items-center justify-between mb-3">
          <span
            className={cn(
              "px-2 py-1 text-sm rounded-md border",
              moodColors[mood as keyof typeof moodColors]
            )}
          >
            🔖 {t.notes.moods[mood as keyof typeof t.notes.moods]}
          </span>
          <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
            <Button
              variant="secondary"
              onClick={() => setIsEditing(true)}
              className="!p-1.5 text-gray-400 hover:text-primary
                bg-white hover:bg-primary-50
                transition-all duration-200
                border border-gray-200 hover:border-primary-200"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                />
              </svg>
            </Button>
            <Button
              variant="secondary"
              onClick={() => onDelete(id)}
              className="!p-1.5 text-gray-400 hover:text-rose-500
                bg-white hover:bg-rose-50
                transition-all duration-200
                border border-gray-200 hover:border-rose-200"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                />
              </svg>
            </Button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1">
          {isEditing ? (
            <form onSubmit={handleEditSubmit} className="h-full">
              <textarea
                value={editedContent}
                onChange={(e) => setEditedContent(e.target.value)}
                className="w-full h-full min-h-[120px] p-2 rounded-lg
                  border border-gray-200 focus:border-primary
                  text-gray-700 text-base focus:outline-none
                  resize-none"
                autoFocus
              />
              <div className="flex justify-end gap-2 mt-4">
                <Button
                  type="button"
                  variant="secondary"
                  onClick={() => {
                    setIsEditing(false);
                    setEditedContent(content); // 取消时恢复原内容
                  }}
                  className="!py-1 !px-3 text-sm"
                >
                  {t.common.cancel}
                </Button>
                <Button
                  type="submit"
                  variant="secondary"
                  className="!py-1 !px-3 text-sm text-primary hover:text-primary-dark
                    bg-primary-50 hover:bg-primary-100
                    border-primary-200 hover:border-primary-300"
                >
                  {t.common.save}
                </Button>
              </div>
            </form>
          ) : (
            <p className="text-gray-700 text-base whitespace-pre-wrap">
              {content}
            </p>
          )}
        </div>

        {/* Footer */}
        <div className="mt-4 text-sm text-gray-400">{formattedDate}</div>
      </div>
    </Card>
  );
}
