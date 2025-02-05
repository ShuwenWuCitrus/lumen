import OpenAI from "openai";
import { NextResponse } from "next/server";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: Request) {
  try {
    const { task, language } = await request.json();

    const prompt =
      language === "zh"
        ? `作为一个 ADHD 任务分解助手，请将任务"${task}"分解成5-7个具体的步骤。
           每个步骤应该：
           1. 简单、具体、可执行
           2. 预估完成时间（1-5分钟）
           3. 按照从易到难的顺序排列
           4. 考虑 ADHD 用户的注意力特点
           
           请使用以下格式：
           1️⃣ **第一步** (X分钟)
           2️⃣ **第二步** (X分钟)
           以此类推...`
        : `As an ADHD task breakdown assistant, please break down the task "${task}" into 5-7 specific steps.
           Each step should be:
           1. Simple, specific, and actionable
           2. Include estimated time (1-5 minutes)
           3. Arranged from easiest to most challenging
           4. Consider ADHD attention patterns
           
           Use this format:
           1️⃣ **First step** (X min)
           2️⃣ **Second step** (X min)
           And so on...`;

    const completion = await openai.chat.completions.create({
      messages: [{ role: "user", content: prompt }],
      model: "gpt-3.5-turbo",
      temperature: 0.7,
    });

    const steps = completion.choices[0].message.content
      ?.split(/[1-9]️⃣/)
      .filter(Boolean)
      .map((step) => {
        const match = step.match(/\*\*(.*?)\*\*\s*\((\d+).*?\)/);
        if (match) {
          return {
            text: match[1].trim(),
            time: parseInt(match[2]),
          };
        }
        return null;
      })
      .filter(Boolean);

    return NextResponse.json({ steps });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { error: "Failed to get suggestions" },
      { status: 500 }
    );
  }
}
