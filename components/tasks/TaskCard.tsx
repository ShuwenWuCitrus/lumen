"use client";

import { Task } from "@/types/task";
import { Card } from "@/components/common/Card";
import { Button } from "@/components/common/Button";
import { cn } from "@/utils/cn";
import { useLanguage } from "@/contexts/LanguageContext";
import { useState, useEffect } from "react";

interface TaskCardProps extends Task {
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onDecompose?: (
    id: string,
    title: string
  ) => Promise<{
    nextStep: string;
    isComplete: boolean;
  }>;
  isDecomposing?: boolean;
}

export function TaskCard({
  id,
  title,
  completed,
  subtasks,
  parentId,
  onToggle,
  onDelete,
  onDecompose,
  isDecomposing,
}: TaskCardProps) {
  const { t } = useLanguage();
  const [isExpanded, setIsExpanded] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [suggestion, setSuggestion] = useState<string>("");
  const [isGenerating, setIsGenerating] = useState(false);

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
    setIsGenerating(true);
    try {
      const response = await onDecompose(id, title);
      setSuggestion(response.nextStep);
    } catch (error) {
      console.error(error);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleGotIt = () => {
    setSuggestion("");
  };

  return (
    <div className={cn("space-y-2", { "ml-6": parentId })}>
      <Card
        className={cn(
          "flex items-center gap-4 transition-all",
          parentId && "bg-gray-50/50 !shadow-sm py-2",
          completed && "opacity-60"
        )}
      >
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

        <span
          className={cn("flex-1", {
            "text-gray-400 line-through": completed,
            "text-gray-700": !completed,
            "text-sm": parentId,
          })}
        >
          {title}
        </span>

        {!parentId && !completed && (
          <Button
            variant="secondary"
            onClick={handleSuggestStep}
            isLoading={isDecomposing}
            className="!px-2.5 !py-1 text-sm text-gray-600 hover:text-primary-dark 
              bg-gray-50 hover:bg-gray-100 border border-gray-200
              !shadow-none hover:!shadow-sm transition-all"
          >
            {suggestion ? t.tasks.tryAnotherButton : t.tasks.suggestStepButton}
          </Button>
        )}

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

      {subtasks && subtasks.length > 0 && (
        <div className="space-y-2">
          <div className="space-y-2 animate-fadeIn">
            {visibleSubtasks.map((subtask) => (
              <TaskCard
                key={subtask.id}
                {...subtask}
                onToggle={onToggle}
                onDelete={onDelete}
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

      {suggestion && (
        <div className="ml-6 animate-fadeIn">
          <Card className="bg-gray-50 border border-primary/10 !shadow-sm">
            <div className="flex items-center gap-3 p-3">
              <div className="flex-1">
                <div className="text-xs font-medium text-gray-500 mb-1">
                  {t.tasks.suggestionLabel}
                </div>
                <p className="text-sm text-gray-700">{suggestion}</p>
              </div>
              <div className="flex items-center gap-2">
                {!isGenerating && (
                  <>
                    <Button
                      variant="secondary"
                      onClick={handleSuggestStep}
                      className="!p-1.5 text-sm text-gray-500 hover:text-primary-dark 
                        bg-white hover:bg-gray-50 border border-gray-200
                        !shadow-none hover:!shadow-sm transition-all"
                    >
                      <span className="flex items-center gap-1">
                        🔄 {t.tasks.tryAnotherShort}
                      </span>
                    </Button>
                    <Button
                      variant="secondary"
                      onClick={handleGotIt}
                      className="!p-1.5 text-sm text-green-600 hover:text-green-700
                        bg-green-50 hover:bg-green-100 border border-green-200
                        !shadow-none hover:!shadow-sm transition-all"
                    >
                      <span className="flex items-center gap-1">
                        ✓ {t.tasks.gotItButton}
                      </span>
                    </Button>
                  </>
                )}
                {isGenerating && (
                  <span className="flex items-center gap-1 text-sm text-gray-500">
                    <span className="animate-spin">⏳</span>
                    {t.tasks.generatingLabel}
                  </span>
                )}
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}
