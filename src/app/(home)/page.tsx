"use client";

import { HeroSection } from "@/components/features/home/HeroSection";
import { FeaturesSection } from "@/components/features/home/FeaturesSection";
import { MoodTrackingSection } from "@/components/features/home/MoodTrackingSection";
import { CommunityStories } from "@/components/features/home/CommunityStories";

export default function HomePage() {
  return (
    <div className="flex-1 overflow-y-auto bg-background">
      <HeroSection />
      <FeaturesSection />
      <MoodTrackingSection />
      <CommunityStories />
    </div>
  );
}
