"use client";

import { Task } from "@/types/task";
import { Card } from "@/components/common/Card";
import { Button } from "@/components/common/Button";
import { cn } from "@/utils/cn";

interface TaskCardProps extends Task {
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

export function TaskCard({
  id,
  title,
  completed,
  onToggle,
  onDelete,
}: TaskCardProps) {
  return (
    <Card className="flex items-center gap-4">
      <button
        onClick={() => onToggle(id)}
        className={cn(
          "w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors",
          completed
            ? "bg-mint-dark border-mint-dark text-white"
            : "border-gray-300 hover:border-mint"
        )}
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
        className={cn("flex-1", {
          "text-gray-400 line-through": completed,
          "text-gray-700": !completed,
        })}
      >
        {title}
      </span>

      <Button
        variant="secondary"
        onClick={() => onDelete(id)}
        className="!p-2 text-gray-400 hover:text-primary"
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
      </Button>
    </Card>
  );
}
