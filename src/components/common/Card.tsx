"use client";

import { forwardRef, HTMLAttributes } from "react";
import { cn } from "@/utils/cn";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
}

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div ref={ref} className={cn("card", className)} {...props}>
        {children}
      </div>
    );
  }
);

Card.displayName = "Card";
