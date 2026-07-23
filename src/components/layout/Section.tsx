import * as React from "react";
import { cn } from "../../lib/utils";

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  variant?: "porcelain" | "blush" | "ink";
}

export const Section = React.forwardRef<HTMLElement, SectionProps>(
  ({ className, variant = "porcelain", ...props }, ref) => {
    return (
      <section
        ref={ref}
        className={cn(
          "py-24 lg:py-40",
          variant === "porcelain" ? "bg-porcelain text-ink" : 
          variant === "blush" ? "bg-blush text-ink" : "bg-ink text-porcelain",
          className
        )}
        {...props}
      />
    );
  }
);
Section.displayName = "Section";
