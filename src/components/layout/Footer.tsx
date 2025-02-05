"use client";

import { useLanguage } from "@/contexts/LanguageContext";

interface FooterProps {
  className?: string;
}

export function Footer({ className = "" }: FooterProps) {
  const { t } = useLanguage();

  return (
    <footer
      className={`py-6 px-4 border-t border-gray-100 bg-white ${className}`}
    >
      <div className="max-w-5xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-gray-500">
        <div className="flex items-center gap-2">
          <span className="font-medium text-primary">Lumen</span>
          <span>© {new Date().getFullYear()}</span>
        </div>
        <div className="flex gap-6">
          <a href="#" className="hover:text-primary transition-colors">
            {t.footer.about}
          </a>
          <a href="#" className="hover:text-primary transition-colors">
            {t.footer.guide}
          </a>
          <a href="#" className="hover:text-primary transition-colors">
            {t.footer.privacy}
          </a>
        </div>
      </div>
    </footer>
  );
}
