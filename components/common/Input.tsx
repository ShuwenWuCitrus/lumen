"use client";

import { InputHTMLAttributes, forwardRef } from "react";
import { cn } from "@/utils/cn";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, error, ...props }, ref) => {
    return (
      <div className="w-full">
        <input
          className={cn(
            "w-full px-5 py-3 rounded-xl border border-gray-200",
            "focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all",
            { "border-red-300 focus:border-red-500 focus:ring-red-200": error },
            className
          )}
          ref={ref}
          {...props}
        />
        {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
      </div>
    );
  }
);

Input.displayName = "Input";
