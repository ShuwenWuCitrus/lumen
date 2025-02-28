"use client";

import { forwardRef, HTMLAttributes } from "react";
import { cn } from "@/utils/cn";
import React from "react";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
}

// 使用React.memo优化Card组件，避免不必要的重渲染
export const Card = React.memo(
  forwardRef<HTMLDivElement, CardProps>(
    ({ className, children, ...props }, ref) => {
      return (
        <div ref={ref} className={cn("card", className)} {...props}>
          {children}
        </div>
      );
    }
  )
);

Card.displayName = "Card";
