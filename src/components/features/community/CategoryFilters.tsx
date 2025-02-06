"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import { cn } from "@/utils/cn";
import { Category, CATEGORIES, getCategoryColor } from "@/types/community";

interface CategoryFiltersProps {
  selectedCategory: Category;
  onSelectCategory: (category: Category) => void;
}

export function CategoryFilters({
  selectedCategory,
  onSelectCategory,
}: CategoryFiltersProps) {
  const { t } = useLanguage();

  return (
    <div className="flex flex-wrap gap-sm mb-lg">
      {CATEGORIES.map((category) => (
        <button
          key={category}
          onClick={() => onSelectCategory(category)}
          className={cn(
            "px-md py-sm rounded-lg font-medium transition-all duration-300",
            selectedCategory === category
              ? getCategoryColor(category)
              : "text-gray-500 hover:bg-gray-100"
          )}
        >
          {t.community.categories[category]}
        </button>
      ))}
    </div>
  );
}
