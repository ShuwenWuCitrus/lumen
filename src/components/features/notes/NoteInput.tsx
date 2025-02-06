import { useState } from "react";
import { Button } from "@/components/common/Button";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/contexts/LanguageContext";
import { MoodSelector } from "./MoodSelector";

interface NoteInputProps {
  onSubmit: (content: string, mood: string | null) => void;
  isSubmitting: boolean;
}

export function NoteInput({ onSubmit, isSubmitting }: NoteInputProps) {
  const { t } = useLanguage();
  const [content, setContent] = useState("");
  const [selectedMood, setSelectedMood] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim() || isSubmitting) return;

    await onSubmit(content, selectedMood);
    setContent("");
    setSelectedMood(null);
  };

  return (
    <form onSubmit={handleSubmit} className="mb-8">
      <div
        className="bg-white shadow-lg rounded-2xl p-6 max-w-4xl mx-auto 
        border border-gray-200 transition-all duration-300
        hover:shadow-xl hover:border-primary/20"
      >
        {/* 输入框 */}
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder={t.notes.addPlaceholder}
          className="w-full min-h-[120px] p-4 rounded-xl
            bg-gray-50 border border-gray-200 
            text-gray-700 text-lg focus:outline-none
            focus:border-primary/30 focus:bg-white
            resize-none transition-all duration-300"
          style={{ fontSize: content.length > 100 ? "1rem" : "1.2rem" }}
        />

        {/* 按钮 & 心情选择器 */}
        <div className="mt-4 flex justify-between items-center">
          <MoodSelector
            selectedMood={selectedMood}
            onMoodSelect={setSelectedMood}
          />

          {/* Record 按钮 */}
          <Button
            type="submit"
            disabled={!content.trim() || isSubmitting}
            className={cn(
              "bg-primary-dark text-white px-6 py-3",
              "text-base font-semibold rounded-full shadow-lg",
              "transition-all duration-300 transform",
              "hover:bg-primary hover:scale-105 hover:shadow-xl",
              "disabled:opacity-50 disabled:cursor-not-allowed",
              "disabled:hover:scale-100 disabled:hover:shadow-lg"
            )}
          >
            {isSubmitting ? t.notes.saving : t.notes.addButton}
          </Button>
        </div>
      </div>
    </form>
  );
}
