"use client";

import { Card } from "@/components/common/Card";
import { formatDistanceToNow } from "date-fns";
import { zhCN, enUS } from "date-fns/locale";
import { useLanguage } from "@/contexts/LanguageContext";
import { cn } from "@/utils/cn";

interface CommunityPostProps {
  id: string;
  author: string;
  content: string;
  createdAt: Date;
  likes: number;
  comments: number;
  category: "Tips" | "Support" | "Questions" | "Victories" | "Resources";
  onLike?: (id: string) => void;
  onComment?: (id: string) => void;
}

export function CommunityPost({
  id,
  author,
  content,
  createdAt,
  likes,
  comments,
  category,
  onLike,
  onComment,
}: CommunityPostProps) {
  const { language } = useLanguage();

  const dateLocale = language === "zh" ? zhCN : enUS;
  const timeAgo = formatDistanceToNow(createdAt, {
    addSuffix: true,
    locale: dateLocale,
  });

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Tips":
        return "text-primary-dark bg-primary-light/20";
      case "Support":
        return "text-secondary-dark bg-secondary-light/20";
      case "Questions":
        return "text-accent-blue bg-accent-blue/20";
      case "Victories":
        return "text-accent-yellow bg-accent-yellow/20";
      case "Resources":
        return "text-accent-pink bg-accent-pink/20";
      default:
        return "text-gray-600 bg-gray-50";
    }
  };

  return (
    <Card>
      <div className="flex items-start gap-md">
        <div
          className="w-10 h-10 rounded-full bg-primary-light/30 flex-shrink-0 
          ring-2 ring-primary-light/20 ring-offset-2"
        />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-sm mb-sm">
            <h3 className="font-medium text-primary-dark">{author}</h3>
            <span className="text-sm text-gray-500">{timeAgo}</span>
          </div>
          <p className="text-gray-700 mb-md leading-relaxed">{content}</p>
          <div className="flex items-center gap-md">
            <div className="flex items-center gap-md">
              <button
                onClick={() => onLike?.(id)}
                className="flex items-center gap-xs text-gray-500 hover:text-primary 
                  transition-colors"
              >
                <span className="text-lg">♡</span>
                <span className="text-sm">{likes}</span>
              </button>
              <button
                onClick={() => onComment?.(id)}
                className="flex items-center gap-xs text-gray-500 hover:text-primary 
                  transition-colors"
              >
                <span className="text-lg">💬</span>
                <span className="text-sm">{comments}</span>
              </button>
            </div>
            <span
              className={cn(
                "text-sm px-sm py-xs rounded-full transition-colors",
                getCategoryColor(category)
              )}
            >
              #{category}
            </span>
          </div>
        </div>
      </div>
    </Card>
  );
}
