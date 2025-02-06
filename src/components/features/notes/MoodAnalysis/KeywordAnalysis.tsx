import { useLanguage } from "@/contexts/LanguageContext";
import { Card } from "@/components/common/Card";
import { Button } from "@/components/common/Button";
import { Keyword } from "@/types/mood";

interface KeywordAnalysisProps {
  keywords: Keyword[];
  onReanalyze: () => void;
}

export function KeywordAnalysis({
  keywords,
  onReanalyze,
}: KeywordAnalysisProps) {
  const { t, language } = useLanguage();

  const getTrendColor = (trend: Keyword["trend"]) => {
    switch (trend) {
      case "增加":
        return "bg-green-100 text-green-800";
      case "减少":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <Card className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium text-gray-700">
          {t.notes.analysis.keywords}
        </h3>
        <Button variant="outline" size="sm" onClick={onReanalyze}>
          {t.notes.analysis.reanalyze}
        </Button>
      </div>
      <div className="flex flex-wrap gap-2">
        {keywords.map((keyword, index) => (
          <span
            key={index}
            className={`px-3 py-1.5 rounded-full text-sm ${getTrendColor(
              keyword.trend
            )}`}
            style={{
              fontSize: `${Math.max(
                0.8,
                Math.min(1.4, 0.8 + keyword.weight * 0.6)
              )}rem`,
            }}
          >
            {keyword.text[language]}
          </span>
        ))}
      </div>
    </Card>
  );
}
