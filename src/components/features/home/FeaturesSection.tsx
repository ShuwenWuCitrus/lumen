"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import { FeatureCard } from "./FeatureCard";

export function FeaturesSection() {
  const { t } = useLanguage();

  const features = [
    {
      title: t.home.taskCard.title,
      description: t.home.taskCard.description,
      imageSrc:
        "https://public.readdy.ai/ai/img_res/e71164d8d6955616a1a5c7ca8821d795.jpg",
    },
    {
      title: t.home.noteCard.title,
      description: t.home.noteCard.description,
      imageSrc:
        "https://public.readdy.ai/ai/img_res/12b6416534027592bd8e0a7540d29936.jpg",
    },
    {
      title: t.home.communityCard.title,
      description: t.home.communityCard.description,
      imageSrc:
        "https://public.readdy.ai/ai/img_res/370dec714387daecd093d9ec4743e102.jpg",
    },
  ];

  return (
    <section className="container-base py-xl">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-lg">
        {features.map((feature, index) => (
          <FeatureCard
            key={index}
            title={feature.title}
            description={feature.description}
            imageSrc={feature.imageSrc}
          />
        ))}
      </div>
    </section>
  );
}
