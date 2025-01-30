"use client";

import { useLanguage } from "@/contexts/LanguageContext";

export default function LanguageSwitch() {
  const { language, setLanguage } = useLanguage();

  return (
    <button
      onClick={() => setLanguage(language === "zh" ? "en" : "zh")}
      className="px-3 py-1.5 rounded-lg text-sm text-primary hover:bg-primary/10 transition-colors"
    >
      {language === "zh" ? "EN" : "中"}
    </button>
  );
}
