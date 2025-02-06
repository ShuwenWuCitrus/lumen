"use client";

import { Card } from "@/components/common/Card";
import { cn } from "@/utils/cn";

interface FeatureCardProps {
  title: string;
  description: string;
  imageSrc: string;
  className?: string;
}

export function FeatureCard({
  title,
  description,
  imageSrc,
  className,
}: FeatureCardProps) {
  return (
    <Card
      className={cn(
        "hover:scale-[1.02] transition-transform duration-300",
        className
      )}
    >
      <div className="h-48 mb-md overflow-hidden rounded-lg -mx-md -mt-md">
        <img
          src={imageSrc}
          alt={title}
          className="w-full h-full object-cover"
        />
      </div>
      <h3 className="text-2xl font-semibold text-primary-dark mb-sm">
        {title}
      </h3>
      <p className="text-gray-700">{description}</p>
    </Card>
  );
}
