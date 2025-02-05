"use client";

import { Task } from "@/types/task";
import { Card } from "@/components/common/Card";
import { Button } from "@/components/common/Button";
import { cn } from "@/utils/cn";
import { useLanguage } from "@/contexts/LanguageContext";
import { useState, useEffect } from "react";

interface Suggestion {
  text: string;
  time: number;
}

interface TaskCardProps extends Task {
  isFirstStep?: boolean;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, title: string) => void;
  onDecompose?: (
    taskId: string,
    taskText: string,
    previousSteps?: string[]
  ) => Promise<void>;
  isDecomposing?: boolean;
  hasFirstStep?: boolean;
  suggestions: Suggestion[];
  selectedTaskId: string;
  renderFirstStepButton?: React.ReactNode;
  onSelectStep?: (id: string) => void;
  isSelected?: boolean;
}

export function TaskCard({
  id,
  title,
  completed,
  subtasks,
  parentId,
  isFirstStep,
  onToggle,
  onDelete,
  onEdit,
  onDecompose,
  isDecomposing,
  hasFirstStep: taskHasFirstStep,
  suggestions,
  selectedTaskId,
  renderFirstStepButton,
  onSelectStep,
  isSelected,
}: TaskCardProps) {
  const { t } = useLanguage();
  const [isExpanded, setIsExpanded] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(title);

  useEffect(() => {
    setMounted(true);
  }, []);

  const hasMoreSubtasks = subtasks && subtasks.length > 3;
  const visibleSubtasks =
    mounted && hasMoreSubtasks && !isExpanded
      ? subtasks.slice(0, 3)
      : subtasks || [];

  const handleSuggestStep = async () => {
    if (!onDecompose) return;
    try {
      await onDecompose(id, title);
    } catch (error) {
      console.error(error);
    }
  };

  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editedTitle.trim() === "") return;
    onEdit(id, editedTitle.trim());
    setIsEditing(false);
  };

  return (
    <div className={cn("space-y-2", { "ml-6": parentId })}>
      <Card
        className={cn(
          "flex items-center gap-4 transition-all",
          parentId && "bg-gray-50/50 !shadow-sm py-2",
          completed && "opacity-60",
          isSelected && "border-primary bg-primary-50"
        )}
      >
        {(!isFirstStep || !completed) && (
          <button
            onClick={() => onToggle(id)}
            className={cn(
              "w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors",
              parentId && "w-5 h-5",
              completed
                ? "bg-primary border-primary text-white"
                : "border-gray-300 hover:border-primary"
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
        )}

        {isEditing ? (
          <form onSubmit={handleEditSubmit} className="flex-1">
            <input
              type="text"
              value={editedTitle}
              onChange={(e) => setEditedTitle(e.target.value)}
              className="w-full bg-white rounded-lg px-3 py-1.5
                border border-gray-200 focus:border-primary
                text-gray-700 text-sm focus:outline-none"
              autoFocus
              onBlur={() => {
                if (editedTitle.trim() === "") {
                  setEditedTitle(title);
                }
                setIsEditing(false);
              }}
            />
          </form>
        ) : (
          <span
            className={cn("flex-1", {
              "text-gray-400 line-through": completed,
              "text-gray-700": !completed,
              "text-sm": parentId,
            })}
          >
            {title}
          </span>
        )}

        {renderFirstStepButton}

        <div className="flex items-center gap-2">
          {!parentId &&
            !completed &&
            (!suggestions.length || selectedTaskId !== id) && (
              <Button
                variant="secondary"
                onClick={handleSuggestStep}
                isLoading={isDecomposing}
                className={cn(
                  "!px-2.5 !py-1 text-sm",
                  taskHasFirstStep
                    ? "text-primary border-primary bg-primary-50 hover:bg-primary-100"
                    : "text-gray-600 hover:text-primary-dark bg-gray-50 hover:bg-gray-100 border-gray-200"
                )}
              >
                {taskHasFirstStep
                  ? t.tasks.redecomposeButton
                  : t.tasks.suggestStepButton}
              </Button>
            )}

          <Button
            variant="secondary"
            onClick={() => setIsEditing(true)}
            className="!p-2 text-gray-400 hover:text-primary
              bg-white hover:bg-primary-50
              transition-all duration-200
              border border-gray-200 hover:border-primary-200
              opacity-50 hover:opacity-100"
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
            className="!p-2 text-gray-400 hover:text-rose-500
              bg-white hover:bg-rose-50
              transition-all duration-200
              border border-gray-200 hover:border-rose-200
              opacity-50 hover:opacity-100"
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
        </div>
      </Card>

      {subtasks && subtasks.length > 0 && (
        <div className="space-y-2">
          <div className="space-y-2 animate-fadeIn">
            {visibleSubtasks.map((subtask) => (
              <TaskCard
                key={subtask.id}
                {...subtask}
                onToggle={onToggle}
                onDelete={onDelete}
                onEdit={onEdit}
                suggestions={suggestions}
                selectedTaskId={selectedTaskId}
                onSelectStep={onSelectStep}
                isSelected={isSelected}
                renderFirstStepButton={
                  subtask.isFirstStep &&
                  subtask.completed && (
                    <span className="text-sm text-green-600 whitespace-nowrap ml-auto">
                      {t.tasks.stepCompleted}
                    </span>
                  )
                }
              />
            ))}
          </div>

          {hasMoreSubtasks && (
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="ml-6 text-sm text-gray-500 hover:text-primary-dark transition-colors"
            >
              {isExpanded
                ? t.tasks.showLessButton
                : t.tasks.showMoreButton.replace(
                    "{count}",
                    String(subtasks.length - 3)
                  )}
            </button>
          )}
        </div>
      )}
    </div>
  );
}
