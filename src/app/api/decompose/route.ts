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
        ? `作为一个 ADHD 任务分解助手，请为任务"${task}"提供3个可能的第一步建议。
         每个建议应该简单、具体、可执行，并包含预估时间（1-5分钟）。
         请使用以下格式：
         1️⃣ **具体建议1** (X分钟)
         2️⃣ **具体建议2** (X分钟)
         3️⃣ **具体建议3** (X分钟)`
        : `As an ADHD task breakdown assistant, provide 3 possible first steps for the task "${task}".
         Each suggestion should be simple, specific, actionable, and include an estimated time (1-5 minutes).
         Use this format:
         1️⃣ **Specific suggestion 1** (X min)
         2️⃣ **Specific suggestion 2** (X min)
         3️⃣ **Specific suggestion 3** (X min)`;

    const completion = await openai.chat.completions.create({
      messages: [{ role: "user", content: prompt }],
      model: "gpt-3.5-turbo",
      temperature: 0.7,
    });

    const suggestions = completion.choices[0].message.content
      ?.split(/[1-3]️⃣/)
      .filter(Boolean)
      .map((suggestion) => {
        const match = suggestion.match(/\*\*(.*?)\*\*\s*\((\d+).*?\)/);
        if (match) {
          return {
            text: match[1].trim(),
            time: parseInt(match[2]),
          };
        }
        return null;
      })
      .filter(Boolean);

    return NextResponse.json({ suggestions });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { error: "Failed to get suggestions" },
      { status: 500 }
    );
  }
}
