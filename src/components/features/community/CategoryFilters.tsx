"use client";

import { cn } from "@/utils/cn";
import { Category } from "@/types/community";

interface CategoryFiltersProps {
  selectedCategory: Category;
  onSelectCategory: (category: Category) => void;
}

const categories: Category[] = [
  "All",
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

export function CategoryFilters({
  selectedCategory,
  onSelectCategory,
}: CategoryFiltersProps) {
  return (
    <div className="flex flex-wrap gap-sm mb-lg">
      {categories.map((category) => (
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
          {category}
        </button>
      ))}
    </div>
  );
}
