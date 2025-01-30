"use client";

import Link from "next/link";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Home() {
  const { t } = useLanguage();

  return (
    <div className="h-full flex flex-col items-center justify-center px-4 -mt-16">
      <div className="text-center mb-12">
        <h1 className="text-5xl font-bold mb-4">
          <span className="gradient-text">{t.home.welcome}</span>
        </h1>
        <p className="text-lg subtitle tracking-wide">{t.home.description}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl w-full">
        <Link
          href="/tasks"
          className="card p-8 text-center group hover:border-2 hover:border-primary/20"
        >
          <h2 className="text-xl font-semibold text-primary-dark group-hover:text-primary mb-3">
            {t.home.taskCard.title}
          </h2>
          <p className="text-gray-600">{t.home.taskCard.description}</p>
        </Link>

        <Link
          href="/notes"
          className="card p-8 text-center group hover:border-2 hover:border-primary/20"
        >
          <h2 className="text-xl font-semibold text-primary-dark group-hover:text-primary mb-3">
            {t.home.noteCard.title}
          </h2>
          <p className="text-gray-600">{t.home.noteCard.description}</p>
        </Link>

        <Link
          href="/community"
          className="card p-8 text-center group hover:border-2 hover:border-primary/20"
        >
          <h2 className="text-xl font-semibold text-primary-dark group-hover:text-primary mb-3">
            {t.home.communityCard.title}
          </h2>
          <p className="text-gray-600">{t.home.communityCard.description}</p>
        </Link>
      </div>
    </div>
  );
}
