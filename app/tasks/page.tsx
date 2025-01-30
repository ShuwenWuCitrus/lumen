"use client";

import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { TaskCard } from "@/components/tasks/TaskCard";
import { TaskForm } from "@/components/tasks/TaskForm";
import { Task } from "@/types/task";

export default function TasksPage() {
  const { t } = useLanguage();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState("");

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

  const toggleTask = (id: string) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (id: string) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const activeTasks = tasks.filter((task) => !task.completed);
  const completedTasks = tasks.filter((task) => task.completed);

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
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
