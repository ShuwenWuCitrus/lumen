"use client";

interface TaskCardProps {
  id: string;
  title: string;
  completed: boolean;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

export default function TaskCard({
  id,
  title,
  completed,
  onToggle,
  onDelete,
}: TaskCardProps) {
  return (
    <div className="card p-4 flex items-center gap-4">
      <button
        onClick={() => onToggle(id)}
        className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors
          ${
            completed
              ? "bg-mint-dark border-mint-dark text-white"
              : "border-gray-300 hover:border-mint"
          }`}
      >
        {completed && (
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
              d="M5 13l4 4L19 7"
            />
          </svg>
        )}
      </button>

      <span
        className={`flex-1 ${
          completed ? "text-gray-400 line-through" : "text-gray-700"
        }`}
      >
        {title}
      </span>

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
            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
          />
        </svg>
      </button>
    </div>
  );
}
