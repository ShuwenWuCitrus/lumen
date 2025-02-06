import { NextResponse } from "next/server";
import OpenAI from "openai";
import { Note } from "@/types/note";

const MIN_NOTES_FOR_ANALYSIS = 3;

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: Request) {
  try {
    const { notes } = await request.json();

    // 检查笔记数量是否足够
    if (notes.length < MIN_NOTES_FOR_ANALYSIS) {
      return NextResponse.json({
        needMoreNotes: true,
        requiredCount: MIN_NOTES_FOR_ANALYSIS,
        currentCount: notes.length,
      });
    }

    const prompt = `分析以下笔记的情感状态，并提供结构化的 JSON 响应，需包含中英文版本。分析需包含以下部分：

1. summary: 总结用户过去几天的情绪趋势，并结合数据提供针对性建议。
   - zh: {string} 中文情感总结，包括主要情绪趋势、心情波动（是否有较大起伏），以及建议（例如调节策略）。
   - en: {string} 英文情感总结，与中文一致。

2. mood_trends: 数组，分析情绪变化趋势，列出主要心情及其波动方向：
   - mood: {string} 主要情绪（例如 "焦虑"、"高兴"）
   - trend: {string} 过去 7 天的变化趋势（"上升"、"下降"、"稳定"）
   - confidence: {number} AI 置信度（0.1 - 1.0）

3. keywords: 数组，提取最具代表性的情感关键词，并分析其变化趋势：
   - text: { zh: string, en: string } 关键词
   - weight: {number} 重要性权重（0.1 - 1.0）
   - trend: {string} "增加" / "减少" / "稳定"

4. advice: 依据情绪分析给出的实际建议，包含：
   - zh: {string} 中文建议，例如如果焦虑增加，可以提供缓解压力的策略。
   - en: {string} 英文建议。

笔记内容：
${notes
  .map(
    (note: Note) => `时间：${note.createdAt}
内容：${note.content}
心情：${note.mood}
---`
  )
  .join("\n")}

请确保返回的 JSON 格式正确，并包含所有部分（summary, mood_trends, keywords, advice）。所有文本内容需包含中英文版本。`;

    const completion = await openai.chat.completions.create({
      messages: [{ role: "user", content: prompt }],
      model: "gpt-3.5-turbo",
      temperature: 0.7,
      response_format: { type: "json_object" },
    });

    const analysis = JSON.parse(completion.choices[0].message.content || "{}");

    // 统计心情分布
    const moodCounts = notes.reduce(
      (acc: Record<string, number>, note: Note) => {
        acc[note.mood] = (acc[note.mood] || 0) + 1;
        return acc;
      },
      {}
    );

    const moodData = Object.entries(moodCounts)
      .map(([mood, count]) => ({
        mood,
        count: count as number,
      }))
      .sort((a, b) => b.count - a.count);

    return NextResponse.json({
      summary: analysis.summary,
      moodTrends: analysis.mood_trends,
      keywords: analysis.keywords,
      advice: analysis.advice,
      moodData,
      date: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Analysis error:", error);
    return NextResponse.json(
      { error: "Failed to analyze notes" },
      { status: 500 }
    );
  }
}
