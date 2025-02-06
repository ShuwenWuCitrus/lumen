import { BarChart, Bar, XAxis, YAxis, Tooltip, Cell } from "recharts";
import { useLanguage } from "@/contexts/LanguageContext";
import { getMoodIcon } from "@/utils/getMoodIcon";
import { Card } from "@/components/common/Card";
import { TimeRange } from "@/types/mood";

interface MoodChartProps {
  data: Array<{
    mood: string;
    count: number;
  }>;
  timeRange: TimeRange;
}

export function MoodChart({ data, timeRange }: MoodChartProps) {
  const { t } = useLanguage();

  return (
    <div className="w-full">
      <h3 className="text-lg font-medium text-gray-700 mb-4">
        {timeRange === "7days"
          ? t.notes.analysis.sevenDays
          : t.notes.analysis.thirtyDays}
      </h3>
      <div className="w-full overflow-x-auto">
        <BarChart
          width={600}
          height={300}
          data={data}
          layout="vertical"
          margin={{ top: 5, right: 120, left: 60, bottom: 5 }}
          barSize={30}
        >
          <XAxis
            type="number"
            tickLine={false}
            axisLine={false}
            tick={{ fill: "#666", fontSize: 12 }}
          />
          <YAxis
            dataKey="mood"
            type="category"
            axisLine={false}
            tickLine={false}
            tick={({ payload, x, y }) => (
              <g transform={`translate(${x},${y})`}>
                <text x={-35} y={4} className="text-xl">
                  {getMoodIcon(payload.value)}
                </text>
              </g>
            )}
            width={50}
          />
          <Tooltip
            cursor={{ fill: "#f3f4f6" }}
            content={({ payload }) => {
              if (!payload?.length) return null;
              const data = payload[0].payload;
              return (
                <Card className="!p-2 text-sm">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">{getMoodIcon(data.mood)}</span>
                    <p>
                      {t.notes.moods[data.mood as keyof typeof t.notes.moods]}
                    </p>
                  </div>
                  <p className="font-medium mt-1">{data.count} 次</p>
                </Card>
              );
            }}
          />
          <Bar dataKey="count" radius={[4, 4, 4, 4]}>
            {data.map((entry, index) => (
              <Cell key={index} fill={getMoodColor(entry.mood)} />
            ))}
          </Bar>
        </BarChart>
      </div>
    </div>
  );
}

function getMoodColor(mood: string): string {
  const colors = {
    procrastination: "#FDA4AF",
    distracted: "#93C5FD",
    hyperfocus: "#34D399",
    anxious: "#FCD34D",
    energetic: "#F472B6",
    neutral: "#CBD5E1",
  };
  return colors[mood as keyof typeof colors] || "#CBD5E1";
}

export default MoodChart;
