import { useLanguage } from "@/contexts/LanguageContext";
import { Card } from "@/components/common/Card";
import { formatDate } from "@/utils/formatDate";
import { BilingualText } from "@/types/mood";

interface AISummaryProps {
  summary: BilingualText;
  advice: BilingualText;
  date: string;
}

export function AISummary({ summary, advice, date }: AISummaryProps) {
  const { t, language } = useLanguage();

  return (
    <Card className="p-6">
      <h3 className="text-lg font-medium text-gray-700 mb-4">
        {t.notes.analysis.aiSummary}
      </h3>
      <div className="space-y-6">
        <div>
          <p className="text-gray-600 mb-4">{summary[language]}</p>
          <div className="mt-4 p-4 bg-primary/5 rounded-lg border border-primary/10">
            <h4 className="text-primary font-medium mb-2">
              {t.notes.analysis.advice}
            </h4>
            <p className="text-gray-600">{advice[language]}</p>
          </div>
        </div>
        <p className="text-sm text-gray-400">{formatDate(date)}</p>
      </div>
    </Card>
  );
}
