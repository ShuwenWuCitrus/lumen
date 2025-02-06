"use client";

import { useState } from "react";
import { Card } from "@/components/common/Card";
import { Button } from "@/components/common/Button";
import { cn } from "@/utils/cn";
import { formatDate } from "@/utils/formatDate";

interface NoteCardProps {
  id: string;
  content: string;
  mood: string;
  createdAt: string;
  onDelete: (id: string) => void;
  onEdit: (id: string, content: string) => void;
  getMoodIcon: (mood: string) => string;
}

export default function NoteCard({
  id,
  content,
  mood,
  createdAt,
  onDelete,
  onEdit,
  getMoodIcon,
}: NoteCardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(content);
  const formattedDate = formatDate(createdAt);

  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editedContent.trim() === "") return;
    onEdit(id, editedContent.trim());
    setIsEditing(false);
  };

  return (
    <Card
      className={cn(
        "group h-full transition-all duration-300 hover:-rotate-1 hover:scale-[1.02]",
        "border-2 hover:border-primary/20"
      )}
    >
      <div className="relative p-4">
        {/* 心情表情 - 右上角 */}
        {mood && mood !== "neutral" && (
          <div className="absolute -top-3 -right-2 text-2xl transform rotate-12">
            {getMoodIcon(mood)}
          </div>
        )}

        {/* 内容区域 */}
        <div className="mt-2">
          {isEditing ? (
            <form onSubmit={handleEditSubmit}>
              <textarea
                value={editedContent}
                onChange={(e) => setEditedContent(e.target.value)}
                className="w-full min-h-[100px] p-2 rounded-lg
                  border border-gray-200 focus:border-primary
                  text-gray-700 text-base focus:outline-none
                  resize-none"
                autoFocus
              />
              <div className="flex justify-end gap-2 mt-2">
                <Button
                  type="button"
                  variant="secondary"
                  onClick={() => {
                    setIsEditing(false);
                    setEditedContent(content);
                  }}
                  className="text-sm px-3 py-1"
                >
                  取消
                </Button>
                <Button
                  type="submit"
                  className="text-sm px-3 py-1 bg-primary/10 text-primary hover:bg-primary/20"
                >
                  保存
                </Button>
              </div>
            </form>
          ) : (
            <div className="relative min-h-[60px]">
              {/* 操作按钮 - 悬浮时显示 */}
              <div className="absolute -top-1 right-0 opacity-0 group-hover:opacity-100 transition-opacity flex gap-1 bg-white/80 backdrop-blur-sm rounded-lg p-1">
                <button
                  onClick={() => setIsEditing(true)}
                  className="p-1.5 text-gray-400 hover:text-primary rounded-full
                    hover:bg-primary/10 transition-colors"
                >
                  ✏️
                </button>
                <button
                  onClick={() => onDelete(id)}
                  className="p-1.5 text-gray-400 hover:text-rose-500 rounded-full
                    hover:bg-rose-50 transition-colors"
                >
                  🗑️
                </button>
              </div>

              {/* 笔记内容 */}
              <p className="text-gray-700 text-lg whitespace-pre-wrap pr-16">
                {content}
              </p>
            </div>
          )}
        </div>

        {/* 时间戳 */}
        <div className="mt-3 text-sm text-gray-400 opacity-50 group-hover:opacity-100 transition-opacity">
          {formattedDate}
        </div>
      </div>
    </Card>
  );
}
