"use client";

import dynamic from "next/dynamic";
import { Card } from "@/components/common/Card";
import { TimeRange } from "@/types/mood";
import { useLanguage } from "@/contexts/LanguageContext";

const MoodChart = dynamic(
  () => import("./MoodChart").then((mod) => mod.MoodChart),
  { ssr: false }
);

interface ClientMoodChartProps {
  data: Array<{
    mood: string;
    count: number;
  }>;
  timeRange: TimeRange;
  onTimeRangeChange: (range: TimeRange) => void;
}

export function ClientMoodChart({
  data,
  timeRange,
  onTimeRangeChange,
}: ClientMoodChartProps) {
  const { t } = useLanguage();

  return (
    <Card className="p-6">
      <div className="flex justify-end gap-2 mb-4">
        <button
          onClick={() => onTimeRangeChange("7days")}
          className={`px-3 py-1.5 rounded-full text-sm transition-colors ${
            timeRange === "7days"
              ? "bg-primary text-white"
              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
          }`}
        >
          7 {t.notes.analysis.days}
        </button>
        <button
          onClick={() => onTimeRangeChange("30days")}
          className={`px-3 py-1.5 rounded-full text-sm transition-colors ${
            timeRange === "30days"
              ? "bg-primary text-white"
              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
          }`}
        >
          30 {t.notes.analysis.days}
        </button>
      </div>
      <MoodChart data={data} timeRange={timeRange} />
    </Card>
  );
}
