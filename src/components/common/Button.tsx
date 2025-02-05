"use client";

import { ButtonHTMLAttributes } from "react";
import { cn } from "@/utils/cn";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary";
  fullWidth?: boolean;
  isLoading?: boolean;
}

export function Button({
  variant = "primary",
  fullWidth = false,
  isLoading = false,
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        "px-6 py-3 rounded-xl transition-all",
        "hover:shadow-lg active:transform active:scale-95",
        {
          "w-full": fullWidth,
          "bg-primary text-white hover:bg-primary-dark hover:shadow-primary/20":
            variant === "primary",
          "bg-secondary-light text-secondary-dark hover:bg-secondary hover:shadow-secondary/20":
            variant === "secondary",
          "opacity-70 cursor-not-allowed": isLoading,
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
