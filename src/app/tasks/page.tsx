"use client";

import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { TaskCard } from "@/components/features/tasks/TaskCard";
import { TaskForm } from "@/components/features/tasks/TaskForm";
import { Task } from "@/types/task";
import { Card } from "@/components/common/Card";
import { Button } from "@/components/common/Button";
import { cn } from "@/utils/cn";

interface DeletedTask extends Task {
  deletedAt: number;
}

interface Suggestion {
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
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [selectedSuggestion, setSelectedSuggestion] = useState<number>(-1);
  const [selectedTaskId, setSelectedTaskId] = useState<string>("");
  const [hasFirstStep, setHasFirstStep] = useState<Set<string>>(new Set());
  const [selectedStepId, setSelectedStepId] = useState<string>("");

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
    };

    setTasks([...tasks, task]);
    setNewTask("");
  };

  const decomposeTask = async (
    taskId: string,
    taskText: string,
    previousSteps: string[] = []
  ) => {
    setSelectedTaskId(taskId);
    if (!taskText.trim()) return;

    setDecomposingTasks((prev) => new Set(prev).add(taskId));
    try {
      const res = await fetch("/api/decompose", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          task: taskText,
          language,
          previousSteps,
        }),
      });

      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);

      const data = await res.json();
      if (data.suggestions) {
        setSuggestions(data.suggestions);
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
      prevTasks.map((task) => {
        // 如果是目标任务或其子任务，切换完成状态
        if (task.id === id) {
          return { ...task, completed: !task.completed };
        }
        // 如果是父任务，检查其子任务
        if (task.subtasks) {
          return {
            ...task,
            subtasks: task.subtasks.map((st) =>
              st.id === id ? { ...st, completed: !st.completed } : st
            ),
          };
        }
        return task;
      })
    );
  };

  const deleteTask = (id: string) => {
    console.log("Deleting task:", id);
    const taskToDelete = tasks.find(
      (task) => task.id === id || task.subtasks?.some((st) => st.id === id)
    );
    if (!taskToDelete) return;

    setTasks((prevTasks) =>
      prevTasks
        .filter((task) => task.id !== id)
        .map((task) => ({
          ...task,
          subtasks: task.subtasks?.filter((st) => st.id !== id),
        }))
    );

    if (
      id === selectedTaskId ||
      taskToDelete.subtasks?.some((st) => st.id === selectedTaskId)
    ) {
      setSuggestions([]);
      setSelectedSuggestion(-1);
      setSelectedTaskId("");
    }

    setDeletedTask({ ...taskToDelete, deletedAt: Date.now() });
    setShowUndo(true);
    setTimeout(() => setShowUndo(false), 3000);
  };

  const editTask = (id: string, newTitle: string) => {
    console.log("Editing task:", id, newTitle);
    setTasks((prevTasks) =>
      prevTasks.map((task) => {
        // 如果是目标任务，更新标题
        if (task.id === id) {
          return { ...task, title: newTitle };
        }
        // 如果是父任务，检查其子任务
        if (task.subtasks) {
          return {
            ...task,
            subtasks: task.subtasks.map((st) =>
              st.id === id ? { ...st, title: newTitle } : st
            ),
          };
        }
        return task;
      })
    );
  };

  const activeTasks = tasks.filter((task) => !task.completed && !task.parentId);
  const completedTasks = tasks.filter(
    (task) => task.completed && !task.parentId
  );

  const handleUndo = () => {
    if (!deletedTask) return;
    setTasks((prev) => [...prev, deletedTask]);
    setDeletedTask(null);
    setShowUndo(false);
  };

  const handleRegenerateSteps = async () => {
    const task = tasks.find((t) => t.id === selectedTaskId);
    if (!task) return;

    setSelectedSuggestion(-1);
    await decomposeTask(selectedTaskId, task.title);
  };

  const handleConfirmStep = () => {
    if (selectedSuggestion === -1) {
      alert(t.tasks.selectStepFirst);
      return;
    }

    const selected = suggestions[selectedSuggestion];
    setTasks((prev) =>
      prev.map((task) =>
        task.id === selectedTaskId
          ? {
              ...task,
              subtasks: [
                ...(task.subtasks || []).filter((st) => !st.isFirstStep),
                {
                  id: crypto.randomUUID(),
                  title: selected.text,
                  completed: false,
                  createdAt: new Date().toISOString(),
                  parentId: task.id,
                  estimatedTime: selected.time,
                  isFirstStep: true,
                },
              ],
            }
          : task
      )
    );

    setHasFirstStep((prev) => new Set(prev).add(selectedTaskId));
    setSelectedSuggestion(-1);
    setSuggestions([]);
  };

  const handleSelectStep = (stepId: string) => {
    setSelectedStepId(stepId);
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

          <div className="space-y-4">
            {activeTasks.map((task) => (
              <TaskCard
                key={task.id}
                {...task}
                onToggle={toggleTask}
                onDelete={deleteTask}
                onDecompose={decomposeTask}
                onEdit={editTask}
                onSelectStep={handleSelectStep}
                isSelected={selectedStepId === task.id}
                isDecomposing={decomposingTasks.has(task.id)}
                hasFirstStep={hasFirstStep.has(task.id)}
                suggestions={suggestions}
                selectedTaskId={selectedTaskId}
              />
            ))}
          </div>

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
                    onSelectStep={handleSelectStep}
                    isSelected={selectedStepId === task.id}
                    suggestions={suggestions}
                    selectedTaskId={selectedTaskId}
                  />
                ))}
              </div>
            </div>
          )}

          {suggestions.length > 0 && (
            <Card className="ml-6 mt-2 bg-gray-50/80 border-primary/10">
              <div className="p-4 space-y-4">
                <div className="text-sm font-medium text-gray-600">
                  {t.tasks.selectStepPrompt}
                </div>

                <div className="space-y-2">
                  {suggestions.map((suggestion, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedSuggestion(index)}
                      className={cn(
                        "w-full p-3 rounded-lg border text-left transition-all",
                        "hover:border-primary hover:bg-primary-50/50",
                        selectedSuggestion === index
                          ? "border-primary bg-primary-50 shadow-sm"
                          : "border-gray-200 bg-transparent"
                      )}
                    >
                      <div className="flex items-start gap-3">
                        <div
                          className={cn(
                            "flex-shrink-0 w-6 h-6 rounded-full border-2",
                            "flex items-center justify-center mt-1",
                            selectedSuggestion === index
                              ? "border-primary bg-primary text-white"
                              : "border-gray-300"
                          )}
                        >
                          {selectedSuggestion === index
                            ? "✓"
                            : ["1", "2", "3"][index]}
                        </div>
                        <div className="flex-1">
                          <p className="text-gray-800">{suggestion.text}</p>
                          <p className="text-sm text-gray-500 mt-1">
                            ⏱️ {suggestion.time}{" "}
                            {language === "zh" ? "分钟" : "min"}
                          </p>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>

                <div className="flex justify-end gap-2 pt-2 border-t">
                  <Button
                    variant="secondary"
                    onClick={handleRegenerateSteps}
                    className="text-primary hover:text-primary-dark 
                      bg-primary-50 hover:bg-primary-100 
                      border-primary-200 hover:border-primary-300"
                  >
                    {t.tasks.regenerateSteps}
                  </Button>
                  <Button
                    onClick={handleConfirmStep}
                    className={cn(
                      selectedSuggestion === -1
                        ? "bg-gray-400 text-white opacity-50 cursor-not-allowed"
                        : "bg-green-600 hover:bg-green-700 text-white shadow-md hover:shadow-lg"
                    )}
                  >
                    {t.tasks.confirmStep}
                  </Button>
                </div>
              </div>
            </Card>
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
