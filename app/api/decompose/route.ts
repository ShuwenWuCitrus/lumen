import OpenAI from "openai";
import { NextResponse } from "next/server";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  const { task, language } = await req.json();

  const prompt =
    language === "zh"
      ? `你是一个帮助ADHD用户开始行动的AI助手。
提供一个小而具体的第一步行动建议。
这个步骤应该：
1. 简单且立即可执行
2. 降低开始行动的阻力
3. 如果任务太大，可以从准备工作开始

任务：${task}

示例：
- 任务："完成React项目"
  建议："打开VS Code，看看上次写到哪里"
- 任务："写一篇文章"
  建议："列出3个想要表达的要点"

请提供一个具体的第一步建议：`
      : `You are an AI assistant that helps users take the first step.
Provide one small, actionable suggestion to get started.
The step should be:
1. Simple and immediately doable
2. Reduce friction to start
3. If the task is large, start with preparation

Task: ${task}

Examples:
- Task: "Complete React project"
  Response: "Open VS Code and check where you left off"
- Task: "Write an essay"
  Response: "Write down 3 key points you want to cover"

Please provide one specific first step:`;

  const completion = await openai.chat.completions.create({
    messages: [{ role: "user", content: prompt }],
    model: "gpt-4o-mini",
  });

  try {
    const nextStep = completion.choices[0].message.content?.trim() || "";
    return NextResponse.json({
      nextStep,
      isComplete:
        nextStep.toLowerCase().includes("task complete") ||
        nextStep.toLowerCase().includes("任务完成"),
    });
  } catch (error) {
    console.error("Failed to get next step:", error);
    return NextResponse.json({ nextStep: "", isComplete: false });
  }
}
