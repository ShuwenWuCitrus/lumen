"use client";

import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { cn } from "@/utils/cn";
import { Post, PostCategory } from "@/types/community";

interface CreatePostProps {
  onCreatePost: (
    post: Omit<Post, "id" | "createdAt" | "likes" | "comments">
  ) => void;
}

const CATEGORIES: PostCategory[] = [
  "support",
  "tips",
  "victories",
  "questions",
  "resources",
];

export function CreatePost({ onCreatePost }: CreatePostProps) {
  const { t } = useLanguage();
  const [content, setContent] = useState("");
  const [category, setCategory] = useState<PostCategory>("support");
  const [isExpanded, setIsExpanded] = useState(false);

  const getCategoryStyles = (cat: PostCategory) => {
    switch (cat) {
      case "tips":
        return "text-primary-dark bg-primary-light/10 hover:bg-primary-light/20";
      case "support":
        return "text-secondary-dark bg-secondary-light/10 hover:bg-secondary-light/20";
      case "questions":
        return "text-accent-blue bg-accent-blue/10 hover:bg-accent-blue/20";
      case "victories":
        return "text-accent-yellow bg-accent-yellow/10 hover:bg-accent-yellow/20";
      case "resources":
        return "text-accent-pink bg-accent-pink/10 hover:bg-accent-pink/20";
      default:
        return "text-gray-600 bg-gray-50 hover:bg-gray-100";
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;

    onCreatePost({
      content: content.trim(),
      category,
      author: "CurrentUser", // 在实际应用中，从认证上下文获取
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
            <div className="flex-1 flex flex-wrap gap-sm">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setCategory(cat)}
                  className={cn(
                    "px-md py-sm rounded-full text-sm font-medium transition-colors",
                    category === cat
                      ? getCategoryStyles(cat)
                      : "text-gray-500 hover:bg-gray-100"
                  )}
                >
                  {t.community.categories[cat]}
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
