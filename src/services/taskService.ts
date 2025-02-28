import { Task } from "@/types/task";

export const taskService = {
  // 获取所有任务
  async getTasks(): Promise<Task[]> {
    const res = await fetch("/api/tasks");
    if (!res.ok) throw new Error("Failed to fetch tasks");
    return res.json();
  },

  // 创建任务
  async createTask(task: Omit<Task, "id">): Promise<Task> {
    const res = await fetch("/api/tasks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(task),
    });
    if (!res.ok) throw new Error("Failed to create task");
    return res.json();
  },

  // 更新任务
  async updateTask(id: string, updates: Partial<Task>): Promise<Task> {
    const res = await fetch(`/api/tasks/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updates),
    });
    if (!res.ok) throw new Error("Failed to update task");
    return res.json();
  },

  // 删除任务
  async deleteTask(id: string): Promise<void> {
    const res = await fetch(`/api/tasks/${id}`, {
      method: "DELETE",
    });
    if (!res.ok) throw new Error("Failed to delete task");
  },

  // 分解任务
  async decomposeTask(
    taskId: string,
    taskText: string,
    language: string
  ): Promise<{ steps: { text: string; time: number }[] }> {
    const res = await fetch("/api/decompose", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        task: taskText,
        language,
        generateFullSteps: true,
      }),
    });
    if (!res.ok) throw new Error("Failed to decompose task");
    return res.json();
  },
};
