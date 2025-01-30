"use client";

interface NoteCardProps {
  id: string;
  content: string;
  mood: string;
  createdAt: string;
  onDelete: (id: string) => void;
}

export default function NoteCard({
  id,
  content,
  mood,
  createdAt,
  onDelete,
}: NoteCardProps) {
  const getMoodClass = (mood: string) => {
    const moodMap: { [key: string]: string } = {
      拖延情绪: "procrastination",
      注意力涣散: "anxiety",
      过度专注: "focus",
      焦虑不安: "anxiety",
      充满动力: "energetic",
    };
    return `mood-tag ${moodMap[mood] || "calm"}`;
  };

  return (
    <div className="card p-6">
      <div className="flex justify-between items-start mb-4">
        <span className={getMoodClass(mood)}>{mood}</span>
        <button
          onClick={() => onDelete(id)}
          className="text-gray-400 hover:text-primary transition-colors"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>

      <p className="text-gray-700 whitespace-pre-wrap mb-4">{content}</p>

      <div className="text-sm text-gray-500">{createdAt}</div>
    </div>
  );
}
