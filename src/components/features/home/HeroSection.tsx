"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/common/Button";

export function HeroSection() {
  const { t } = useLanguage();

  return (
    <section className="w-full bg-gradient-to-r from-background-light via-primary-light/10 to-secondary-light/10">
      <div className="container-base py-xl">
        <div className="flex items-center justify-between">
          <div className="w-1/2 pr-xl">
            <h1 className="text-6xl font-bold mb-lg gradient-text">
              {t.home.welcome}
            </h1>
            <p className="text-xl text-gray-700 mb-lg">{t.home.description}</p>
            <Button size="lg">{t.home.startButton}</Button>
          </div>
          <div className="w-1/2">
            <img
              src="https://public.readdy.ai/ai/img_res/005fa80f539ce7249bc9fbc421e5dc02.jpg"
              alt="Peaceful illustration"
              className="rounded-xl shadow-xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
