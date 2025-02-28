import { NextResponse } from "next/server";
import { Task } from "@/types/task";
import { kv } from "@vercel/kv";

// 更新任务
export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const updates = await request.json();
    const tasks = (await kv.get<Task[]>("tasks")) || [];
    const taskIndex = tasks.findIndex((t) => t.id === params.id);

    if (taskIndex === -1) {
      return NextResponse.json({ error: "Task not found" }, { status: 404 });
    }

    const updatedTask = {
      ...tasks[taskIndex],
      ...updates,
    };

    tasks[taskIndex] = updatedTask;
    await kv.set("tasks", tasks);

    return NextResponse.json(updatedTask);
  } catch (error) {
    console.error("Failed to update task:", error);
    return NextResponse.json(
      { error: "Failed to update task" },
      { status: 500 }
    );
  }
}

// 删除任务
export async function DELETE(
  _request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const tasks = (await kv.get<Task[]>("tasks")) || [];
    const taskIndex = tasks.findIndex((t) => t.id === params.id);

    if (taskIndex === -1) {
      return NextResponse.json({ error: "Task not found" }, { status: 404 });
    }

    tasks.splice(taskIndex, 1);
    await kv.set("tasks", tasks);

    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error("Failed to delete task:", error);
    return NextResponse.json(
      { error: "Failed to delete task" },
      { status: 500 }
    );
  }
}
