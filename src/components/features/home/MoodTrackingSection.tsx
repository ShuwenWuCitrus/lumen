"use client";

import { useLanguage } from "@/contexts/LanguageContext";

interface MoodTrackingFeature {
  icon: string;
  title: string;
  description: string;
}

export function MoodTrackingSection() {
  const { t } = useLanguage();

  return (
    <section className="bg-white py-xl">
      <div className="container-base">
        <div className="max-w-3xl mx-auto text-center mb-xl">
          <h2 className="text-3xl font-bold gradient-text mb-md">
            {t.home.moodTracking.title}
          </h2>
          <p className="text-xl text-gray-700">
            {t.home.moodTracking.description}
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-lg">
          <div className="bg-background rounded-xl p-lg shadow-sm">
            <img
              src="https://public.readdy.ai/ai/img_res/mood-tracking-demo.jpg"
              alt="Mood tracking demo"
              className="rounded-lg shadow-sm"
            />
          </div>
          <div className="space-y-md">
            {t.home.moodTracking.features.map(
              (feature: MoodTrackingFeature, index: number) => (
                <div
                  key={index}
                  className="bg-background p-md rounded-xl flex items-start gap-md"
                >
                  <div className="w-10 h-10 rounded-full bg-primary-light/30 flex items-center justify-center flex-shrink-0">
                    <span className="text-xl">{feature.icon}</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-primary-dark mb-xs">
                      {feature.title}
                    </h3>
                    <p className="text-gray-700">{feature.description}</p>
                  </div>
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
