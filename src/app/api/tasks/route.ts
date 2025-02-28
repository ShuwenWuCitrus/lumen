import { NextResponse } from "next/server";
import { Task } from "@/types/task";
import { kv } from "@vercel/kv";

// 获取所有任务
export async function GET() {
  try {
    const tasks = (await kv.get<Task[]>("tasks")) || [];
    return NextResponse.json(tasks);
  } catch (error) {
    console.error("Failed to fetch tasks:", error);
    return NextResponse.json(
      { error: "Failed to fetch tasks" },
      { status: 500 }
    );
  }
}

// 创建新任务
export async function POST(request: Request) {
  try {
    const task = await request.json();
    const tasks = (await kv.get<Task[]>("tasks")) || [];

    const newTask: Task = {
      ...task,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
      completedSteps: [],
      skippedSteps: [],
      currentStepIndex: 0,
    };

    tasks.push(newTask);
    await kv.set("tasks", tasks);

    return NextResponse.json(newTask);
  } catch (error) {
    console.error("Failed to create task:", error);
    return NextResponse.json(
      { error: "Failed to create task" },
      { status: 500 }
    );
  }
}
