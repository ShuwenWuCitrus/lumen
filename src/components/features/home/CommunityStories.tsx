"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import { Card } from "@/components/common/Card";

interface Story {
  id: number;
  author: string;
  role: "advocate" | "creative" | "student" | "professional" | "parent";
  content: string;
  avatarUrl: string;
}

const stories: Story[] = [
  {
    id: 1,
    author: "Emily Parker",
    role: "advocate",
    content:
      "Lumen has transformed how I manage my daily tasks. The community support here is incredible, and I've finally found tools that work for my brain.",
    avatarUrl: "https://public.readdy.ai/ai/img_res/avatar1.jpg",
  },
  {
    id: 2,
    author: "David Chen",
    role: "creative",
    content:
      "Finding a community that understands both ADHD and INFP traits has been life-changing. The tools here really help me stay focused while honoring my creative process.",
    avatarUrl: "https://public.readdy.ai/ai/img_res/avatar2.jpg",
  },
  {
    id: 3,
    author: "Sarah Johnson",
    role: "student",
    content:
      "The mood tracking and task management features have helped me understand my patterns better. It's like having a supportive friend who really gets you.",
    avatarUrl: "https://public.readdy.ai/ai/img_res/avatar3.jpg",
  },
];

export function CommunityStories() {
  const { t } = useLanguage();

  return (
    <section className="container-base py-xl">
      <h2 className="text-3xl font-bold gradient-text text-center mb-xl">
        {t.home.communityStories.title}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-lg">
        {stories.map((story) => (
          <Card key={story.id} className="p-lg">
            <div className="flex items-center mb-md">
              <div
                className="w-12 h-12 rounded-full bg-primary-light/30 flex-shrink-0 
                ring-2 ring-primary-light/20 ring-offset-2"
              />
              <div className="ml-md">
                <h4 className="font-semibold text-primary-dark">
                  {story.author}
                </h4>
                <p className="text-sm text-gray-500">
                  {t.home.communityStories.roles[story.role]}
                </p>
              </div>
            </div>
            <p className="text-gray-700 leading-relaxed">
              &ldquo;{story.content}&rdquo;
            </p>
          </Card>
        ))}
      </div>
    </section>
  );
}
