"use client";

import { ButtonHTMLAttributes } from "react";
import { cn } from "@/utils/cn";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline";
  size?: "sm" | "md" | "lg";
  fullWidth?: boolean;
  isLoading?: boolean;
}

export function Button({
  variant = "primary",
  size = "md",
  fullWidth = false,
  isLoading = false,
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        "btn-base",
        {
          "btn-primary": variant === "primary",
          "btn-secondary": variant === "secondary",
          "btn-outline": variant === "outline",
          "opacity-70 cursor-not-allowed": isLoading,
        },
        {
          "px-xs py-xs text-sm": size === "sm",
          "px-md py-sm text-base": size === "md",
          "px-lg py-md text-lg": size === "lg",
          "w-full": fullWidth,
        },
        className
      )}
      disabled={isLoading}
      {...props}
    >
      {isLoading ? "Loading..." : children}
    </button>
  );
}
