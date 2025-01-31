"use client";

import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { TaskCard } from "@/components/tasks/TaskCard";
import { TaskForm } from "@/components/tasks/TaskForm";
import { Task } from "@/types/task";
import { Card } from "@/components/common/Card";
import { Button } from "@/components/common/Button";

interface DeletedTask extends Task {
  deletedAt: number;
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

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const data = await res.json();
      return data;
    } catch (error) {
      console.error(error);
      alert(t.tasks.suggestError);
    } finally {
      setDecomposingTasks((prev) => {
        const next = new Set(prev);
        next.delete(taskId);
        return next;
      });
    }
  };

  const toggleTask = (id: string) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) => {
        if (task.id === id || task.parentId === id) {
          return { ...task, completed: !task.completed };
        }
        return task;
      })
    );
  };

  const deleteTask = (id: string) => {
    const taskToDelete = tasks.find((task) => task.id === id);
    if (!taskToDelete) return;

    setTasks(tasks.filter((task) => task.id !== id));
    setDeletedTask({ ...taskToDelete, deletedAt: Date.now() });
    setShowUndo(true);

    // 3秒后自动隐藏撤销按钮
    setTimeout(() => {
      setShowUndo(false);
    }, 3000);
  };

  const editTask = (id: string, newTitle: string) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, title: newTitle } : task
      )
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
                isDecomposing={decomposingTasks.has(task.id)}
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
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 撤销提示 */}
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
