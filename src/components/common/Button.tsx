"use client";

import { ButtonHTMLAttributes } from "react";
import { cn } from "@/utils/cn";
import React from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline";
  size?: "sm" | "md" | "lg";
  fullWidth?: boolean;
  isLoading?: boolean;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

// 使用React.memo优化Button组件，避免不必要的重渲染
export const Button = React.memo(function Button({
  variant = "primary",
  size = "md",
  fullWidth = false,
  isLoading = false,
  className,
  children,
  onClick,
  ...props
}: ButtonProps) {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (isLoading) return;
    e.stopPropagation();
    onClick?.(e);
  };

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
      onClick={handleClick}
      {...props}
    >
      {isLoading ? "Loading..." : children}
    </button>
  );
});
