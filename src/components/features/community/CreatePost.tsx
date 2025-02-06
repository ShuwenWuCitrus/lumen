"use client";

import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { cn } from "@/utils/cn";
import { Category, Post } from "@/types/community";

interface CreatePostProps {
  onCreatePost: (
    post: Omit<Post, "id" | "createdAt" | "likes" | "comments">
  ) => void;
}

export function CreatePost({ onCreatePost }: CreatePostProps) {
  const { t } = useLanguage();
  const [content, setContent] = useState("");
  const [category, setCategory] = useState<Exclude<Category, "All">>("Support");
  const [isExpanded, setIsExpanded] = useState(false);

  const categories: Exclude<Category, "All">[] = [
    "Support",
    "Tips",
    "Victories",
    "Questions",
    "Resources",
  ];

  const getCategoryColor = (category: Category) => {
    switch (category) {
      case "Tips":
        return "text-primary-dark bg-primary-light/20 hover:bg-primary-light/30";
      case "Support":
        return "text-secondary-dark bg-secondary-light/20 hover:bg-secondary-light/30";
      case "Questions":
        return "text-accent-blue bg-accent-blue/20 hover:bg-accent-blue/30";
      case "Victories":
        return "text-accent-yellow bg-accent-yellow/20 hover:bg-accent-yellow/30";
      case "Resources":
        return "text-accent-pink bg-accent-pink/20 hover:bg-accent-pink/30";
      default:
        return "text-primary bg-primary-light/10 hover:bg-primary-light/20";
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;

    onCreatePost({
      content: content.trim(),
      category,
      author: "CurrentUser", // In real app, get from auth context
    });

    setContent("");
    setIsExpanded(false);
  };

  return (
    <div className="card mb-xl">
      <div
        className={cn(
          "transition-all duration-300",
          isExpanded ? "space-y-md" : ""
        )}
      >
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          onFocus={() => setIsExpanded(true)}
          placeholder={t.community.contentPlaceholder}
          className={cn(
            "input-base min-h-[60px] resize-none transition-all duration-300",
            isExpanded && "min-h-[120px]"
          )}
        />

        {isExpanded && (
          <div className="flex flex-wrap items-center gap-sm">
            <div className="flex-1 flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setCategory(cat)}
                  className={cn(
                    "px-sm py-xs rounded-full text-sm transition-colors",
                    category === cat
                      ? getCategoryColor(cat)
                      : "text-gray-500 hover:bg-gray-100"
                  )}
                >
                  {cat}
                </button>
              ))}
            </div>
            <div className="flex gap-sm">
              <button
                onClick={() => setIsExpanded(false)}
                className="btn-outline"
              >
                {t.common.cancel}
              </button>
              <button onClick={handleSubmit} className="btn-primary">
                {t.community.postButton}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
