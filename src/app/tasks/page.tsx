"use client";

import { useState } from "react";
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

  const addTask = (e: React.FormEvent) => {
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

    setTasks([...tasks, task]);
    setNewTask("");
    decomposeTask(task.id, task.title);
  };

  const decomposeTask = async (taskId: string, taskText: string) => {
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
  };

  const toggleTask = (id: string) => {
    console.log("Toggling task:", id);
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (id: string) => {
    console.log("Deleting task:", id);
    const taskToDelete = tasks.find((task) => task.id === id);
    if (!taskToDelete) return;

    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));

    setDeletedTask({ ...taskToDelete, deletedAt: Date.now() });
    setShowUndo(true);
    setTimeout(() => setShowUndo(false), 3000);
  };

  const editTask = (id: string, newTitle: string, updates = {}) => {
    console.log("Editing task:", id, newTitle);
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, title: newTitle, ...updates } : task
      )
    );
  };

  const activeTasks = tasks.filter((task) => !task.completed);
  const completedTasks = tasks.filter((task) => task.completed);

  const handleUndo = () => {
    if (!deletedTask) return;
    setTasks((prev) => [...prev, deletedTask]);
    setDeletedTask(null);
    setShowUndo(false);
  };

  const handleCompleteStep = (taskId: string) => {
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
  };

  const handleSkipStep = (taskId: string) => {
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
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (active.id !== over?.id) {
      setTasks((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over?.id);

        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

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
                    onCompleteStep={handleCompleteStep}
                    onSkipStep={handleSkipStep}
                    isDecomposing={decomposingTasks.has(task.id)}
                  />
                ))}
              </SortableContext>
            </div>
          </DndContext>

          {completedTasks.length > 0 && (
            <div className="mt-8">
              <h2 className="text-xl font-semibold text-gray-600 mb-4">
                {t.tasks.completed}
              </h2>
              <div className="space-y-4 opacity-60">
                {completedTasks.map((task) => (
                  <TaskCard
                    key={task.id}
                    {...task}
                    onToggle={toggleTask}
                    onDelete={deleteTask}
                    onEdit={editTask}
                    onCompleteStep={handleCompleteStep}
                    onSkipStep={handleSkipStep}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {showUndo && (
        <div className="fixed bottom-4 right-4 animate-fadeIn">
          <Card className="bg-gray-800 text-white px-4 py-3 flex items-center gap-3">
            <span>{t.tasks.taskDeleted}</span>
            <Button
              variant="secondary"
              onClick={handleUndo}
              className="!py-1 !px-3 bg-white/10 hover:bg-white/20 
                border-white/20 text-white"
            >
              {t.tasks.undoButton}
            </Button>
          </Card>
        </div>
      )}
    </div>
  );
}
