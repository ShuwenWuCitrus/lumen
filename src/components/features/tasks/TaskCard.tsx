"use client";

import { Task } from "@/types/task";
import { Card } from "@/components/common/Card";
import { cn } from "@/utils/cn";
import { useLanguage } from "@/contexts/LanguageContext";
import { useState } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

interface TaskCardProps extends Task {
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, title: string, update: Partial<Task>) => void;
  onCompleteStep: (id: string) => void;
  onSkipStep: (id: string) => void;
  isDecomposing?: boolean;
}

export function TaskCard({
  id,
  title,
  completed,
  steps,
  currentStepIndex,
  completedSteps = [],
  skippedSteps = [],
  onToggle,
  onDelete,
  onEdit,
  onCompleteStep,
  onSkipStep,
}: TaskCardProps) {
  const { t } = useLanguage();
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(title);

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id,
    disabled: isEditing,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editedTitle.trim() === "") return;
    onEdit(id, editedTitle.trim(), {
      currentStepIndex,
      completedSteps,
    });
    setIsEditing(false);
  };

  const currentStep = steps?.[currentStepIndex];
  const isLastStep = currentStepIndex === (steps?.length ?? 0) - 1;
  const hasSteps = steps?.length > 0;

  return (
    <Card
      ref={setNodeRef}
      style={style}
      className={cn(
        "flex flex-col gap-4 transition-all bg-white rounded-xl p-4 shadow-sm",
        completed && "opacity-60",
        isDragging && "shadow-lg scale-105 bg-white/90 rotate-1"
      )}
    >
      <div className="flex items-center gap-4">
        {/* 拖拽手柄 */}
        <div
          {...attributes}
          {...listeners}
          className={cn(
            "w-6 h-6 flex items-center justify-center cursor-move",
            "text-gray-400 hover:text-gray-600",
            isEditing && "opacity-50 cursor-not-allowed"
          )}
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
              d="M4 8h16M4 16h16"
            />
          </svg>
        </div>

        {/* 完成按钮 */}
        <button
          type="button"
          onClick={() => onToggle(id)}
          className={cn(
            "w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors",
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

        {/* 标题 */}
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
            })}
          >
            {title}
          </span>
        )}

        {/* 操作按钮 */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setIsEditing(true)}
            className={cn(
              "p-2 text-gray-400 hover:text-primary",
              "bg-white hover:bg-primary-50",
              "transition-all duration-200",
              "border border-gray-200 hover:border-primary-200",
              "opacity-50 hover:opacity-100",
              "rounded-lg"
            )}
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
          </button>

          <button
            type="button"
            onClick={() => onDelete(id)}
            className={cn(
              "p-2 text-gray-400 hover:text-rose-500",
              "bg-white hover:bg-rose-50",
              "transition-all duration-200",
              "border border-gray-200 hover:border-rose-200",
              "opacity-50 hover:opacity-100",
              "rounded-lg"
            )}
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
      </div>

      {/* 步骤部分 */}
      {hasSteps && !completed && (
        <div className="border-t pt-4 mt-2">
          <div className="flex items-center justify-between mb-3">
            <div className="text-sm text-gray-500">
              {t.tasks.stepLabel.replace(
                "{number}",
                String(currentStepIndex + 1)
              )}
              <span className="text-gray-400"> / {steps.length}</span>
            </div>
            <div className="flex gap-2">
              {currentStepIndex > 0 && (
                <button
                  type="button"
                  onClick={() => {
                    if (currentStepIndex > 0) {
                      const lastCompletedIndex =
                        completedSteps[completedSteps.length - 1];
                      const lastSkippedIndex =
                        skippedSteps[skippedSteps.length - 1];

                      if (lastCompletedIndex === currentStepIndex - 1) {
                        const newCompletedSteps = [...completedSteps];
                        newCompletedSteps.pop();
                        onEdit(id, title, {
                          currentStepIndex: currentStepIndex - 1,
                          completedSteps: newCompletedSteps,
                        });
                      } else if (lastSkippedIndex === currentStepIndex - 1) {
                        const newSkippedSteps = [...skippedSteps];
                        newSkippedSteps.pop();
                        onEdit(id, title, {
                          currentStepIndex: currentStepIndex - 1,
                          skippedSteps: newSkippedSteps,
                        });
                      }
                    }
                  }}
                  className={cn(
                    "py-1.5 px-3 text-sm",
                    "bg-white hover:bg-gray-50",
                    "border border-gray-200",
                    "rounded-lg",
                    "transition-colors"
                  )}
                >
                  ↩️ {t.tasks.undoButton}
                </button>
              )}
              <button
                type="button"
                onClick={() => {
                  onSkipStep(id);
                  if (isLastStep) {
                    onToggle(id);
                  }
                }}
                className={cn(
                  "py-1.5 px-3 text-sm",
                  "bg-white hover:bg-gray-50",
                  "border border-gray-200",
                  "rounded-lg",
                  "transition-colors"
                )}
              >
                {t.tasks.skipButton}
              </button>
              <button
                type="button"
                onClick={() => onCompleteStep(id)}
                className={cn(
                  "py-1.5 px-3 text-sm",
                  "bg-green-600 hover:bg-green-700",
                  "text-white",
                  "rounded-lg",
                  "transition-colors"
                )}
              >
                {isLastStep ? t.tasks.doneButton : t.tasks.completeStep}
              </button>
            </div>
          </div>
          <p className="text-gray-700">{currentStep}</p>
        </div>
      )}

      {/* 进度条 */}
      {hasSteps && (
        <div className="flex gap-1 mt-2">
          {steps.map((_, index) => (
            <div
              key={index}
              className={cn(
                "flex-1 h-1 rounded-full",
                completedSteps.includes(index)
                  ? "bg-green-500"
                  : skippedSteps.includes(index)
                  ? "bg-gray-300"
                  : index === currentStepIndex
                  ? "bg-primary"
                  : "bg-gray-100"
              )}
            />
          ))}
        </div>
      )}
    </Card>
  );
}
