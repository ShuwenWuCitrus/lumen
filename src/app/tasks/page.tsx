"use client";

import { useState, useCallback, useMemo } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { TaskCard } from "@/components/features/tasks/TaskCard";
import { TaskForm } from "@/components/features/tasks/TaskForm";
import { Task } from "@/types/task";
import { Card } from "@/components/common/Card";
import { Button } from "@/components/common/Button";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

interface DeletedTask extends Task {
  deletedAt: number;
}

interface Step {
  text: string;
  time: number;
}

export default function TasksPage() {
  const { t, language } = useLanguage();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState("");
  const [decomposingTasks, setDecomposingTasks] = useState<Set<string>>(
    new Set()
  );
  const [deletedTask, setDeletedTask] = useState<DeletedTask | null>(null);
  const [showUndo, setShowUndo] = useState(false);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const addTask = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      if (!newTask.trim()) return;

      const activeTasks = tasks.filter((task) => !task.completed);
      if (activeTasks.length >= 3) {
        alert(t.tasks.maxTasksWarning);
        return;
      }

      const task: Task = {
        id: crypto.randomUUID(),
        title: newTask.trim(),
        completed: false,
        createdAt: new Date().toISOString(),
        steps: [],
        currentStepIndex: 0,
        completedSteps: [],
        skippedSteps: [],
      };

      setTasks((prevTasks) => [...prevTasks, task]);
      setNewTask("");
      decomposeTask(task.id, task.title);
    },
    [newTask, tasks, t.tasks.maxTasksWarning]
  );

  const decomposeTask = useCallback(
    async (taskId: string, taskText: string) => {
      if (!taskText.trim()) return;

      setDecomposingTasks((prev) => new Set(prev).add(taskId));
      try {
        const res = await fetch("/api/decompose", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            task: taskText,
            language,
            generateFullSteps: true,
          }),
        });

        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);

        const data = await res.json();
        if (data.steps) {
          setTasks((prevTasks) =>
            prevTasks.map((task) =>
              task.id === taskId
                ? {
                    ...task,
                    steps: data.steps.map((s: Step) => s.text),
                    estimatedTimes: data.steps.map((s: Step) => s.time),
                    currentStepIndex: 0,
                    completedSteps: [],
                    skippedSteps: [],
                  }
                : task
            )
          );
          setDecomposingTasks((prev) => {
            const next = new Set(prev);
            next.delete(taskId);
            return next;
          });
        }
      } catch (error) {
        console.error(error);
        alert(t.tasks.suggestError);
      }
    },
    [language, t.tasks.suggestError]
  );

  const toggleTask = useCallback((id: string) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  }, []);

  const deleteTask = useCallback(
    (id: string) => {
      const taskToDelete = tasks.find((task) => task.id === id);
      if (!taskToDelete) return;

      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));

      setDeletedTask({ ...taskToDelete, deletedAt: Date.now() });
      setShowUndo(true);
      const timeoutId = setTimeout(() => setShowUndo(false), 3000);
      return () => clearTimeout(timeoutId);
    },
    [tasks]
  );

  const editTask = useCallback((id: string, newTitle: string, updates = {}) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, title: newTitle, ...updates } : task
      )
    );
  }, []);

  const { activeTasks, completedTasks } = useMemo(
    () => ({
      activeTasks: tasks.filter((task) => !task.completed),
      completedTasks: tasks.filter((task) => task.completed),
    }),
    [tasks]
  );

  const handleUndo = useCallback(() => {
    if (!deletedTask) return;
    setTasks((prev) => [...prev, deletedTask]);
    setDeletedTask(null);
    setShowUndo(false);
  }, [deletedTask]);

  const handleCompleteStep = useCallback((taskId: string) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) => {
        if (task.id !== taskId) return task;

        const isLastStep = task.currentStepIndex === task.steps.length - 1;
        const newCompletedSteps = [
          ...(task.completedSteps || []),
          task.currentStepIndex,
        ];

        return {
          ...task,
          currentStepIndex: isLastStep
            ? task.currentStepIndex
            : task.currentStepIndex + 1,
          completedSteps: newCompletedSteps,
          completed: isLastStep,
          completedAt: isLastStep ? new Date().toISOString() : undefined,
        };
      })
    );
  }, []);

  const handleSkipStep = useCallback((taskId: string) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) => {
        if (task.id !== taskId) return task;

        const isLastStep = task.currentStepIndex === task.steps.length - 1;
        const newSkippedSteps = [
          ...(task.skippedSteps || []),
          task.currentStepIndex,
        ];

        return {
          ...task,
          currentStepIndex: isLastStep
            ? task.currentStepIndex
            : task.currentStepIndex + 1,
          skippedSteps: newSkippedSteps,
        };
      })
    );
  }, []);

  const handleDragEnd = useCallback((event: DragEndEvent) => {
    const { active, over } = event;

    if (active.id !== over?.id) {
      setTasks((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over?.id);

        return arrayMove(items, oldIndex, newIndex);
      });
    }
  }, []);

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      <div className="flex-1 overflow-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold text-primary-dark mb-8">
            {t.tasks.title}
          </h1>

          <TaskForm
            value={newTask}
            onChange={setNewTask}
            onSubmit={addTask}
            remainingTasks={3 - activeTasks.length}
          />

          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <div className="space-y-4">
              <SortableContext
                items={activeTasks.map((task) => task.id)}
                strategy={verticalListSortingStrategy}
              >
                {activeTasks.map((task) => (
                  <TaskCard
                    key={task.id}
                    {...task}
                    onToggle={toggleTask}
                    onDelete={deleteTask}
                    onEdit={editTask}
                    isDecomposing={decomposingTasks.has(task.id)}
                    onCompleteStep={handleCompleteStep}
                    onSkipStep={handleSkipStep}
                  />
                ))}
              </SortableContext>
            </div>
          </DndContext>

          {completedTasks.length > 0 && (
            <div className="mt-8 space-y-4">
              <h2 className="text-xl font-semibold text-primary-dark">
                {t.tasks.completed}
              </h2>
              {completedTasks.map((task) => (
                <TaskCard
                  key={task.id}
                  {...task}
                  onToggle={toggleTask}
                  onDelete={deleteTask}
                  onEdit={editTask}
                  isDecomposing={decomposingTasks.has(task.id)}
                  onCompleteStep={handleCompleteStep}
                  onSkipStep={handleSkipStep}
                />
              ))}
            </div>
          )}

          {showUndo && (
            <div className="fixed bottom-4 left-0 right-0 mx-auto max-w-sm">
              <Card className="px-4 py-3 flex items-center justify-between bg-info-light text-info-dark">
                <p>{t.tasks.taskDeleted}</p>
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={handleUndo}
                  className="ml-4"
                >
                  {t.tasks.undoButton}
                </Button>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
