import { HTMLAttributes } from "react";
import { cn } from "@/utils/cn";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  hover?: boolean;
}

export function Card({
  hover = true,
  className,
  children,
  ...props
}: CardProps) {
  return (
    <div
      className={cn(
        "bg-white rounded-xl shadow-sm p-6",
        {
          "transition-all hover:shadow-md hover:transform hover:scale-[1.02] hover:-translate-y-0.5":
            hover,
        },
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
