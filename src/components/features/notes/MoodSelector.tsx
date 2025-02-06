import { useLanguage } from "@/contexts/LanguageContext";
import { cn } from "@/lib/utils";

interface MoodSelectorProps {
  selectedMood: string | null;
  onMoodSelect: (mood: string) => void;
}

const getMoodIcon = (mood: string) => {
  const icons = {
    procrastination: "🐌",
    distracted: "🦋",
    hyperfocus: "🎯",
    anxious: "😰",
    energetic: "⚡️",
    neutral: "📝",
  } as const;
  return icons[mood as keyof typeof icons] || icons.neutral;
};

export function MoodSelector({
  selectedMood,
  onMoodSelect,
}: MoodSelectorProps) {
  const { t } = useLanguage();

  return (
    <div
      className="flex gap-3 bg-gray-50/80 backdrop-blur-sm 
      px-3 py-2 rounded-full border border-gray-200 
      shadow-sm hover:bg-white hover:border-primary/20 
      transition-all duration-300"
    >
      {Object.entries(t.notes.moods).map(([key, value]) => (
        <button
          key={key}
          type="button"
          onClick={() => onMoodSelect(key)}
          className={cn(
            "group/mood relative w-10 h-10 rounded-full",
            "flex items-center justify-center text-2xl",
            "transition-all duration-300",
            "hover:bg-white",
            selectedMood === key
              ? "scale-110 shadow-lg bg-white ring-2 ring-primary ring-offset-2"
              : "hover:scale-110 hover:-translate-y-0.5 bg-gray-50/50"
          )}
        >
          <span
            className={cn(
              "transition-all duration-300",
              selectedMood === key
                ? "scale-110"
                : "opacity-70 group-hover/mood:opacity-100"
            )}
          >
            {getMoodIcon(key)}
          </span>

          {/* Tooltip */}
          <div
            className={cn(
              "absolute bottom-full mb-2 hidden group-hover/mood:block",
              "min-w-max px-3 py-1.5 rounded-full",
              "transform -translate-x-1/2 left-1/2",
              "text-sm font-medium shadow-lg",
              selectedMood === key
                ? "bg-primary text-white"
                : "bg-gray-800/90 text-white backdrop-blur-sm"
            )}
          >
            <div className="relative">
              {value}
              {/* 小三角形 */}
              <div
                className={cn(
                  "absolute -bottom-4 left-1/2 -translate-x-1/2",
                  "border-4 border-transparent",
                  selectedMood === key
                    ? "border-t-primary"
                    : "border-t-gray-800/90"
                )}
              />
            </div>
          </div>
        </button>
      ))}
    </div>
  );
}
