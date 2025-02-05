"use client";

import { LanguageProvider, useLanguage } from "@/contexts/LanguageContext";

interface ProvidersProps {
  children: React.ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  return <LanguageProvider>{children}</LanguageProvider>;
}

export function LanguageAwareHtml({ children }: { children: React.ReactNode }) {
  const { language } = useLanguage();

  return <html lang={language}>{children}</html>;
}
